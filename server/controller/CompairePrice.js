
const { room,hotel } = require('../database/index');
module.exports={
    getRoomPrice: async function(req,res) {
        try {
            const {selectedRoom,roomId1,roomId2,hotelId}=req.params
            // const selectedHotel = selectedRoom.hotel;
            // const selectedPrice = selectedRoom.price;
            
            const room2=await room.findMany()
            const room1=await room.findFirst({
                where:{
                    hotelId:hotelId,
                    roomId1:roomId1
                },

                
            })
            const rooms = await room.findFirst({
                where:{
                        room2:{
                            price:{
                                lte:room1.price
                            
                            }
                        }
                    
                }
            })
              






            // const room1=await room.findFirst({
            //     where:{
            //         hotelId:hotelId,
            //         roomId1:roomId1
            //     },

                
            // })
            // const rooms = await room.findMany({
            //     where: {
            //         hotelId: {
            //             not: selectedHotel
            //         },
            //         price: {
            //             lte: selectedPrice
            //         }
            //     }
            // });
    
            // const randomIndex = Math.floor(Math.random() * rooms.length);
            // return rooms[randomIndex];
           res.send(room2)
        } catch (error) {
            console.error('Error retrieving room with lower price:', error);
            throw error;
        }
    }
 
}