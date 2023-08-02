const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const conn = require('./DB/conn.js');
const path = require('path');
const signupR =  require('./routes/user_signup.js');
const transactionsDB = require('./DB/models/gateway.js');
const UserDB = require('./DB/models/user');
const signinR =  require('./routes/user_signin.js');
const images = require('./routes/spectacles.js');
const gatewayR = require('./routes/gateway.js')
const app = express() 
app.use(express.json())
conn();

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.set("view engine" , "ejs")  

app.get('/', (req, res) => {
    res.render("home")
})

app.post('/api/gateway', async(req, res) => {
    const {data, gatewayData, loginData} = req.body;
    //console.log(data, gatewayData, loginData);
    try {
        const user = await UserDB.findOne({_id: loginData["_id"]});
        if (!user) {
            return res.json({status: "failed", data: "couldn't retrive user information"})
        }
        //console.log(user.password , data.password, user);
        if (user.password === data.password) {
            const response =  await transactionsDB.create({userID: loginData["_id"], productName: gatewayData[0], quantity: gatewayData[2], ammount: gatewayData[2] * gatewayData[1]});
            if (!response) {
                return res.json({status: "failed", data: "couldn't complete transaction"}) 
            }
            return res.json({status: "ok", data: "success"})
        } else {
            return res.json({status: "failed", data: "couldn't authenticate user information"})
        }
    } catch (error) {
        return res.json({status: "failed", data: error})
    }
})

app.use("/", signupR);
app.use("/", signinR);
app.use("/", images);
app.use("/", gatewayR);


app.listen(5000, () => console.log('server running on port 5000'));