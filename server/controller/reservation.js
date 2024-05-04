const {reservation}=require('../database/index')

module.exports={
    addReservation:async function(req,res){
        try {
            const {userId,hotelId,startDate,endDate}=req.body
            const reservations=await reservation.create({
                data:{
                    userId:userId,
                    hotelId:hotelId,
                    startDate:startDate,
                    endDate:endDate
                }
            })
            res.status(200).send(reservations)
        } catch (error) {
            throw error
        }
    },
    removeReservation:async function(req,res){
        try {
            const reservations=await reservation.delete({where:{id:Number(req.params.id)}})
            res.status(200).send(reservations)
        } catch (error) {
            throw error
        }
    },
    getAllReservations:async function(req,res){
        try {
            const reservations=await reservation.findMany()
            res.status(200).send(reservations)
        } catch (error) {
            throw error
        }
    },
    getReservationByUserId:async function(req,res){
        try {
            const reservations=await reservation.findMany({where:{userId:Number(req.params.userId)}})
            res.status(200).send(reservations)
        } catch (error) {
            throw error
        }
    }
}