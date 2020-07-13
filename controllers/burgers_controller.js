var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var burger = require("../models/burger.js");

//GET
//selectAll function
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

//POST
//insertOne function
router.post("/api/burgers", function(req, res) {
  burger.insertOne([
    "burger_name"], [
    req.body.burgerName], function() {
    res.redirect("/");
  });
});

//PUT
//updateOne function
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(data) {
    res.send(data);
  });
});

// Export routes for server.js to use.
module.exports = router;