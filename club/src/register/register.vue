<template>
  <div class="register" id="register" :style="{background: randomBg}">
    <div class="form">
      <img src="../../static/icon/logo.svg" alt="" class="logo">
      <a-form
        id="components-form-register"
        :form="form"
        class="register-form"
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
          <a-input-search
            placeholder="验证码"
            v-model="form.verificationCode"
            @search="sendCode"
            size="large"
          >
            <a-button slot="enterButton" class="sendCode" :style="verificationCode === '发送'?'background: #1890ff;color: #fff':''" :disabled="disabled">{{verificationCode}}</a-button>
          </a-input-search>
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
          <a-button type="primary" html-type="submit" class="register-form-button">
            注册
          </a-button>
          <a @click="toLogin">
            返回登陆
          </a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        randomBg: 'url("../../static/img/bg' + parseInt(Math.random() * 5) + '.jpg") center center no-repeat',
        form: {
          code: '',
          password: '',
          verificationCode: '',
        },
        verificationCode: '发送',
        countdown: null,
        duration:sessionStorage.getItem('duration') || null,     //时长
        disabled: false,
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'normal_register'});
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
      },
      toLogin(){
        if (this.form.code) {
          this.$router.push({name: 'login', params: {code: this.form.code}})
        } else {
          this.$router.push({path: '/login'})
        }
      },

      sendCode() {
        if(typeof this.duration != 'string'){
          this.duration = 30;                                      //验证码发送间隔时常
          sessionStorage.setItem('duration', new Date().getTime());
          clearInterval(this.countdown);
          this.countdown = null;
          this.disabled = false;

          // TODO 发送验证码
        }else {
          this.disabled = true;
          this.duration = 30 - parseInt((new Date().getTime() - this.duration)/1000);
        }
        if(!this.countdown){
          this.countdown = setInterval(() => {
            if (this.duration <= 0) {
              this.disabled = false;
              this.verificationCode = '发送';
              sessionStorage.removeItem('duration');
              clearInterval(this.countdown);
            } else {
              this.disabled = true;
              let s = this.duration.toString()
              this.duration--;
              this.verificationCode = s+'s';
            }
          }, 1000)
        }
      },
    },
    created(){
      if (this.$route.params.code) {
        this.form.code = this.$route.params.code;
      }
      if(typeof this.duration == 'string'){
        this.duration = 30 - parseInt((new Date().getTime() - this.duration)/1000);
        this.countdown = setInterval(() => {
          if (this.duration <= 0) {
            this.verificationCode = '发送';
            sessionStorage.removeItem('duration');
            clearInterval(this.countdown);
            this.disabled = false;
          } else {
            this.disabled = true;
            let s = this.duration.toString()
            this.duration--;
            this.verificationCode = s+'s';
          }
        }, 1000)
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../assets/style/common";

  .register {
    background: url("../../static/img/bg2.jpg") center center no-repeat;
  }
</style>
