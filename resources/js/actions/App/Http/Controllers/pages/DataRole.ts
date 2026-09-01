import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\DataRole::index
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/datarole',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataRole::index
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataRole::index
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataRole::index
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataRole::index
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataRole::index
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataRole::index
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
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
* @see \App\Http\Controllers\pages\DataRole::getDataRole
 * @see app/Http/Controllers/pages/DataRole.php:30
 * @route '/datarole'
 */
export const getDataRole = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getDataRole.url(options),
    method: 'post',
})

getDataRole.definition = {
    methods: ["post"],
    url: '/datarole',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataRole::getDataRole
 * @see app/Http/Controllers/pages/DataRole.php:30
 * @route '/datarole'
 */
getDataRole.url = (options?: RouteQueryOptions) => {
    return getDataRole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataRole::getDataRole
 * @see app/Http/Controllers/pages/DataRole.php:30
 * @route '/datarole'
 */
getDataRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getDataRole.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataRole::getDataRole
 * @see app/Http/Controllers/pages/DataRole.php:30
 * @route '/datarole'
 */
    const getDataRoleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: getDataRole.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataRole::getDataRole
 * @see app/Http/Controllers/pages/DataRole.php:30
 * @route '/datarole'
 */
        getDataRoleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: getDataRole.url(options),
            method: 'post',
        })
    
    getDataRole.form = getDataRoleForm
/**
* @see \App\Http\Controllers\pages\DataRole::roleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
export const roleBaru = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roleBaru.url(options),
    method: 'get',
})

roleBaru.definition = {
    methods: ["get","head"],
    url: '/datarolebaru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataRole::roleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
roleBaru.url = (options?: RouteQueryOptions) => {
    return roleBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataRole::roleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
roleBaru.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roleBaru.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataRole::roleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
roleBaru.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: roleBaru.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataRole::roleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
    const roleBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: roleBaru.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataRole::roleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
        roleBaruForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: roleBaru.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataRole::roleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
        roleBaruForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: roleBaru.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    roleBaru.form = roleBaruForm
/**
* @see \App\Http\Controllers\pages\DataRole::deleteRole
 * @see app/Http/Controllers/pages/DataRole.php:219
 * @route '/hapusrole'
 */
export const deleteRole = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteRole.url(options),
    method: 'post',
})

deleteRole.definition = {
    methods: ["post"],
    url: '/hapusrole',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataRole::deleteRole
 * @see app/Http/Controllers/pages/DataRole.php:219
 * @route '/hapusrole'
 */
deleteRole.url = (options?: RouteQueryOptions) => {
    return deleteRole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataRole::deleteRole
 * @see app/Http/Controllers/pages/DataRole.php:219
 * @route '/hapusrole'
 */
deleteRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteRole.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataRole::deleteRole
 * @see app/Http/Controllers/pages/DataRole.php:219
 * @route '/hapusrole'
 */
    const deleteRoleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteRole.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataRole::deleteRole
 * @see app/Http/Controllers/pages/DataRole.php:219
 * @route '/hapusrole'
 */
        deleteRoleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteRole.url(options),
            method: 'post',
        })
    
    deleteRole.form = deleteRoleForm
/**
* @see \App\Http\Controllers\pages\DataRole::roleBaruAddedit
 * @see app/Http/Controllers/pages/DataRole.php:127
 * @route '/datarolebaru'
 */
export const roleBaruAddedit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: roleBaruAddedit.url(options),
    method: 'post',
})

roleBaruAddedit.definition = {
    methods: ["post"],
    url: '/datarolebaru',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataRole::roleBaruAddedit
 * @see app/Http/Controllers/pages/DataRole.php:127
 * @route '/datarolebaru'
 */
roleBaruAddedit.url = (options?: RouteQueryOptions) => {
    return roleBaruAddedit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataRole::roleBaruAddedit
 * @see app/Http/Controllers/pages/DataRole.php:127
 * @route '/datarolebaru'
 */
roleBaruAddedit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: roleBaruAddedit.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataRole::roleBaruAddedit
 * @see app/Http/Controllers/pages/DataRole.php:127
 * @route '/datarolebaru'
 */
    const roleBaruAddeditForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: roleBaruAddedit.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataRole::roleBaruAddedit
 * @see app/Http/Controllers/pages/DataRole.php:127
 * @route '/datarolebaru'
 */
        roleBaruAddeditForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: roleBaruAddedit.url(options),
            method: 'post',
        })
    
    roleBaruAddedit.form = roleBaruAddeditForm
const DataRole = { index, getDataRole, roleBaru, deleteRole, roleBaruAddedit }

export default DataRole