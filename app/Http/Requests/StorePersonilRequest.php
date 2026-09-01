<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTenagaMedisRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['sometimes', 'integer', 'exists:tenaga_medis,id'],
            'nrp' => ['required', 'string', 'regex:/^[0-9]+$/', 'min:2', 'max:50'],
            'nama' => ['required', 'string', 'min:5', 'max:255'],
            'pangkat' => [
                'required',
                'string',
                'in:prada,pratu,praka,kopda,koptu,kopka,serda,sertu,serka,serma,pelda,peltu,letda,lettu,kapten,mayor,letkol,kolonel,brigjen,mayjen,letjen,jenderal',
            ],
            'faskes' => ['required', 'integer', 'exists:faskes,id'],
            'unit_rawat' => ['required', 'integer', 'exists:unit_rawat,id'],
            'lokasi' => ['required', 'string', 'min:3', 'max:255'],
            'posisi' => ['required', 'string', 'min:3', 'max:255'],
            'tgllahir' => ['required', 'date_format:Y-m-d'],
            'tglmasukunit_rawat' => ['required', 'date_format:Y-m-d'],
            'alamat' => ['required', 'string', 'min:5', 'max:255'],
            'activeTenagaMedis' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'id.integer' => 'ID harus berupa angka.',
            'id.exists'  => 'Data tenaga_medis tidak ditemukan.',

            'nrp.required' => 'NRP wajib diisi.',
            'nrp.regex' => 'NRP harus berupa angka.',
            'nrp.min' => 'NRP minimal 2 digit.',
            'nrp.max' => 'NRP maksimal 50 digit.',

            'nama.required' => 'Nama wajib diisi.',
            'nama.min' => 'Nama minimal 5 karakter.',
            'nama.max' => 'Nama maksimal 255 karakter.',

            'pangkat.required' => 'Pangkat wajib dipilih.',
            'pangkat.in' => 'Pangkat yang dipilih tidak valid.',

            'faskes.required' => 'Faskes wajib dipilih.',
            'faskes.integer' => 'Faskes tidak valid.',
            'faskes.exists' => 'Data Faskes tidak ditemukan.',

            'unit_rawat.required' => 'UnitRawat wajib dipilih.',
            'unit_rawat.integer' => 'UnitRawat tidak valid.',
            'unit_rawat.exists' => 'Data UnitRawat tidak ditemukan.',

            'lokasi.required' => 'Dislokasi wajib diisi.',
            'lokasi.min' => 'Dislokasi minimal 3 karakter.',
            'lokasi.max' => 'Dislokasi maksimal 255 karakter.',

            'ukbaju.required' => 'Ukuran baju wajib dipilih.',
            'ukbaju.in' => 'Ukuran baju tidak valid.',

            'tgllahir.required' => 'Tanggal lahir wajib diisi.',
            'tgllahir.date_format' => 'Format tanggal lahir tidak valid (YYYY-MM-DD).',

            'tglmasukunit_rawat.required' => 'Tanggal masuk unit_rawat wajib diisi.',
            'tglmasukunit_rawat.date_format' => 'Format tanggal masuk unit_rawat tidak valid (YYYY-MM-DD).',

            'alamat.required' => 'Alamat wajib diisi.',
            'alamat.min' => 'Alamat minimal 5 karakter.',
            'alamat.max' => 'Alamat maksimal 255 karakter.',

            'activeTenagaMedis.required' => 'Status keaktifan tenaga_medis wajib diisi.',
            'activeTenagaMedis.boolean' => 'Status keaktifan tenaga_medis tidak valid.',
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
