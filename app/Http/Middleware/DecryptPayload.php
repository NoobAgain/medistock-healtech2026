<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DecryptPayload
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->header('x-enc-key') && $request->header('x-enc-iv')) {
            $privateKeyPath = storage_path('crypto/private.pem');

            if (! file_exists($privateKeyPath)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Private key not found',
                ], 500);
            }

            $encryptedKey = $request->header('x-enc-key');
            $iv = $request->header('x-enc-iv');

            $payload = $request->input('payload');

            if (! $encryptedKey || ! $iv || ! $payload) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Encrypted data incomplete',
                ], 400);
            }

            $privateKey = file_get_contents($privateKeyPath);

            $success = openssl_private_decrypt(
                base64_decode($encryptedKey),
                $aesKeyBase64,
                $privateKey,
                OPENSSL_PKCS1_OAEP_PADDING
            );

            if (! $success) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to decrypt AES key',
                ], 400);
            }

            $aesKey = base64_decode($aesKeyBase64);

            $json = openssl_decrypt(
                base64_decode($payload),
                'AES-256-CBC',
                $aesKey,
                OPENSSL_RAW_DATA,
                base64_decode($iv)
            );

            if ($json === false) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to decrypt payload',
                ], 400);
            }

            $data = json_decode($json, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid JSON payload',
                ], 400);
            }
            // $request->merge(['decrypted' => $data,]);
            $request->replace($data);
        }
        return $next($request);
    }
}
