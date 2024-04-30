const {user, message} = require("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    register:async function(req,res){
     try {
        const {firstName,lastName,email,password,location,imgUrl,phoneNumber,}=req.body
        const saltRounds = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser=await user.create({data:{firstName,lastName,email,password:passwordHash,location,imgUrl,phoneNumber:parseInt(phoneNumber)}})
        res.status(200).send(newUser)   
     } catch (error) {  
        throw error
     }
    },
 
    login:async function(req,res){
     const {email,password}=req.body
     const foundUser=await user.findUnique({where:{email}})
     if(!foundUser){
        return res.status(400).json('Your email Is Not Exist')
     }
     const clean = await bcrypt.compare(password, foundUser.password)
     if(!clean){
        return res.status(400).json('Your password Is Not Exist')
     }
     const token = jwt.sign({ id: foundUser.id },  process.env.SECRET_KEY);
     console.log(token);
     delete foundUser.password;
     res.status(200).send({ token, user: foundUser });
    },

    
    getOne:async function(req,res){
        try {
            const users= await user.findFirst({ where: { id:req.user.userId } })
            res.status(200).send(users)    
        } catch (error) {
            throw error    
        }
    },

    update: async function(req, res) {
        try {
            const { firstName, lastName, imageUrl, password, email, location } = req.body;
            const userId = req.user.userId;

            let updateData = {};
            if (firstName) updateData.firstName = firstName;
            if (lastName) updateData.lastName = lastName;
            if (imageUrl) updateData.imageUrl = imageUrl;
            if (password) {
                const saltRounds = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, saltRounds);
                updateData.password = passwordHash;
            }
            if (email) updateData.email = email;
            if (location) updateData.location = location;

            const updatedUser = await user.update({
                where: { id: userId },
                data: updateData,
            });
            delete updatedUser.password;
            res.status(200).send(updatedUser);
        } catch (error) {
            throw error;
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
