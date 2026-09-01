<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreAlokasi extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nan' => ['required', 'digits_between:1,19'],
            'periode' => ['required', 'integer', 'exists:periode,id'],
            'unit_rawat' => ['required', 'integer'],

            'rowData' => ['required', 'array', 'min:1'],

            'rowData.*.jenis' => ['required', 'string'],
            'rowData.*.ukuran' => ['required', 'string'],
            'rowData.*.kategori' => ['required', 'string'],
            'rowData.*.tenaga_medis_id' => ['nullable', 'integer', 'exists:tenaga_medis,id'],
            'rowData.*.jumlah' => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'nan.required' => 'NAN wajib diisi',
            'nan.digits_between' => 'NAN tidak valid',
            'periode.required' => 'Periode wajib diisi',
            'unit_rawat.required' => 'UnitRawat wajib dipilih',

            'rowData.required' => 'Data alokasi alkes wajib ada',
            'rowData.array' => 'Format data tidak valid',

            'rowData.*.jenis.required' => 'Jenis alokasi alkes wajib dipilih',
            'rowData.*.ukuran.required' => 'Ukuran alokasi alkes wajib dipilih',
            'rowData.*.kategori.required' => 'Kategori alokasi alkes wajib dipilih',
            'rowData.*.tenaga_medis_id.integer' => 'TenagaMedis tidak valid',
            'rowData.*.tenaga_medis_id.exists' => 'TenagaMedis tidak ditemukan',

            'rowData.*.jumlah.required' => 'Jumlah wajib diisi',
            'rowData.*.jumlah.integer' => 'Jumlah harus angka',
            'rowData.*.jumlah.min' => 'Jumlah minimal 1',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Validasi gagal.',
            'errors' => $validator->errors(),
        ], 200));
    }
}
