import authentication from "@/middlewares/authentication.js";
import authorization from "@/middlewares/authorization.js";

import { createRequest } from '@/core/createRequest.js';

createRequest('/medias')
    .middleware(authentication)
    .middleware(authorization)
    .get(async (context) => {
        return {
            hello: 'world',
            user: context.user,
            role: context.role
        }
    })