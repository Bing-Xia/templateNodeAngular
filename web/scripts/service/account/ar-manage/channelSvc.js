"use strict";
define(['utils/Constant'], function (Constant) {
  var Service = function ($resource) {
    var svc = $resource(Constant.apiBase + '/channel/:chId/:catalog/:catalogId/:subId/:method', null, {
      getChannels: {
        method: 'GET',
        params: {
          method: "get"
        },
        //isArray: true,
        timeout: Constant.reqTimeout
      },
      addChannels: {
        method: 'POST',
        params: {
          method: "post"
        },
        //isArray: true,
        timeout: Constant.reqTimeout
      },
      /*
         /domain/:domainId
      */
      getChannelById: {
        method: 'GET',
        params: {
          chId: '@chId',
          method: "get"
            //catalog: 'modify'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      modifyChannelById: {
        method: 'POST',
        params: {
          chId: '@chId',
          method: "update"
            //catalog: 'modify'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      submitApprovalById: {
        method: 'POST',
        params: {
          chId: '@chId',
          method: 'post'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      submitChannelRequest: {
        method: 'POST',
        params: {
          chId: '@chId',
          catalog: 'adjustment',
          method: 'request'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      getChannelAttachments: {
        method: 'GET',
        params: {
          chId: '@chId',
          catalog: 'attachment',
          method: 'get'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      deleteChannelAttachments: {
        method: 'DELETE',
        params: {
          chId: '@chId',
          catalog: 'attachment',
          catalogId: '@catalogId',
          method: 'delete'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      downloadChannelAdjustmentAttachments: {
        method: 'GET',
        params: {
          chId: '@chId',
          catalog: 'adjustment',
          catalogId: 'attachment',
          subId: '@subId'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      getChannelAdjustmentAttachments: {
        method: 'GET',
        params: {
          chId: '@chId',
          catalog: 'adjustment',
          catalogId: '@catalogId',
          subId: 'attachment',
          method: 'get'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      getProjectByChannelId: {
        method: 'GET',
        params: {
          chId: '@chId',
          catalog: 'project'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      getAdjustmentHistoryByChannelId: {
        method: 'GET',
        params: {
          chId: '@chId',
          catalog: 'adjustment',
          catalogId: 'history'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      getOperationHistoryByChannelId: {
        method: 'GET',
        params: {
          chId: '@chId',
          catalog: 'operation',
          catalogId: 'history'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      approveAdjustment: {
        method: 'POST',
        params: {
          chId: '@chId',
          catalog: 'adjustment',
          catalogId: '@catalogId',
          subId: 'approve'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      decision: {
        method: 'POST',
        params: {
          catalog: '@catalog',
          chId: '@chId'
        }
      },

      getAdjustmentByChannelId: {
        method: 'GET',
        params: {
          chId: '@chId',
          catalog: 'adjustment'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      getAdjustmentStatusByChannelId: {
        method: 'GET',
        params: {
          chId: '@chId',
          catalog: 'adjustment',
          catalogId: 'status'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      },

      getFileList: {
        method: 'GET',
        params: {
          chId: '@chId',
          catalog: 'adjustment',
          catalogId: 'attachment',
          method: 'get'
        }
      },

      deleteAdjustmentAttachment: {
        method: 'DELETE',
        params: {
          chId: '@chId',
          catalog: 'adjustment',
          catalogId: 'attachment',
          subId: '@subId',
          method: 'delete'
        }
      },

      getChargers: {
        method: 'GET',
        params: {
          catalog: 'getChChargers'
        },
        isArray: false,
        timeout: Constant.reqTimeout
      }

    });
    return svc;
  };

  return {
    name: "ChannelSvc",
    svc: ["$resource", Service]
  };


});
