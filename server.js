const Koa = require('koa')
const bodyParser = require('koa-body')
const koaStatic = require('koa-static')
const cors = require('@koa/cors');
const routes = require('./routes')
const db = require('./models')

const app = new Koa()
const PORT = 3000

db.sequelize.sync().then(() => console.log(`Models synced`)).catch(err => console.log(err))

app.use(cors())
app.context.db = db
app.use(bodyParser({
    formidable: {
        maxFileSize: 10 * 1024 * 1024,
        uploadDir: './uploads',
        keepExtensions: true
    },
    multipart: true,
    urlencoded: true
}))

app.use(routes)
app.use(koaStatic('./uploads'))
app.listen(PORT)
