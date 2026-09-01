import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\Monitoring::index
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/monitoring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Monitoring::index
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Monitoring::index
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Monitoring::index
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Monitoring::index
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Monitoring::index
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Monitoring::index
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\pages\Monitoring::dataPengirimanListdata
 * @see app/Http/Controllers/pages/Monitoring.php:28
 * @route '/monitoring-listdata'
 */
export const dataPengirimanListdata = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPengirimanListdata.url(options),
    method: 'post',
})

dataPengirimanListdata.definition = {
    methods: ["post"],
    url: '/monitoring-listdata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Monitoring::dataPengirimanListdata
 * @see app/Http/Controllers/pages/Monitoring.php:28
 * @route '/monitoring-listdata'
 */
dataPengirimanListdata.url = (options?: RouteQueryOptions) => {
    return dataPengirimanListdata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Monitoring::dataPengirimanListdata
 * @see app/Http/Controllers/pages/Monitoring.php:28
 * @route '/monitoring-listdata'
 */
dataPengirimanListdata.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPengirimanListdata.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Monitoring::dataPengirimanListdata
 * @see app/Http/Controllers/pages/Monitoring.php:28
 * @route '/monitoring-listdata'
 */
    const dataPengirimanListdataForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataPengirimanListdata.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Monitoring::dataPengirimanListdata
 * @see app/Http/Controllers/pages/Monitoring.php:28
 * @route '/monitoring-listdata'
 */
        dataPengirimanListdataForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataPengirimanListdata.url(options),
            method: 'post',
        })
    
    dataPengirimanListdata.form = dataPengirimanListdataForm
/**
* @see \App\Http\Controllers\pages\Monitoring::detailPengiriman
 * @see app/Http/Controllers/pages/Monitoring.php:94
 * @route '/monitoring-detail'
 */
export const detailPengiriman = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: detailPengiriman.url(options),
    method: 'post',
})

detailPengiriman.definition = {
    methods: ["post"],
    url: '/monitoring-detail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Monitoring::detailPengiriman
 * @see app/Http/Controllers/pages/Monitoring.php:94
 * @route '/monitoring-detail'
 */
detailPengiriman.url = (options?: RouteQueryOptions) => {
    return detailPengiriman.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Monitoring::detailPengiriman
 * @see app/Http/Controllers/pages/Monitoring.php:94
 * @route '/monitoring-detail'
 */
detailPengiriman.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: detailPengiriman.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Monitoring::detailPengiriman
 * @see app/Http/Controllers/pages/Monitoring.php:94
 * @route '/monitoring-detail'
 */
    const detailPengirimanForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: detailPengiriman.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Monitoring::detailPengiriman
 * @see app/Http/Controllers/pages/Monitoring.php:94
 * @route '/monitoring-detail'
 */
        detailPengirimanForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: detailPengiriman.url(options),
            method: 'post',
        })
    
    detailPengiriman.form = detailPengirimanForm
const Monitoring = { index, dataPengirimanListdata, detailPengiriman }

export default Monitoring