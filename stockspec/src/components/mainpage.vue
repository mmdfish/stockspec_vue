<template>
<div>
<el-container>
  <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
    <el-menu-item index="/stock/stock" @click="goTo('/stock/stock')">随意参数</el-menu-item>
    <el-menu-item index="/stock/stockhs300spec" @click="goTo('/stock/stockhs300spec')">沪深300</el-menu-item>
    <el-menu-item index="/stock/indicator" @click="goTo('/stock/indicator')">K线指标</el-menu-item>
    </el-menu>
  </el-header>
  <el-main><router-view></router-view></el-main>
</el-container>


</div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: "/stock/stock"
      };
    },
    methods: {
      handleSelect(key, keyPath) {
      },
      goTo(path) {
        this.$router.push(path);
      }
    },
    mounted() {
      this.$router.push("/stock/stock");
    }
  }
</script>

<style>
.el-aside {
height:100vh;
}
</style>
