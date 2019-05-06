<template>
  <div class="login">
    <div class="main">
      <div class="login-box">
        <div class="username-box">
          <div class="icon-username"></div>
          <input type="text" class="username" placeholder="输入用户名" v-model="username">
        </div>

        <div class="password-box">
          <div class="icon-password"></div>
          <input type="password" class="password" v-model="password">
        </div>
        <div class="forgot-box">
          <div class="remember-box" :class="{active:isRemembered}">
            记住密码
          </div>
          <div class="find-back-psw">找回密码</div>
        </div>
        <div class="login-btn" @click="login">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {LOGIN} from '../utils/apiUrl'
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: '',
        isRemembered: false,
      }
    },
    methods: {
      ...mapMutations(['openIsProfileGotten']),
      clearUsername() {
        this.username = ''
      },
      clearPassword() {
        this.password = ''
      },
      login() {
        let {password,username} = this;


        this.$axios({
          url: LOGIN,
          method: 'post',
          data: {
            username,
            password,
          },
          loading:true
        }).then((res)=>{
          this.openIsProfileGotten();
          if(this.isRemembered){
            this.$setCookie('password',password)
          }else {
            this.$setCookie('password','')
          }
          this.$router.push({
            name:'home'
          })
        })
      },
      switchRemember() {
        this.isRemembered = !this.isRemembered
      },
    },
    mounted() {
      let password = this.$getCookie('password')
      if(password){
        this.isRemembered = true
        this.password = password
      }
    },
    components: {}
  }
</script>

<style scoped lang="scss">
  .login{
    background: url(../assets/login/login-white-bg.jpg) no-repeat top;
    .main{
      width: 100%;
      min-height: 890px;
      height: 100%;
      position: relative;
      overflow: hidden;
      .logo{
        position: absolute;
        left: 110px;
        top: 0;
        width: 360px;
        height: 220px;
        background: url(../assets/login/logo.png) no-repeat;
      }
      .login-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        border-radius: 10px;
        z-index: 127;
        transform: translateY(25px);
        opacity: 0;
        animation: login-anim .3s linear .5s forwards;

        padding-top: 360px;
        box-sizing: border-box;
        width: 660px;
        height: 700px;
        background: url(../assets/login/formbg.png) no-repeat;
        position: relative;
        .username-box{
          background: none;
          width: 363px;
          margin-bottom: 30px;
          position: relative;
          .icon-username{
            left: 15px;
            background: url(../assets/login/login-icon.png) no-repeat;
            position: absolute;
            top: 5px;
            height: 40px;
            width: 24px;
            background-position: -36px 6px;
          }
          .username{
            background: none;
            color: #4a344c;
            border: 1px solid #bfb9b6;
            font-size: 15px;
            padding-left: 47px;
            box-sizing: border-box;
            width: 100%;
            height: 48px;
            line-height: 48px;
            border-radius: 16px;
          }
        }
        .password-box{
          background: none;
          width: 363px;
          margin-bottom: 30px;
          position: relative;
          .icon-password{
            left: 15px;
            background: url(../assets/login/login-icon.png) no-repeat;
            position: absolute;
            top: 5px;
            height: 40px;
            width: 24px;
            background-position: -36px -38px;
          }
          .password{
            background: none;
            color: #4a344c;
            border: 1px solid #bfb9b6;
            font-size: 15px;
            padding-left: 47px;
            box-sizing: border-box;
            width: 100%;
            height: 48px;
            line-height: 48px;
            border-radius: 16px;
          }
        }
        .forgot-box{
          display: flex;
          justify-content: space-between;
          width: 343px;
          font-size: 14px;
          .remember-box{
            cursor: pointer;
            padding-left: 20px;
            background: url(../assets/login/ic-checkbox.png) 0 no-repeat;
            &.active{
              background: url(../assets/login/ic-checked.png) 0 no-repeat;
            }
          }
        }
        .login-btn{
          padding-left: 0;
          box-shadow: none;
          height: 59px;
          line-height: 59px;
          text-align: center;
          border: none;
          width: 372px;
          color: #fff;
          font-size: 22px;
          background: url(../assets/login/loginBtn.png) no-repeat;
          margin-top: 10px;
          letter-spacing: 2px;
          font-weight: 700;
          cursor: pointer;
          background-position: 0 0;
          box-sizing: border-box;
          border-radius: 16px;
          &:hover{
            background-position: 0 -86px;
          }
          &:active{
            background-position: 0 -174px;
          }
        }
      }
    }
  }
  @keyframes login-anim {
    0% {
      transform: translateY(25px);
      opacity: .5
    }

    to {
      transform: translate(0);
      opacity: 1
    }
  }
</style>