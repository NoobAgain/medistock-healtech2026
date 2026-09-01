import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\DataAkun::index
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dataakun',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::index
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::index
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAkun::index
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::index
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::index
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAkun::index
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
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
* @see \App\Http\Controllers\pages\DataAkun::getDataAkun
 * @see app/Http/Controllers/pages/DataAkun.php:33
 * @route '/dataakun'
 */
export const getDataAkun = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getDataAkun.url(options),
    method: 'post',
})

getDataAkun.definition = {
    methods: ["post"],
    url: '/dataakun',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::getDataAkun
 * @see app/Http/Controllers/pages/DataAkun.php:33
 * @route '/dataakun'
 */
getDataAkun.url = (options?: RouteQueryOptions) => {
    return getDataAkun.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::getDataAkun
 * @see app/Http/Controllers/pages/DataAkun.php:33
 * @route '/dataakun'
 */
getDataAkun.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getDataAkun.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::getDataAkun
 * @see app/Http/Controllers/pages/DataAkun.php:33
 * @route '/dataakun'
 */
    const getDataAkunForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: getDataAkun.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::getDataAkun
 * @see app/Http/Controllers/pages/DataAkun.php:33
 * @route '/dataakun'
 */
        getDataAkunForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: getDataAkun.url(options),
            method: 'post',
        })
    
    getDataAkun.form = getDataAkunForm
/**
* @see \App\Http\Controllers\pages\DataAkun::akunBaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
export const akunBaru = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunBaru.url(options),
    method: 'get',
})

akunBaru.definition = {
    methods: ["get","head"],
    url: '/akunBaru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::akunBaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
akunBaru.url = (options?: RouteQueryOptions) => {
    return akunBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::akunBaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
akunBaru.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunBaru.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAkun::akunBaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
akunBaru.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: akunBaru.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::akunBaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
    const akunBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: akunBaru.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::akunBaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
        akunBaruForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: akunBaru.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAkun::akunBaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
        akunBaruForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: akunBaru.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    akunBaru.form = akunBaruForm
/**
* @see \App\Http\Controllers\pages\DataAkun::getPersonilRole
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
export const getPersonilRole = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPersonilRole.url(options),
    method: 'get',
})

getPersonilRole.definition = {
    methods: ["get","head"],
    url: '/akunBaruOpsi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::getPersonilRole
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
getPersonilRole.url = (options?: RouteQueryOptions) => {
    return getPersonilRole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::getPersonilRole
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
getPersonilRole.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPersonilRole.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAkun::getPersonilRole
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
getPersonilRole.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPersonilRole.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::getPersonilRole
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
    const getPersonilRoleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getPersonilRole.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::getPersonilRole
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
        getPersonilRoleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getPersonilRole.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAkun::getPersonilRole
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
        getPersonilRoleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getPersonilRole.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getPersonilRole.form = getPersonilRoleForm
/**
* @see \App\Http\Controllers\pages\DataAkun::addEditAkun
 * @see app/Http/Controllers/pages/DataAkun.php:945
 * @route '/akunBaru'
 */
export const addEditAkun = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addEditAkun.url(options),
    method: 'post',
})

addEditAkun.definition = {
    methods: ["post"],
    url: '/akunBaru',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::addEditAkun
 * @see app/Http/Controllers/pages/DataAkun.php:945
 * @route '/akunBaru'
 */
addEditAkun.url = (options?: RouteQueryOptions) => {
    return addEditAkun.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::addEditAkun
 * @see app/Http/Controllers/pages/DataAkun.php:945
 * @route '/akunBaru'
 */
addEditAkun.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addEditAkun.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::addEditAkun
 * @see app/Http/Controllers/pages/DataAkun.php:945
 * @route '/akunBaru'
 */
    const addEditAkunForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addEditAkun.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::addEditAkun
 * @see app/Http/Controllers/pages/DataAkun.php:945
 * @route '/akunBaru'
 */
        addEditAkunForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addEditAkun.url(options),
            method: 'post',
        })
    
    addEditAkun.form = addEditAkunForm
/**
* @see \App\Http\Controllers\pages\DataAkun::deleteAkun
 * @see app/Http/Controllers/pages/DataAkun.php:1011
 * @route '/akunHapus'
 */
export const deleteAkun = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteAkun.url(options),
    method: 'post',
})

deleteAkun.definition = {
    methods: ["post"],
    url: '/akunHapus',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::deleteAkun
 * @see app/Http/Controllers/pages/DataAkun.php:1011
 * @route '/akunHapus'
 */
deleteAkun.url = (options?: RouteQueryOptions) => {
    return deleteAkun.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::deleteAkun
 * @see app/Http/Controllers/pages/DataAkun.php:1011
 * @route '/akunHapus'
 */
deleteAkun.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteAkun.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::deleteAkun
 * @see app/Http/Controllers/pages/DataAkun.php:1011
 * @route '/akunHapus'
 */
    const deleteAkunForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteAkun.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::deleteAkun
 * @see app/Http/Controllers/pages/DataAkun.php:1011
 * @route '/akunHapus'
 */
        deleteAkunForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteAkun.url(options),
            method: 'post',
        })
    
    deleteAkun.form = deleteAkunForm
const DataAkun = { index, getDataAkun, akunBaru, getPersonilRole, addEditAkun, deleteAkun }

export default DataAkun