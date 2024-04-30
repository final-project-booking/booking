// Import your database client library (e.g., PrismaClient)
const { PrismaClient } = require('@prisma/client');

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Define seed data
const users = [
  {
    imgUrl: "https://example.com/avatar1.jpg",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "password123",
    phoneNumber: 1234567890,
    location: "New York",
    role: "user",
  },
  // Add more user objects as needed
];

const hotels = [
  {
    name: "Luxury Resort",
    location: "Hammemet",
    imgUrl:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/386480587.jpg?k=199f2fdf3a84e8ae5d42d07f28b7723b528cbe56599b24390d9adfd58ae3e310&o=&hp=1",
    description: "Experience luxury at its finest with stunning ocean views and world-class amenities.",
    rating: 5,
    rooms: 100,
    licence: "123-456-789",
    ownerId: 1,
    room:[{
        hotelId: hotel1.id,
        price: 300,
        imgUrl: "https://example.com/room1.jpg",
        option: [{
            all_Inclusive,
            breakFast,
            halfBoard
        }],
        view: "seaView",
    }]
  },
  {
    name: "Marhaba hotel",
    location: "Sousse",
    imgUrl:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/38/af/1b/hotel-royal-azur-thalassa.jpg?w=1200&h=-1&s=1",
    description: "Conveniently located in the heart of the city, offering modern comfort and easy access to attractions.",
    rating: 4,
    rooms: 150,
    licence: "987-654-321",
    ownerId: 2,
    room:[{
        hotelId: hotel2.id,
        price: 200,
        imgUrl: "https://example.com/room1.jpg",
        option: [{
            all_Inclusive,
            breakFast,
            halfBoard
        }],
        view: "seaView",
    }]
  },
  {
    name: "Sheraton Tunis Hotel",
    location: "tunis",
    imgUrl:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/81/96/aa/sheraton-tunis-hotel.jpg?w=1200&h=-1&s=1",
    description: "Conveniently located in the heart of the city, offering modern comfort and easy access to attractions.",
    rating: 5,
    rooms: 125,
    licence: "987-654-321",
    ownerId: 3,
    room:[{
        hotelId: hotel3.id,
        price: 250,
        imgUrl: "https://example.com/room1.jpg",
        option: [{
            all_Inclusive,
            breakFast,
            halfBoard
        }],
        view: "standerView",
    }]
  },
  {
    name: "JAZ Tour Khalef Hotel",
    location: "tunis",
    imgUrl:"https://cdn2.tqsan.com/booking/jaz-tour-khalef/Hotel-4775-20170608-114603.jpg",
    description: "Conveniently located in the heart of the city, offering modern comfort and easy access to attractions.",
    rating: 5,
    rooms: 130,
    licence: "987-654-321",
    ownerId: 2,
    room:[{
        hotelId: hotel4.id,
        price: 230,
        imgUrl: "https://example.com/room1.jpg",
        option: [{
            all_Inclusive,
            breakFast,
            halfBoard
        }],
        view: "standerView",
    }]
  },
//   {
//     name: "Iberostar Selection Royal El Mansour",
//     location: "Mahdia",
//     imgUrl:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d6/c0/cf/iberostar-selection-royal.jpg?w=700&h=-1&s=1",
//     description: "Conveniently located in the heart of the city, offering modern comfort and easy access to attractions.",
//     rating: 4,
//     rooms: 160,
//     licence: "987-654-321",
//     ownerId: 2,
//   },
//   {
//     name: "Iberostar Selection Royal El Mansour",
//     location: "Mahdia",
//     imgUrl:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/27609644.jpg?k=23dc2a8c597a24238ce8da1ba8501e4aeb6adeead994edef2df506adf0f4271a&o=&hp=1",
//     description: "The Iberostar Selection Royal El Mansour hotel is found on the seafront of the marvellous beach in Mahdia, Tunisia. This 5-star hotel is designed for couples and families with children and it offers everything necessary to spend some days of pleasure,",
//     rating: 4,
//     rooms: 135,
//     licence: "987-654-321",
//     ownerId: 2,
//   },
//   {
//     name: "Mövenpick Hotel Gammarth Tunis",
//     location: "Gammarth",
//     imgUrl:"https://tunisie.co/uploads/images/content/moevenpick-gammarth-250417-v.jpg",
//     description: "The Iberostar Selection Royal El Mansour hotel is found on the seafront of the marvellous beach in Mahdia, Tunisia. This 5-star hotel is designed for couples and families with children and it offers everything necessary to spend some days of pleasure,",
//     rating: 4,
//     rooms: 100,
//     licence: "987-654-321",
//     ownerId: 2,
//   },
//   {
//     name: "Mövenpick Hotel Gammarth Tunis",
//     location: "Gammarth",
//     imgUrl:"https://tunisie.co/uploads/images/content/moevenpick-gammarth-250417-v.jpg",
//     description: "The Iberostar Selection Royal El Mansour hotel is found on the seafront of the marvellous beach in Mahdia, Tunisia. This 5-star hotel is designed for couples and families with children and it offers everything necessary to spend some days of pleasure,",
//     rating: 4,
//     rooms: 50,
//     licence: "987-654-321",
//     ownerId: 2,
//   },
  
];

// Define a function to seed the data
async function seed() {
  try {
    // Seed users
    // for (const user of users) {
    //   await prisma.user.create({
    //     data: user,
    //   });
    // }

    // Seed hotels
    for (const hotel of hotels) {
      await prisma.hotel.create({
        data: hotel,
      });
    }

    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  } finally {
    // Disconnect from the PrismaClient
    await prisma.$disconnect();
  }
}

// Call the seed function
seed();
