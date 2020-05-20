<template>
  <div>
  <el-row class="tac">
  <el-col :span="4">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu v-for="name in displayNames" :key="name" :index="name">
        <template slot="title"><span>{{specdict[name]}}</span></template>
        <el-menu-item :index="`${name}-1`" @click="goTo(name,0,true)">最小</el-menu-item>
        <el-menu-item :index="`${name}-2`" @click="goTo(name,1,true)">最大</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
  <el-col :span="1"><div style="float: right; width:10%; min-height:1px;"></div></el-col>
  <el-col :span="19">
    <router-view :key="$route.fullPath"></router-view>
  </el-col>
</el-row>
  
  </div>
</template>

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
            console.log("goto",name,order,abs)
            //this.$router.push('');
            //this.$router.push('/stock/stockspec');
            //this.$router.replace('/stock/empty');
            // sessionStorage['specname']=name
            // sessionStorage['order']=order
            // sessionStorage['abs']=abs
            this.$router.push({
              path: '/stock/stockspec', 
              query: {
                specname: name, 
                order:order, 
                abs:abs
            }
            })
            //this.$router.replace('/stock/stockspec');
        },

        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
    },

    created() {
      this.displayNames = common.listNames,
      this.specdict = common.spec_dict
    }
}
</script>