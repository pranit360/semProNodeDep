'use strict';

angular.module('myAppRename.student', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/student', {
            templateUrl: 'app/studentView/studentMain.html',
            controller: 'studentMainCtrl'
        });
        $routeProvider.when('/student/viewClassDetails', {
            templateUrl: 'app/studentView/studentClassDetailsView.html',
            controller: 'student1Ctrl'
        });
        $routeProvider.when('/student/viewClassmates', {
            templateUrl: 'app/studentView/studentClassmatesView.html',
            controller: 'student2Ctrl'
        });
        $routeProvider.when('/student/viewTasks', {
            templateUrl: 'app/studentView/studentCompletedTaskView.html',
            controller: 'student3Ctrl'
        });
        $routeProvider.when('/student/viewSemesters/:classId', {
            templateUrl: 'app/studentView/studentSemestersView.html',
            controller: 'student4Ctrl'
        });
        $routeProvider.when('/student/viewPeriods/:semesterId', {
            templateUrl: 'app/studentView/studentPeriodsView.html',
            controller: 'student5Ctrl'
        })
        $routeProvider.when('/student/viewTasks/:periodId', {
            templateUrl: 'app/studentView/studentTasksView.html',
            controller: 'student6Ctrl'
        })
    }])

    .controller('studentMainCtrl', ['$scope', function ($scope, $http) {
        $scope.title = 'studentMainCtrl';

    }])

    .controller('student1Ctrl', ['$scope', 'ClassFactory', function ($scope, ClassFactory) {
        $scope.title = 'student1Ctrl';

        $scope.getClassById= function() {
            ClassFactory.getClassById($scope.classId)
                .success(function (data, status, headers, config) {
                    $scope.class = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }

    }])

    .controller('student2Ctrl', ['$scope', 'StudentsFactory', 'ClassFactory', function ($scope, StudentsFactory, ClassFactory) {
        $scope.title = 'Your class';

        $scope.getStudentByUserName = function () {
            StudentsFactory.getStudentByUserName($scope.studentName)
                .success(function (data, status, headers, config) {
                    $scope.wholeStudent = data;
                   // console.log($scope.wholeStudent);

                    StudentsFactory.getAllStudentsByClassId($scope.wholeStudent.classId)
                        .success(function (data, status, headers, config) {
                            $scope.students = data;
                            console.log(data);
                            ClassFactory.getClassById($scope.wholeStudent.classId)
                                .success(function (data, status, headers, config) {
                                    $scope.class = data;
                                    console.log(data);
                                }).
                                error(function (data, status, headers, config) {
                                    $scope.error = data;
                                });
                        }).
                        error(function (data, status, headers, config) {
                            $scope.error = data;
                        });
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }])

    .controller('student3Ctrl', ['$scope', 'CompletedTaskFactory', function ($scope, CompletedTaskFactory) {
        $scope.title = 'Your completed tasks';

        $scope.getAllCompletedTasksForASpecificStudent= function() {
            CompletedTaskFactory.getAllCompletedTasksForASpecificStudent($scope.studentId)
                .success(function (data, status, headers, config) {
                    $scope.completedTasks = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }])

    .controller('student4Ctrl', ['$scope', '$routeParams', 'SemesterFactory', function ($scope, $routeParams, SemesterFactory) {

    $scope.title = 'View all semesters in your class';

     $scope.getSemestersByClassId = function (classId) {
        SemesterFactory.getAllSemestersByClassId(classId)
            .success(function (data, status, headers, config) {
                $scope.semesters = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }
    $scope.getSemestersByClassId($routeParams.classId);
}])

    .controller('student5Ctrl', ['$scope', '$routeParams', 'PeriodFactory', function ($scope, $routeParams, PeriodFactory) {
        $scope.title = 'View all periods in semester';
        $scope.getPeriodsBySemesterId = function (semesterId) {
            PeriodFactory.getAllPeriodsBySemesterId(semesterId)
                .success(function (data, status, headers, config) {
                    $scope.periods = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
        $scope.getPeriodsBySemesterId($routeParams.semesterId);

    }])

    .controller('student6Ctrl', ['$scope', '$routeParams', 'TaskFactory', function ($scope, $routeParams, TaskFactory) {
        $scope.title = 'View all tasks in period';
        $scope.getTasksByPeriodId = function (periodId) {
            TaskFactory.getTasksByPeriod(periodId)
                .success(function (data, status, headers, config) {
                    $scope.tasks = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
        $scope.getTasksByPeriodId($routeParams.periodId);
    }])



