const router = require('express').Router();
const {addReservation,getAllReservations}=require('../controller/reservation')
router.post('/',addReservation)
router.get('/allRes',getAllReservations)
module.exports = router;