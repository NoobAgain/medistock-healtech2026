<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Alokasi;
use App\Models\ItemInventory;
use App\Models\Pod;
use App\Models\Pengiriman;
use App\Models\PengirimanEvent;
use App\Models\UnitRawat;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class PelacakanItem extends Controller
{
    public function index()
    {
        return Inertia::render('PelacakanItem');
    }

    public function search(Request $request)
    {
        $request->validate([
            'identifier' => 'required|string',
            'type' => 'nullable|in:hash',
        ]);

        $identifier = trim($request->input('identifier'));
        $type = $request->input('type');

        // First attempt UID Box from pengiriman (if identifier is numeric)
        if (is_numeric($identifier)) {
            $pengiriman = Pengiriman::with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama'])->where('uid', $identifier)->first();
            if ($pengiriman) {
                return $this->traceByPengiriman($pengiriman);
            }
        }

        // Then attempt ID NAN from alokasi (if identifier is numeric)
        if (is_numeric($identifier)) {
            $alokasi = Alokasi::with('details')->where('nan', $identifier)->first();
            if ($alokasi) {
                return $this->traceByAlokasi($alokasi);
            }
        }

        // Then attempt ID NSN from item inventory (if identifier is numeric)
        if (is_numeric($identifier)) {
            $item = ItemInventory::with(['alokasi_detail:id,alokasi_nan,jenis,ukuran,kategori'])->where('nsn', $identifier)->first();
            if ($item) {
                return $this->traceByItem($item);
            }
        }

        // Finally fallback to hash search for item or box
        $item = ItemInventory::with(['alokasi_detail:id,alokasi_nan,jenis,ukuran,kategori'])->where('hash', $identifier)->first();
        if ($item) {
            return $this->traceByItem($item);
        }

        $pengiriman = Pengiriman::with(['alokasi:id,nan,unit_rawat_id,periode', 'alokasi.unit_rawat:id,nama'])->where('hash', $identifier)->first();
        if ($pengiriman) {
            return $this->traceByPengiriman($pengiriman);
        }

        return response()->json([
            'success' => false,
            'message' => 'Item atau Box tidak ditemukan.',
        ]);
    }

    private function traceByAlokasi(Alokasi $alokasi): JsonResponse
    {
        $alokasi->load('details');

        $itemIds = $alokasi->details->pluck('id');
        $items = ItemInventory::query()
            ->whereIn('id_detail_alokasi', $itemIds)
            ->select('id', 'nsn', 'status')
            ->get()
            ->map(function (ItemInventory $item) {
                return [
                    'id' => $item->id,
                    'nsn' => (string) $item->nsn,
                    'status' => $item->status,
                ];
            });

        $jenis = $alokasi->details->pluck('jenis')->filter()->unique()->values()->all();
        $kategori = $alokasi->details->pluck('kategori')->filter()->unique()->values()->all();

        return response()->json([
            'success' => true,
            'data' => [
                'type' => 'alokasi',
                'nan' => (string) $alokasi->nan,
                'jumlah' => $items->count(),
                'jenis' => $jenis,
                'kategori' => $kategori,
                'items' => $items,
            ],
        ]);
    }

    private function traceByItem(ItemInventory $item): JsonResponse
    {
        $item->load(['alokasi_detail.alokasi.unit_rawat']);

        $pengiriman = \App\Models\Pengiriman::query()
            ->with([
                'alokasi:id,nan,unit_rawat_id,periode',
                'alokasi.unit_rawat:id,nama',
                'user:id,id_tenaga_medis',
                'user.tenaga_medis:id,data',
            ])
            ->where('id_nan', $item->alokasi_detail->alokasi_nan)
            ->first();

        $pengirimanInfo = null;
        $eventRows = collect();

        if ($pengiriman) {
            $events = \App\Models\PengirimanEvent::query()
                ->where('pengiriman_id', $pengiriman->id)
                ->orderBy('id')
                ->get(['id', 'status', 'note', 'created_at', 'created_by']);

            [$creators, $unit_rawatMap] = $this->resolveEventCreators($events);

            $eventRows = $events->map(function (\App\Models\PengirimanEvent $e) use ($creators, $unit_rawatMap): array {
                $creator = $creators->get((int) ($e->created_by ?? 0));
                $unit_rawatId = (int) ($creator?->tenaga_medis?->data['unit_rawat'] ?? 0);

                return [
                    'id' => $e->id,
                    'status' => (int) $e->status,
                    'statusLabel' => statusLabel((int) $e->status),
                    'note' => trim((string) $e->note),
                    'lokasi' => $unit_rawatMap->get($unit_rawatId) ?? '-',
                    'createdBy' => $creator?->tenaga_medis?->data['nama'] ?? '-',
                    'createdAt' => (string) $e->created_at,
                ];
            })->values();

            $pengirimanInfo = [
                'id' => $pengiriman->id,
                'uid' => (string) $pengiriman->uid,
                'nan' => (string) ($pengiriman->id_nan ?? '-'),
                'unit_rawat' => $pengiriman->alokasi?->unit_rawat?->nama ?? '-',
                'periode' => $pengiriman->alokasi?->periode ?? '-',
                'createdBy' => $pengiriman->user?->tenaga_medis?->data['nama'] ?? '-',
                'createdAt' => (string) $pengiriman->created_at,
            ];
        }

        return response()->json([
            'success' => true,
            'data' => [
                'type' => 'item',
                'id' => $item->id,
                'nsn' => (string) $item->nsn,
                'hash' => $this->maskHash((string) $item->hash),
                'itemStatus' => $item->status,
                'alokasi' => $item->alokasi_detail ? [
                    'nan' => (string) $item->alokasi_detail->alokasi_nan,
                    'unit_rawat' => $item->alokasi_detail->alokasi?->unit_rawat?->nama ?? '-',
                    'periode' => $item->alokasi_detail->alokasi?->periode ?? '-',
                    'tenaga_medis' => $item->alokasi_detail->tenaga_medis ? [
                        'nama' => $item->alokasi_detail->tenaga_medis->data['nama'] ?? '-',
                        'nrp' => $item->alokasi_detail->tenaga_medis->data['nrp'] ?? '-',
                        'pangkat' => $item->alokasi_detail->tenaga_medis->data['pangkat'] ?? '-',
                    ] : null,
                ] : null,
                'pengiriman' => $pengirimanInfo,
                'events' => $eventRows->values(),
            ],
        ]);
    }

    private function traceByPengiriman(Pengiriman $pengiriman): JsonResponse
    {
        $pengiriman->load([
            'alokasi:id,nan,unit_rawat_id,periode',
            'alokasi.unit_rawat:id,nama',
            'user:id,id_tenaga_medis',
            'user.tenaga_medis:id,data',
        ]);

        $events = \App\Models\PengirimanEvent::query()
            ->where('pengiriman_id', $pengiriman->id)
            ->orderBy('id')
            ->get(['id', 'status', 'note', 'created_at', 'created_by']);

        [$creators, $unit_rawatMap] = $this->resolveEventCreators($events);

        $eventRows = $events->map(function (\App\Models\PengirimanEvent $e) use ($creators, $unit_rawatMap): array {
            $creator = $creators->get((int) ($e->created_by ?? 0));
            $unit_rawatId = (int) ($creator?->tenaga_medis?->data['unit_rawat'] ?? 0);

            return [
                'id' => $e->id,
                'status' => (int) $e->status,
                'statusLabel' => statusLabel((int) $e->status),
                'note' => trim((string) $e->note),
                'lokasi' => $unit_rawatMap->get($unit_rawatId) ?? '-',
                'createdBy' => $creator?->tenaga_medis?->data['nama'] ?? '-',
                'createdAt' => (string) $e->created_at,
            ];
        })->values();

        $pengirimanInfo = [
            'id' => $pengiriman->id,
            'uid' => (string) $pengiriman->uid,
            'nan' => (string) ($pengiriman->id_nan ?? '-'),
            'unit_rawat' => $pengiriman->alokasi?->unit_rawat?->nama ?? '-',
            'periode' => $pengiriman->alokasi?->periode ?? '-',
            'createdBy' => $pengiriman->user?->tenaga_medis?->data['nama'] ?? '-',
            'createdAt' => (string) $pengiriman->created_at,
        ];

        // Get items in this pengiriman/box through alokasi relationship
        $items = ItemInventory::query()
            ->whereIn('id_detail_alokasi', function ($query) use ($pengiriman) {
                $query->select('id')
                    ->from('alokasi_detail')
                    ->where('alokasi_nan', $pengiriman->id_nan);
            })
            ->select('id', 'nsn', 'hash', 'status')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nsn' => (string) $item->nsn,
                    'hash' => $this->maskHash((string) $item->hash),
                    'status' => $item->status,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'type' => 'pengiriman',
                'id' => $pengiriman->id,
                'uid' => (string) $pengiriman->uid,
                'hash' => $this->maskHash((string) $pengiriman->hash),
                'nan' => (string) ($pengiriman->id_nan ?? '-'),
                'unit_rawat' => $pengiriman->alokasi?->unit_rawat?->nama ?? '-',
                'periode' => $pengiriman->alokasi?->periode ?? '-',
                'jumlah' => $items->count(),
                'items' => $items,
                'pengiriman' => $pengirimanInfo,
                'events' => $eventRows->values(),
                'createdBy' => $pengiriman->user?->tenaga_medis?->data['nama'] ?? '-',
                'createdAt' => (string) $pengiriman->created_at,
            ],
        ]);
    }

    private function resolveEventCreators(Collection $events): array
    {
        $creatorIds = $events
            ->pluck('created_by')
            ->filter()
            ->map(fn($id) => (int) $id)
            ->unique();

        $creators = \App\Models\User::query()
            ->with('tenaga_medis:id,data')
            ->whereIn('id', $creatorIds)
            ->get()
            ->keyBy('id');

        $unit_rawatIds = $creators
            ->pluck('tenaga_medis.data.unit_rawat')
            ->filter()
            ->map(fn($id) => (int) $id)
            ->unique();

        $unit_rawatMap = \App\Models\UnitRawat::query()
            ->whereIn('id', $unit_rawatIds)
            ->pluck('nama', 'id');

        return [$creators, $unit_rawatMap];
    }

    private function maskHash(string $hash): string
    {
        if (strlen($hash) <= 8) {
            return $hash;
        }

        return substr($hash, 0, 4) . '...' . substr($hash, -4);
    }
}
