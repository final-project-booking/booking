const jwt = require('jsonwebtoken');

const verifyUser=(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token,process.env.SECRET_KEY );
        const userId = decodedToken.id;
        console.log("header",decodedToken);
        if (!userId) {
          return res.status(401).send('user is not authorized')
        } else {
        req.user={userId}
          next();
        }
      } catch {
        res.status(401).json({
          message:'Invalid request!'
        });
      }
}
module.exports=verifyUser