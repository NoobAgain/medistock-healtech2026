import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
export const dataPeriode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPeriode.url(options),
    method: 'get',
})

dataPeriode.definition = {
    methods: ["get","head"],
    url: '/dataPeriode',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
dataPeriode.url = (options?: RouteQueryOptions) => {
    return dataPeriode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
dataPeriode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPeriode.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
dataPeriode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataPeriode.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
    const dataPeriodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataPeriode.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
        dataPeriodeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPeriode.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
        dataPeriodeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPeriode.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataPeriode.form = dataPeriodeForm
/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::periodeBaru
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:36
 * @route '/dataPeriode'
 */
export const periodeBaru = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: periodeBaru.url(options),
    method: 'post',
})

periodeBaru.definition = {
    methods: ["post"],
    url: '/dataPeriode',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::periodeBaru
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:36
 * @route '/dataPeriode'
 */
periodeBaru.url = (options?: RouteQueryOptions) => {
    return periodeBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::periodeBaru
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:36
 * @route '/dataPeriode'
 */
periodeBaru.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: periodeBaru.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::periodeBaru
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:36
 * @route '/dataPeriode'
 */
    const periodeBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: periodeBaru.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::periodeBaru
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:36
 * @route '/dataPeriode'
 */
        periodeBaruForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: periodeBaru.url(options),
            method: 'post',
        })
    
    periodeBaru.form = periodeBaruForm
/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::hapusPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:99
 * @route '/hapusPeriode'
 */
export const hapusPeriode = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusPeriode.url(options),
    method: 'delete',
})

hapusPeriode.definition = {
    methods: ["delete"],
    url: '/hapusPeriode',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::hapusPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:99
 * @route '/hapusPeriode'
 */
hapusPeriode.url = (options?: RouteQueryOptions) => {
    return hapusPeriode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::hapusPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:99
 * @route '/hapusPeriode'
 */
hapusPeriode.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: hapusPeriode.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::hapusPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:99
 * @route '/hapusPeriode'
 */
    const hapusPeriodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hapusPeriode.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::hapusPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:99
 * @route '/hapusPeriode'
 */
        hapusPeriodeForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hapusPeriode.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    hapusPeriode.form = hapusPeriodeForm
const PeriodeAlokasi = { dataPeriode, periodeBaru, hapusPeriode }

export default PeriodeAlokasi