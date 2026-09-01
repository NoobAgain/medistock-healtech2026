import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../wayfinder'
/**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Login::login
 * @see app/Http/Controllers/pages/Login.php:18
 * @route '/'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\pages\Login::loginAuth
 * @see app/Http/Controllers/pages/Login.php:23
 * @route '/login'
 */
export const loginAuth = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: loginAuth.url(options),
    method: 'post',
})

loginAuth.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Login::loginAuth
 * @see app/Http/Controllers/pages/Login.php:23
 * @route '/login'
 */
loginAuth.url = (options?: RouteQueryOptions) => {
    return loginAuth.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::loginAuth
 * @see app/Http/Controllers/pages/Login.php:23
 * @route '/login'
 */
loginAuth.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: loginAuth.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Login::loginAuth
 * @see app/Http/Controllers/pages/Login.php:23
 * @route '/login'
 */
    const loginAuthForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: loginAuth.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Login::loginAuth
 * @see app/Http/Controllers/pages/Login.php:23
 * @route '/login'
 */
        loginAuthForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: loginAuth.url(options),
            method: 'post',
        })
    
    loginAuth.form = loginAuthForm
/**
* @see \App\Http\Controllers\pages\Login::loginLostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
export const loginLostpassword = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loginLostpassword.url(options),
    method: 'get',
})

loginLostpassword.definition = {
    methods: ["get","head"],
    url: '/lostpassword',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Login::loginLostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
loginLostpassword.url = (options?: RouteQueryOptions) => {
    return loginLostpassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::loginLostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
loginLostpassword.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loginLostpassword.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Login::loginLostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
loginLostpassword.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loginLostpassword.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Login::loginLostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
    const loginLostpasswordForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: loginLostpassword.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Login::loginLostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
        loginLostpasswordForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loginLostpassword.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Login::loginLostpassword
 * @see app/Http/Controllers/pages/Login.php:116
 * @route '/lostpassword'
 */
        loginLostpasswordForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loginLostpassword.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    loginLostpassword.form = loginLostpasswordForm
/**
* @see \App\Http\Controllers\pages\Login::loginLostpasswordReset
 * @see app/Http/Controllers/pages/Login.php:120
 * @route '/lostpasswordReset'
 */
export const loginLostpasswordReset = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: loginLostpasswordReset.url(options),
    method: 'post',
})

loginLostpasswordReset.definition = {
    methods: ["post"],
    url: '/lostpasswordReset',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Login::loginLostpasswordReset
 * @see app/Http/Controllers/pages/Login.php:120
 * @route '/lostpasswordReset'
 */
loginLostpasswordReset.url = (options?: RouteQueryOptions) => {
    return loginLostpasswordReset.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::loginLostpasswordReset
 * @see app/Http/Controllers/pages/Login.php:120
 * @route '/lostpasswordReset'
 */
loginLostpasswordReset.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: loginLostpasswordReset.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Login::loginLostpasswordReset
 * @see app/Http/Controllers/pages/Login.php:120
 * @route '/lostpasswordReset'
 */
    const loginLostpasswordResetForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: loginLostpasswordReset.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Login::loginLostpasswordReset
 * @see app/Http/Controllers/pages/Login.php:120
 * @route '/lostpasswordReset'
 */
        loginLostpasswordResetForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: loginLostpasswordReset.url(options),
            method: 'post',
        })
    
    loginLostpasswordReset.form = loginLostpasswordResetForm
/**
* @see \App\Http\Controllers\pages\Login::passwordResetuser
 * @see app/Http/Controllers/pages/Login.php:157
 * @route '/passwordbaru'
 */
export const passwordResetuser = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: passwordResetuser.url(options),
    method: 'post',
})

passwordResetuser.definition = {
    methods: ["post"],
    url: '/passwordbaru',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Login::passwordResetuser
 * @see app/Http/Controllers/pages/Login.php:157
 * @route '/passwordbaru'
 */
passwordResetuser.url = (options?: RouteQueryOptions) => {
    return passwordResetuser.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Login::passwordResetuser
 * @see app/Http/Controllers/pages/Login.php:157
 * @route '/passwordbaru'
 */
passwordResetuser.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: passwordResetuser.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Login::passwordResetuser
 * @see app/Http/Controllers/pages/Login.php:157
 * @route '/passwordbaru'
 */
    const passwordResetuserForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: passwordResetuser.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Login::passwordResetuser
 * @see app/Http/Controllers/pages/Login.php:157
 * @route '/passwordbaru'
 */
        passwordResetuserForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: passwordResetuser.url(options),
            method: 'post',
        })
    
    passwordResetuser.form = passwordResetuserForm
/**
* @see \App\Http\Controllers\pages\Dashboard::dashboard
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::dashboard
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::dashboard
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Dashboard::dashboard
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Dashboard::dashboard
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Dashboard::dashboard
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Dashboard::dashboard
 * @see app/Http/Controllers/pages/Dashboard.php:34
 * @route '/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
/**
* @see \App\Http\Controllers\pages\Dashboard::periodeOptions
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-periode-options'
 */
export const dashboardPeriodeOptions = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardPeriodeOptions.url(options),
    method: 'post',
})

dashboardPeriodeOptions.definition = {
    methods: ["post"],
    url: '/dashboard-periode-options',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::periodeOptions
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-periode-options'
 */
dashboardPeriodeOptions.url = (options?: RouteQueryOptions) => {
    return dashboardPeriodeOptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::periodeOptions
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-periode-options'
 */
dashboardPeriodeOptions.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardPeriodeOptions.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\Dashboard::executiveSummary
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-executive-summary'
 */
export const dashboardExecutiveSummary = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardExecutiveSummary.url(options),
    method: 'post',
})

dashboardExecutiveSummary.definition = {
    methods: ["post"],
    url: '/dashboard-executive-summary',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::executiveSummary
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-executive-summary'
 */
dashboardExecutiveSummary.url = (options?: RouteQueryOptions) => {
    return dashboardExecutiveSummary.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::executiveSummary
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-executive-summary'
 */
dashboardExecutiveSummary.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardExecutiveSummary.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\Dashboard::actions
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-actions'
 */
export const dashboardActions = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardActions.url(options),
    method: 'post',
})

dashboardActions.definition = {
    methods: ["post"],
    url: '/dashboard-actions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::actions
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-actions'
 */
dashboardActions.url = (options?: RouteQueryOptions) => {
    return dashboardActions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::actions
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-actions'
 */
dashboardActions.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardActions.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\Dashboard::distribusiTrend
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-distribusi-trend'
 */
export const dashboardDistribusiTrend = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardDistribusiTrend.url(options),
    method: 'post',
})

dashboardDistribusiTrend.definition = {
    methods: ["post"],
    url: '/dashboard-distribusi-trend',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::distribusiTrend
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-distribusi-trend'
 */
dashboardDistribusiTrend.url = (options?: RouteQueryOptions) => {
    return dashboardDistribusiTrend.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::distribusiTrend
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-distribusi-trend'
 */
dashboardDistribusiTrend.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardDistribusiTrend.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\Dashboard::bottleneck
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-bottleneck'
 */
export const dashboardBottleneck = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardBottleneck.url(options),
    method: 'post',
})

dashboardBottleneck.definition = {
    methods: ["post"],
    url: '/dashboard-bottleneck',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::bottleneck
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-bottleneck'
 */
dashboardBottleneck.url = (options?: RouteQueryOptions) => {
    return dashboardBottleneck.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::bottleneck
 * @see app/Http/Controllers/pages/Dashboard.php
 * @route '/dashboard-bottleneck'
 */
dashboardBottleneck.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardBottleneck.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\Dashboard::dashboardRekon
 * @see app/Http/Controllers/pages/Dashboard.php:43
 * @route '/dashboard-rekon'
 */
export const dashboardRekon = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardRekon.url(options),
    method: 'post',
})

dashboardRekon.definition = {
    methods: ["post"],
    url: '/dashboard-rekon',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::dashboardRekon
 * @see app/Http/Controllers/pages/Dashboard.php:43
 * @route '/dashboard-rekon'
 */
dashboardRekon.url = (options?: RouteQueryOptions) => {
    return dashboardRekon.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::dashboardRekon
 * @see app/Http/Controllers/pages/Dashboard.php:43
 * @route '/dashboard-rekon'
 */
dashboardRekon.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardRekon.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Dashboard::dashboardRekon
 * @see app/Http/Controllers/pages/Dashboard.php:43
 * @route '/dashboard-rekon'
 */
    const dashboardRekonForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dashboardRekon.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Dashboard::dashboardRekon
 * @see app/Http/Controllers/pages/Dashboard.php:43
 * @route '/dashboard-rekon'
 */
        dashboardRekonForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dashboardRekon.url(options),
            method: 'post',
        })
    
    dashboardRekon.form = dashboardRekonForm
/**
* @see \App\Http\Controllers\pages\Dashboard::dashboardRedFlag
 * @see app/Http/Controllers/pages/Dashboard.php:96
 * @route '/dashboard-red-flag'
 */
export const dashboardRedFlag = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardRedFlag.url(options),
    method: 'post',
})

dashboardRedFlag.definition = {
    methods: ["post"],
    url: '/dashboard-red-flag',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::dashboardRedFlag
 * @see app/Http/Controllers/pages/Dashboard.php:96
 * @route '/dashboard-red-flag'
 */
dashboardRedFlag.url = (options?: RouteQueryOptions) => {
    return dashboardRedFlag.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::dashboardRedFlag
 * @see app/Http/Controllers/pages/Dashboard.php:96
 * @route '/dashboard-red-flag'
 */
dashboardRedFlag.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardRedFlag.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Dashboard::dashboardRedFlag
 * @see app/Http/Controllers/pages/Dashboard.php:96
 * @route '/dashboard-red-flag'
 */
    const dashboardRedFlagForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dashboardRedFlag.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Dashboard::dashboardRedFlag
 * @see app/Http/Controllers/pages/Dashboard.php:96
 * @route '/dashboard-red-flag'
 */
        dashboardRedFlagForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dashboardRedFlag.url(options),
            method: 'post',
        })
    
    dashboardRedFlag.form = dashboardRedFlagForm
/**
* @see \App\Http\Controllers\pages\Dashboard::dashboardTrace
 * @see app/Http/Controllers/pages/Dashboard.php:165
 * @route '/dashboard-trace'
 */
export const dashboardTrace = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardTrace.url(options),
    method: 'post',
})

dashboardTrace.definition = {
    methods: ["post"],
    url: '/dashboard-trace',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Dashboard::dashboardTrace
 * @see app/Http/Controllers/pages/Dashboard.php:165
 * @route '/dashboard-trace'
 */
dashboardTrace.url = (options?: RouteQueryOptions) => {
    return dashboardTrace.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Dashboard::dashboardTrace
 * @see app/Http/Controllers/pages/Dashboard.php:165
 * @route '/dashboard-trace'
 */
dashboardTrace.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dashboardTrace.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Dashboard::dashboardTrace
 * @see app/Http/Controllers/pages/Dashboard.php:165
 * @route '/dashboard-trace'
 */
    const dashboardTraceForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dashboardTrace.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Dashboard::dashboardTrace
 * @see app/Http/Controllers/pages/Dashboard.php:165
 * @route '/dashboard-trace'
 */
        dashboardTraceForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dashboardTrace.url(options),
            method: 'post',
        })
    
    dashboardTrace.form = dashboardTraceForm
/**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItem
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
export const pelacakanItem = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pelacakanItem.url(options),
    method: 'get',
})

pelacakanItem.definition = {
    methods: ["get","head"],
    url: '/pelacakan-item',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItem
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
pelacakanItem.url = (options?: RouteQueryOptions) => {
    return pelacakanItem.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItem
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
pelacakanItem.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pelacakanItem.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItem
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
pelacakanItem.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pelacakanItem.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItem
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
    const pelacakanItemForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pelacakanItem.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItem
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
        pelacakanItemForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pelacakanItem.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItem
 * @see app/Http/Controllers/pages/PelacakanItem.php:20
 * @route '/pelacakan-item'
 */
        pelacakanItemForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pelacakanItem.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pelacakanItem.form = pelacakanItemForm
/**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItemSearch
 * @see app/Http/Controllers/pages/PelacakanItem.php:25
 * @route '/pelacakan-item/search'
 */
export const pelacakanItemSearch = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pelacakanItemSearch.url(options),
    method: 'post',
})

pelacakanItemSearch.definition = {
    methods: ["post"],
    url: '/pelacakan-item/search',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItemSearch
 * @see app/Http/Controllers/pages/PelacakanItem.php:25
 * @route '/pelacakan-item/search'
 */
pelacakanItemSearch.url = (options?: RouteQueryOptions) => {
    return pelacakanItemSearch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItemSearch
 * @see app/Http/Controllers/pages/PelacakanItem.php:25
 * @route '/pelacakan-item/search'
 */
pelacakanItemSearch.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pelacakanItemSearch.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItemSearch
 * @see app/Http/Controllers/pages/PelacakanItem.php:25
 * @route '/pelacakan-item/search'
 */
    const pelacakanItemSearchForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: pelacakanItemSearch.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PelacakanItem::pelacakanItemSearch
 * @see app/Http/Controllers/pages/PelacakanItem.php:25
 * @route '/pelacakan-item/search'
 */
        pelacakanItemSearchForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: pelacakanItemSearch.url(options),
            method: 'post',
        })
    
    pelacakanItemSearch.form = pelacakanItemSearchForm
/**
* @see \App\Http\Controllers\pages\DataAkun::dataakun
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
export const dataakun = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataakun.url(options),
    method: 'get',
})

dataakun.definition = {
    methods: ["get","head"],
    url: '/dataakun',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::dataakun
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
dataakun.url = (options?: RouteQueryOptions) => {
    return dataakun.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::dataakun
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
dataakun.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataakun.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAkun::dataakun
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
dataakun.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataakun.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::dataakun
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
    const dataakunForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataakun.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::dataakun
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
        dataakunForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataakun.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAkun::dataakun
 * @see app/Http/Controllers/pages/DataAkun.php:26
 * @route '/dataakun'
 */
        dataakunForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataakun.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataakun.form = dataakunForm
/**
* @see \App\Http\Controllers\pages\DataAkun::dataakunListdata
 * @see app/Http/Controllers/pages/DataAkun.php:33
 * @route '/dataakun'
 */
export const dataakunListdata = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataakunListdata.url(options),
    method: 'post',
})

dataakunListdata.definition = {
    methods: ["post"],
    url: '/dataakun',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::dataakunListdata
 * @see app/Http/Controllers/pages/DataAkun.php:33
 * @route '/dataakun'
 */
dataakunListdata.url = (options?: RouteQueryOptions) => {
    return dataakunListdata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::dataakunListdata
 * @see app/Http/Controllers/pages/DataAkun.php:33
 * @route '/dataakun'
 */
dataakunListdata.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataakunListdata.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::dataakunListdata
 * @see app/Http/Controllers/pages/DataAkun.php:33
 * @route '/dataakun'
 */
    const dataakunListdataForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataakunListdata.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::dataakunListdata
 * @see app/Http/Controllers/pages/DataAkun.php:33
 * @route '/dataakun'
 */
        dataakunListdataForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataakunListdata.url(options),
            method: 'post',
        })
    
    dataakunListdata.form = dataakunListdataForm
/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
export const akunbaru = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunbaru.url(options),
    method: 'get',
})

akunbaru.definition = {
    methods: ["get","head"],
    url: '/akunBaru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
akunbaru.url = (options?: RouteQueryOptions) => {
    return akunbaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
akunbaru.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunbaru.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
akunbaru.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: akunbaru.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::akunbaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
    const akunbaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: akunbaru.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::akunbaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
        akunbaruForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: akunbaru.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAkun::akunbaru
 * @see app/Http/Controllers/pages/DataAkun.php:871
 * @route '/akunBaru'
 */
        akunbaruForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: akunbaru.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    akunbaru.form = akunbaruForm
/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruOpsi
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
export const akunbaruOpsi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunbaruOpsi.url(options),
    method: 'get',
})

akunbaruOpsi.definition = {
    methods: ["get","head"],
    url: '/akunBaruOpsi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruOpsi
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
akunbaruOpsi.url = (options?: RouteQueryOptions) => {
    return akunbaruOpsi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruOpsi
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
akunbaruOpsi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: akunbaruOpsi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruOpsi
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
akunbaruOpsi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: akunbaruOpsi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruOpsi
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
    const akunbaruOpsiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: akunbaruOpsi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruOpsi
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
        akunbaruOpsiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: akunbaruOpsi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruOpsi
 * @see app/Http/Controllers/pages/DataAkun.php:899
 * @route '/akunBaruOpsi'
 */
        akunbaruOpsiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: akunbaruOpsi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    akunbaruOpsi.form = akunbaruOpsiForm
/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruAddedit
 * @see app/Http/Controllers/pages/DataAkun.php:945
 * @route '/akunBaru'
 */
export const akunbaruAddedit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: akunbaruAddedit.url(options),
    method: 'post',
})

akunbaruAddedit.definition = {
    methods: ["post"],
    url: '/akunBaru',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruAddedit
 * @see app/Http/Controllers/pages/DataAkun.php:945
 * @route '/akunBaru'
 */
akunbaruAddedit.url = (options?: RouteQueryOptions) => {
    return akunbaruAddedit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruAddedit
 * @see app/Http/Controllers/pages/DataAkun.php:945
 * @route '/akunBaru'
 */
akunbaruAddedit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: akunbaruAddedit.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruAddedit
 * @see app/Http/Controllers/pages/DataAkun.php:945
 * @route '/akunBaru'
 */
    const akunbaruAddeditForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: akunbaruAddedit.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruAddedit
 * @see app/Http/Controllers/pages/DataAkun.php:945
 * @route '/akunBaru'
 */
        akunbaruAddeditForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: akunbaruAddedit.url(options),
            method: 'post',
        })
    
    akunbaruAddedit.form = akunbaruAddeditForm
/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruHapus
 * @see app/Http/Controllers/pages/DataAkun.php:1011
 * @route '/akunHapus'
 */
export const akunbaruHapus = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: akunbaruHapus.url(options),
    method: 'post',
})

akunbaruHapus.definition = {
    methods: ["post"],
    url: '/akunHapus',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruHapus
 * @see app/Http/Controllers/pages/DataAkun.php:1011
 * @route '/akunHapus'
 */
akunbaruHapus.url = (options?: RouteQueryOptions) => {
    return akunbaruHapus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruHapus
 * @see app/Http/Controllers/pages/DataAkun.php:1011
 * @route '/akunHapus'
 */
akunbaruHapus.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: akunbaruHapus.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruHapus
 * @see app/Http/Controllers/pages/DataAkun.php:1011
 * @route '/akunHapus'
 */
    const akunbaruHapusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: akunbaruHapus.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAkun::akunbaruHapus
 * @see app/Http/Controllers/pages/DataAkun.php:1011
 * @route '/akunHapus'
 */
        akunbaruHapusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: akunbaruHapus.url(options),
            method: 'post',
        })
    
    akunbaruHapus.form = akunbaruHapusForm
/**
* @see \App\Http\Controllers\pages\DataRole::datarole
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
export const datarole = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datarole.url(options),
    method: 'get',
})

datarole.definition = {
    methods: ["get","head"],
    url: '/datarole',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataRole::datarole
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
datarole.url = (options?: RouteQueryOptions) => {
    return datarole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataRole::datarole
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
datarole.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datarole.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataRole::datarole
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
datarole.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: datarole.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataRole::datarole
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
    const dataroleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: datarole.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataRole::datarole
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
        dataroleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datarole.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataRole::datarole
 * @see app/Http/Controllers/pages/DataRole.php:23
 * @route '/datarole'
 */
        dataroleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datarole.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    datarole.form = dataroleForm
/**
* @see \App\Http\Controllers\pages\DataRole::dataroleListdata
 * @see app/Http/Controllers/pages/DataRole.php:30
 * @route '/datarole'
 */
export const dataroleListdata = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataroleListdata.url(options),
    method: 'post',
})

dataroleListdata.definition = {
    methods: ["post"],
    url: '/datarole',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataRole::dataroleListdata
 * @see app/Http/Controllers/pages/DataRole.php:30
 * @route '/datarole'
 */
dataroleListdata.url = (options?: RouteQueryOptions) => {
    return dataroleListdata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataRole::dataroleListdata
 * @see app/Http/Controllers/pages/DataRole.php:30
 * @route '/datarole'
 */
dataroleListdata.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataroleListdata.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataRole::dataroleListdata
 * @see app/Http/Controllers/pages/DataRole.php:30
 * @route '/datarole'
 */
    const dataroleListdataForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataroleListdata.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataRole::dataroleListdata
 * @see app/Http/Controllers/pages/DataRole.php:30
 * @route '/datarole'
 */
        dataroleListdataForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataroleListdata.url(options),
            method: 'post',
        })
    
    dataroleListdata.form = dataroleListdataForm
/**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
export const dataroleBaru = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataroleBaru.url(options),
    method: 'get',
})

dataroleBaru.definition = {
    methods: ["get","head"],
    url: '/datarolebaru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
dataroleBaru.url = (options?: RouteQueryOptions) => {
    return dataroleBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
dataroleBaru.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataroleBaru.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
dataroleBaru.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataroleBaru.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
    const dataroleBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataroleBaru.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
        dataroleBaruForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataroleBaru.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaru
 * @see app/Http/Controllers/pages/DataRole.php:98
 * @route '/datarolebaru'
 */
        dataroleBaruForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataroleBaru.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataroleBaru.form = dataroleBaruForm
/**
* @see \App\Http\Controllers\pages\DataRole::dataroleDelete
 * @see app/Http/Controllers/pages/DataRole.php:219
 * @route '/hapusrole'
 */
export const dataroleDelete = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataroleDelete.url(options),
    method: 'post',
})

dataroleDelete.definition = {
    methods: ["post"],
    url: '/hapusrole',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataRole::dataroleDelete
 * @see app/Http/Controllers/pages/DataRole.php:219
 * @route '/hapusrole'
 */
dataroleDelete.url = (options?: RouteQueryOptions) => {
    return dataroleDelete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataRole::dataroleDelete
 * @see app/Http/Controllers/pages/DataRole.php:219
 * @route '/hapusrole'
 */
dataroleDelete.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataroleDelete.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataRole::dataroleDelete
 * @see app/Http/Controllers/pages/DataRole.php:219
 * @route '/hapusrole'
 */
    const dataroleDeleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataroleDelete.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataRole::dataroleDelete
 * @see app/Http/Controllers/pages/DataRole.php:219
 * @route '/hapusrole'
 */
        dataroleDeleteForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataroleDelete.url(options),
            method: 'post',
        })
    
    dataroleDelete.form = dataroleDeleteForm
/**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaruAddedit
 * @see app/Http/Controllers/pages/DataRole.php:127
 * @route '/datarolebaru'
 */
export const dataroleBaruAddedit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataroleBaruAddedit.url(options),
    method: 'post',
})

dataroleBaruAddedit.definition = {
    methods: ["post"],
    url: '/datarolebaru',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaruAddedit
 * @see app/Http/Controllers/pages/DataRole.php:127
 * @route '/datarolebaru'
 */
dataroleBaruAddedit.url = (options?: RouteQueryOptions) => {
    return dataroleBaruAddedit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaruAddedit
 * @see app/Http/Controllers/pages/DataRole.php:127
 * @route '/datarolebaru'
 */
dataroleBaruAddedit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataroleBaruAddedit.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaruAddedit
 * @see app/Http/Controllers/pages/DataRole.php:127
 * @route '/datarolebaru'
 */
    const dataroleBaruAddeditForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataroleBaruAddedit.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataRole::dataroleBaruAddedit
 * @see app/Http/Controllers/pages/DataRole.php:127
 * @route '/datarolebaru'
 */
        dataroleBaruAddeditForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataroleBaruAddedit.url(options),
            method: 'post',
        })
    
    dataroleBaruAddedit.form = dataroleBaruAddeditForm
/**
* @see \App\Http\Controllers\pages\Roadmap::roadmap
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
export const roadmap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roadmap.url(options),
    method: 'get',
})

roadmap.definition = {
    methods: ["get","head"],
    url: '/roadmap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Roadmap::roadmap
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
roadmap.url = (options?: RouteQueryOptions) => {
    return roadmap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Roadmap::roadmap
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
roadmap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roadmap.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Roadmap::roadmap
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
roadmap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: roadmap.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Roadmap::roadmap
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
    const roadmapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: roadmap.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Roadmap::roadmap
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
        roadmapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: roadmap.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Roadmap::roadmap
 * @see app/Http/Controllers/pages/Roadmap.php:12
 * @route '/roadmap'
 */
        roadmapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: roadmap.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    roadmap.form = roadmapForm
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
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
export const datapersonil = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapersonil.url(options),
    method: 'get',
})

datapersonil.definition = {
    methods: ["get","head"],
    url: '/datapersonil',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
datapersonil.url = (options?: RouteQueryOptions) => {
    return datapersonil.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
datapersonil.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapersonil.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
datapersonil.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: datapersonil.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
    const datapersonilForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: datapersonil.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
        datapersonilForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datapersonil.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:23
 * @route '/datapersonil'
 */
        datapersonilForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datapersonil.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    datapersonil.form = datapersonilForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::listdatapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:30
 * @route '/listdatapersonil'
 */
export const listdatapersonil = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listdatapersonil.url(options),
    method: 'post',
})

listdatapersonil.definition = {
    methods: ["post"],
    url: '/listdatapersonil',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::listdatapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:30
 * @route '/listdatapersonil'
 */
listdatapersonil.url = (options?: RouteQueryOptions) => {
    return listdatapersonil.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::listdatapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:30
 * @route '/listdatapersonil'
 */
listdatapersonil.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listdatapersonil.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::listdatapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:30
 * @route '/listdatapersonil'
 */
    const listdatapersonilForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: listdatapersonil.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::listdatapersonil
 * @see app/Http/Controllers/pages/DataPersonil.php:30
 * @route '/listdatapersonil'
 */
        listdatapersonilForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: listdatapersonil.url(options),
            method: 'post',
        })
    
    listdatapersonil.form = listdatapersonilForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
export const datapersonilbaru = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapersonilbaru.url(options),
    method: 'get',
})

datapersonilbaru.definition = {
    methods: ["get","head"],
    url: '/datapersonilbaru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
datapersonilbaru.url = (options?: RouteQueryOptions) => {
    return datapersonilbaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
datapersonilbaru.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapersonilbaru.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
datapersonilbaru.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: datapersonilbaru.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
    const datapersonilbaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: datapersonilbaru.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
        datapersonilbaruForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datapersonilbaru.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaru
 * @see app/Http/Controllers/pages/DataPersonil.php:173
 * @route '/datapersonilbaru'
 */
        datapersonilbaruForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datapersonilbaru.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    datapersonilbaru.form = datapersonilbaruForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaruAddedit
 * @see app/Http/Controllers/pages/DataPersonil.php:206
 * @route '/datapersonilbaru'
 */
export const datapersonilbaruAddedit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: datapersonilbaruAddedit.url(options),
    method: 'post',
})

datapersonilbaruAddedit.definition = {
    methods: ["post"],
    url: '/datapersonilbaru',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaruAddedit
 * @see app/Http/Controllers/pages/DataPersonil.php:206
 * @route '/datapersonilbaru'
 */
datapersonilbaruAddedit.url = (options?: RouteQueryOptions) => {
    return datapersonilbaruAddedit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaruAddedit
 * @see app/Http/Controllers/pages/DataPersonil.php:206
 * @route '/datapersonilbaru'
 */
datapersonilbaruAddedit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: datapersonilbaruAddedit.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaruAddedit
 * @see app/Http/Controllers/pages/DataPersonil.php:206
 * @route '/datapersonilbaru'
 */
    const datapersonilbaruAddeditForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: datapersonilbaruAddedit.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilbaruAddedit
 * @see app/Http/Controllers/pages/DataPersonil.php:206
 * @route '/datapersonilbaru'
 */
        datapersonilbaruAddeditForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: datapersonilbaruAddedit.url(options),
            method: 'post',
        })
    
    datapersonilbaruAddedit.form = datapersonilbaruAddeditForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDelete
 * @see app/Http/Controllers/pages/DataPersonil.php:128
 * @route '/deletepersonil'
 */
export const datapersonilDelete = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: datapersonilDelete.url(options),
    method: 'post',
})

datapersonilDelete.definition = {
    methods: ["post"],
    url: '/deletepersonil',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDelete
 * @see app/Http/Controllers/pages/DataPersonil.php:128
 * @route '/deletepersonil'
 */
datapersonilDelete.url = (options?: RouteQueryOptions) => {
    return datapersonilDelete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDelete
 * @see app/Http/Controllers/pages/DataPersonil.php:128
 * @route '/deletepersonil'
 */
datapersonilDelete.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: datapersonilDelete.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDelete
 * @see app/Http/Controllers/pages/DataPersonil.php:128
 * @route '/deletepersonil'
 */
    const datapersonilDeleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: datapersonilDelete.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDelete
 * @see app/Http/Controllers/pages/DataPersonil.php:128
 * @route '/deletepersonil'
 */
        datapersonilDeleteForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: datapersonilDelete.url(options),
            method: 'post',
        })
    
    datapersonilDelete.form = datapersonilDeleteForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUpload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
export const datapersonilUpload = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapersonilUpload.url(options),
    method: 'get',
})

datapersonilUpload.definition = {
    methods: ["get","head"],
    url: '/datapersonilupload',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUpload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
datapersonilUpload.url = (options?: RouteQueryOptions) => {
    return datapersonilUpload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUpload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
datapersonilUpload.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapersonilUpload.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUpload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
datapersonilUpload.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: datapersonilUpload.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUpload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
    const datapersonilUploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: datapersonilUpload.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUpload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
        datapersonilUploadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datapersonilUpload.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUpload
 * @see app/Http/Controllers/pages/DataPersonil.php:422
 * @route '/datapersonilupload'
 */
        datapersonilUploadForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datapersonilUpload.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    datapersonilUpload.form = datapersonilUploadForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUploadPost
 * @see app/Http/Controllers/pages/DataPersonil.php:454
 * @route '/upload-personil'
 */
export const datapersonilUploadPost = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: datapersonilUploadPost.url(options),
    method: 'post',
})

datapersonilUploadPost.definition = {
    methods: ["post"],
    url: '/upload-personil',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUploadPost
 * @see app/Http/Controllers/pages/DataPersonil.php:454
 * @route '/upload-personil'
 */
datapersonilUploadPost.url = (options?: RouteQueryOptions) => {
    return datapersonilUploadPost.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUploadPost
 * @see app/Http/Controllers/pages/DataPersonil.php:454
 * @route '/upload-personil'
 */
datapersonilUploadPost.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: datapersonilUploadPost.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUploadPost
 * @see app/Http/Controllers/pages/DataPersonil.php:454
 * @route '/upload-personil'
 */
    const datapersonilUploadPostForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: datapersonilUploadPost.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilUploadPost
 * @see app/Http/Controllers/pages/DataPersonil.php:454
 * @route '/upload-personil'
 */
        datapersonilUploadPostForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: datapersonilUploadPost.url(options),
            method: 'post',
        })
    
    datapersonilUploadPost.form = datapersonilUploadPostForm
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDownloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
export const datapersonilDownloadTemplate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapersonilDownloadTemplate.url(options),
    method: 'get',
})

datapersonilDownloadTemplate.definition = {
    methods: ["get","head"],
    url: '/download-template-personil',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDownloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
datapersonilDownloadTemplate.url = (options?: RouteQueryOptions) => {
    return datapersonilDownloadTemplate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDownloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
datapersonilDownloadTemplate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: datapersonilDownloadTemplate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDownloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
datapersonilDownloadTemplate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: datapersonilDownloadTemplate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDownloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
    const datapersonilDownloadTemplateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: datapersonilDownloadTemplate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDownloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
        datapersonilDownloadTemplateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datapersonilDownloadTemplate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPersonil::datapersonilDownloadTemplate
 * @see app/Http/Controllers/pages/DataPersonil.php:630
 * @route '/download-template-personil'
 */
        datapersonilDownloadTemplateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: datapersonilDownloadTemplate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    datapersonilDownloadTemplate.form = datapersonilDownloadTemplateForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
export const dataSatuan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataSatuan.url(options),
    method: 'get',
})

dataSatuan.definition = {
    methods: ["get","head"],
    url: '/dataSatuan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
dataSatuan.url = (options?: RouteQueryOptions) => {
    return dataSatuan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
dataSatuan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataSatuan.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
dataSatuan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataSatuan.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
    const dataSatuanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataSatuan.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
        dataSatuanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataSatuan.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuan
 * @see app/Http/Controllers/pages/KodamSatuan.php:19
 * @route '/dataSatuan'
 */
        dataSatuanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataSatuan.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataSatuan.form = dataSatuanForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuanBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:43
 * @route '/dataSatuan'
 */
export const dataSatuanBaru = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataSatuanBaru.url(options),
    method: 'post',
})

dataSatuanBaru.definition = {
    methods: ["post"],
    url: '/dataSatuan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuanBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:43
 * @route '/dataSatuan'
 */
dataSatuanBaru.url = (options?: RouteQueryOptions) => {
    return dataSatuanBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuanBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:43
 * @route '/dataSatuan'
 */
dataSatuanBaru.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataSatuanBaru.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuanBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:43
 * @route '/dataSatuan'
 */
    const dataSatuanBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataSatuanBaru.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuanBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:43
 * @route '/dataSatuan'
 */
        dataSatuanBaruForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataSatuanBaru.url(options),
            method: 'post',
        })
    
    dataSatuanBaru.form = dataSatuanBaruForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuanHapus
 * @see app/Http/Controllers/pages/KodamSatuan.php:122
 * @route '/hapusSatuan'
 */
export const dataSatuanHapus = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: dataSatuanHapus.url(options),
    method: 'delete',
})

dataSatuanHapus.definition = {
    methods: ["delete"],
    url: '/hapusSatuan',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuanHapus
 * @see app/Http/Controllers/pages/KodamSatuan.php:122
 * @route '/hapusSatuan'
 */
dataSatuanHapus.url = (options?: RouteQueryOptions) => {
    return dataSatuanHapus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuanHapus
 * @see app/Http/Controllers/pages/KodamSatuan.php:122
 * @route '/hapusSatuan'
 */
dataSatuanHapus.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: dataSatuanHapus.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuanHapus
 * @see app/Http/Controllers/pages/KodamSatuan.php:122
 * @route '/hapusSatuan'
 */
    const dataSatuanHapusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataSatuanHapus.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataSatuanHapus
 * @see app/Http/Controllers/pages/KodamSatuan.php:122
 * @route '/hapusSatuan'
 */
        dataSatuanHapusForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataSatuanHapus.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    dataSatuanHapus.form = dataSatuanHapusForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
export const dataKodam = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataKodam.url(options),
    method: 'get',
})

dataKodam.definition = {
    methods: ["get","head"],
    url: '/dataKodam',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
dataKodam.url = (options?: RouteQueryOptions) => {
    return dataKodam.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
dataKodam.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataKodam.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
dataKodam.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataKodam.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
    const dataKodamForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataKodam.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
        dataKodamForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataKodam.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodam
 * @see app/Http/Controllers/pages/KodamSatuan.php:153
 * @route '/dataKodam'
 */
        dataKodamForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataKodam.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataKodam.form = dataKodamForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodamBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:176
 * @route '/dataKodam'
 */
export const dataKodamBaru = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataKodamBaru.url(options),
    method: 'post',
})

dataKodamBaru.definition = {
    methods: ["post"],
    url: '/dataKodam',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodamBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:176
 * @route '/dataKodam'
 */
dataKodamBaru.url = (options?: RouteQueryOptions) => {
    return dataKodamBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodamBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:176
 * @route '/dataKodam'
 */
dataKodamBaru.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataKodamBaru.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodamBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:176
 * @route '/dataKodam'
 */
    const dataKodamBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataKodamBaru.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodamBaru
 * @see app/Http/Controllers/pages/KodamSatuan.php:176
 * @route '/dataKodam'
 */
        dataKodamBaruForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataKodamBaru.url(options),
            method: 'post',
        })
    
    dataKodamBaru.form = dataKodamBaruForm
/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodamHapus
 * @see app/Http/Controllers/pages/KodamSatuan.php:258
 * @route '/hapusKodam'
 */
export const dataKodamHapus = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: dataKodamHapus.url(options),
    method: 'delete',
})

dataKodamHapus.definition = {
    methods: ["delete"],
    url: '/hapusKodam',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodamHapus
 * @see app/Http/Controllers/pages/KodamSatuan.php:258
 * @route '/hapusKodam'
 */
dataKodamHapus.url = (options?: RouteQueryOptions) => {
    return dataKodamHapus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodamHapus
 * @see app/Http/Controllers/pages/KodamSatuan.php:258
 * @route '/hapusKodam'
 */
dataKodamHapus.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: dataKodamHapus.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodamHapus
 * @see app/Http/Controllers/pages/KodamSatuan.php:258
 * @route '/hapusKodam'
 */
    const dataKodamHapusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataKodamHapus.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\KodamSatuan::dataKodamHapus
 * @see app/Http/Controllers/pages/KodamSatuan.php:258
 * @route '/hapusKodam'
 */
        dataKodamHapusForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataKodamHapus.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    dataKodamHapus.form = dataKodamHapusForm
/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
export const dataPeriode = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPeriode.url(options),
    method: 'get',
})

dataPeriode.definition = {
    methods: ["get","head"],
    url: '/dataPeriode',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
dataPeriode.url = (options?: RouteQueryOptions) => {
    return dataPeriode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
dataPeriode.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPeriode.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
dataPeriode.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataPeriode.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
    const dataPeriodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataPeriode.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
        dataPeriodeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPeriode.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriode
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:13
 * @route '/dataPeriode'
 */
        dataPeriodeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPeriode.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataPeriode.form = dataPeriodeForm
/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriodeBaru
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:36
 * @route '/dataPeriode'
 */
export const dataPeriodeBaru = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPeriodeBaru.url(options),
    method: 'post',
})

dataPeriodeBaru.definition = {
    methods: ["post"],
    url: '/dataPeriode',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriodeBaru
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:36
 * @route '/dataPeriode'
 */
dataPeriodeBaru.url = (options?: RouteQueryOptions) => {
    return dataPeriodeBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriodeBaru
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:36
 * @route '/dataPeriode'
 */
dataPeriodeBaru.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPeriodeBaru.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriodeBaru
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:36
 * @route '/dataPeriode'
 */
    const dataPeriodeBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataPeriodeBaru.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriodeBaru
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:36
 * @route '/dataPeriode'
 */
        dataPeriodeBaruForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataPeriodeBaru.url(options),
            method: 'post',
        })
    
    dataPeriodeBaru.form = dataPeriodeBaruForm
/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriodeHapus
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:99
 * @route '/hapusPeriode'
 */
export const dataPeriodeHapus = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: dataPeriodeHapus.url(options),
    method: 'delete',
})

dataPeriodeHapus.definition = {
    methods: ["delete"],
    url: '/hapusPeriode',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriodeHapus
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:99
 * @route '/hapusPeriode'
 */
dataPeriodeHapus.url = (options?: RouteQueryOptions) => {
    return dataPeriodeHapus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriodeHapus
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:99
 * @route '/hapusPeriode'
 */
dataPeriodeHapus.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: dataPeriodeHapus.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriodeHapus
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:99
 * @route '/hapusPeriode'
 */
    const dataPeriodeHapusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataPeriodeHapus.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PeriodeAlokasi::dataPeriodeHapus
 * @see app/Http/Controllers/pages/PeriodeAlokasi.php:99
 * @route '/hapusPeriode'
 */
        dataPeriodeHapusForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataPeriodeHapus.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    dataPeriodeHapus.form = dataPeriodeHapusForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
export const dataAlokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataAlokasi.url(options),
    method: 'get',
})

dataAlokasi.definition = {
    methods: ["get","head"],
    url: '/alokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
dataAlokasi.url = (options?: RouteQueryOptions) => {
    return dataAlokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
dataAlokasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataAlokasi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
dataAlokasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataAlokasi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
    const dataAlokasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataAlokasi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
        dataAlokasiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataAlokasi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:23
 * @route '/alokasi'
 */
        dataAlokasiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataAlokasi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataAlokasi.form = dataAlokasiForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
export const dataListAlokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataListAlokasi.url(options),
    method: 'get',
})

dataListAlokasi.definition = {
    methods: ["get","head"],
    url: '/alokasilist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
dataListAlokasi.url = (options?: RouteQueryOptions) => {
    return dataListAlokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
dataListAlokasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataListAlokasi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
dataListAlokasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataListAlokasi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
    const dataListAlokasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataListAlokasi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
        dataListAlokasiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataListAlokasi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasi
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
        dataListAlokasiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataListAlokasi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataListAlokasi.form = dataListAlokasiForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasiPost
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
export const dataListAlokasiPost = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataListAlokasiPost.url(options),
    method: 'post',
})

dataListAlokasiPost.definition = {
    methods: ["post"],
    url: '/alokasilist',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasiPost
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
dataListAlokasiPost.url = (options?: RouteQueryOptions) => {
    return dataListAlokasiPost.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasiPost
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
dataListAlokasiPost.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataListAlokasiPost.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasiPost
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
    const dataListAlokasiPostForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataListAlokasiPost.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataListAlokasiPost
 * @see app/Http/Controllers/pages/DataAlokasi.php:31
 * @route '/alokasilist'
 */
        dataListAlokasiPostForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataListAlokasiPost.url(options),
            method: 'post',
        })
    
    dataListAlokasiPost.form = dataListAlokasiPostForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
export const dataAlokasiBaru = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataAlokasiBaru.url(options),
    method: 'get',
})

dataAlokasiBaru.definition = {
    methods: ["get","head"],
    url: '/alokasibaru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
dataAlokasiBaru.url = (options?: RouteQueryOptions) => {
    return dataAlokasiBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
dataAlokasiBaru.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataAlokasiBaru.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
dataAlokasiBaru.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataAlokasiBaru.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
    const dataAlokasiBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataAlokasiBaru.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
        dataAlokasiBaruForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataAlokasiBaru.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiBaru
 * @see app/Http/Controllers/pages/DataAlokasi.php:186
 * @route '/alokasibaru'
 */
        dataAlokasiBaruForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataAlokasiBaru.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataAlokasiBaru.form = dataAlokasiBaruForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAddEdit
 * @see app/Http/Controllers/pages/DataAlokasi.php:205
 * @route '/alokasibaru'
 */
export const dataAlokasiAddEdit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataAlokasiAddEdit.url(options),
    method: 'post',
})

dataAlokasiAddEdit.definition = {
    methods: ["post"],
    url: '/alokasibaru',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAddEdit
 * @see app/Http/Controllers/pages/DataAlokasi.php:205
 * @route '/alokasibaru'
 */
dataAlokasiAddEdit.url = (options?: RouteQueryOptions) => {
    return dataAlokasiAddEdit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAddEdit
 * @see app/Http/Controllers/pages/DataAlokasi.php:205
 * @route '/alokasibaru'
 */
dataAlokasiAddEdit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataAlokasiAddEdit.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAddEdit
 * @see app/Http/Controllers/pages/DataAlokasi.php:205
 * @route '/alokasibaru'
 */
    const dataAlokasiAddEditForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataAlokasiAddEdit.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAddEdit
 * @see app/Http/Controllers/pages/DataAlokasi.php:205
 * @route '/alokasibaru'
 */
        dataAlokasiAddEditForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataAlokasiAddEdit.url(options),
            method: 'post',
        })
    
    dataAlokasiAddEdit.form = dataAlokasiAddEditForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiDestroy
 * @see app/Http/Controllers/pages/DataAlokasi.php:318
 * @route '/alokasi/{alokasi}'
 */
export const dataAlokasiDestroy = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: dataAlokasiDestroy.url(args, options),
    method: 'delete',
})

dataAlokasiDestroy.definition = {
    methods: ["delete"],
    url: '/alokasi/{alokasi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiDestroy
 * @see app/Http/Controllers/pages/DataAlokasi.php:318
 * @route '/alokasi/{alokasi}'
 */
dataAlokasiDestroy.url = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return dataAlokasiDestroy.definition.url
            .replace('{alokasi}', parsedArgs.alokasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiDestroy
 * @see app/Http/Controllers/pages/DataAlokasi.php:318
 * @route '/alokasi/{alokasi}'
 */
dataAlokasiDestroy.delete = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: dataAlokasiDestroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiDestroy
 * @see app/Http/Controllers/pages/DataAlokasi.php:318
 * @route '/alokasi/{alokasi}'
 */
    const dataAlokasiDestroyForm = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataAlokasiDestroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiDestroy
 * @see app/Http/Controllers/pages/DataAlokasi.php:318
 * @route '/alokasi/{alokasi}'
 */
        dataAlokasiDestroyForm.delete = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataAlokasiDestroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    dataAlokasiDestroy.form = dataAlokasiDestroyForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAcc
 * @see app/Http/Controllers/pages/DataAlokasi.php:359
 * @route '/alokasi/{alokasi}/acc'
 */
export const dataAlokasiAcc = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataAlokasiAcc.url(args, options),
    method: 'post',
})

dataAlokasiAcc.definition = {
    methods: ["post"],
    url: '/alokasi/{alokasi}/acc',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAcc
 * @see app/Http/Controllers/pages/DataAlokasi.php:359
 * @route '/alokasi/{alokasi}/acc'
 */
dataAlokasiAcc.url = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return dataAlokasiAcc.definition.url
            .replace('{alokasi}', parsedArgs.alokasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAcc
 * @see app/Http/Controllers/pages/DataAlokasi.php:359
 * @route '/alokasi/{alokasi}/acc'
 */
dataAlokasiAcc.post = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataAlokasiAcc.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAcc
 * @see app/Http/Controllers/pages/DataAlokasi.php:359
 * @route '/alokasi/{alokasi}/acc'
 */
    const dataAlokasiAccForm = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataAlokasiAcc.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAcc
 * @see app/Http/Controllers/pages/DataAlokasi.php:359
 * @route '/alokasi/{alokasi}/acc'
 */
        dataAlokasiAccForm.post = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataAlokasiAcc.url(args, options),
            method: 'post',
        })
    
    dataAlokasiAcc.form = dataAlokasiAccForm
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAcc2
 * @see app/Http/Controllers/pages/DataAlokasi.php:399
 * @route '/alokasi/{alokasi}/acc2'
 */
export const dataAlokasiAcc2 = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataAlokasiAcc2.url(args, options),
    method: 'post',
})

dataAlokasiAcc2.definition = {
    methods: ["post"],
    url: '/alokasi/{alokasi}/acc2',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAcc2
 * @see app/Http/Controllers/pages/DataAlokasi.php:399
 * @route '/alokasi/{alokasi}/acc2'
 */
dataAlokasiAcc2.url = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return dataAlokasiAcc2.definition.url
            .replace('{alokasi}', parsedArgs.alokasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAcc2
 * @see app/Http/Controllers/pages/DataAlokasi.php:399
 * @route '/alokasi/{alokasi}/acc2'
 */
dataAlokasiAcc2.post = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataAlokasiAcc2.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAcc2
 * @see app/Http/Controllers/pages/DataAlokasi.php:399
 * @route '/alokasi/{alokasi}/acc2'
 */
    const dataAlokasiAcc2Form = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataAlokasiAcc2.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiAcc2
 * @see app/Http/Controllers/pages/DataAlokasi.php:399
 * @route '/alokasi/{alokasi}/acc2'
 */
        dataAlokasiAcc2Form.post = (args: { alokasi: number | { id: number } } | [alokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataAlokasiAcc2.url(args, options),
            method: 'post',
        })
    
    dataAlokasiAcc2.form = dataAlokasiAcc2Form
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiNan
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
export const dataAlokasiNan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataAlokasiNan.url(options),
    method: 'get',
})

dataAlokasiNan.definition = {
    methods: ["get","head"],
    url: '/alokasiNAN',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiNan
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
dataAlokasiNan.url = (options?: RouteQueryOptions) => {
    return dataAlokasiNan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiNan
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
dataAlokasiNan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataAlokasiNan.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiNan
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
dataAlokasiNan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataAlokasiNan.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiNan
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
    const dataAlokasiNanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataAlokasiNan.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiNan
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
        dataAlokasiNanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataAlokasiNan.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataAlokasi::dataAlokasiNan
 * @see app/Http/Controllers/pages/DataAlokasi.php:290
 * @route '/alokasiNAN'
 */
        dataAlokasiNanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataAlokasiNan.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataAlokasiNan.form = dataAlokasiNanForm
/**
* @see \App\Http\Controllers\pages\RegItem::regItem
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
export const regItem = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regItem.url(options),
    method: 'get',
})

regItem.definition = {
    methods: ["get","head"],
    url: '/registrasiitem',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\RegItem::regItem
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
regItem.url = (options?: RouteQueryOptions) => {
    return regItem.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItem::regItem
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
regItem.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regItem.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\RegItem::regItem
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
regItem.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regItem.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\RegItem::regItem
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
    const regItemForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: regItem.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\RegItem::regItem
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
        regItemForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regItem.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\RegItem::regItem
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
        regItemForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regItem.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    regItem.form = regItemForm
/**
* @see \App\Http\Controllers\pages\RegItem::regItemListdata
 * @see app/Http/Controllers/pages/RegItem.php:62
 * @route '/registrasiitem-listdata'
 */
export const regItemListdata = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regItemListdata.url(options),
    method: 'post',
})

regItemListdata.definition = {
    methods: ["post"],
    url: '/registrasiitem-listdata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RegItem::regItemListdata
 * @see app/Http/Controllers/pages/RegItem.php:62
 * @route '/registrasiitem-listdata'
 */
regItemListdata.url = (options?: RouteQueryOptions) => {
    return regItemListdata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItem::regItemListdata
 * @see app/Http/Controllers/pages/RegItem.php:62
 * @route '/registrasiitem-listdata'
 */
regItemListdata.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regItemListdata.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RegItem::regItemListdata
 * @see app/Http/Controllers/pages/RegItem.php:62
 * @route '/registrasiitem-listdata'
 */
    const regItemListdataForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: regItemListdata.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RegItem::regItemListdata
 * @see app/Http/Controllers/pages/RegItem.php:62
 * @route '/registrasiitem-listdata'
 */
        regItemListdataForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: regItemListdata.url(options),
            method: 'post',
        })
    
    regItemListdata.form = regItemListdataForm
/**
* @see \App\Http\Controllers\pages\RegItem::regItemDelete
 * @see app/Http/Controllers/pages/RegItem.php:28
 * @route '/registrasiitem-del'
 */
export const regItemDelete = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regItemDelete.url(options),
    method: 'post',
})

regItemDelete.definition = {
    methods: ["post"],
    url: '/registrasiitem-del',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RegItem::regItemDelete
 * @see app/Http/Controllers/pages/RegItem.php:28
 * @route '/registrasiitem-del'
 */
regItemDelete.url = (options?: RouteQueryOptions) => {
    return regItemDelete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItem::regItemDelete
 * @see app/Http/Controllers/pages/RegItem.php:28
 * @route '/registrasiitem-del'
 */
regItemDelete.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regItemDelete.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RegItem::regItemDelete
 * @see app/Http/Controllers/pages/RegItem.php:28
 * @route '/registrasiitem-del'
 */
    const regItemDeleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: regItemDelete.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RegItem::regItemDelete
 * @see app/Http/Controllers/pages/RegItem.php:28
 * @route '/registrasiitem-del'
 */
        regItemDeleteForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: regItemDelete.url(options),
            method: 'post',
        })
    
    regItemDelete.form = regItemDeleteForm
/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemBaru
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
export const regItemBaru = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regItemBaru.url(options),
    method: 'get',
})

regItemBaru.definition = {
    methods: ["get","head"],
    url: '/registrasiitembaru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemBaru
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
regItemBaru.url = (options?: RouteQueryOptions) => {
    return regItemBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemBaru
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
regItemBaru.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regItemBaru.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemBaru
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
regItemBaru.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regItemBaru.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemBaru
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
    const regItemBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: regItemBaru.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemBaru
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
        regItemBaruForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regItemBaru.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemBaru
 * @see app/Http/Controllers/pages/RegItemBaru.php:19
 * @route '/registrasiitembaru'
 */
        regItemBaruForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regItemBaru.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    regItemBaru.form = regItemBaruForm
/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGetnsn
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
export const regItemGetnsn = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regItemGetnsn.url(options),
    method: 'get',
})

regItemGetnsn.definition = {
    methods: ["get","head"],
    url: '/registrasiitem-nsn',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGetnsn
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
regItemGetnsn.url = (options?: RouteQueryOptions) => {
    return regItemGetnsn.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGetnsn
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
regItemGetnsn.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regItemGetnsn.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGetnsn
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
regItemGetnsn.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regItemGetnsn.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGetnsn
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
    const regItemGetnsnForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: regItemGetnsn.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGetnsn
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
        regItemGetnsnForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regItemGetnsn.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGetnsn
 * @see app/Http/Controllers/pages/RegItemBaru.php:27
 * @route '/registrasiitem-nsn'
 */
        regItemGetnsnForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regItemGetnsn.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    regItemGetnsn.form = regItemGetnsnForm
/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGethash
 * @see app/Http/Controllers/pages/RegItemBaru.php:76
 * @route '/registrasiitem-hash'
 */
export const regItemGethash = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regItemGethash.url(options),
    method: 'post',
})

regItemGethash.definition = {
    methods: ["post"],
    url: '/registrasiitem-hash',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGethash
 * @see app/Http/Controllers/pages/RegItemBaru.php:76
 * @route '/registrasiitem-hash'
 */
regItemGethash.url = (options?: RouteQueryOptions) => {
    return regItemGethash.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGethash
 * @see app/Http/Controllers/pages/RegItemBaru.php:76
 * @route '/registrasiitem-hash'
 */
regItemGethash.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regItemGethash.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGethash
 * @see app/Http/Controllers/pages/RegItemBaru.php:76
 * @route '/registrasiitem-hash'
 */
    const regItemGethashForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: regItemGethash.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemGethash
 * @see app/Http/Controllers/pages/RegItemBaru.php:76
 * @route '/registrasiitem-hash'
 */
        regItemGethashForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: regItemGethash.url(options),
            method: 'post',
        })
    
    regItemGethash.form = regItemGethashForm
/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemAddnew
 * @see app/Http/Controllers/pages/RegItemBaru.php:94
 * @route '/registrasiitem-add'
 */
export const regItemAddnew = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regItemAddnew.url(options),
    method: 'post',
})

regItemAddnew.definition = {
    methods: ["post"],
    url: '/registrasiitem-add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemAddnew
 * @see app/Http/Controllers/pages/RegItemBaru.php:94
 * @route '/registrasiitem-add'
 */
regItemAddnew.url = (options?: RouteQueryOptions) => {
    return regItemAddnew.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemAddnew
 * @see app/Http/Controllers/pages/RegItemBaru.php:94
 * @route '/registrasiitem-add'
 */
regItemAddnew.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regItemAddnew.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemAddnew
 * @see app/Http/Controllers/pages/RegItemBaru.php:94
 * @route '/registrasiitem-add'
 */
    const regItemAddnewForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: regItemAddnew.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemAddnew
 * @see app/Http/Controllers/pages/RegItemBaru.php:94
 * @route '/registrasiitem-add'
 */
        regItemAddnewForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: regItemAddnew.url(options),
            method: 'post',
        })
    
    regItemAddnew.form = regItemAddnewForm
/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemJmlalokasi
 * @see app/Http/Controllers/pages/RegItemBaru.php:49
 * @route '/registrasiitem-jmlalokasi'
 */
export const regItemJmlalokasi = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regItemJmlalokasi.url(options),
    method: 'post',
})

regItemJmlalokasi.definition = {
    methods: ["post"],
    url: '/registrasiitem-jmlalokasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemJmlalokasi
 * @see app/Http/Controllers/pages/RegItemBaru.php:49
 * @route '/registrasiitem-jmlalokasi'
 */
regItemJmlalokasi.url = (options?: RouteQueryOptions) => {
    return regItemJmlalokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemJmlalokasi
 * @see app/Http/Controllers/pages/RegItemBaru.php:49
 * @route '/registrasiitem-jmlalokasi'
 */
regItemJmlalokasi.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regItemJmlalokasi.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemJmlalokasi
 * @see app/Http/Controllers/pages/RegItemBaru.php:49
 * @route '/registrasiitem-jmlalokasi'
 */
    const regItemJmlalokasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: regItemJmlalokasi.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RegItemBaru::regItemJmlalokasi
 * @see app/Http/Controllers/pages/RegItemBaru.php:49
 * @route '/registrasiitem-jmlalokasi'
 */
        regItemJmlalokasiForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: regItemJmlalokasi.url(options),
            method: 'post',
        })
    
    regItemJmlalokasi.form = regItemJmlalokasiForm
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
export const pengirimanBaru = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pengirimanBaru.url(options),
    method: 'get',
})

pengirimanBaru.definition = {
    methods: ["get","head"],
    url: '/pengiriman-baru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
pengirimanBaru.url = (options?: RouteQueryOptions) => {
    return pengirimanBaru.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
pengirimanBaru.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pengirimanBaru.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
pengirimanBaru.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pengirimanBaru.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
    const pengirimanBaruForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pengirimanBaru.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
        pengirimanBaruForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pengirimanBaru.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanBaru
 * @see app/Http/Controllers/pages/PengirimanBaru.php:22
 * @route '/pengiriman-baru'
 */
        pengirimanBaruForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pengirimanBaru.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pengirimanBaru.form = pengirimanBaruForm
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanUid
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
export const pengirimanUid = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pengirimanUid.url(options),
    method: 'get',
})

pengirimanUid.definition = {
    methods: ["get","head"],
    url: '/pengiriman-uid',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanUid
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
pengirimanUid.url = (options?: RouteQueryOptions) => {
    return pengirimanUid.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanUid
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
pengirimanUid.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pengirimanUid.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanUid
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
pengirimanUid.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pengirimanUid.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanUid
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
    const pengirimanUidForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pengirimanUid.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanUid
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
        pengirimanUidForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pengirimanUid.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanUid
 * @see app/Http/Controllers/pages/PengirimanBaru.php:29
 * @route '/pengiriman-uid'
 */
        pengirimanUidForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pengirimanUid.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pengirimanUid.form = pengirimanUidForm
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanDataAlokasi
 * @see app/Http/Controllers/pages/PengirimanBaru.php:104
 * @route '/pengiriman-dataAlokasi'
 */
export const pengirimanDataAlokasi = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pengirimanDataAlokasi.url(options),
    method: 'post',
})

pengirimanDataAlokasi.definition = {
    methods: ["post"],
    url: '/pengiriman-dataAlokasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanDataAlokasi
 * @see app/Http/Controllers/pages/PengirimanBaru.php:104
 * @route '/pengiriman-dataAlokasi'
 */
pengirimanDataAlokasi.url = (options?: RouteQueryOptions) => {
    return pengirimanDataAlokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanDataAlokasi
 * @see app/Http/Controllers/pages/PengirimanBaru.php:104
 * @route '/pengiriman-dataAlokasi'
 */
pengirimanDataAlokasi.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pengirimanDataAlokasi.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanDataAlokasi
 * @see app/Http/Controllers/pages/PengirimanBaru.php:104
 * @route '/pengiriman-dataAlokasi'
 */
    const pengirimanDataAlokasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: pengirimanDataAlokasi.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanDataAlokasi
 * @see app/Http/Controllers/pages/PengirimanBaru.php:104
 * @route '/pengiriman-dataAlokasi'
 */
        pengirimanDataAlokasiForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: pengirimanDataAlokasi.url(options),
            method: 'post',
        })
    
    pengirimanDataAlokasi.form = pengirimanDataAlokasiForm
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanHashBox
 * @see app/Http/Controllers/pages/PengirimanBaru.php:58
 * @route '/pengiriman-hashBox'
 */
export const pengirimanHashBox = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pengirimanHashBox.url(options),
    method: 'post',
})

pengirimanHashBox.definition = {
    methods: ["post"],
    url: '/pengiriman-hashBox',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanHashBox
 * @see app/Http/Controllers/pages/PengirimanBaru.php:58
 * @route '/pengiriman-hashBox'
 */
pengirimanHashBox.url = (options?: RouteQueryOptions) => {
    return pengirimanHashBox.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanHashBox
 * @see app/Http/Controllers/pages/PengirimanBaru.php:58
 * @route '/pengiriman-hashBox'
 */
pengirimanHashBox.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pengirimanHashBox.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanHashBox
 * @see app/Http/Controllers/pages/PengirimanBaru.php:58
 * @route '/pengiriman-hashBox'
 */
    const pengirimanHashBoxForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: pengirimanHashBox.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanHashBox
 * @see app/Http/Controllers/pages/PengirimanBaru.php:58
 * @route '/pengiriman-hashBox'
 */
        pengirimanHashBoxForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: pengirimanHashBox.url(options),
            method: 'post',
        })
    
    pengirimanHashBox.form = pengirimanHashBoxForm
/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanStore
 * @see app/Http/Controllers/pages/PengirimanBaru.php:145
 * @route '/pengiriman-store'
 */
export const pengirimanStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pengirimanStore.url(options),
    method: 'post',
})

pengirimanStore.definition = {
    methods: ["post"],
    url: '/pengiriman-store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanStore
 * @see app/Http/Controllers/pages/PengirimanBaru.php:145
 * @route '/pengiriman-store'
 */
pengirimanStore.url = (options?: RouteQueryOptions) => {
    return pengirimanStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanStore
 * @see app/Http/Controllers/pages/PengirimanBaru.php:145
 * @route '/pengiriman-store'
 */
pengirimanStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pengirimanStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanStore
 * @see app/Http/Controllers/pages/PengirimanBaru.php:145
 * @route '/pengiriman-store'
 */
    const pengirimanStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: pengirimanStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PengirimanBaru::pengirimanStore
 * @see app/Http/Controllers/pages/PengirimanBaru.php:145
 * @route '/pengiriman-store'
 */
        pengirimanStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: pengirimanStore.url(options),
            method: 'post',
        })
    
    pengirimanStore.form = pengirimanStoreForm
/**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
export const dataPengiriman = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPengiriman.url(options),
    method: 'get',
})

dataPengiriman.definition = {
    methods: ["get","head"],
    url: '/data-pengiriman',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
dataPengiriman.url = (options?: RouteQueryOptions) => {
    return dataPengiriman.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
dataPengiriman.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPengiriman.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
dataPengiriman.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataPengiriman.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
    const dataPengirimanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataPengiriman.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
        dataPengirimanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPengiriman.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengiriman
 * @see app/Http/Controllers/pages/DataPengiriman.php:19
 * @route '/data-pengiriman'
 */
        dataPengirimanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPengiriman.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataPengiriman.form = dataPengirimanForm
/**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengirimanListdata
 * @see app/Http/Controllers/pages/DataPengiriman.php:27
 * @route '/data-pengiriman-listdata'
 */
export const dataPengirimanListdata = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPengirimanListdata.url(options),
    method: 'post',
})

dataPengirimanListdata.definition = {
    methods: ["post"],
    url: '/data-pengiriman-listdata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengirimanListdata
 * @see app/Http/Controllers/pages/DataPengiriman.php:27
 * @route '/data-pengiriman-listdata'
 */
dataPengirimanListdata.url = (options?: RouteQueryOptions) => {
    return dataPengirimanListdata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengirimanListdata
 * @see app/Http/Controllers/pages/DataPengiriman.php:27
 * @route '/data-pengiriman-listdata'
 */
dataPengirimanListdata.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPengirimanListdata.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengirimanListdata
 * @see app/Http/Controllers/pages/DataPengiriman.php:27
 * @route '/data-pengiriman-listdata'
 */
    const dataPengirimanListdataForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataPengirimanListdata.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengirimanListdata
 * @see app/Http/Controllers/pages/DataPengiriman.php:27
 * @route '/data-pengiriman-listdata'
 */
        dataPengirimanListdataForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataPengirimanListdata.url(options),
            method: 'post',
        })
    
    dataPengirimanListdata.form = dataPengirimanListdataForm
/**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengirimanDelete
 * @see app/Http/Controllers/pages/DataPengiriman.php:197
 * @route '/data-pengiriman-delete'
 */
export const dataPengirimanDelete = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPengirimanDelete.url(options),
    method: 'post',
})

dataPengirimanDelete.definition = {
    methods: ["post"],
    url: '/data-pengiriman-delete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengirimanDelete
 * @see app/Http/Controllers/pages/DataPengiriman.php:197
 * @route '/data-pengiriman-delete'
 */
dataPengirimanDelete.url = (options?: RouteQueryOptions) => {
    return dataPengirimanDelete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengirimanDelete
 * @see app/Http/Controllers/pages/DataPengiriman.php:197
 * @route '/data-pengiriman-delete'
 */
dataPengirimanDelete.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPengirimanDelete.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengirimanDelete
 * @see app/Http/Controllers/pages/DataPengiriman.php:197
 * @route '/data-pengiriman-delete'
 */
    const dataPengirimanDeleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataPengirimanDelete.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPengiriman::dataPengirimanDelete
 * @see app/Http/Controllers/pages/DataPengiriman.php:197
 * @route '/data-pengiriman-delete'
 */
        dataPengirimanDeleteForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataPengirimanDelete.url(options),
            method: 'post',
        })
    
    dataPengirimanDelete.form = dataPengirimanDeleteForm
/**
* @see \App\Http\Controllers\pages\Monitoring::monitoring
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
export const monitoring = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoring.url(options),
    method: 'get',
})

monitoring.definition = {
    methods: ["get","head"],
    url: '/monitoring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\Monitoring::monitoring
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
monitoring.url = (options?: RouteQueryOptions) => {
    return monitoring.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Monitoring::monitoring
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
monitoring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoring.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\Monitoring::monitoring
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
monitoring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monitoring.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\Monitoring::monitoring
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
    const monitoringForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: monitoring.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\Monitoring::monitoring
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
        monitoringForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: monitoring.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\Monitoring::monitoring
 * @see app/Http/Controllers/pages/Monitoring.php:20
 * @route '/monitoring'
 */
        monitoringForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: monitoring.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    monitoring.form = monitoringForm
/**
* @see \App\Http\Controllers\pages\Monitoring::monitoringListdata
 * @see app/Http/Controllers/pages/Monitoring.php:28
 * @route '/monitoring-listdata'
 */
export const monitoringListdata = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringListdata.url(options),
    method: 'post',
})

monitoringListdata.definition = {
    methods: ["post"],
    url: '/monitoring-listdata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Monitoring::monitoringListdata
 * @see app/Http/Controllers/pages/Monitoring.php:28
 * @route '/monitoring-listdata'
 */
monitoringListdata.url = (options?: RouteQueryOptions) => {
    return monitoringListdata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Monitoring::monitoringListdata
 * @see app/Http/Controllers/pages/Monitoring.php:28
 * @route '/monitoring-listdata'
 */
monitoringListdata.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringListdata.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Monitoring::monitoringListdata
 * @see app/Http/Controllers/pages/Monitoring.php:28
 * @route '/monitoring-listdata'
 */
    const monitoringListdataForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: monitoringListdata.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Monitoring::monitoringListdata
 * @see app/Http/Controllers/pages/Monitoring.php:28
 * @route '/monitoring-listdata'
 */
        monitoringListdataForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: monitoringListdata.url(options),
            method: 'post',
        })
    
    monitoringListdata.form = monitoringListdataForm

/**
* @see \App\Http\Controllers\pages\Monitoring::periodeOptions
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-periode-options'
 */
export const monitoringPeriodeOptions = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringPeriodeOptions.url(options),
    method: 'post',
})

monitoringPeriodeOptions.definition = {
    methods: ["post"],
    url: '/monitoring-periode-options',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Monitoring::periodeOptions
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-periode-options'
 */
monitoringPeriodeOptions.url = (options?: RouteQueryOptions) => {
    return monitoringPeriodeOptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Monitoring::periodeOptions
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-periode-options'
 */
monitoringPeriodeOptions.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringPeriodeOptions.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\Monitoring::satuanIndukOptions
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-satuan-induk-options'
 */
export const monitoringSatuanIndukOptions = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringSatuanIndukOptions.url(options),
    method: 'post',
})

monitoringSatuanIndukOptions.definition = {
    methods: ["post"],
    url: '/monitoring-satuan-induk-options',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Monitoring::satuanIndukOptions
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-satuan-induk-options'
 */
monitoringSatuanIndukOptions.url = (options?: RouteQueryOptions) => {
    return monitoringSatuanIndukOptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Monitoring::satuanIndukOptions
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-satuan-induk-options'
 */
monitoringSatuanIndukOptions.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringSatuanIndukOptions.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\Monitoring::satuanBawahOptions
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-satuan-bawah-options'
 */
export const monitoringSatuanBawahOptions = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringSatuanBawahOptions.url(options),
    method: 'post',
})

monitoringSatuanBawahOptions.definition = {
    methods: ["post"],
    url: '/monitoring-satuan-bawah-options',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Monitoring::satuanBawahOptions
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-satuan-bawah-options'
 */
monitoringSatuanBawahOptions.url = (options?: RouteQueryOptions) => {
    return monitoringSatuanBawahOptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Monitoring::satuanBawahOptions
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-satuan-bawah-options'
 */
monitoringSatuanBawahOptions.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringSatuanBawahOptions.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\Monitoring::summary
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-summary'
 */
export const monitoringSummary = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringSummary.url(options),
    method: 'post',
})

monitoringSummary.definition = {
    methods: ["post"],
    url: '/monitoring-summary',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Monitoring::summary
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-summary'
 */
monitoringSummary.url = (options?: RouteQueryOptions) => {
    return monitoringSummary.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Monitoring::summary
 * @see app/Http/Controllers/pages/Monitoring.php
 * @route '/monitoring-summary'
 */
monitoringSummary.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringSummary.url(options),
    method: 'post',
})
/**
* @see \App\Http\Controllers\pages\Monitoring::monitoringDetail
 * @see app/Http/Controllers/pages/Monitoring.php:94
 * @route '/monitoring-detail'
 */
export const monitoringDetail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringDetail.url(options),
    method: 'post',
})

monitoringDetail.definition = {
    methods: ["post"],
    url: '/monitoring-detail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\Monitoring::monitoringDetail
 * @see app/Http/Controllers/pages/Monitoring.php:94
 * @route '/monitoring-detail'
 */
monitoringDetail.url = (options?: RouteQueryOptions) => {
    return monitoringDetail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\Monitoring::monitoringDetail
 * @see app/Http/Controllers/pages/Monitoring.php:94
 * @route '/monitoring-detail'
 */
monitoringDetail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringDetail.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\Monitoring::monitoringDetail
 * @see app/Http/Controllers/pages/Monitoring.php:94
 * @route '/monitoring-detail'
 */
    const monitoringDetailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: monitoringDetail.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\Monitoring::monitoringDetail
 * @see app/Http/Controllers/pages/Monitoring.php:94
 * @route '/monitoring-detail'
 */
        monitoringDetailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: monitoringDetail.url(options),
            method: 'post',
        })
    
    monitoringDetail.form = monitoringDetailForm

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::index
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:22
 * @route '/monitoring-alokasi'
 */
export const monitoringAlokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoringAlokasi.url(options),
    method: 'get',
})

monitoringAlokasi.definition = {
    methods: ["get","head"],
    url: '/monitoring-alokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::index
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:22
 * @route '/monitoring-alokasi'
 */
monitoringAlokasi.url = (options?: RouteQueryOptions) => {
    return monitoringAlokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::index
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:22
 * @route '/monitoring-alokasi'
 */
monitoringAlokasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monitoringAlokasi.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::index
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:22
 * @route '/monitoring-alokasi'
 */
monitoringAlokasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monitoringAlokasi.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::periodeOptions
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:36
 * @route '/monitoring-alokasi-periode-options'
 */
export const monitoringAlokasiPeriodeOptions = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiPeriodeOptions.url(options),
    method: 'post',
})

monitoringAlokasiPeriodeOptions.definition = {
    methods: ["post"],
    url: '/monitoring-alokasi-periode-options',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::periodeOptions
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:36
 * @route '/monitoring-alokasi-periode-options'
 */
monitoringAlokasiPeriodeOptions.url = (options?: RouteQueryOptions) => {
    return monitoringAlokasiPeriodeOptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::periodeOptions
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:36
 * @route '/monitoring-alokasi-periode-options'
 */
monitoringAlokasiPeriodeOptions.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiPeriodeOptions.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::satuanIndukOptions
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php
 * @route '/monitoring-alokasi-satuan-induk-options'
 */
export const monitoringAlokasiSatuanIndukOptions = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiSatuanIndukOptions.url(options),
    method: 'post',
})

monitoringAlokasiSatuanIndukOptions.definition = {
    methods: ["post"],
    url: '/monitoring-alokasi-satuan-induk-options',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::satuanIndukOptions
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php
 * @route '/monitoring-alokasi-satuan-induk-options'
 */
monitoringAlokasiSatuanIndukOptions.url = (options?: RouteQueryOptions) => {
    return monitoringAlokasiSatuanIndukOptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::satuanIndukOptions
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php
 * @route '/monitoring-alokasi-satuan-induk-options'
 */
monitoringAlokasiSatuanIndukOptions.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiSatuanIndukOptions.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::satuanBawahOptions
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php
 * @route '/monitoring-alokasi-satuan-bawah-options'
 */
export const monitoringAlokasiSatuanBawahOptions = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiSatuanBawahOptions.url(options),
    method: 'post',
})

monitoringAlokasiSatuanBawahOptions.definition = {
    methods: ["post"],
    url: '/monitoring-alokasi-satuan-bawah-options',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::satuanBawahOptions
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php
 * @route '/monitoring-alokasi-satuan-bawah-options'
 */
monitoringAlokasiSatuanBawahOptions.url = (options?: RouteQueryOptions) => {
    return monitoringAlokasiSatuanBawahOptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::satuanBawahOptions
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php
 * @route '/monitoring-alokasi-satuan-bawah-options'
 */
monitoringAlokasiSatuanBawahOptions.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiSatuanBawahOptions.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::summary
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:72
 * @route '/monitoring-alokasi-summary'
 */
export const monitoringAlokasiSummary = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiSummary.url(options),
    method: 'post',
})

monitoringAlokasiSummary.definition = {
    methods: ["post"],
    url: '/monitoring-alokasi-summary',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::summary
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:72
 * @route '/monitoring-alokasi-summary'
 */
monitoringAlokasiSummary.url = (options?: RouteQueryOptions) => {
    return monitoringAlokasiSummary.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::summary
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:72
 * @route '/monitoring-alokasi-summary'
 */
monitoringAlokasiSummary.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiSummary.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::listNan
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:165
 * @route '/monitoring-alokasi-listnan'
 */
export const monitoringAlokasiListnan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiListnan.url(options),
    method: 'post',
})

monitoringAlokasiListnan.definition = {
    methods: ["post"],
    url: '/monitoring-alokasi-listnan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::listNan
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:165
 * @route '/monitoring-alokasi-listnan'
 */
monitoringAlokasiListnan.url = (options?: RouteQueryOptions) => {
    return monitoringAlokasiListnan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::listNan
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:165
 * @route '/monitoring-alokasi-listnan'
 */
monitoringAlokasiListnan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiListnan.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::detail
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:235
 * @route '/monitoring-alokasi-detail'
 */
export const monitoringAlokasiDetail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiDetail.url(options),
    method: 'post',
})

monitoringAlokasiDetail.definition = {
    methods: ["post"],
    url: '/monitoring-alokasi-detail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::detail
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:235
 * @route '/monitoring-alokasi-detail'
 */
monitoringAlokasiDetail.url = (options?: RouteQueryOptions) => {
    return monitoringAlokasiDetail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\MonitoringAlokasi::detail
 * @see app/Http/Controllers/pages/MonitoringAlokasi.php:235
 * @route '/monitoring-alokasi-detail'
 */
monitoringAlokasiDetail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: monitoringAlokasiDetail.url(options),
    method: 'post',
})
/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedPengiriman
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
export const receivedPengiriman = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receivedPengiriman.url(options),
    method: 'get',
})

receivedPengiriman.definition = {
    methods: ["get","head"],
    url: '/received-pengiriman',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedPengiriman
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
receivedPengiriman.url = (options?: RouteQueryOptions) => {
    return receivedPengiriman.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedPengiriman
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
receivedPengiriman.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receivedPengiriman.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedPengiriman
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
receivedPengiriman.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: receivedPengiriman.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedPengiriman
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
    const receivedPengirimanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: receivedPengiriman.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedPengiriman
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
        receivedPengirimanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receivedPengiriman.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedPengiriman
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:22
 * @route '/received-pengiriman'
 */
        receivedPengirimanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receivedPengiriman.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    receivedPengiriman.form = receivedPengirimanForm
/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedInfobox
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:29
 * @route '/received-infobox'
 */
export const receivedInfobox = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receivedInfobox.url(options),
    method: 'post',
})

receivedInfobox.definition = {
    methods: ["post"],
    url: '/received-infobox',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedInfobox
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:29
 * @route '/received-infobox'
 */
receivedInfobox.url = (options?: RouteQueryOptions) => {
    return receivedInfobox.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedInfobox
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:29
 * @route '/received-infobox'
 */
receivedInfobox.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receivedInfobox.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedInfobox
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:29
 * @route '/received-infobox'
 */
    const receivedInfoboxForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: receivedInfobox.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedInfobox
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:29
 * @route '/received-infobox'
 */
        receivedInfoboxForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: receivedInfobox.url(options),
            method: 'post',
        })
    
    receivedInfobox.form = receivedInfoboxForm
/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedTransit
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:227
 * @route '/received-transit'
 */
export const receivedTransit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receivedTransit.url(options),
    method: 'post',
})

receivedTransit.definition = {
    methods: ["post"],
    url: '/received-transit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedTransit
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:227
 * @route '/received-transit'
 */
receivedTransit.url = (options?: RouteQueryOptions) => {
    return receivedTransit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedTransit
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:227
 * @route '/received-transit'
 */
receivedTransit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receivedTransit.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedTransit
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:227
 * @route '/received-transit'
 */
    const receivedTransitForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: receivedTransit.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\ReceivedPengiriman::receivedTransit
 * @see app/Http/Controllers/pages/ReceivedPengiriman.php:227
 * @route '/received-transit'
 */
        receivedTransitForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: receivedTransit.url(options),
            method: 'post',
        })
    
    receivedTransit.form = receivedTransitForm
/**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonPengiriman
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
export const rekonPengiriman = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rekonPengiriman.url(options),
    method: 'get',
})

rekonPengiriman.definition = {
    methods: ["get","head"],
    url: '/rekon-pengiriman',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonPengiriman
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
rekonPengiriman.url = (options?: RouteQueryOptions) => {
    return rekonPengiriman.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonPengiriman
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
rekonPengiriman.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rekonPengiriman.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonPengiriman
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
rekonPengiriman.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rekonPengiriman.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonPengiriman
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
    const rekonPengirimanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rekonPengiriman.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonPengiriman
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
        rekonPengirimanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rekonPengiriman.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonPengiriman
 * @see app/Http/Controllers/pages/RekonPengiriman.php:22
 * @route '/rekon-pengiriman'
 */
        rekonPengirimanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rekonPengiriman.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    rekonPengiriman.form = rekonPengirimanForm
/**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonItems
 * @see app/Http/Controllers/pages/RekonPengiriman.php:65
 * @route '/rekon-items'
 */
export const rekonItems = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rekonItems.url(options),
    method: 'post',
})

rekonItems.definition = {
    methods: ["post"],
    url: '/rekon-items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonItems
 * @see app/Http/Controllers/pages/RekonPengiriman.php:65
 * @route '/rekon-items'
 */
rekonItems.url = (options?: RouteQueryOptions) => {
    return rekonItems.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonItems
 * @see app/Http/Controllers/pages/RekonPengiriman.php:65
 * @route '/rekon-items'
 */
rekonItems.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rekonItems.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonItems
 * @see app/Http/Controllers/pages/RekonPengiriman.php:65
 * @route '/rekon-items'
 */
    const rekonItemsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rekonItems.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonItems
 * @see app/Http/Controllers/pages/RekonPengiriman.php:65
 * @route '/rekon-items'
 */
        rekonItemsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rekonItems.url(options),
            method: 'post',
        })
    
    rekonItems.form = rekonItemsForm
/**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonConfirmReceived
 * @see app/Http/Controllers/pages/RekonPengiriman.php:152
 * @route '/rekon-confirm-received'
 */
export const rekonConfirmReceived = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rekonConfirmReceived.url(options),
    method: 'post',
})

rekonConfirmReceived.definition = {
    methods: ["post"],
    url: '/rekon-confirm-received',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonConfirmReceived
 * @see app/Http/Controllers/pages/RekonPengiriman.php:152
 * @route '/rekon-confirm-received'
 */
rekonConfirmReceived.url = (options?: RouteQueryOptions) => {
    return rekonConfirmReceived.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonConfirmReceived
 * @see app/Http/Controllers/pages/RekonPengiriman.php:152
 * @route '/rekon-confirm-received'
 */
rekonConfirmReceived.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rekonConfirmReceived.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonConfirmReceived
 * @see app/Http/Controllers/pages/RekonPengiriman.php:152
 * @route '/rekon-confirm-received'
 */
    const rekonConfirmReceivedForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rekonConfirmReceived.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RekonPengiriman::rekonConfirmReceived
 * @see app/Http/Controllers/pages/RekonPengiriman.php:152
 * @route '/rekon-confirm-received'
 */
        rekonConfirmReceivedForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rekonConfirmReceived.url(options),
            method: 'post',
        })
    
    rekonConfirmReceived.form = rekonConfirmReceivedForm
/**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
export const dataPenerimaan = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPenerimaan.url(options),
    method: 'get',
})

dataPenerimaan.definition = {
    methods: ["get","head"],
    url: '/data-penerimaan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
dataPenerimaan.url = (options?: RouteQueryOptions) => {
    return dataPenerimaan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
dataPenerimaan.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPenerimaan.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
dataPenerimaan.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataPenerimaan.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
    const dataPenerimaanForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataPenerimaan.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
        dataPenerimaanForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPenerimaan.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaan
 * @see app/Http/Controllers/pages/DataPenerimaan.php:22
 * @route '/data-penerimaan'
 */
        dataPenerimaanForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPenerimaan.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataPenerimaan.form = dataPenerimaanForm
/**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaanListdata
 * @see app/Http/Controllers/pages/DataPenerimaan.php:32
 * @route '/data-penerimaan-listdata'
 */
export const dataPenerimaanListdata = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPenerimaanListdata.url(options),
    method: 'post',
})

dataPenerimaanListdata.definition = {
    methods: ["post"],
    url: '/data-penerimaan-listdata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaanListdata
 * @see app/Http/Controllers/pages/DataPenerimaan.php:32
 * @route '/data-penerimaan-listdata'
 */
dataPenerimaanListdata.url = (options?: RouteQueryOptions) => {
    return dataPenerimaanListdata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaanListdata
 * @see app/Http/Controllers/pages/DataPenerimaan.php:32
 * @route '/data-penerimaan-listdata'
 */
dataPenerimaanListdata.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPenerimaanListdata.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaanListdata
 * @see app/Http/Controllers/pages/DataPenerimaan.php:32
 * @route '/data-penerimaan-listdata'
 */
    const dataPenerimaanListdataForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataPenerimaanListdata.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaanListdata
 * @see app/Http/Controllers/pages/DataPenerimaan.php:32
 * @route '/data-penerimaan-listdata'
 */
        dataPenerimaanListdataForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataPenerimaanListdata.url(options),
            method: 'post',
        })
    
    dataPenerimaanListdata.form = dataPenerimaanListdataForm
/**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaanDetail
 * @see app/Http/Controllers/pages/DataPenerimaan.php:207
 * @route '/data-penerimaan-detail'
 */
export const dataPenerimaanDetail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPenerimaanDetail.url(options),
    method: 'post',
})

dataPenerimaanDetail.definition = {
    methods: ["post"],
    url: '/data-penerimaan-detail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaanDetail
 * @see app/Http/Controllers/pages/DataPenerimaan.php:207
 * @route '/data-penerimaan-detail'
 */
dataPenerimaanDetail.url = (options?: RouteQueryOptions) => {
    return dataPenerimaanDetail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaanDetail
 * @see app/Http/Controllers/pages/DataPenerimaan.php:207
 * @route '/data-penerimaan-detail'
 */
dataPenerimaanDetail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPenerimaanDetail.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaanDetail
 * @see app/Http/Controllers/pages/DataPenerimaan.php:207
 * @route '/data-penerimaan-detail'
 */
    const dataPenerimaanDetailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataPenerimaanDetail.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPenerimaan::dataPenerimaanDetail
 * @see app/Http/Controllers/pages/DataPenerimaan.php:207
 * @route '/data-penerimaan-detail'
 */
        dataPenerimaanDetailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataPenerimaanDetail.url(options),
            method: 'post',
        })
    
    dataPenerimaanDetail.form = dataPenerimaanDetailForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifest
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
export const penyaluranManifest = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: penyaluranManifest.url(options),
    method: 'get',
})

penyaluranManifest.definition = {
    methods: ["get","head"],
    url: '/penyaluran-manifest',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifest
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
penyaluranManifest.url = (options?: RouteQueryOptions) => {
    return penyaluranManifest.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifest
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
penyaluranManifest.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: penyaluranManifest.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifest
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
penyaluranManifest.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: penyaluranManifest.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifest
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
    const penyaluranManifestForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: penyaluranManifest.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifest
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
        penyaluranManifestForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: penyaluranManifest.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifest
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:27
 * @route '/penyaluran-manifest'
 */
        penyaluranManifestForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: penyaluranManifest.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    penyaluranManifest.form = penyaluranManifestForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
export const penyaluranManifestData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: penyaluranManifestData.url(options),
    method: 'get',
})

penyaluranManifestData.definition = {
    methods: ["get","head"],
    url: '/penyaluran-manifest-data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
penyaluranManifestData.url = (options?: RouteQueryOptions) => {
    return penyaluranManifestData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
penyaluranManifestData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: penyaluranManifestData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
penyaluranManifestData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: penyaluranManifestData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
    const penyaluranManifestDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: penyaluranManifestData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
        penyaluranManifestDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: penyaluranManifestData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestData
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-data'
 */
        penyaluranManifestDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: penyaluranManifestData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    penyaluranManifestData.form = penyaluranManifestDataForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestNrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
export const penyaluranManifestNrpOptions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: penyaluranManifestNrpOptions.url(options),
    method: 'get',
})

penyaluranManifestNrpOptions.definition = {
    methods: ["get","head"],
    url: '/penyaluran-manifest-nrp-options',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestNrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
penyaluranManifestNrpOptions.url = (options?: RouteQueryOptions) => {
    return penyaluranManifestNrpOptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestNrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
penyaluranManifestNrpOptions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: penyaluranManifestNrpOptions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestNrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
penyaluranManifestNrpOptions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: penyaluranManifestNrpOptions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestNrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
    const penyaluranManifestNrpOptionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: penyaluranManifestNrpOptions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestNrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
        penyaluranManifestNrpOptionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: penyaluranManifestNrpOptions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestNrpOptions
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:0
 * @route '/penyaluran-manifest-nrp-options'
 */
        penyaluranManifestNrpOptionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: penyaluranManifestNrpOptions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    penyaluranManifestNrpOptions.form = penyaluranManifestNrpOptionsForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestScanValidate
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:193
 * @route '/penyaluran-manifest-scan-validate'
 */
export const penyaluranManifestScanValidate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyaluranManifestScanValidate.url(options),
    method: 'post',
})

penyaluranManifestScanValidate.definition = {
    methods: ["post"],
    url: '/penyaluran-manifest-scan-validate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestScanValidate
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:193
 * @route '/penyaluran-manifest-scan-validate'
 */
penyaluranManifestScanValidate.url = (options?: RouteQueryOptions) => {
    return penyaluranManifestScanValidate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestScanValidate
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:193
 * @route '/penyaluran-manifest-scan-validate'
 */
penyaluranManifestScanValidate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyaluranManifestScanValidate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestScanValidate
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:193
 * @route '/penyaluran-manifest-scan-validate'
 */
    const penyaluranManifestScanValidateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: penyaluranManifestScanValidate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestScanValidate
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:193
 * @route '/penyaluran-manifest-scan-validate'
 */
        penyaluranManifestScanValidateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: penyaluranManifestScanValidate.url(options),
            method: 'post',
        })
    
    penyaluranManifestScanValidate.form = penyaluranManifestScanValidateForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestConfirmDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:295
 * @route '/penyaluran-manifest-confirm-delivery'
 */
export const penyaluranManifestConfirmDelivery = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyaluranManifestConfirmDelivery.url(options),
    method: 'post',
})

penyaluranManifestConfirmDelivery.definition = {
    methods: ["post"],
    url: '/penyaluran-manifest-confirm-delivery',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestConfirmDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:295
 * @route '/penyaluran-manifest-confirm-delivery'
 */
penyaluranManifestConfirmDelivery.url = (options?: RouteQueryOptions) => {
    return penyaluranManifestConfirmDelivery.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestConfirmDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:295
 * @route '/penyaluran-manifest-confirm-delivery'
 */
penyaluranManifestConfirmDelivery.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyaluranManifestConfirmDelivery.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestConfirmDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:295
 * @route '/penyaluran-manifest-confirm-delivery'
 */
    const penyaluranManifestConfirmDeliveryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: penyaluranManifestConfirmDelivery.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestConfirmDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:295
 * @route '/penyaluran-manifest-confirm-delivery'
 */
        penyaluranManifestConfirmDeliveryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: penyaluranManifestConfirmDelivery.url(options),
            method: 'post',
        })
    
    penyaluranManifestConfirmDelivery.form = penyaluranManifestConfirmDeliveryForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestCancelDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:500
 * @route '/penyaluran-manifest-cancel-delivery'
 */
export const penyaluranManifestCancelDelivery = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyaluranManifestCancelDelivery.url(options),
    method: 'post',
})

penyaluranManifestCancelDelivery.definition = {
    methods: ["post"],
    url: '/penyaluran-manifest-cancel-delivery',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestCancelDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:500
 * @route '/penyaluran-manifest-cancel-delivery'
 */
penyaluranManifestCancelDelivery.url = (options?: RouteQueryOptions) => {
    return penyaluranManifestCancelDelivery.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestCancelDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:500
 * @route '/penyaluran-manifest-cancel-delivery'
 */
penyaluranManifestCancelDelivery.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyaluranManifestCancelDelivery.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestCancelDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:500
 * @route '/penyaluran-manifest-cancel-delivery'
 */
    const penyaluranManifestCancelDeliveryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: penyaluranManifestCancelDelivery.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestCancelDelivery
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:500
 * @route '/penyaluran-manifest-cancel-delivery'
 */
        penyaluranManifestCancelDeliveryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: penyaluranManifestCancelDelivery.url(options),
            method: 'post',
        })
    
    penyaluranManifestCancelDelivery.form = penyaluranManifestCancelDeliveryForm
/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestOpenBox
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:430
 * @route '/penyaluran-manifest-open-box'
 */
export const penyaluranManifestOpenBox = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyaluranManifestOpenBox.url(options),
    method: 'post',
})

penyaluranManifestOpenBox.definition = {
    methods: ["post"],
    url: '/penyaluran-manifest-open-box',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestOpenBox
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:430
 * @route '/penyaluran-manifest-open-box'
 */
penyaluranManifestOpenBox.url = (options?: RouteQueryOptions) => {
    return penyaluranManifestOpenBox.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestOpenBox
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:430
 * @route '/penyaluran-manifest-open-box'
 */
penyaluranManifestOpenBox.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: penyaluranManifestOpenBox.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestOpenBox
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:430
 * @route '/penyaluran-manifest-open-box'
 */
    const penyaluranManifestOpenBoxForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: penyaluranManifestOpenBox.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\PenyaluranManifest::penyaluranManifestOpenBox
 * @see app/Http/Controllers/pages/PenyaluranManifest.php:430
 * @route '/penyaluran-manifest-open-box'
 */
        penyaluranManifestOpenBoxForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: penyaluranManifestOpenBox.url(options),
            method: 'post',
        })
    
    penyaluranManifestOpenBox.form = penyaluranManifestOpenBoxForm
/**
* @see \App\Http\Controllers\pages\DataPoD::dataPod
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
export const dataPod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPod.url(options),
    method: 'get',
})

dataPod.definition = {
    methods: ["get","head"],
    url: '/data-pod',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPoD::dataPod
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
dataPod.url = (options?: RouteQueryOptions) => {
    return dataPod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPoD::dataPod
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
dataPod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPoD::dataPod
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
dataPod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataPod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPoD::dataPod
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
    const dataPodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataPod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPoD::dataPod
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
        dataPodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPoD::dataPod
 * @see app/Http/Controllers/pages/DataPoD.php:24
 * @route '/data-pod'
 */
        dataPodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataPod.form = dataPodForm
/**
* @see \App\Http\Controllers\pages\DataPoD::dataPodListdata
 * @see app/Http/Controllers/pages/DataPoD.php:32
 * @route '/data-pod-listdata'
 */
export const dataPodListdata = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPodListdata.url(options),
    method: 'post',
})

dataPodListdata.definition = {
    methods: ["post"],
    url: '/data-pod-listdata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPoD::dataPodListdata
 * @see app/Http/Controllers/pages/DataPoD.php:32
 * @route '/data-pod-listdata'
 */
dataPodListdata.url = (options?: RouteQueryOptions) => {
    return dataPodListdata.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPoD::dataPodListdata
 * @see app/Http/Controllers/pages/DataPoD.php:32
 * @route '/data-pod-listdata'
 */
dataPodListdata.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPodListdata.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPoD::dataPodListdata
 * @see app/Http/Controllers/pages/DataPoD.php:32
 * @route '/data-pod-listdata'
 */
    const dataPodListdataForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataPodListdata.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPoD::dataPodListdata
 * @see app/Http/Controllers/pages/DataPoD.php:32
 * @route '/data-pod-listdata'
 */
        dataPodListdataForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataPodListdata.url(options),
            method: 'post',
        })
    
    dataPodListdata.form = dataPodListdataForm
/**
* @see \App\Http\Controllers\pages\DataPoD::dataPodDelete
 * @see app/Http/Controllers/pages/DataPoD.php:192
 * @route '/data-pod-delete'
 */
export const dataPodDelete = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPodDelete.url(options),
    method: 'post',
})

dataPodDelete.definition = {
    methods: ["post"],
    url: '/data-pod-delete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\DataPoD::dataPodDelete
 * @see app/Http/Controllers/pages/DataPoD.php:192
 * @route '/data-pod-delete'
 */
dataPodDelete.url = (options?: RouteQueryOptions) => {
    return dataPodDelete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPoD::dataPodDelete
 * @see app/Http/Controllers/pages/DataPoD.php:192
 * @route '/data-pod-delete'
 */
dataPodDelete.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dataPodDelete.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\DataPoD::dataPodDelete
 * @see app/Http/Controllers/pages/DataPoD.php:192
 * @route '/data-pod-delete'
 */
    const dataPodDeleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dataPodDelete.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\DataPoD::dataPodDelete
 * @see app/Http/Controllers/pages/DataPoD.php:192
 * @route '/data-pod-delete'
 */
        dataPodDeleteForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dataPodDelete.url(options),
            method: 'post',
        })
    
    dataPodDelete.form = dataPodDeleteForm
/**
* @see \App\Http\Controllers\pages\DataPoD::dataPodFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
export const dataPodFile = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPodFile.url(args, options),
    method: 'get',
})

dataPodFile.definition = {
    methods: ["get","head"],
    url: '/data-pod-file/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\DataPoD::dataPodFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
dataPodFile.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return dataPodFile.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\DataPoD::dataPodFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
dataPodFile.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataPodFile.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\DataPoD::dataPodFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
dataPodFile.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataPodFile.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\DataPoD::dataPodFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
    const dataPodFileForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataPodFile.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\DataPoD::dataPodFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
        dataPodFileForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPodFile.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\DataPoD::dataPodFile
 * @see app/Http/Controllers/pages/DataPoD.php:264
 * @route '/data-pod-file/{id}'
 */
        dataPodFileForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataPodFile.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataPodFile.form = dataPodFileForm
/**
* @see \App\Http\Controllers\pages\TestReader::testReader
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
export const testReader = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: testReader.url(options),
    method: 'get',
})

testReader.definition = {
    methods: ["get","head"],
    url: '/test-reader',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\TestReader::testReader
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
testReader.url = (options?: RouteQueryOptions) => {
    return testReader.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\TestReader::testReader
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
testReader.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: testReader.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\TestReader::testReader
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
testReader.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: testReader.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\TestReader::testReader
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
    const testReaderForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: testReader.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\TestReader::testReader
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
        testReaderForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: testReader.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\TestReader::testReader
 * @see app/Http/Controllers/pages/TestReader.php:14
 * @route '/test-reader'
 */
        testReaderForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: testReader.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    testReader.form = testReaderForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
export const opsiJenis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: opsiJenis.url(options),
    method: 'get',
})

opsiJenis.definition = {
    methods: ["get","head"],
    url: '/opsi-jenis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
opsiJenis.url = (options?: RouteQueryOptions) => {
    return opsiJenis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
opsiJenis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: opsiJenis.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
opsiJenis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: opsiJenis.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
    const opsiJenisForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: opsiJenis.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
        opsiJenisForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: opsiJenis.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiJenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:21
 * @route '/opsi-jenis'
 */
        opsiJenisForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: opsiJenis.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    opsiJenis.form = opsiJenisForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddjenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:36
 * @route '/opsi-jenis'
 */
export const opsiAddjenis = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddjenis.url(options),
    method: 'post',
})

opsiAddjenis.definition = {
    methods: ["post"],
    url: '/opsi-jenis',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddjenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:36
 * @route '/opsi-jenis'
 */
opsiAddjenis.url = (options?: RouteQueryOptions) => {
    return opsiAddjenis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddjenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:36
 * @route '/opsi-jenis'
 */
opsiAddjenis.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddjenis.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddjenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:36
 * @route '/opsi-jenis'
 */
    const opsiAddjenisForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: opsiAddjenis.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddjenis
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:36
 * @route '/opsi-jenis'
 */
        opsiAddjenisForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: opsiAddjenis.url(options),
            method: 'post',
        })
    
    opsiAddjenis.form = opsiAddjenisForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddjenisRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:67
 * @route '/opsi-jenis-remove'
 */
export const opsiAddjenisRemove = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddjenisRemove.url(options),
    method: 'post',
})

opsiAddjenisRemove.definition = {
    methods: ["post"],
    url: '/opsi-jenis-remove',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddjenisRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:67
 * @route '/opsi-jenis-remove'
 */
opsiAddjenisRemove.url = (options?: RouteQueryOptions) => {
    return opsiAddjenisRemove.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddjenisRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:67
 * @route '/opsi-jenis-remove'
 */
opsiAddjenisRemove.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddjenisRemove.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddjenisRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:67
 * @route '/opsi-jenis-remove'
 */
    const opsiAddjenisRemoveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: opsiAddjenisRemove.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddjenisRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:67
 * @route '/opsi-jenis-remove'
 */
        opsiAddjenisRemoveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: opsiAddjenisRemove.url(options),
            method: 'post',
        })
    
    opsiAddjenisRemove.form = opsiAddjenisRemoveForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
export const opsiUkuran = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: opsiUkuran.url(options),
    method: 'get',
})

opsiUkuran.definition = {
    methods: ["get","head"],
    url: '/opsi-ukuran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
opsiUkuran.url = (options?: RouteQueryOptions) => {
    return opsiUkuran.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
opsiUkuran.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: opsiUkuran.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
opsiUkuran.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: opsiUkuran.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
    const opsiUkuranForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: opsiUkuran.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
        opsiUkuranForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: opsiUkuran.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiUkuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:196
 * @route '/opsi-ukuran'
 */
        opsiUkuranForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: opsiUkuran.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    opsiUkuran.form = opsiUkuranForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddukuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:211
 * @route '/opsi-ukuran'
 */
export const opsiAddukuran = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddukuran.url(options),
    method: 'post',
})

opsiAddukuran.definition = {
    methods: ["post"],
    url: '/opsi-ukuran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddukuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:211
 * @route '/opsi-ukuran'
 */
opsiAddukuran.url = (options?: RouteQueryOptions) => {
    return opsiAddukuran.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddukuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:211
 * @route '/opsi-ukuran'
 */
opsiAddukuran.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddukuran.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddukuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:211
 * @route '/opsi-ukuran'
 */
    const opsiAddukuranForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: opsiAddukuran.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddukuran
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:211
 * @route '/opsi-ukuran'
 */
        opsiAddukuranForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: opsiAddukuran.url(options),
            method: 'post',
        })
    
    opsiAddukuran.form = opsiAddukuranForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddukuranRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:242
 * @route '/opsi-ukuran-remove'
 */
export const opsiAddukuranRemove = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddukuranRemove.url(options),
    method: 'post',
})

opsiAddukuranRemove.definition = {
    methods: ["post"],
    url: '/opsi-ukuran-remove',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddukuranRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:242
 * @route '/opsi-ukuran-remove'
 */
opsiAddukuranRemove.url = (options?: RouteQueryOptions) => {
    return opsiAddukuranRemove.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddukuranRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:242
 * @route '/opsi-ukuran-remove'
 */
opsiAddukuranRemove.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddukuranRemove.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddukuranRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:242
 * @route '/opsi-ukuran-remove'
 */
    const opsiAddukuranRemoveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: opsiAddukuranRemove.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddukuranRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:242
 * @route '/opsi-ukuran-remove'
 */
        opsiAddukuranRemoveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: opsiAddukuranRemove.url(options),
            method: 'post',
        })
    
    opsiAddukuranRemove.form = opsiAddukuranRemoveForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
export const opsiKategori = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: opsiKategori.url(options),
    method: 'get',
})

opsiKategori.definition = {
    methods: ["get","head"],
    url: '/opsi-kategori',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
opsiKategori.url = (options?: RouteQueryOptions) => {
    return opsiKategori.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
opsiKategori.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: opsiKategori.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
opsiKategori.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: opsiKategori.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
    const opsiKategoriForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: opsiKategori.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
        opsiKategoriForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: opsiKategori.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiKategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:108
 * @route '/opsi-kategori'
 */
        opsiKategoriForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: opsiKategori.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    opsiKategori.form = opsiKategoriForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddkategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:123
 * @route '/opsi-kategori'
 */
export const opsiAddkategori = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddkategori.url(options),
    method: 'post',
})

opsiAddkategori.definition = {
    methods: ["post"],
    url: '/opsi-kategori',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddkategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:123
 * @route '/opsi-kategori'
 */
opsiAddkategori.url = (options?: RouteQueryOptions) => {
    return opsiAddkategori.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddkategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:123
 * @route '/opsi-kategori'
 */
opsiAddkategori.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddkategori.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddkategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:123
 * @route '/opsi-kategori'
 */
    const opsiAddkategoriForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: opsiAddkategori.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddkategori
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:123
 * @route '/opsi-kategori'
 */
        opsiAddkategoriForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: opsiAddkategori.url(options),
            method: 'post',
        })
    
    opsiAddkategori.form = opsiAddkategoriForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddkategoriRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:154
 * @route '/opsi-kategori-remove'
 */
export const opsiAddkategoriRemove = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddkategoriRemove.url(options),
    method: 'post',
})

opsiAddkategoriRemove.definition = {
    methods: ["post"],
    url: '/opsi-kategori-remove',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddkategoriRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:154
 * @route '/opsi-kategori-remove'
 */
opsiAddkategoriRemove.url = (options?: RouteQueryOptions) => {
    return opsiAddkategoriRemove.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddkategoriRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:154
 * @route '/opsi-kategori-remove'
 */
opsiAddkategoriRemove.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAddkategoriRemove.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddkategoriRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:154
 * @route '/opsi-kategori-remove'
 */
    const opsiAddkategoriRemoveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: opsiAddkategoriRemove.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAddkategoriRemove
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:154
 * @route '/opsi-kategori-remove'
 */
        opsiAddkategoriRemoveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: opsiAddkategoriRemove.url(options),
            method: 'post',
        })
    
    opsiAddkategoriRemove.form = opsiAddkategoriRemoveForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
export const opsiAlokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: opsiAlokasi.url(options),
    method: 'get',
})

opsiAlokasi.definition = {
    methods: ["get","head"],
    url: '/opsi-alokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
opsiAlokasi.url = (options?: RouteQueryOptions) => {
    return opsiAlokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
opsiAlokasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: opsiAlokasi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
opsiAlokasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: opsiAlokasi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
    const opsiAlokasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: opsiAlokasi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
        opsiAlokasiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: opsiAlokasi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:285
 * @route '/opsi-alokasi'
 */
        opsiAlokasiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: opsiAlokasi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    opsiAlokasi.form = opsiAlokasiForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiNotalokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
export const opsiNotalokasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: opsiNotalokasi.url(options),
    method: 'get',
})

opsiNotalokasi.definition = {
    methods: ["get","head"],
    url: '/opsi-notalokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiNotalokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
opsiNotalokasi.url = (options?: RouteQueryOptions) => {
    return opsiNotalokasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiNotalokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
opsiNotalokasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: opsiNotalokasi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiNotalokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
opsiNotalokasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: opsiNotalokasi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiNotalokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
    const opsiNotalokasiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: opsiNotalokasi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiNotalokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
        opsiNotalokasiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: opsiNotalokasi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiNotalokasi
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:301
 * @route '/opsi-notalokasi'
 */
        opsiNotalokasiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: opsiNotalokasi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    opsiNotalokasi.form = opsiNotalokasiForm
/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasiDetail
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:320
 * @route '/opsi-alokasi-detail'
 */
export const opsiAlokasiDetail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAlokasiDetail.url(options),
    method: 'post',
})

opsiAlokasiDetail.definition = {
    methods: ["post"],
    url: '/opsi-alokasi-detail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasiDetail
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:320
 * @route '/opsi-alokasi-detail'
 */
opsiAlokasiDetail.url = (options?: RouteQueryOptions) => {
    return opsiAlokasiDetail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasiDetail
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:320
 * @route '/opsi-alokasi-detail'
 */
opsiAlokasiDetail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: opsiAlokasiDetail.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasiDetail
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:320
 * @route '/opsi-alokasi-detail'
 */
    const opsiAlokasiDetailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: opsiAlokasiDetail.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\OpsiKaporlap::opsiAlokasiDetail
 * @see app/Http/Controllers/pages/OpsiKaporlap.php:320
 * @route '/opsi-alokasi-detail'
 */
        opsiAlokasiDetailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: opsiAlokasiDetail.url(options),
            method: 'post',
        })
    
    opsiAlokasiDetail.form = opsiAlokasiDetailForm
/**
 * @see routes/web.php:177
 * @route '/permission'
 */
export const permission = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permission.url(options),
    method: 'get',
})

permission.definition = {
    methods: ["get","head"],
    url: '/permission',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:177
 * @route '/permission'
 */
permission.url = (options?: RouteQueryOptions) => {
    return permission.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:177
 * @route '/permission'
 */
permission.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: permission.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:177
 * @route '/permission'
 */
permission.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: permission.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:177
 * @route '/permission'
 */
    const permissionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: permission.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:177
 * @route '/permission'
 */
        permissionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: permission.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:177
 * @route '/permission'
 */
        permissionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: permission.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    permission.form = permissionForm
