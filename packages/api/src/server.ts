import { readdir } from 'fs/promises'
import { resolve } from 'path'

import { env } from './env.js'
import { app } from './app.js'

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function run(){

    const files = await readdir(resolve(__dirname, './controllers'))

    for await (const file of files){
        await import(resolve(__dirname, './controllers', file))
    }

    app.get('/', async () => ({ hello: 'world 2' }))

    app.listen({ port: env.PORT, host: env.HOST })
        .catch((err) => {
            app.log.error(err)
            process.exit(1)
        })
}


run()
