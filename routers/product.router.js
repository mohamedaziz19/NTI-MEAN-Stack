const productController = require('../controllers/product.controller')

const upload = require('../config/multerConfig')

const express = require('express')

const router = express.Router()

router.post ('/' , upload.single('image') , productController.createProduct)

router.get ('/' , productController.getProducts)

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router