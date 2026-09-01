<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Alokasi;
use App\Models\AlokasiDetail;
use App\Models\JenisAlkes;
use App\Models\KategoriAlkes;
use App\Models\UkuranAlkes;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OpsiKaporlap extends Controller
{
    /**
     * Jenis
     */
    public function getJenis(Request $request)
    {
        try {
            $jenis = JenisAlkes::where('is_active', true)->get();
            return response()->json([
                'status' => true,
                'data' => $jenis,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }
    public function addJenis(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama' => ['required', 'string', 'min:3', 'max:255'],
            ]);

            $result = JenisAlkes::query()->create([
                'nama' => $validated['nama'],
            ]);

            return response()->json([
                'status' => true,
                'data' => [
                    'id' => $result->id,
                    'label' => $result->nama
                ],
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
    public function delJenis(Request $request)
    {
        try {
            $id = $request->input('id');
            if (is_string($id) && str_starts_with(trim($id), '{')) {
                $decoded = json_decode($id, true);
                $id = $decoded['id'] ?? $id;
            }
            $request->merge(['id' => $id]);
            $validated = $request->validate([
                'id' => [
                    'required',
                    'integer',
                    'exists:jenis_alkes,id'
                ],
            ]);

            $result = JenisAlkes::where('id', $validated['id'])->update([
                'is_active' => false,
            ]);

            return response()->json([
                'status' => !$result ? false : true,
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

    /**
     * Kategori
     */
    public function getKategori(Request $request)
    {
        try {
            $jenis = KategoriAlkes::where('is_active', true)->get();
            return response()->json([
                'status' => true,
                'data' => $jenis,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }
    public function addKategori(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama' => ['required', 'string', 'min:3', 'max:255'],
            ]);

            $result = KategoriAlkes::query()->create([
                'nama' => $validated['nama'],
            ]);

            return response()->json([
                'status' => true,
                'data' => [
                    'id' => $result->id,
                    'label' => $result->nama
                ],
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
    public function delKategori(Request $request)
    {
        try {
            $id = $request->input('id');
            if (is_string($id) && str_starts_with(trim($id), '{')) {
                $decoded = json_decode($id, true);
                $id = $decoded['id'] ?? $id;
            }
            $request->merge(['id' => $id]);

            $validated = $request->validate([
                'id' => [
                    'required',
                    'integer',
                    'exists:kategori_alkes,id'
                ],
            ]);

            $result = KategoriAlkes::where('id', $validated['id'])->update([
                'is_active' => false,
            ]);

            return response()->json([
                'status' => !$result ? false : true,
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

    /**
     * Ukuran
     */
    public function getUkuran(Request $request)
    {
        try {
            $jenis = UkuranAlkes::where('is_active', true)->get();
            return response()->json([
                'status' => true,
                'data' => $jenis,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }
    public function addUkuran(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama' => ['required', 'string', 'min:1', 'max:255'],
            ]);

            $result = UkuranAlkes::query()->create([
                'nama' => $validated['nama'],
            ]);

            return response()->json([
                'status' => true,
                'data' => [
                    'id' => $result->id,
                    'label' => $result->nama
                ],
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
    public function delUkuran(Request $request)
    {
        try {
            $id = $request->input('id');
            if (is_string($id) && str_starts_with(trim($id), '{')) {
                $decoded = json_decode($id, true);
                $id = $decoded['id'] ?? $id;
            }
            $request->merge(['id' => $id]);

            $validated = $request->validate([
                'id' => [
                    'required',
                    'integer',
                    'exists:ukuran_alkes,id'
                ],
            ]);

            $result = UkuranAlkes::where('id', $validated['id'])->update([
                'is_active' => false,
            ]);

            return response()->json([
                'status' => !$result ? false : true,
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


    /**
     * Alokasi
     */
    public function getAlokasi(Request $request)
    {
        try {
            $jenis = Alokasi::select(['nan as id', DB::raw("CONCAT(nan, ' - ', periode) as nama")])->where('status', '110')->get();
            return response()->json([
                'status' => true,
                'data' => $jenis,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }

    public function getAlokasiNotSended(Request $request): JsonResponse
    {
        try {
            $jenis = Alokasi::select(['nan as id', DB::raw("CONCAT(nan, ' - ', periode) as nama")])
                ->where('status', '110')
                ->doesntHave('pengiriman')
                ->get();
            return response()->json([
                'status' => true,
                'data' => $jenis,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }

    public function getDetailAlokasi(Request $request)
    {
        try {
            $nan = $request->input('nan') ?? $request->input('id');
            if (is_string($nan) && str_starts_with(trim($nan), '{')) {
                $decoded = json_decode($nan, true);
                $nan = $decoded['nan'] ?? $decoded['id'] ?? $nan;
            }
            $request->merge(['nan' => $nan]);
            $validated = $request->validate([
                'nan' => ['required', 'integer', 'min:1', 'exists:alokasi,nan']
            ]);
            $result = AlokasiDetail::with('tenaga_medis')
                ->where('alokasi_nan', $validated['nan'])
                ->get();
            $data = [];
            foreach ($result as $value) {
                $tenaga_medisNrp = (string) ($value->tenaga_medis?->data['nrp'] ?? '');
                $tenaga_medisNama = (string) ($value->tenaga_medis?->data['nama'] ?? '');
                $nrpNama = $tenaga_medisNrp || $tenaga_medisNama
                    ? trim($tenaga_medisNrp . ' - ' . $tenaga_medisNama, ' -')
                    : '-';

                $data[] = [
                    'id' => $value->id,
                    'nama' => $value->jenis['name'] . ' | Uk. ' . $value->ukuran['name'] . ' | ' . $value->kategori['name'] . ' | ' . $nrpNama,
                    'jml_alokasi' => $value->jumlah,
                ];
            }
            return response()->json([
                'status' => true,
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan sistem.',
            ]);
        }
    }
}
