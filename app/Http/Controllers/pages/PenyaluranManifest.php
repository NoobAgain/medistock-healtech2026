<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\ItemInventory;
use App\Models\Faskes;
use App\Models\Pengiriman;
use App\Models\PengirimanEvent;
use App\Models\TenagaMedis;
use App\Models\Pod;
use App\Models\UnitRawat;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PenyaluranManifest extends Controller
{
    public function index(Request $request): Response
    {

        Gate::authorize('viewPOD');
        AuditService::logMenuAccess('Penyaluran Manifest (PoD)');

        $dataPenerimaan = $this->getDataPenerimaan();

        return Inertia::render('PenyaluranManifest', [
            'data' => [
                'penerimaan' => $dataPenerimaan,
                'nakes' => $this->getDataNakes(),
            ],
        ]);
    }

    private function getDataNakes(): Collection
    {
        $tenaga_medis = TenagaMedis::query()->get();
        $unit_rawatIds = $tenaga_medis
            ->pluck('data.unit_rawat')
            ->filter(fn($id): bool => is_numeric($id))
            ->map(fn($id): int => (int) $id)
            ->unique()
            ->values();

        $faskesIds = $tenaga_medis
            ->pluck('data.faskes')
            ->filter(fn($id): bool => is_numeric($id))
            ->map(fn($id): int => (int) $id)
            ->unique()
            ->values();

        $unit_rawatMap = UnitRawat::query()
            ->whereIn('id', $unit_rawatIds)
            ->pluck('nama', 'id');

        $faskesMap = Faskes::query()
            ->whereIn('id', $faskesIds)
            ->pluck('nama', 'id');

        return $tenaga_medis
            ->map(function (TenagaMedis $tenaga_medis) use ($unit_rawatMap, $faskesMap): array {
                $data = $tenaga_medis->data ?? [];
                $unit_rawatId = $data['unit_rawat'] ?? null;
                $faskesId = $data['faskes'] ?? null;

                return [
                    'id' => $tenaga_medis->id,
                    'nrp' => (string) ($data['nrp'] ?? ''),
                    'nama' => (string) ($data['nama'] ?? ''),
                    'pangkat' => $tenaga_medis->pangkat(),
                    'posisi' => (string) ($data['posisi'] ?? ''),
                    'lokasi' => (string) ($data['lokasi'] ?? ''),
                    'alamat' => (string) ($data['alamat'] ?? ''),
                    'tgllahir' => (string) ($data['tgllahir'] ?? ''),
                    'tglmasukunit_rawat' => (string) ($data['tglmasukunit_rawat'] ?? ''),
                    'unit_rawat_id' => is_numeric($unit_rawatId) ? (int) $unit_rawatId : null,
                    'unit_rawat' => is_numeric($unit_rawatId) ? (string) ($unit_rawatMap->get((int) $unit_rawatId) ?? '') : '',
                    'faskes' => is_numeric($faskesId) ? (string) ($faskesMap->get((int) $faskesId) ?? '') : '',
                    'activeTenagaMedis' => (bool) ($data['activeTenagaMedis'] ?? false),
                ];
            })
            ->filter(fn(array $tenaga_medis): bool => $tenaga_medis['activeTenagaMedis'] && $tenaga_medis['nama'] !== '')
            ->values();
    }

    private function getDataPenerimaan()
    {
        $query = Pengiriman::query()
            ->with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama', 'alokasi.details', 'alokasi.details.tenaga_medis:id,data', 'user:id,id_tenaga_medis', 'user.tenaga_medis:id,data'])
            ->with(['penerima_event' => fn($q) => $q->where('status', 3)->orderBy('id')->with(['user:id,id_tenaga_medis', 'user.tenaga_medis:id,data'])])
            ->with(['pengiriman_events' => fn($q) => $q->where('status', 2)->select('id', 'pengiriman_id', 'item_details')])
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
                'last_event_item_details' => PengirimanEvent::query()
                    ->select('item_details')
                    ->whereColumn('pengiriman_id', 'pengiriman.id')
                    ->latest('id')
                    ->limit(1),
            ])

            ->whereHas('pengiriman_events', function ($eventQuery): void {
                $eventQuery->whereIn('status', [3, 4, 9]);
            });


        if (!Gate::allows('all')) {
            $unit_rawat_id = Auth::user()?->tenaga_medis?->data['unit_rawat'] ?? null;
            if ($unit_rawat_id) {
                $query->whereHas('alokasi', function ($alokasiQuery) use ($unit_rawat_id): void {
                    $alokasiQuery->where('unit_rawat_id', $unit_rawat_id);
                });
            }
        }

        return $query->get()->map(function (Pengiriman $pengiriman): array {
            $itemDetails = $pengiriman->last_event_item_details ?? null;

            if (is_string($itemDetails)) {
                $itemDetails = json_decode($itemDetails, true);
            }

            $hasOpeningNote = false;
            if (is_array($itemDetails)) {
                foreach ($itemDetails as $detail) {
                    if (!empty($detail['opening_note'])) {
                        $hasOpeningNote = true;
                        break;
                    }
                }
            }

            // Get skipped item IDs from events
            $skippedItemIds = collect($pengiriman->pengiriman_events ?? [])
                ->pluck('item_details')
                ->filter()
                ->map(fn($details) => is_string($details) ? json_decode($details, true) : $details)
                ->flatten(1)
                ->where('status', 'skipped')
                ->pluck('item_id')
                ->unique();

            // Get delivered details
            $detailIds = $pengiriman->alokasi->details->pluck('id');
            $deliveredDetails = ItemInventory::whereIn('id_detail_alokasi', $detailIds)->where('status', 4)->pluck('id_detail_alokasi')->unique();

            // Mark details that have delivered items
            $details = collect($pengiriman->alokasi->details ?? [])->map(function ($detail) use ($deliveredDetails, $skippedItemIds) {

                // Get items for this detail
                $items = ItemInventory::where('id_detail_alokasi', $detail->id)->select('id', 'status')->get();

                // Assign status to each item
                $detail->items = $items->map(function ($item) use ($skippedItemIds) {
                    $isSkipped = $skippedItemIds->contains($item->id);
                    $status = $isSkipped ? 'skipped' : ($item->status == 4 ? 'delivered' : ($item->status == 3 ? 'cancelled' : 'no_delivery'));
                    return ['id' => $item->id, 'status' => $status];
                });

                return $detail;
            });
            // dd($details->toArray());

            $pengiriman->alokasi->details = $details;

            return array_merge($pengiriman->toArray(), [
                'has_opening_note' => $hasOpeningNote,
            ]);
        })->values();
    }

    public function scanValidate(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewPOD');

            $validated = $request->validate([
                'pengiriman_id' => ['required', 'integer', 'exists:pengiriman,id'],
                'hashsha' => ['required', 'string', 'size:64', 'regex:/^[a-f0-9]{64}$/i'],
            ], [
                'pengiriman_id.required' => 'Data pengiriman wajib dipilih.',
                'pengiriman_id.exists' => 'Data pengiriman tidak ditemukan.',
                'hashsha.required' => 'Hash item wajib diisi.',
                'hashsha.size' => 'Hash item harus tepat 64 karakter.',
                'hashsha.regex' => 'Hash item hanya boleh berisi karakter heksadesimal.',
            ]);

            $pengiriman = Pengiriman::query()
                ->select('id', 'id_nan')
                ->findOrFail((int) $validated['pengiriman_id']);

            $hashsha = strtolower((string) $validated['hashsha']);

            $item = ItemInventory::query()
                ->with(['alokasi_detail:id,alokasi_nan,jenis,ukuran,kategori,tenaga_medis_id', 'alokasi_detail.tenaga_medis:id,data'])
                ->select('id', 'id_detail_alokasi', 'nsn', 'hash', 'status', 'created_at')
                ->whereRaw('LOWER(hash) = ?', [$hashsha])
                ->whereHas('alokasi_detail', function ($query) use ($pengiriman): void {
                    $query->where('alokasi_nan', $pengiriman->id_nan);
                })
                ->first();

            if (! $item) {
                return response()->json([
                    'status' => false,
                    'message' => 'Item tidak ditemukan atau tidak termasuk dalam alokasi box yang dipilih.',
                ]);
            }

            if ((int) $item->status === 4) {
                return response()->json([
                    'status' => false,
                    'message' => 'Item sudah di lakukan penyerahan kepada tenaga_medis',
                ]);
            }

            // Check if item was skipped in previous events
            $isSkipped = PengirimanEvent::query()
                ->where('pengiriman_id', $pengiriman->id)
                ->where('status', 2)
                ->whereJsonContains('item_details', [['item_id' => $item->id, 'status' => 'skipped']])
                ->exists();




            $tenaga_medis = $item->alokasi_detail?->tenaga_medis;
            $tenaga_medisData = $tenaga_medis?->data ?? [];

            return response()->json([
                'status' => true,
                'message' => 'Detail item berhasil dimuat.',
                'data' => [
                    'id' => $item->id,
                    'nsn' => (string) $item->nsn,
                    'hash' => (string) $item->hash,
                    'status' => (int) $item->status,
                    'statusLabel' => 'Kode ' . (int) $item->status,
                    'createdAt' => (string) ($item->created_at ?? ''),
                    'is_skipped' => $isSkipped,
                    'alokasiDetail' => [
                        'id' => $item->alokasi_detail?->id,
                        'alokasiNan' => $item->alokasi_detail?->alokasi_nan,
                        'jenis' => $item->alokasi_detail?->jenis,
                        'ukuran' => $item->alokasi_detail?->ukuran,
                        'kategori' => $item->alokasi_detail?->kategori,
                    ],
                    'tenaga_medis' => $tenaga_medis ? [
                        'id' => $tenaga_medis->id,
                        'nrp' => (string) ($tenaga_medisData['nrp'] ?? ''),
                        'nama' => (string) ($tenaga_medisData['nama'] ?? ''),
                        'pangkat' => (string) $tenaga_medis->pangkat(),
                        'posisi' => (string) ($tenaga_medisData['posisi'] ?? '-'),
                        'lokasi' => (string) ($tenaga_medisData['lokasi'] ?? '-'),
                        'unit_rawat' => (string) ($tenaga_medis->unit_rawat?->nama ?? ''),
                        'faskes' => (string) ($tenaga_medis->faskes?->nama ?? ''),
                    ] : null,
                ],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ]);
        } catch (\Exception) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }

    public function confirmDelivery(Request $request): JsonResponse
    {
        try {
            Gate::authorize('createPOD');

            $validated = $request->validate([
                'pengiriman_id' => ['required', 'integer', 'exists:pengiriman,id'],
                'item_id' => ['required', 'integer', 'exists:item_inventory,id'],
                'tenaga_medis_id' => ['required', 'integer', 'exists:tenaga_medis,id'],
                'bukti_foto' => ['required', 'file', 'image', 'max:5120'],
            ], [
                'pengiriman_id.required' => 'Data pengiriman wajib dipilih.',
                'pengiriman_id.integer' => 'ID pengiriman tidak valid.',
                'pengiriman_id.exists' => 'Data pengiriman tidak ditemukan.',
                'item_id.required' => 'Item yang dipindai wajib diisi.',
                'item_id.integer' => 'ID item tidak valid.',
                'item_id.exists' => 'Item tidak ditemukan.',
                'tenaga_medis_id.required' => 'Nakes penerima wajib dipilih.',
                'tenaga_medis_id.integer' => 'ID tenaga_medis tidak valid.',
                'tenaga_medis_id.exists' => 'Data tenaga_medis tidak ditemukan.',
                'bukti_foto.required' => 'Foto bukti penyerahan wajib diunggah.',
                'bukti_foto.file' => 'Bukti penyerahan harus berupa file.',
                'bukti_foto.image' => 'Bukti penyerahan harus berupa gambar.',
                'bukti_foto.max' => 'Ukuran foto bukti maksimal 5 MB.',
            ]);

            $item = ItemInventory::query()
                ->with('alokasi_detail')
                ->select('id', 'id_detail_alokasi', 'nsn', 'status')
                ->findOrFail((int) $validated['item_id']);

            $pengiriman = Pengiriman::query()
                ->select('id', 'id_nan')
                ->findOrFail((int) $validated['pengiriman_id']);

            $skippedItemIds = collect($pengiriman->pengiriman_events ?? [])
                ->pluck('item_details')
                ->filter()
                ->map(fn($details) => is_string($details) ? json_decode($details, true) : $details)
                ->flatten(1)
                ->where('status', 'skipped')
                ->pluck('item_id')
                ->unique()
                ->toArray();

            $isItemInSelectedPengiriman = $item->alokasi_detail()
                ->where('alokasi_nan', $pengiriman->id_nan)
                ->exists();

            if (! $isItemInSelectedPengiriman) {
                return response()->json([
                    'status' => false,
                    'message' => 'Item tidak termasuk dalam alokasi pengiriman terpilih.',
                ]);
            }

            if ((int) $item->status === 4 || Pod::query()->where('item_id', $item->id)->exists()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Item ini sudah pernah dikonfirmasi penyerahannya.',
                ]);
            }

            $uploadedPhoto = $request->file('bukti_foto');
            $photoName = sprintf('%s.%s', (string) $item->nsn, $uploadedPhoto->getClientOriginalExtension());
            $storedPath = $uploadedPhoto->storeAs('pod', $photoName);

            DB::transaction(function () use ($validated, $item, $storedPath, $pengiriman, $skippedItemIds): void {
                Pod::query()->create([
                    'pengiriman_id' => (int) $validated['pengiriman_id'],
                    'item_id' => $item->id,
                    'tenaga_medis_id' => (int) $validated['tenaga_medis_id'],
                    'file' => $storedPath,
                    'created_by' => Auth::id(),
                ]);

                $item->update([
                    'status' => 4,
                ]);

                $remainingUndeliveredItems = ItemInventory::query()
                    ->whereHas('alokasi_detail', function ($query) use ($pengiriman): void {
                        $query->where('alokasi_nan', $pengiriman->id_nan);
                    })
                    ->whereNotIn('status', [3, 4])
                    ->whereNotIn('id', $skippedItemIds)
                    ->count();

                if ($remainingUndeliveredItems === 0) {
                    $latestPengirimanStatus = (int) (PengirimanEvent::query()
                        ->where('pengiriman_id', $pengiriman->id)
                        ->latest('id')
                        ->value('status') ?? 0);

                    if ($latestPengirimanStatus !== 4) {
                        PengirimanEvent::query()->create([
                            'pengiriman_id' => $pengiriman->id,
                            'status' => 4,
                            'note' => 'Delivered PoD',
                            'created_by' => Auth::id(),
                        ]);
                    }
                }
            });

            AuditService::logMenuAccess('Konfirmasi penyerahan manifest berhasil diproses');

            return response()->json([
                'status' => true,
                'message' => 'Konfirmasi penyerahan berhasil diproses.',
                'data' => [
                    'item_id' => $item->id,
                    'status' => 4,
                    'file' => $storedPath,
                ],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ]);
        } catch (AuthorizationException) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki akses untuk aksi ini.',
            ]);
        } catch (\Exception) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }

    public function openBox(Request $request): JsonResponse
    {
        try {
            Gate::authorize('viewPOD');

            $validated = $request->validate([
                'pengiriman_id' => ['required', 'integer', 'exists:pengiriman,id'],
                'keterangan' => ['required', 'string', 'max:255'],
            ], [
                'pengiriman_id.required' => 'Data pengiriman wajib dipilih.',
                'pengiriman_id.integer' => 'ID pengiriman tidak valid.',
                'pengiriman_id.exists' => 'Data pengiriman tidak ditemukan.',
                'keterangan.required' => 'Keterangan pembukaan wajib diisi.',
                'keterangan.string' => 'Keterangan harus berupa teks.',
                'keterangan.max' => 'Keterangan maksimal 255 karakter.',
            ]);

            $pengiriman = Pengiriman::query()->findOrFail((int) $validated['pengiriman_id']);

            // Get the latest event
            $latestEvent = PengirimanEvent::query()
                ->where('pengiriman_id', $pengiriman->id)
                ->latest('id')
                ->first();

            if (!$latestEvent) {
                return response()->json([
                    'status' => false,
                    'message' => 'Event pengiriman tidak ditemukan.',
                ]);
            }

            // Update item_details with opening_note
            $itemDetails = $latestEvent->item_details ?? [];
            foreach ($itemDetails as &$detail) {
                $detail['opening_note'] = $validated['keterangan'];
            }

            $updatedNote = preg_replace('/\s*\(LOCK\)/i', '', (string) $latestEvent->note);

            $latestEvent->update([
                'item_details' => $itemDetails,
                'note' => trim($updatedNote),
            ]);

            AuditService::logAction('open_box', "Membuka box pengiriman ID {$pengiriman->id} dengan keterangan: {$validated['keterangan']}");

            return response()->json([
                'status' => true,
                'message' => 'Box berhasil dibuka.',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ]);
        } catch (AuthorizationException) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki akses untuk aksi ini.',
            ]);
        } catch (\Exception) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }

    public function cancelDelivery(Request $request): JsonResponse
    {
        try {
            Gate::authorize('createPOD');

            $validated = $request->validate([
                'pengiriman_id' => ['required', 'integer', 'exists:pengiriman,id'],
                'item_id' => ['required', 'integer', 'exists:item_inventory,id'],
                'keterangan' => ['required', 'string', 'max:1000'],
            ], [
                'pengiriman_id.required' => 'Data pengiriman wajib dipilih.',
                'pengiriman_id.integer' => 'ID pengiriman tidak valid.',
                'pengiriman_id.exists' => 'Data pengiriman tidak ditemukan.',
                'item_id.required' => 'Item yang dipindai wajib diisi.',
                'item_id.integer' => 'ID item tidak valid.',
                'item_id.exists' => 'Item tidak ditemukan.',
                'keterangan.required' => 'Keterangan pembatalan wajib diisi.',
                'keterangan.string' => 'Keterangan harus berupa teks.',
                'keterangan.max' => 'Keterangan maksimal 1000 karakter.',
            ]);

            $item = ItemInventory::query()
                ->select('id', 'id_detail_alokasi', 'nsn', 'status')
                ->findOrFail((int) $validated['item_id']);

            $pengiriman = Pengiriman::query()
                ->select('id', 'id_nan')
                ->findOrFail((int) $validated['pengiriman_id']);

            $skippedItemIds = collect($pengiriman->pengiriman_events ?? [])
                ->pluck('item_details')
                ->filter()
                ->map(fn($details) => is_string($details) ? json_decode($details, true) : $details)
                ->flatten(1)
                ->where('status', 'skipped')
                ->pluck('item_id')
                ->unique()
                ->toArray();


            $isItemInSelectedPengiriman = $item->alokasi_detail()
                ->where('alokasi_nan', $pengiriman->id_nan)
                ->exists();

            if (! $isItemInSelectedPengiriman) {
                return response()->json([
                    'status' => false,
                    'message' => 'Item tidak termasuk dalam alokasi pengiriman terpilih.',
                ]);
            }

            if ((int) $item->status !== 1) {
                return response()->json([
                    'status' => false,
                    'message' => 'Item ini belum dikonfirmasi penyerahannya atau sudah dibatalkan.',
                ]);
            }

            DB::transaction(function () use ($validated, $item, $pengiriman, $skippedItemIds): void {
                $item->update([
                    'status' => 3,
                    'keterangan' => $validated['keterangan'],
                ]);

                // Tambahkan Pod dengan status 2 untuk pembatalan
                Pod::query()->create([
                    'pengiriman_id' => (int) $validated['pengiriman_id'],
                    'item_id' => $item->id,
                    'tenaga_medis_id' => $item->alokasi_detail->tenaga_medis_id,
                    'file' => null,
                    'status' => 2, // Status untuk pembatalan
                    'created_by' => Auth::id(),
                ]);

                $remainingUndeliveredItems = ItemInventory::query()
                    ->whereHas('alokasi_detail', function ($query) use ($pengiriman): void {
                        $query->where('alokasi_nan', $pengiriman->id_nan);
                    })
                    ->whereNotIn('status', [3, 4])
                    ->whereNotIn('id', $skippedItemIds)
                    ->count();

                if ($remainingUndeliveredItems === 0) {
                    $latestPengirimanStatus = (int) (PengirimanEvent::query()
                        ->where('pengiriman_id', $pengiriman->id)
                        ->latest('id')
                        ->value('status') ?? 0);

                    if ($latestPengirimanStatus !== 4) {
                        PengirimanEvent::query()->create([
                            'pengiriman_id' => $pengiriman->id,
                            'status' => 4,
                            'note' => 'Delivered PoD',
                            'created_by' => Auth::id(),
                        ]);
                    }
                }
            });


            AuditService::logMenuAccess('Pembatalan penyerahan manifest berhasil diproses');

            return response()->json([
                'status' => true,
                'message' => 'Pembatalan penyerahan berhasil diproses.',
                'data' => [
                    'item_id' => $item->id,
                    'status' => 3,
                ],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ]);
        } catch (AuthorizationException) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki akses untuk aksi ini.',
            ]);
        } catch (\Exception) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }
}
