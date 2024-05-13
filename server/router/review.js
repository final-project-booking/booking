const router = require('express').Router();
const {addReview,getReviews} =require("../controller/review")
router.post("/addReview/:userId/:hotelId",addReview)
router.get("/reviews/:id",getReviews)






module.exports=router