const Router = require('koa-router')
const router = new Router()
const { UserController, FileController } = require('../controllers')

// User routes
router.post('/api/user', UserController.create)
router.get('/api/user', UserController.getAll)

// File routes
router.post('/api/file', FileController.upload)

module.exports = router.routes()

