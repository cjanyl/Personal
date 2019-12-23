<template>
  <div class="login" id="login" :style="{background: randomBg}">
    <div class="form">
      <img src="../../static/icon/logo.svg" alt="" class="logo">
      <a-form
        id="components-form-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item class="input-bottom-30">
          <a-input
            size="large"
            placeholder="用户名/手机号"
            v-model="form.code"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item class="input-bottom-30">
          <a-input-password
            size="large"
            type="password"
            placeholder="密码"
            v-model="form.password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            size="large"
          >
            自动登录
          </a-checkbox>
          <a class="login-form-forgot" href="">
            忘记密码
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>
          <a @click="toSign">
            立即注册
          </a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        randomBg: 'url("../../static/img/bg' + parseInt(Math.random() * 5) + '.jpg") center center no-repeat',
        form: {
          code: '',
          password: '',
        },
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'normal_login'});
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },


      toSign() {
        if (this.form.code) {
          this.$router.push({name: 'register', params: {code: this.form.code}})
        } else {
          this.$router.push({path: '/register'})
        }
      },
    },
    created() {
      if (this.$route.params.code) {
        this.form.code = this.$route.params.code;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../assets/style/common";

  .login {
    /*background: url("../../static/img/bg1.jpg") center center no-repeat;*/
  }
</style>
