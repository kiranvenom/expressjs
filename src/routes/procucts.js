const Router = require('express');
const mockProduct = require('../mockProducts');

const router = Router();

router.get('/api/products', (req, res) => {
	res.send(mockProduct);
});

module.exports = router;
