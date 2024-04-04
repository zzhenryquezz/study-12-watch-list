import authentication from "@/middlewares/authentication.js";
import authorization from "@/middlewares/authorization.js";

import { get } from "@/core/rest.js";
import { params } from "@/middlewares/params.js";
import { number, string, transform } from "valibot";

get('/medias')
    .middleware(authentication)
    .middleware(authorization)
    .run(async (ctx) => {
        return {
            message: 'list medias',
            user: ctx.user
        }
    })

get('/medias/:id')
    .middleware(authentication)
    .middleware(authorization)
    .middleware(
        params({
            id: transform(string(), Number, number())
        })
    )
    .run(async (ctx) => {
        return {
            id: ctx.params.id
        }
    })