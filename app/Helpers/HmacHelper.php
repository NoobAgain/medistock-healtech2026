<?php

namespace App\Helpers;

class HmacHelper
{
    public function __construct() {}

    private static function secret(): string
    {
        return config('app.hmac_secret') ?? throw new \RuntimeException('Secret not configured.');
    }

    public static function generate(string $uid): string
    {
        $secret = self::secret();
        $uid = strtoupper(trim($uid)); // normalisasi
        return hash_hmac('sha256', $uid, $secret);
    }

    public static function verify(string $uid, string $storedSignature): bool
    {
        $expected = self::generate($uid);
        return hash_equals($expected, $storedSignature);
    }
}
