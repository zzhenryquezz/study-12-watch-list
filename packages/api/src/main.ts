import { env } from './env.js'
import { app } from './app.js'


async function run(){

    app.get('/', async () => ({ hello: 'world 2' }))

    app.listen({ port: env.PORT, host: env.HOST })
        .catch((err) => {
            app.log.error(err)
            process.exit(1)
        })
}


run()
