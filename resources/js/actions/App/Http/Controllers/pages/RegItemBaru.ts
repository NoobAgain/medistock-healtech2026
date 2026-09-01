import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\RegItemBaru::index
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/registrasiitembaru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\RegItemBaru::index
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItemBaru::index
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\RegItemBaru::index
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\RegItemBaru::index
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\RegItemBaru::index
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\RegItemBaru::index
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
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
* @see \App\Http\Controllers\pages\RegItemBaru::getNSN
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
export const getNSN = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getNSN.url(options),
    method: 'get',
})

getNSN.definition = {
    methods: ["get","head"],
    url: '/registrasiitem-nsn',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\RegItemBaru::getNSN
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
getNSN.url = (options?: RouteQueryOptions) => {
    return getNSN.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItemBaru::getNSN
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
getNSN.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getNSN.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\RegItemBaru::getNSN
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
getNSN.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getNSN.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\RegItemBaru::getNSN
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
    const getNSNForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getNSN.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\RegItemBaru::getNSN
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
        getNSNForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getNSN.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\RegItemBaru::getNSN
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
        getNSNForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getNSN.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getNSN.form = getNSNForm
/**
* @see \App\Http\Controllers\pages\RegItemBaru::hashNTAG
 * @see app/Http/Controllers/pages/RegItemBaru.php:76
 * @route '/registrasiitem-hash'
 */
export const hashNTAG = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hashNTAG.url(options),
    method: 'post',
})

hashNTAG.definition = {
    methods: ["post"],
    url: '/registrasiitem-hash',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RegItemBaru::hashNTAG
 * @see app/Http/Controllers/pages/RegItemBaru.php:76
 * @route '/registrasiitem-hash'
 */
hashNTAG.url = (options?: RouteQueryOptions) => {
    return hashNTAG.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItemBaru::hashNTAG
 * @see app/Http/Controllers/pages/RegItemBaru.php:76
 * @route '/registrasiitem-hash'
 */
hashNTAG.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hashNTAG.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RegItemBaru::hashNTAG
 * @see app/Http/Controllers/pages/RegItemBaru.php:76
 * @route '/registrasiitem-hash'
 */
    const hashNTAGForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hashNTAG.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RegItemBaru::hashNTAG
 * @see app/Http/Controllers/pages/RegItemBaru.php:76
 * @route '/registrasiitem-hash'
 */
        hashNTAGForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hashNTAG.url(options),
            method: 'post',
        })
    
    hashNTAG.form = hashNTAGForm
/**
* @see \App\Http\Controllers\pages\RegItemBaru::addNewItem
 * @see app/Http/Controllers/pages/RegItemBaru.php:94
 * @route '/registrasiitem-add'
 */
export const addNewItem = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addNewItem.url(options),
    method: 'post',
})

addNewItem.definition = {
    methods: ["post"],
    url: '/registrasiitem-add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RegItemBaru::addNewItem
 * @see app/Http/Controllers/pages/RegItemBaru.php:94
 * @route '/registrasiitem-add'
 */
addNewItem.url = (options?: RouteQueryOptions) => {
    return addNewItem.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItemBaru::addNewItem
 * @see app/Http/Controllers/pages/RegItemBaru.php:94
 * @route '/registrasiitem-add'
 */
addNewItem.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addNewItem.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RegItemBaru::addNewItem
 * @see app/Http/Controllers/pages/RegItemBaru.php:94
 * @route '/registrasiitem-add'
 */
    const addNewItemForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addNewItem.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RegItemBaru::addNewItem
 * @see app/Http/Controllers/pages/RegItemBaru.php:94
 * @route '/registrasiitem-add'
 */
        addNewItemForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addNewItem.url(options),
            method: 'post',
        })
    
    addNewItem.form = addNewItemForm
/**
* @see \App\Http\Controllers\pages\RegItemBaru::jmlAlokasi
 * @see app/Http/Controllers/pages/RegItemBaru.php:49
 * @route '/registrasiitem-jmlalokasi'
 */
export const jmlAlokasi = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: jmlAlokasi.url(options),
    method: 'post',
})

jmlAlokasi.definition = {
    methods: ["post"],
    url: '/registrasiitem-jmlalokasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RegItemBaru::jmlAlokasi
 * @see app/Http/Controllers/pages/RegItemBaru.php:49
 * @route '/registrasiitem-jmlalokasi'
 */
jmlAlokasi.url = (options?: RouteQueryOptions) => {
    return jmlAlokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItemBaru::jmlAlokasi
 * @see app/Http/Controllers/pages/RegItemBaru.php:49
 * @route '/registrasiitem-jmlalokasi'
 */
jmlAlokasi.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: jmlAlokasi.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RegItemBaru::jmlAlokasi
 * @see app/Http/Controllers/pages/RegItemBaru.php:49
 * @route '/registrasiitem-jmlalokasi'
 */
    const jmlAlokasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: jmlAlokasi.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RegItemBaru::jmlAlokasi
 * @see app/Http/Controllers/pages/RegItemBaru.php:49
 * @route '/registrasiitem-jmlalokasi'
 */
        jmlAlokasiForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: jmlAlokasi.url(options),
            method: 'post',
        })
    
    jmlAlokasi.form = jmlAlokasiForm
const RegItemBaru = { index, getNSN, hashNTAG, addNewItem, jmlAlokasi }

export default RegItemBaru