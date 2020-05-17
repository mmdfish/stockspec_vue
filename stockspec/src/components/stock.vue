<template>
  <div>
  <!-- <el-row v-for="name in displayNames" :key="name">
      <el-col :span="4"><div class="grid-content bg-purple-light">{{specdict[name]}}</div></el-col>
      <el-col :span="4" @click.native='goTo(name,0,true)'><div class="grid-content bg-purple">最小</div></el-col>
      <el-col :span="4" @click.native='goTo(name,1,true)'><div class="grid-content bg-purple">最大</div></el-col>
  </el-row> -->
  <el-row class="tac">
  <el-col :span="3">
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
  <el-col :span="21">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
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
            //this.$router.push('/stockspec');
            this.$router.replace('/stock/empty');
            sessionStorage['specname']=name
            sessionStorage['order']=order
            sessionStorage['abs']=abs
            // this.$router.push({
            //   name: 'StockSpec', 
            //   params: {
            //     specname: name, 
            //     order:order, 
            //     abs:abs
            // }
            // })
            this.$router.replace('/stock/stockspec');
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