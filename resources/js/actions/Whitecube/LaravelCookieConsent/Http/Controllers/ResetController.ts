import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ResetController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ResetController.php:10
 * @route '/cookie-consent/reset'
 */
const ResetController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ResetController.url(options),
    method: 'post',
})

ResetController.definition = {
    methods: ["post"],
    url: '/cookie-consent/reset',
} satisfies RouteDefinition<["post"]>

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ResetController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ResetController.php:10
 * @route '/cookie-consent/reset'
 */
ResetController.url = (options?: RouteQueryOptions) => {
    return ResetController.definition.url + queryParams(options)
}

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ResetController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ResetController.php:10
 * @route '/cookie-consent/reset'
 */
ResetController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ResetController.url(options),
    method: 'post',
})

    /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ResetController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ResetController.php:10
 * @route '/cookie-consent/reset'
 */
    const ResetControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ResetController.url(options),
        method: 'post',
    })

            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ResetController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ResetController.php:10
 * @route '/cookie-consent/reset'
 */
        ResetControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ResetController.url(options),
            method: 'post',
        })
    
    ResetController.form = ResetControllerForm
export default ResetController