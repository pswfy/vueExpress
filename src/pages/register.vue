<template>
  <div class="container">
    <section class="form-container">
      <div class="tip-container">
        <span class="title">提提数据后台管理系统</span>
      </div>
      <div class="form">
        <el-form :model="registerUser" :rules="rules" ref="registerFrom" label-width="80px" class="register-from">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" size="small" v-model="registerUser.name" placeholder="用输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" size="small" v-model="registerUser.email" placeholder="用输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" size="small" v-model="registerUser.password" placeholder="用输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" size="small" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="选择身份">
            <el-select v-model="registerUser.identity" size="small" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="emplotyee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" class="submit-btn" @click="submitForm('registerFrom')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      const validatePass2 = (rule, value, callback) => {
        if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerUser: {
          name: '',
          email: '',
          password: '',
          password2: '',
          identity: ''
        },
        rules: {
          name: [{
            required: true,
            message: '用户永不能为空',
            trigger: 'blur'
          },
            {
              min: 2,
              max: 30,
              message: '长度要在2到30之间',
              trigger: 'blur'
            }
          ],
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
          password2: [
            {
              required: true,
              message: '确认密码不能为空',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 30,
              message: '长度要在6到30之间',
              trigger: 'blur'
            },
            {
              validator:validatePass2,
              trigger: 'blur'
            }
          ],
        }
      }
    },
    methods: {
      submitForm(registerFrom) {
        this.$refs[registerFrom].validate((valid) => {
          if (valid) {
            this.$axios.post('http://localhost:3000/users/register', this.registerUser)
              .then(res => {
                this.$message({
                  message: '账号注册成功!',
                  type: 'success'
                })
              })
          }
        });
        this.$router.push('/login');
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
    top: 70px;
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
    padding: 0 40px 0 20px;

  }

  .submit-btn {
    width: 100%;
  }
</style>
