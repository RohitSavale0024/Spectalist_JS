const express = require('express');
const mongoose = require('mongoose');
const UserDB = require('../DB/models/user');
const router = express.Router();
router.use(express.json());

router.post('/api/signup', async(req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    try {
        const response  =  await UserDB.create({username, email, password});
        // console.log('hello');
        console.log(response);
        if (!response) {
            res.json({status: "failed"});
        } else {
            res.json({status: 'ok'});
        }
    } catch (error) {
        res.json({status: "failed", stat: "aefae"});
    }
})


module.exports =  router;