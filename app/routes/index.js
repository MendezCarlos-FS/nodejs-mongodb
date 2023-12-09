const express = require("express");
const router = express.Router();
const authorRoutes = require("./authorRoute");

router.get("/", (req, res) => {
    res.status(200).json({ success: true, message: `${req.method} - Request made`});
});

router.use('/authors', authorRoutes);

module.exports = router;