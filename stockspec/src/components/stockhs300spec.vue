<template>
  <div>
  <div style="font-size:20px">沪深300个股跑赢沪深300指数排名</div>
  <el-table :data="stockSpecData" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :height="tableHeight" style="width: 100%" @row-click="displayDetails">
    <el-table-column prop="code" label="代码" fixed :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="name" label="名字" fixed :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <a :href="getLink(scope.row.code)" target="_blank" class="buttonText"><div style="font-size:16">{{scope.row.name}}</div></a>
      </template>
    </el-table-column>
    <el-table-column
      v-for="(item,key) in titleData"
      :key="key"
      :prop="item.value"
      :label="item.name"
      sortable
    >
      <template slot-scope="scope">
        <span>{{getDisplayValueScope(scope)}}</span>
      </template>
    </el-table-column>
  </el-table>
      <el-dialog :title="selectname + '(' + selectcode + ')'" :visible.sync="dialogTableVisible" custom-class="customSize">
      <div v-if="dialogTableVisible"><candlechartall :props1="candleprops"></candlechartall></div>
    </el-dialog>
  </div>
</template>

<style>
  .customSize{
    width:70%;
    height:70%;
  }

  .el-table th>.cell{
        display: inline-block;
        white-space: nowrap;
        word-break: keep-all;
        text-overflow: unset;
  }

  .el-table td>.cell{
        display: inline-block;
        white-space: nowrap;
        word-break: keep-all;
        text-overflow: unset;
  }

  .el-dialog {
    display: flex;
    flex-direction: column;
  }

  .el-dialog__body {
    overflow: auto;
  }

</style>

<script>
import Vue from 'vue'
import axios from "axios";
import common from './common.vue'
import candlechartall from "./CandleChart_all.vue"

export default {

  name: "StockSpec",
  data() {
    return {
      stockSpecData: [],
      dialogTableVisible: false,
      selectcode:"",
      selectname:"",
      dayk:[],
      tableHeight: window.innerHeight,
      hs300dayk:[],
      selectreladayk:[],
      candleprops: {},
    };
  },

  components: {
    candlechartall
  },

  mounted:function(){
        this.$nextTick(function () {
            this.tableHeight = window.innerHeight - 150;
            
            let self = this;
            window.onresize = function() {
                self.tableHeight = window.innerHeight - 150;
            }
        })　
    },

  methods: {

    getLink(code) {
      let result = "http://finance.sina.com.cn/realstock/company/"
      let sss = code.replace('.','')
      result += sss
      result += '/nc.shtml'
      return result
    },

    getIsDisplayInDialog(key) {
      let result = key != 'index' && key != 'date' && key != 'name' && key != 'code' && key != 'relacode'
      return result
    },
    getDisplayValueScope(scope) {
      return common.getDisplayValueScope(scope)
    },

    getDisplayValue(name, value) {
      return common.getDisplayValue(name, value)
    },

    displayDetails(row, column, event) {
      if(column.label == "名字") {
        return
      }
      this.selectcode = row.code
      this.selectname = row.name
      this.selectreladayk = this.hs300dayk

      axios
      .get(common.django_url + "/stockserver/dayk/", {
        params: {
          code: this.selectcode,
        }
      })
      .then(response => {
        this.dayk = response.data.data;
        this.candleprops = {
          'code':this.selectcode,
          'name':this.selectname,
          'kdata': this.dayk,
          'reladay': this.selectreladayk,
        };
        this.dialogTableVisible = true
      });
      
    },

    getData() {

      this.specdict = common.spec_dict
      let columnNames = common.hs300_listNames

      this.titleData = [];

      for(let index in columnNames) {
        let name = columnNames[index]
        if(name == this.specname) {
          continue;
        }  
        this.titleData.push({
          name: this.specdict[name],
          value: name
        })
      };  
    }
  },

  created() {
    this.getData();
    axios
      .get(common.django_url + "/stockserver/hs300spec/")
      .then(response => {
        this.stockSpecData = response.data.data;
      });
    
    axios
      .get(common.django_url + "/stockserver/dayk/", {
        params: {
          code: 'sh.000300',
        }
      })
      .then(response => {
        this.hs300dayk = response.data.data;
      });
  }

  
};
</script>