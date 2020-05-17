<template>
  <div>
  <el-row v-for="name in displayNames" :key="name">
      <el-col :span="4"><div class="grid-content bg-purple-light">{{specdict[name]}}</div></el-col>
      <el-col :span="4" @click.native='goTo(name,0,false)'><div class="grid-content bg-purple">最小</div></el-col>
      <el-col :span="4" @click.native='goTo(name,1,false)'><div class="grid-content bg-purple">最大</div></el-col>
  </el-row>
  </div>
</template>

<style>
  .el-row {
    margin-bottom: 1px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    margin: 1px;
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 0px;
    min-height: 36px;
    line-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<script>
import common from './common.vue'

export default{
    name:'test',

    data() {
      return {
        displayNames: [],
        specdict : {}
      }
    },

    methods:{
        goTo(name,order_number,abs){
            let order = 'asc';
            if(order_number == 1) {
              order = 'desc'
            }
            console.log(name,order,abs)
            this.$router.push('/stockhs300spec');
            sessionStorage['specname']=name
            sessionStorage['order']=order
            sessionStorage['abs']=abs
        }
    },

    created() {
      this.displayNames = common.hs300_listNames,
      this.specdict = common.spec_dict
    }
}
</script>