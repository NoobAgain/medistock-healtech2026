import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\RekonPengiriman::index
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rekon-pengiriman',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::index
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::index
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\RekonPengiriman::index
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\RekonPengiriman::index
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\RekonPengiriman::index
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\RekonPengiriman::index
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
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
* @see \App\Http\Controllers\pages\RekonPengiriman::listDataRekon
 * @see app/Http/Controllers/pages/RekonPengiriman.php:65
 * @route '/rekon-items'
 */
export const listDataRekon = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listDataRekon.url(options),
    method: 'post',
})

listDataRekon.definition = {
    methods: ["post"],
    url: '/rekon-items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::listDataRekon
 * @see app/Http/Controllers/pages/RekonPengiriman.php:65
 * @route '/rekon-items'
 */
listDataRekon.url = (options?: RouteQueryOptions) => {
    return listDataRekon.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::listDataRekon
 * @see app/Http/Controllers/pages/RekonPengiriman.php:65
 * @route '/rekon-items'
 */
listDataRekon.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listDataRekon.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RekonPengiriman::listDataRekon
 * @see app/Http/Controllers/pages/RekonPengiriman.php:65
 * @route '/rekon-items'
 */
    const listDataRekonForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: listDataRekon.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RekonPengiriman::listDataRekon
 * @see app/Http/Controllers/pages/RekonPengiriman.php:65
 * @route '/rekon-items'
 */
        listDataRekonForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: listDataRekon.url(options),
            method: 'post',
        })
    
    listDataRekon.form = listDataRekonForm
/**
* @see \App\Http\Controllers\pages\RekonPengiriman::confirmReceived
 * @see app/Http/Controllers/pages/RekonPengiriman.php:152
 * @route '/rekon-confirm-received'
 */
export const confirmReceived = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmReceived.url(options),
    method: 'post',
})

confirmReceived.definition = {
    methods: ["post"],
    url: '/rekon-confirm-received',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::confirmReceived
 * @see app/Http/Controllers/pages/RekonPengiriman.php:152
 * @route '/rekon-confirm-received'
 */
confirmReceived.url = (options?: RouteQueryOptions) => {
    return confirmReceived.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::confirmReceived
 * @see app/Http/Controllers/pages/RekonPengiriman.php:152
 * @route '/rekon-confirm-received'
 */
confirmReceived.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmReceived.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RekonPengiriman::confirmReceived
 * @see app/Http/Controllers/pages/RekonPengiriman.php:152
 * @route '/rekon-confirm-received'
 */
    const confirmReceivedForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirmReceived.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RekonPengiriman::confirmReceived
 * @see app/Http/Controllers/pages/RekonPengiriman.php:152
 * @route '/rekon-confirm-received'
 */
        confirmReceivedForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirmReceived.url(options),
            method: 'post',
        })
    
    confirmReceived.form = confirmReceivedForm
const RekonPengiriman = { index, listDataRekon, confirmReceived }

export default RekonPengiriman