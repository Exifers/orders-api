import 'reflect-metadata'
import {db} from './src/datalayer/dataSource'
import {app} from "./src/app";
import './src/routes'

const PORT = 3000

const start = async () => {
    try {
        await db.initialize()
        await app.listen({port: PORT})

        console.log(`Listening on port ${PORT}`)
    } catch (e) {
        console.log(e)
        await db.destroy()
        process.exit(1)
    }
}

start()