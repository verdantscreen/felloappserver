let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");
let placeModel = sequelize.import("../models/place");

// post place
router.post("/trip:tripid/addplace", function (req, res) {
  console.log("place create test");
  var placedata = placedata;
  let date = req.body.placedata.date;
  let place = req.body.placedata.place;
  let purpose = req.body.placedata.purpose;
  let spend = req.body.placedata.spend;
  let goBack = req.body.placedata.goBack;
  let tripid = req.params.tripid;

  placeModel
    .create({
      date: date,
      place: place,
      purpose: purpose,
      spend: spend,
      goBack: goBack,
      tripId: tripid,
    })
    .then(
      function createSuccess(placedata) {
        res.json({
          placedata: placedata,
        });
      },
      function createError(err) {
        res.send(500, err.message);
        console.log("create place error");
      }
    );
});

// get all places
router.get("/trip:tripid/allplaces", function (req, res) {
  let tripid = req.params.tripid;

  placeModel
    .findAll({
      where: { tripId: tripid },
    })
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
        console.log("get all places error")
      }
    );
});

// get single place
router.get("/trip:tripid/place:id", function (req, res) {
  let data = req.params.id;
  let tripid = req.params.tripid;

  placeModel
    .findOne({
      where: { id: data, tripId: tripid },
    })
    .then(
      function findOneSuccess(data) {
        res.json(data);
      },
      function findOneError(err) {
        res.send(500, err.message);
        console.log("get single place error")
      }
    );
});

// update single place 
router.put("/trip:tripid/place:id", function (req, res) {
  var placedata = req.body.placedata;
  let date = req.body.placedata.date;
  let place = req.body.placedata.place;
  let purpose = req.body.placedata.purpose;
  let spend = req.body.placedata.spend;
  let goBack = req.body.placedata.goBack;
  let data = req.params.id;
  let tripid = req.params.tripid;

  placeModel
    .update(
      {
        date: date,
        place: place,
        purpose: purpose,
        spend: spend,
        goBack: goBack,
        tripId: tripid
      },
      { where: { id: data, tripId: tripid } }
    )
    .then(
      function updateSuccess(updatedPlace) {
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
router.delete("/trip:tripid/place:id", function (req, res) {
  let data = req.params.id;
  let tripid = req.params.tripid;

  placeModel
    .destroy({
      where: { id: data, tripId: tripid },
    })
    .then(
      function deleteplaceSuccess(data) {
        res.send(" place deleted successfully");
      },
      function deleteplaceError(err) {
        res.send(500, err.message);
        console.log("delete single  place error")
      }
    );
});

module.exports = router;
