import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\Roadmap::index
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/roadmap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Roadmap::index
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Roadmap::index
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Roadmap::index
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Roadmap::index
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Roadmap::index
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Roadmap::index
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
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
const Roadmap = { index }

export default Roadmap