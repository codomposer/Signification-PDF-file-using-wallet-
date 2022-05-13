module.exports = (app) => {
  const auth = require('../controllers/auth.controller.js')
  const upload = require('../middlewares/file.middleware')

  var router = require('express').Router()

  // authentication using github
  router.post('/', auth.login)

  app.use('/authenticate', router)
}
