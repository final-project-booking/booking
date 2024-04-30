const router = require('express').Router();
const {getHotelByNames}=require('../controller/search')

router.get('/hotels/:name/:startDate/:endDate', getHotelByNames);
// router.post('/',addHotel)
// router.get('/hotels/:startDate/:endDate', getHotelWithAvailableRooms);
module.exports = router