const {negotiation,user}=require('../database')
module.exports={
addNegotiation:async function(req,res){
    try{
        const {content,roomId,newPrice,userId}=req.params
        const existingUser = await user.findUnique({ where: { id: Number(userId) } });
        if (!existingUser) {
          return res.status(400).json({ error: 'No user found with this ID.' });
        }
        const newNegotiation=await negotiation.create({
            data: {
                userId: Number(userId),
                roomId: Number(roomId),
                newPrice: Number(newPrice),
                content: content
              }
        })

        res.status(200).json(newNegotiation)
    }catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
},
getNegotiation:async function(req,res){
    try{
        const negotiationList=await negotiation.findMany()
        res.status(200).json(negotiationList)
    }catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
}
}