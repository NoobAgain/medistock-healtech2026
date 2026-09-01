<?php

use App\Models\Alokasi;
use App\Models\AlokasiDetail;

if (!function_exists('applyDisplayNameAdvancedFilter')) {
    function applyDisplayNameAdvancedFilter($query, mixed $advancedFilterModel): void
    {
        if (! is_array($advancedFilterModel)) {
            return;
        }

        $condition = findFirstDisplayNameCondition($advancedFilterModel);

        if ($condition === null) {
            return;
        }

        $operator = $condition['operator'];
        $value = $condition['value'];

        if ($operator === 'blank') {
            $query->where(function ($nestedQuery): void {
                $nestedQuery->whereNull('display_name')->orWhere('display_name', '=', '');
            });

            return;
        }

        if ($operator === 'notBlank') {
            $query->whereNotNull('display_name')->where('display_name', '!=', '');

            return;
        }

        if (! is_string($value) || trim($value) === '') {
            return;
        }

        $cleanValue = trim($value);

        if ($operator === 'equals') {
            $query->where('display_name', 'ilike', $cleanValue);

            return;
        }

        if ($operator === 'notEqual') {
            $query->where('display_name', 'not ilike', $cleanValue);

            return;
        }

        if ($operator === 'startsWith') {
            $query->where('display_name', 'ilike', $cleanValue . '%');

            return;
        }

        if ($operator === 'endsWith') {
            $query->where('display_name', 'ilike', '%' . $cleanValue);

            return;
        }

        if ($operator === 'notContains') {
            $query->where('display_name', 'not ilike', '%' . $cleanValue . '%');

            return;
        }

        $query->where('display_name', 'ilike', '%' . $cleanValue . '%');
    }
}

if (!function_exists('findFirstDisplayNameCondition')) {
    function findFirstDisplayNameCondition(array $node): ?array
    {
        $filterType = $node['filterType'] ?? null;

        if ($filterType === 'join') {
            $conditions = $node['conditions'] ?? [];

            if (! is_array($conditions)) {
                return null;
            }

            foreach ($conditions as $condition) {
                if (! is_array($condition)) {
                    continue;
                }

                $found = findFirstDisplayNameCondition($condition);

                if ($found !== null) {
                    return $found;
                }
            }

            return null;
        }

        if (($node['colId'] ?? null) !== 'displayName' || ($node['filterType'] ?? null) !== 'text') {
            return null;
        }

        $operator = $node['type'] ?? null;

        if (! is_string($operator)) {
            return null;
        }

        $allowedOperators = ['contains', 'notContains', 'equals', 'notEqual', 'startsWith', 'endsWith', 'blank', 'notBlank'];

        if (! in_array($operator, $allowedOperators, true)) {
            return null;
        }

        return [
            'operator' => $operator,
            'value' => $node['filter'] ?? null,
        ];
    }
}

if (!function_exists('normalizeFilterModel')) {
    function normalizeFilterModel(mixed $filterModel): ?array
    {
        if (! is_array($filterModel)) {
            return null;
        }

        if (isset($filterModel['colId'], $filterModel['filterType'])) {
            return $filterModel;
        }

        foreach ($filterModel as $columnId => $condition) {
            if (! is_string($columnId) || ! is_array($condition)) {
                continue;
            }

            return [
                'colId' => $columnId,
                ...$condition,
            ];
        }

        return null;
    }
}

if (!function_exists('maskEmail')) {
    function maskEmail(
        string $email,
        int $prefixLength = 2,
        int $suffixLength = 2,
        string $maskChar = '*'
    ): string {
        if (empty($email)) return '';

        $atIndex = strrpos($email, '@');
        if ($atIndex === false) return $email;

        $local = substr($email, 0, $atIndex);
        $domain = substr($email, $atIndex + 1);
        $chars = mb_str_split($local);
        $length = count($chars);

        if ($length <= 1) return "{$maskChar}@{$domain}";
        if ($length === 2) return "{$chars[0]}{$maskChar}@{$domain}";
        if ($length === 3) return "{$chars[0]}{$maskChar}{$chars[2]}@{$domain}";

        $head = implode('', array_slice($chars, 0, $prefixLength));
        $tail = implode('', array_slice($chars, -$suffixLength));
        $maskLength = max($length - $prefixLength - $suffixLength, 1);

        return "{$head}" . str_repeat($maskChar, $maskLength) . "{$tail}@{$domain}";
    }
}

if (!function_exists('generateNAN')) {
    function generateNAN(): string
    {
        do {
            $time = time();
            $random = random_int(100, 999);
            $nan = $time . $random;
        } while (Alokasi::where('nan', $nan)->exists());
        return $nan;
    }
}

if (!function_exists('statusLabel')) {
    function statusLabel(int $status): string
    {
        return match ($status) {
            // Label UI (ramah pengguna) — nomor status tetap mengikuti sistem yang sudah ada.
            1 => 'Siap Dikirim',
            2 => 'Dalam Pengiriman',
            3 => 'Tiba & Diverifikasi',
            4 => 'Diterima Nakes (PoD)',
            9 => 'Dikembalikan',
            default => 'Status Tidak Diketahui',
        };
    }
}
