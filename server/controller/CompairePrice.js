const { room,hotel } = require('../database/index');
//get all room where location 
//check if the room available 
//compair price 
const axios = require('axios');
const xml2js = require('xml2js');
const geolib = require('geolib');

module.exports={
    getRoomPrice: async function(req,res) {
        try {
          
        
            // const {roomId}=req.params
            const { price ,plan,startDate,endDate} = req.body;
       console.log(req.body);
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
      //       const x=  geolib.isPointWithinRadius(
      //      { latitude: allHotel.latitude, longitude: allHotel.longitude},
      //      { latitude: 31.60138675244711 , longitude:5.159016619732938 },
      //      3000
      //  );
      const allHotel=await hotel.findMany()
      let isWithinRadius = false;
       for (let i = 0; i < allHotel.length; i++) {
        const hotel = allHotel[i];
        if (geolib.isPointWithinRadius(
          { latitude: hotel.latitude, longitude: hotel.longitude },
          { latitude: 31.60138675244711, longitude: 5.159016619732938 },
          3000
        )) {
          isWithinRadius = true;
          break;
        }
      }
      
      if (!isWithinRadius) {
        res.send('no hotel');
        return;
      }

       const allRooms=await room.findMany({
     where:{
      
       price:{ 
          lte:price,
          
         },
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
          dayAvailability:{
           where:{
            bookings:{
              none:{
                
              }
            }
           }
          }
        },
        take:5
       })

res.send(allRooms)


        } catch (error) {
            console.error('Error retrieving room with lower price:', error);
            throw error;
        }
    }
 
}