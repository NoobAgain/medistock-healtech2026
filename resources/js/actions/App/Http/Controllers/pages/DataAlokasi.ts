import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\DataAlokasi::index
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::index
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::index
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAlokasi::index
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::index
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::index
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAlokasi::index
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
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
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
const dataAlokasi2aa0660a20ce5d2031147dd30d30d47e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url(options),
    method: 'get',
})

dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.definition = {
    methods: ["get","head"],
    url: '/alokasilist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url = (options?: RouteQueryOptions) => {
    return dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
    const dataAlokasi2aa0660a20ce5d2031147dd30d30d47eForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
        dataAlokasi2aa0660a20ce5d2031147dd30d30d47eForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
        dataAlokasi2aa0660a20ce5d2031147dd30d30d47eForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.form = dataAlokasi2aa0660a20ce5d2031147dd30d30d47eForm
    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
const dataAlokasi2aa0660a20ce5d2031147dd30d30d47e = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url(options),
    method: 'post',
})

dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.definition = {
    methods: ["post"],
    url: '/alokasilist',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url = (options?: RouteQueryOptions) => {
    return dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
    const dataAlokasi2aa0660a20ce5d2031147dd30d30d47eForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
        dataAlokasi2aa0660a20ce5d2031147dd30d30d47eForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.url(options),
            method: 'post',
        })
    
    dataAlokasi2aa0660a20ce5d2031147dd30d30d47e.form = dataAlokasi2aa0660a20ce5d2031147dd30d30d47eForm

export const dataAlokasi = {
    '/alokasilist': dataAlokasi2aa0660a20ce5d2031147dd30d30d47e,
    '/alokasilist': dataAlokasi2aa0660a20ce5d2031147dd30d30d47e,
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
export const alokasiBaru = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alokasiBaru.url(options),
    method: 'get',
})

alokasiBaru.definition = {
    methods: ["get","head"],
    url: '/alokasibaru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
alokasiBaru.url = (options?: RouteQueryOptions) => {
    return alokasiBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
alokasiBaru.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alokasiBaru.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
alokasiBaru.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: alokasiBaru.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
    const alokasiBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: alokasiBaru.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
        alokasiBaruForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: alokasiBaru.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
        alokasiBaruForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: alokasiBaru.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    alokasiBaru.form = alokasiBaruForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::addEditAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:205
 * @route '/alokasibaru'
 */
export const addEditAlokasiBaru = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addEditAlokasiBaru.url(options),
    method: 'post',
})

addEditAlokasiBaru.definition = {
    methods: ["post"],
    url: '/alokasibaru',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::addEditAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:205
 * @route '/alokasibaru'
 */
addEditAlokasiBaru.url = (options?: RouteQueryOptions) => {
    return addEditAlokasiBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::addEditAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:205
 * @route '/alokasibaru'
 */
addEditAlokasiBaru.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addEditAlokasiBaru.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::addEditAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:205
 * @route '/alokasibaru'
 */
    const addEditAlokasiBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addEditAlokasiBaru.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::addEditAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:205
 * @route '/alokasibaru'
 */
        addEditAlokasiBaruForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addEditAlokasiBaru.url(options),
            method: 'post',
        })
    
    addEditAlokasiBaru.form = addEditAlokasiBaruForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::destroy
 * @see app/Http/Controllers/pages/DataAlokasi.php:318
 * @route '/alokasi/{alokasi}'
 */
export const destroy = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/alokasi/{alokasi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::destroy
 * @see app/Http/Controllers/pages/DataAlokasi.php:318
 * @route '/alokasi/{alokasi}'
 */
destroy.url = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { alokasi: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { alokasi: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    alokasi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        alokasi: typeof args.alokasi === 'object'
                ? args.alokasi.id
                : args.alokasi,
                }

    return destroy.definition.url
            .replace('{alokasi}', parsedArgs.alokasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::destroy
 * @see app/Http/Controllers/pages/DataAlokasi.php:318
 * @route '/alokasi/{alokasi}'
 */
destroy.delete = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::destroy
 * @see app/Http/Controllers/pages/DataAlokasi.php:318
 * @route '/alokasi/{alokasi}'
 */
    const destroyForm = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::destroy
 * @see app/Http/Controllers/pages/DataAlokasi.php:318
 * @route '/alokasi/{alokasi}'
 */
        destroyForm.delete = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::acc
 * @see app/Http/Controllers/pages/DataAlokasi.php:359
 * @route '/alokasi/{alokasi}/acc'
 */
export const acc = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acc.url(args, options),
    method: 'post',
})

acc.definition = {
    methods: ["post"],
    url: '/alokasi/{alokasi}/acc',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::acc
 * @see app/Http/Controllers/pages/DataAlokasi.php:359
 * @route '/alokasi/{alokasi}/acc'
 */
acc.url = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { alokasi: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { alokasi: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    alokasi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        alokasi: typeof args.alokasi === 'object'
                ? args.alokasi.id
                : args.alokasi,
                }

    return acc.definition.url
            .replace('{alokasi}', parsedArgs.alokasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::acc
 * @see app/Http/Controllers/pages/DataAlokasi.php:359
 * @route '/alokasi/{alokasi}/acc'
 */
acc.post = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acc.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::acc
 * @see app/Http/Controllers/pages/DataAlokasi.php:359
 * @route '/alokasi/{alokasi}/acc'
 */
    const accForm = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: acc.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::acc
 * @see app/Http/Controllers/pages/DataAlokasi.php:359
 * @route '/alokasi/{alokasi}/acc'
 */
        accForm.post = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: acc.url(args, options),
            method: 'post',
        })
    
    acc.form = accForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::acc2
 * @see app/Http/Controllers/pages/DataAlokasi.php:399
 * @route '/alokasi/{alokasi}/acc2'
 */
export const acc2 = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acc2.url(args, options),
    method: 'post',
})

acc2.definition = {
    methods: ["post"],
    url: '/alokasi/{alokasi}/acc2',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::acc2
 * @see app/Http/Controllers/pages/DataAlokasi.php:399
 * @route '/alokasi/{alokasi}/acc2'
 */
acc2.url = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { alokasi: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { alokasi: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    alokasi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        alokasi: typeof args.alokasi === 'object'
                ? args.alokasi.id
                : args.alokasi,
                }

    return acc2.definition.url
            .replace('{alokasi}', parsedArgs.alokasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::acc2
 * @see app/Http/Controllers/pages/DataAlokasi.php:399
 * @route '/alokasi/{alokasi}/acc2'
 */
acc2.post = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acc2.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::acc2
 * @see app/Http/Controllers/pages/DataAlokasi.php:399
 * @route '/alokasi/{alokasi}/acc2'
 */
    const acc2Form = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: acc2.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::acc2
 * @see app/Http/Controllers/pages/DataAlokasi.php:399
 * @route '/alokasi/{alokasi}/acc2'
 */
        acc2Form.post = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: acc2.url(args, options),
            method: 'post',
        })
    
    acc2.form = acc2Form
/**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiNAN
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
export const alokasiNAN = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alokasiNAN.url(options),
    method: 'get',
})

alokasiNAN.definition = {
    methods: ["get","head"],
    url: '/alokasiNAN',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiNAN
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
alokasiNAN.url = (options?: RouteQueryOptions) => {
    return alokasiNAN.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiNAN
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
alokasiNAN.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: alokasiNAN.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiNAN
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
alokasiNAN.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: alokasiNAN.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiNAN
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
    const alokasiNANForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: alokasiNAN.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiNAN
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
        alokasiNANForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: alokasiNAN.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAlokasi::alokasiNAN
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
        alokasiNANForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: alokasiNAN.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    alokasiNAN.form = alokasiNANForm
const DataAlokasi = { index, dataAlokasi, alokasiBaru, addEditAlokasiBaru, destroy, acc, acc2, alokasiNAN }

export default DataAlokasi