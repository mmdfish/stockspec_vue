import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import stock from '@/components/stock'
import stockspec from '@/components/stockspec'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
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
