"use strict";
define(['utils/Utils', 'utils/Constant'], function (Utils, Constant) {
  var Service = function ($resource, ChannelSvc, $q) {
    var svc = {
      getChannelById: function (channelId) {
        var deferred = $q.defer();
        var channel = null;
        ChannelSvc.getChannelById({
          chId: channelId
        }, function (resp) {
          channel = Utils.transformResponse(resp);
          if (!channel) {
            channel = {
              channelName: Constant.loadError,
              channelCharger: Constant.loadError
            };
          }
          deferred.resolve(channel);
        }, function () {
          channel = {
            channelName: Constant.loadError,
            channelCharger: Constant.loadError
          };
          deferred.resolve(channel);
        });
        return deferred.promise;
      }
    };
    return svc;
  };

  return {
    name: "Channel",
    svc: ["$resource", "ChannelSvc", "$q", Service]
  };


});
