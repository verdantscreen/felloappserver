let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");
let thingModel = sequelize.import("../models/thing");

// post pack item
router.post("/", function (req, res) {
  console.log("quantity create test");
  let item = req.body.packdata.item;
  let quantity = req.body.packdata.quantity;
  let packed = req.body.packdata.packed;
  let repacked = req.body.packdata.repacked;
  let tripid = req.user.id.trip.id;
  let userid = req.user.id;

  thingModel
    .create({
      item: item,
      quantity: quantity,
      packed: packed,
      repacked: repacked,
      tripId: tripid,
      userId: userid
    })
    .then(
      function createSuccess(packdata) {
        res.json({
          packdata: packdata,
        });
      },
      function createError(err) {
        res.send(500, err.message);
        console.log("create trip error");
      }
    );
});

// get all packed items
router.get("/", function (req, res) {
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
        console.log("get all trips error")
      }
    );
});

// // get single trip
// router.get("/:id", function (req, res) {
//   let data = req.params.id;
//   let userid = req.user.id;
//   let tripid = req.user.id.trip.id;

//   thingModel
//     .findOne({
//       where: { id: data, userId: userid, tripId: tripid },
//     })
//     .then(
//       function findOneSuccess(data) {
//         res.json(data);
//       },
//       function findOneError(err) {
//         res.send(500, err.message);
//         console.log("get single trip error")
//       }
//     );
// });

// update single quantity
router.put("/:id", function (req, res) {
  let date = req.body.packdata.date;
  let quantity = req.body.packdata.quantity;
  let data = req.params.id;
  var packdata = req.body.packdata;
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thingModel
    .update(
      {
        date: date,
        quantity: quantity,
        userId: userid,
        tripId = tripid
      },
      { where: { id: data } }
    )
    .then(
      function updateSuccess(updatedTrip) {
        /* ? */
        res.json({
          packdata: packdata,
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
  let tripid = req.user.id.trip.id;

  thingModel
    .destroy({
      where: { id: data, userId: userid, tripId: tripid },
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
