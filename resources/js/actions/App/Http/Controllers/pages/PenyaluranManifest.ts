import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::index
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/penyaluran-manifest',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::index
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::index
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::index
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::index
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::index
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::index
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
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
* @see \App\Http\Controllers\pages\PenyaluranManifest::manifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
export const manifestData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manifestData.url(options),
    method: 'get',
})

manifestData.definition = {
    methods: ["get","head"],
    url: '/penyaluran-manifest-data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::manifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
manifestData.url = (options?: RouteQueryOptions) => {
    return manifestData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::manifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
manifestData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manifestData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::manifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
manifestData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manifestData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::manifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
    const manifestDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manifestData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::manifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
        manifestDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manifestData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::manifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
        manifestDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manifestData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    manifestData.form = manifestDataForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::nrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
export const nrpOptions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nrpOptions.url(options),
    method: 'get',
})

nrpOptions.definition = {
    methods: ["get","head"],
    url: '/penyaluran-manifest-nrp-options',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::nrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
nrpOptions.url = (options?: RouteQueryOptions) => {
    return nrpOptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::nrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
nrpOptions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nrpOptions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::nrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
nrpOptions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nrpOptions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::nrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
    const nrpOptionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: nrpOptions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::nrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
        nrpOptionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: nrpOptions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::nrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
        nrpOptionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: nrpOptions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    nrpOptions.form = nrpOptionsForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::scanValidate
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:193
 * @route '/penyaluran-manifest-scan-validate'
 */
export const scanValidate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: scanValidate.url(options),
    method: 'post',
})

scanValidate.definition = {
    methods: ["post"],
    url: '/penyaluran-manifest-scan-validate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::scanValidate
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:193
 * @route '/penyaluran-manifest-scan-validate'
 */
scanValidate.url = (options?: RouteQueryOptions) => {
    return scanValidate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::scanValidate
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:193
 * @route '/penyaluran-manifest-scan-validate'
 */
scanValidate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: scanValidate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::scanValidate
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:193
 * @route '/penyaluran-manifest-scan-validate'
 */
    const scanValidateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: scanValidate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::scanValidate
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:193
 * @route '/penyaluran-manifest-scan-validate'
 */
        scanValidateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: scanValidate.url(options),
            method: 'post',
        })
    
    scanValidate.form = scanValidateForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::confirmDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:295
 * @route '/penyaluran-manifest-confirm-delivery'
 */
export const confirmDelivery = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmDelivery.url(options),
    method: 'post',
})

confirmDelivery.definition = {
    methods: ["post"],
    url: '/penyaluran-manifest-confirm-delivery',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::confirmDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:295
 * @route '/penyaluran-manifest-confirm-delivery'
 */
confirmDelivery.url = (options?: RouteQueryOptions) => {
    return confirmDelivery.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::confirmDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:295
 * @route '/penyaluran-manifest-confirm-delivery'
 */
confirmDelivery.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmDelivery.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::confirmDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:295
 * @route '/penyaluran-manifest-confirm-delivery'
 */
    const confirmDeliveryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirmDelivery.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::confirmDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:295
 * @route '/penyaluran-manifest-confirm-delivery'
 */
        confirmDeliveryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirmDelivery.url(options),
            method: 'post',
        })
    
    confirmDelivery.form = confirmDeliveryForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::cancelDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:500
 * @route '/penyaluran-manifest-cancel-delivery'
 */
export const cancelDelivery = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelDelivery.url(options),
    method: 'post',
})

cancelDelivery.definition = {
    methods: ["post"],
    url: '/penyaluran-manifest-cancel-delivery',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::cancelDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:500
 * @route '/penyaluran-manifest-cancel-delivery'
 */
cancelDelivery.url = (options?: RouteQueryOptions) => {
    return cancelDelivery.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::cancelDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:500
 * @route '/penyaluran-manifest-cancel-delivery'
 */
cancelDelivery.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelDelivery.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::cancelDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:500
 * @route '/penyaluran-manifest-cancel-delivery'
 */
    const cancelDeliveryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancelDelivery.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::cancelDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:500
 * @route '/penyaluran-manifest-cancel-delivery'
 */
        cancelDeliveryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancelDelivery.url(options),
            method: 'post',
        })
    
    cancelDelivery.form = cancelDeliveryForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::openBox
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:430
 * @route '/penyaluran-manifest-open-box'
 */
export const openBox = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: openBox.url(options),
    method: 'post',
})

openBox.definition = {
    methods: ["post"],
    url: '/penyaluran-manifest-open-box',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::openBox
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:430
 * @route '/penyaluran-manifest-open-box'
 */
openBox.url = (options?: RouteQueryOptions) => {
    return openBox.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::openBox
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:430
 * @route '/penyaluran-manifest-open-box'
 */
openBox.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: openBox.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::openBox
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:430
 * @route '/penyaluran-manifest-open-box'
 */
    const openBoxForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: openBox.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::openBox
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:430
 * @route '/penyaluran-manifest-open-box'
 */
        openBoxForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: openBox.url(options),
            method: 'post',
        })
    
    openBox.form = openBoxForm
const PenyaluranManifest = { index, manifestData, nrpOptions, scanValidate, confirmDelivery, cancelDelivery, openBox }

export default PenyaluranManifest