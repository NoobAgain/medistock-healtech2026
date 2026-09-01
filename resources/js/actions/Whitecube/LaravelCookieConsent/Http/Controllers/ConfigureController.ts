import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ConfigureController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ConfigureController.php:10
 * @route '/cookie-consent/configure'
 */
const ConfigureController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ConfigureController.url(options),
    method: 'post',
})

ConfigureController.definition = {
    methods: ["post"],
    url: '/cookie-consent/configure',
} satisfies RouteDefinition<["post"]>

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ConfigureController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ConfigureController.php:10
 * @route '/cookie-consent/configure'
 */
ConfigureController.url = (options?: RouteQueryOptions) => {
    return ConfigureController.definition.url + queryParams(options)
}

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ConfigureController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ConfigureController.php:10
 * @route '/cookie-consent/configure'
 */
ConfigureController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ConfigureController.url(options),
    method: 'post',
})

    /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ConfigureController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ConfigureController.php:10
 * @route '/cookie-consent/configure'
 */
    const ConfigureControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ConfigureController.url(options),
        method: 'post',
    })

            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ConfigureController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ConfigureController.php:10
 * @route '/cookie-consent/configure'
 */
        ConfigureControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ConfigureController.url(options),
            method: 'post',
        })
    
    ConfigureController.form = ConfigureControllerForm
export default ConfigureController