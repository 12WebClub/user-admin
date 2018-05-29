<template>
  <div class="index-wrapper">
    <div class="top"><a href="javascript:void(0)" @click="logout">注销</a></div>
    <div class="body">
      欢迎使用node.js!您已登录
    </div>
  </div>
</template>

<script>
export default {
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
