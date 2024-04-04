import authentication from "@/middlewares/authentication.js";
import authorization from "@/middlewares/authorization.js";

import { get, post } from "@/core/rest.js";

get('/medias')
    .middleware(authentication)
    .middleware(authorization)
    .schema({
        description: 'Get all medias',
        response: {
            201: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    hello: { type: 'string' }
                }
            },
            default: {
                description: 'Default response',
                type: 'object',
                properties: {
                    foo: { type: 'string' }
                }
            }
        },
    })
    .run(async ({ user, role }) => {
        return {
            hello: 'world',
            user: user,
            role: role
        }
    })

// get('/medias/:id')
//     .middleware(authentication)
//     .middleware(authorization)
//     .run(async ({ request, user, role }) => {
//         return {
//             id: request.params.id,
//         }
//     })

// post('/medias')
//     .middleware(authentication)
//     .middleware(authorization)
//     .run(async (context) => {
//         return {
//             hello: 'world',
//             user: context.user,
//             role: context.role
//         }
//     })