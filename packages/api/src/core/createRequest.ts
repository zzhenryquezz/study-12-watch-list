import type { RawReplyDefaultExpression, RawRequestDefaultExpression, HTTPMethods } from 'fastify'
import { Middleware, MiddlewareResolvedContext } from './defineMiddleware.js'
import { app } from  '../app.js'

interface Context {
    request: RawRequestDefaultExpression
    reply: RawReplyDefaultExpression
}

export function createRequest<C extends Context>(url: string) {
    const middlewares: Middleware[] = []

    function _addMiddleware(middleware: Middleware){
        middlewares.push(middleware)
    }

    function middleware<M extends Middleware>(fn: M){
        const request = createRequest<C & MiddlewareResolvedContext<M>>(url)

        
        middlewares.forEach(fn => request._addMiddleware(fn))
        
        request._addMiddleware(fn)

        return request
    }

    function handler(method: HTTPMethods, fn: (context: C) => Promise<any>){
        return app.route({
            method,
            url,
            handler: async (request, reply) => {
                let context: any = { request, reply }

                for(const middleware of middlewares){
                    context = await middleware(context)
                }

                return fn(context)
            }
        })

    }

    function get(fn: (context: C) => Promise<any>){
        return handler('GET', fn)
    }

    return {
        _addMiddleware,
        middleware,

        get,
        handler
    }
}