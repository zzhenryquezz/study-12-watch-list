import { defineMiddleware } from "../core/defineMiddleware";

export default defineMiddleware(async (context) => {
    return {
        ...context,
        user: {
            id: 1,
            name: 'John Doe'
        }
    }
})