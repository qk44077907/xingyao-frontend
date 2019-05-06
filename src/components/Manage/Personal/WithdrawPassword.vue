<template>
  <div class="mask-wrap">
    <div class="modify-pass">
      <div class="modal-title">修改提款密码</div>
      <div class="layer-close" @click="closeMask"></div>
      <div class="m-content">
        <div v-if="!modifySuc" class="info">
          <table width="100%" border="0" cellspacing="1" cellpadding="5">
            <tbody>
            <tr>
              <td class="tdz3_left">旧密码：</td>
              <td class="tdz3_right">
                <input name="oldpass" id="oldpass" type="password" class="password hasKeypad" v-model="oldPassword">
                <i title="打开/关闭软键盘" class="keypad-trigger"></i>
              </td>
            </tr>
            <tr>
              <td class="tdz3_left">新密码：</td>
              <td class="tdz3_right">
                <input name="newpass" id="newpass" type="password" class="password hasKeypad" v-model="newPassword">
                <i title="打开/关闭软键盘" class="keypad-trigger"></i>
                <span class="text_hint">由字母和数字组成6-16个字符(必须包含数字与字母)且连续三位不相同,提款密码不能与登录密码相同</span>
              </td>
            </tr>
            <tr>
              <td class="tdz3_left">确认新密码：</td>
              <td class="tdz3_right">
                <input name="confirm_newpass" id="confirm_newpass" type="password" class="password hasKeypad"
                       v-model="newPasswordRepeat">
                <i title="打开/关闭软键盘" class="keypad-trigger"></i>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="list_page">
            <span>备注：请妥善保管好您的提款密码，如遗忘请使用密保功能找回或联系在线客服处理</span>
          </div>
          <div class="list_btn_box">
            <input name="" type="submit" value="修改" class="pass-change" @click="modifyHandle">
            <input name="" type="reset" value="重置" class="pass-reset" @click="reset">
          </div>
        </div>
        <div v-else class="modify-suc">
          <h3>提款密码修改成功</h3>
        </div>
        <tip-box :show="tipFlag" @confirm="closeOperation">
          <div slot="msginfo" class="detail">提款密码格式错误,请重新输入<br><br>
            <p>说明：</p>
            <p>1.密码由字母与数字组成6-16个字符(必须包含数字与字母)且连续三位不相同</p>
            <p>2.提款密码不能与登录密码相同</p></div>
        </tip-box>
      </div>
    </div>
  </div>
</template>

<script>
  import TipBox from '../../TipBox'
  import {CHANGE_TRANS_PSW} from '../../../utils/apiUrl'

  export default {
    components: {TipBox},
    data() {
      return {
        tipFlag: false,
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
        modifySuc: false
      }
    },
    watch: {
      show() {
        this.modifySuc = false;
        this.reset();
      }
    },
    computed: {
      isPasswordValidated() {
        if (this.newPassword.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/) !== null
          && this.newPassword.match(/(.)\1{2}/g) === null) {
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      reset() {
        this.oldPassword = this.newPassword = this.newPasswordRepeat = ''
      },
      modifyHandle() {
        if (this.oldPassword.length === 0 || !this.isPasswordValidated || this.newPassword !== this.newPasswordRepeat) {
          this.tipFlag = true;
          return;
        }
        this.$axios({
          url: CHANGE_TRANS_PSW,
          method: 'post',
          loading: true,
          data: {
            old_password: this.oldPassword,
            new_password: this.newPassword,
          },
        }).then((res) => {
          this.modifySuc = true;
        })
      },
      closeOperation() {
        this.tipFlag = false;
      },
      closeMask() {
        this.modifySuc = false;
        this.$emit('closeHandle');
      }
    }
  }
</script>

<style lang="scss">
  .modify-pass {
    width: 820px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -410px;
    margin-top: -250px;
    background: #fff;
    .m-content {
      padding: 10px 20px 0;
      height: 455px;
      box-sizing: border-box;
      position: relative;
      .info {
        width: 500px;
        margin: 30px auto 0;
      }
      .tdz3_left {
        width: 110px;
        text-align: right !important;
        font-size: 14px;
        color: #666;
      }
      .tdz3_left font.red {
        color: #ff0000;
        margin-right: 10px;
      }
      .tdz3_right {
        text-align: left !important;
        padding: 10px 0;
        position: relative;
      }
      .tdz3_right input {
        width: 259px;
        height: 35px;
        vertical-align: middle;
        border: 1px solid #d8d8d8;
        font-size: 14px;
        padding: 0 5px;
        color: #666;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        font-family: 'Microsoft Yahei';
      }
      .tdz3_right .select_text {
        width: 293px;
        height: 38px;
        border: 1px solid #d8d8d8;
        border-radius: 3px;
        font-size: 14px;
        color: #999;
      }
      #ans1, #ans2 {
        width: 282px;
      }
      .list_page {
        padding-left: 6px;
        color: #f5a623;
        font-size: 13px;
      }
      .list_page span {
        display: block;
      }
      .text_hint {
        display: inline-block;
        position: absolute;
        left: 305px;
        top: 19px;
        min-width: 220px;
        color: #ff632c;
        padding-left: 5px;
        font-size: 12px;
      }
      .text_hint-c {
        top: 12px;
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
      }
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
      .modify-suc h3 {
        text-align: center;
        font-size: 18px;
        color: #4680e8;
      }
      .modify-suc {
        background: url(../../../assets/manage/icon_success-big.png) no-repeat center 35px;
        padding: 110px 0 100px;
      }

    }
  }
</style>