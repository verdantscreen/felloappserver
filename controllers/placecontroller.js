let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");
let thingModel = sequelize.import("../models/thing");

// post pack place
router.post("/addplace", function (req, res) {
  console.log("pack place create test");
  var placedata = placedata;
  let date = req.body.placedata.date;
  let place = req.body.placedata.place;
  let purpose = req.body.placedata.purpose;
  let spend = req.body.placedata.spend;
  let goBack = req.body.placedata.goBack;
  let tripid = req.user.id.trip.id;
  let userid = req.user.id;

  thingModel
    .create({
      date: date,
      place: place,
      purpose: purpose,
      spend: spend,
      goBack: goBack,
      tripId: tripid,
      userId: userid
    })
    .then(
      function createSuccess(placedata) {
        res.json({
          placedata: placedata,
        });
      },
      function createError(err) {
        res.send(500, err.message);
        console.log("create pack place error");
      }
    );
});

// get all places
router.get("/allplaces", function (req, res) {
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thingModel
    .findAll({
      where: { userId: userid, tripId: tripid },
    })
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
        console.log("get all pack places error")
      }
    );
});

// get single place
router.get("/place:id", function (req, res) {
  let data = req.params.id;
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thingModel
    .findOne({
      where: { id: data, userId: userid, tripId: tripid },
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

// update single place
router.put("/place:id", function (req, res) {
  var placedata = req.body.placedata;
  let place = req.body.placedata.place;
  let purpose = req.body.placedata.purpose;
  let spend = req.body.placedata.spend;
  let goBack = req.body.placedata.goBack;
  let data = req.params.id;
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thingModel
    .update(
      {
        date: date,
        place: place,
        purpose: purpose,
        spend: spend,
        goBack: goBack,
        userId: userid,
        tripId: tripid
      },
      { where: { id: data, userId: userid, tripId: tripid } }
    )
    .then(
      function updateSuccess(updatedTrip) {
        /* ? */
        res.json({
          placedata: placedata,
        });
      },
      function updateError(err) {
        res.send(500, err.message);
        console.log("update single trip error")
      }
    );
});

// delete single place
router.delete("/place:id", function (req, res) {
  let data = req.params.id;
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thingModel
    .destroy({
      where: { id: data, userId: userid, tripId: tripid },
    })
    .then(
      function deleteplaceSuccess(data) {
        res.send("pack place deleted successfully");
      },
      function deleteplaceError(err) {
        res.send(500, err.message);
        console.log("delete single pack place error")
      }
    );
});

module.exports = router;
