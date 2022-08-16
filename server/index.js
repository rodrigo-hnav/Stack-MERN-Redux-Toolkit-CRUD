import {PORT} from './config.js'
import { connectDB } from './db.js'
import {app} from './app.js'

app.listen(PORT)


connectDB()

console.log('server listener to port: ', PORT)

