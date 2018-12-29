<template>
    <div class="admin" v-if="userInfo">
      <div class="admin-left">
        <img :src="userInfo.avatar" alt="">
      </div>
      <div class="admin-right">
        <div class="name">
          <i class="el-icon-location"></i>
          <span>{{userInfo.name}}</span>
        </div>
        <div class="identity">
          <i class="el-icon-setting"></i>
          <span>{{identity}}</span>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        userInfo: null
      }
    },
    computed:{
      identity(){
        if(this.userInfo.identity === 'employee'){
          return '员工'
        }else{
          return '管理员'
        }
      }
    },
    created() {
      this.getInfo();
    },
    methods: {
      getInfo(){
        this.$axios.post('http://localhost:3000/users/token').then(res => {
          this.userInfo = res.data;
        });
      }
    }
  };
</script>

<style scoped>
  .admin{
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    padding-top: 60px;
    padding-left: 160px;
    flex-direction: row;
  }
  .admin-left{
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .admin-left img{
    width: 100px;
    border-radius: 50%;
  }
  .admin-right{
    background: #f0f0f0;
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding: 20px;
  }
  .name{
    height: 50px;
    line-height: 50px;
  }
  .identity{}
</style>
