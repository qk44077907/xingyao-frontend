<template>
  <div class="information-page">
    <div class="modal-popup-mask"></div>
    <div class="modal-popup-box">
      <div>
        <div class="modal-title">完善资料</div>
        <div class="info-content">
          <div class="organizing-data_box">
            <table width="100%" border="0" cellspacing="1" cellpadding="10">
              <tbody>
                <tr>
                  <td class="tdz3_left">用户昵称：</td>
                  <td class="tdz3_right">
                    <input type="text" name="nickname" value="geelao666">
                    <span class="text_hint">由2至6个字符组成</span>
                  </td>
                </tr>
                <tr>
                  <td class="tdz3_left">预留信息：</td>
                  <td class="tdz3_right"><input type="text" name="preinfo" value=""><span class="text_hint text_hint-c">为防止钓鱼网站骗取您的钱财，请务必填写此信息<br>由1至6个汉字组成</span></td>
                </tr>
              </tbody>
            </table>
            <div class="list_btn_box">
              <button>修改</button>
              <button>重置</button>
            </div>
          </div>
        </div>
      </div>
      <div class="layer-close" @click="closeInformation"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      closeInformation() {
        this.$emit('closeHandle');
      }
    }
  }
</script>

<style lang="scss">
  .information-page {
    .modal-popup-mask {
      position: fixed;
      left: 0;
      top: 0;
      background: #000;
      opacity: .6;
      filter: alpha(opacity=60);
      z-index: 1000;
      width: 100%;
      height: 100%;
    }
    .modal-popup-box {
      width: 800px;
      height: 500px;
      margin-left: -400px;
      margin-top: -250px;
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 1001;
      background-color: #fff;
      transition: all .3s;
      overflow: hidden;
      .layer-close {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 6px;
        top: 6px;
        text-indent: -99999px;
        cursor: pointer;
        background: url(../../../assets/manage/close-button.png) no-repeat 50%;
      }
    }
    .modal-title {
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      background: linear-gradient(to right,#71a4ff,#7bddfc)
    }
    .info-content {
      padding: 10px 20px 0;
      background: #fff;
      .organizing-data_box {
        min-width: 700px;
        margin: 40px auto 50px;
        padding: 30px 0;
        font-size: 13px;
        .tdz3_left {
          width: 110px;
          font-size: 14px;
          color: rgb(102,102,102);
          text-align: right;
        }
        .tdz3_right {
          position: relative;
          text-align: left;
          padding: 10px 0;
          input {
            width: 259px;
            height: 35px;
            vertical-align: middle;
            font-size: 14px;
            color: rgb(102,102,102);
            font-family: 'Microsoft YaHei';
            border: 1px solid rgb(216,216,216);
            padding: 0 5px;
            border-radius: 3px;
          }
        }
        .text_hint {
          display: inline-block;
          color: rgb(255,99,44);
          font-size: 12px;
          padding-left: 5px;
        }
        .text_hint-c {
          vertical-align: -9px;
        }
      }
      .list_btn_box {
        text-align: center;
        padding: 20px 0 0;
        button {
          width: 90px;
          height: 35px;
          line-height: 33px;
          font-size: 15px;
          color: #fff;
          font-family: 'Microsoft YaHei';
          cursor: pointer;
          letter-spacing: 3px;
          margin: 0 10px;
          border-radius: 4px;
          padding: 0;
          border: 0;
          box-sizing: border-box;
          background: linear-gradient(to bottom,rgb(113,200,251),rgb(139,118,246));
          &:last-child {
            background: #fff;
            border: 1px solid rgb(216,216,216);
            color: rgb(53,52,52);
          }
        }
      }
    }
  }

</style>