<?php

namespace App\Http\Controllers\pages;

use App\Helpers\HmacHelper;
use App\Http\Controllers\Controller;
use App\Models\ItemInventory;
use App\Services\AuditService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class RegItemBaru extends Controller
{
    public function index()
    {
        Gate::authorize('create', ItemInventory::class);
        AuditService::logMenuAccess('Akses Manajemen Inventory Baru ');

        return Inertia::render('RegItemBaru');
    }

    public function getNSN(Request $request)
    {
        try {
            $nsn = '';
            do {
                $time = time();
                $random = random_int(100, 999);
                $nsn = $time . $random;
            } while (ItemInventory::where('nsn', $nsn)->exists());

            return response()->json([
                'status' => true,
                'nsn' => $nsn,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }

    public function jmlAlokasi(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:alokasi_detail,id'],
            ]);

            $jml = ItemInventory::where('id_detail_alokasi', $validated['id'])->count();
            return response()->json([
                'status' => true,
                'jml' => $jml
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


    public function hashNTAG(Request $request)
    {
        $validated = $request->validate([
            'uid' => ['string', 'min:4', 'max:20'],
        ]);

        $signature = HmacHelper::generate($validated['uid'] ?? '');
        $existing = ItemInventory::query()
            ->Where('hash', $signature)
            ->first();

        return response()->json([
            'status' => $existing ? false : true,
            'signature' => $existing ? '' : $signature,
            'message' => $existing ? 'RFID/NTAG sudah terdaftar pada system' : ''
        ]);
    }

    public function addNewItem(Request $request): JsonResponse
    {
        try {
            Gate::authorize('create', ItemInventory::class);
            AuditService::logMenuAccess('Tambah Inventory Baru');

            $validated = $request->validate([
                'id_detail_alokasi' => ['required', 'integer', 'exists:alokasi_detail,id'],
                'nsn' => ['required', 'numeric', 'digits_between:10,20'],
                'hash' => ['required', 'string', 'min:16', 'max:255'],
                'status' => ['nullable', 'integer', 'in:0,1'],
            ]);

            $existing = ItemInventory::query()
                ->where('nsn', (string) $validated['nsn'])
                ->orWhere('hash', $validated['hash'])
                ->first();

            if ($existing) {
                return response()->json([
                    'status' => false,
                    'message' => 'Item sudah terdaftar pada sistem.',
                ]);
            }

            $item = ItemInventory::query()->create([
                'id_detail_alokasi' => (int) $validated['id_detail_alokasi'],
                'nsn' => (string) $validated['nsn'],
                'hash' => $validated['hash'],
                'status' => (int) ($validated['status'] ?? 1),
                'created_by' => Auth::id(),
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Data item berhasil disimpan.',
                'data' => [
                    'id' => $item->id,
                    'nsn' => (string) $item->nsn,
                ],
            ]);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Anda tidak memiliki izin untuk melakukan aksi ini.',
            ], 200);
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
}
