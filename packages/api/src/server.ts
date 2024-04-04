import { readdir } from 'fs/promises'
import { resolve } from 'path'

import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

import { env } from './env.js'
import { app } from './app.js'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { apiDoc } from './apiDoc.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function run(){

    const routes = [] as any[]

    app.addHook('onRoute', (route) => {
        routes.push({
            method: route.method,
            path: route.url,
            url: `http://${env.HOST}:${env.PORT}${route.url}`
        })
    })

    await app.register(swagger, {
        openapi: apiDoc
    })

    await app.register(swaggerUI, {
        prefix: '/docs',
    })

    const files = await readdir(resolve(__dirname, './controllers'))

    for await (const file of files){
        await import(resolve(__dirname, './controllers', file))
    }

    app.get('/', () => routes)

   

    await app.ready()

    app.swagger()

    app.listen({ port: env.PORT, host: env.HOST })
        .catch((err) => {
            app.log.error(err)
            process.exit(1)
        })
}


run()
