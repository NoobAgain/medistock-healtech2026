<?php

namespace App\Http\Controllers\pages;

use App\Helpers\HmacHelper;
use App\Http\Controllers\Controller;
use App\Models\Alokasi;
use App\Models\AlokasiDetail;
use App\Models\ItemInventory;
use App\Models\Pengiriman;
use App\Policies\PagePengiriman;
use App\Services\AuditService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PengirimanBaru extends Controller
{
    public function index()
    {
        Gate::authorize('create', Pengiriman::class);
        AuditService::logMenuAccess('Pengiriman Baru');
        return Inertia::render('PengirimanBaru');
    }

    public function getUID(Request $request)
    {
        try {
            Gate::authorize('create', Pengiriman::class);

            do {
                $time = time();
                $random = random_int(100, 999);
                $uid = $time . $random;
            } while (Pengiriman::where('uid', $uid)->exists());

            return response()->json([
                'status' => true,
                'uid' => $uid
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

    public function hashBox(Request $request)
    {
        try {
            Gate::authorize('create', Pengiriman::class);
            $validated = $request->validate([
                'uid' => ['required', 'string', 'max:32', 'regex:/^[A-Fa-f0-9]+$/'],
                'boxUID' => ['required', 'string', 'max:32', 'regex:/^[0-9]+$/'],
            ], [
                'uid.required' => 'UID wajib diisi.',
                'uid.max' => 'UID maksimal 32 karakter.',
                'uid.regex' => 'UID hanya boleh berisi karakter heksadesimal (0-9, A-F).',
                'boxUID.required' => 'Box UID wajib diisi.',
                'boxUID.max' => 'Box UID maksimal 32 digit.',
                'boxUID.regex' => 'Box UID hanya boleh berisi angka.',
            ]);

            $signature = HmacHelper::generate($validated['uid']);
            $existingInBox = Pengiriman::query()
                ->where('hash', $signature)
                ->exists();

            $existingInItem = ItemInventory::query()
                ->where('hash', $signature)
                ->exists();

            $alreadyRegistered = $existingInBox || $existingInItem;

            return response()->json([
                'status' => !$alreadyRegistered,
                'signature' => $alreadyRegistered ? '' : $signature,
                'message' => $alreadyRegistered ? 'RFID/NTAG sudah terdaftar pada sistem.' : '',
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

    public function dataAlokasi(Request $request)
    {
        try {
            Gate::authorize('create', Pengiriman::class);
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:alokasi,nan'],
            ], [
                'id.integer' => 'ID harus berupa angka.',
                'id.exists'  => 'Data Role tidak ditemukan.',
            ]);

            $alokasi = Alokasi::with('unit_rawat:id,nama')
                ->withSum('details as total_alokasi_items', 'jumlah')
                ->where('nan', $validated['id'])
                ->first();

            if ($alokasi) {
                $alokasi->items_teralokasi = ItemInventory::whereIn(
                    'id_detail_alokasi',
                    AlokasiDetail::where('alokasi_nan', $alokasi->nan)->pluck('id')
                )->count();
            }

            return response()->json([
                'status' => true,
                'data' => $alokasi
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

    public function agregasiBaru(Request $request)
    {
        try {
            Gate::authorize('create', Pengiriman::class);
            $validated = $request->validate([
                'boxuid' => ['required', 'integer', 'unique:pengiriman,uid'],
                'signature' => ['required', 'string'],
                'alokasi' => ['required', 'integer', 'exists:alokasi,nan', 'unique:pengiriman,id_nan'],
            ], [
                'boxuid.required' => 'Box UID wajib diisi.',
                'boxuid.integer' => 'Box UID harus berupa angka.',
                'boxuid.unique' => 'Box UID sudah terdaftar dalam sistem.',
                'signature.required' => 'Silahkan tap card atau tag NFC/NTAG.',
                'alokasi.required' => 'Silahkan pilih Alokasi.',
                'alokasi.integer' => 'ID Alokasi harus berupa angka.',
                'alokasi.exists' => 'Data Alokasi tidak ditemukan.',
                'alokasi.unique' => 'Alokasi ini sudah memiliki data pengiriman, proses dibatalkan.',
            ]);

            return DB::transaction(function () use ($validated) {
                $pengiriman = Pengiriman::create([
                    'uid' => $validated['boxuid'],
                    'id_nan' => $validated['alokasi'],
                    'hash' => $validated['signature'],
                    'created_by' => Auth::id(),
                ]);

                $pengiriman->pengiriman_events()->create([
                    'created_by' => Auth::id(),
                    'status' => 1,
                    'note' => 'Initialized/Ready',
                ]);

                AuditService::logMenuAccess('Pengiriman baru berhasil dibuat');

                return response()->json([
                    'status' => true,
                    'message' => 'Pengiriman berhasil dibuat.',
                    'data' => [
                        'id' => $pengiriman->id,
                        'uid' => $pengiriman->uid,
                        'hash' => $pengiriman->hash,
                    ]
                ]);
            });
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ], 500);
        }
    }
}
