import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\pages\Login::reset
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
export const reset = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reset.url(args, options),
    method: 'get',
})

reset.definition = {
    methods: ["get","head"],
    url: '/reset-password/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Login::reset
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
reset.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return reset.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::reset
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
reset.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reset.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Login::reset
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
reset.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reset.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Login::reset
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
    const resetForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reset.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Login::reset
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
        resetForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reset.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Login::reset
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
        resetForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reset.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reset.form = resetForm
const password = {
    reset: Object.assign(reset, reset),
}

export default password