let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");
let thingModel = sequelize.import("../models/thing");

// post pack thing /mytrips/:id
router.post("/:trip/addthing", function (req, res) {
  console.log("pack thing create test");
  var packdata = packdata;
  let thing = req.body.packdata.thing;
  let quantity = req.body.packdata.quantity;
  let packed = req.body.packdata.packed;
  let repacked = req.body.packdata.repacked;
  let tripid = req.params.id; //incorrect? //express
  // let userid = req.user.id; // not needed?

  thingModel
    .create({
      thing: thing,
      quantity: quantity,
      packed: packed,
      repacked: repacked,
      tripId: tripid,
      // userId: userid
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

// get all packed things /mytrips/:id
router.get("/:trip/allthings", function (req, res) {
  let userid = req.user.id;
  let tripid = req.params.trip;

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
        console.log("get all pack things error")
      }
    );
});

// get single pack thing /mytrips/:id
router.get("/thing/:id", function (req, res) {
  let userid = req.user.id;
  let tripid = req.params.trip;

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
        console.log("get single thing error")
      }
    );
});

// update single pack thing
router.put("/thing/:id", function (req, res) {
  var packdata = req.body.packdata;
  let thing = req.body.packdata.thing;
  let quantity = req.body.packdata.quantity;
  let packed = req.body.packdata.packed;
  let repacked = req.body.packdata.repacked;
  let data = req.params.id;
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thingModel
    .update(
      {
        thing: thing,
        quantity: quantity,
        packed: packed,
        repacked: repacked,
        userId: userid,
        tripId: tripid
      },
      { where: { id: data, userId: userid, tripId: tripid } }
    )
    .then(
      function updateSuccess(updatedThing) {
        /* ? */
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
router.delete("/:id/thing", function (req, res) {
  let data = req.params.id;
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thingModel
    .destroy({
      where: { id: data, userId: userid, tripId: tripid },
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
