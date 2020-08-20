<script type="text/javascript">
    const spec_dict = {"code":"代码","name":"股票名", "relacode":"参考","alpha_y":"阿法系数(年)","alpha_m":"阿法系数(月)","beta_y":"贝塔系数(年)",
      "beta_m":"贝塔系数(月)","r_y":"R平方(年)","r_m":"R平方(月)","corr_y":"相关性(年)","cov_y":"协方差(年)","corr_m":"相关性(月)","cov_m":"协方差(月)",
      "amplitude_y":"振幅(年)","amplitude_m":"振幅(月)","amplitude_10":"振幅(10日)","amplitude_5":"振幅(5日)", "highopen_y":"高开(年)", "highopen_m":"高开(月)",
      "trendgap_y":"跑赢(年)","trendgap_hy":"跑赢(半年)","trendgap_qy":"跑赢(3月)","trendgap_m":"跑赢(月)", "trendgap_10":"跑赢(10日)","trendgap_5":"跑赢(5日)",}
    const listNames = ["beta_y", "beta_m", "corr_y", "corr_m", "amplitude_5", "amplitude_10", "amplitude_m","amplitude_y","highopen_y","highopen_m"]
    const hs300_listNames = ["trendgap_y", "trendgap_hy", "trendgap_qy", "trendgap_m", "trendgap_10", "trendgap_5"]

    const indicator_dictNames = {"code":"代码","name":"股票名", "macd_cross_above":"MACD金叉","macd_cross_below":"MACD死叉","cross_above_boll":"上穿布林线",
      "cross_below_boll":"下穿布林线","cross_down_ma5":"下穿五日线","cross_up_ma5":"上穿五日线","ma5_5":"五日线五天","ma5_10":"五日线十天","cross_down_ma10":"下穿十日线",
      "cross_up_ma10":"上穿十日线","ma5_cross_down_ma10":"五日下穿十日线","ma5_cross_up_ma10":"五日上穿十日线","ma5_cross_down_ma20":"五日下穿二十日", "ma5_cross_up_ma20":"五日上穿二十日",
      "ma5_cross_down_ma30":"五日下穿三十日","ma5_cross_up_ma30":"五日上穿三十日","ma5_cross_down_ma60":"五日下穿六十日","ma5_cross_up_ma60":"五日上穿六十日", 
      "ma20_cross_down_ma60":"二十日下穿三十日","ma20_cross_up_ma60":"二十日上穿三十日","huge_volume":"放量","dayk_desc_3":"连续三日"
    }

    const indicator_columnNames = ["macd_cross_above","macd_cross_below","cross_above_boll",
      "cross_below_boll","cross_down_ma5","cross_up_ma5","ma5_5","ma5_10","cross_down_ma10",
      "cross_up_ma10","ma5_cross_down_ma10","ma5_cross_up_ma10","ma5_cross_down_ma20", "ma5_cross_up_ma20",
      "ma5_cross_down_ma30","ma5_cross_up_ma30","ma5_cross_down_ma60","ma5_cross_up_ma60", 
      "ma20_cross_down_ma60","ma20_cross_up_ma60","huge_volume","dayk_desc_3"
    ]

    const indicator_listNames = ["MACD", "布林线", "日线", "五日线", "成交量", "连续三日"]

    const indicator_dict = [
      {"macd_cross_above":"MACD金叉","macd_cross_below":"MACD死叉"},
      {"cross_above_boll":"上穿布林线","cross_below_boll":"下穿布林线"},
      {"cross_down_ma5":"下穿五日线","cross_up_ma5":"上穿五日线","cross_down_ma10":"下穿十日线","cross_up_ma10":"上穿十日线"},
      {"ma5_5-1":"连续五日降", "ma5_5-2":"连续五日升", "ma5_10-1":"连续十日降", "ma5_10-2":"连续十日升",
       "ma5_cross_down_ma10": "五日下穿十日线", "ma5_cross_up_ma10":"五日上穿十日线", "ma5_cross_down_ma20":"五日下穿二十日", "ma5_cross_up_ma20":"五日上穿二十日",
       "ma5_cross_down_ma30":"五日下穿三十日","ma5_cross_up_ma30":"五日上穿三十日","ma5_cross_down_ma60":"五日下穿六十日","ma5_cross_up_ma60":"五日上穿六十日"},
      {"huge_volume":"放量"},
      {"dayk_desc_3-1":"连续三日降", "dayk_desc_3-2":"连续三日升"}
    ]

    // const django_url = "http://127.0.0.1:8000"
    const django_url = "http://49.232.69.19:8000"
    
    function getDisplayValueScope(scope) {
      var name = scope.column.property
      var value = scope.row[scope.column.property]
      return getDisplayValue(name,value)
    }

    function getDisplayValue(name,value) {
      var result = ''
      switch(name) {
        case 'index':
            result = value + 1
            break;
        case 'amplitude_y':
        case 'amplitude_m':
        case 'amplitude_10':
        case 'amplitude_5':
        case 'trendgap_y':
        case 'trendgap_hy':
        case 'trendgap_qy':
        case 'trendgap_m':
        case 'trendgap_10':
        case 'trendgap_5':
            result = (value*100).toFixed(3) + '%'
            break;
        case 'alpha_y':
        case 'alpha_m':
        case 'beta_m':
        case 'beta_y':
        case 'r_m':
        case 'r_y':
        case 'corr_y':
        case 'corr_m':
        case 'cov_m':
        case 'cov_y':
            result = rounding(value, 6)
            break;
        default:
             result = value
      } 
      return result;
    }

    function getIndicatorValueScope(scope) {
      var name = scope.column.property
      var value = scope.row[scope.column.property]
      return getIndicatorValue(name,value)
    }

    function getIndicatorValue(name,value) {
      var result = ''
      switch(name) {
        case 'index':
            result = value + 1
            break;
        case 'macd_cross_above':
        case 'macd_cross_below':
        case 'cross_above_boll':
        case 'cross_below_boll':
        case 'cross_down_ma5':
        case 'cross_up_ma5':
        case 'cross_down_ma10':
        case 'cross_up_ma10':
        case 'ma5_cross_down_ma10':
        case 'ma5_cross_up_ma10':
        case 'ma5_cross_down_ma20':
        case 'ma5_cross_up_ma20':
        case 'ma5_cross_down_ma30':
        case 'ma5_cross_up_ma30':
        case 'ma5_cross_down_ma60':
        case 'ma5_cross_up_ma60':
        case 'ma20_cross_down_ma60':
        case 'ma20_cross_up_ma60':
        case 'huge_volume':
            if(value==1) {
              result = "是"
            } else {
              result = "否"
            }
            break;
        case 'ma5_5':
        case 'ma5_10':
        case 'dayk_desc_3':
            if(value==1) {
              result = "下降"
            } else if(value==2){
              result = "上升"
            } else {
              result = "-"
            }
            break;
        default:
            result = value
      } 
      return result;
    }

    function rounding(value, number) {
      if (value == null) {
        return "-";
      }
      var result = value.toFixed(number);
      if (result == 0) {
        return value;
      }
      return result;
    }

    export default {
        spec_dict,
        getDisplayValueScope,
        getDisplayValue,
        getIndicatorValueScope,
        getIndicatorValue,
        listNames,
        hs300_listNames,
        django_url,
        indicator_listNames,
        indicator_dict,
        indicator_columnNames,
        indicator_dictNames,
    }

    
</script>