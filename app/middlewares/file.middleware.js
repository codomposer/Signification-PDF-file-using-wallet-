const multer = require('multer')
const fs = require('fs')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = __dirname + '/resources/uploads'
    console.log(path)
    fs.access(path, (error) => {
      if (error) {
        fs.mkdirSync(path, { recursive: true })
      }
      cb(null, path)
    })
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname)
    cb(null, `${Date.now()}-akileus-${file.originalname}`)
  },
})

const uploadfile = multer({ storage: storage })

module.exports = uploadfile
