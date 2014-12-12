var mongoose = require('mongoose');
var db = require('./db');
var CompletedTask = mongoose.model('CompletedTask');

function getAllCompletedTasksByStudentId(studentId, callback) {
    CompletedTask.find({studentId: studentId}, function (err, ctList) {
        if (err) {
            return callback(err);
        }
        return callback(null, ctList);
    });
}

function getAllCompletedTasksByTaskId(taskId, callback) {
    CompletedTask.find({taskId: taskId}, function (err, ctList) {
        if (err) {
            return callback(err);
        }
        return callback(null, ctList);
    });
}

function addNewCompletedTask(completedTask, callback) {
    CompletedTask.create(completedTask, function (err, completedTask) {
        if (err) {
            return callback(err);
        }
        callback(null, completedTask);

    });
}

function getCompletedTaskById(Id, callback) {
    CompletedTask.findById(Id, function (err, completeTask) {
        if (err) {
            return callback(err);

        }
        return callback(completeTask);
    });
}

function getCompletedTaskByStudentIdAndTaskId (studentId, taskId, callback){
    CompletedTask.find({studentId: studentId, taskId: taskId}, function (err, ctList) {
        if (err) {
            return callback(err);
        }
        return callback(null, ctList);
    });
}

module.exports = {
    getAllCompletedTasksByStudentId: getAllCompletedTasksByStudentId,
    getAllCompletedTasksByTaskId: getAllCompletedTasksByTaskId,
    addNewCompletedTask: addNewCompletedTask,
    getCompletedTaskById: getCompletedTaskById,
    getCompletedTaskByStudentIdAndTaskId: getCompletedTaskByStudentIdAndTaskId
}