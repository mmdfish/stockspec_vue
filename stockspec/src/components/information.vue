<template>
    <div class="hq_details has_limit" id="hq">
                    <div class="price_time">
                        <div class="price clearfix" id="trading">
                            <div class="change">
                                <div id="change" :class="getChangeClass(price_change)">{{price_change}}</div>
                                <div id="changeP" :class="getChangeClass(price_changeP)">{{price_changeP}}%</div>
                            </div>
                            <div id="arrow" :class="getArrowClass(price_change)"></div>
                            <div id="price" :class="getPriceClass(price_close)">{{price_close}}</div>
                            <div class="ud_limit" id="ud_limie">
                                <div>涨停：{{price_limit_high}}</div>
                                <div>跌停：{{price_limit_low}}</div>
                            </div>
                        </div>
                        <div class="price" id="closed">
                            停牌
                        </div>
                        <div class="time" id="hqTime">
                            {{price_time}} 15:00:00
                        </div>
                        <div class="time blue_l" id="hqPause">临时停牌</div>
                    </div>
                    <div class="other" id="hqDetails">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <colgroup>
                                <col width="60">
                                <col width="50">
                                <col width="60">
                                <col width="70">
                                <col width="70">
                                <col width="40">
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>今&nbsp;&nbsp;开：</th>
                                <td :class="getPriceClass(price_open)">{{price_open}}</td>
                                <th>成交量：</th>
                                <td>{{volume}}万手</td>
                                <th>振&nbsp;&nbsp;幅：</th>
                                <td>{{price_down_up}}%</td>
                            </tr>
                            <tr>
                                <th>最&nbsp;&nbsp;高：</th>
                                <td :class="getPriceClass(price_high)">{{price_high}}</td>
                                <th>成交额：</th>
                                <td>{{volume_money}}亿元</td>
                                <th>换手率：</th>
                                <td>{{turnover_rate}}%</td>
                            </tr>
                            <tr>
                                <th>最&nbsp;&nbsp;低：</th>
                                <td :class="getPriceClass(price_low)">{{price_low}}</td>
                                <th>总市值：</th>
                                <td></td>
                                <th>市净率：</th>
                                <td>{{PBR}}</td>
                            </tr>
                            <tr>
                                <th>昨&nbsp;&nbsp;收：</th>
                                <td>{{price_preclose}}</td>
                                <th>流通值：</th>
                                <td>{{circulation_value}}亿</td>
                                    <th>市盈率<sup>TTM</sup>：</th>
                                    <td>{{PER}}</td>
                                    
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
</template>

<script>

export default{
    name:'test',
    props:["dayinfo"],
    data() {
      return {
        dayInfo:[],
        price_time:"",
        price_change:0,     //涨跌值
        price_changeP:"",   //涨跌幅
        price_up:0,         
        price_limit_high:0,    //涨停
        price_limit_low:0,   //跌停
        price_open:0,         //开盘价
        volume:0,       //成交量
        volume_money:0,   //成交额
        price_down_up:0,   //振幅
        price_high:0,      //最高 
        price_low:0,        //最低
        turnover_rate:0,     //换手率
        market_cap:0,       //总市值
        PBR:0,             //市净率
        PER:0,             //市盈率
        price_preclose:0,     //昨收
        circulation_value:0,     //流通值
      }
    },

    methods:{
        createData() {
            this.price_time = this.dayInfo.date;
            this.price_open = this.dayInfo.open.toFixed(2);
            this.price_close = this.dayInfo.close.toFixed(2);
            this.price_high = this.dayInfo.high.toFixed(2);
            this.price_low = this.dayInfo.low.toFixed(2);
            this.price_preclose = this.dayInfo.preclose.toFixed(2);
            this.turnover_rate = this.dayInfo.turn.toFixed(2);
            this.price_change = (this.price_close - this.price_preclose).toFixed(2);
            this.price_changeP = (this.price_change/this.price_preclose * 100).toFixed(2);
            this.volume = (this.dayInfo.volume / 100/10000).toFixed(2);
            this.volume_money = (this.dayInfo.amount/1E8).toFixed(2);
            this.price_limit_high = (this.price_preclose*1.1).toFixed(2);
            this.price_limit_low = (this.price_preclose*0.9).toFixed(2);
            this.price_down_up = ((this.dayInfo.high-this.dayInfo.low)/this.dayInfo.preclose*100).toFixed(2);
            this.PBR = this.dayInfo.pbMRQ.toFixed(2);
            this.PER = this.dayInfo.peTTM.toFixed(2);
            this.circulation_value = (this.dayInfo.volume / this.dayInfo.turn * 100 * this.dayInfo.close / 1E8).toFixed(2);
            this.market_cap = this.circulation_value
        },

        getChangeClass(value) {
            if(value > 0) {
                return 'up'
            } else if(value < 0) {
                return 'down'
            } else {
                return 'flat'
            }
        },

        getArrowClass(value) {
            if(value > 0) {
                return 'arrow arrow_up'
            } else if(value < 0) {
                return 'arrow arrow_down'
            } else {
                return 'arrow arrow_flat'
            }
        },

        getPriceClass(value) {
            if(value > this.price_preclose) {
                return 'up'
            } else if(value < this.price_preclose) {
                return 'down'
            } else {
                return 'flat'
            }
        },
    },

    created() {
      this.dayInfo = this.dayinfo;
    //   console.log(this.dayInfo)
      this.createData();
    }
}
</script>

<style>

.hq_details #arrow{float:right;width:21px;height:22px;margin-top:9px;}
.hq_details .arrow{background:url(//www.sinaimg.cn/cj/realstock/2012/images/back.8.png) -576px -160px;}
.hq_details .arrow_up{background:url(//www.sinaimg.cn/cj/realstock/2012/images/back.8.png) -544px -160px;}
.hq_details .arrow_down{background:url(//www.sinaimg.cn/cj/realstock/2012/images/back.8.png) -512px -160px;}
.hq_details .arrow_flat{background:url(//www.sinaimg.cn/cj/realstock/2012/images/back.8.png) -576px -160px;}

.hq_details{height:102px;width:600px;margin:0 auto;}
.hq_details .price_time{float:left;width:180px;margin-top:12px;padding:0 26px 0 9px;border-right:1px solid #e1e8f5;}
.hq_details{height:116px;background:#fff; color:#333; padding:5px 0; font:12px/20px "宋体";}
.hq_details .price_time{width: 165px;padding-right: 10px;}
.hq_details .price{/* height:43px; */}
.hq_details #price{float:right;padding-right:6px;text-align:right;font-size:24px;/*为了美观设大了字体，如果出现千元股需要改！*/line-height:43px;font-family:Arial;margin-left: -6px;}
.hq_details #arrow{float:right;width:21px;height:22px;margin-top:9px;}
.hq_details .arrow{background:url(//www.sinaimg.cn/cj/realstock/2012/images/back.8.png) -576px -160px;}
.hq_details .arrow_up{background:url(//www.sinaimg.cn/cj/realstock/2012/images/back.8.png) -544px -160px;}
.hq_details .arrow_down{background:url(//www.sinaimg.cn/cj/realstock/2012/images/back.8.png) -512px -160px;}
.hq_details .arrow_flat{background:url(//www.sinaimg.cn/cj/realstock/2012/images/back.8.png) -576px -160px;}
.hq_details .change{float:right;padding-left:5px;margin-top:5px;text-align:right;line-height:16px;}
.hq_details #change{}
.hq_details #changeP{}
.hq_details #closed{display:none;text-align:center;font-family:微软雅黑,黑体;font-size:24px;line-height:36px;color:Red;text-align:center;}
.hq_details .time{border-top:1px solid #e1e8f5;text-align:center;}
#hqPause{display:none;color:#A0A0A0;}
.hq_details .other{float:left;width:320px;margin-top:5px;color:#3d6cb0;line-height:22px;}
.hq_details .other table{width:100%;}
.hq_details .other table th{text-align:right;color:#062784; white-space: nowrap;}
.hq_details .other table td{white-space: nowrap}

.block_hq{}
.block_hq .hq_L{float:left;width:560px;padding-bottom:10px;border-bottom:8px solid #f0f3fa;}
.block_hq .hq_R{float:right;width:195px;}
.hq_details{height:100px;background:#fff; color:#333; padding:5px 0; font:12px/20px "宋体";}
.hq_details .price_time{width: 165px;padding-right: 10px;}
.has_limit{margin:0 auto;}
.has_limit .price{height:55px;}
.has_limit .change{margin-top:0px;}
.has_limit #arrow{margin-top:3px;}
.has_limit #price{line-height:31px;}
.ud_limit{display:none;}
.has_limit .ud_limit{display:block;clear:both;height:23px;border-top:1px solid #E1E8F5;line-height:23px;color:#08237a;}
.has_limit .ud_limit div{float:left;width:49.9%;white-space: nowrap;}

.hq_details .other{width:375px;line-height:21px;}
.block_hq .hq_R .data_table table{line-height:24px;}
.trade_info .trade_info_cont tbody{line-height:25px;}


.up,.rup_up,.gup_down,.us_down,.hk_down{color:Red;}
.down,.rup_down,.gup_up,.us_up,.hk_up{color:Green;}
.flat{color:#7f7f7f;}

</style>