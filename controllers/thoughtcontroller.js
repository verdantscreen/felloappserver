let router = require("express").Router();
const { Router } = require("express");
const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");
let thoughtModel = sequelize.import("../models/thought");

// post thought
router.post("/trip:tripId/addthought", function (req, res) {
  console.log("thought create test");
  var thoughtdata = thoughtdata;
  let date = req.body.thoughtdata.date;
  let thought = req.body.thoughtdata.thought;
  let tripId = req.body.packdata.tripId;

  thoughtModel
    .create({
      date: date,
      thought: thought,
      tripId: tripId,
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
router.get("/trip:tripId/allthoughts", function (req, res) {
  let tripId = req.params.tripId;
  
  thoughtModel
    .findAll({
      where: { tripId: tripId },
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

// get single thought
router.get("/trip:tripId/thought:id", function (req, res) {
  let tripId = req.params.tripId;
  let data = req.params.id;
  
  thoughtModel
    .findOne({
      where: { id: data, tripId: tripId },
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
router.put("/trip:tripId/thought:id", function (req, res) {
  var thoughtdata = req.body.thoughtdata;
  let date = req.body.thoughtdata.date;
  let thought = req.body.thoughtdata.thought;
  let tripId = req.params.tripId;
  let data = req.params.id;
  
  thoughtModel
    .update(
      {
        date: date,
        thought: thought,
        tripId: tripId
      },
      { where: { tripId: tripId, id: data } }
    )
    .then(
      function updateSuccess(updatedThought) {
        res.json({
          thoughtdata: thoughtdata,
        });
      },
      function updateError(err) {
        res.send(500, err.message);
        console.log("update single thought error")
      }
    );
});

// delete single thought
router.delete("/trip:tripId/thought:id", function (req, res) {
  let tripId = req.params.tripId;
  let data = req.params.id;
  
  thoughtModel
    .destroy({
      where: { id: data, tripId: tripId },
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
