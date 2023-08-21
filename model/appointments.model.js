const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    enum: ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Psychiatrist'],
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  slots: {
    type: Number,
    required: true
  },
  fee: {
    type: Number,
    required: true
  }
});


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports={
    Appointment
}
