/**
 * Created by liki on 3/5/14.
 */
'use strict';
define(['highcharts'], function () {
  function fn() {
    return {
      restrict: 'EA',
      template: '<div></div>',
      scope: {
        chartData: "=value",
        chartObj: "=?"
      },
      transclude: true,
      replace: true,
      link: function ($scope, $element, $attrs) {
        $scope.chartData = {
            "credits": {
              "enabled": false
            },
            "chart": {
              "width": 320,
              "height": 150,
              "backgroundColor": "#f5f5f5",
              "borderRadius": 0,
              "renderTo": "weeklyEarnings",
              "className": "weekly-earnings-details",
              "spacing": [10, 10, 10, 10],
              "style": {
                "fontFamily": "\"proxima-nova\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Wenquanyi Micro Hei\", \"WenQuanYi Micro Hei Mono\", \"WenQuanYi Zen Hei\", \"WenQuanYi Zen Hei\", \"Apple LiGothic Medium\", \"SimHei\", \"ST Heiti\", \"WenQuanYi Zen Hei Sharp\""
              }
            },
            "plotOptions": {
              "line": {
                "color": "#999",
                "dashStyle": "ShortDot",
                "marker": {
                  "fillColor": "#fff",
                  "lineWidth": 2,
                  "lineColor": "#999",
                  "radius": 3,
                  "states": {
                    "hover": {
                      "lineColor": "#00BC8D"
                    }
                  }
                },
                "states": {
                  "hover": {
                    "halo": {
                      "size": 0
                    }
                  }
                }
              }
            },
            "title": {
              "text": ""
            },
            "xAxis": {
              "categories": ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
              "labels": {
                "style": {
                  "color": "#ccc"
                }
              },
              "lineColor": "#ccc",
              "tickColor": "#ccc",
              "tickmarkPlacement": "on",
              "tickLength": 6
            },
            "yAxis": {
              "title": {
                "text": ""
              },
              gridLineWidth: 0,
            },
            "tooltip": {
              "shadow": false,
              "borderColor": "#e8e8e8",
              "useHTML": true,
              "headerFormat": "",
              "pointFormat": "<div class=\"tooltip-content\">{point.y}</div>",
              "style": {
                fontSize: "18px"
              }
            },
            "legend": {
              "enabled": false
            },
            "series": [{
              "data": [1.5, 2.3, 6.4, 6.1, 5.0, 2.56, 4],
              "_symbolIndex": 0
            }]
          }
          //Update when charts data changes
        $scope.$watch('chartData', function (value) {
          if (!value)
            return;

          // use default values if nothing is specified in the given settings
          $scope.chartData.chart.renderTo = $scope.chartData.chart.renderTo || $element[0];
          if ($attrs.type)
            $scope.chartData.chart.type = $scope.chartData.chart.type || $attrs.type;
          if ($attrs.height)
            $scope.chartData.chart.height = $scope.chartData.chart.height || $attrs.height;
          if ($attrs.width)
            $scope.chartData.chart.width = $scope.chartData.chart.type || $attrs.width;

          $scope.chartObj = new Highcharts.Chart($scope.chartData);
        });
      }
    }
  }
  return {
    name: 'slChart',
    $directiveFn: [fn]
  };
});
