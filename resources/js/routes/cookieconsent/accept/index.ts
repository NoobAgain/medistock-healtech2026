import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptAllController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptAllController.php:10
 * @route '/cookie-consent/accept-all'
 */
export const all = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: all.url(options),
    method: 'post',
})

all.definition = {
    methods: ["post"],
    url: '/cookie-consent/accept-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptAllController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptAllController.php:10
 * @route '/cookie-consent/accept-all'
 */
all.url = (options?: RouteQueryOptions) => {
    return all.definition.url + queryParams(options)
}

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptAllController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptAllController.php:10
 * @route '/cookie-consent/accept-all'
 */
all.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: all.url(options),
    method: 'post',
})

    /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptAllController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptAllController.php:10
 * @route '/cookie-consent/accept-all'
 */
    const allForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: all.url(options),
        method: 'post',
    })

            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptAllController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptAllController.php:10
 * @route '/cookie-consent/accept-all'
 */
        allForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: all.url(options),
            method: 'post',
        })
    
    all.form = allForm
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptEssentialsController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptEssentialsController.php:10
 * @route '/cookie-consent/accept-essentials'
 */
export const essentials = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: essentials.url(options),
    method: 'post',
})

essentials.definition = {
    methods: ["post"],
    url: '/cookie-consent/accept-essentials',
} satisfies RouteDefinition<["post"]>

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptEssentialsController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptEssentialsController.php:10
 * @route '/cookie-consent/accept-essentials'
 */
essentials.url = (options?: RouteQueryOptions) => {
    return essentials.definition.url + queryParams(options)
}

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptEssentialsController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptEssentialsController.php:10
 * @route '/cookie-consent/accept-essentials'
 */
essentials.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: essentials.url(options),
    method: 'post',
})

    /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptEssentialsController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptEssentialsController.php:10
 * @route '/cookie-consent/accept-essentials'
 */
    const essentialsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: essentials.url(options),
        method: 'post',
    })

            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\AcceptEssentialsController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/AcceptEssentialsController.php:10
 * @route '/cookie-consent/accept-essentials'
 */
        essentialsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: essentials.url(options),
            method: 'post',
        })
    
    essentials.form = essentialsForm
/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ConfigureController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ConfigureController.php:10
 * @route '/cookie-consent/configure'
 */
export const configuration = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: configuration.url(options),
    method: 'post',
})

configuration.definition = {
    methods: ["post"],
    url: '/cookie-consent/configure',
} satisfies RouteDefinition<["post"]>

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ConfigureController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ConfigureController.php:10
 * @route '/cookie-consent/configure'
 */
configuration.url = (options?: RouteQueryOptions) => {
    return configuration.definition.url + queryParams(options)
}

/**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ConfigureController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ConfigureController.php:10
 * @route '/cookie-consent/configure'
 */
configuration.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: configuration.url(options),
    method: 'post',
})

    /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ConfigureController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ConfigureController.php:10
 * @route '/cookie-consent/configure'
 */
    const configurationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: configuration.url(options),
        method: 'post',
    })

            /**
* @see \Whitecube\LaravelCookieConsent\Http\Controllers\ConfigureController::__invoke
 * @see vendor/whitecube/laravel-cookie-consent/src/Http/Controllers/ConfigureController.php:10
 * @route '/cookie-consent/configure'
 */
        configurationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: configuration.url(options),
            method: 'post',
        })
    
    configuration.form = configurationForm
const accept = {
    all: Object.assign(all, all),
essentials: Object.assign(essentials, essentials),
configuration: Object.assign(configuration, configuration),
}

export default accept