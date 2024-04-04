import { defineMiddleware } from '@/core/defineMiddleware.js';
import { ObjectEntries, object, parse } from 'valibot';

export function params<T extends ObjectEntries>(data: T){

    const schema = object(data);

    return defineMiddleware(async (context) => {
        if (!context.request) {
            throw new Error('request not found on context')
        }

        return {
            ...context,
            params: parse(schema, context.request.params)
        }
    })
}
