import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\DataPengiriman::index
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/data-pengiriman',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPengiriman::index
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPengiriman::index
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPengiriman::index
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPengiriman::index
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPengiriman::index
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPengiriman::index
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
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
* @see \App\Http\Controllers\pages\DataPengiriman::listDataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:27
 * @route '/data-pengiriman-listdata'
 */
export const listDataPengiriman = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listDataPengiriman.url(options),
    method: 'post',
})

listDataPengiriman.definition = {
    methods: ["post"],
    url: '/data-pengiriman-listdata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPengiriman::listDataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:27
 * @route '/data-pengiriman-listdata'
 */
listDataPengiriman.url = (options?: RouteQueryOptions) => {
    return listDataPengiriman.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPengiriman::listDataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:27
 * @route '/data-pengiriman-listdata'
 */
listDataPengiriman.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listDataPengiriman.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPengiriman::listDataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:27
 * @route '/data-pengiriman-listdata'
 */
    const listDataPengirimanForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: listDataPengiriman.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPengiriman::listDataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:27
 * @route '/data-pengiriman-listdata'
 */
        listDataPengirimanForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: listDataPengiriman.url(options),
            method: 'post',
        })
    
    listDataPengiriman.form = listDataPengirimanForm
/**
* @see \App\Http\Controllers\pages\DataPengiriman::deletePengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:197
 * @route '/data-pengiriman-delete'
 */
export const deletePengiriman = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deletePengiriman.url(options),
    method: 'post',
})

deletePengiriman.definition = {
    methods: ["post"],
    url: '/data-pengiriman-delete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPengiriman::deletePengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:197
 * @route '/data-pengiriman-delete'
 */
deletePengiriman.url = (options?: RouteQueryOptions) => {
    return deletePengiriman.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPengiriman::deletePengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:197
 * @route '/data-pengiriman-delete'
 */
deletePengiriman.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deletePengiriman.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPengiriman::deletePengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:197
 * @route '/data-pengiriman-delete'
 */
    const deletePengirimanForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deletePengiriman.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPengiriman::deletePengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:197
 * @route '/data-pengiriman-delete'
 */
        deletePengirimanForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deletePengiriman.url(options),
            method: 'post',
        })
    
    deletePengiriman.form = deletePengirimanForm
const DataPengiriman = { index, listDataPengiriman, deletePengiriman }

export default DataPengiriman