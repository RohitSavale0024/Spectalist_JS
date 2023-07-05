const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const conn = require('./DB/conn.js');
const path = require('path');

const app = express() 
conn();

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.set("view engine" , "ejs")  

app.get('/', (req, res) => {
    res.render("home")
})

app.listen(5000, () => console.log('server running on port 5000'));