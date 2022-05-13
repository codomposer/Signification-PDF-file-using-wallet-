module.exports = (app) => {
  const signs = require('../controllers/sign.controller.js')
  const upload = require('../middlewares/file.middleware')

  var router = require('express').Router()

  // New Sign create
  router.route('/upload').post(upload.single('file'), signs.create)

  // Retrieve all Signs
  router.get('/', signs.findAll)

  // Retrieve all Sign record by id
  router.get('/:id', signs.findOne)

  // Update a Sign pdf with id
  router.put('/:id', signs.update)

  // Delete a Sign record by id
  router.delete('/:id', signs.delete)

  // Create a new Sign
  router.delete('/', signs.deleteAll)

  app.use('/v0/files', router)
}
