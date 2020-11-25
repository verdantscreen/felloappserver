let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");
let thoughtModel = sequelize.import("../models/thought");

// post thought
router.post("/addthought", function (req, res) {
  console.log("thought create test");
  var thoughtdata = thoughtdata;
  let date = req.body.thoughtdata.date;
  let thought = req.body.thoughtdata.thought;
  let tripid = req.user.id.trip.id;
  let userid = req.user.id;

  thoughtModel
    .create({
      date: date,
      thought: thought,
      tripId: tripid,
      userId: userid
    })
    .then(
      function createSuccess(thoughtdata) {
        res.json({
          thoughtdata: thoughtdata,
        });
      },
      function createError(err) {
        res.send(500, err.message);
        console.log("create thought error");
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
        console.log("get all thoughts error")
      }
    );
});

// get single trip
router.get("/thought:id", function (req, res) {
  let data = req.params.id;
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thoughtModel
    .findOne({
      where: { id: data, userId: userid, tripId: tripid },
    })
    .then(
      function findOneSuccess(data) {
        res.json(data);
      },
      function findOneError(err) {
        res.send(500, err.message);
        console.log("get single thought error")
      }
    );
});

// update single thought
router.put("/thought:id", function (req, res) {
  let date = req.body.thoughtdata.date;
  let thought = req.body.thoughtdata.thought;
  let data = req.params.id;
  var thoughtdata = req.body.thoughtdata;
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thoughtModel
    .update(
      {
        date: date,
        thought: thought,
        userId: userid,
        tripId: tripid
      },
      { where: { id: data } }
    )
    .then(
      function updateSuccess(updatedThought) {
        /* ? */
        res.json({
          thoughtdata: thoughtdata,
        });
      },
      function updateError(err) {
        res.send(500, err.message);
        console.log("update single trip error")
      }
    );
});

// delete single trip
router.delete("/thought:id", function (req, res) {
  let data = req.params.id;
  let userid = req.user.id;
  let tripid = req.user.id.trip.id;

  thoughtModel
    .destroy({
      where: { id: data, userId: userid, tripId: tripid },
    })
    .then(
      function deleteThoughtSuccess(data) {
        res.send("Thought deleted successfully");
      },
      function deleteThoughtError(err) {
        res.send(500, err.message);
        console.log("delete single thought error")
      }
    );
});

module.exports = router;
