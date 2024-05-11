const router = require('express').Router();
const owner=require('../controller/ownerController');
const verifyUser=require('../midellware/VerifyUser.js')
router.post('/create',verifyUser,owner.promoteToOwner)
router.get('/all',owner.getAllOwners)

router.post('/Rooms',owner.createRoomsForHotel)
router.get('/:hotelId/:view',owner.getRoomByCategory)
router.get('/:hotelId',owner.getRoomByhotlId)
module.exports = router;