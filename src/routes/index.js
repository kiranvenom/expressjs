const Router = require('express');

const userRoute = require('./user');
const procuctsRoute = require('./procucts');

const router = Router();

router.use(userRoute, procuctsRoute);
module.exports = router;
