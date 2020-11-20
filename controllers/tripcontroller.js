let router = require("express").Router();
// const { Router } = require("express");
// const { databaseVersion } = require("../db");
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let tripModel = sequelize.import("../models/trip");

router.post("/", function (req, res) {
  console.log("testing");
  let destination = req.body.tripdata.destination;
  let occasion = req.body.tripdata.occasion;
  let away = req.body.tripdata.away;
  let home = req.body.tripdata.home;
  let companions = req.body.tripdata.companions;
  let user = req.user.id;

  tripModel
    .create({
      destination: destination,
      occasion: occasion,
      away: away,
      home: home,
      companions: companions,
      user_id: user
    })
    .then(
      function createSuccess(tripdata) {
        res.json({
          tripdata: tripdata,
        });
      },
      function createError(err) {
        console.log("hello");
        res.send(500, err.message);
      }
    );
});

router.get("/", function (req, res) {
  let userid = req.user.id;

  tripModel
    .findAll({
      where: { user_id: userid },
    })
    .then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
});

router.get("/:id", function (req, res) {
  let data = req.params.id;
  let userid = req.user.id;

  tripModel
    .findOne({
      where: { id: data, user_id: userid },
    })
    .then(
      function findOneSuccess(data) {
        res.json(data);
      },
      function findOneError(err) {
        res.send(500, err.message);
      }
    );
});

router.put("/:id", function (req, res) {
  let destination = req.body.tripdata.destination;
  let occasion = req.body.tripdata.occasion;
  let home = req.body.tripdata.home;
  let data = req.params.id;
  let tripdata = req.body.tripdata;
  let userid = req.user.id;

  tripModel
    .update(
      {
        destination: destination,
        occasion: occasion,
        home: home,
        user_id: userid /* ? */,
      },
      { where: { id: data } }
    )
    .then(
      function updateSuccess(updatedLog) {
        /* ? */
        res.json({
          tripdata: tripdata,
        });
      },
      function updateError(err) {
        res.send(500, err.message);
      }
    );
});

router.delete("/:id", function (req, res) {
  let data = req.params.id;
  let userid = req.user.id;

  tripModel
    .destroy({
      where: { id: data, user_id: userid },
    })
    .then(
      function deleteLogSuccess(data) {
        res.send("trip deleted successfully");
      },
      function deleteLogError(err) {
        res.send(500, err.message);
      }
    );
});

module.exports = router;
