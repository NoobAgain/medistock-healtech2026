import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import accept from './accept'
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
export const script = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: script.url(options),
    method: 'get',
})

script.definition = {
    methods: ["get","head"],
    url: '/cookie-consent/script',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
script.url = (options?: RouteQueryOptions) => {
    return script.definition.url + queryParams(options)
}

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
script.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: script.url(options),
    method: 'get',
})
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
script.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: script.url(options),
    method: 'head',
})

    /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
    const scriptForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: script.url(options),
        method: 'get',
    })

            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
        scriptForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: script.url(options),
            method: 'get',
        })
            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
        scriptForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: script.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    script.form = scriptForm
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ResetController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ResetController.php:10
 * @route '/cookie-consent/reset'
 */
export const reset = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

reset.definition = {
    methods: ["post"],
    url: '/cookie-consent/reset',
} satisfies RouteDefinition<["post"]>

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ResetController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ResetController.php:10
 * @route '/cookie-consent/reset'
 */
reset.url = (options?: RouteQueryOptions) => {
    return reset.definition.url + queryParams(options)
}

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ResetController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ResetController.php:10
 * @route '/cookie-consent/reset'
 */
reset.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

    /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ResetController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ResetController.php:10
 * @route '/cookie-consent/reset'
 */
    const resetForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reset.url(options),
        method: 'post',
    })

            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ResetController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ResetController.php:10
 * @route '/cookie-consent/reset'
 */
        resetForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reset.url(options),
            method: 'post',
        })
    
    reset.form = resetForm
const cookieconsent = {
    script: Object.assign(script, script),
accept: Object.assign(accept, accept),
reset: Object.assign(reset, reset),
}

export default cookieconsent