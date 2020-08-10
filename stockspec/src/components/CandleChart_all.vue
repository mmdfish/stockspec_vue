<template>
  <div ref="divvv">
  <div style="float: left; width:100%">
    <div style="float: right; width:10%; min-height:1px;"></div>
    <div style="float: right;"><el-checkbox @change="display" v-model="checked"><div style="color:red">对比大盘</div></el-checkbox></div>
  </div>
  <div><highcharts class="stock" :constructor-type="'stockChart'" :options="stockOptions" ref="mystock"></highcharts></div>
  <div style="float: left">
    <el-row>
  <el-button-group>
  <el-button size="mini" autofocus="true" @click="setToMacd">Macd</el-button>
  <el-button size="mini" @click="setToBoll"> Boll </el-button>
</el-button-group>
</el-row>

  </div>

  </div>
</template>

<script>
import Highcharts from 'highcharts';
import moment from 'moment'

export default {

  name: "CandleChart_bollinger",
  props:["props1"],
  checked: false,
  data() {
    return {
      checked: false,

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
          inputDateFormat: '%Y-%m-%d'
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
                },
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
          minRange:30*24 *3600000,
          min: null,
          max: null,
          startOnTick: false,
        },
        tooltip: {
          split: false,
          shared: true,
        },
        yAxis: [
          {
            //axis 0
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
            tickPositioner: function () {
              var positions = [],
                tick = 0,
                increment = (this.dataMax - this.dataMin) / 5,
                max = this.dataMax,
                min = this.dataMin;
                if(increment > 1) {
                  increment = Math.ceil(increment);
                  tick = Math.floor(this.dataMin);
                  for (tick; tick - increment <= this.dataMax; tick += increment) {
                    positions.push(tick);
                  }
                } else {
                  tick = Number(min.toFixed(1))
                  increment = Number(increment.toFixed(3))
                  for (tick; tick - increment <= this.dataMax; tick += increment) {
                    positions.push(Number(tick.toFixed(2)));
                  }
                }
              return positions;
			      }
          },
          {
            //axis 1
            labels: {
              align: "right",
              x: -3
            },
            title: {
              text: "指数"
            },
            height: "50%",
            resize: {
              enabled: true
            },
            gridLineWidth:0,
            lineWidth: 0,
            showLastLabel: true,
            showFirstLabel: true,
            opposite: false,
            visible: false,
            tickPositioner: function () {
              var positions = [],
                tick = 0,
                increment = (this.dataMax - this.dataMin) / 5,
                max = this.dataMax,
                min = this.dataMin;
                if(increment > 1) {
                  increment = Math.ceil(increment);
                  tick = Math.floor(this.dataMin);
                  for (tick; tick - increment <= this.dataMax; tick += increment) {
                    positions.push(tick);
                  }
                } else {
                  tick = Number(min.toFixed(1))
                  increment = Number(increment.toFixed(3))
                  for (tick; tick - increment <= this.dataMax; tick += increment) {
                    positions.push(Number(tick.toFixed(2)));
                  }
                }
              return positions;
			      }
          },
          {
            //axis 2
            labels: {
              align: "left",
              x: -3
            },
            title: {
              text: "成交量(亿)"
            },
            top: "50%",
            height: "24%",
            offset: 0,
            lineWidth: 2
          },
          {
            //axis 3
            id : "macd",
            labels: {
              align: "left",
              x: -3
            },
            title: {
              text: "MACD"
            },
            top: "75%",
            height: "25%",
            offset: 0,
            lineWidth: 2,
            tickPositioner: function () {
              var positions = [],
                tick = 0,
                increment = (this.dataMax - this.dataMin) / 3,
                max = this.dataMax,
                min = this.dataMin;
                if(increment > 1) {
                  increment = Math.ceil(increment);
                  tick = Math.floor(this.dataMin);
                  for (tick; tick - increment <= this.dataMax; tick += increment) {
                    positions.push(tick);
                  }
                } else {
                  tick = Number(min.toFixed(1))
                  increment = Number(increment.toFixed(3))
                  for (tick; tick - increment <= this.dataMax; tick += increment) {
                    positions.push(Number(tick.toFixed(2)));
                  }
                }
              return positions;
			      }
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
            dataGrouping:[],
            yAxis: 0,
            maxPointWidth: 5,
            id: "maindayk"
          },
          {
            type: "column",
            name: "成交量(亿)",
            data: [],
            yAxis: 2,
            dataGrouping: [],
            maxPointWidth: 7,
          },
          {
            type:'line',
            name:'ma5' ,
            data: [],
            color: "#000000",
            yAxis: 0,
            dataGrouping:[],
            lineWidth: 1,
          },{
            type:'line',
            name:'ma10' ,
            data: [],
            color: "#ffc349",
            yAxis: 0,
            dataGrouping:[],
            lineWidth: 1,
          },{
            type:'line',
            name:'ma20' ,
            data: [],
            color: "#ff8796",
            yAxis: 0,
            dataGrouping:[],
            lineWidth: 1,
          },{
            type:'line',
            name:'ma30' ,
            data: [],
            color: "#97c068",
            yAxis: 0,
            dataGrouping:[],
            lineWidth: 1,
          }
          ,{
            type:'line',
            name:'大盘',
            data: [],
            color: "red",
            yAxis: 1,
            dataGrouping:[],
            lineWidth: 1,
            visible: false,
          }
          ,{
            type:'line',
            name:'name',
            data: [],
            color: "white",
            yAxis: 1,
            dataGrouping:[],
            lineWidth: 0,
            visible: true,
            enableMouseTracking: false
          },
          {
            yAxis: "macd",
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
            maxPointWidth: 2,
            visible: true,
            id : "macdseries"
          }
        ],
      }, 
      code: "",
      stockname: "",
      dayk:[],
      reladayk:[],
      ohlcdata:[],
      chart: null,
      clientHeight: "",
      indtype: "",
    };
  },

  methods: {
    display() {
      if(this.checked) {
        let chart = this.$refs.mystock.chart;
        chart.series[6].show();
        chart.yAxis[1].setCompare("percent", true);
      } else {
        let chart = this.$refs.mystock.chart;
        chart.series[6].hide();
      }
    },
    setToMacd() {
      let chart = this.$refs.mystock.chart;
      if (this.indtype == "macd") {
        return
      }
      if (this.indtype == "bolling") {

        chart.addSeries({
            yAxis: "macd",
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
            maxPointWidth: 2,
            id : "macdseries"
          });
          chart.get("bollingdayk").remove()
          chart.get("bollingseries").remove()
          this.indtype = "macd"
          chart.get("macd").setTitle({
            text: 'MACD',
          });
          return
      }
    },
    setToBoll() {
      let chart = this.$refs.mystock.chart;
      if (this.indtype == "bolling") {
        return
      }
      if (this.indtype == "macd") {

        chart.addSeries({
            type: "ohlc",
            name: "价格",
            color: "green",
            lineColor: "green",
            upColor: "red",
            upLineColor: "red",
            tooltip: {},
            navigatorOptions: {
              color: Highcharts.getOptions().colors[0]
            },
            data: this.ohlcdata,
            dataGrouping: [],
            yAxis: "macd",
            maxPointWidth: 5,
            id: "bollingdayk"
          });

        chart.addSeries({
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
            yAxis: "macd",
            name: '布林（20,2）',
            linkedTo: 'bollingdayk',
            id : "bollingseries"
          });
          chart.get("macdseries").remove()
          chart.get("macd").setTitle({
            text: 'Bolling',
          });
          this.indtype = "bolling"
      }
    },
    createData() {
      let stockData = this.dayk
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
      let ohlc2 = [];
      let dayday = [];
      let reladayday = [];
      let volume = [];
      let maset = [5,10,20,30];
			let ma = [];
      let relastockData = this.reladayk;
      let this0 = stockData[dataLength - 1].close;
      let rela0 = relastockData[dataLength - 1].close;
      for (i = dataLength - 1; i >= 0; i -= 1) {
        timeStamp = moment(stockData[i].date, 'YYYY-MM-DD').valueOf();
        amountv = stockData[i].amount/1E8
        if(amountv != NaN) {
          amountv = Number(amountv.toFixed(3))
        }
        //console.log(stockData[i].date, amountv)
        ohlc.push([
          timeStamp, // the date
          stockData[i].open, // open
          stockData[i].high, // high
          stockData[i].low, // low
          stockData[i].close // close
        ]);
        ohlc2.push([
          timeStamp, // the date
          stockData[i].close // close
        ]);
        volume.push({
          x: timeStamp,
          y: amountv, // the date
          color: stockData[i].open > stockData[i].close ? 'green' : 'red'
        });
        dayday.push([
          timeStamp,
          stockData[i].close
        ]);
        reladayday.push([
          timeStamp,
          relastockData[i].close
        ]);
        for (let j = 0; j < maset.length; j++) {
          let value = maset[j];
          if(typeof ma['ma'+value] == "undefined"){
            ma['ma'+value]=[];
          }
          if(typeof ma[value+'total'] == "undefined"){
            ma[value+'total']=0;
          }
          if(i > dataLength - 1 - value)
          {
            ma[value+'total'] += stockData[i].close;
            ma['ma'+value].push([timeStamp,null]);
          } else {
            ma[value+'total'] += (stockData[i].close - stockData[i + value].close);
            let kk = Number((ma[value+'total']/value).toFixed(2))
            ma['ma'+value].push([timeStamp, kk]);
          }   
        }
      }

      this.stockOptions.series[0].data = ohlc;
      this.stockOptions.series[1].data = volume;
      this.stockOptions.series[2].data = ma['ma5'];
      this.stockOptions.series[3].data = ma['ma10'];
      this.stockOptions.series[4].data = ma['ma20'];
      this.stockOptions.series[5].data = ma['ma30'];
      this.ohlcdata = ohlc;

      stockData = this.reladayk;
      // set the allowed units for data grouping
      i = 0;
      timeStamp = 0;
      ohlc = [];
      for (i = dataLength - 1; i >= 0; i -= 1) {
        timeStamp = moment(stockData[i].date, 'YYYY-MM-DD').valueOf();
        // let value = Number((stockData[i].close/rela0*this0).toFixed(2));
        let value = stockData[i].close;
        ohlc.push([
          timeStamp, 
          value// close
        ])
      }

     this.stockOptions.series[6].data = ohlc;
     this.stockOptions.series[7].data = ohlc2;

     if(dataLength < 20) {
        // console.log("length < 20")
        var latesttime = ohlc[dataLength - 1][0]
        for(i = dataLength; i < 20; i+=1) {
          latesttime += 24 *3600000
          volume.push({
            x: latesttime,
            y: null,
            color: 'white'
          });
        }
        this.stockOptions.series[1].data = volume;
        this.stockOptions.xAxis.min = ohlc[0][0];
        this.stockOptions.xAxis.max = ohlc[0][0] + 20*24 *3600000;
        this.stockOptions.xAxis.minRange = 30*24 *3600000;
      } else {
        // console.log("length > 20")
        this.stockOptions.xAxis.min = null;
        this.stockOptions.xAxis.max = null;
        this.stockOptions.xAxis.minRange = 30*24 *3600000;
      }
    },
    changeSize() {
          if(this.$refs.mystock == undefined) {
            return
          }
          let chart = this.$refs.mystock.chart;
          if(this.clientHeight < 400) {
            this.clientHeight = 400
          }
          chart.setSize(null, this.clientHeight);
    }
  },

  mounted() {
    this.$nextTick(function () {
    this.clientHeight = `${document.documentElement.clientHeight}` * 0.7 - 150;
    this.changeSize();
    let _this = this;
    window.addEventListener('resize', function() {
                _this.clientHeight = `${document.documentElement.clientHeight}` * 0.7 - 150;
                _this.changeSize()
            }, false)
    })
  },

  created() {
    // console.log('creatd')
    this.code = this.props1['code'];
    this.dayk = this.props1['kdata'];
    this.stockname = this.props1['name'];
    this.reladayk = this.props1['reladay'];
    this.indtype = "macd";
    this.createData();
  },

};
</script>

<style scoped>
.stock {
  width: 100%; 
  margin: 20 auto;
}
</style>
