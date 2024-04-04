import { defineMiddleware } from '@/core/defineMiddleware.js';

export default defineMiddleware(async (context) => {
    return {
        ...context,
        role: 'admin'
    }
})