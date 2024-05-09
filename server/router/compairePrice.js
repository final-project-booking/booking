const router = require('express').Router();
const {getRoomPrice}=require('../controller/CompairePrice')
router.get('/',getRoomPrice)
module.exports = router;