import Router from 'vue-router'
import mainpage from '@/components/mainpage'
import stock from '@/components/stock'
import stockspec from '@/components/stockspec'
import indicator from '@/components/indicator'
import indicatorspec from '@/components/indicatorspec'
import stockhs300spec from '@/components/stockhs300spec'
import empty from '@/components/empty'

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
            }
          ]
        }
        ,
        {
          path: '/stock/stockhs300spec',
          name: 'Stockhs300Spec',
          component: stockhs300spec
        },
        {
          path: '/stock/indicator',
          name: 'indicator',
          component: indicator,
          children:[
            {
              path: '/stock/indicatorspec',
              name: 'indicatorspec',
              component: indicatorspec
            }
          ]
        },
      ]
    },
    {
      path: '/empty',
      name: 'Empty',
      component: empty
    }
  ]
    
})
