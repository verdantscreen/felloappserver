let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");
let placeModel = sequelize.import("../models/place");

// post place
router.post("/trip:tripId/addplace", function (req, res) {
  console.log("place create test");
  var placedata = placedata;
  let date = req.body.placedata.date;
  let place = req.body.placedata.place;
  let purpose = req.body.placedata.purpose;
  let spend = req.body.placedata.spend;
  let goBack = req.body.placedata.goBack;
  let tripId = req.body.packdata.tripId;

  placeModel
    .create({
      date: date,
      place: place,
      purpose: purpose,
      spend: spend,
      goBack: goBack,
      tripId: tripId,
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
router.get("/trip:tripId/allplaces", function (req, res) {
  let tripId = req.body.packdata.tripId;

  placeModel
    .findAll({
      where: { tripId: tripId },
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
router.get("/trip:tripId/place:id", function (req, res) {
  let data = req.params.id;
  let tripId = req.body.packdata.tripId;

  placeModel
    .findOne({
      where: { id: data, tripId: tripId },
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
router.put("/trip:tripId/place:id", function (req, res) {
  var placedata = req.body.placedata;
  let date = req.body.placedata.date;
  let place = req.body.placedata.place;
  let purpose = req.body.placedata.purpose;
  let spend = req.body.placedata.spend;
  let goBack = req.body.placedata.goBack;
  let data = req.params.id;
  let tripId = req.body.packdata.tripId;

  placeModel
    .update(
      {
        date: date,
        place: place,
        purpose: purpose,
        spend: spend,
        goBack: goBack,
        tripId: tripId
      },
      { where: { id: data, tripId: tripId } }
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
router.delete("/trip:tripId/place:id", function (req, res) {
  let data = req.params.id;
  let tripId = req.body.packdata.tripId;

  placeModel
    .destroy({
      where: { id: data, tripId: tripId },
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
