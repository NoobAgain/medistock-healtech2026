import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
const ScriptController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ScriptController.url(options),
    method: 'get',
})

ScriptController.definition = {
    methods: ["get","head"],
    url: '/cookie-consent/script',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
ScriptController.url = (options?: RouteQueryOptions) => {
    return ScriptController.definition.url + queryParams(options)
}

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
ScriptController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ScriptController.url(options),
    method: 'get',
})
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
ScriptController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ScriptController.url(options),
    method: 'head',
})

    /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
    const ScriptControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ScriptController.url(options),
        method: 'get',
    })

            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
        ScriptControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ScriptController.url(options),
            method: 'get',
        })
            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ScriptController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ScriptController.php:9
 * @route '/cookie-consent/script'
 */
        ScriptControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ScriptController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ScriptController.form = ScriptControllerForm
export default ScriptController