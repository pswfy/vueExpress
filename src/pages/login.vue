<template>
  <div class="container">
    <section class="form-container">
      <div class="tip-container">
        <span class="title">提提数据后台管理系统</span>
      </div>
      <div class="form">
        <el-form :model="LoginUser" :rules="rules" ref="loginFrom" label-width="60px" class="register-from">
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" size="small" v-model="LoginUser.email" placeholder="用输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" size="small" v-model="LoginUser.password" placeholder="用输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" class="submit-btn" @click="submitForm('loginFrom')">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="tiparea">
          <p>还没有账号?现在<router-link to="/register">注册</router-link></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        LoginUser: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            {
              type:'email',
              required: true,
              message: '邮箱类型错误',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 30,
              message: '长度要在6到30之间',
              trigger: 'blur'
            }
          ],
        }
      }
    },
    methods: {
      submitForm(loginFrom) {
        this.$refs[loginFrom].validate((valid) => {
          if (valid) {
            this.$axios.post('http://localhost:3000/users/login', this.LoginUser)
              .then(res => {
                console.log(res);
                const {token} = res.data;
                localStorage.setItem('eleToken',token);
                this.$router.push('/index');
              })
          }
        });
      }
    }
  };
</script>

<style scoped>
  .container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .form-container {
    width: 320px;
    background: #FFFFFF;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0 2px 5px #444444;
  }

  .tip-container {
    position: absolute;
    text-align: center;
    top: 150px;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding: 0 10px;
    font-weight: 700;
    color: #FFFFFF;
    font-size: 16px;
  }

  .form {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .register-from {
    margin-top: 20px;
    background: #fff;
    padding: 12px 40px 0 20px;

  }

  .submit-btn {
    width: 100%;
  }
  .tiparea{
    display: flex;
    height: 30px;
    box-sizing: border-box;
    padding: 0 40px;
    font-size: 14px;
    line-height: 0;
    color: #999999;
    justify-content: flex-end;
  }
</style>
