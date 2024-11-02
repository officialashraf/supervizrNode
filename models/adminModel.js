const mongoose = require('mongoose');

// Define the admin schema
const adminSchema = new mongoose.Schema({

  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  }

}, { versionKey: false });

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
