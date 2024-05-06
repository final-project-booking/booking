const {reservation,room,user,dayAvailability}=require('../database/index')

module.exports={
    addReservation: async function(req, res) {
        try {
          const { userId, hotelId, startDate, endDate, roomId, people } = req.body
          const users = await user.findUnique({
            where: {
              id: userId
            }
          })
    
          if (!users) {
            return res.status(400).send({ error: 'User not found' })
          }
         
          const existingReservation = await reservation.findUnique({
            where: {
              roomId: roomId
            }
          })
    
          if (existingReservation) {
            return res.status(400).json({ error: 'Room is already reserved' })
          }
      
       const  rooms = await room.findUnique({
            where: {
              id: roomId
            }
          })
          
          if (!rooms) {
            return res.status(400).json({ error: 'Room not found' })
          }
    
          
          const newReservation = await reservation.create({
            data: {
              startDate: new Date(startDate),
              endDate: new Date(endDate),
              people: people,
            
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
              hotel: {
                connect: {
                  id: hotelId
                }
              }
            }
          })
    
         
          await room.update({
            where: {
                id: roomId
              },
              data: {
               
                reservation: {
                  connect: {
                    id: newReservation.id
                  }
                }
              }
          })
    
          res.status(200).send(newReservation)
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