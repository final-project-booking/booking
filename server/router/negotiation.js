const router = require('express').Router();
const {addNegotiation,getNegotiation}=require('../controller/negotiate')
router.post('/add',addNegotiation)
router.get('/',getNegotiation)
module.exports = router;