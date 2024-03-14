import { defineMiddleware } from "../core/defineMiddleware";

export default defineMiddleware(async (context) => {
    return {
        ...context,
        role: 'admin'
    }
})