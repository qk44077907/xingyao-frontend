<template>
  <div class="mask-wrap">
    <div class="bind-page">
      <div v-if="!set_trans_password">
        设置提款密码
      </div>
      <div v-else-if="!tradeToken" class="bind-card-box">
        <div class="modal-title">绑定银行卡</div>
        <div class="layer-close" @click="closeMask"></div>
        <div v-if="errorMsg" class="errorbox">
          <h3>
            <i class="hint_red">提款密码错误</i>
          </h3>
        </div>
        <div v-else class="commonality_drawings_password">
          <div class="pd_left">
            <h5>输入提款密码：</h5>
            <div class="commonality_drawings_password_input">
              <input v-model="transPassword" type="password" class="password hasKeypad">
              <i title="打开/关闭软键盘" class="keypad-trigger"></i>
            </div>
          </div>
          <div class="list_btn_box">
            <input name="" type="submit" value="修改" class="pass-change" @click="verifyTransPsw">
            <input name="" type="reset" value="重置" class="pass-reset" @click="reset">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {VERIFY_TRANS_PSW} from '../../../utils/apiUrl'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        set_trans_password: state => state.profile.set_trans_password
      }),
      ...mapState(['profile']),
    },
    data() {
      return {
        transPassword: '', // 提款密码
        tradeToken: '',
        errorMsg: ''
      }
    },
    methods: {
      closeMask() {
        this.transPassword = this.tradeToken = this.errorMsg = '';
        this.$emit('closeHandle');
      },
      reset() {
        this.transPassword = '';
      },
      verifyTransPsw() {
        this.$axios({
          url: VERIFY_TRANS_PSW,
          method: 'post',
          loading: true,
          data: {
            password: this.transPassword
          },
        }).then((res) => {
          if (res.data.status == 1000) {
            this.tradeToken = res.data.data.trade_token;
          } else {
            this.errorMsg = res.data.message;
          }

        })
      },
    }
  }
</script>

<style lang="scss">
  .bind-page {
    width: 820px;
    height: 510px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -410px;
    margin-top: -255px;
    background: #fff;
    .commonality_drawings_password {
      padding: 85px 0;
      .pd_left {
        width: 420px;
        margin: 0 auto;
      }
      h5 {
        font-size: 24px;
        color: #5c646a;
        font-weight: normal;
        margin: 0 0 12px 0;
      }
    }
    .commonality_drawings_password_input {
      margin-bottom: 20px;
      .password {
        width: 350px;
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        color: #333;
        padding: 0 8px;
        border: 1px solid #d8d8d8;
        border-radius: 3px;
        -webkit-border-radius: 3px;
        font-family: 'Microsoft Yahei';
      }
    }
    .keypad-trigger {
      display: inline-block;
      margin: 8px;
      cursor: pointer;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      background: url(../../../assets/manage/kb.png) no-repeat;
    }
    .list_btn_box {
      text-align: center;
      padding: 20px 0 0 0;
      .pass-change {
        width: 90px;
        height: 35px;
        line-height: 33px;
        font-size: 15px;
        color: #fff;
        padding: 0 !important;
        font-family: Microsoft Yahei;
        margin: 0 10px;
        border: 0 !important;
        background: linear-gradient(to bottom, #71c8fb, #8b76f6);
        border-radius: 4px;
        cursor: pointer;
        letter-spacing: 3px;
      }
      .pass-reset {
        font-size: 15px;
        width: 90px;
        height: 35px;
        line-height: 33px;
        color: #353434;
        margin: 0 10px;
        padding: 0 !important;
        border: 1px solid #d8d8d8 !important;
        font-family: Microsoft Yahei;
        cursor: pointer;
        letter-spacing: 3px;
        border-radius: 4px;
        background-color: #fff;
      }
    }
    .errorbox {
      background: url(../../../assets/manage/icon_error-big.png) no-repeat center 40px;
      padding: 110px 0 100px;
      h3 {
        text-align: center;
        font-size: 18px;
      }
      i {
        font-style: normal;
      }
      #success {
        background: url(../../../assets/manage/icon_success-big.png) no-repeat center 35px;
        padding: 110px 0 100px;
      }
      .hint_red {
        color: #fb2323;
      }
      .hint_green {
        color: #4680e8;
      }
      .hint_green p {
        margin-bottom: 10px;
      }
      #error .hint_red {
        color: #fb2323;
      }

    }
  }
</style>