<template>
  <div v-show="show" class="tip-box">
    <div class="blockOverlay" id="JS_blockOverlay"></div>
    <div class="blockMsg" id="JS_blockPage">
      <h3 class="title">提示</h3>
      <div id="block_content" class="content">
        <slot name="msginfo"></slot>
      </div>
      <div id="block_bottom" class="bottom">
        <input type="button" value="确定" id="alert_close_button" class="submit" @click="confirmHandle">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean
      }
    },
    data() {
      return {}
    },
    methods: {
      confirmHandle() {
        this.$emit('confirm');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tip-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .blockOverlay {
    border: none;
    position: absolute;
    z-index: 2001;
    filter: alpha(opacity=70);
    opacity: 0.7;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    cursor: default;
  }

  .blockMsg {
    padding: 0;
    position: absolute;
    left: 50%;
    width: 480px;
    height: 267px;
    margin-left: -240px;
    z-index: 2002;
    top: 10%;
    text-align: left;
    box-shadow: 0px 0px 18px #666;
    background: #fff url(../assets/manage/blockMsg-title_bg.png) repeat-x;
    font-family: microsoft yahei;
    .title {
      height: 45px;
      line-height: 45px;
      background: #f0f2fd;
      border-radius: 2px 2px 0 0;
      font-size: 20px;
      color: #333333;
      letter-spacing: 0;
      text-indent: 3.4%;
      span {
        display: inline-block;
        width: 28px;
        height: 26px;
        background: url(../assets/manage/blockMsg-title_bg.png) no-repeat;
        margin-right: 10px;
        vertical-align: -5px;
      }
    }
    .close {
      width: 25px;
      height: 25px;
      position: absolute;
      top: -5px;
      right: -5px;
    }
    .content {
      text-align: center;
      background: #fff;
      width: 480px;
      line-height: 30px;
      font-size: 15px;
      color: #262626;
      .detail {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        text-align: left;
        line-height: 25px;
        padding: 20px;
        min-height: 125px;
        .title {
          font-size: 18px;
          color: #ed0000;
          border: 0;
        }
        p {
          font-size: 13px;
          color: #ff632c
        }
      }
    }
    .bottom {
      background: #fff;
      padding: 12px 0;
      border-top: 1px solid #eee;
      font-size: 14px;
      overflow: hidden;
      text-align: right;
      padding-right: 5px;
      input {
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .submit {
      width: 90px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      border: none;
      font-size: 16px;
      color: #fff;
      float: right;
      background: linear-gradient(to bottom, #72cbfb, #777DF4);
      &:hover {
        background: linear-gradient(to bottom, #777DF4, #72cbfb);
      }
    }
  }


</style>