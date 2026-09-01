import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
export const dataSatuan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataSatuan.url(options),
    method: 'get',
})

dataSatuan.definition = {
    methods: ["get","head"],
    url: '/dataSatuan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
dataSatuan.url = (options?: RouteQueryOptions) => {
    return dataSatuan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
dataSatuan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataSatuan.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
dataSatuan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataSatuan.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
    const dataSatuanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataSatuan.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
        dataSatuanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataSatuan.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
        dataSatuanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataSatuan.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataSatuan.form = dataSatuanForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::satuanBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:43
 * @route '/dataSatuan'
 */
export const satuanBaru = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: satuanBaru.url(options),
    method: 'post',
})

satuanBaru.definition = {
    methods: ["post"],
    url: '/dataSatuan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::satuanBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:43
 * @route '/dataSatuan'
 */
satuanBaru.url = (options?: RouteQueryOptions) => {
    return satuanBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::satuanBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:43
 * @route '/dataSatuan'
 */
satuanBaru.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: satuanBaru.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::satuanBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:43
 * @route '/dataSatuan'
 */
    const satuanBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: satuanBaru.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::satuanBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:43
 * @route '/dataSatuan'
 */
        satuanBaruForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: satuanBaru.url(options),
            method: 'post',
        })
    
    satuanBaru.form = satuanBaruForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::hapusSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:122
 * @route '/hapusSatuan'
 */
export const hapusSatuan = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusSatuan.url(options),
    method: 'delete',
})

hapusSatuan.definition = {
    methods: ["delete"],
    url: '/hapusSatuan',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::hapusSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:122
 * @route '/hapusSatuan'
 */
hapusSatuan.url = (options?: RouteQueryOptions) => {
    return hapusSatuan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::hapusSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:122
 * @route '/hapusSatuan'
 */
hapusSatuan.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusSatuan.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::hapusSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:122
 * @route '/hapusSatuan'
 */
    const hapusSatuanForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hapusSatuan.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::hapusSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:122
 * @route '/hapusSatuan'
 */
        hapusSatuanForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hapusSatuan.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    hapusSatuan.form = hapusSatuanForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
export const dataKodam = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataKodam.url(options),
    method: 'get',
})

dataKodam.definition = {
    methods: ["get","head"],
    url: '/dataKodam',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
dataKodam.url = (options?: RouteQueryOptions) => {
    return dataKodam.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
dataKodam.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataKodam.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
dataKodam.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataKodam.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
    const dataKodamForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataKodam.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
        dataKodamForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataKodam.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
        dataKodamForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataKodam.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataKodam.form = dataKodamForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::kodamBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:176
 * @route '/dataKodam'
 */
export const kodamBaru = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kodamBaru.url(options),
    method: 'post',
})

kodamBaru.definition = {
    methods: ["post"],
    url: '/dataKodam',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::kodamBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:176
 * @route '/dataKodam'
 */
kodamBaru.url = (options?: RouteQueryOptions) => {
    return kodamBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::kodamBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:176
 * @route '/dataKodam'
 */
kodamBaru.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kodamBaru.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::kodamBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:176
 * @route '/dataKodam'
 */
    const kodamBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: kodamBaru.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::kodamBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:176
 * @route '/dataKodam'
 */
        kodamBaruForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: kodamBaru.url(options),
            method: 'post',
        })
    
    kodamBaru.form = kodamBaruForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::hapusKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:258
 * @route '/hapusKodam'
 */
export const hapusKodam = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusKodam.url(options),
    method: 'delete',
})

hapusKodam.definition = {
    methods: ["delete"],
    url: '/hapusKodam',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::hapusKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:258
 * @route '/hapusKodam'
 */
hapusKodam.url = (options?: RouteQueryOptions) => {
    return hapusKodam.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::hapusKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:258
 * @route '/hapusKodam'
 */
hapusKodam.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusKodam.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::hapusKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:258
 * @route '/hapusKodam'
 */
    const hapusKodamForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hapusKodam.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::hapusKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:258
 * @route '/hapusKodam'
 */
        hapusKodamForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hapusKodam.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    hapusKodam.form = hapusKodamForm
const KodamSatuan = { dataSatuan, satuanBaru, hapusSatuan, dataKodam, kodamBaru, hapusKodam }

export default KodamSatuan