<?php

use App\Http\Controllers\pages\Dashboard;
use App\Http\Controllers\pages\DataAkun;
use App\Http\Controllers\pages\DataAlokasi;
use App\Http\Controllers\pages\DataPenerimaan;
use App\Http\Controllers\pages\DataPengiriman;
use App\Http\Controllers\pages\DataPersonil;
use App\Http\Controllers\pages\DataPoD;
use App\Http\Controllers\pages\DataRole;
use App\Http\Controllers\pages\KodamSatuan;
use App\Http\Controllers\pages\Login;
use App\Http\Controllers\pages\Monitoring;
use App\Http\Controllers\pages\MonitoringAlokasi;
use App\Http\Controllers\pages\OpsiKaporlap;
use App\Http\Controllers\pages\PelacakanItem;
use App\Http\Controllers\pages\PengirimanBaru;
use App\Http\Controllers\pages\PenyaluranManifest;
use App\Http\Controllers\pages\PeriodeAlokasi;
use App\Http\Controllers\pages\ReceivedPengiriman;
use App\Http\Controllers\pages\RegItem;
use App\Http\Controllers\pages\RegItemBaru;
use App\Http\Controllers\pages\RekonPengiriman;
use App\Http\Controllers\pages\Roadmap;
use App\Http\Controllers\pages\TestReader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['guest'])->group(function () {
    Route::get('/', [Login::class, 'index'])->name('login');
    Route::post('/login', [Login::class, 'login'])->middleware('throttle:5,1')->name('login-auth');
    Route::get('/lostpassword', [Login::class, 'lostpassword'])->name('login-lostpassword');
    Route::post('/lostpasswordReset', [Login::class, 'lostpasswordReset'])->middleware('throttle:3,1')->name('login-lostpasswordReset');

    // Reset Password
    Route::get('/reset-password/{token}', [Login::class, 'resetToken'])->name('password.reset');
    Route::post('/passwordbaru', [Login::class, 'newPasswordAkun'])->middleware('throttle:5,1')->name('password-resetuser');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [Dashboard::class, 'index'])->name('dashboard');
    Route::post('/dashboard-periode-options', [Dashboard::class, 'periodeOptions'])->name('dashboard-periode-options');
    Route::post('/dashboard-executive-summary', [Dashboard::class, 'executiveSummary'])->name('dashboard-executive-summary');
    Route::post('/dashboard-actions', [Dashboard::class, 'actions'])->name('dashboard-actions');
    Route::post('/dashboard-distribusi-trend', [Dashboard::class, 'distribusiTrend'])->name('dashboard-distribusi-trend');
    Route::post('/dashboard-bottleneck', [Dashboard::class, 'bottleneck'])->name('dashboard-bottleneck');
    Route::post('/dashboard-rekon', [Dashboard::class, 'rekonSummary'])->name('dashboard-rekon');
    Route::post('/dashboard-red-flag', [Dashboard::class, 'redFlags'])->name('dashboard-red-flag');
    Route::post('/dashboard-trace', [Dashboard::class, 'traceEvent'])->middleware('throttle:30,1')->name('dashboard-trace');

    Route::get('/pelacakan-item', [PelacakanItem::class, 'index'])->name('pelacakan-item');
    Route::post('/pelacakan-item/search', [PelacakanItem::class, 'search'])->name('pelacakan-item-search');


    Route::get('/dataakun', [DataAkun::class, 'index'])->name('dataakun');
    Route::post('/dataakun', [DataAkun::class, 'getDataAkun'])->name('dataakun-listdata');

    Route::get('/akunBaru', [DataAkun::class, 'akunBaru'])->name('akunbaru');
    Route::get('/akunBaruOpsi', [DataAkun::class, 'getPersonilRole'])->name('akunbaru-opsi');
    Route::post('/akunBaru', [DataAkun::class, 'addEditAkun'])->name('akunbaru-addedit');
    Route::post('/akunHapus', [DataAkun::class, 'deleteAkun'])->name('akunbaru-hapus');

    Route::get('/datarole', [DataRole::class, 'index'])->name('datarole');
    Route::post('/datarole', [DataRole::class, 'getDataRole'])->name('datarole-listdata');

    Route::get('/datarolebaru', [DataRole::class, 'roleBaru'])->name('datarole-baru');
    Route::post('/hapusrole', [DataRole::class, 'deleteRole'])->name('datarole-delete');
    Route::post('/datarolebaru', [DataRole::class, 'roleBaruAddedit'])->name('datarole-baru-addedit');

    Route::get('/roadmap', [Roadmap::class, 'index'])->name('roadmap');
    Route::post('/logout', [Login::class, 'logout'])->name('logout');

    Route::get('/datapersonil', [DataPersonil::class, 'index'])->name('datapersonil');
    Route::post('/listdatapersonil', [DataPersonil::class, 'listDataPersonil'])->name('listdatapersonil');

    Route::get('/datapersonilbaru', [DataPersonil::class, 'personilBaru'])->name('datapersonilbaru');
    Route::post('/datapersonilbaru', [DataPersonil::class, 'dataPersonilBaru'])->name('datapersonilbaru-addedit');
    Route::post('/deletepersonil', [DataPersonil::class, 'deletePersonil'])->name('datapersonil-delete');

    Route::get('/datapersonilupload', [DataPersonil::class, 'datapersonilupload'])->name('datapersonil-upload');
    Route::post('/upload-personil', [DataPersonil::class, 'uploadPersonil'])->name('datapersonil-upload-post');
    Route::get('/download-template-personil', [DataPersonil::class, 'downloadTemplate'])->name('datapersonil-download-template');


    Route::get('/dataSatuan', [KodamSatuan::class, 'dataSatuan'])->name('data-satuan');
    Route::post('/dataSatuan', [KodamSatuan::class, 'satuanBaru'])->name('data-satuan-baru');

    Route::delete('/hapusSatuan', [KodamSatuan::class, 'hapusSatuan'])->name('data-satuan-hapus');

    Route::get('/dataKodam', [KodamSatuan::class, 'dataKodam'])->name('data-kodam');
    Route::post('/dataKodam', [KodamSatuan::class, 'kodamBaru'])->name('data-kodam-baru');
    Route::delete('/hapusKodam', [KodamSatuan::class, 'hapusKodam'])->name('data-kodam-hapus');

    Route::get('/dataPeriode', [PeriodeAlokasi::class, 'dataPeriode'])->name('data-periode');
    Route::post('/dataPeriode', [PeriodeAlokasi::class, 'periodeBaru'])->name('data-periode-baru');
    Route::delete('/hapusPeriode', [PeriodeAlokasi::class, 'hapusPeriode'])->name('data-periode-hapus');

    Route::get('/alokasi', [DataAlokasi::class, 'index'])->name('data-alokasi');
    Route::get('/alokasilist', [DataAlokasi::class, 'dataAlokasi'])->name('data-list-alokasi');
    Route::post('/alokasilist', [DataAlokasi::class, 'dataAlokasi'])->name('data-list-alokasi-post');
    Route::get('/alokasibaru', [DataAlokasi::class, 'alokasiBaru'])->name('data-alokasi-baru');
    Route::post('/alokasibaru', [DataAlokasi::class, 'addEditAlokasiBaru'])->name('data-alokasi-add-edit');
    Route::delete('/alokasi/{alokasi}', [DataAlokasi::class, 'destroy'])->name('data-alokasi-destroy');
    Route::post('/alokasi/{alokasi}/acc', [DataAlokasi::class, 'acc'])->name('data-alokasi-acc');
    Route::post('/alokasi/{alokasi}/acc2', [DataAlokasi::class, 'acc2'])->name('data-alokasi-acc2');
    Route::get('/alokasiNAN', [DataAlokasi::class, 'alokasiNAN'])->name('data-alokasi-nan');

    /**
     * MAIN Route
     */
    Route::get('/registrasiitem', [RegItem::class, 'index'])->name('reg-item');
    Route::post('/registrasiitem-listdata', [RegItem::class, 'listDataInventory'])->name('reg-item-listdata');
    Route::post('/registrasiitem-del', [RegItem::class, 'delItem'])->name('reg-item-delete');

    Route::get('/registrasiitembaru', [RegItemBaru::class, 'index'])->name('reg-item-baru');
    Route::get('/registrasiitem-nsn', [RegItemBaru::class, 'getNSN'])->name('reg-item-getnsn');
    Route::post('/registrasiitem-hash', [RegItemBaru::class, 'hashNTAG'])->name('reg-item-gethash');
    Route::post('/registrasiitem-add', [RegItemBaru::class, 'addNewItem'])->name('reg-item-addnew');
    Route::post('/registrasiitem-jmlalokasi', [RegItemBaru::class, 'jmlAlokasi'])->name('reg-item-jmlalokasi');

    Route::get('/pengiriman-baru', [PengirimanBaru::class, 'index'])->name('pengiriman-baru');
    Route::get('/pengiriman-uid', [PengirimanBaru::class, 'getUID'])->name('pengiriman-uid');
    Route::post('/pengiriman-dataAlokasi', [PengirimanBaru::class, 'dataAlokasi'])->name('pengiriman-dataAlokasi');
    Route::post('/pengiriman-hashBox', [PengirimanBaru::class, 'hashBox'])->name('pengiriman-hashBox');
    Route::post('/pengiriman-store', [PengirimanBaru::class, 'agregasiBaru'])->name('pengiriman-store');

    Route::get('/data-pengiriman', [DataPengiriman::class, 'index'])->name('data-pengiriman');
    Route::post('/data-pengiriman-listdata', [DataPengiriman::class, 'listDataPengiriman'])->name('data-pengiriman-listdata');
    Route::post('/data-pengiriman-delete', [DataPengiriman::class, 'deletePengiriman'])->name('data-pengiriman-delete');

    Route::get('/monitoring', [Monitoring::class, 'index'])->name('monitoring');
    Route::post('/monitoring-listdata', [Monitoring::class, 'dataPengirimanListdata'])->name('monitoring-listdata');
    Route::post('/monitoring-detail', [Monitoring::class, 'detailPengiriman'])->name('monitoring-detail');
    Route::post('/monitoring-summary', [Monitoring::class, 'summary'])->name('monitoring-summary');
    Route::post('/monitoring-periode-options', [Monitoring::class, 'periodeOptions'])->name('monitoring-periode-options');
    Route::post('/monitoring-satuan-induk-options', [Monitoring::class, 'satuanIndukOptions'])->name('monitoring-satuan-induk-options');
    Route::post('/monitoring-satuan-bawah-options', [Monitoring::class, 'satuanBawahOptions'])->name('monitoring-satuan-bawah-options');

    /**
     * Monitoring Pengajuan Alokasi (Nominatif)
     */
    Route::get('/monitoring-alokasi', [MonitoringAlokasi::class, 'index'])->name('monitoring-alokasi');
    Route::post('/monitoring-alokasi-periode-options', [MonitoringAlokasi::class, 'periodeOptions'])->name('monitoring-alokasi-periode-options');
    Route::post('/monitoring-alokasi-satuan-induk-options', [MonitoringAlokasi::class, 'satuanIndukOptions'])->name('monitoring-alokasi-satuan-induk-options');
    Route::post('/monitoring-alokasi-satuan-bawah-options', [MonitoringAlokasi::class, 'satuanBawahOptions'])->name('monitoring-alokasi-satuan-bawah-options');
    Route::post('/monitoring-alokasi-summary', [MonitoringAlokasi::class, 'summary'])->name('monitoring-alokasi-summary');
    Route::post('/monitoring-alokasi-listnan', [MonitoringAlokasi::class, 'listNan'])->name('monitoring-alokasi-listnan');
    Route::post('/monitoring-alokasi-detail', [MonitoringAlokasi::class, 'detail'])->name('monitoring-alokasi-detail');

    Route::get('/received-pengiriman', [ReceivedPengiriman::class, 'index'])->name('received-pengiriman');
    Route::post('/received-infobox', [ReceivedPengiriman::class, 'getInfoReceivedBox'])->name('received-infobox');
    Route::post('/received-transit', [ReceivedPengiriman::class, 'addTransitEvent'])->name('received-transit');

    Route::get('/rekon-pengiriman', [RekonPengiriman::class, 'index'])->name('rekon-pengiriman');
    Route::post('/rekon-items', [RekonPengiriman::class, 'listDataRekon'])->name('rekon-items');
    Route::post('/rekon-confirm-received', [RekonPengiriman::class, 'confirmReceived'])->name('rekon-confirm-received');

    Route::get('/data-penerimaan', [DataPenerimaan::class, 'index'])->name('data-penerimaan');
    Route::post('/data-penerimaan-listdata', [DataPenerimaan::class, 'listDataPenerimaan'])->name('data-penerimaan-listdata');
    Route::post('/data-penerimaan-detail', [DataPenerimaan::class, 'detailDataPenerimaan'])->name('data-penerimaan-detail');

    Route::get('/penyaluran-manifest', [PenyaluranManifest::class, 'index'])->name('penyaluran-manifest');
    Route::get('/penyaluran-manifest-data', [PenyaluranManifest::class, 'manifestData'])->name('penyaluran-manifest-data');
    Route::get('/penyaluran-manifest-nrp-options', [PenyaluranManifest::class, 'nrpOptions'])->name('penyaluran-manifest-nrp-options');
    Route::post('/penyaluran-manifest-scan-validate', [PenyaluranManifest::class, 'scanValidate'])->name('penyaluran-manifest-scan-validate');
    Route::post('/penyaluran-manifest-confirm-delivery', [PenyaluranManifest::class, 'confirmDelivery'])->name('penyaluran-manifest-confirm-delivery');
    Route::post('/penyaluran-manifest-cancel-delivery', [PenyaluranManifest::class, 'cancelDelivery'])->name('penyaluran-manifest-cancel-delivery');
    Route::post('/penyaluran-manifest-open-box', [PenyaluranManifest::class, 'openBox'])->name('penyaluran-manifest-open-box');
    Route::get('/data-pod', [DataPoD::class, 'index'])->name('data-pod');
    Route::post('/data-pod-listdata', [DataPoD::class, 'listData'])->name('data-pod-listdata');

    Route::post('/data-pod-delete', [DataPoD::class, 'destroy'])->name('data-pod-delete');
    Route::get('/data-pod-file/{id}', [DataPoD::class, 'serveFile'])->name('data-pod-file');

    Route::get('/test-reader', [TestReader::class, 'index'])->name('test-reader');


    /**
     * OPSI KAPORLAP (Kelengkapan Perorangan Lapangan)
     */
    Route::get('/opsi-jenis', [OpsiKaporlap::class, 'getJenis'])->name('opsi-jenis');
    Route::post('/opsi-jenis', [OpsiKaporlap::class, 'addJenis'])->name('opsi-addjenis');
    Route::post('/opsi-jenis-remove', [OpsiKaporlap::class, 'delJenis'])->name('opsi-addjenis-remove');

    Route::get('/opsi-ukuran', [OpsiKaporlap::class, 'getUkuran'])->name('opsi-ukuran');
    Route::post('/opsi-ukuran', [OpsiKaporlap::class, 'addUkuran'])->name('opsi-addukuran');
    Route::post('/opsi-ukuran-remove', [OpsiKaporlap::class, 'delUkuran'])->name('opsi-addukuran-remove');

    Route::get('/opsi-kategori', [OpsiKaporlap::class, 'getKategori'])->name('opsi-kategori');
    Route::post('/opsi-kategori', [OpsiKaporlap::class, 'addKategori'])->name('opsi-addkategori');
    Route::post('/opsi-kategori-remove', [OpsiKaporlap::class, 'delKategori'])->name('opsi-addkategori-remove');

    Route::get('/opsi-alokasi', [OpsiKaporlap::class, 'getAlokasi'])->name('opsi-alokasi');
    Route::get('/opsi-notalokasi', [OpsiKaporlap::class, 'getAlokasiNotSended'])->name('opsi-notalokasi');
    Route::post('/opsi-alokasi-detail', [OpsiKaporlap::class, 'getDetailAlokasi'])->name('opsi-alokasi-detail');

    Route::get('/permission', function (Request $request) {
        return response()->json([
            'permissions' => $request->user()
                ->getAllPermissions()
                ->pluck('name'),
        ]);
    })->name('permission');
});

// Route::middleware(['auth', 'role:system_admin'])->group(function () {
//     //
// });
// Route::middleware(['auth', 'permission:audit.view_all'])->group(function () {
//     //
// });

/** Hash SSL */
Route::prefix('guardrail')->middleware('throttle:5,1')->group(function () {
    Route::get('/pubkey', function () {
        return response()->json([
            'key' => file_get_contents(base_path('storage/crypto/public.pem')),
        ]);
    })->name('guardrail.pubkey');
});

// Route fallback untuk menangani semua URL yang tidak terdaftar
Route::any('{any}', function () {
    return Inertia::render('ErrorPage');
})->where('any', '.*');
Route::post('/penyaluran-manifest-cancel-delivery', [PenyaluranManifest::class, 'cancelDelivery'])->name('penyaluran-manifest-cancel-delivery');