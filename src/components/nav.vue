<template>
  <el-row class="menu-page">
  <el-col :span="24">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#409eff">
      <router-link to="/index">
        <el-menu-item index="0">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>
      <router-link to="/index/price">
        <el-menu-item index="1">
          <i class="el-icon-share"></i>
          <span slot="title">资金流水</span>
        </el-menu-item>
      </router-link>
      <router-link to="/index/admin">
        <el-menu-item index="2">
          <i class="el-icon-upload"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{

      }
    }
  };
</script>

<style scoped>
  .menu-page{
    padding: 0;
    margin: 0;
  }
</style>
