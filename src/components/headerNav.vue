<template>
  <div class="header-nav">
    <div class="header-nav-left">
      <img src="../assets/logo.png" alt="">
      <span>米修后台管理系统</span>
    </div>
    <div class="header-nav-right" v-if="userInfo">
      <img :src="userInfo.avatar" alt="">
      <div class="user">
        <span>欢迎</span>
        <span>{{userInfo.name}}</span>
      </div>
      <el-dropdown @command="setDialogInfo">
        <span class="el-dropdown-link">
          <i class="el-icon-caret-bottom el-icon-right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        userInfo: null
      }
    },
    computed: {
      use() {
        return this.$store.getters.user;
      }
    },
    created() {
      this.getInfo();
    },
    methods: {
      setDialogInfo(msg) {
        switch (msg) {
          case 'info':
            this.showInfoList();
            break;
          case 'exit':
            this.loginOut();
            break;
        }
      },
      showInfoList() {
        this.$router.push('/index/admin');
      },
      loginOut() {
        this.$confirm('你正在做退出操作,是否确认', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '退出',
          cancelButtonText: '取消'
        })
          .then(() => {
            localStorage.removeItem("eleToken");
            this.$router.push('/');
            this.$message({
              type: 'success',
              message: '退出成功'
            });
          })
          .catch(action => {
            this.$message({
              type: 'warning',
              message: '放弃退出'
            })
          });
      },
      getInfo() {
        this.$axios.post('http://localhost:3000/users/token').then(res => {
          this.userInfo = res.data;
        });
      }
    }
  };
</script>

<style scoped>
  .header-nav {
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 10px;
    box-sizing: border-box;
    background: #324057;
    color: #FFFFFF;
    border-bottom: 1px solid #1f2d3d;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .header-nav-left {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .header-nav-left > img {
    width: 40px;
    margin-right: 10px;
  }

  .header-nav-left > span {
    font-size: 15px;
  }

  .header-nav-right {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .header-nav-right > img {
    width: 36px;
    margin-right: 6px;
    border-radius: 50%;
  }

  .user {
    display: flex;
    flex-direction: column;
    margin-right: 6px;
  }

  .user > span:nth-child(1) {
    font-size: 12px;
    font-weight: lighter;
    box-sizing: border-box;
    padding-bottom: 4px;
    text-align: center;
  }

  .user > span:nth-child(2) {
    font-size: 12px;
    font-weight: lighter;
    box-sizing: border-box;
    color: #409EFF;
    text-align: center;
  }

  .el-icon-right {
    color: #FFFFFF;
  }
</style>
