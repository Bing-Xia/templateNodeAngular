"use strict";

define(function () {
  var Utils = {};
  Utils.convertToMap = function (array) {
    var result = {};
    if (!array) {
      return result;
    }
    for (var i = 0, len = array.length; i < len; i++) {
      var obj = array[i];
      result[obj.value] = obj.name;
    }
    return result;
  };
  Utils.registeComponents = function (app, components) {
    if (!components) {
      return;
    }
    for (var i = 0, len = components.length; i < len; i++) {
      if (components[i].$svc) {
        // Register Factory
        app.factory(components[i].name, components[i].$svc);
        //console.warn('Initialize Controller without a name: ', components[i].fn);
      } else if (components[i].$fn) {
        // Register Controllder
        app.controller(components[i].name, components[i].$fn);
      } else if (components[i].$directiveFn) {
        app.directive(components[i].name, components[i].$directiveFn);
      } else if (components[i].$filterFn) {
        app.filter(components[i].name, components[i].$filterFn);
      }
    }
  };
  Utils.transformRequest = function (data) {

    var param = function (obj) {
      var query = '';
      var name, value, fullSubName, subName, subValue, innerObj, i;
      for (name in obj) {
        value = obj[name];
        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
      return query.length ? query.substr(0, query.length - 1) : query;
    };
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }
  return Utils;
});
