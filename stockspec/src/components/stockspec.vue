<template>
  <div>
  <el-table :data="stockSpecData" :header-cell-style="{background:'#eef1f6',color:'#606266'}" :height="tableHeight" style="width: 100%" @row-click="displayDetails">
    <el-table-column prop="code" label="代码" fixed></el-table-column>
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
    >
      <template slot-scope="scope">
        <span>{{getDisplayValueScope(scope)}}</span>
      </template>
    </el-table-column>
  </el-table>
      <el-dialog :title="selectname + '(' + selectcode + ')'" :visible.sync="dialogTableVisible" custom-class="customSize">
      <div v-if="dialogTableVisible"><candlechartmacd :props1="candleprops"></candlechartmacd></div>
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
import candlechartmacd from "./CandleChart_macd.vue";
import candlechartbollinger from "./CandleChart_bollinger.vue";

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
      shdayk:[],
      szdayk:[],
      selectreladayk:[],
      candleprops: {},
      specname:"",
      order:"",
      abs:"",
    };
  },

  components: {
    candlechart,
    candlechartmacd,
    candlechartbollinger
  },

  mounted:function(){
        this.$nextTick(function () {
            this.tableHeight = window.innerHeight -150;
            
            let self = this;
            window.onresize = function() {
                self.tableHeight = window.innerHeight -150;
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
      if(this.selectcode.startsWith('sh')) {
        this.selectreladayk = this.shdayk
      } else {
        this.selectreladayk = this.szdayk
      }

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
      this.specname = this.$route.query.specname;
      this.order = this.$route.query.order;
      this.abs = false;
      if(this.$route.query.abs) {
        this.abs = this.$route.query.abs
      }

      this.specdict = common.spec_dict
      let columnNames = common.listNames

      this.titleData = [
        {
          name: this.specdict[this.specname],
          value: this.specname
        }
      ];

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

      axios
      .get(common.django_url + "/stockserver/spec/", {
        params: {
          specname: this.specname,
          order: this.order,
          abs: this.abs
        }
      })
      .then(response => {
        this.stockSpecData = response.data.data;
      });
    
    axios
      .get(common.django_url + "/stockserver/dayk/", {
        params: {
          code: 'sh.000001',
        }
      })
      .then(response => {
        this.shdayk = response.data.data;
      });
    
    axios
      .get(common.django_url + "/stockserver/dayk/", {
        params: {
          code: 'sz.399001',
        }
      })
      .then(response => {
        this.szdayk = response.data.data;
      });

    }
  },

  created() {
    this.getData();
  }

  
};
</script>