const router = require('express').Router();
const {addReservation}=require('../controller/reservation')
router.post('/',addReservation)
module.exports = router;