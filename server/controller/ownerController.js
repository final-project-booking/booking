
const prisma = require("../database");

module.exports={
promoteToOwner : async function(req, res) {
    const userId = req.user.userId;  
    const { hotelData } = req.body; 

    try {
       
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            return res.status(404).send('User not found');
        }

        const existingOwner = await prisma.owner.findUnique({
            where: { userId: userId }
        });

        if (existingOwner) {
            return res.status(400).send('User is already an owner');
        }

        
        const result = await prisma.$transaction(async (prisma) => {
            const owner = await prisma.owner.create({
                data: {
                    userId: userId,
                    hotel: {
                        create: {
                            imgUrl: hotelData.imgUrl,
                            name: hotelData.name,
                            location: hotelData.location,
                            description: hotelData.description,
                            rating: hotelData.rating,
                            rooms: hotelData.rooms,
                            licence: hotelData.licence
                        }
                    }
                }
            });

           
            await prisma.user.update({
                where: { id: userId },
                data: { role: 'owner' }
            });

            return owner;
        });

        res.status(201).send(result);
    } catch (error) {
        // console.error('Failed to promote user to owner with hotel:', error);
        // res.status(500).send('Error promoting user to owner');
        throw error;
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



 createRoomsForHotel:async function(req, res) {
    const { hotelId, rooms } = req.body; 
    try {
       
        const hotel = await prisma.hotel.findUnique({
            where: { id: hotelId }
        });

        if (!hotel) {
            return res.status(404).send('Hotel not found');
        }

        
        const newRooms = await prisma.room.createMany({
            data: rooms.map(room => ({
                hotelId: hotelId,
                price: room.price,
                imgUrl: room.imgUrl,
                view: room.view,
                option: room.option
            }))
        });

        res.status(201).send({ message: "Rooms successfully created", count: newRooms.count });
    } catch (error) {
        console.error('Failed to create rooms:', error);
        res.status(500).send('Error creating rooms');
    }
}


}