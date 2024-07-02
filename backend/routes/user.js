const express = require("express");
const {signupSchema,loginSchema} = require("../controllers/signupSchema");
const registrationModel = require("../models/registrationModel");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    
    try {
        console.log(req.body);
        const { firstName, lastName, email, password } = req.body;
        const { error } = signupSchema.validate({ firstName, lastName, email, password }, { abortEarly: false });
        if (error) {
            return res.status(401).send({ message: error.details.map(err => err.message).join(', ') });
        }
        const check = await registrationModel.findOne({email})
        if(check){
            return res.status(200).send({ message: "User already registered" });
        }
        const user = new registrationModel({
            firstName,
            lastName,
            email,
            password
        });
        await user.save();
        return res.status(200).send({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});

userRouter.post("/login", async (req, res) => {
    
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const { error } = loginSchema.validate({ email, password }, { abortEarly: false });
        if (error) {
            return res.status(401).send({ message: error.details.map(err => err.message).join(', ') });
        }

        const user = await registrationModel.findOne({email,password});
        
        if(user){
            const token = jwt.sign({firstName:user.firstName,lastName:user.lastName,userType:user.userType,id:user.id},process.env.JWT_CODE);
            return res.status(200).send({ message: "User login successful" ,XceloreToken:token});
        }
        return res.status(401).send({ message: "unauthorized" });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});
module.exports = userRouter;
