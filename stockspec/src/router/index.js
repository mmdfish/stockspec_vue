import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/components/mainpage'
import stock from '@/components/stock'
import stockspec from '@/components/stockspec'
import stockhs300spec from '@/components/stockhs300spec'
import empty from '@/components/empty'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/stock',
      name: 'MainPage',
      component: mainpage,
      children:[
        {
          path: '/stock/stock',
          name: 'Stock',
          component: stock,
          children:[
            {
              path: '/stock/stockspec',
              name: 'StockSpec',
              component: stockspec
            },
            {
              path: '/stock/empty',
              name: 'Empty',
              component: empty
            }
          ]
        }
        ,
        {
          path: '/stock/stockhs300spec',
          name: 'Stockhs300Spec',
          component: stockhs300spec
        },
      ]
    },
  ]
    
})
