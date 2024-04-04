import { Middleware, MiddlewareResolvedContext } from './defineMiddleware.js'

export interface Context {}

export interface RunFunctionParams {
    url: string
    middlewares: Middleware[]
    fn: (context: any) => Promise<any>
    schema: any
}

export interface RunFunction {
    (args: RunFunctionParams): Promise<any> | any
}

export function createRequest<C extends Context>(){

    const middlewares: Middleware[] = []

    function middleware<M extends Middleware>(fn: M){        
        middlewares.push(fn)

        return this as ReturnType<typeof createRequest<C & MiddlewareResolvedContext<M>>>
    }

    async function createContext(initialContext: Record<string, any> = {}){
        let context: any = initialContext

        for(const middleware of middlewares){
            context = await middleware(context)
        }

        return context
    }
    
    async function run(fn: (context: C) => Promise<any>){
        let context: any = {  }

        for(const middleware of middlewares){
            context = await middleware(context)
        }

        return fn(context)
    }

    return {
        middleware,
        createContext,
        run
    }
}