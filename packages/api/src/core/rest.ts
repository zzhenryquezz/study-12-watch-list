import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from  '../app.js'
import { createRequest } from './createRequest.js'

export function get(url: string) {    
    const request = createRequest()
        .middleware(async (context) => {
            return {
                request: undefined as any as FastifyRequest,
                response: undefined as any as FastifyReply,
                ...context,
            }
        })

    request.run = async (fn) => {
        app.get(url, async (req, res) => {

            const context = await request.createContext({
                request: req,
                response: res
            })
            
            return fn(context)
        })
    }

    return request
       
}

// export const post = createRequest(({ url, middlewares, fn, schema }) => {
//     app.get(url, { schema }, async (request, reply) => {
//         let context: any = { request, reply }

//         for(const middleware of middlewares){
//             context = await middleware(context)
//         }

//         return fn(context)
//     })
// })

