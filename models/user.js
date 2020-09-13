const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

// Create user Schema & model
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
  },
  phone: {
    type: String,
    default: null,
  },
  geometry: GeoSchema,
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
