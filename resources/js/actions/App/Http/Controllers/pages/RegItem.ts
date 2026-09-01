import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\pages\RegItem::index
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/registrasiitem',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\pages\RegItem::index
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItem::index
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\pages\RegItem::index
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\pages\RegItem::index
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\pages\RegItem::index
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\pages\RegItem::index
 * @see app/Http/Controllers/pages/RegItem.php:20
 * @route '/registrasiitem'
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
* @see \App\Http\Controllers\pages\RegItem::listDataInventory
 * @see app/Http/Controllers/pages/RegItem.php:62
 * @route '/registrasiitem-listdata'
 */
export const listDataInventory = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listDataInventory.url(options),
    method: 'post',
})

listDataInventory.definition = {
    methods: ["post"],
    url: '/registrasiitem-listdata',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RegItem::listDataInventory
 * @see app/Http/Controllers/pages/RegItem.php:62
 * @route '/registrasiitem-listdata'
 */
listDataInventory.url = (options?: RouteQueryOptions) => {
    return listDataInventory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItem::listDataInventory
 * @see app/Http/Controllers/pages/RegItem.php:62
 * @route '/registrasiitem-listdata'
 */
listDataInventory.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: listDataInventory.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RegItem::listDataInventory
 * @see app/Http/Controllers/pages/RegItem.php:62
 * @route '/registrasiitem-listdata'
 */
    const listDataInventoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: listDataInventory.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RegItem::listDataInventory
 * @see app/Http/Controllers/pages/RegItem.php:62
 * @route '/registrasiitem-listdata'
 */
        listDataInventoryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: listDataInventory.url(options),
            method: 'post',
        })
    
    listDataInventory.form = listDataInventoryForm
/**
* @see \App\Http\Controllers\pages\RegItem::delItem
 * @see app/Http/Controllers/pages/RegItem.php:28
 * @route '/registrasiitem-del'
 */
export const delItem = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: delItem.url(options),
    method: 'post',
})

delItem.definition = {
    methods: ["post"],
    url: '/registrasiitem-del',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\pages\RegItem::delItem
 * @see app/Http/Controllers/pages/RegItem.php:28
 * @route '/registrasiitem-del'
 */
delItem.url = (options?: RouteQueryOptions) => {
    return delItem.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\pages\RegItem::delItem
 * @see app/Http/Controllers/pages/RegItem.php:28
 * @route '/registrasiitem-del'
 */
delItem.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: delItem.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\pages\RegItem::delItem
 * @see app/Http/Controllers/pages/RegItem.php:28
 * @route '/registrasiitem-del'
 */
    const delItemForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: delItem.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\pages\RegItem::delItem
 * @see app/Http/Controllers/pages/RegItem.php:28
 * @route '/registrasiitem-del'
 */
        delItemForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: delItem.url(options),
            method: 'post',
        })
    
    delItem.form = delItemForm
const RegItem = { index, listDataInventory, delItem }

export default RegItem