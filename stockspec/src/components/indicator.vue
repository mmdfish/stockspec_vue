<template>
    <el-container style="height:100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: white">
    <a-menu mode="vertical">
      <a-sub-menu v-for="(name,index) in displayNames" :key="name">
        <span slot="title"><span>{{name}}</span></span>
        <a-menu-item v-for="(value1,key1) in indicators[index]" :key="key1" @click="goTo(key1)">
          {{value1}}
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
        indicators : []
      }
    },

    methods:{
        goTo(name){
            var strs = name.split("-")
            var specname = strs[0]
            var specvalue = 1
            if (strs.length == 2) {
              specvalue = Number(strs[1])
            }
            
            this.$router.push({
              path: '/stock/indicatorspec', 
              query: {
                specname: specname, 
                value: specvalue
              }
            })
        },
    },

    mounted() {
      this.$router.push({
        path: '/stock/indicatorspec', 
        query: {
          specname: "macd_cross_above", 
          value: 1
        }
      })
    },

    created() {
      this.displayNames = common.indicator_listNames;
      this.indicators = common.indicator_dict;
    }
}
</script>

<style>
.el-aside {
height:88vh;
}
</style>