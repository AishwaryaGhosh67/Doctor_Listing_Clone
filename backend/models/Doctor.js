const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: Number,
  location: String,
  rating: Number,
});

module.exports = mongoose.model("Doctor", DoctorSchema);
