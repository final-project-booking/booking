const {reservation,room,hotel,user,options,owner, option}=require('./database/index')
const bcrypt=require("bcrypt")
const { faker ,Randomizer} = require('@faker-js/faker');

function getRandomElementFromArray(arr) {
    // Generate a random index within the bounds of the array
    const randomIndex = Math.floor(Math.random() * arr.length);
    // Return the element at the random index
    return arr[randomIndex];
  }
const seed = async (sequelize) => {
    const saltRounds = await bcrypt.genSalt()

    // Adjust the number of seeds you want for each model
    const ownercount=10
    const hotelCount=50
    const userCount = 50;
    const roomsCount=1000
 let current=userCount
  
    // Generate random users
    const owners = await Promise.all(
        Array.from({ length: ownercount }).map(async () => {
          return await owner.create({
         data:   {}
          });
        })
      );
    
    const users = await Promise.all(
      Array.from({ length: userCount }).map(async (e,i) => {

        return await user.create({
       data:   {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: await bcrypt.hash("12345", saltRounds), // Replace with a secure password hashing mechanism
          phoneNumber: faker.number.int({ min: 1, max: 100}), // Uncomment if you want phone numbers
          isActive:faker.datatype.boolean(),
          activationCode:faker.phone.number(),
          latitude:faker.location.latitude({ max: 10, min: -10, precision: 5 }), 
        longitude:faker.location.longitude({ max: 10, min: -10 }),
        imgUrl:faker.person.lastName(),
       
    }
        });
      })
    );
    const createUerrOwner = await Promise.all(
        Array.from({ length: ownercount}).map(async () => {
            const owne = owners[Math.floor(Math.random() * ownercount)];

          return await user.create({
         data:   {
            imgUrl:faker.person.lastName(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
            email: faker.internet.email(),
          password: await bcrypt.hash("12345", saltRounds), // Replace with a secure password hashing mechanism

            phoneNumber: faker.number.int({ min: 1, max: 100}), // Uncomment if you want phone numbers
            isActive:faker.datatype.boolean(),
            activationCode:faker.phone.number(),
            latitude:faker.location.latitude({ max: 10, min: -10, precision: 5 }), 
          longitude:faker.location.longitude({ max: 10, min: -10 }),
        
          ownerId:owne.id
      }
          });
        })
      );
    const hotels= await Promise.all(
        Array.from({ length: hotelCount }).map(async () => {
            
          const owne = owners[Math.floor(Math.random() * ownercount)];
          return await hotel.create({
            data:{

                name: faker.location.streetAddress(),
                description: faker.commerce.productDescription(),
                rating: faker.number.int({ min: 1, max: 5 }),
                rooms:faker.number.int({ min: 1, max: 100}),
                licence:faker.commerce.productName(),
                ownerId: owne.id, 
                latitude:faker.location.latitude({ max: 10, min: -10, precision: 5 }), 
                longitude:faker.location.longitude({ max: 10, min: -10 }),
            }
           
          });
        })
      );
      const rooms =await Promise.all(
        Array.from({ length: roomsCount }).map(async () => {
          const hotelery = hotels[Math.floor(Math.random() * hotelCount)];
          return await room.create({
            data:{
                hotelId:hotelery.id,
                price: faker.number.int({ min: 1, max: 300000 }),
                 capacity: faker.number.int({ min: 1, max: 5 }),
                 imgUrl:faker.location.streetAddress(),
                 rate:faker.number.int({ min: 0, max: 75}),
                 reduction:faker.datatype.boolean(),
                 view:getRandomElementFromArray([ "seaView",
                    "standerView"])
                
            }
          
           
          });
        })
      )
      const options =await Promise.all(
        Array.from({ length: 49 }).map(async () => {
    const roomfor = rooms[Math.floor(Math.random() * roomsCount)];
        
          return await option.create({
            data:{
                Meal_Plan:getRandomElementFromArray([   "breakFast",
                    "all_Inclusive",
                    "halfBoard"]),
                    roomId:roomfor.id
            }
          
           
          });
        })
      )
      const reservations =await Promise.all(
        Array.from({ length: 49 }).map(async () => {
        current-=1

          return await reservation.create({
            data:{
                userId:current,
                people:faker.number.int({ min: 1, max: 5 }),
                startDate:faker.date.soon(),
                endDate:faker.date.soon()
            }
          
           
          });
        })
      )
    }


seed()