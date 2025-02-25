<script setup>

</script>

<template>
  <div class="login_box">
    <div class="login_form_box">
      <p class="login_title">登录页</p>
      <div class="login_item">
        <p>账号：</p>
        <a-input v-model:value="name" placeholder="请输入账号"/>
      </div>
      <div class="login_item">
        <p>密码：</p>
        <a-input v-model:value="name" placeholder="请输入密码"/>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login_box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("@/assets/images/login_bc.jpg") no-repeat;
  background-size: 100% 100%;

  .login_form_box {
    position: absolute;
    top: 58%;
    left: 20%;
    transform: translateY(-50%);
    width: 600px;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 10px;
  }
  .login_title{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }

  .login_item {
    margin-top: 15px;

    p {
      margin-bottom: 10px;
    }
  }
}
</style>
