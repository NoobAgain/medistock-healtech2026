import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptEssentialsController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptEssentialsController.php:10
 * @route '/cookie-consent/accept-essentials'
 */
const AcceptEssentialsController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: AcceptEssentialsController.url(options),
    method: 'post',
})

AcceptEssentialsController.definition = {
    methods: ["post"],
    url: '/cookie-consent/accept-essentials',
} satisfies RouteDefinition<["post"]>

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptEssentialsController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptEssentialsController.php:10
 * @route '/cookie-consent/accept-essentials'
 */
AcceptEssentialsController.url = (options?: RouteQueryOptions) => {
    return AcceptEssentialsController.definition.url + queryParams(options)
}

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptEssentialsController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptEssentialsController.php:10
 * @route '/cookie-consent/accept-essentials'
 */
AcceptEssentialsController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: AcceptEssentialsController.url(options),
    method: 'post',
})

    /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptEssentialsController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptEssentialsController.php:10
 * @route '/cookie-consent/accept-essentials'
 */
    const AcceptEssentialsControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: AcceptEssentialsController.url(options),
        method: 'post',
    })

            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptEssentialsController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptEssentialsController.php:10
 * @route '/cookie-consent/accept-essentials'
 */
        AcceptEssentialsControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: AcceptEssentialsController.url(options),
            method: 'post',
        })
    
    AcceptEssentialsController.form = AcceptEssentialsControllerForm
export default AcceptEssentialsController