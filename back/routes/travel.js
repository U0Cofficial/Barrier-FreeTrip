const express = require("express");
const router = express.Router();
const { getTravelRecommendation } = require("../controllers/travelController");

router.post("/recommend", getTravelRecommendation);
module.exports = router;