const {reservation,room,user,dayAvailability, hotel}=require('../database/index')

module.exports={
    addReservation: async function(req, res) {
        try {
          const { userId, startDate, endDate, roomId } = req.body
          
          const users = await user.findUnique({
            where: {
              id: userId
            }
          })
    
          if (!users) {
            return res.status(400).send({ error: 'User not found' })
          }
          // const checkHotel=await hotel.findUnique({
          //   where:{
          //     id:parseInt(hotelId)
          //   }
          // })
          // if(!checkHotel){
          //   return res.status(400).send({ error: 'Hotel not found' })
          // }
         
          
          //  const  rooms = await room.findFirst({
          //       where: {
          //         hotelId: parseInt(hotelId)
          //       }
          //     })
              
          //     if (!rooms) {
          //       return res.status(400).json({ error: 'Room not found' })
          //     }
          const existingReservation = await reservation.findFirst({
            where: {
              AND: [
                { roomId: roomId },
                // { hotelId: parseInt(hotelId) },
                // {
                //   OR: [
                //     { startDate: { lte: new Date(endDate) }, endDate: { gte: new Date(startDate) } },
                //     { startDate: { lte: new Date(startDate) }, endDate: { gte: new Date(endDate) } }
                //   ]
                // }
              ]
            }
          })
          
          if (existingReservation) {
            return res.status(400).json({ error: 'Room is already reserved' })
          }else{
            const newReservation = await reservation.create({
            
              data: {
                
                startDate: new Date(startDate),
                endDate: new Date(endDate),
               
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
      
           
            // await room.update({
            //   where: {
            //       id: roomId
            //     },
            //     data: {
                 
            //       reservation: {
            //         connect: {
            //           id: newReservation.id
            //         }
            //       }
            //     }
            // })
         
        const update=   dayAvailability.create({
                data: {
                  night: endDate,
                  availability: false,
                  roomId:roomId
                },
              });
           
          
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