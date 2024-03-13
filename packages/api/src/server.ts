import Fastify from 'fastify'
import { env } from './env'

const app = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty'
        },
    },
})

app.get('/', async () => {
    return { hello: 'world' }
})

app.listen({ port: env.PORT, host: env.HOST })
    .catch((err) => {
        app.log.error(err)
        process.exit(1)
    })
