"use strict";
define(function () {
  var Service = function ($q, $location) {
    var responseError = function (rejection) {
      return rejection;
    };
    var response = function (response) {
      return response;
    };
    return {
      responseError: responseError,
      response: response
    };
  };

  return {
    name: "httpInterceptorSvc",
    $svc: ["$q", "$location", Service]
  };


});
