import { app } from  '../app.js'
import { createRequest } from './createRequest.js'

export const get = createRequest((url, middlewares, fn) => {    
    app.get(url, async (request, reply) => {
        let context: any = {
            request,
            reply
        }

        for(const middleware of middlewares){
            context = await middleware(context)
        }

        return fn(context)
    })
})

export const post = createRequest((url, middlewares, fn) => {
    app.post(url, async (request, reply) => {
        let context: any = { request, reply }

        for(const middleware of middlewares){
            context = await middleware(context)
        }

        return fn(context)
    })
})

