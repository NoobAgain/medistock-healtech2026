import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
export const getJenis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenis.url(options),
    method: 'get',
})

getJenis.definition = {
    methods: ["get","head"],
    url: '/opsi-jenis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
getJenis.url = (options?: RouteQueryOptions) => {
    return getJenis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
getJenis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getJenis.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
getJenis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getJenis.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
    const getJenisForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getJenis.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
        getJenisForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getJenis.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
        getJenisForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getJenis.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getJenis.form = getJenisForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:36
 * @route '/opsi-jenis'
 */
export const addJenis = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addJenis.url(options),
    method: 'post',
})

addJenis.definition = {
    methods: ["post"],
    url: '/opsi-jenis',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:36
 * @route '/opsi-jenis'
 */
addJenis.url = (options?: RouteQueryOptions) => {
    return addJenis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:36
 * @route '/opsi-jenis'
 */
addJenis.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addJenis.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:36
 * @route '/opsi-jenis'
 */
    const addJenisForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addJenis.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:36
 * @route '/opsi-jenis'
 */
        addJenisForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addJenis.url(options),
            method: 'post',
        })
    
    addJenis.form = addJenisForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:67
 * @route '/opsi-jenis-remove'
 */
export const delJenis = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: delJenis.url(options),
    method: 'post',
})

delJenis.definition = {
    methods: ["post"],
    url: '/opsi-jenis-remove',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:67
 * @route '/opsi-jenis-remove'
 */
delJenis.url = (options?: RouteQueryOptions) => {
    return delJenis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:67
 * @route '/opsi-jenis-remove'
 */
delJenis.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: delJenis.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:67
 * @route '/opsi-jenis-remove'
 */
    const delJenisForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: delJenis.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:67
 * @route '/opsi-jenis-remove'
 */
        delJenisForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: delJenis.url(options),
            method: 'post',
        })
    
    delJenis.form = delJenisForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
export const getUkuran = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUkuran.url(options),
    method: 'get',
})

getUkuran.definition = {
    methods: ["get","head"],
    url: '/opsi-ukuran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
getUkuran.url = (options?: RouteQueryOptions) => {
    return getUkuran.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
getUkuran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUkuran.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
getUkuran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getUkuran.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
    const getUkuranForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getUkuran.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
        getUkuranForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getUkuran.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
        getUkuranForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getUkuran.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getUkuran.form = getUkuranForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:211
 * @route '/opsi-ukuran'
 */
export const addUkuran = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addUkuran.url(options),
    method: 'post',
})

addUkuran.definition = {
    methods: ["post"],
    url: '/opsi-ukuran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:211
 * @route '/opsi-ukuran'
 */
addUkuran.url = (options?: RouteQueryOptions) => {
    return addUkuran.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:211
 * @route '/opsi-ukuran'
 */
addUkuran.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addUkuran.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:211
 * @route '/opsi-ukuran'
 */
    const addUkuranForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addUkuran.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:211
 * @route '/opsi-ukuran'
 */
        addUkuranForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addUkuran.url(options),
            method: 'post',
        })
    
    addUkuran.form = addUkuranForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:242
 * @route '/opsi-ukuran-remove'
 */
export const delUkuran = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: delUkuran.url(options),
    method: 'post',
})

delUkuran.definition = {
    methods: ["post"],
    url: '/opsi-ukuran-remove',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:242
 * @route '/opsi-ukuran-remove'
 */
delUkuran.url = (options?: RouteQueryOptions) => {
    return delUkuran.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:242
 * @route '/opsi-ukuran-remove'
 */
delUkuran.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: delUkuran.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:242
 * @route '/opsi-ukuran-remove'
 */
    const delUkuranForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: delUkuran.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:242
 * @route '/opsi-ukuran-remove'
 */
        delUkuranForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: delUkuran.url(options),
            method: 'post',
        })
    
    delUkuran.form = delUkuranForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
export const getKategori = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKategori.url(options),
    method: 'get',
})

getKategori.definition = {
    methods: ["get","head"],
    url: '/opsi-kategori',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
getKategori.url = (options?: RouteQueryOptions) => {
    return getKategori.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
getKategori.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getKategori.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
getKategori.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getKategori.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
    const getKategoriForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getKategori.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
        getKategoriForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getKategori.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
        getKategoriForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getKategori.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getKategori.form = getKategoriForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:123
 * @route '/opsi-kategori'
 */
export const addKategori = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addKategori.url(options),
    method: 'post',
})

addKategori.definition = {
    methods: ["post"],
    url: '/opsi-kategori',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:123
 * @route '/opsi-kategori'
 */
addKategori.url = (options?: RouteQueryOptions) => {
    return addKategori.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:123
 * @route '/opsi-kategori'
 */
addKategori.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addKategori.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:123
 * @route '/opsi-kategori'
 */
    const addKategoriForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addKategori.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::addKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:123
 * @route '/opsi-kategori'
 */
        addKategoriForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addKategori.url(options),
            method: 'post',
        })
    
    addKategori.form = addKategoriForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:154
 * @route '/opsi-kategori-remove'
 */
export const delKategori = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: delKategori.url(options),
    method: 'post',
})

delKategori.definition = {
    methods: ["post"],
    url: '/opsi-kategori-remove',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:154
 * @route '/opsi-kategori-remove'
 */
delKategori.url = (options?: RouteQueryOptions) => {
    return delKategori.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:154
 * @route '/opsi-kategori-remove'
 */
delKategori.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: delKategori.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:154
 * @route '/opsi-kategori-remove'
 */
    const delKategoriForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: delKategori.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::delKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:154
 * @route '/opsi-kategori-remove'
 */
        delKategoriForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: delKategori.url(options),
            method: 'post',
        })
    
    delKategori.form = delKategoriForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
export const getAlokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlokasi.url(options),
    method: 'get',
})

getAlokasi.definition = {
    methods: ["get","head"],
    url: '/opsi-alokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
getAlokasi.url = (options?: RouteQueryOptions) => {
    return getAlokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
getAlokasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlokasi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
getAlokasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAlokasi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
    const getAlokasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAlokasi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
        getAlokasiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAlokasi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
        getAlokasiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAlokasi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getAlokasi.form = getAlokasiForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasiNotSended
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
export const getAlokasiNotSended = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlokasiNotSended.url(options),
    method: 'get',
})

getAlokasiNotSended.definition = {
    methods: ["get","head"],
    url: '/opsi-notalokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasiNotSended
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
getAlokasiNotSended.url = (options?: RouteQueryOptions) => {
    return getAlokasiNotSended.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasiNotSended
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
getAlokasiNotSended.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAlokasiNotSended.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasiNotSended
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
getAlokasiNotSended.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAlokasiNotSended.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasiNotSended
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
    const getAlokasiNotSendedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAlokasiNotSended.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasiNotSended
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
        getAlokasiNotSendedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAlokasiNotSended.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getAlokasiNotSended
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
        getAlokasiNotSendedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAlokasiNotSended.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getAlokasiNotSended.form = getAlokasiNotSendedForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getDetailAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:320
 * @route '/opsi-alokasi-detail'
 */
export const getDetailAlokasi = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getDetailAlokasi.url(options),
    method: 'post',
})

getDetailAlokasi.definition = {
    methods: ["post"],
    url: '/opsi-alokasi-detail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getDetailAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:320
 * @route '/opsi-alokasi-detail'
 */
getDetailAlokasi.url = (options?: RouteQueryOptions) => {
    return getDetailAlokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getDetailAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:320
 * @route '/opsi-alokasi-detail'
 */
getDetailAlokasi.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: getDetailAlokasi.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getDetailAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:320
 * @route '/opsi-alokasi-detail'
 */
    const getDetailAlokasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: getDetailAlokasi.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::getDetailAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:320
 * @route '/opsi-alokasi-detail'
 */
        getDetailAlokasiForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: getDetailAlokasi.url(options),
            method: 'post',
        })
    
    getDetailAlokasi.form = getDetailAlokasiForm
const OpsiKaporlap = { getJenis, addJenis, delJenis, getUkuran, addUkuran, delUkuran, getKategori, addKategori, delKategori, getAlokasi, getAlokasiNotSended, getDetailAlokasi }

export default OpsiKaporlap