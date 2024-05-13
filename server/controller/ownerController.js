const { create } = require("domain");
const prisma = require("../database");
const helper=(arr,id)=>{
return arr.map((e)=>{
    return {
        hotelId:id,
        link:e
    }
})
}
const helperRoom=(arr,id)=>{
    return arr.map((e)=>{
        return {
            roomId:id,
            link:e
        }
    })
    }
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
    
            const existingOwner = await prisma.owner.findFirst({
                where: { id: id }
            });
    
            let result;
    
            if (existingOwner) {
               
                result = await prisma.hotel.create({
                    data: {
                        ownerId: existingOwner.id,
                        imgUrl: hotelData.imgUrl,
                        name: hotelData.name,
                        longitude: hotelData.longitude,
                        latitude: hotelData.latitude,
                        description: hotelData.description,
                        rating: Number(hotelData.rating),
                        rooms:  Number(hotelData.rooms),
                        licence:hotelData.licence,
                     
                    
                    }
                });
             const allHotels=helper(hotelData.media,result.id)
             console.log(allHotels,'allHotels');
             const createMedia=await prisma.media.createMany({
                data:allHotels
             })
            } else {
               
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
                                    licence: hotelData.licence,
                                   
                                }
                            }
                        }
                    });
                    const allHotels=helper(media,result.hotel.id)
                    const createMedia=await prisma.media.createMany({
                       data:allHotels
                    })
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
                        room: true ,
                        media :true
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
    const { hotelId, roomTemplate, numRooms } = req.body; 

    try {
       
        const hotel = await prisma.hotel.findUnique({
            where: { id: hotelId }
        });

        if (!hotel) {
            return res.status(404).send('Hotel not found');
        }

        let createdRoomsCount = 0;
      
       
        for (let i = 0; i < numRooms; i++) {
           let result=await prisma.room.create({
                data: {
                    hotelId: hotelId,
                    price: roomTemplate.price,
                    imgUrl: roomTemplate.imgUrl,
                    view: roomTemplate.view,
                    capacity: roomTemplate.capacity,
                    reduction: roomTemplate.reduction,
                    rate: roomTemplate.rate,
                    option: {
                        create: roomTemplate.option
                    }
                }
            });
            const allrooms=helperRoom(roomTemplate.media,result.id)
             console.log(allrooms,'allrooms');
             const createMedia=await prisma.MediaRoom.createMany({
                data:allrooms
             })
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
}}
