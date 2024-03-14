import { env } from './env'
import { app } from './app'
import fs from 'fs'	
import { resolve } from 'path'


async function run(){

    const controllers = fs.readdirSync(resolve('./src/controllers'))

    await Promise.all(controllers.map(async (file) => import(resolve('./src/controllers', file))))

    app.listen({ port: env.PORT, host: env.HOST })
        .catch((err) => {
            app.log.error(err)
            process.exit(1)
        })
}


run()
