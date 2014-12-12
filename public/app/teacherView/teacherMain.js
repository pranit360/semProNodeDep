'use strict';

angular.module('myAppRename.teacher', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/teacher', {
            templateUrl: 'app/teacherView/teacherMain.html',
            controller: 'AdminCtrl'
        });

        $routeProvider.when('/teacher/createUser', {
            templateUrl: 'app/teacherView//createUserView.html',
            controller: 'Admin1Ctrl'
        });

        $routeProvider.when('/teacher/createClass', {
            templateUrl: 'app/teacherView/createClassView.html',
            controller: 'Admin2Ctrl'
        });

        $routeProvider.when('/teacher/viewTeachers', {
            templateUrl: 'app/teacherView/teacherUserView.html',
            controller: 'Admin3Ctrl'
        });

        $routeProvider.when('/teacher/viewStudents', {
            templateUrl: 'app/teacherView/teacherAllStudentsListView.html',
            controller: 'Admin10Ctrl'
        });

        $routeProvider.when('/teacher/viewClasses', {
            templateUrl: 'app/teacherView/teacherClassesView.html',
            controller: 'Admin4Ctrl'
        });

        $routeProvider.when('/teacher/viewSemesters/:classId', {
            templateUrl: 'app/teacherView/teacherSemestersView.html',
            controller: 'Admin5Ctrl'
        })

        $routeProvider.when('/teacher/viewPeriods/:semesterId', {
            templateUrl: 'app/teacherView/teacherPeriodsView.html',
            controller: 'Admin6Ctrl'
        })

        $routeProvider.when('/teacher/viewTasks/:periodId', {
            templateUrl: 'app/teacherView/teacherTasksView.html',
            controller: 'Admin7Ctrl'
        })

        $routeProvider.when('/teacher/viewCompletedTasks/:taskId', {
            templateUrl: 'app/teacherView/teacherCompletedTasksView.html',
            controller: 'Admin8Ctrl'
        })

        $routeProvider.when('/teacher/viewScores/:periodId', {
            templateUrl: 'app/teacherView/teacherAllScores.html',
            controller: 'Admin9Ctrl'
        })
    }])


    .controller('AdminCtrl', ['$scope', '$http', function ($scope) {
        $scope.title = 'AdminCtrl';
    }])

    .controller('Admin1Ctrl', ['$scope', 'TeachersFactory', '$http', function ($scope, TeachersFactory, $http) {
        $scope.title = 'Admin1Ctrl';

        $scope.submitUser = function () {
            TeachersFactory.addTeacher($scope.person)
                .success(function (data, status, headers, config) {
                    $scope.person = data;
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        };

    }])

    .controller('Admin2Ctrl', ['$scope', 'ClassFactory', function ($scope, ClassFactory) {
        $scope.title = 'New Class';

        $scope.saveClass = function () {
            ClassFactory.addOneClass($scope.newClass)
                .success(function (data, status, headers, config) {
                    $scope.newClass = {};
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }])

    .controller('Admin3Ctrl', ['$scope', 'TeachersFactory', function ($scope, TeachersFactory) {
        $scope.title = 'Teachers';
        TeachersFactory.getAllTeachers()
            .success(function (data, status, headers, config) {
                $scope.teachers = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }])

    .controller('Admin4Ctrl', ['$scope', 'ClassFactory', function ($scope, ClassFactory) {
        $scope.title = 'View all classes';
        ClassFactory.getClasses()
            .success(function (data, status, headers, config) {
                $scope.classes = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
        $scope.saveClass = function () {
            ClassFactory.addOneClass($scope.newClass)
                .success(function (data, status, headers, config) {
                    $scope.newClass = {};
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }])

    .controller('Admin5Ctrl', ['$scope', '$routeParams', 'SemesterFactory', 'ClassFactory', function ($scope, $routeParams, SemesterFactory, ClassFactory) {
        /*        var classId = $routeParams.classId;

         $scope.getClass = function (classId) {
         ClassFactory.getClassById(classId)
         .success(function (data, status, headers, config) {
         $scope.classa = data;
         }).
         error(function (data, status, headers, config) {
         $scope.error = data;
         });
         }*/

        $scope.title = 'View all semesters in class';

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

        $scope.saveSemester = function () {
            SemesterFactory.addOneSemester($scope.newSemester)
                .success(function (data, status, headers, config) {
                    $scope.newSemester = {};
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }])

    .controller('Admin6Ctrl', ['$scope', '$routeParams', 'PeriodFactory', function ($scope, $routeParams, PeriodFactory) {
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

        $scope.savePeriod = function () {
            PeriodFactory.addPeriod($scope.newPeriod)
                .success(function (data, status, headers, config) {
                    $scope.newPeriod = {};
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }

    }])

    .controller('Admin7Ctrl', ['$scope', '$routeParams', 'TaskFactory', function ($scope, $routeParams, TaskFactory) {
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

        $scope.saveTask = function () {
            TaskFactory.addTask($scope.newTask)
                .success(function (data, status, headers, config) {
                    $scope.newTask = {};
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }])

    .controller('Admin8Ctrl', ['$scope', '$routeParams', 'CompletedTaskFactory', function ($scope, $routeParams, CompletedTaskFactory) {
        $scope.title = 'View all completed tasks in task';
        $scope.getCompletedTasksByTaskId = function (taskId) {
            CompletedTaskFactory.getAllCompletedTasksForASpecificTask(taskId)
                .success(function (data, status, headers, config) {
                    $scope.completedTasks = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
        $scope.getCompletedTasksByTaskId($routeParams.taskId);
    }])

    .controller('Admin9Ctrl', ['$scope', '$routeParams', 'TaskFactory', 'PeriodFactory', 'SemesterFactory', 'StudentsFactory', 'CompletedTaskFactory',
        function ($scope, $routeParams, TaskFactory, PeriodFactory, SemesterFactory, StudentsFactory, CompletedTaskFactory) {
            $scope.completedTasksArray = [];
            $scope.sortedArray = [];
            var student = [];

            $scope.title = 'View all scores from this period and change them';
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

            $scope.getStudentsWithPeriodId = function (periodId) {
                console.log('1 periodId: ' + periodId)
                PeriodFactory.getPeriodById(periodId)
                    .success(function (data, status, header, config) {
                        console.log('2 ' + JSON.stringify(data))
                        $scope.period = data;
                        var semesterId = data.semesterId;
                        console.log('3 semesterId: ' + data.semesterId);
                        $scope.getSemester = function (semesterId) {

                            SemesterFactory.getSemesterById(semesterId)
                                .success(function (data, status, header, config) {
                                    console.log('4' + JSON.stringify(data))
                                    $scope.semester = data;
                                    var classId = data.classId;

                                    $scope.getStudent = function (classId) {
                                        StudentsFactory.getAllStudentsByClassId(classId)
                                            .success(function (data, status, header, config) {
                                                $scope.students = data;
                                                console.log('5' + JSON.stringify(data))
                                                createSortedArray();
                                            }).
                                            error(function (data, status, headers, config) {
                                                $scope.error = data;
                                            })
                                    }
                                    $scope.getStudent(classId);
                                    console.log('classId: ' + classId);
                                }).
                                error(function (data, status, headers, config) {
                                    $scope.error = data;
                                })
                        }
                        $scope.getSemester(data.semesterId);
                    }).
                    error(function (data, status, headers, config) {
                        $scope.error = data;
                    });
            }
            $scope.getStudentsWithPeriodId($routeParams.periodId);

            function createSortedArray() {
                for (var i = 0; i < $scope.students.length; i++) {
                    student = [];
                    student = $scope.students[i];
                    helpFunction(student);
                }
                console.log($scope.dummyArray);
            }

            function helpFunction(student) {
                var studentObj = student;
                console.log(studentObj)
                CompletedTaskFactory.getAllCompletedTasksForASpecificStudent(student._id)
                    .success(function (data, status, headers, config) {
                        var completedTasksArray = data;
                        studentObj['points'] = completedTasksArray;
                        console.log(studentObj);
                        $scope.sortedArray.push(studentObj);
                    }).
                    error(function (data, status, headers, config) {
                        $scope.error = data;
                    });
            }
        }])

    .controller('Admin10Ctrl', ['$scope', 'StudentsFactory', function ($scope, StudentsFactory) {
        $scope.title = 'Students';
        StudentsFactory.getAllStudents()
            .success(function (data, status, headers, config) {
                $scope.students = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }])

