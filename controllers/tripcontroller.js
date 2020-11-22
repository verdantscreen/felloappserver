let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");

// post trip
router.post("/", function (req, res) {
  console.log("trip create test");
  let owner = req.user.id;
  let destination = req.body.tripdata.destination;
  let departDate = req.body.tripdata.departDate;
  let returnDate = req.body.tripdata.returnDate;
  let companions = req.body.tripdata.companions;
  let occasion = req.body.tripdata.occasion;

  tripModel
    .create({
      destination: destination,
      departDate: departDate,
      returnDate: returnDate,
      companions: companions,
      occasion: occasion,
      owner_id: owner,
    })
    .then(
      function createSuccess(tripdata) {
        res.json({
          tripdata: tripdata,
        });
      },
      function createError(err) {
        res.send(500, err.message);
        console.log("create trip error");
      }
    );
});

// get all trips
router.get("/", function (req, res) {
  let userid = req.user.id;

  tripModel
    .findAll({
      where: { owner_id: userid },
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
  let userid = req.user.id;

  tripModel
    .findOne({
      where: { id: data, owner_id: userid },
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
  let destination = req.body.tripdata.destination;
  let departDate = req.body.tripdata.departDate;
  let returnDate = req.body.tripdata.returnDate;
  let companions = req.body.tripdata.companions;
  let occasion = req.body.tripdata.occasion;
  let data = req.params.id;
  var tripdata = req.body.tripdata;
  let userid = req.user.id;

  tripModel
    .update(
      {
        destination: destination,
        departDate: departDate,
        returnDate: returnDate,
        companions: companions,
        occasion: occasion,
        owner_id: userid /* ? */,
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
  let userid = req.user.id;

  tripModel
    .destroy({
      where: { id: data, owner_id: userid },
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
