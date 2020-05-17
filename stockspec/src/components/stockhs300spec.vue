<template>
  <div>
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
      <div v-if="dialogTableVisible"><candlechart :props1="candleprops"></candlechart></div>
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
import candlechart from "./CandleChart.vue";

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
    candlechart
  },

  mounted:function(){
        this.$nextTick(function () {
            this.tableHeight = window.innerHeight - 100;
            
            let self = this;
            window.onresize = function() {
                self.tableHeight = window.innerHeight - 100;
                console.log("change")
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
      .get("http://127.0.0.1:8000/stockserver/dayk/", {
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

      console.log(this.titleData)
    }
  },

  created() {
    this.getData();
    axios
      .get("http://127.0.0.1:8000/stockserver/hs300spec/")
      .then(response => {
        this.stockSpecData = response.data.data;
      });
    
    axios
      .get("http://127.0.0.1:8000/stockserver/dayk/", {
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