import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::index
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/received-pengiriman',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::index
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::index
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::index
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::index
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::index
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::index
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
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
* @see \App\Http\Controllers\pages\ReceivedPengiriman::getInfoReceivedBox
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:29
 * @route '/received-infobox'
 */
export const getInfoReceivedBox = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getInfoReceivedBox.url(options),
    method: 'post',
})

getInfoReceivedBox.definition = {
    methods: ["post"],
    url: '/received-infobox',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::getInfoReceivedBox
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:29
 * @route '/received-infobox'
 */
getInfoReceivedBox.url = (options?: RouteQueryOptions) => {
    return getInfoReceivedBox.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::getInfoReceivedBox
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:29
 * @route '/received-infobox'
 */
getInfoReceivedBox.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getInfoReceivedBox.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::getInfoReceivedBox
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:29
 * @route '/received-infobox'
 */
    const getInfoReceivedBoxForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: getInfoReceivedBox.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::getInfoReceivedBox
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:29
 * @route '/received-infobox'
 */
        getInfoReceivedBoxForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: getInfoReceivedBox.url(options),
            method: 'post',
        })
    
    getInfoReceivedBox.form = getInfoReceivedBoxForm
/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::addTransitEvent
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:227
 * @route '/received-transit'
 */
export const addTransitEvent = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addTransitEvent.url(options),
    method: 'post',
})

addTransitEvent.definition = {
    methods: ["post"],
    url: '/received-transit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::addTransitEvent
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:227
 * @route '/received-transit'
 */
addTransitEvent.url = (options?: RouteQueryOptions) => {
    return addTransitEvent.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::addTransitEvent
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:227
 * @route '/received-transit'
 */
addTransitEvent.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addTransitEvent.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::addTransitEvent
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:227
 * @route '/received-transit'
 */
    const addTransitEventForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addTransitEvent.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::addTransitEvent
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:227
 * @route '/received-transit'
 */
        addTransitEventForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addTransitEvent.url(options),
            method: 'post',
        })
    
    addTransitEvent.form = addTransitEventForm
const ReceivedPengiriman = { index, getInfoReceivedBox, addTransitEvent }

export default ReceivedPengiriman