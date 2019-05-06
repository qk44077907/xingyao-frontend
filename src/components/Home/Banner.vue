<template>
  <div class="banner-framework">
    <div class="banner-box agBox indexBanner" @mouseenter="bannerEnter" @mouseleave="bannerLeave">
      <ul class="banner_box">
        <li v-for="item in getList" :class="item.active?'cur':''">
          <a class="pointer" title="" :style="`background-image: url(${item.name})`"></a>
        </li>
      </ul>
      <a href="javascript:;" class="rslides_nav rslides1_nav prev" @click="prevHandle">&lt;</a>
      <a href="javascript:;" class="rslides_nav rslides1_nav next" @click="nextHandle">&gt;</a>
      <ul class="rslides_tabs rslides1_tabs">
        <li v-for="(item,index) in getList" :class="item.active?'rslides_here':''" @mouseenter="tabHandle(index)">
          <a></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import pic1 from '../../assets/home/1530005004.jpg'
  import pic2 from '../../assets/home/1527824330.jpg'
  export default {
    data() {
      return {
        bannerId: 0,  // timer
        bannerCur: 0,   // 当前banner角标
        bannerList: []
      }
    },
    computed: {
      getList() {
        this.bannerList.forEach((item,index) => {
          if (index == this.bannerCur) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        return this.bannerList;
      }
    },
    mounted() {
      this.getBannerData();
    },
    methods: {
      getBannerData() {
        this.bannerList = [
          {
            active: false,
            name: pic1
          },
          {
            active: false,
            name: pic2
          }
        ];
        this.setBanner();
      },
      setBanner() {
        this.bannerId = setInterval(() => {
          this.addCount();
        }, 2500);
      },
      addCount() {
        let len = this.bannerList.length;
        if ((this.bannerCur+1) == len) {
          this.bannerCur = 0;
        } else {
          this.bannerCur++;
        }
      },
      bannerEnter() {
        clearInterval(this.bannerId);
      },
      bannerLeave() {
        this.setBanner();
      },
      prevHandle() {
        let len = this.bannerList.length;
        if (this.bannerCur == 0) {
          this.bannerCur = len-1;
        } else {
          this.bannerCur--;
        }
      },
      nextHandle() {
        let len = this.bannerList.length;
        if (this.bannerCur == len-1) {
          this.bannerCur = 0;
        } else {
          this.bannerCur++;
        }
      },
      tabHandle(idx) {
        this.bannerCur = idx;
      }
    }
  }
</script>

<style lang="scss">
.banner-framework {
  .agBox {
    width: 100%;
    height: 470px;
    position: relative;
    background: #000;
    &.indexBanner {
      height: 450px;
      text-align: center;
    }
    .rslides {
      width: 100%;
      position: relative;
      list-style: none;
      padding: 0
    }
    .rslides_nav {
      width: 105px;
      height: 105px;
      position: absolute;
      left: 90px;
      top: 37%;
      overflow: hidden;
      text-indent: -99em;
      background: url(../../assets/home/new_arrow_left.png) no-repeat;
      z-index: 99;
      opacity: .5;
      &.next {
        left: auto;
        right: 90px;
        background: url(../../assets/home/new_arrow_left.png) no-repeat;
        opacity: .5;
        transform: rotate(180deg);
        &.active, &:hover {
          opacity: 1;
          right: 85px
        }
      }
      &.prev {
        &.active, &:hover {
          opacity: 1;
          left: 85px
        }
      }
    }
    .rslides_tabs {
      /*display: none;*/
      position: relative;
      margin: -100px auto 0;
      clear: both;
      text-align: center;
      z-index: 99;
      li {
        display: inline;
        float: none;
        *float: left;
        margin-right: 10px
      }
      a {
        width: 13px;
        height: 13px;
        display: inline-block;
        *display: block;
        border-radius: 50px;
        background-color: #000;
        text-indent: 999px;
        opacity: .5;
        filter: alpha(opacity=50);
        overflow: hidden
      }
      .rslides_here {
        a {
          background-color: #fff;
          opacity: 1;
          filter: alpha(opacity=100)
        }
      }
    }
  }
  .banner-box {
    .banner_box {
      height: 450px;
      margin-bottom: -40px;
      li {
       width: 100%;
       height: 100%;
       position: absolute;
       opacity: 0;
       overflow: hidden;
       transition: opacity .4s
      }
      .cur {
        opacity: 1;
        z-index: 9
      }
      a {
        display: block;
        background-position: 50%;
        height: 450px;
        width: 100%;
        background-repeat: no-repeat
      }
    }
    .banner_radio {
      width: 1000px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
      height: 40px
    }
    .banner_radios {
      float: right;
      li {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin: 0 2px;
        border-radius: 50%;
        cursor: pointer;
        background: rgba(0, 0, 0, .6);
        transition: all .3s;
        &.cur, &:hover {
          width: 40px;
          border-radius: 10px;
          background: #e7db75
        }
      }
    }
  }
}
</style>