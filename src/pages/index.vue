<template>
    <div class="index">
      <headerNav/>
      <div class="nav">
        <s-nav/>
      </div>
      <router-view/>
    </div>
</template>

<script type="text/ecmascript-6">
  import headerNav from '../components/headerNav';
  import nav from '../components/nav';
  export default {
    components:{
      headerNav,
      's-nav':nav
    }
  };
</script>

<style scoped>
  .index{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .nav{
    width: 160px;
    height: 100%;
    padding: 0;
    margin: 0;
    background: #324057;
    position: fixed;
    top:60px;
    left: 0;
  }
</style>
