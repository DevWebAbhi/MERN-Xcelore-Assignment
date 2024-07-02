const jwt = require('jsonwebtoken');
const registrationModel = require('../models/registrationModel');

async function tokenAuthentication(req,res,next){
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({ message: "Authorization header missing or malformed" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_CODE);
        if(decoded && decoded.email){
            const user = await registrationModel.findOne({email:decoded.email});
            if(user){
                req.body.email = user.email;
                req.body.userType = user.userType;
                next();
            }else{
                return res.status(401).send({message:"Unauthorized"});
            }
        }else{
            return res.status(401).send({message:"Unauthorized"});
        }
        
    } catch (error) {
        return res.status(500).send({message:"Internal server error"});
    }
}

module.exports = tokenAuthentication;