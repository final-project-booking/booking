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
    
        const token = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY);
        // console.log(token);
        delete foundUser.password;
        res.status(200).send({ token, user: foundUser });
    },
    checkOldPassword: async (req, res) => {
        const { oldPassword } = req.body;
        const { id } = req.params;
      
        try {
          const foundUser = await user.findUnique({ where: { id: parseInt(id) } });
          if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          const hashedPassword = foundUser.password;
      
          
      
          const passwordMatches = await bcrypt.compare(String(oldPassword), String(hashedPassword));
          if (!passwordMatches) {
            return res.status(401).json({ isTrue: false });
          }
      
          return res.status(200).json({ isTrue: true });
        } catch (error) {
          console.error('Error checking old password:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
    
      ,

    
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

    update: async (req, res)=>{
        try {
            let id = req.params.id
            const {firstName,lastName,email,password,imgUrl,phoneNumber}=req.body
            const saltRounds = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, saltRounds);
            const users=await user.update({data:{firstName,lastName,email,password:passwordHash,imgUrl,phoneNumber},where:{id:parseInt(id)}})
            res.status(200).send(users)
        } catch (error) {
            throw error
        }
    },

    getAll:async function(req,res){
        try {
            const users= await user.findMany()
            res.status(200).send(users)    
        } catch (error) {
            throw error    

        }
    }
}
