<template>
  <div class="wrapper">
    <div class="title">登录</div>
    <div class="form-body">
      <el-form :model="ruleForm" :rules="rules"
               ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input size="small" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" size="small" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')"
                     size="small" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
      <p class="hasAccount">没有有账号？
        <router-link :to="{path: '/register'}">请注册</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'js-md5';
import config from './../../config';

export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.ruleForm.password = md5(this.ruleForm.password);
          // 登录
          axios.post(`${config.apiHopst}/admin/login`, this.ruleForm, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            transformRequest: [(data) => {
              // Do whatever you want to transform the data
              let ret = '';
              Object.keys(data).forEach((value) => {
                ret += `${encodeURIComponent(value)}=${encodeURIComponent(data[value])}&`;
              });
              const newRet = ret.slice(0, ret.length - 1);
              return newRet;
            }],
          })
            .then((res) => {
              if (res.data.code === 200) {
                window.sessionStorage.setItem('token', res.data.token);
                this.$router.push({ path: '/index' });
                this.$message({
                  message: res.data.message,
                  type: 'success',
                });
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error',
                });
              }
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .wrapper {
    padding-top: 30px;
    width: 600px;
    margin: 0 auto;
    .title {
      text-align: center;
      font-size: 34px;
      font-weight: bolder;
      margin-bottom: 50px;
    }
    .gender {
      width: 100%;
    }
    .hasAccount {
      padding-left: 60px;
      a {
        text-decoration: underline;
        color: #409EFF;
      }
    }
  }
</style>
