import type { RawReplyDefaultExpression, FastifyRequest } from 'fastify'
import { Middleware, MiddlewareResolvedContext } from './defineMiddleware.js'

export interface Context {
    request: FastifyRequest
    reply: RawReplyDefaultExpression
    params: Record<string, string>
}

export interface RunFunction {
    (url: string, middlewares: Middleware[], fn: (context: any) => Promise<any>): any
}


export function createRequest<T extends RunFunction>(run: T){

    function create<C extends Context>(url: string){

        const middlewares: Middleware[] = []
    
        function _addMiddleware(middleware: Middleware){
            middlewares.push(middleware)
        }
    
        function middleware<M extends Middleware>(fn: M){
            const request = create<C & MiddlewareResolvedContext<M>>(url)
            
            middlewares.forEach(fn => request._addMiddleware(fn))
            
            request._addMiddleware(fn)
    
            return request
        }

        async function internalRun(fn: (context: C) => Promise<any>){
            return run(url, middlewares, fn)
    
        }
    
        return {
            _addMiddleware,
            middleware,
            run: internalRun
        }
    }

    return (url: string) => create(url)
}