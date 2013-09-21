//'use strict';

var tasks = null;

var app = angular.module('app', ["ngResource"]);

app.config(["$httpProvider", function($httpProvider){
  var token = $('meta[name=csrf-token]').attr('content')
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = token
}]);

app.factory("Task", function($resource){
  return $resource("/tasks/:id", {id: "@id"}, {update: {method: "PUT"}, destroy: {method: "DELETE"}});
});

app.controller("tasksController", function($scope, Task){
  $scope.tasks = [];

  $scope.listTasks = function(){
    $scope.tasks = Task.query();
    tasks = $scope.tasks;
  }

  $scope.showTask = function(id){
    $scope.task = {};
    $scope.task = Task.get({id: id});
  }

  $scope.addTask = function(){
    var task = new Task($scope.newTask);
    task.$save();
    $scope.tasks.push(task)
    $scope.newTask = {}
  }

  $scope.destroy = function(index){
    Task.remove({id: $scope.tasks[index].id}, function() {
      $scope.tasks.splice(index, 1);
    });
  }

  $scope.updateTask = function(){
    Task.update($scope.task)
  }
  $scope.listTasks();
});
