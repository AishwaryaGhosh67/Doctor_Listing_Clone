const Doctor = require("../models/Doctor");

exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDoctors = async (req, res) => {
  const { specialty, location, name, page = 1, limit = 5 } = req.query;
  const query = {};

  if (specialty) query.specialty = specialty;
  if (location) query.location = location;
  if (name) query.name = { $regex: name, $options: "i" };

  try {
    const doctors = await Doctor.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Doctor.countDocuments(query);

    res.json({ doctors, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
