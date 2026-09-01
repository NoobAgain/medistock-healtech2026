<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\AlokasiDetail;
use App\Models\ItemInventory;
use App\Models\Pengiriman;
use App\Models\PengirimanEvent;
use App\Models\UnitRawat;
use App\Models\User;
use App\Services\AuditService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ReceivedPengiriman extends Controller
{
    public function index()
    {
        Gate::authorize('viewAnyKonfirmasi', Pengiriman::class);
        AuditService::logMenuAccess('Konfirmasi Penerimaan');
        return Inertia::render('ReceivedPengiriman');
    }

    public function getInfoReceivedBox(Request $request)
    {
        try {
            Gate::authorize('viewAnyKonfirmasi', Pengiriman::class);
            $validated = $request->validate([
                'hashsha' => ['required', 'string', 'size:64', 'regex:/^[a-f0-9]{64}$/i'],
            ], [
                'hashsha.required' => 'Hash wajib diisi.',
                'hashsha.size' => 'Hash harus tepat 64 karakter.',
                'hashsha.regex' => 'Hash hanya boleh berisi karakter heksadesimal (0-9, A-F).',

            ]);

            $hashsha = strtolower((string) $validated['hashsha']);

            $pengiriman = Pengiriman::query()
                ->with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama', 'user:id,id_tenaga_medis', 'user.tenaga_medis:id,data'])
                ->addSelect([
                    'last_event_status' => PengirimanEvent::query()
                        ->select('status')
                        ->whereColumn('pengiriman_id', 'pengiriman.id')
                        ->latest('id')
                        ->limit(1),
                    'last_event_note' => PengirimanEvent::query()
                        ->select('note')
                        ->whereColumn('pengiriman_id', 'pengiriman.id')
                        ->latest('id')
                        ->limit(1),
                    'last_event_at' => PengirimanEvent::query()
                        ->select('created_at')
                        ->whereColumn('pengiriman_id', 'pengiriman.id')
                        ->latest('id')
                        ->limit(1),
                    'total_manifest' => AlokasiDetail::query()
                        ->selectRaw('COALESCE(SUM(jumlah), 0)')
                        ->whereColumn('alokasi_nan', 'pengiriman.id_nan'),
                ])
                ->whereRaw('LOWER(hash) = ?', [$hashsha])
                ->first();

            if (!$pengiriman) {
                return response()->json([
                    'status' => false,
                    'message' => 'Data box tidak ditemukan.',
                ]);
            }

            $lastStatus = (int) ($pengiriman->last_event_status ?? 0);

            $events = PengirimanEvent::query()
                ->where('pengiriman_id', $pengiriman->id)
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(['id', 'status', 'created_at', 'created_by']);

            $eventCreatorIds = $events
                ->pluck('created_by')
                ->filter(fn($id): bool => !is_null($id))
                ->map(fn($id): int => (int) $id)
                ->unique()
                ->values();

            $eventCreators = User::query()
                ->with(['tenaga_medis:id,data'])
                ->whereIn('id', $eventCreatorIds)
                ->get(['id', 'id_tenaga_medis'])
                ->keyBy('id');

            $currentUser = $request->user()?->loadMissing('tenaga_medis:id,data');
            $currentUnitRawatId = $currentUser?->tenaga_medis?->data['unit_rawat'] ?? null;
            $resolvedCurrentUnitRawatId = is_numeric($currentUnitRawatId) ? (int) $currentUnitRawatId : 0;

            $unit_rawatIds = $eventCreators
                ->map(function (User $user): int {
                    $unit_rawatId = $user->tenaga_medis?->data['unit_rawat'] ?? null;

                    return is_numeric($unit_rawatId) ? (int) $unit_rawatId : 0;
                })
                ->push($resolvedCurrentUnitRawatId)
                ->filter(fn(int $id): bool => $id > 0)
                ->unique()
                ->values();

            $unit_rawatMap = UnitRawat::query()
                ->whereIn('id', $unit_rawatIds)
                ->pluck('nama', 'id');

            $eventHistory = $events->map(function (PengirimanEvent $event) use ($eventCreators, $unit_rawatMap, $pengiriman): array {
                $createdBy = !is_null($event->created_by) ? $eventCreators->get((int) $event->created_by) : null;
                $unit_rawatId = $createdBy?->tenaga_medis?->data['unit_rawat'] ?? null;
                $resolvedUnitRawatId = is_numeric($unit_rawatId) ? (int) $unit_rawatId : 0;
                $resolvedUnitRawat = (string) ($unit_rawatMap->get($resolvedUnitRawatId) ?? '-');

                return [
                    'uid' => (string) $pengiriman->uid,
                    'status' => (int) $event->status,
                    'statusLabel' => statusLabel((int) $event->status),
                    'petugas' => (string) ($createdBy?->tenaga_medis?->data['nama'] ?? '-'),
                    'unit_rawat' => $resolvedUnitRawat,
                    'lokasi' => $resolvedUnitRawat,
                    'createdAt' => (string) ($event->created_at ?? ''),
                ];
            })->values();

            $resolvedCurrentUnitRawat = (string) ($unit_rawatMap->get($resolvedCurrentUnitRawatId) ?? '-');
            $currentOfficer = [
                'petugas' => (string) ($currentUser?->tenaga_medis?->data['nama'] ?? '-'),
                'unit_rawat' => $resolvedCurrentUnitRawat,
                'lokasi' => (string) ($currentUser?->tenaga_medis?->data['lokasi'] ?? $resolvedCurrentUnitRawat),
                'posisi' => (string) ($currentUser?->tenaga_medis?->data['posisi'] ?? '-'),
            ];

            $items = ItemInventory::query()
                ->with(['alokasi_detail:id,jenis,ukuran,kategori,tenaga_medis_id', 'alokasi_detail.tenaga_medis:id,data'])
                ->whereHas('alokasi_detail', function ($query) use ($pengiriman): void {
                    $query->where('alokasi_nan', $pengiriman->id_nan);
                })
                ->get(['id', 'id_detail_alokasi', 'hash'])
                ->map(function (ItemInventory $item) use ($pengiriman): array {
                    $detail = $item->alokasi_detail;
                    $namaTenagaMedis = $detail?->tenaga_medis?->data['nama'] ?? '-';
                    $ukuran = collect($detail?->ukuran)->last() ?? '-';
                    $kategori = collect($detail?->kategori)->last() ?? '-';

                    // Cek apakah item sudah pernah di-skip di transit sebelumnya
                    $previousSkip = PengirimanEvent::query()
                        ->where('pengiriman_id', $pengiriman->id)
                        ->where('status', 2) // transit events
                        ->whereJsonContains('item_details', [['item_id' => $item->id, 'status' => 'skipped']])
                        ->with(['user.tenaga_medis:id,data'])
                        ->latest('id')
                        ->first();

                    $previouslySkipped = !is_null($previousSkip);
                    $previousSkipReason = null;
                    $previousSkipBy = null;
                    $previousSkipAt = null;

                    if ($previouslySkipped) {
                        $skipDetail = collect($previousSkip->item_details)->firstWhere('item_id', $item->id);
                        $previousSkipReason = $skipDetail['skip_reason'] ?? 'Tidak ada keterangan';
                        $previousSkipBy = $previousSkip->user?->tenaga_medis?->data['nama'] ?? 'Unknown';
                        $previousSkipAt = $previousSkip->created_at?->format('d/m/Y H:i');
                    }

                    return [
                        'id' => $item->id,
                        'nama_tenaga_medis' => $namaTenagaMedis,
                        'ukuran' => $ukuran,
                        'kategori' => $kategori,
                        'jumlah' => 1,
                        'itemHash' => (string) $item->hash,
                        'previouslySkipped' => $previouslySkipped,
                        'previousSkipReason' => $previousSkipReason,
                        'previousSkipBy' => $previousSkipBy,
                        'previousSkipAt' => $previousSkipAt,
                    ];
                })
                ->values()
                ->toArray();

            $result = [
                'id' => $pengiriman->id,
                'uid' => (string) $pengiriman->uid,
                'nan' => (string) ($pengiriman->id_nan ?? '-'),
                'unit_rawat' => $pengiriman->alokasi?->unit_rawat?->nama ?? '-',
                'periode' => $pengiriman->alokasi?->periode ?? '-',
                'totalManifest' => (int) ($pengiriman->total_manifest ?? 0),
                'createdBy' => (string) ($pengiriman->user?->tenaga_medis?->data['nama'] ?? '-'),
                'status' => $lastStatus,
                'statusLabel' => statusLabel($lastStatus),
                'note' => trim((string) ($pengiriman->last_event_note ?? '')),
                'updatedAt' => (string) ($pengiriman->last_event_at ?? $pengiriman->updated_at ?? $pengiriman->created_at ?? ''),
                'createdAt' => (string) ($pengiriman->created_at ?? ''),
                'eventHistory' => $eventHistory,
                'currentOfficer' => $currentOfficer,
                'items' => $items,
            ];

            return response()->json([
                'status' => true,
                'message' => 'Data Box',
                'data' => $result,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }

    public function addTransitEvent(Request $request)
    {
        try {
            Gate::authorize('transit', Pengiriman::class);

            $validated = $request->validate([
                'pengiriman_id' => ['required', 'integer', 'exists:pengiriman,id'],
                'scanned_item' => ['nullable', 'integer', 'in:0,1'],
                'items' => ['sometimes', 'array', 'min:1'],
                'items.*.id' => ['required_with:items', 'integer', 'exists:item_inventory,id'],
                'items.*.status' => ['required_with:items', 'string', Rule::in(['scanned', 'skipped'])],
                'items.*.nfc_data' => ['nullable', 'string'],
                'items.*.skip_reason' => ['nullable', 'string'],
                'note' => ['nullable', 'string'],
            ], [
                'pengiriman_id.required' => 'Data pengiriman wajib diisi.',
                'pengiriman_id.integer'  => 'ID pengiriman harus berupa angka.',
                'pengiriman_id.exists'   => 'Data pengiriman tidak ditemukan.',
                'scanned_item.integer'   => 'Nilai scanned_item harus berupa angka.',
                'scanned_item.in'        => 'Nilai scanned_item harus 0 atau 1.',
                'items.array'            => 'Data item pengiriman harus berupa array.',
                'items.min'              => 'Minimal satu item harus diproses.',
                'items.*.id.required_with'     => 'ID item wajib diisi.',
                'items.*.id.integer'           => 'ID item harus berupa angka.',
                'items.*.id.exists'            => 'Item pengiriman tidak ditemukan.',
                'items.*.status.required_with' => 'Status item wajib diisi.',
                'items.*.status.in'            => 'Status item harus scanned atau skipped.',
                'items.*.nfc_data.string'      => 'Data NFC item harus berupa teks.',
                'items.*.skip_reason.string'   => 'Keterangan skip harus berupa teks.',
                'note.string'                  => 'Catatan harus berupa teks.',
            ]);

            $userId       = Auth::id();
            $pengirimanId = (int) $validated['pengiriman_id'];
            $items        = $validated['items'] ?? [];
            $pengiriman   = Pengiriman::findOrFail($pengirimanId);

            // 1. Ambil unit_rawat user yang sedang login
            $currentUser   = User::with('tenaga_medis:id,data')->find($userId);
            $currentUnitRawat = $currentUser->tenaga_medis->data['unit_rawat'] ?? null;

            // 2. Ambil status terakhir
            $lastEvent = PengirimanEvent::query()
                ->with(['user.tenaga_medis:id,data'])
                ->where('pengiriman_id', $pengirimanId)
                ->latest()
                ->first();

            $lastStatus = $lastEvent?->status;
            $lastUnitRawat = $lastEvent?->user?->tenaga_medis?->data['unit_rawat'] ?? null;

            // 3. Jika status terakhir 3 atau 4 → tolak
            if (in_array($lastStatus, [3, 4])) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Pengiriman ini sudah selesai diproses, tidak dapat kembali ke status transit.',
                ]);
            }

            // 4. Jika status terakhir 2 dan unit_rawat SAMA → tolak
            if ($lastStatus === 2 && $lastUnitRawat === $currentUnitRawat) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Proses transit untuk pengiriman ini sudah diproses oleh unit_rawat yang sama.',
                ]);
            }

            // 5. Ambil semua event transit (status 2) sekali query
            $transitEvents = PengirimanEvent::query()
                ->with(['user.tenaga_medis:id,data'])
                ->where('pengiriman_id', $pengirimanId)
                ->where('status', 2)
                ->get();

            $pernahTransit = $transitEvents->contains(
                fn($event) => ($event->user?->tenaga_medis?->data['unit_rawat'] ?? null) === $currentUnitRawat
            );

            $adaFlagSebelumnya = $transitEvents->contains(
                fn($event) => str_contains($event->note ?? '', '(FLAG)')
            );

            // 6. Validasi item milik pengiriman ini
            $itemIds = collect($items)->pluck('id')->map(fn($id) => (int) $id)->unique()->values()->all();
            $validItemIds = ItemInventory::query()
                ->whereIn('id', $itemIds)
                ->whereHas('alokasi_detail', function ($query) use ($pengiriman): void {
                    $query->where('alokasi_nan', $pengiriman->id_nan);
                })
                ->pluck('id')
                ->map(fn($id) => (int) $id)
                ->all();

            if (count($itemIds) !== count($validItemIds)) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Terdapat item yang tidak valid untuk pengiriman ini.',
                ], 422);
            }

            $scannedItem     = collect($items)->where('status', 'scanned')->count() > 0 ? 1 : 0;
            $hasSkippedItems = collect($items)->where('status', 'skipped')->count() > 0;

            // 7. Bangun current item details (keyBy item_id)
            $currentItemDetails = collect($items)->map(fn($item) => [
                'item_id'     => (int) $item['id'],
                'status'      => $item['status'],
                'nfc_data'    => $item['nfc_data'] ?? null,
                'skip_reason' => $item['skip_reason'] ?? null,
            ])->keyBy('item_id');

            // 8. Ambil previous item details dari semua transit event (keyBy item_id)
            $previousItemDetails = collect($transitEvents)
                ->pluck('item_details')
                ->flatten(1)
                ->keyBy('item_id');

            // 9. Merge: data baru menimpa lama, tapi field null pada data baru tidak menimpa nilai lama
            $itemDetails = $currentItemDetails->map(function ($newItem) use ($previousItemDetails) {
                $oldItem = $previousItemDetails->get($newItem['item_id']);

                return [
                    'item_id'     => $newItem['item_id'],
                    'status'      => $newItem['status'],
                    'nfc_data'    => $newItem['nfc_data'] ?? $oldItem['nfc_data'] ?? null,
                    'skip_reason' => $newItem['skip_reason'] ?? $oldItem['skip_reason'] ?? null,
                ];
            })
                // Tambahkan item lama yang tidak ada di request ini agar tidak hilang
                ->union($previousItemDetails)
                ->values()
                ->all();

            // 10. Tentukan note — FLAG jika ada skip, pernah transit unit_rawat sama, atau sudah ada flag sebelumnya
            $shouldFlag = $adaFlagSebelumnya || ($lastUnitRawat !== $currentUnitRawat && $pernahTransit) || $hasSkippedItems;
            $note       = $shouldFlag ? 'In Transit (FLAG)' : ($validated['note'] ?? 'In Transit');

            // 11. Simpan event baru
            PengirimanEvent::create([
                'pengiriman_id' => $pengirimanId,
                'status'        => 2,
                'note'          => $note,
                'created_by'    => $userId,
                'scanned_item'  => $scannedItem,
                'item_details'  => $itemDetails,
            ]);

            AuditService::logMenuAccess('Pengiriman event transit berhasil diproses');

            return response()->json([
                'status'  => true,
                'message' => 'Event transit berhasil ditambahkan.',
            ]);

            // Gate::authorize('transit', Pengiriman::class);

            // $validated = $request->validate([
            //     'pengiriman_id' => ['required', 'integer', 'exists:pengiriman,id'],
            //     'scanned_item' => ['nullable', 'integer', 'in:0,1'],
            //     'items' => ['sometimes', 'array', 'min:1'],
            //     'items.*.id' => ['required_with:items', 'integer', 'exists:item_inventory,id'],
            //     'items.*.status' => ['required_with:items', 'string', Rule::in(['scanned', 'skipped'])],
            //     'items.*.nfc_data' => ['nullable', 'string'],
            //     'items.*.skip_reason' => ['nullable', 'string'],
            //     'note' => ['nullable', 'string'],
            // ], [
            //     'pengiriman_id.required' => 'Data pengiriman wajib diisi.',
            //     'pengiriman_id.integer'  => 'ID pengiriman harus berupa angka.',
            //     'pengiriman_id.exists'   => 'Data pengiriman tidak ditemukan.',
            //     'scanned_item.integer'   => 'Nilai scanned_item harus berupa angka.',
            //     'scanned_item.in'        => 'Nilai scanned_item harus 0 atau 1.',
            //     'items.array'            => 'Data item pengiriman harus berupa array.',
            //     'items.min'              => 'Minimal satu item harus diproses.',
            //     'items.*.id.required_with'    => 'ID item wajib diisi.',
            //     'items.*.id.integer'     => 'ID item harus berupa angka.',
            //     'items.*.id.exists'      => 'Item pengiriman tidak ditemukan.',
            //     'items.*.status.required_with' => 'Status item wajib diisi.',
            //     'items.*.status.in'      => 'Status item harus scanned atau skipped.',
            //     'items.*.nfc_data.string' => 'Data NFC item harus berupa teks.',
            //     'items.*.skip_reason.string' => 'Keterangan skip harus berupa teks.',
            //     'note.string' => 'Catatan harus berupa teks.',
            // ]);

            // $userId        = Auth::id();
            // $pengirimanId  = (int) $validated['pengiriman_id'];
            // $scannedItem   = (int) ($validated['scanned_item'] ?? 0);
            // $items         = $validated['items'] ?? [];
            // $pengiriman    = Pengiriman::findOrFail($pengirimanId);
            // // dd($items);

            // // 1. Ambil unit_rawat user yang sedang login
            // $currentUser   = User::with('tenaga_medis:id,data')->find($userId);
            // $currentUnitRawat = $currentUser->tenaga_medis->data['unit_rawat'] ?? null;

            // // 2. Ambil status terakhir
            // $lastEvent  = PengirimanEvent::query()
            //     ->with(['user.tenaga_medis:id,data'])
            //     ->where('pengiriman_id', $pengirimanId)
            //     ->latest()
            //     ->first();

            // $lastStatus = $lastEvent?->status;
            // $lastUnitRawat = $lastEvent?->user?->tenaga_medis?->data['unit_rawat'] ?? null;

            // // 3. Jika status terakhir 3 atau 4 → tolak
            // if (in_array($lastStatus, [3, 4])) {
            //     return response()->json([
            //         'status'  => false,
            //         'message' => 'Pengiriman ini sudah selesai diproses, tidak dapat kembali ke status transit.',
            //     ]);
            // }

            // // 4. Jika status terakhir 2 dan unit_rawat SAMA → tolak
            // if ($lastStatus === 2 && $lastUnitRawat === $currentUnitRawat) {
            //     return response()->json([
            //         'status'  => false,
            //         'message' => 'Proses transit untuk pengiriman ini sudah diproses oleh unit_rawat yang sama.',
            //     ]);
            // }

            // // 5. Ambil semua event transit (status 2) sekali query
            // $transitEvents = PengirimanEvent::query()
            //     ->with(['user.tenaga_medis:id,data'])
            //     ->where('pengiriman_id', $pengirimanId)
            //     ->where('status', 2)
            //     ->get();

            // $pernahTransit = $transitEvents->contains(
            //     fn($event) => ($event->user?->tenaga_medis?->data['unit_rawat'] ?? null) === $currentUnitRawat
            // );

            // $adaFlagSebelumnya = $transitEvents->contains(
            //     fn($event) => str_contains($event->note ?? '', '(FLAG)')
            // );

            // $itemIds = collect($items)->pluck('id')->map(fn($id) => (int) $id)->unique()->values()->all();
            // $validItemIds = ItemInventory::query()
            //     ->whereIn('id', $itemIds)
            //     ->whereHas('alokasi_detail', function ($query) use ($pengiriman): void {
            //         $query->where('alokasi_nan', $pengiriman->id_nan);
            //     })
            //     ->pluck('id')
            //     ->map(fn($id) => (int) $id)
            //     ->all();

            // if (count($itemIds) !== count($validItemIds)) {
            //     return response()->json([
            //         'status' => false,
            //         'message' => 'Terdapat item yang tidak valid untuk pengiriman ini.',
            //     ], 422);
            // }

            // $scannedItemCount = collect($items)->where('status', 'scanned')->count();
            // $scannedItem = $scannedItemCount > 0 ? 1 : 0;
            // $skippedItems = collect($items)->where('status', 'skipped');
            // $hasSkippedItems = $skippedItems->count() > 0;

            // $currentItemDetails = collect($items)->map(function ($item) {
            //     return [
            //         'item_id' => (int) $item['id'],
            //         'status' => $item['status'],
            //         'nfc_data' => $item['nfc_data'] ?? null,
            //         'skip_reason' => $item['skip_reason'] ?? null,
            //     ];
            // })->values()->all();

            // // Gabungkan item_details dari transit events sebelumnya dengan yang baru

            // $previousItemDetails = collect($transitEvents)
            //     ->pluck('item_details')
            //     ->flatten(1)
            //     ->keyBy('item_id');

            // $itemDetails = $previousItemDetails
            //     ->merge($currentItemDetails) // current menimpa previous
            //     ->values()
            //     ->all();


            // // $previousItemDetails = collect($transitEvents)->pluck('item_details')->flatten(1)->values()->all();
            // // $itemDetails = array_merge($previousItemDetails, $currentItemDetails);

            // // Pastikan tidak ada item_id yang duplikat
            // // $itemDetails = collect($itemDetails)->unique('item_id')->values()->all();

            // // 6. Tentukan note - set FLAG jika ada item yang di-skip
            // $shouldFlag = $adaFlagSebelumnya || ($lastUnitRawat !== $currentUnitRawat && $pernahTransit) || $hasSkippedItems;

            // if ($shouldFlag) {
            //     $note = 'In Transit (FLAG)';
            // } else {
            //     $note = $validated['note'] ?? 'In Transit';
            // }

            // dd(
            //     $pengirimanId,
            //     2,
            //     $note,
            //     $userId,
            //     $scannedItem,
            //     $itemDetails
            // );


            // // 7. Simpan event baru
            // PengirimanEvent::create([
            //     'pengiriman_id' => $pengirimanId,
            //     'status'        => 2,
            //     'note'          => $note,
            //     'created_by'    => $userId,
            //     'scanned_item'  => $scannedItem,
            //     'item_details'  => $itemDetails,
            // ]);

            // AuditService::logMenuAccess('Pengiriman event transit berhasil diproses');

            // return response()->json([
            //     'status'  => true,
            //     'message' => 'Event transit berhasil ditambahkan.',
            // ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status'  => false,
                'message' => 'Validasi gagal.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status'  => false,
                'message' => 'Terjadi kesalahan sistem.',
            ], 500);
        }
    }
}
