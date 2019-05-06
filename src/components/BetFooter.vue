<template>
  <div class="footer-framework ">
    <div class="container-main">
      <div class="img"></div>
      <div class="clearfix Copyright">
        <p>Copyright © XingYao 2017-2018 杏耀娱乐 版权所有</p>
        <p>技术支持：<img src="../assets/home/footer-logo-leacloud2.png" style="vertical-align: -3px;"></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  .footer-framework {
    width: 100%;
    min-width: 980px;
    height: 100px;
    color: #666;
    font-size: 12px;
    line-height: 22px;
    .img {
      background: url(../assets/home/footer-img.png) no-repeat 50%;
      height: 37px;
      width: 1080px;
      margin: auto
    }
    .Copyright p {
      width: 100%;
      height: 20px;
      line-height: 25px;
      color: #fff;
      text-align: center;
      margin-top: 5px
    }
  }
</style>