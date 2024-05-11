const { room,hotel, dayAvailability } = require('../database/index');
//get all room where location 
//check if the room available 
//compair price 
const axios = require('axios');
const xml2js = require('xml2js');
const geolib = require('geolib');
const { default: hotels } = require('../../client/src/component/const/Hotels');

module.exports={
 
      getRoomPrice : async function(req,res) {
       try {
         
  
          
        
            // const {roomId}=req.params
            const { plan,price,hotelId,view,numRoom} = req.body;
       console.log(req.body);
       
      //  const allHotel=await hotel.findMany()
      // let isWithinRadius = false;
      //  for (let i = 0; i < allHotel.length; i++) {
      //   const hotel = allHotel[i];
      //   if (geolib.isPointWithinRadius(
      //     { latitude: hotel.latitude, longitude: hotel.longitude },
      //     { latitude:71.30994406080413, longitude:-7.260155703939063 },
      //     3000
      //   )) {
      //     isWithinRadius = true;
      //     break;
      //   }
      // }
      
      // if (!isWithinRadius) {
      //   res.send('no hotel');
      //   return;
      // }

      // let numRoom = req.query.numRoom;
      
       
       
          const map = await room.findMany({
          // hotel id 
         where:{
         hotelId:hotelId
         },

          include:{
              dayAvailability:{
                where:{

                  availability:true
                }
            },
            option:{
              select:{
                Meal_Plan:true
              }
            
            }
            
  
            },
            
           
            take:Number(numRoom)
          });

        
     
   
      
        
      
          
        

        const allRooms=await room.findMany({
      where:{
       OR:[
         {price:{ 
            lte:price,
            
           }},
           {dayAvailability:{
            some:{
              availability:true
            }
           }},
           {view:{equals:view}}
       ],
           } ,
         include:{
             hotel: true,
           option:{
               select:{
                   Meal_Plan:true
                 },
                 where:{
               AND:[
                 {Meal_Plan:{equals:plan}}
                ]
             }
           },
           
         },
         take:3
        })

        res.send({mainRooms:map,relatedRooms:allRooms});


        

} catch (error) {
throw error
}
}
}
//  const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=xml&lat=${latitude}&lon=${longitude}&accept-language=en`);
//  const parser = new xml2js.Parser();
       //  const cityName = await new Promise((resolve, reject) => {
       //    parser.parseString(response.data, function(err, result) {
       //      if (err) {
       //        reject(err);
       //      } else {
       //        const addressparts = result.reversegeocode.addressparts[0];
       //        let cityName;
       //        if (addressparts.city) {
       //          cityName = addressparts.city[0];
       //        } else if (addressparts.town) {
       //          cityName = addressparts.town[0];
       //        } else if (addressparts.village) {
       //          cityName = addressparts.village[0];
       //        } else if (addressparts.hamlet) {
       //          cityName = addressparts.hamlet[0];
       //        } 
       //        resolve(cityName);
       //      }
       //    });
       //  });
       //  console.log('yess',cityName);