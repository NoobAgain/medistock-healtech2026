<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class Login extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Login');
    }

    public function login(Request $request)
    {
        try {
            $rules = [
                'username' => ['required', 'string', 'min:3', 'max:30', 'regex:/^[a-zA-Z0-9_.]+$/'],
                'password' => ['required', 'string', 'min:6',],
                'remember' => ['nullable', 'boolean'],
            ];

            $validator = Validator::make($request->all(), $rules, [
                'username.required' => 'Username wajib diisi.',
                'username.string'   => 'Username harus berupa teks.',
                'username.min'      => 'Username minimal :min karakter.',
                'username.max'      => 'Username maksimal :max karakter.',
                'username.regex'    => 'Username hanya boleh mengandung huruf, angka, dan underscore (_).',
                'password.required' => 'Password wajib diisi.',
                'password.string'   => 'Password harus berupa teks.',
                'password.min'      => 'Password minimal :min karakter.',
                'password.regex'    => 'Password mengandung karakter yang tidak diperbolehkan.',
                'remember.boolean'  => 'Format remember tidak valid.',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => $validator->errors()->first(),
                    'errors' => $validator->errors(),
                ]);
            }

            $username = $request->input('username', '');
            $password = $request->input('password', '');
            $remember = $request->boolean('remember', '');


            $user = User::where('username', (string) $username)->first();
            if (! $user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Maaf user atau password yang anda isikan tidak tersedia.',
                ]);
            }

            if (! Hash::check($password, $user->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Maaf user atau password yang anda isikan tidak tersedia..',
                ]);
            }

            if ($user->is_active === false) {
                return response()->json([
                    'status' => false,
                    'message' => 'Maaf, Akun anda tidak aktif untuk saat ini.',
                ]);
            }

            Auth::login($user, $remember);
            $request->session()->regenerate();
            $user->forceFill([
                'last_login_at' => now(),
            ])->save();

            return response()->json([
                'status' => true,
                'redirect' => route('dashboard')
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Maaf, Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi',
            ]);
        }
    }

    public function logout(Request $request)
    {
        $status = false;
        $redirect = null;
        if (Auth::guard('web')->check()) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            $redirect = route('login');
            $status = true;
        }

        return response()->json([
            'status' => $status,
            'redirect' => $redirect,
        ]);
    }

    public function lostpassword(Request $request)
    {
        return Inertia::render('LostPassword');
    }
    public function lostpasswordReset(Request $request)
    {

        try {
            $request->validate([
                'email' => ['required', 'email', 'max:255'],
            ]);

            $status = Password::sendResetLink(
                $request->only('email')
            );

            if ($status === Password::RESET_LINK_SENT) {
                return response()->json([
                    'status' => true,
                    'message' => 'Tautan reset password telah dikirim ke email Anda.',
                ]);
            }

            return response()->json([
                'status' => false,
                'message' => __($status),
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Maaf, Gagal dalam mendapatkan data. Silahkan ulangi beberapa saat lagi',
            ]);
        }
    }
    public function resetToken(Request $request, $token)
    {
        return Inertia::render('ResetPassword', [
            'token' => $token,
            'email' => $request->email
        ]);
    }
    public function newPasswordAkun(Request $request)
    {
        try {

            $request->validate(
                [
                    'token' => ['required'],
                    'email' => ['required', 'email', 'exists:users,email'],
                    'password' => ['required', 'confirmed', 'min:8'],
                ],
                [
                    'token.required' => 'Token reset password wajib diisi.',
                    'email.required' => 'Email wajib diisi.',
                    'email.email' => 'Format email tidak valid.',
                    'email.exists' => 'Email tidak terdaftar dalam sistem.',
                    'password.required' => 'Password baru wajib diisi.',
                    'password.min' => 'Password minimal 8 karakter.',
                    'password.confirmed' => 'Konfirmasi password tidak cocok.',
                ]
            );


            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function (User $user, string $password) {
                    $user->forceFill([
                        'password' => Hash::make($password),
                        'remember_token' => Str::random(60),
                    ])->save();
                }
            );


            if ($status === Password::INVALID_USER || $status === Password::INVALID_TOKEN) {
                return response()->json([
                    'status' => false,
                    'message' => 'Rubah password akun gagal.',
                ]);
            }

            if ($status === Password::RESET_THROTTLED) {
                return response()->json([
                    'status' => false,
                    'message' => 'Rubah password akun gagal. Silahkan ulangi beberapa saat lagi',
                ]);
            }


            if ($status === Password::PASSWORD_RESET) {
                return response()->json([
                    'status' => true,
                    'message' => __($status),
                ]);
            }

            return response()->json([
                'status' => false,
                'message' => __($status),
            ], 422);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Rubah password akun gagal. Silahkan ulangi beberapa saat lagi!',
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
