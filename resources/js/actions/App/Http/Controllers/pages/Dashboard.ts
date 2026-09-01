import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\Dashboard::index
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::index
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::index
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Dashboard::index
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Dashboard::index
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Dashboard::index
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Dashboard::index
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
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
* @see \App\Http\Controllers\pages\Dashboard::rekonSummary
 * @see app/Http/Controllers/pages/Dashboard.php:43
 * @route '/dashboard-rekon'
 */
export const rekonSummary = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rekonSummary.url(options),
    method: 'post',
})

rekonSummary.definition = {
    methods: ["post"],
    url: '/dashboard-rekon',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::rekonSummary
 * @see app/Http/Controllers/pages/Dashboard.php:43
 * @route '/dashboard-rekon'
 */
rekonSummary.url = (options?: RouteQueryOptions) => {
    return rekonSummary.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::rekonSummary
 * @see app/Http/Controllers/pages/Dashboard.php:43
 * @route '/dashboard-rekon'
 */
rekonSummary.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rekonSummary.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Dashboard::rekonSummary
 * @see app/Http/Controllers/pages/Dashboard.php:43
 * @route '/dashboard-rekon'
 */
    const rekonSummaryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rekonSummary.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Dashboard::rekonSummary
 * @see app/Http/Controllers/pages/Dashboard.php:43
 * @route '/dashboard-rekon'
 */
        rekonSummaryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rekonSummary.url(options),
            method: 'post',
        })
    
    rekonSummary.form = rekonSummaryForm
/**
* @see \App\Http\Controllers\pages\Dashboard::redFlags
 * @see app/Http/Controllers/pages/Dashboard.php:96
 * @route '/dashboard-red-flag'
 */
export const redFlags = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: redFlags.url(options),
    method: 'post',
})

redFlags.definition = {
    methods: ["post"],
    url: '/dashboard-red-flag',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::redFlags
 * @see app/Http/Controllers/pages/Dashboard.php:96
 * @route '/dashboard-red-flag'
 */
redFlags.url = (options?: RouteQueryOptions) => {
    return redFlags.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::redFlags
 * @see app/Http/Controllers/pages/Dashboard.php:96
 * @route '/dashboard-red-flag'
 */
redFlags.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: redFlags.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Dashboard::redFlags
 * @see app/Http/Controllers/pages/Dashboard.php:96
 * @route '/dashboard-red-flag'
 */
    const redFlagsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: redFlags.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Dashboard::redFlags
 * @see app/Http/Controllers/pages/Dashboard.php:96
 * @route '/dashboard-red-flag'
 */
        redFlagsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: redFlags.url(options),
            method: 'post',
        })
    
    redFlags.form = redFlagsForm
/**
* @see \App\Http\Controllers\pages\Dashboard::traceEvent
 * @see app/Http/Controllers/pages/Dashboard.php:165
 * @route '/dashboard-trace'
 */
export const traceEvent = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: traceEvent.url(options),
    method: 'post',
})

traceEvent.definition = {
    methods: ["post"],
    url: '/dashboard-trace',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::traceEvent
 * @see app/Http/Controllers/pages/Dashboard.php:165
 * @route '/dashboard-trace'
 */
traceEvent.url = (options?: RouteQueryOptions) => {
    return traceEvent.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::traceEvent
 * @see app/Http/Controllers/pages/Dashboard.php:165
 * @route '/dashboard-trace'
 */
traceEvent.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: traceEvent.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Dashboard::traceEvent
 * @see app/Http/Controllers/pages/Dashboard.php:165
 * @route '/dashboard-trace'
 */
    const traceEventForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: traceEvent.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Dashboard::traceEvent
 * @see app/Http/Controllers/pages/Dashboard.php:165
 * @route '/dashboard-trace'
 */
        traceEventForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: traceEvent.url(options),
            method: 'post',
        })
    
    traceEvent.form = traceEventForm
const Dashboard = { index, rekonSummary, redFlags, traceEvent }

export default Dashboard