<template>
  <div class="register">
    <div class="main">
      <div class="login-box">
        <div class="wrapper">
          <div class="input-box user-name">
            <i></i>
            <input type="text" placeholder="用户名" v-model="username" @blur="validateUsername">
            <span class="success" v-if="username.length > 0 && isUsernameValidated === true"></span>
            <span class="desc">由字母或数字组成的6-16个字符，不能连续4个相同字符，首字符不能为字母O或数字0</span>
            <div
                class="error-hint"
                :class="{isError: isUsernameValidated === false}"
                v-if="username.length > 0"
            ><div class="warn"></div>用户名不符合规则
            </div>
          </div>
          <div class="input-box nickname">
            <i></i>
            <input type="text" placeholder="用户昵称" v-model="nickname" @blur="validateNickname">
            <span class="success" v-if="nickname.length > 0 && isNicknameValidated === true"></span>
            <span class="desc">由2至6个字符组成</span>
            <div
                class="error-hint"
                :class="{isError: isNicknameValidated === false}"
                v-if="nickname.length > 0"
            ><div class="warn"></div>昵称不符合规则
            </div>
          </div>
          <div class="input-box password">
            <i></i>
            <input type="password" placeholder="登录密码" v-model="password" @blur="validatePassword">
            <span class="success" v-if="password.length > 0 && isPasswordValidated === true"></span>
            <span class="desc">字母和数字组成6-16个字符（必须包含数字和字母）且连续三位字符不相同</span>
            <div
                class="error-hint"
                :class="{isError: isPasswordValidated === false}"
                v-if="password.length > 0"
            ><div class="warn"></div>密码不符合规则
            </div>
          </div>
        </div>
        <div class="register-btn"
             @click="register"
        >立即注册
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import {REGISTER} from '@/utils/apiUrl'

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  export default {
    name: 'register',
    data() {
      return {
        username: '',
        nickname: '',
        password: '',
        isRemembered: false,
        isUsernameValidated:'',
        isNicknameValidated:'',
        isPasswordValidated:''
      }
    },
    computed: {
    },
    methods: {
      validateUsername() {
        if (this.username.length <= 16
          && this.username.length >= 6
          && this.username.match(/(.)\1{3}/g) === null
          && this.username[0] !== '0'
          && this.username[0] !== 'o'
          && this.username[0] !== 'O'
        ) {
          return this.isUsernameValidated = true
        } else {
          return this.isUsernameValidated = false
        }
      },
      validateNickname() {
        if (this.nickname.length >= 2 && this.nickname.length <= 6) {
          return this.isNicknameValidated = true
        } else {
          return this.isNicknameValidated = false
        }
      },
      validatePassword() {
        if (this.password.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/) !== null
          && this.password.match(/(.)\1{3}/g) === null) {
          return this.isPasswordValidated = true
        } else {
          return this.isPasswordValidated = false
        }
      },
      clearUsername() {
        this.username = ''
      },
      clearPassword() {
        this.password = ''
      },
      register() {
        let code = getParameterByName('code')
        let {password, username, nickname} = this
        this.$axios({
          url: REGISTER,
          method: 'post',
          data: {
            username,
            password,
            nickname,
            code,
          },
          loading: true,
        }).then((res) => {
          this.$router.push({
            name: 'login'
          })
        })
      },
      switchRemember() {
        this.isRemembered = !this.isRemembered
      },
    },
    mounted() {
    },
    components: {}
  }
</script>

<style scoped lang="scss">
  .register {
    background: url(../assets/login/login-white-bg.jpg) no-repeat top;
    .main {
      width: 100%;
      min-height: 890px;
      height: 100%;
      position: relative;
      overflow: hidden;
      .logo {
        position: absolute;
        left: 110px;
        top: 0;
        width: 360px;
        height: 220px;
        background: url(../assets/login/logo.png) no-repeat;
      }
      .login-box {
        border-radius: 10px;
        z-index: 127;
        transform: translateY(25px);
        opacity: 0;
        animation: login-anim .3s linear .5s forwards;

        box-sizing: border-box;
        position: relative;
        width: 945px;
        height: 725px;
        background: url(../assets/register/register-bg.png) no-repeat;
        margin: 0 auto;
        margin-top: 45px;
        .wrapper{
          padding-top: 200px;
          padding-left: 120px;
        }
        .input-box{
          display: flex;
          align-items: center;
          height: 50px;
          margin: 0 0 27px 10px;
          font-size: 13px;
          position: relative;
          flex: none;
          &.user-name{
            i{
              background-position: -36px 0px;
            }
          }
          &.nickname{
            i{
              background-position: -79px 0px;
            }
          }
          &.password{
            i{
              background-position: -36px -44px;
            }
          }
          i{
            display: block;
            position: absolute;
            left: 13px;
            top: 12px;
            width: 24px;
            height: 24px;
            background: url(../assets/register/login-icon.png) no-repeat;
          }
          input{
            width: 365px;
            border-radius: 12px;
            height: 48px;
            line-height: 48px;
            text-indent: 48px;
            border: 1px solid #bab0ba;
            color: #4a344c;
            outline: medium;
            margin-right: 10px;
          }
          .success{
            position: absolute;
            width: 14px;
            height: 14px;
            top: 20px;
            left: 343px;
            background: url(../assets/register/login-icon.png) no-repeat -85px -136px;
          }
          .desc{
            width: 260px;
            color: #616262;
            line-height: 18px;
          }
          .error-hint{
            display: none;
            font-size: 12px;
            position: absolute;
            top: 56px;
            left: 0;
            .warn{
              display: inline-block;
              width: 14px;
              height: 14px;
              background: url(../assets/register/login-icon.png) -85px -120px no-repeat;
              margin-right: 4px;
            }
            &.isError{
              display: flex;
              align-items: center;
              color: #EA1515;
            }
          }
        }
        .register-btn{
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: none;
          height: 59px;
          line-height: 59px;
          border: none;
          width: 372px;
          color: #fff;
          font-size: 22px;
          background: url(../assets/login/loginBtn.png) no-repeat;
          letter-spacing: 2px;
          font-weight: bold;
          cursor: pointer;
          background-position: 0px 0px;
          margin:10px auto;
          &:hover{
            background-position: 0px -86px;
          }
          &:active{
            background-position: 0px -174px;
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