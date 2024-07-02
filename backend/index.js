const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const dotenv = require("dotenv");
const mongoConnection = require("./config/mongodb");
const userRouter = require("./routes/user");
const tokenAuthentication = require("./middlewares/tokenAuthentication");
const adminRouter = require("./routes/admin");
dotenv.config()
app.use(cors());


app.get((req,res)=>{
    return res.status(200).send({message:"This is Xcelore assignment backend"});
})

app.use("/admin",tokenAuthentication,adminRouter);

app.use("/user",userRouter);
require('./controllers/signupSchema');
app.listen(8080,async()=>{
    try {
        await mongoConnection
        console.log("connected");
    } catch (error) {
        console.log(error)
    }
})