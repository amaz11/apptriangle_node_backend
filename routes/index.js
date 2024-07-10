const router = require('express')
const auth = require('./auth.routes')
const team = require('./team.routes')
const user = require('./user.routes')
const leaves = require('./leaves.routes')
const attendece = require('./attendence.routes')
const fileUpload = require('./fileUpload.routes')
const routes = router.Router()

routes.use('/auth', auth)
routes.use('/team', team)
routes.use('/users', user)
routes.use('/leaves', leaves)
routes.use('/attendence', attendece)
routes.use('/file', fileUpload)

module.exports = routes