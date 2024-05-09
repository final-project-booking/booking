const { create } = require("domain");
const prisma = require("../database");

module.exports={
    promoteToOwner: async function(req, res) {
        const id = req.user.userId;
        const { hotelData } = req.body;
    
        try {
            const existingUser = await prisma.user.findUnique({
                where: { id: id }
            });
    
            if (!existingUser) {
                return res.status(404).send('User not found');
            }
    
            // Check if the user is already an owner
            const existingOwner = await prisma.owner.findFirst({
                where: { id: id }
            });
    
            let result;
    
            if (existingOwner) {
                // Add a hotel to the existing owner
                result = await prisma.hotel.create({
                    data: {
                        ownerId: existingOwner.id,
                        imgUrl: hotelData.imgUrl,
                        name: hotelData.name,
                        longitude: hotelData.longitude,
                        latitude: hotelData.latitude,
                        description: hotelData.description,
                        rating: hotelData.rating,
                        rooms: hotelData.rooms,
                        licence: hotelData.licence
                    }
                });
            } else {
                // Promote the user to an owner and add a hotel
                result = await prisma.$transaction(async (prisma) => {
                    const owner = await prisma.owner.create({
                        data: {
                            id: id,
                            hotel: {
                                create: {
                                    imgUrl: hotelData.imgUrl,
                                    name: hotelData.name,
                                    longitude: hotelData.longitude,
                                    latitude: hotelData.latitude,
                                    description: hotelData.description,
                                    rating: hotelData.rating,
                                    rooms: hotelData.rooms,
                                    licence: hotelData.licence
                                }
                            }
                        }
                    });
    
                    await prisma.user.update({
                        where: { id: id },
                        data: { role: 'owner' }
                    });
    
                    return owner;
                });
            }
    
            res.status(201).send(result);
        } catch (error) {
            console.error('Failed to promote user to owner with hotel:', error);
            res.status(500).send('Error promoting user to owner');
        }
    },

    
    



getAllOwners : async function(req, res) {
    try {
       
        const owners = await prisma.owner.findMany({
            include: {
                user: true, 
                hotel: {
                    include: {
                        room: true 
                    }
                }
            }
        });

        if (owners.length === 0) {
            return res.status(404).send('No owners found');
        }

        res.status(200).send(owners);
    } catch (error) {
        console.error('Failed to retrieve owners:', error);
        res.status(500).send('Error fetching owners');
    }
},



createRoomsForHotel: async function(req, res) {
    const { hotelId, rooms } = req.body; 
    try {
        // Check if the hotel exists
        const hotel = await prisma.hotel.findUnique({
            where: { id: hotelId }
        });

        if (!hotel) {
            return res.status(404).send('Hotel not found');
        }

        let createdRoomsCount = 0;

        // Create rooms and options individually
        for (const room of rooms) {
            await prisma.room.create({
                data: {
                    hotelId: hotelId,
                    price: room.price,
                    imgUrl: room.imgUrl,
                    view: room.view,
                    capacity: room.capacity,
                    reduction: room.reduction,
                    rate: room.rate,
                    option: {
                        create: {
                            Meal_Plan: room.option.Meal_Plan
                        }
                    }
                }
            });
            createdRoomsCount++;
        }

        res.status(201).send({ message: "Rooms successfully created", count: createdRoomsCount });
    } catch (error) {
        console.error('Failed to create rooms:', error);
        res.status(500).send('Error creating rooms');
    }
},
getRoomByCategory:async function(req,res){

     try {
        const {hotelId,view,capacity}=req.params
       
console.log(req.params);
            let whereCondition={}
            if(view&&capacity){
                whereCondition={
                    AND:[
                        {view:{equals:view}},
                       {capacity: {equals:Number(capacity)}},
                      
                    ]
                }
            }else if(view){
                whereCondition={view:{equals:view}}
            }else if(capacity){
                whereCondition={capacity:{equals:Number(capacity)}}
            }

             const room = await prisma.room.findFirst({
                 where:{
                    hotelId:Number(hotelId),
                    ...whereCondition,
                
                 },
                 include:{
                    hotel:true,
                    
                 },
                 
               });
               const chekRoom=await prisma.reservation.findFirst({
                where:{
                    roomId:Number(room.id)
                }
            
            })
            if(chekRoom){
                return res.status(400).send({error:"room is already reserved"})
            }else{

                res.status(200).send(room)
            }
        
     } catch (error) {
        throw error
     }
}
       
  


}
