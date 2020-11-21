let router = require("express").Router();
const { Router } = require("express");
// const { Module } = require('module');
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");

// post trip
router.post("/", function (req, res) {
  console.log("trip create test");
  // var tripdata = tripdata;
  let userId = req.user.id;
  let destination = req.body.tripdata.destination;
  let occasion = req.body.tripdata.occasion;
  let departDate = req.body.tripdata.departDate;
  let returnDate = req.body.tripdata.returnDate;
  let companions = req.body.tripdata.companions;

  tripModel
    .create({
      userId: userId,
      destination: destination,
      occasion: occasion,
      departDate: departDate,
      returnDate: returnDate,
      companions: companions,
    })
    .then(
      function createSuccess(tripdata) {
        res.json({
          tripdata: tripdata,
        });
      },
      function createError(err) {
        console.log("create trip error");
        res.send(500, err.message);
      }
    );
});

// get all trips
router.get("/", function (req, res) {
  let userId = req.user.id;

  tripModel
    .findAll({
      where: { userId: userId },
    })
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
        console.log("get all trips error")
      }
    );
});

// get single trip
router.get("/:id", function (req, res) {
  let data = req.params.id;
  let userId = req.user.id;

  tripModel
    .findOne({
      where: { id: data, userId: userId },
    })
    .then(
      function findOneSuccess(data) {
        res.json(data);
      },
      function findOneError(err) {
        res.send(500, err.message);
        console.log("get single trip error")
      }
    );
});

// update single trip
router.put("/:id", function (req, res) {
  var tripdata = req.body.tripdata;
  let data = req.params.id;
  let userId = req.user.id;
  let destination = req.body.tripdata.destination;
  let occasion = req.body.tripdata.occasion;
  let returnDate = req.body.tripdata.returnDate;
  

  tripModel
    .update(
      {
        userId: userId /* ? */,
        destination: destination,
        occasion: occasion,
        departDate: departDate,
        returnDate: returnDate,
        companions: companions,
      },
      { where: { id: data } }
    )
    .then(
      function updateSuccess(updatedTrip) {
        /* ? */
        res.json({
          tripdata: tripdata,
        });
      },
      function updateError(err) {
        res.send(500, err.message);
        console.log("update single trip error")
      }
    );
});

// delete single trip
router.delete("/:id", function (req, res) {
  let data = req.params.id;
  let userId = req.user.id;

  tripModel
    .destroy({
      where: { id: data, userId: userId },
    })
    .then(
      function deleteTripSuccess(data) {
        res.send("trip deleted successfully");
      },
      function deleteTripError(err) {
        res.send(500, err.message);
        console.log("delete single trip error")
      }
    );
});

module.exports = router;
