const router = require('express').Router();
const {addNegotiation,getNegotiation}=require('../controller/negotiate')
router.post('/:roomId/:newPrice/:content/:userId',addNegotiation)
router.get('/',getNegotiation)
module.exports = router;