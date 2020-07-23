<script type="text/javascript">
    const spec_dict = {"code":"代码","name":"股票名", "relacode":"参考","alpha_y":"阿法系数(年)","alpha_m":"阿法系数(月)","beta_y":"贝塔系数(年)",
      "beta_m":"贝塔系数(月)","r_y":"R平方(年)","r_m":"R平方(月)","corr_y":"相关性(年)","cov_y":"协方差(年)","corr_m":"相关性(月)","cov_m":"协方差(月)",
      "amplitude_y":"振幅(年)","amplitude_m":"振幅(月)","amplitude_10":"振幅(10日)","amplitude_5":"振幅(5日)", "highopen_y":"高开(年)", "highopen_m":"高开(月)",
      "trendgap_y":"跑赢(年)","trendgap_hy":"跑赢(半年)","trendgap_qy":"跑赢(3月)","trendgap_m":"跑赢(月)", "trendgap_10":"跑赢(10日)","trendgap_5":"跑赢(5日)",}
    const listNames = ["beta_y", "beta_m", "corr_y", "corr_m", "amplitude_5", "amplitude_10", "amplitude_m","amplitude_y","highopen_y","highopen_m"]
    const hs300_listNames = ["trendgap_y", "trendgap_hy", "trendgap_qy", "trendgap_m", "trendgap_10", "trendgap_5"]

    const django_url = "http://127.0.0.1:8000"
    //const django_url = "http://49.232.69.19:8000"
    
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
        listNames,
        hs300_listNames,
        django_url
    }

    
</script>