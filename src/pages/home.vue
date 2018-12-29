<template>
    <div class="home">
      <div class="home-content">
        <p>米修在线</p>
        <p>专注于在线教育,用心做好课堂,用心做服务</p>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style scoped>
  .home{
    width: 100%;
    height: 100%;
    background: url("../assets/bg1.jpg") no-repeat center center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 60px;
    padding-left: 160px;
    display: flex;
    justify-content: center;
  }
  .home-content{
    padding-top: 100px;
    color: #FFFFFF;
    font-size: 14px;
    text-align: center;
  }
  .home-content>p:nth-child(1){
    font-weight: 700;
    font-size: 15px;
  }
</style>
