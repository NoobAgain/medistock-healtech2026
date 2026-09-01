<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TenagaMedis
 *
 * @property int $id
 * @property string $id_hash
 * @property string $data
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class TenagaMedis extends Model
{
    protected $table = 'tenaga_medis';

    protected $fillable = [
        'id_hash',
        'data'
    ];

    protected $casts = [
        'data' => 'encrypted:array',
    ];

    public function getUnitRawatAttribute()
    {
        $unit_rawatId = $this->data['unit_rawat'] ?? '';
        if (!$unit_rawatId) {
            return null;
        }
        return \App\Models\UnitRawat::find($unit_rawatId);
    }
    public function getFaskesAttribute()
    {
        $faskesID = $this->data['faskes'] ?? '';
        if (!$faskesID) {
            return null;
        }
        return \App\Models\Faskes::find($faskesID);
    }


    public function pangkat()
    {
        $pangkat = [
            'prada' => 'Tenaga Administrasi',
            'pratu' => 'Asisten Apoteker',
            'praka' => 'Pramu Farmasi Senior',
            'kopda' => 'Perawat Pelaksana',
            'koptu' => 'Perawat Pelaksana Lanjutan',
            'kopka' => 'Perawat Mahir',
            'serda' => 'Bidan Pelaksana',
            'sertu' => 'Bidan Pelaksana Lanjutan',
            'serka' => 'Bidan Mahir',
            'serma' => 'Apoteker',
            'pelda' => 'Apoteker Madya',
            'peltu' => 'Kepala Gudang Farmasi',
            'letda' => 'Dokter Umum',
            'lettu' => 'Dokter Jaga Senior',
            'kapten' => 'Kepala Unit Rawat',
            'mayor' => 'Kepala Instalasi Farmasi',
            'letkol' => 'Dokter Spesialis',
            'kolonel' => 'Kepala Bidang Pelayanan Medis',
            'brigjen' => 'Wakil Direktur Medis',
            'mayjen' => 'Direktur Medis',
            'letjen' => 'Direktur Rumah Sakit',
            'jenderal' => 'Kepala Dinas Kesehatan',
        ];

        $curPangkat = $this->data['pangkat'] ?? '';
        return $pangkat[$curPangkat] ?? '';
    }
}
