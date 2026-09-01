<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Faskes;
use App\Models\UnitRawat;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class KodamSatuan extends Controller
{
    public function index()
    {
        return Inertia::render('FaskesUnitRawat');
    }

    public function dataSatuan(Request $request)
    {
        try {

            $daftarUnitRawat = UnitRawat::get();

            return response()->json([
                'status' => true,
                'data' => $daftarUnitRawat,
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

    public function satuanBaru(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => ['nullable', 'integer', 'exists:unit_rawat,id'],
                'nmunit_rawat' => ['required', 'string', 'max:255'],
            ], [
                'id.exists' => 'Data unit_rawat tidak ditemukan.',
                'nmunit_rawat.required' => 'Nama unit_rawat wajib diisi.',
            ]);

            $isUpdate = isset($validated['id']) && $validated['id'] !== null;
            $kode = $this->generateUnitRawatKode($validated['nmunit_rawat'], $validated['id'] ?? null);

            if ($isUpdate) {
                $unit_rawat = UnitRawat::query()->find($validated['id']);
                $unit_rawat->update([
                    'kode' => $kode,
                    'nama' => $validated['nmunit_rawat'],
                ]);
            } else {
                $unit_rawat = UnitRawat::query()->create([
                    'kode' => $kode,
                    'nama' => $validated['nmunit_rawat'],
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => $isUpdate
                    ? 'Berhasil memperbarui data unit rawat.'
                    : 'Berhasil menambahkan data unit rawat.',
                'data' => $unit_rawat,
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

    private function generateUnitRawatKode(string $nama, ?int $ignoreId = null): string
    {
        $cleanName = trim(preg_replace('/\s+/', ' ', $nama));
        $parts = preg_split('/[^\p{L}\p{N}]+/u', $cleanName, -1, PREG_SPLIT_NO_EMPTY);

        if (count($parts) >= 2) {
            $base = strtoupper(mb_substr($parts[0], 0, 1).mb_substr($parts[1], 0, 1));
        } elseif (count($parts) === 1) {
            $base = strtoupper(mb_substr($parts[0], 0, 2));
        } else {
            $base = 'ST';
        }

        $base = preg_replace('/[^A-Z0-9]/', '', $base);
        if (strlen($base) < 2) {
            $base = str_pad($base, 2, 'X');
        }

        $code = $base;
        $suffix = 1;
        while (UnitRawat::query()
            ->where('kode', $code)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists()
        ) {
            $code = $base.$suffix++;
        }

        return $code;
    }

    public function hapusSatuan(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:unit_rawat,id'],
            ], [
                'id.required' => 'Data unit_rawat yang akan dihapus wajib dipilih.',
                'id.exists' => 'Data unit_rawat tidak ditemukan.',
            ]);

            $unit_rawat = UnitRawat::query()->findOrFail($validated['id']);
            $unit_rawat->delete();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil menghapus data unit rawat.',
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

    public function dataKodam(Request $request)
    {
        try {
            $daftarFaskes = Faskes::get();

            return response()->json([
                'status' => true,
                'data' => $daftarFaskes,
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

    public function kodamBaru(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => ['nullable', 'integer', 'exists:faskes,id'],
                'nama' => ['required', 'string', 'max:255'],
            ], [
                'id.exists' => 'Data faskes tidak ditemukan.',
                'nama.required' => 'Nama faskes wajib diisi.',
            ]);

            $isUpdate = isset($validated['id']) && $validated['id'] !== null;
            $kode = $this->generateFaskesKode($validated['nama'], $validated['id'] ?? null);

            if ($isUpdate) {
                $faskes = Faskes::query()->find($validated['id']);
                $faskes->update([
                    'kode' => $kode,
                    'nama' => $validated['nama'],
                ]);
            } else {
                $faskes = Faskes::query()->create([
                    'kode' => $kode,
                    'nama' => $validated['nama'],
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => $isUpdate
                    ? 'Berhasil memperbarui data faskes.'
                    : 'Berhasil menambahkan data faskes.',
                'data' => $faskes,
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

    private function generateFaskesKode(string $nama, ?int $ignoreId = null): string
    {
        $cleanName = trim(preg_replace('/\s+/', ' ', $nama));
        if (str_starts_with(strtolower($cleanName), 'faskes ')) {
            $cleanName = trim(mb_substr($cleanName, 6));
        }

        $parts = preg_split('/[^\p{L}\p{N}]+/u', $cleanName, -1, PREG_SPLIT_NO_EMPTY);
        if (count($parts) >= 2) {
            $base = strtoupper(mb_substr($parts[0], 0, 1).mb_substr($parts[1], 0, 1));
        } elseif (count($parts) === 1) {
            $base = strtoupper(mb_substr($parts[0], 0, 2));
        } else {
            $base = 'KD';
        }

        $base = preg_replace('/[^A-Z0-9]/', '', $base);
        if (strlen($base) < 2) {
            $base = str_pad($base, 2, 'X');
        }

        $code = $base;
        $suffix = 1;
        while (Faskes::query()
            ->where('kode', $code)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists()
        ) {
            $code = $base.$suffix++;
        }

        return $code;
    }

    public function hapusKodam(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:faskes,id'],
            ], [
                'id.required' => 'Data faskes yang akan dihapus wajib dipilih.',
                'id.exists' => 'Data faskes tidak ditemukan.',
            ]);

            $faskes = Faskes::query()->findOrFail($validated['id']);
            $faskes->delete();

            return response()->json([
                'status' => true,
                'message' => 'Berhasil menghapus data faskes.',
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
