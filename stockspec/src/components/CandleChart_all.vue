<template>
  <div ref="mydiv">
    <highcharts
      class="stock"
      :constructor-type="'stockChart'"
      :options="stockOptions"
      ref="mystock"
    ></highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import moment from "moment";

export default {
  name: "CandleChartAll",
  props: ["props1"],
  data() {
    return {
      stockOptions: {
        chart: {
          width: null,
          height: null,
          // margin: [10, 10, 10, 10]
        },
        exporting: {
          enabled: false
        },
        navigator: {
          enabled: true
        },
        scrollbar: {
          enabled: true
        },
        rangeSelector: {
          selected: 1,
          inputDateFormat: "%Y-%m-%d"
        },
        title: {
          text: ""
        },
        plotOptions: {
          series: {
            states: {
              hover: {
                enabled: false
              }
            }
          }
        },
        xAxis: {
          dateTimeLabelFormats: {
            millisecond: "%H:%M:%S.%L",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%m-%d",
            week: "%m-%d",
            month: "%y-%m",
            year: "%Y"
          },
          minRange: 30 * 24 * 3600000,
          min: null,
          max: null,
          startOnTick: false
        },
        tooltip: {
          split: false,
          shared: true
        },
        yAxis: [
          {
            labels: {
              align: "left",
              x: -3
            },
            title: {
              text: "股价(元)"
            },
            height: "50%",
            resize: {
              enabled: true
            },
            lineWidth: 0,
            showLastLabel: true,
            showFirstLabel: true,
            tickPositioner: function() {
              var positions = [],
                tick = 0,
                increment = (this.dataMax - this.dataMin) / 5,
                max = this.dataMax,
                min = this.dataMin;
              if (increment > 1) {
                increment = Math.ceil(increment);
                tick = Math.floor(this.dataMin);
                for (
                  tick;
                  tick - increment <= this.dataMax;
                  tick += increment
                ) {
                  positions.push(tick);
                }
              } else {
                tick = Number(min.toFixed(1));
                increment = Number(increment.toFixed(3));
                for (
                  tick;
                  tick - increment <= this.dataMax;
                  tick += increment
                ) {
                  positions.push(Number(tick.toFixed(2)));
                }
              }
              return positions;
            }
          },
          {
            labels: {
              align: "left",
              x: -3
            },
            title: {
              text: "成交量(亿)"
            },
            top: "50%",
            height: "20%",
            offset: 0,
            lineWidth: 2
          },
          {
            labels: {
              align: "left",
              x: -3
            },
            title: {
              text: "MACD"
            },
            top: "71%",
            height: "29%",
            offset: 0,
            lineWidth: 2
          }
        ],
        series: [
          {
            type: "candlestick",
            name: "价格",
            color: "green",
            lineColor: "green",
            upColor: "red",
            upLineColor: "red",
            tooltip: {},
            navigatorOptions: {
              color: Highcharts.getOptions().colors[0]
            },
            data: [],
            dataGrouping: [],
            yAxis: 0,
            maxPointWidth: 5,
            id: "maindayk"
          },
          {
            type: 'bb',
            topLine: { 
              styles: {
                lineColor: "#ffc349"
              }
            },
            bottomLine: {  
              styles: {
                lineColor: 'purple'
              }
            },
            color: '#006cee', 
            tooltip: {
              pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
              '<b> {series.name}</b><br/>' +
              '上轨: {point.top}<br/>' +
              '中轨: {point.middle}<br/>' +
              '下轨: {point.bottom}<br/>'
            },
            name: '布林（20,2）',
            linkedTo: 'maindayk'
          },
          {
            type: "column",
            name: "成交量(亿)",
            data: [],
            yAxis: 1,
            dataGrouping: [],
            maxPointWidth: 7
          },
          {
            yAxis: 2,
            tooltip: {
              pointFormat:
                '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
                "MACD 线：{point.MACD}<br/>" +
                "信号线：{point.signal}<br/>" +
                "振荡指标：{point.y}<br/>"
            },
            type: "macd",
            linkedTo: "maindayk",
            color: "#f05f5f",
            params: {
              shortPeriod: 12,
              longPeriod: 26,
              signalPeriod: 9,
              period: 26
            },
            zones: [
              {
                value: 0,
                color: "#f05f5f"
              },
              {
                color: "#31c26d"
              }
            ],
            macdLine: {
              styles: {
                lineColor: "blue",
                lineWidth: 1
              }
            },
            maxPointWidth: 1
          }
        ]
      },
      code: "",
      stockname: "",
      dayk: [],
      chart: null,
      clientHeight: ""
    };
  },

  methods: {
    createData() {
      let stockData = this.dayk;
      let dataLength = stockData.length;
      // set the allowed units for data grouping
      let groupingUnits = [
        [
          "week", // unit name
          [1] // allowed multiples
        ],
        ["month", [1, 2, 3, 4, 6]]
      ];
      let i = 0;
      let timeStamp = 0;
      let amountv = 0;
      let ohlc = [];
      let dayday = [];
      let volume = [];
      for (i = dataLength - 1; i >= 0; i -= 1) {
        timeStamp = moment(stockData[i].date, "YYYY-MM-DD").valueOf();
        amountv = stockData[i].amount / 1e8;
        if (amountv != NaN) {
          amountv = Number(amountv.toFixed(3));
        }
        //console.log(stockData[i].date, amountv)
        ohlc.push([
          timeStamp, // the date
          stockData[i].open, // open
          stockData[i].high, // high
          stockData[i].low, // low
          stockData[i].close // close
        ]);
        volume.push({
          x: timeStamp,
          y: amountv, // the date
          color: stockData[i].open > stockData[i].close ? "green" : "red"
        });
      }

      this.stockOptions.series[0].data = ohlc;
      this.stockOptions.series[2].data = volume;

      if (dataLength < 20) {
        // console.log("length < 20");
        var latesttime = ohlc[dataLength - 1][0];
        for (i = dataLength; i < 30; i += 1) {
          latesttime += 24 * 3600000;
          volume.push({
            x: latesttime,
            y: null,
            color: "white"
          });
        }
        this.stockOptions.series[2].data = volume;
        this.stockOptions.xAxis.min = ohlc[0][0];
        this.stockOptions.xAxis.max = ohlc[0][0] + 30 * 24 * 3600000;
        this.stockOptions.xAxis.minRange = 30 * 24 * 3600000;
      } else {
        // console.log("length > 20");
        this.stockOptions.xAxis.min = null;
        this.stockOptions.xAxis.max = null;
        this.stockOptions.xAxis.minRange = 30 * 24 * 3600000;
      }
    },

    changeSize() {
          if(this.$refs.mystock == undefined) {
            return
          }
          let chart = this.$refs.mystock.chart;
          if(this.clientHeight < 500) {
            this.clientHeight = 500
          }
          chart.setSize(null, this.clientHeight);
    }
  },

  mounted() {
    // console.log(window.getComputedStyle(this.$refs.temp).height)
    this.$nextTick(function () {
    this.clientHeight = `${document.documentElement.clientHeight}` * 0.7 - 120;
    this.changeSize();
    let _this = this;
    window.addEventListener('resize', function() {
                _this.clientHeight = `${document.documentElement.clientHeight}` * 0.7 - 120;
                _this.changeSize()
            }, false)
    })
  },

  created() {
    // console.log("creatd");
    this.code = this.props1["code"];
    this.dayk = this.props1["kdata"];
    this.stockname = this.props1["name"];
    this.createData();
  }
};
</script>

<style scoped>
.stock {
  /* width: 90%;
  height: 90%; */
  margin: 20 auto;
}
</style>
