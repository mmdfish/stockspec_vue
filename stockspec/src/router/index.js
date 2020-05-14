import Vue from 'vue'
import Router from 'vue-router'
import stock from '@/components/stock'
import stockspec from '@/components/stockspec'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/stock',
      name: 'Stock',
      component: stock
    }
    ,
    {
      path: '/stockspec',
      name: 'StockSpec',
      component: stockspec
    },
  ]
})
