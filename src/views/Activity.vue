<template>
  <div class="activity-page">
    <header class="header-framework">
      <Header></Header>
      <HeaderNav :index="6"></HeaderNav>
    </header>
    <SideBar></SideBar>
    <div class="activity_main">
      <div class="right_meun">
        <ul>
          <li :class="{current: current==0}" @click="tabHandle(0)"><a>单挑模式说明</a></li>
          <li :class="{current: current==1}" @click="tabHandle(1)"><a>单期累计奖金限额</a></li>
        </ul>
      </div>
      <div class="left_activity">
        <div :class="{curr: current==index}" v-for="(item,index) in picList" :key="index">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/BetHeader.vue'
  import HeaderNav from '@/components/HeaderNav.vue'
  import SideBar from '@/components/SideBar.vue'
  import Footer from '@/components/BetFooter.vue'
  import activityPic1 from '../assets/activity/activity1.png'
  import activityPic2 from '../assets/activity/activity2.png'

  export default {
    components: {
      Header,
      HeaderNav,
      SideBar,
      Footer
    },
    data() {
      return {
        current: 0,
        picList: [activityPic1, activityPic2]
      }
    },
    methods: {
      tabHandle(idx) {
        this.current = idx;
      }
    }
  }
</script>

<style lang="scss">
  .activity-page {
    .activity_main {
      width: 1080px;
      margin: 0 auto;
      overflow: hidden;
    }
    .right_meun {
      float: left;
      width: 160px;
      min-height: 620px;
      ul {
        margin: 0;
        padding: 20px 0 0;
        li {
          font-size: 16px;
          width: 150px;
          height: 50px;
          border-radius: 6px;
          cursor: pointer;
          background: #fff;
          color: #5c81cc;
          margin-bottom: 10px;
          a {
            display: block;
            height: 50px;
            line-height: 50px;
            color: #5c81cc;
            text-indent: 14px;
            font-size: 14px
          }
        }
        .current {
          font-weight: 700;
          color: #fff;
          background-image: linear-gradient(90deg,#8877f6 0,#6ec6fd 100%);
          a {
            color: #fff
          }
        }
      }
    }
    .left_activity {
      width: 920px;
      float: left;
      margin-top: 20px;
      border-radius: 6px;
      > div {
        &.curr {
          display: block;
        }
        display: none;
        width: 100%;
        border: 0;
        border-radius: 6px;
        img {
          max-width: 920px;
        }
      }
    }
  }
</style>