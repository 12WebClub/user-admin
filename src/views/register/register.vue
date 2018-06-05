<template>
  <div class="wrapper">
    <div class="title">注册</div>
    <div class="form-body">
      <el-form :model="ruleForm" :rules="rules"
               ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input size="small" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" size="small" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" size="small"
                    v-model="ruleForm.checkPass"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="ruleForm.gender" placeholder="请选择性别" size="small" class="gender">
            <el-option label="未知" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input size="small" v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')"
                     size="small" :loading="loading">创建</el-button>
          <el-button @click="resetForm('ruleForm')" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <p class="hasAccount">已有账号？<router-link :to="{path: '/login'}">直接登录</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'js-md5';
import config from './../../config';

export default {
  data() {
    // 验证密码是否一致
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        gender: '',
        age: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur', required: true },
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

          axios.post(`${config.apiHopst}/admin/register`, this.ruleForm, {
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
                this.$router.push({ path: '/login' });
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
    // 清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
