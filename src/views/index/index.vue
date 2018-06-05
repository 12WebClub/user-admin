<template>
  <div class="index-wrapper">
    <div class="top"><a href="javascript:void(0)" @click="logout">注销</a></div>
    <div class="body">
      欢迎使用node.js!!!!!!!!!{{message}}
    </div>
  </div>
</template>

<script>
import home from './../../api/home';

export default {
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    home.home().then((res) => {
      if (res.data.code === 200) {
        this.message = res.data.message;
      }
    });
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token');
      this.$router.push({
        path: '/login',
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .index-wrapper {
    width: 100%;
    .top {
      width: 100%;
      height: 40px;
      background: #f1f1f1;
      border-bottom: 1px solid #e1e1e1;
      text-align: right;
      padding-right: 40px;
      a {
        line-height: 40px;
        font-size: 16px;
        text-decoration: underline;
      }
    }
    .body {
      width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
    }
  }
</style>
