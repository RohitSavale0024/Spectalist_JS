const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const conn = require('./DB/conn.js');
const path = require('path');
const signupR = require('./routes/user_signup.js');
const transactionsDB = require('./DB/models/gateway.js');
const UserDB = require('./DB/models/user');
const signinR = require('./routes/user_signin.js');
const images = require('./routes/spectacles.js');
const cartDB = require('./DB/models/cart.js')
const gatewayR = require('./routes/gateway.js')
const app = express()
app.use(express.json())
conn();

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("home")
})

app.post('/api/gateway', async (req, res) => {
    const { data, gatewayData, loginData } = req.body;
    //console.log(data, gatewayData, loginData);
    try {
        const user = await UserDB.findOne({ _id: loginData["_id"] });
        if (!user) {
            return res.json({ status: "failed", data: "couldn't retrive user information" })
        }
        //console.log(user.password , data.password, user);
        if (user.password === data.password) {
            const deleteUserItem = await cartDB.deleteOne({ itemName: gatewayData[0], userId: loginData["_id"] });
            if (!deleteUserItem) {
                return res.json({ status: "ok", data: "couldn't find user data in card database" })
            }
            // console.log(findUserItem);
            const response = await transactionsDB.create({ userID: loginData["_id"], productName: gatewayData[0], quantity: gatewayData[2], ammount: gatewayData[2] * gatewayData[1] });
            if (!response) {
                return res.json({ status: "failed", data: "couldn't complete transaction" })
            }
            return res.json({ status: "ok", data: "success" })
        } else {
            return res.json({ status: "failed", data: "couldn't authenticate user information" })
        }
    } catch (error) {
        return res.json({ status: "failed", data: error })
    }
})


app.post("/api/updateCartItem", async (req, res) => {
    //console.log("hello");
    //console.log(req.body);
    const { operation, cartItemId } = req.body;
    try {
        const cartItem = await cartDB.findOne({ _id: cartItemId });

        if (!cartItem) {
            return res.json({ status: "failed", data: "Cart item not found" });
        }

        let updatedAmount = cartItem.amount;
       // console.log(updatedAmount);
        if (operation === "increment") {
            updatedAmount++;
        } else if (operation === "decrement") {
            if (updatedAmount === 1) {
                const deleteRecord = await cartDB.deleteOne({_id: cartItemId});
                if (!deleteRecord) {
                    return res.json({status: "failed", data: "couldn't remove item from cart"})
                }
                return res.json({ status: "ok", data: "success" });
            }
            if (updatedAmount > 0) {
                updatedAmount--;
            } else {
                return res.json({ status: "failed", data: "Quantity cannot be negative" });
            }
        } else {
            return res.json({ status: "failed", data: "Invalid operation" });
        }

        const response = await cartDB.updateOne(
            { _id: cartItemId },
            { $set: { amount: updatedAmount } }
        );

        if (!response) {
            return res.json({ status: "failed", data: "Couldn't update quantity" });
        }
        return res.json({ status: "ok", data: "success" });
    } catch (error) {
        return res.json({ status: "failed", data: `Internal server Error: ${error}` });
    }
});





app.use("/", signupR);
app.use("/", signinR);
app.use("/", images);
app.use("/", gatewayR);


app.listen(5000, () => console.log('server running on port 5000'));