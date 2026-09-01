import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\DataPoD::index
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/data-pod',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPoD::index
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPoD::index
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPoD::index
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPoD::index
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPoD::index
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPoD::index
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
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
* @see \App\Http\Controllers\pages\DataPoD::listData
 * @see app/Http/Controllers/pages/DataPoD.php:32
 * @route '/data-pod-listdata'
 */
export const listData = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listData.url(options),
    method: 'post',
})

listData.definition = {
    methods: ["post"],
    url: '/data-pod-listdata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPoD::listData
 * @see app/Http/Controllers/pages/DataPoD.php:32
 * @route '/data-pod-listdata'
 */
listData.url = (options?: RouteQueryOptions) => {
    return listData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPoD::listData
 * @see app/Http/Controllers/pages/DataPoD.php:32
 * @route '/data-pod-listdata'
 */
listData.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listData.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPoD::listData
 * @see app/Http/Controllers/pages/DataPoD.php:32
 * @route '/data-pod-listdata'
 */
    const listDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: listData.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPoD::listData
 * @see app/Http/Controllers/pages/DataPoD.php:32
 * @route '/data-pod-listdata'
 */
        listDataForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: listData.url(options),
            method: 'post',
        })
    
    listData.form = listDataForm
/**
* @see \App\Http\Controllers\pages\DataPoD::destroy
 * @see app/Http/Controllers/pages/DataPoD.php:192
 * @route '/data-pod-delete'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

destroy.definition = {
    methods: ["post"],
    url: '/data-pod-delete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPoD::destroy
 * @see app/Http/Controllers/pages/DataPoD.php:192
 * @route '/data-pod-delete'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPoD::destroy
 * @see app/Http/Controllers/pages/DataPoD.php:192
 * @route '/data-pod-delete'
 */
destroy.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPoD::destroy
 * @see app/Http/Controllers/pages/DataPoD.php:192
 * @route '/data-pod-delete'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPoD::destroy
 * @see app/Http/Controllers/pages/DataPoD.php:192
 * @route '/data-pod-delete'
 */
        destroyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(options),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\pages\DataPoD::serveFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
export const serveFile = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: serveFile.url(args, options),
    method: 'get',
})

serveFile.definition = {
    methods: ["get","head"],
    url: '/data-pod-file/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPoD::serveFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
serveFile.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return serveFile.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPoD::serveFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
serveFile.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: serveFile.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPoD::serveFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
serveFile.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: serveFile.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPoD::serveFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
    const serveFileForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: serveFile.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPoD::serveFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
        serveFileForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: serveFile.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPoD::serveFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
        serveFileForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: serveFile.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    serveFile.form = serveFileForm
const DataPoD = { index, listData, destroy, serveFile }

export default DataPoD