<template>
  <div ref="divvv">
    <div><information :dayinfo="dayInfo"></information></div>
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
import information from './information.vue'

export default {

  name: "CandleChart_all",
  props:["props1"],
  checked: false,
  components: {
    information
  },
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
          inputDateFormat: '%Y-%m-%d',
          inputEnabled: false
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
                line: {
                  marker: {
                      enabled: false
                  }
                },
                dataGrouping: {
                  enabled: false
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
          minRange:30*24 *3600000,
          min: null,
          max: null,
          startOnTick: false,
        },
        tooltip: {
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
              text: "成交(万手)"
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
                tick = 0;
                if (this.dataMax == undefined) {
                  return positions;
                } 
                var increment = (this.dataMax - this.dataMin) / 3,
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
            name: "成交(万手)",
            data: [],
            yAxis: 2,
            maxPointWidth: 7,
          },
          {
            type:'line',
            name:'ma5' ,
            data: [],
            color: "#000000",
            yAxis: 0,
            lineWidth: 1,
          },{
            type:'line',
            name:'ma10' ,
            data: [],
            color: "#ffc349",
            yAxis: 0,
            lineWidth: 1,
          },{
            type:'line',
            name:'ma20' ,
            data: [],
            color: "#ff8796",
            yAxis: 0,
            lineWidth: 1,
          },{
            type:'line',
            name:'ma30' ,
            data: [],
            color: "#97c068",
            yAxis: 0,
            lineWidth: 1,
          }
          ,{
            type:'line',
            name:'大盘',
            data: [],
            color: "red",
            yAxis: 1,
            lineWidth: 1,
            visible: false,
          }
          ,{
            type:'line',
            name:'name',
            data: [],
            color: "white",
            yAxis: 1,
            lineWidth: 0,
            visible: true,
            enableMouseTracking: false
          },
          {
            yAxis: "macd",
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
      tipdata:[],
      chart: null,
      clientHeight: "",
      indtype: "",
      // dayInfo:[],
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
            navigatorOptions: {
              color: Highcharts.getOptions().colors[0]
            },
            data: this.ohlcdata,
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
      let volume = [];
      let maset = [5,10,20,30];
			let ma = [];
      let relastockData = this.reladayk;
      let this0 = stockData[dataLength - 1].close;
      let rela0 = relastockData[dataLength - 1].close;

      let open = 0;
      let high = 0;
      let low = 0;
      let close = 0;
      let preclose = 0;
      let openper = 0;
      let highper = 0;
      let lowper = 0;
      let closeper = 0;

      let tipd = [];

      for (i = dataLength - 1; i >= 0; i -= 1) {
        timeStamp = moment(stockData[i].date, 'YYYY-MM-DD').valueOf();
        amountv = stockData[i].volume/1E6
        if(amountv != NaN) {
          amountv = Number(amountv.toFixed(3))
        }

        open = stockData[i].open;
        high = stockData[i].high;
        low = stockData[i].low;
        close = stockData[i].close;
        preclose = stockData[i].preclose;
        openper = (open - preclose)/preclose * 100;
        highper = (high - preclose)/preclose * 100;
        lowper = (low - preclose)/preclose * 100;
        closeper = (close - preclose)/preclose * 100;
        if (open == close) {
          if(open > preclose) {
            close = open + 0.000001;
          } else {
            close = open - 0.000001;
          }
        }

        //console.log(stockData[i].date, amountv)
        ohlc.push([
          timeStamp, // the date
          open,
          high,
          low,
          close
        ]);
        ohlc2.push([
          timeStamp, // the date
          close // close
        ]);
        volume.push({
          x: timeStamp,// the date
          y: amountv, //amount
          color: open > close ? 'green' : 'red'
        });
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
        
        tipd.push([
          timeStamp, // the date
          openper,
          highper,
          lowper,
          closeper,
          preclose
        ]);

      }

      this.dayInfo = stockData[0]
      // console.log(this.dayInfo)

      this.tipdata = tipd;

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

     var relativeWidth = 0;
     this.stockOptions.tooltip = {
          formatter: function() {
               if(this.y == undefined){
                   return;
               }
               for(var i =0;i<tipd.length;i++){
                   if(this.x == tipd[i][0]){
                       openper = tipd[i][1].toFixed(2);
                       highper = tipd[i][2].toFixed(2);
                       lowper = tipd[i][3].toFixed(2);
                       closeper = tipd[i][4].toFixed(2);
                       preclose = tipd[i][5].toFixed(2);
                   }
               }
               let length = this.points.length
               open = this.points[0].point.open.toFixed(2);
               high = this.points[0].point.high.toFixed(2);
               low = this.points[0].point.low.toFixed(2);
               close = this.points[0].point.close.toFixed(2);
               let vol = this.points[1].point.y.toFixed(2);
               relativeWidth = this.points[0].point.shapeArgs.x;
              var tip= '<b>'+ Highcharts.dateFormat('%Y-%m-%d  %A', this.x) +'</b><br/>';
              if(open>preclose){
                  tip += '开盘价：<span style="color: #DD2200;">'+open+ '(' + openper + '%) </span><br/>';
              }else{
                  tip += '开盘价：<span style="color: #33AA11;">'+open+ '(' + openper + '%) </span><br/>';
              } 
              if(high>preclose){
                  tip += '最高价：<span style="color: #DD2200;">'+high+ '(' + highper + '%) </span><br/>';
              }else{
                  tip += '最高价：<span style="color: #33AA11;">'+high+ '(' + highper + '%) </span><br/>';
              } 
              if(low>preclose){
                  tip += '最低价：<span style="color: #DD2200;">'+low+ '(' + lowper + '%) </span><br/>';
              }else{
                  tip += '最低价：<span style="color: #33AA11;">'+low+ '(' + lowper + '%) </span><br/>';
              }
              if(close>preclose){
                  tip += '收盘价：<span style="color: #DD2200;">'+close+ '(' + closeper + '%) </span><br/>';
              }else{
                  tip += '收盘价：<span style="color: #33AA11;">'+close+ '(' + closeper + '%) </span><br/>';
              }
              if(length > 2) {
                let MA5 = this.points[2].y.toFixed(2);
                tip += '<span style="color: #000000;">MA5：'+ MA5 + '</span><br/>';
              }
              if(length > 3) {
                let MA10 = this.points[3].y.toFixed(2);
                tip += '<span style="color: #ffc349;">MA10：'+ MA10 + '</span><br/>';
              }
              if(length > 4) {
                let MA20 = this.points[4].y.toFixed(2);
                tip += '<span style="color: #ff8796;">MA20：'+ MA20 + '</span><br/>';
              }
              if(length > 5) {
                let MA30 = this.points[5].y.toFixed(2);
                tip += '<span style="color: #97c068;">MA30：'+ MA30 + '</span><br/>';
              }
              tip += "成交量："+vol+"(万手)<br/>";
              return tip;
          },
          crosshairs: {
                   dashStyle: 'dash'
           },
               borderColor:    'white',
            // positioner: function () { //设置tips显示的相对位置
            //     var halfWidth = this.chart.chartWidth/2;//chart宽度
            //     var width = this.chart.chartWidth-180;
            //     var height = this.chart.chartHeight/5-8;//chart高度
            //     if(relativeWidth<halfWidth){
            //         return { x: width - 40, y:height };
            //     }else{
            //         return { x: 0, y: height };
            //     }
            // },
            shadow: false,
            shared: true
        }

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
          if(chart==undefined) {
            return
          }
          // console.log("chart ", chart)
          if(this.clientHeight < 400) {
            this.clientHeight = 400
          }
          chart.setSize(null, this.clientHeight);
    }
  },

  mounted() {
    this.$nextTick(function () {
    this.clientHeight = `${document.documentElement.clientHeight}` * 0.7 - 160;
    this.changeSize();
    let _this = this;
    window.addEventListener('resize', function() {
                _this.clientHeight = `${document.documentElement.clientHeight}` * 0.7 - 160;
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
