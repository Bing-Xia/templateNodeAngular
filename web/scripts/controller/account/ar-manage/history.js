 'use strict';
 define(function () {
   var Controller = function ($scope) {
     $scope.names = [
       'alice', 'bob'
     ];
   };

   return {
     name: 'ARHistoryController',
     $fn: ['$scope', Controller]
   };

 });
