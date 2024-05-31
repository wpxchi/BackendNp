const { Router } = require('express');
const router = Router();
const Rproducts= require('./Rproducts')
const Auth= require('./Auth')
const Rcart= require('./Cart')

router.use('/products', Rproducts)
router.use('/auth', Auth )
router.use('/cart', Rcart)


module.exports = router;