var express = require('express');
var router = express.Router();
var Student = require('../model/studentsFacade');
var Class = require('../model/classesFacade');

function isDbRunning() {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return false;
    }
    return true;
}

router.get('/test', function(req, res) {
    res.header("Content-type","application/json");
    res.end('{"msg" : "Test Message, You are logged on as a User since you could fetch this data"}');
});

router.get('/studentByUserName/:userName', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Student.getStudentByUserName(req.params.userName, function (err, foundStudent) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(foundStudent));
    });
});

router.get('/Class/:classId', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    Class.getClassById(req.params.classId, function (err, classById) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(classById));
    });
});

module.exports = router;
