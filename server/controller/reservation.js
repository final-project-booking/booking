const {reservation,room,user,dayAvailability, hotel}=require('../database/index')

module.exports={
    addReservation: async function(req, res) {
        try {
          const { userId, roomId ,dates} = req.body
          
          const users = await user.findUnique({
            where: {
              id: userId
            }
          })
    
          if (!users) {
            return res.status(400).send({ error: 'User not found' })
          }
         
          const existingReservation = await reservation.findFirst({
            where: {
              AND: [
                { roomId: roomId },
              
              ]
            }
          })
          
          if (existingReservation) {
            return res.status(400).json({ error: 'Room is already reserved' })
          }else{
            const newReservation = await reservation.create({
            
              data: {
                
                startDate: new Date(dates[0]),
                endDate: new Date(dates[dates.length-1]),
               
                room: {
                  connect: {
                    id: roomId
                  }
                },
                user: {
                  connect: {
                    id: userId
                  }
                },           
              },
           
            })

            const availability = await Promise.all(
              dates.map(async (date,i) => {
                return dayAvailability.create({
                  data:{
                    nigth:date,
                    roomId:roomId,
                    availability:false
                  }
                })

              }))
         
       
           
          
            res.status(200).send(newReservation)

          }
    
          
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