import { RouteHandlerMethod } from "fastify";
import { defineRequest } from "../core/defineRequest";
import authentication from "../middlewares/authentication";
import authorization from "../middlewares/authorization";

export const getMedias: RouteHandlerMethod = (request, reply) => {
    return reply.send({ hello: 'world' })
}

export const createMedia = defineRequest('/medias')
    .middleware(authentication)
    .middleware(authorization)
    .get(async (context) => {
        return {
            hello: 'world',
            user: context.user,
            role: context.role
        }
    })