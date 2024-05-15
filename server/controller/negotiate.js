const {negotiation}=require('../database')
module.exports={
addNegotiation:async function(req,res){
    try{
        const {content,roomId,newPrice,userId}=req.body
        const newNegotiation=await negotiation.create({
            data: {
                userId: userId,
                roomId: roomId,
                newPrice: newPrice,
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