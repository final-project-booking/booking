const { review } = require("../database/index");

module.exports = {
    addReview: async (req, res) => {
        try {
            console.log(req.body);
            const { stars, content } = req.body;

            if (stars < 1 || stars > 5) {
                throw new Error('Stars must be between 1 and 5.');
            }

            const newReview = await review.create({
                data: {
                    stars,
                    content,
                    hotelId: parseInt(req.params.hotelId),
                    userId: parseInt(req.params.userId)
                }
            });

            res.status(200).json(newReview);
        } catch (error) {
            console.error("Error adding review:", error);
            res.status(500).json({ error: "Failed to add review" });
        }
    },
    getReviews:async(req,res)=>{
        try {
            const reviews=await review.findMany({
                // orderBy: {
                //     createdAt: 'desc' 
                //   },
                where:{
                    hotelId:parseInt(req.params.id)
                },
                include:{
                    user:true
                }
            })
            const reversed=reviews.reverse()
            res.status(200).send(reversed)
        } catch (error) {
            throw error
        }
    }
}

