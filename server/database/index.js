const {PrismaClient}=require('@prisma/client')
// console.log({
//     first:"npm init",
//     second:"npm install @prisma/client",
//     third:"npm install prisma",
//     fourth:"npx prisma init",
//     fifth:"npx prisma migrate dev",
//     sixth:"npx prisma migrate dev --name create-voyage-table",
//     seventh:"npx prisma migrate dev",
//     eighth:"npx prisma generate",
    
// });

const prisma = new PrismaClient() 
async function main() {
    const allUsers = await prisma.user.findMany()
   
    // console.log('hello',allUsers)
}
  main()
    .then(async () => {
      console.error("connected successfully") 

      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
module.exports =prisma