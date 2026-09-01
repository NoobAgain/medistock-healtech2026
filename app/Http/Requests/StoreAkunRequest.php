<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class StoreAkunRequest extends FormRequest
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
        $userId = $this->input('id');

        return [
            'id' => ['sometimes', 'integer', 'exists:users,id'],
            'username' => [
                'required',
                'string',
                'min:5',
                'max:255',
                Rule::unique('users', 'username')->ignore($userId),
            ],
            'password' => [
                'required_without:id',
                'nullable',
                'string',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]/',
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'id_tenaga_medis' => [
                'required',
                'integer',
                'exists:tenaga_medis,id',
                Rule::unique('users', 'id_tenaga_medis')->ignore($userId),
            ],
            'role' => ['required', 'integer', 'exists:roles,id'],
            'activeUser' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'id.integer' => 'ID akun harus berupa angka.',
            'id.exists' => 'Data akun tidak ditemukan.',

            'username.required' => 'Username wajib diisi.',
            'username.min' => 'Username minimal 5 karakter.',
            'username.max' => 'Username maksimal 255 karakter.',
            'username.unique' => 'Username sudah digunakan.',

            'password.required_without' => 'Password wajib diisi saat membuat akun baru.',
            'password.min' => 'Password minimal 8 karakter.',
            'password.regex' => 'Format password tidak valid.',

            'email' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',
            'email.unique' => 'Email sudah digunakan.',

            'id_tenaga_medis.required' => 'TenagaMedis wajib dipilih.',
            'id_tenaga_medis.integer' => 'TenagaMedis tidak valid.',
            'id_tenaga_medis.exists' => 'Data tenaga_medis tidak ditemukan.',
            'id_tenaga_medis.unique' => 'TenagaMedis sudah terhubung ke akun lain.',

            'role.required' => 'Role wajib dipilih.',
            'role.integer' => 'Role tidak valid.',
            'role.exists' => 'Data role tidak ditemukan.',

            'activeUser.required' => 'Status keaktifan akun wajib diisi.',
            'activeUser.boolean' => 'Status keaktifan akun tidak valid.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => $validator->errors()->first(),
            'errors' => $validator->errors(),
        ], 200));
    }
}
