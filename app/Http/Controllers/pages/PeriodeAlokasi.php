<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Periode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class PeriodeAlokasi extends Controller
{
    public function dataPeriode(Request $request)
    {
        try {
            $daftarPeriode = Periode::orderBy('nama', 'desc')->get();

            return response()->json([
                'status' => true,
                'data' => $daftarPeriode,
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

    public function periodeBaru(Request $request)
    {
        try {
            // Check permission using the menu-based permission system
            $userPermissions = Auth::user()?->getAllPermissions()->pluck('name')->toArray() ?? [];
            if (! in_array('menu.alokasi.addeditperiode', $userPermissions)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Anda tidak memiliki izin untuk menambah/mengedit periode.',
                ], 403);
            }

            $validated = $request->validate([
                'id' => ['nullable', 'integer', 'exists:periode,id'],
                'nama' => ['required', 'string', 'max:100'],
            ], [
                'id.exists' => 'Data periode tidak ditemukan.',
                'nama.required' => 'Nama periode wajib diisi.',
                'nama.max' => 'Nama periode maksimal 100 karakter.',
            ]);

            $isUpdate = isset($validated['id']) && $validated['id'] !== null;

            if ($isUpdate) {
                $periode = Periode::query()->find($validated['id']);
                $periode->update([
                    'nama' => $validated['nama'],
                ]);
            } else {
                // Check for duplicate
                if (Periode::where('nama', $validated['nama'])->exists()) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Periode dengan nama yang sama sudah ada.',
                    ]);
                }

                $periode = Periode::query()->create([
                    'nama' => $validated['nama'],
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => $isUpdate
                    ? 'Berhasil memperbarui data periode.'
                    : 'Berhasil menambahkan data periode.',
                'data' => $periode,
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

    public function hapusPeriode(Request $request)
    {
        try {
            // Check permission using the menu-based permission system
            $userPermissions = Auth::user()?->getAllPermissions()->pluck('name')->toArray() ?? [];
            if (! in_array('menu.alokasi.addeditperiode', $userPermissions)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Anda tidak memiliki izin untuk menghapus periode.',
                ], 403);
            }

            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:periode,id'],
            ], [
                'id.required' => 'Data periode yang akan dihapus wajib dipilih.',
                'id.exists' => 'Data periode tidak ditemukan.',
            ]);

            $periode = Periode::query()->findOrFail($validated['id']);
            $periode->delete();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil menghapus data periode.',
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
}
