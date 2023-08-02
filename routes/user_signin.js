const express = require('express');
const mongoose = require('mongoose');
const UserDB = require('../DB/models/user');
const router = express.Router();
router.use(express.json());

router.post('/api/signin', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        let user = await UserDB.findOne({ email });
        if (!user) {
            // return res.json({status: "Failed!" }).end();
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        if (password === user.password) {
            // console.log("Hello")
            return res.json({ status: "ok", data: user });
        }
        // Password doesn't match
        return res.status(400).json({ error: 'Invalid email or password' });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }

})

module.exports = router;