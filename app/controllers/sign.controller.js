const fs = require('fs')
var fsR = require('fs-reverse'),
  filename = process.argv[2]

var backwardsStream = require('fs-backwards-stream')

const { ethers, utils } = require('ethers')
const db = require('../models')
const Sign = db.sign
const Op = db.Sequelize.Op
require('dotenv').config()
const privateKey = process.env.PRIVATE_KEY

const provider = new ethers.getDefaultProvider(process.env.TESTNET_HTTP_URL)

const wallet = new ethers.Wallet(privateKey, provider)

// Create and Save a new Sign
exports.create = async (req, res) => {
  // Validate request
  if (!req.file && !req.body.signAddr) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  let signResult = await newSignification(req.file.path)

  console.log(signResult)
  fs.appendFileSync(req.file.path, signResult)
  // console.log(text)

  // Create a sign
  const sign = {
    pdf: req.file.path,
    signAddr: '',
  }

  // Save Sign in the database
  Sign.create(sign)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Sign.',
      })
    })
}

// Retrieve all Signs from the database.
exports.findAll = (req, res) => {}

// Find a single Sign with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  Sign.findByPk(id)
    .then((data) => {
      if (data) {
        var fileSizeInBytes = fs.statSync(data.pdf).size
        console.log(fileSizeInBytes)

        var s = backwardsStream(data.pdf, {
          start: fileSizeInBytes,
          end: fileSizeInBytes - 132,
        })

        s.on('data', async (buf) => {
          console.log(buf.toString())

          const output = utils.verifyMessage(data.pdf, buf.toString())

          await Sign.update(
            { signAddr: output },
            {
              where: { id: id },
            },
          )
            .then((num) => {
              if (num == 1) {
                res.send(output)
              } else {
                res.send({
                  message: `Cannot update Sign with id=${id}. Maybe Sign was not found or req.body is empty!`,
                })
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: 'Error updating Sign with id=' + id,
              })
            })
        })
      } else {
        res.status(404).send({
          message: `Cannot find Sign with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Sign with id=' + id,
      })
    })
}

// Update a Sign by the id in the request
exports.update = (req, res) => {}

// Delete a Sign with the specified id in the request
exports.delete = (req, res) => {}

// Delete all Signs from the database.
exports.deleteAll = (req, res) => {}

const newSignification = async (message) => {
  const signature = await wallet.signMessage(message)

  return signature
}
