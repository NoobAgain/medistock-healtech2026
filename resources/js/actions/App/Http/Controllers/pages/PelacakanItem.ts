import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\PelacakanItem::index
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pelacakan-item',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PelacakanItem::index
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PelacakanItem::index
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PelacakanItem::index
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PelacakanItem::index
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PelacakanItem::index
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PelacakanItem::index
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
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
* @see \App\Http\Controllers\pages\PelacakanItem::search
 * @see app/Http/Controllers/pages/PelacakanItem.php:25
 * @route '/pelacakan-item/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: search.url(options),
    method: 'post',
})

search.definition = {
    methods: ["post"],
    url: '/pelacakan-item/search',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PelacakanItem::search
 * @see app/Http/Controllers/pages/PelacakanItem.php:25
 * @route '/pelacakan-item/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PelacakanItem::search
 * @see app/Http/Controllers/pages/PelacakanItem.php:25
 * @route '/pelacakan-item/search'
 */
search.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: search.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PelacakanItem::search
 * @see app/Http/Controllers/pages/PelacakanItem.php:25
 * @route '/pelacakan-item/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: search.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PelacakanItem::search
 * @see app/Http/Controllers/pages/PelacakanItem.php:25
 * @route '/pelacakan-item/search'
 */
        searchForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: search.url(options),
            method: 'post',
        })
    
    search.form = searchForm
const PelacakanItem = { index, search }

export default PelacakanItem