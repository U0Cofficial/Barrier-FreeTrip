const express = require("express");
const router = express.Router();
const { recommendTravel } = require("../controllers/travelController");

router.post("/recommend", recommendTravel);
module.exports = router;