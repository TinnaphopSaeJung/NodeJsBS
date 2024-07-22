const express = require('express')
const router = express.Router()

const { read } = require('../Controllers/product')
const { list } = require('../Controllers/product')
const { create } = require('../Controllers/product')
const { update } = require('../Controllers/product')
const { remove } = require('../Controllers/product')

// Middleware
const { auth } = require('../Middleware/auth')
const { upload } = require('../Middleware/upload')


router.get('/product', list)
router.get('/product/:id', auth, read)
router.post('/product', auth, upload, create)
router.put('/product/:id', auth, update)
router.delete('/product/:id', auth, remove)


module.exports = router