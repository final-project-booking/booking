const router = require('express').Router();
const {getHotelByNames,searchHotelByLocation}=require('../controller/search')

router.get('/:location' , searchHotelByLocation);
// router.post('/',addHotel)
// router.get('/hotels/:startDate/:endDate', getHotelWithAvailableRooms);
module.exports = router