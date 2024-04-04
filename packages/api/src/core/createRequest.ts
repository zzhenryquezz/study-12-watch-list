import type { RawReplyDefaultExpression, FastifyRequest } from 'fastify'
import { Middleware, MiddlewareResolvedContext } from './defineMiddleware.js'

export interface Context {
    request: FastifyRequest
    reply: RawReplyDefaultExpression
    params: Record<string, string>
}

export interface RunFunctionParams {
    url: string
    middlewares: Middleware[]
    fn: (context: any) => Promise<any>
    schema: any
}

export interface RunFunction {
    (args: RunFunctionParams): Promise<any> | any
}

export function createRequest<T extends RunFunction>(run: T){
    function create<C extends Context>(url: string){

        const middlewares: Middleware[] = []
        let _schema: any = {}
    
        function _addMiddleware(middleware: Middleware){
            middlewares.push(middleware)
        }

        function _setSchema(newSchema: any){
            _schema = newSchema
        }
    
        function middleware<M extends Middleware>(fn: M){
            const request = create<C & MiddlewareResolvedContext<M>>(url)
            
            middlewares.forEach(fn => request._addMiddleware(fn))
            
            request._addMiddleware(fn)
            request._setSchema(schema)
    
            return request
        }

        function schema(newSchema: any){
            const request = create<C>(url)
            
            middlewares.forEach(fn => request._addMiddleware(fn))
            
            request._setSchema(newSchema)
    
            return request
        }

        async function internalRun(fn: (context: C) => Promise<any>){
            return run({
                url,
                middlewares,
                fn,
                schema: _schema
            })
    
        }
    
        return {
            _addMiddleware,
            _setSchema,

            schema,
            middleware,
            run: internalRun
        }
    }

    return (url: string) => create(url)
}