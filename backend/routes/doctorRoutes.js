const express = require("express");
const router = express.Router();
const { addDoctor, getDoctors } = require("../controllers/doctorController");

router.post("/doctors", addDoctor);
router.get("/doctors", getDoctors);

module.exports = router;
