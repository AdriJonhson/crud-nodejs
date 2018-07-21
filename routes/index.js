var express = require('express');
var router = express.Router();
var productController = require('../controllers/product-controller');

/* GET home page. */
router.get('/', productController.list);
router.get('/novo-produto', productController.showProductCreate);
router.post('/novo-produto', productController.createProduct);
router.get('/editar-produto/:id', productController.edit);
router.put('/editar', productController.update);
router.delete('/excluir', productController.delete);

module.exports = router;
