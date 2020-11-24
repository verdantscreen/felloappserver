let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");
let thoughtModel = sequelize.import("../models/thought");

// post entry
router.post("/", function (req, res) {
  console.log("entry create test");
  let userid = req.user.id;
  let date = req.body.entrydata.date;
  let entry = req.body.entrydata.entry;
  let tripid = req.user.id.trip.id;

  thoughtModel
    .create({
      date: date,
      entry: entry,
      tripId: tripid,
      userId: userid
    })
    .then(
      function createSuccess(entrydata) {
        res.json({
          entrydata: entrydata,
        });
      },
      function createError(err) {
        res.send(500, err.message);
        console.log("create trip error");
      }
    );
});

// get all entries
router.get("/", function (req, res) {
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thoughtModel
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

//   thoughtModel
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

// update single entry
router.put("/:id", function (req, res) {
  let date = req.body.entrydata.date;
  let entry = req.body.entrydata.entry;
  let data = req.params.id;
  var entrydata = req.body.entrydata;
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thoughtModel
    .update(
      {
        date: date,
        entry: entry,
        userId: userid,
        tripId = tripid
      },
      { where: { id: data } }
    )
    .then(
      function updateSuccess(updatedTrip) {
        /* ? */
        res.json({
          entrydata: entrydata,
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

  thoughtModel
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
