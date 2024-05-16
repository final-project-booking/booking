const {reservation,room,hotel,user,options,owner, option, roomChat}=require('./database/index')
const bcrypt=require("bcrypt")
const { faker ,Randomizer} = require('@faker-js/faker');

function getRandomElementFromArray(arr) {
    // Generate a random index within the bounds of the array
    const randomIndex = Math.floor(Math.random() * arr.length);
    // Return the element at the random index
    return arr[randomIndex];
  }
  let count =function(){
    let res=0
    return function(){
        res=res+1
        return res
    
    }
  }
  
  const SEED = async (sequelize) => {
    const saltRounds = await bcrypt.genSalt()
let counterOwner=count()
let hotelCounter=count()
let counterRoom=count()
let counterDate=count()
// let optionCount=count()
// let hotelcount=count()
// let roomCount=count()

// let optionCount=count()
// let hotelcount=count()
// let roomCount=count()
    // Adjust the number of seeds you want for each model
    const ownercount=50
    const hotelCount=300
    const userCount = 50;
    const roomsCount=1000
    const reservationsCount=3000
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
        
            const owne = counterOwner()
          return await user.create({
         data:   {
            imgUrl:faker.person.lastName(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
            email: faker.internet.email(),
          password: await bcrypt.hash("12345", saltRounds), // Replace with a secure password hashing mechanismrol
            phoneNumber: faker.number.int({ min: 1, max: 100}), // Uncomment if you want phone numbers
            isActive:true,
            activationCode:faker.phone.number(),
            latitude:faker.location.latitude({ max: 10, min: -10, precision: 5 }), 
          longitude:faker.location.longitude({ max: 10, min: -10 }),
          role:"owner",
          ownerId:owne 
      }
          });
        })
      );
    const hotels= await Promise.all(
        Array.from({ length: hotelCount }).map(async () => {
            
          let owne = owners[Math.floor(Math.random() * ownercount)];
          return await hotel.create({
            data:{
                
                name: faker.location.streetAddress(),
                description: faker.commerce.productDescription(),
                rating: faker.number.int({ min: 1, max: 5 }),
                rooms:faker.number.int({ min: 1, max: 100}),
                licence:faker.commerce.productName(),
                imgUrl:faker.image.url(),
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
        Array.from({ length: roomsCount }).map(async () => {
    const roomfor = counterRoom()
        
          return await option.create({
            data:{
                Meal_Plan:getRandomElementFromArray([   "breakFast",
                    "all_Inclusive",
                    "halfBoard"]),
                    roomId:roomfor
            }
          
           
          });
        })
      )
      const reservations =await Promise.all(
        Array.from({ length:reservationsCount }).map(async () => {
      const allUsers=users[Math.floor(Math.random() * userCount)]
        const roomfor =rooms[Math.floor(Math.random() * roomsCount)]

          return await reservation.create({
            data:{
              roomId:roomfor.id,
                userId:allUsers.id,
                
                startDate:faker.date.soon({ days: counterDate() }),
                endDate:faker.date.soon({days:counterDate()})
            }
          
           
          });
        })
      )
    }


SEED()