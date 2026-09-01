import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:195
 * @route '/guardrail/pubkey'
 */
export const pubkey = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pubkey.url(options),
    method: 'get',
})

pubkey.definition = {
    methods: ["get","head"],
    url: '/guardrail/pubkey',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:195
 * @route '/guardrail/pubkey'
 */
pubkey.url = (options?: RouteQueryOptions) => {
    return pubkey.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:195
 * @route '/guardrail/pubkey'
 */
pubkey.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pubkey.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:195
 * @route '/guardrail/pubkey'
 */
pubkey.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pubkey.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:195
 * @route '/guardrail/pubkey'
 */
    const pubkeyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pubkey.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:195
 * @route '/guardrail/pubkey'
 */
        pubkeyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pubkey.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:195
 * @route '/guardrail/pubkey'
 */
        pubkeyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pubkey.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pubkey.form = pubkeyForm
const guardrail = {
    pubkey: Object.assign(pubkey, pubkey),
}

export default guardrail