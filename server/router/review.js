const router = require('express').Router();
const {addReview} =require("../controller/review")
router.post("/addReview/:userId/:hotelId",addReview)






module.exports=router