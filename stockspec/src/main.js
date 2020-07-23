// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'

import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
// import stockInit from 'highcharts/modules/stock'
// import indicators from "highcharts/indicators/indicators";
// import ema from "highcharts/indicators/ema";
// import macd from "highcharts/indicators/macd";
// import bb from "highcharts/indicators/bollinger-bands";
import Antd from 'ant-design-vue'

Vue.use(VueRouter)
Vue.use(ELEMENT)

Vue.use(Antd)
// Vue.use(stockInit)

// stockInit(Highcharts)
// indicators(Highcharts);
// ema(Highcharts);
// macd(Highcharts);
// bb(Highcharts);

Vue.use(HighchartsVue)


Highcharts.setOptions({
  global: {
   useUTC: false
  },
  lang:{
   months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月','九月',  '十月','十一月', '十二月'],
   weekdays:['星期日',  '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
   shortMonths: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
   }
});



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
