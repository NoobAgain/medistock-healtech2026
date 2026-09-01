<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class FaskesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('faskes')->truncate();

        $now = Carbon::now();

        $data = [
            [1, 'IM', 'Faskes Iskandar Muda'],
            [2, 'BB', 'Faskes I/Bukit Barisan'],
            [3, 'SR', 'Faskes II/Sriwijaya'],
            [4, 'SL', 'Faskes III/Siliwangi'],
            [5, 'DP', 'Faskes IV/Diponegoro'],
            [6, 'BW', 'Faskes V/Brawijaya'],
            [7, 'MW', 'Faskes VI/Mulawarman'],
            [8, 'UD', 'Faskes IX/Udayana'],
            [9, 'TP', 'Faskes XII/Tanjungpura'],
            [10, 'MD', 'Faskes XIII/Merdeka'],
            [11, 'HN', 'Faskes XIV/Hasanuddin'],
            [12, 'PM', 'Faskes XVI/Pattimura'],
            [13, 'CW', 'Faskes XVII/Cenderawasih'],
            [14, 'KS', 'Faskes XVIII/Kasuari'],
            [15, 'JY', 'Faskes Jaya/Jayakarta'],
        ];

        $insertData = [];

        foreach ($data as $row) {
            [$id, $abbr, $nama] = $row;

            $insertData[] = [
                'id' => $id,
                'kode' => sprintf('%03d-%s', $id, $abbr),
                'nama' => $nama,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('faskes')->insert($insertData);
    }
}
