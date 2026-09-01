import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\DataPersonil::index
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datapersonil',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::index
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::index
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPersonil::index
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::index
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::index
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPersonil::index
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
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
* @see \App\Http\Controllers\pages\DataPersonil::listDataPersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:30
 * @route '/listdatapersonil'
 */
export const listDataPersonil = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listDataPersonil.url(options),
    method: 'post',
})

listDataPersonil.definition = {
    methods: ["post"],
    url: '/listdatapersonil',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::listDataPersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:30
 * @route '/listdatapersonil'
 */
listDataPersonil.url = (options?: RouteQueryOptions) => {
    return listDataPersonil.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::listDataPersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:30
 * @route '/listdatapersonil'
 */
listDataPersonil.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listDataPersonil.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::listDataPersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:30
 * @route '/listdatapersonil'
 */
    const listDataPersonilForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: listDataPersonil.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::listDataPersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:30
 * @route '/listdatapersonil'
 */
        listDataPersonilForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: listDataPersonil.url(options),
            method: 'post',
        })
    
    listDataPersonil.form = listDataPersonilForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::personilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
export const personilBaru = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: personilBaru.url(options),
    method: 'get',
})

personilBaru.definition = {
    methods: ["get","head"],
    url: '/datapersonilbaru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::personilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
personilBaru.url = (options?: RouteQueryOptions) => {
    return personilBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::personilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
personilBaru.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: personilBaru.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPersonil::personilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
personilBaru.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: personilBaru.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::personilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
    const personilBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: personilBaru.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::personilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
        personilBaruForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: personilBaru.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPersonil::personilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
        personilBaruForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: personilBaru.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    personilBaru.form = personilBaruForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::dataPersonilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:206
 * @route '/datapersonilbaru'
 */
export const dataPersonilBaru = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPersonilBaru.url(options),
    method: 'post',
})

dataPersonilBaru.definition = {
    methods: ["post"],
    url: '/datapersonilbaru',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::dataPersonilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:206
 * @route '/datapersonilbaru'
 */
dataPersonilBaru.url = (options?: RouteQueryOptions) => {
    return dataPersonilBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::dataPersonilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:206
 * @route '/datapersonilbaru'
 */
dataPersonilBaru.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPersonilBaru.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::dataPersonilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:206
 * @route '/datapersonilbaru'
 */
    const dataPersonilBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataPersonilBaru.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::dataPersonilBaru
 * @see app/Http/Controllers/pages/DataPersonil.php:206
 * @route '/datapersonilbaru'
 */
        dataPersonilBaruForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataPersonilBaru.url(options),
            method: 'post',
        })
    
    dataPersonilBaru.form = dataPersonilBaruForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::deletePersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:128
 * @route '/deletepersonil'
 */
export const deletePersonil = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deletePersonil.url(options),
    method: 'post',
})

deletePersonil.definition = {
    methods: ["post"],
    url: '/deletepersonil',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::deletePersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:128
 * @route '/deletepersonil'
 */
deletePersonil.url = (options?: RouteQueryOptions) => {
    return deletePersonil.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::deletePersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:128
 * @route '/deletepersonil'
 */
deletePersonil.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deletePersonil.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::deletePersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:128
 * @route '/deletepersonil'
 */
    const deletePersonilForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deletePersonil.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::deletePersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:128
 * @route '/deletepersonil'
 */
        deletePersonilForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deletePersonil.url(options),
            method: 'post',
        })
    
    deletePersonil.form = deletePersonilForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilupload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
export const datapersonilupload = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapersonilupload.url(options),
    method: 'get',
})

datapersonilupload.definition = {
    methods: ["get","head"],
    url: '/datapersonilupload',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilupload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
datapersonilupload.url = (options?: RouteQueryOptions) => {
    return datapersonilupload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilupload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
datapersonilupload.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapersonilupload.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilupload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
datapersonilupload.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: datapersonilupload.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilupload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
    const datapersoniluploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: datapersonilupload.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilupload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
        datapersoniluploadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datapersonilupload.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilupload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
        datapersoniluploadForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datapersonilupload.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    datapersonilupload.form = datapersoniluploadForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::uploadPersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:454
 * @route '/upload-personil'
 */
export const uploadPersonil = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPersonil.url(options),
    method: 'post',
})

uploadPersonil.definition = {
    methods: ["post"],
    url: '/upload-personil',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::uploadPersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:454
 * @route '/upload-personil'
 */
uploadPersonil.url = (options?: RouteQueryOptions) => {
    return uploadPersonil.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::uploadPersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:454
 * @route '/upload-personil'
 */
uploadPersonil.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPersonil.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::uploadPersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:454
 * @route '/upload-personil'
 */
    const uploadPersonilForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadPersonil.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::uploadPersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:454
 * @route '/upload-personil'
 */
        uploadPersonilForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadPersonil.url(options),
            method: 'post',
        })
    
    uploadPersonil.form = uploadPersonilForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::downloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
export const downloadTemplate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(options),
    method: 'get',
})

downloadTemplate.definition = {
    methods: ["get","head"],
    url: '/download-template-personil',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::downloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
downloadTemplate.url = (options?: RouteQueryOptions) => {
    return downloadTemplate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::downloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
downloadTemplate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPersonil::downloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
downloadTemplate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadTemplate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::downloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
    const downloadTemplateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadTemplate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::downloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
        downloadTemplateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPersonil::downloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
        downloadTemplateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadTemplate.form = downloadTemplateForm
const DataPersonil = { index, listDataPersonil, personilBaru, dataPersonilBaru, deletePersonil, datapersonilupload, uploadPersonil, downloadTemplate }

export default DataPersonil