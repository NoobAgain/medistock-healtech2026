import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\Login::index
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Login::index
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::index
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Login::index
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Login::index
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Login::index
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Login::index
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
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
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:23
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:23
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:23
 * @route '/login'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:23
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: login.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:23
 * @route '/login'
 */
        loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: login.url(options),
            method: 'post',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\pages\Login::lostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
export const lostpassword = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lostpassword.url(options),
    method: 'get',
})

lostpassword.definition = {
    methods: ["get","head"],
    url: '/lostpassword',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Login::lostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
lostpassword.url = (options?: RouteQueryOptions) => {
    return lostpassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::lostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
lostpassword.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lostpassword.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Login::lostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
lostpassword.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lostpassword.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Login::lostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
    const lostpasswordForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: lostpassword.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Login::lostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
        lostpasswordForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lostpassword.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Login::lostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
        lostpasswordForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lostpassword.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    lostpassword.form = lostpasswordForm
/**
* @see \App\Http\Controllers\pages\Login::lostpasswordReset
 * @see app/Http/Controllers/pages/Login.php:120
 * @route '/lostpasswordReset'
 */
export const lostpasswordReset = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lostpasswordReset.url(options),
    method: 'post',
})

lostpasswordReset.definition = {
    methods: ["post"],
    url: '/lostpasswordReset',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Login::lostpasswordReset
 * @see app/Http/Controllers/pages/Login.php:120
 * @route '/lostpasswordReset'
 */
lostpasswordReset.url = (options?: RouteQueryOptions) => {
    return lostpasswordReset.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::lostpasswordReset
 * @see app/Http/Controllers/pages/Login.php:120
 * @route '/lostpasswordReset'
 */
lostpasswordReset.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lostpasswordReset.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Login::lostpasswordReset
 * @see app/Http/Controllers/pages/Login.php:120
 * @route '/lostpasswordReset'
 */
    const lostpasswordResetForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lostpasswordReset.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Login::lostpasswordReset
 * @see app/Http/Controllers/pages/Login.php:120
 * @route '/lostpasswordReset'
 */
        lostpasswordResetForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lostpasswordReset.url(options),
            method: 'post',
        })
    
    lostpasswordReset.form = lostpasswordResetForm
/**
* @see \App\Http\Controllers\pages\Login::resetToken
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
export const resetToken = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resetToken.url(args, options),
    method: 'get',
})

resetToken.definition = {
    methods: ["get","head"],
    url: '/reset-password/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Login::resetToken
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
resetToken.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return resetToken.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::resetToken
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
resetToken.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resetToken.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Login::resetToken
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
resetToken.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resetToken.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Login::resetToken
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
    const resetTokenForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: resetToken.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Login::resetToken
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
        resetTokenForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: resetToken.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Login::resetToken
 * @see app/Http/Controllers/pages/Login.php:150
 * @route '/reset-password/{token}'
 */
        resetTokenForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: resetToken.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    resetToken.form = resetTokenForm
/**
* @see \App\Http\Controllers\pages\Login::newPasswordAkun
 * @see app/Http/Controllers/pages/Login.php:157
 * @route '/passwordbaru'
 */
export const newPasswordAkun = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: newPasswordAkun.url(options),
    method: 'post',
})

newPasswordAkun.definition = {
    methods: ["post"],
    url: '/passwordbaru',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Login::newPasswordAkun
 * @see app/Http/Controllers/pages/Login.php:157
 * @route '/passwordbaru'
 */
newPasswordAkun.url = (options?: RouteQueryOptions) => {
    return newPasswordAkun.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::newPasswordAkun
 * @see app/Http/Controllers/pages/Login.php:157
 * @route '/passwordbaru'
 */
newPasswordAkun.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: newPasswordAkun.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Login::newPasswordAkun
 * @see app/Http/Controllers/pages/Login.php:157
 * @route '/passwordbaru'
 */
    const newPasswordAkunForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: newPasswordAkun.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Login::newPasswordAkun
 * @see app/Http/Controllers/pages/Login.php:157
 * @route '/passwordbaru'
 */
        newPasswordAkunForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: newPasswordAkun.url(options),
            method: 'post',
        })
    
    newPasswordAkun.form = newPasswordAkunForm
/**
* @see \App\Http\Controllers\pages\Login::logout
 * @see app/Http/Controllers/pages/Login.php:98
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Login::logout
 * @see app/Http/Controllers/pages/Login.php:98
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::logout
 * @see app/Http/Controllers/pages/Login.php:98
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Login::logout
 * @see app/Http/Controllers/pages/Login.php:98
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Login::logout
 * @see app/Http/Controllers/pages/Login.php:98
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
const Login = { index, login, lostpassword, lostpasswordReset, resetToken, newPasswordAkun, logout }

export default Login