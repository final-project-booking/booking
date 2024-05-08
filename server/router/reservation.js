const router = require('express').Router();
const {addReservation}=require('../controller/reservation')
router.post('/:hotelId',addReservation)
module.exports = router;