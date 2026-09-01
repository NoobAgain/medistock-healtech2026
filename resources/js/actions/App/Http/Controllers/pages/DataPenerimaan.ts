import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\DataPenerimaan::index
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/data-penerimaan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::index
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::index
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPenerimaan::index
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPenerimaan::index
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPenerimaan::index
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPenerimaan::index
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
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
* @see \App\Http\Controllers\pages\DataPenerimaan::listDataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:32
 * @route '/data-penerimaan-listdata'
 */
export const listDataPenerimaan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listDataPenerimaan.url(options),
    method: 'post',
})

listDataPenerimaan.definition = {
    methods: ["post"],
    url: '/data-penerimaan-listdata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::listDataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:32
 * @route '/data-penerimaan-listdata'
 */
listDataPenerimaan.url = (options?: RouteQueryOptions) => {
    return listDataPenerimaan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::listDataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:32
 * @route '/data-penerimaan-listdata'
 */
listDataPenerimaan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listDataPenerimaan.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPenerimaan::listDataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:32
 * @route '/data-penerimaan-listdata'
 */
    const listDataPenerimaanForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: listDataPenerimaan.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPenerimaan::listDataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:32
 * @route '/data-penerimaan-listdata'
 */
        listDataPenerimaanForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: listDataPenerimaan.url(options),
            method: 'post',
        })
    
    listDataPenerimaan.form = listDataPenerimaanForm
/**
* @see \App\Http\Controllers\pages\DataPenerimaan::detailDataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:207
 * @route '/data-penerimaan-detail'
 */
export const detailDataPenerimaan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: detailDataPenerimaan.url(options),
    method: 'post',
})

detailDataPenerimaan.definition = {
    methods: ["post"],
    url: '/data-penerimaan-detail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::detailDataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:207
 * @route '/data-penerimaan-detail'
 */
detailDataPenerimaan.url = (options?: RouteQueryOptions) => {
    return detailDataPenerimaan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::detailDataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:207
 * @route '/data-penerimaan-detail'
 */
detailDataPenerimaan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: detailDataPenerimaan.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPenerimaan::detailDataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:207
 * @route '/data-penerimaan-detail'
 */
    const detailDataPenerimaanForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: detailDataPenerimaan.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPenerimaan::detailDataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:207
 * @route '/data-penerimaan-detail'
 */
        detailDataPenerimaanForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: detailDataPenerimaan.url(options),
            method: 'post',
        })
    
    detailDataPenerimaan.form = detailDataPenerimaanForm
const DataPenerimaan = { index, listDataPenerimaan, detailDataPenerimaan }

export default DataPenerimaan