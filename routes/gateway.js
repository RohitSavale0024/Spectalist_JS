const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors);

/* router.post('/api/gateway', async(req, res) => {
    console.log(req.body)
    res.send("hello")
}) */

module.exports = router;