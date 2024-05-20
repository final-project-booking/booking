const router = require('express').Router();
const {addNegotiation,getNegotiation,getUserWhereHotelId}=require('../controller/negotiate')
router.post('/:roomId/:newPrice/:content/:userId',addNegotiation)
router.get('/:hotelId',getNegotiation)
router.get('/get/:hotelId',getUserWhereHotelId)
module.exports = router;