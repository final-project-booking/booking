const router = require('express').Router();
const {addFavoriteHotel,deleteFavorite,getfavorite}=require('../controller/favorite')

router.post('/:userId/:hotelId',addFavoriteHotel)

router.delete('/delete/:userId/:hotelId',deleteFavorite)

router.get('/:userId',getfavorite)

module.exports = router;