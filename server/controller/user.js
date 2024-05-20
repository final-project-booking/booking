const {user, message} = require("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    register:async function(req,res){
        const char="0123456789azertyuiopqsdfghjklmwxcvbn"
        let activCode=""
        for(let i=0;i<8;i++){
            activCode+=char[Math.floor(Math.random()*char.length)]
        }
     try {
        const {firstName,lastName,email,password,imgUrl,phoneNumber,latitude,longitude}=req.body
        const saltRounds = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser=await user.create({data:{firstName,lastName,email,activationCode:activCode,password:passwordHash,latitude,longitude,imgUrl,phoneNumber:parseInt(phoneNumber)}})
        res.status(200).send(newUser)   
     } catch (error) {  
        throw error
     }
    },
 
    login: async function(req, res) {
        const { email, password } = req.body;
        const foundUser = await user.findUnique({ where: { email } });
    
        if (!foundUser) {
            return res.status(400).json('Your email does not exist');
        }
    
        const clean = await bcrypt.compare(password, foundUser.password);
    
        if (foundUser && clean && !foundUser.activationCode) {
            res.send({
                message: "Check your email for activation"
            });
        }
    
        if (!clean) {
            return res.status(400).json('Your password is incorrect');
        }
    
        const token = jwt.sign({ id: foundUser.id ,role:foundUser.role }, process.env.SECRET_KEY);
        console.log(token);
        delete foundUser.password;
        res.status(200).send({ token, user: foundUser });
    },
    

    
    getOne:async function(req,res){
        try {
            let id=req.params.id
            console.log(id,"id");
            const users= await user.findUnique({ where: { id:parseInt(id)} })
            res.status(200).send(users)    
        } catch (error) {
            throw error    
        }
    },

    update: async (req, res) => {
        try {
            console.log("reached")
          let id = req.params.id
          const {firstName, lastName, email, password, imgUrl, phoneNumber, oldPassword} = req.body
            
          const userRecord = await user.findUnique({ where: { id: parseInt(id) } })
      
          if (!userRecord) {
            return res.status(404).send({ error: 'User not found' })
          }
      
          const passwordMatches = await bcrypt.compare(String(oldPassword), String(userRecord.password))
      
          if (!passwordMatches) {
            return res.status(400).json('Incorrect old password')
          }
      
          const saltRounds = await bcrypt.genSalt()
          const passwordHash = await bcrypt.hash(password, saltRounds)
      
          const updatedUser = await user.update({
            data: {firstName, lastName, email, password: passwordHash, imgUrl, phoneNumber},
            where: {id: parseInt(id)}
          })
      
          res.status(200).send(updatedUser)
        } catch (error) {
            console.log(error)
        //   console.error('Failed to update user:', error)
        //   res.status(500).send({ error: 'Error updating user' })
        }
      },

    getAll:async function(req,res){
        try {
            const users= await user.findMany()
            res.status(200).send(users)    
        } catch (error) {
            throw error    

        }
    },
    banUser:async(req,res)=>{
        try {
            let id=req.params.id

            const users=await user.findUnique({ where: { id:parseInt(id)}})
            const update=await user.update({ where: { id:parseInt(users.id)},data:{
                isActive:!users.isActive
            } })
            res.json(update)
        } catch (error) {
            throw error
        }
    }
}