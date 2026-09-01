import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::index
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pengiriman-baru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::index
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::index
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::index
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PengirimanBaru::index
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::index
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::index
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
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
* @see \App\Http\Controllers\pages\PengirimanBaru::getUID
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
export const getUID = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUID.url(options),
    method: 'get',
})

getUID.definition = {
    methods: ["get","head"],
    url: '/pengiriman-uid',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::getUID
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
getUID.url = (options?: RouteQueryOptions) => {
    return getUID.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::getUID
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
getUID.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUID.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::getUID
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
getUID.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getUID.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PengirimanBaru::getUID
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
    const getUIDForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getUID.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::getUID
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
        getUIDForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getUID.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::getUID
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
        getUIDForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getUID.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getUID.form = getUIDForm
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::dataAlokasi
 * @see app/Http/Controllers/pages/PengirimanBaru.php:104
 * @route '/pengiriman-dataAlokasi'
 */
export const dataAlokasi = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataAlokasi.url(options),
    method: 'post',
})

dataAlokasi.definition = {
    methods: ["post"],
    url: '/pengiriman-dataAlokasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::dataAlokasi
 * @see app/Http/Controllers/pages/PengirimanBaru.php:104
 * @route '/pengiriman-dataAlokasi'
 */
dataAlokasi.url = (options?: RouteQueryOptions) => {
    return dataAlokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::dataAlokasi
 * @see app/Http/Controllers/pages/PengirimanBaru.php:104
 * @route '/pengiriman-dataAlokasi'
 */
dataAlokasi.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataAlokasi.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PengirimanBaru::dataAlokasi
 * @see app/Http/Controllers/pages/PengirimanBaru.php:104
 * @route '/pengiriman-dataAlokasi'
 */
    const dataAlokasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataAlokasi.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::dataAlokasi
 * @see app/Http/Controllers/pages/PengirimanBaru.php:104
 * @route '/pengiriman-dataAlokasi'
 */
        dataAlokasiForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataAlokasi.url(options),
            method: 'post',
        })
    
    dataAlokasi.form = dataAlokasiForm
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::hashBox
 * @see app/Http/Controllers/pages/PengirimanBaru.php:58
 * @route '/pengiriman-hashBox'
 */
export const hashBox = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hashBox.url(options),
    method: 'post',
})

hashBox.definition = {
    methods: ["post"],
    url: '/pengiriman-hashBox',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::hashBox
 * @see app/Http/Controllers/pages/PengirimanBaru.php:58
 * @route '/pengiriman-hashBox'
 */
hashBox.url = (options?: RouteQueryOptions) => {
    return hashBox.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::hashBox
 * @see app/Http/Controllers/pages/PengirimanBaru.php:58
 * @route '/pengiriman-hashBox'
 */
hashBox.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: hashBox.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PengirimanBaru::hashBox
 * @see app/Http/Controllers/pages/PengirimanBaru.php:58
 * @route '/pengiriman-hashBox'
 */
    const hashBoxForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: hashBox.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::hashBox
 * @see app/Http/Controllers/pages/PengirimanBaru.php:58
 * @route '/pengiriman-hashBox'
 */
        hashBoxForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: hashBox.url(options),
            method: 'post',
        })
    
    hashBox.form = hashBoxForm
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::agregasiBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:145
 * @route '/pengiriman-store'
 */
export const agregasiBaru = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: agregasiBaru.url(options),
    method: 'post',
})

agregasiBaru.definition = {
    methods: ["post"],
    url: '/pengiriman-store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::agregasiBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:145
 * @route '/pengiriman-store'
 */
agregasiBaru.url = (options?: RouteQueryOptions) => {
    return agregasiBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::agregasiBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:145
 * @route '/pengiriman-store'
 */
agregasiBaru.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: agregasiBaru.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PengirimanBaru::agregasiBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:145
 * @route '/pengiriman-store'
 */
    const agregasiBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: agregasiBaru.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::agregasiBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:145
 * @route '/pengiriman-store'
 */
        agregasiBaruForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: agregasiBaru.url(options),
            method: 'post',
        })
    
    agregasiBaru.form = agregasiBaruForm
const PengirimanBaru = { index, getUID, dataAlokasi, hashBox, agregasiBaru }

export default PengirimanBaru