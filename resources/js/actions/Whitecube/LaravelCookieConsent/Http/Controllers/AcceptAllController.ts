import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptAllController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptAllController.php:10
 * @route '/cookie-consent/accept-all'
 */
const AcceptAllController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: AcceptAllController.url(options),
    method: 'post',
})

AcceptAllController.definition = {
    methods: ["post"],
    url: '/cookie-consent/accept-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptAllController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptAllController.php:10
 * @route '/cookie-consent/accept-all'
 */
AcceptAllController.url = (options?: RouteQueryOptions) => {
    return AcceptAllController.definition.url + queryParams(options)
}

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptAllController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptAllController.php:10
 * @route '/cookie-consent/accept-all'
 */
AcceptAllController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: AcceptAllController.url(options),
    method: 'post',
})

    /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptAllController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptAllController.php:10
 * @route '/cookie-consent/accept-all'
 */
    const AcceptAllControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: AcceptAllController.url(options),
        method: 'post',
    })

            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptAllController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptAllController.php:10
 * @route '/cookie-consent/accept-all'
 */
        AcceptAllControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: AcceptAllController.url(options),
            method: 'post',
        })
    
    AcceptAllController.form = AcceptAllControllerForm
export default AcceptAllController