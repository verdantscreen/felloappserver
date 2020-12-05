let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");
let thingModel = sequelize.import("../models/thing");

// post pack thing /mytrips/
router.post("/trip:tripId/addthing", function (req, res) {
  console.log("pack thing create test");
  let thing = req.body.packdata.thing;
  let quantity = req.body.packdata.quantity;
  let packed = req.body.packdata.packed;
  let repacked = req.body.packdata.repacked;
  let tripId = req.body.packdata.tripId;

  thingModel
    .create({
      thing: thing,
      quantity: quantity,
      packed: packed,
      repacked: repacked,
      tripId: tripId,
    })
    .then(
      function createSuccess(packdata) {
        res.json({
          packdata: packdata,
        });
      },
      function createError(err) {
        res.send(500, err.message);
        console.log("create pack thing error");
      }
    );
});

// get all packed things /mytrips/
router.get("/trip:tripId/allthings", function (req, res) {
  let tripId = req.params.tripId;

  thingModel
    .findAll({
      where: { tripId: tripId },
    })
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
        console.log("get all pack things error")
      }
    );
});

// get single pack thing
router.get("/trip:tripId/thing:id", function (req, res) {
  let tripId = req.params.tripId;
  let id = req.params.id;

  thingModel
    .findOne({
      where: { id: id, tripId: tripId },
    })
    .then(
      function findOneSuccess(data) {
        res.json(data);
      },
      function findOneError(err) {
        res.send(500, err.message);
        console.log("get single thing error")
      }
    );
});

// update single pack thing
router.put("/trip:tripId/thing:id", function (req, res) {
  var packdata = req.body.packdata;
  let thing = req.body.packdata.thing;
  let quantity = req.body.packdata.quantity;
  let packed = req.body.packdata.packed;
  let repacked = req.body.packdata.repacked;
  let tripId = req.body.packdata.tripId;
  let data = req.params.id;

  thingModel
    .update(
      {
        thing: thing,
        quantity: quantity,
        packed: packed,
        repacked: repacked,
        tripId: tripId
      },
      { where: { tripId: tripId, id: data } }
    )
    .then(
      function updateSuccess(updatedThing) {
        res.json({
          packdata: packdata,
        });
      },
      function updateError(err) {
        res.send(500, err.message);
        console.log("update single thing error")
      }
    );
});

// delete single pack thing
router.delete("/trip:tripId/thing:id", function (req, res) {
  let tripId = req.body.packdata.tripId;
  let data = req.params.id;

  thingModel
    .destroy({
      where: { tripId: tripId, id: data },
    })
    .then(
      function deleteThingSuccess(data) {
        res.send("pack thing deleted successfully");
      },
      function deleteThingError(err) {
        res.send(500, err.message);
        console.log("delete single pack thing error")
      }
    );
});

module.exports = router;
