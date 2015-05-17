'use strict';

angular.module('recruitr')
.controller('ProfilesListCtrl', function($scope, $rootScope, Profile){
  $scope.page = 1;
  $scope.moveBack = false;
  $scope.moveForward = false;
  $scope.changePage = function(change){
  if(change === 'next' && $scope.users.length === 10){
    $scope.page += 1;
    $scope.moveBack = true;
  } else if(change === 'prev' && $scope.page !== 1){
    $scope.page -= 1;
    $scope.moveForward = true;
  }
  Profile.find($scope.page)
  .then(function(response){
    $scope.users = response.data.users;
  });
  if($scope.page === 1){
    $scope.moveBack = false;
  } else if($scope.users.length < 10){
    $scope.moveForward = false;
  }
};
  Profile.find()
  .then(function(response){
    $scope.students = response.data.profiles;
    if($scope.students === 10){
      $scope.moveForward = true;
    }
  });
  $scope.editStudent = function(student){
    Profile.editStudent(student)
    .then(function(response){
      $scope.students = response.data.students;
    });
  };
  $scope.deleteStudent = function(student){
    Profile.deleteStudent(student)
    .then(function(response){
      $scope.students = response.data.students;
    });
  };
  $scope.sortByName = function(name){
    Profile.sortByName(name);
  };
  $scope.sortBySkills = function(skill){
    Profile.sortsortBySkills(skill);
  };
});
