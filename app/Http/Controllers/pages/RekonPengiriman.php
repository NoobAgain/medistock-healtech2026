<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\ItemInventory;
use App\Models\Pengiriman;
use App\Models\PengirimanEvent;
use App\Services\AuditService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RekonPengiriman extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        Gate::authorize('viewAnyKonfirmasi', Pengiriman::class);
        AuditService::logMenuAccess('Rekonsiliasi Penerimaan');

        $pengirimanInfo = null;
        $rawId = $request->input('id');

        if ($rawId !== null) {
            $id = (int) $rawId;

            if ($id > 0) {
                $pengiriman = Pengiriman::query()
                    ->with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama'])
                    ->find($id);

                if ($pengiriman) {
                    $lastStatus = (int) (PengirimanEvent::query()
                        ->where('pengiriman_id', $pengiriman->id)
                        ->latest('id')
                        ->value('status') ?? 0);

                    if ($lastStatus >= 3) {
                        return redirect()->route('received-pengiriman')
                            ->with('message', 'Status pengiriman sudah di terima.');
                    }

                    $pengirimanInfo = [
                        'id'      => $pengiriman->id,
                        'uid'     => (string) $pengiriman->uid,
                        'nan'     => (string) ($pengiriman->id_nan ?? '-'),
                        'unit_rawat'  => $pengiriman->alokasi?->unit_rawat?->nama ?? '-',
                        'periode' => $pengiriman->alokasi?->periode ?? '-',
                    ];
                }
            }
        }

        return Inertia::render('RekonPengiriman', [
            'pengirimanInfo' => $pengirimanInfo,
        ]);
    }

    public function listDataRekon(Request $request): JsonResponse
    {
        // try {
        Gate::authorize('viewAnyKonfirmasi', Pengiriman::class);

        $validated = $request->validate([
            'pengiriman_id' => ['required', 'integer', 'exists:pengiriman,id'],
            'page'          => ['nullable', 'integer', 'min:1'],
            'perPage'       => ['nullable', 'integer', 'min:1', 'max:100'],
            'sortField'     => ['nullable', 'string'],
            'sortDirection' => ['nullable', 'string', 'in:asc,desc'],
        ]);

        $pengirimanId  = (int) $validated['pengiriman_id'];
        $page          = (int) ($validated['page'] ?? 1);
        $perPage       = (int) ($validated['perPage'] ?? 10);
        $sortField     = is_string($validated['sortField'] ?? null) ? $validated['sortField'] : 'id';
        $sortDirection = ($validated['sortDirection'] ?? 'asc') === 'desc' ? 'desc' : 'asc';

        $pengiriman = Pengiriman::query()->findOrFail($pengirimanId);
        $nan        = (int) ($pengiriman->id_nan ?? 0);

        // Ambil semua item yang di-skip dari event transit sebelumnya
        $skippedItemIds = collect(PengirimanEvent::query()
            ->where('pengiriman_id', $pengirimanId)
            ->where('status', 2)
            ->get(['item_details'])
            ->pluck('item_details')
            ->flatten(1)
            ->where('status', 'skipped')
            ->pluck('item_id')
            ->unique()
            ->values()
            ->all());

        $query = ItemInventory::query()
            ->with(['alokasi_detail:id,alokasi_nan,jenis,ukuran,kategori,tenaga_medis_id', 'alokasi_detail.tenaga_medis:id,data'])
            ->select(
                'item_inventory.id',
                'item_inventory.nsn',
                'item_inventory.hash',
                'item_inventory.status',
                'item_inventory.id_detail_alokasi',
                'item_inventory.created_at',
            )
            ->whereHas('alokasi_detail', function (Builder $q) use ($nan): void {
                $q->where('alokasi_nan', $nan);
            });

        $this->applySorting($query, $sortField, $sortDirection);

        $data  = $query->paginate($perPage, ['*'], 'page', $page);
        $items = collect($data->items())->map(function ($item) use ($skippedItemIds) {
            if (isset($item->hash) && ! empty($item->hash)) {
                $hash = $item->hash;
                if (strlen($hash) <= 12) {
                    $item->hash = str_repeat('*', strlen($hash));
                } else {
                    $item->hash = substr($hash, 0, 8) . str_repeat('*', strlen($hash) - 12) . substr($hash, -8);
                }
            }

            $item->tenaga_medis = $item->alokasi_detail?->tenaga_medis?->data['nama'] ?? '-';
            $item->skipped = $skippedItemIds->contains($item->id);

            return $item;
        })->toArray();

        return response()->json([
            'status'  => true,
            'message' => 'Berhasil memproses permintaan.',
            'data'    => $items,
            'total'   => $data->total(),
        ]);
        // } catch (\Illuminate\Auth\Access\AuthorizationException) {
        //     return response()->json([
        //         'status'  => false,
        //         'message' => 'Anda tidak memiliki akses untuk melihat data ini.',
        //     ], 403);
        // } catch (\Exception $e) {
        //     return response()->json([
        //         'status'  => false,
        //         'message' => 'Terjadi kesalahan sistem.',
        //     ]);
        // }
    }

    public function confirmReceived(Request $request): JsonResponse
    {
        try {
            Gate::authorize('tiba', Pengiriman::class);

            $validated = $request->validate([
                'pengiriman_id' => ['required', 'integer', 'exists:pengiriman,id'],
                'missmatch' => ['nullable', 'boolean'],
            ], [
                'pengiriman_id.required' => 'Data pengiriman wajib diisi.',
                'pengiriman_id.integer' => 'ID pengiriman harus berupa angka.',
                'pengiriman_id.exists' => 'Data pengiriman tidak ditemukan.',
                'missmatch.boolean' => 'Nilai missmatch tidak valid.',
            ]);

            $pengirimanId = (int) $validated['pengiriman_id'];
            $isMismatch = (bool) ($validated['missmatch'] ?? false);

            $lastStatus = (int) (PengirimanEvent::query()
                ->where('pengiriman_id', $pengirimanId)
                ->latest('id')
                ->value('status') ?? 0);

            if (in_array($lastStatus, [3, 4], true)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Penerimaan untuk pengiriman ini sudah diproses sebelumnya.',
                ]);
            }

            // Ambil item_details dari transit sebelumnya yang skipped
            $skippedItemDetails = collect(PengirimanEvent::query()
                ->where('pengiriman_id', $pengirimanId)
                ->where('status', 2)
                ->get(['item_details'])
                ->pluck('item_details')
                ->flatten(1)
                ->where('status', 'skipped')
                ->unique('item_id')
                ->values()
                ->all());

            PengirimanEvent::query()->create([
                'pengiriman_id' => $pengirimanId,
                'status' => 3,
                'note' => $isMismatch ? 'Arrived / Verified (LOCK)' : 'Arrived / Verified',
                'created_by' => Auth::id(),
                'item_details' => $skippedItemDetails->isNotEmpty() ? $skippedItemDetails->toArray() : null,
            ]);

            AuditService::logMenuAccess('Pengiriman event tiba berhasil diproses');

            return response()->json([
                'status' => true,
                'message' => $isMismatch
                    ? 'Konfirmasi penerimaan berhasil diproses dengan status lock.'
                    : 'Konfirmasi penerimaan berhasil diproses.',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Illuminate\Auth\Access\AuthorizationException) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki akses untuk aksi ini.',
            ], 403);
        } catch (\Exception) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ], 500);
        }
    }

    private function applySorting(Builder $query, string $sortField, string $sortDirection): void
    {
        $allowed = ['id', 'nsn', 'hash', 'status', 'created_at'];

        if (in_array($sortField, $allowed, true)) {
            $query->orderBy('item_inventory.' . $sortField, $sortDirection);
        } else {
            $query->orderBy('item_inventory.id', 'desc');
        }
    }
}
