import type { RawReplyDefaultExpression, RawRequestDefaultExpression } from 'fastify'

interface Context {
    request: RawRequestDefaultExpression
    reply: RawReplyDefaultExpression
}

export type Middleware = ReturnType<typeof defineMiddleware>

export type MiddlewareResolvedContext<M extends Middleware> = Awaited<ReturnType<M>>

export function defineMiddleware<T extends Context>(fn: (context: Context) => Promise<T>) {
    return fn
}
