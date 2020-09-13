const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Get list of users
router.get("/users", function (req, res, next) {
  User.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)],
        },
        distanceField: "dist.calculated",
        maxDistance: 100000,
        spherical: true,
      },
    },
  ]).then(function (users) {
    res.send(users);
  }).catch(next)
});

// Add a new user
router.post("/users", function (req, res, next) {
  User.create(req.body)
    .then(function (resp) {
      res.send(resp);
    })
    .catch(next);
});

// Update a user
router.put("/users/:id", function (req, res, next) {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    User.findOne({ _id: req.params.id }).then(function (user) {
      res.send(user);
    });
  }).catch(next)
});

// Delete a user
router.delete("/users/:id", function (req, res, next) {
  User.findByIdAndRemove({ _id: req.params.id })
    .then(function (resp) {
      res.send({ message: "User deleted successfuly", resp });
    })
    .catch(next);
});

module.exports = router;
