<template>
    <el-container style="height:100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: white">
    <a-menu mode="vertical">
      <a-sub-menu v-for="name in displayNames" :key="name">
        <span slot="title"><span>{{specdict[name]}}</span></span>
        <a-menu-item :key="`${name}-1`" @click="goTo(name,1,true)">
          最大
        </a-menu-item>
        <a-menu-item :key="`${name}-2`" @click="goTo(name,0,true)">
          最小
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
    </el-aside>
    <el-main>
      <router-view :key="$route.fullPath"></router-view>
    </el-main>
   </el-container>
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
            this.$router.push({
              path: '/stock/stockspec', 
              query: {
                specname: name, 
                order:order, 
                abs:abs
            }
            })
        },
    },

    mounted() {
      this.$router.push({
        path: '/stock/stockspec', 
        query: {
          specname: "beta_y", 
          order:"desc", 
          abs:true
        }
      })
    },

    created() {
      this.displayNames = common.listNames;
      this.specdict = common.spec_dict;
    }
}
</script>

<style>
.el-aside {
height:88vh;
}
</style>