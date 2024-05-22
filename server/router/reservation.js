const router = require('express').Router();
const {addReservation,getReservationByHotelId,getAllReservations}=require('../controller/reservation')
router.post('/',addReservation)
router.get('/allRes',getAllReservations)
router.get("/reserve/:id",getReservationByHotelId)
module.exports = router;