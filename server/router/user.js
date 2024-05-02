const router = require('express').Router();
const user=require('../controller/user.js');

const securite=require('../midellware/midelware.js')
const verifyUser=require('../midellware/VerifyUser.js')





router.post('/register',securite,user.register)
router.post('/login',user.login)
router.get("/user",verifyUser,user.getOne)

router.put("/update",user.update)

router.get("/allUser",user.getAll)




module.exports = router;