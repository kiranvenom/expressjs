const Router = require('express');
const mockProduct = require('../mockProducts');

const router = Router();

router.get('/api/products', (req, res) => {
	if (req.cookies.cookieData && req.cookies.cookieData === 'awesome') {
		res.send(mockProduct);
	} else {
		res.status(403).send({ error: 'Forbidden' });
	}
});

module.exports = router;
