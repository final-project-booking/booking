const express = require("express")
require('dotenv').config()
let app = express()
const cors=require('cors')
const ownerRouter=require('./router/owner')
const userRouter=require('./router/user')


const userRoute=require('./router/user')

const search=require('./router/search')




// app.use(express.static(__dirname + "/../client/dist"))
app.use(express.json())
app.use(cors())


app.use(express.json());
app.use('/api/search',search)


app.use('/api/auth',userRouter)
app.use('/api/owner',ownerRouter)


app.use('/api/search',search)



app.use("/api/user",userRoute)

let port = 3001

app.listen(port, function () {
  console.log(`listening on port ${port}`)
})
