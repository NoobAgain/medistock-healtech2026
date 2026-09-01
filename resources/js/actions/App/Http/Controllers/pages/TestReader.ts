import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\TestReader::index
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/test-reader',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\TestReader::index
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\TestReader::index
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\TestReader::index
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\TestReader::index
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\TestReader::index
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\TestReader::index
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
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
const TestReader = { index }

export default TestReader