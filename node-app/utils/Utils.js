'use strict';

var Utils = {};
/**
 * [mergeAttributes description]
 * Merge two object attribute, attributes in localObj will override those in defaultObj
 *
 * var Local = {
 *   env: {
 *     devMode: true
 *   }
 * }
 *
 * var Default = {
 *   env: {
 *     devMode: false,
 *     endPoint: 'localhost'
 *   }
 * }
 * Result is: 
 * var Result = {
 *   env: {
 *     devMode: true,
 *     endPoint: 'localhost'
 *   }
 * }
 * 
 * 
 * @param  {[type]} localObj   [description]
 * @param  {[type]} defaultObj [description]
 * @return {[type]}            [description]
 */
Utils.mergeAttributes = function (localObj, defaultObj) {
  for(var p in defaultObj){
    if(localObj.hasOwnProperty(p)){
      if(typeof localObj[p] !== 'object'){
        defaultObj[p] = localObj[p];
      }else{
        defaultObj[p] = Utils.mergeAttributes(localObj[p], defaultObj[p]);
      }
    }
  }
  return defaultObj;
}
Utils.deepFreeze = function (obj) {
  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);
  // Freeze properties before freezing self
  propNames.forEach(function (name) {
    var prop = obj[name];
    // Freeze prop if it is an object
    if (typeof prop === 'object' && prop !== null){
      Utils.deepFreeze(prop);
    }
  });
  // Freeze self (no-op if already frozen)
  return Object.freeze(obj);
};

Utils.checkIfOldIE = function (userAgent, defaultOldVersion) {
  var ieMatch = userAgent.match('MSIE ([0-9]+)');
  var ieVersion = ieMatch && ieMatch.length > 1 ? ieMatch[1] : 'unknown';

  if (ieVersion == 'unknown') // Not IE
    return false;
  if (defaultOldVersion == null) {
    return (parseInt(ieVersion) <= 7);
  } else {
    return (parseInt(ieVersion) <= defaultOldVersion);
  }
};
module.exports = Utils;
