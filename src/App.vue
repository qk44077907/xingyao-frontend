<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <toast></toast>
    <modal></modal>
    <deposit-modal v-if="isDepositModalShowed"></deposit-modal>

    <router-view/>
  </div>
</template>
<script>
  import Modal from './components/Modal'
  import Toast from './components/Toast'
  import DepositModal from './components/DepositModal'
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState(['isDepositModalShowed'])
    },
    components: {
      Modal,
      Toast,
      DepositModal,

    }
  }
</script>
<style lang="scss">
  @import 'css/common.css';
  @font-face {
    font-family: iconfont;
    src: url(./assets/iconfont.ttf) format("truetype")
  }

  .iconfont {
    font-family: iconfont!important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
  }

  .icon-menu:before {
    content: "\E6D7"
  }

  .icon-news:before {
    content: "\E6D9"
  }

  .icon-arrow_left:before {
    content: "\E6F7"
  }

  .icon-edit:before {
    content: "\E6D2"
  }

  .icon-arrow_down:before {
    content: "\E6F8"
  }
  #app {
    font-family: Microsoft YaHei,Arial,Segoe UI,Lucida Grande,Helvetica,FreeSans,Arimo,Droid Sans,wenquanyi micro hei,Hiragino Sans GB,Hiragino Sans GB W3,FontAwesome,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
  }
  html{
    line-height: 1.15;
  }
</style>
