<template>
  <div class="pannel-container">
    <div class="pannel-content">
      <a class="nav_logo fl" href="#/"></a>
      <ul class="nav_list fr ml20">
        <li v-for="item in 7" :class="[navClass[item-1].name, navClass[item-1].active, navClass[item-1].hover]" @click="changeNav(item-1)" @mouseenter="navEnterHandle(item)" @mouseleave="navLeaveHandle(item)">
          <template v-if="item==1">
            <div class="item">
              <a href="javascript:void(0)" class="pannel-common">
                <i class="i_icon-home"></i>
                <b>首页</b>
              </a>
            </div>
          </template>
          <template v-else-if="item==2">
            <div class="item">
              <a href="javascript:void(0)" class="pannel-common pannel-ddwc">
                <i class="i_icon-cpyx"></i>
                <b>彩票</b>
              </a>
            </div>
            <div class="nav-child navWidth">
              <div class="nav-child-1080">
                <dl class="" v-for="cate in lotteryCate" :class="{'category-ffc':cate.categoryName === '高频时时彩'}">
                  <dt>{{cate.categoryName}}</dt>
                  <dd v-for="lottery in cate.lotterys">
                    <a class="pointer" @click="navToBet(lottery.flaglot)">
                      <b>{{lottery.name}}</b>
                      <span :class="{hot:lottery.type === 'hot'}"></span>
                    </a>
                  </dd>
                </dl>

                <div class="clear-botn"></div>
                <div class="nav-child-list-img">
                  <ul>
                    <li>
                      <a href="#/lottery/ssc/txffc/cg">
                        <img src="../assets/home/txffc.png">
                      </a>
                    </li>
                    <li>
                      <a href="#/lottery/ssc/jnd30m/cg">
                        <img src="../assets/home/jnd30s.png">
                      </a>
                    </li>
                    <li>
                      <a href="#/lottery/ssc/cqssc/cg">
                        <img src="../assets/home/cqssc.png">
                      </a>
                    </li>
                    <li>
                      <a href="#/lottery/ssc/hn1fc/cg">
                        <img src="../assets/home/hn1fc.png">
                      </a>
                    </li>
                    <li>
                      <a href="#/lottery/animate/pk10/1">
                        <img src="../assets/home/bjpk10.png">
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="item==3">
            <div class="item"><a href="javascript:void(0)" class="pannel-common"><i class="i_icon-xcyl"></i><b>真人</b></a>
            </div>
            <div class="nav-child">
              <div class="nav-child-1080">
                <dl>
                  <dt class="nav-zr"></dt>
                  <dd class="lg_PTZR"><a href="#/game/pt/casino">立即游戏</a><span><b></b>转账</span>
                    <p class="border"></p></dd>
                  <dd class="lg_AGZR"><a href="#/game/ag/casino">立即游戏</a><span><b></b>转账</span>
                    <p class="border"></p></dd>
                  <dd class="lg_BBINZR"><a href="#/game/bbin/casino">立即游戏</a><span><b></b>转账</span>
                    <p class="border"></p></dd>
                </dl>
              </div>
            </div>
          </template>
          <template v-else-if="item==4">
            <div class="item"><a href="javascript:void(0)" class="pannel-common"><i class="i_icon-dzyx"></i><b>电游</b></a>
            </div>
            <div class="nav-child">
              <div class="nav-child-1080">
                <dl>
                  <dt class="nav-dz"></dt>
                  <dd class="lg_PTDZ"><a href="#/game/pt/slot">立即游戏</a><span><b></b>转账</span>
                    <p class="border"></p></dd>
                  <dd class="lg_AGDZ"><a href="#/game/ag/slot">立即游戏</a><span><b></b>转账</span>
                    <p class="border"></p></dd>
                  <dd class="lg_BBINDZ"><a href="#/game/bbin/slot">立即游戏</a><span><b></b>转账</span>
                    <p class="border"></p></dd>
                </dl>
              </div>
            </div>
          </template>
          <template v-else-if="item==5">
            <div class="item"><a href="javascript:void(0)" class="pannel-common"><i class="i_icon-tyjj"></i><b>体育</b></a>
            </div>
          </template>
          <template v-else-if="item==6">
            <div class="item"><a target="_blank" href="javascript:void(0)" class="pannel-common"><i
              class="i_icon-group"></i><b>管理</b></a></div>
          </template>
          <template v-else-if="item==7">
            <div class="item"><a href="javascript:void(0)" class="pannel-common"><i class="i_icon-activities"></i><b>活动</b></a>
            </div>
          </template>
        </li>
      </ul>
      <div class="cl-both"></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    props: ['index'],
    data() {
      return {
        navClass: [
          {name: 'pannel-li', active: '', hover: ''},
          {name: 'pannel-li', active: '', hover: ''},
          {name: 'pannel-fwlp', active: '', hover: ''},
          {name: 'pannel-fwlp pannel-dzyx', active: '', hover: ''},
          {name: 'pannel-li', active: '', hover: ''},
          {name: 'pannel-li', active: '', hover: ''},
          {name: 'pannel-li', active: '', hover: ''},
        ],
        navLink: [
          '/',
          '',
          '',
          '',
          '',
          '/manage/team',
          '/activity'
        ]
      }
    },
    computed: {
      ...mapState(['lotteryCate'])
    },
    mounted() {
      this.navClass[this.index].active = 'active';
    },
    methods: {
      navToBet(lotteryName) {
        this.$router.push({
          name:'bet',
          params:{
            lotteryName
          }
        })
      },
      navEnterHandle(idx) {
        this.navClass.forEach((item, index) => {
          if (idx-1 == index) {
            item.hover = 'actived';
          }
        });
      },
      navLeaveHandle(idx) {
        this.navClass[idx-1].hover = '';
      },
      changeNav(idx) {
        this.$router.push({path: this.navLink[idx]});
      }
    }
  }
</script>

<style lang="scss">
  .pannel-container {
    width: 100%;
    min-width: 980px;
    position: relative;
    z-index: 100;
    background: linear-gradient(to right,#4680e8,#55cbf1);
    height: 78px;
    .pannel-content {
      width: 1080px;
      margin: 0 auto;
    }
    .nav_logo {
      display: inline-block;
      width: 156px;
      height: 70px;
      background: url(../assets/home/logo.png) no-repeat 50%;
      background-size: auto 100%;
      margin-top: 4px;
    }
    .nav_list {
      margin-left: 45px;
      height: 78px;
      li {
        text-align: center;
        cursor: pointer;
        width: 100px;
        &:hover {
          background-color: rgba(0,0,0,.04)
        }
        .item {
          margin-top: 15px;
          width: 70px;
          margin-left: auto;
          margin-right: auto;
          height: 63px;
          i {
            width: 26px;
            height: 26px;
            position: relative;
            transition: all .2s;
            top: 0
          }
          p {
            color: #a75e9a;
            font-size: 16px
          }
          b {
            width: 72px
          }
          &:hover {
            em, i {
              animation-duration: 1s;
              animation-fill-mode: both;
              animation-name: bounce;
              transform-origin: center bottom
            }
          }
        }
      }
      .active, .active:hover {
        background-color: rgba(0,0,0,.04)
      }
    }
    .cl-both {
      clear: both
    }
  }
  @keyframes bounce {
    0%,20%,53%,80%,to {
      animation-timing-function: cubic-bezier(.215,.61,.355,1);
      transform: translateZ(0)
    }
    40%,43% {
      animation-timing-function: cubic-bezier(.755,.05,.855,.06);
      transform: translate3d(0,-10px,0)
    }
    70% {
      animation-timing-function: cubic-bezier(.755,.05,.855,.06);
      transform: translate3d(0,-5px,0)
    }
    90% {
      transform: translate3d(0,-2px,0)
    }
  }
  .pannel-li {
    float: left;
    font-size: 14px;
    font-family: Microsoft YaHei;
    transition: all .3s;
    i {
      display: inline-block;
      background: url(../assets/home/new_icon.png) no-repeat;
      &.i_icon-home {
        background-position: -192px -5px
      }
      &.i_icon-cpyx {
        background-position: -222px -5px
      }
      &.i_icon-xcyl {
        background-position: -251px -5px
      }
      &.i_icon-dzyx {
        background-position: -3px -35px
      }
      &.i_icon-tyjj {
        background-position: -37px -37px
      }
      &.i_icon-account {
        background-position: -69px -38px
      }
      &.i_icon-group {
        background-position: -102px -37px
      }
      &.i_icon-activities {
        background-position: -135px -37px
      }
      &.i_icon-rewards {
        background-position: -216px -37px
      }
    }
    &.actived {
      .nav-child {
        height: 450px;
      }
    }
    .nav-child {
      display: block;
      width: 100%;
      height: 0;
      position: absolute;
      left: 0;
      top: 78px;
      text-align: left;
      background: rgba(0,0,0,.9);
      z-index: 101;
      overflow: hidden;
      transition: all .4s;
      .nav-child-1080 {
        width: 1080px;
        margin: 15px auto 0
      }
      dl {
        float: left;
        width: 150px;
        line-height: 25px;
        font-size: 15px;
        margin: 0 0 0 16px;
        &.category-ffc {
          width: 240px;
          height: 250px;
          margin: 0 34px 0 0;
          dd {
            float: left;
            width: 120px;
            height: 34px;
            line-height: 34px
          }
        }
        dt {
          color: #6cb8fd;
          padding-left: 10px;
          font-weight: 700
        }
        dd {
          font-size: 13px;
          width: 150px;
          position: relative;
          a {
            display: inline-block;
            height: 22px;
            line-height: 22px;
            color: #ccc;
            position: relative;
            padding: 6px 25px 6px 10px;
            transition: all .3s;
            span {
              display: inline-block;
              width: 12px;
              height: 12px;
              line-height: 12px;
              text-align: center;
              border-radius: 2px;
              margin-left: 3px;
              margin-top: 6px;
              color: #fff;
              position: absolute
            }
            &:hover {
              background-color: hsla(0,0%,42%,.8);
              color: #6cb8fd;
              border-radius: 5px
            }
            .cur {
              background-color: #e95eda;
              color: #fff
            }
            .hot {
              background: url(../assets/home/hotnew.png) no-repeat left 0
            }
            .new {
              background: url(../assets/home/hotnew.png) no-repeat right 0
            }
          }
        }
        &.nopb {
          width: 482px;
          margin-top: 0;
          dd {
            width: 33%
          }
        }
        &:nth-child(5) {
          width: 125px
        }
      }
      .nav-child-list-img {
        border-top: 1px dashed #3f4761;
        overflow: hidden;
        padding-top: 10px;
        width: 1080px;
        ul {
          li {
            float: left;
            width: 150px;
            height: 150px;
            margin: 5px 29px;
            padding: 0;
            &:nth-child(2), &:nth-child(3) {
              margin-right: 38px
            }
            img {
              transition: all .3s
            }
            &:hover {
              transform: scale(1.01)
            }
          }
        }
      }
      &.nav-child-text {
        height: auto;
        width: 100%;
        height: 0;
        padding-bottom: 0;
        text-align: center;
        a {
          float: none;
          width: 100%;
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          height: auto;
          padding: 0;
          display: block;
          color: #fff;
          &:hover {
            text-decoration: underline
          }
        }
      }
    }
  }
  .pannel-fwlp {
    float: left;
    font-size: 14px;
    font-family: Microsoft YaHei;
    position: static;
    transition: all .3s;
    a.pannel-common {
      cursor: pointer
    }
    i {
      width: 26px;
      height: 26px;
      display: inline-block;
      background: url(../assets/home/new_icon.png) no-repeat;
      &.i_icon-xcyl {
        background-position: -251px -5px
      }
      &.i_icon-dzyx {
        background-position: -3px -37px
      }
    }
    .nav-child {
      display: none
    }
    &.actived {
      .nav-child {
        width: 100%;
        height: 270px;
        position: absolute;
        left: 0;
        top: 78px;
        z-index: 101;
        background: rgba(0,0,0,.9);
        display: block;
        .nav-child-1080 {
          width: 1080px;
          height: 270px;
          margin: 0 auto;
          dl {
            width: 1080px;
            dd {
              width: 312px;
              height: 240px;
              float: left;
              position: relative;
              a {
                display: block;
                width: 75px;
                height: 27px;
                line-height: 27px;
                color: #fff;
                text-align: center;
                background-image: linear-gradient(to bottom,#54aafa,#4f8ef8);
                position: absolute;
                bottom: 0;
                left: 76px;
                border-radius: 14px;
                &:hover {
                  background: linear-gradient(to right,#228ae6,#228ae6);
                  color: #fff
                }
              }
              span {
                position: absolute;
                display: block;
                color: #fff;
                bottom: 0;
                left: 157px;
                width: 75px;
                text-indent: 16px;
                height: 27px;
                line-height: 27px;
                border-radius: 14px;
                background-image: linear-gradient(to bottom,#ff7e67,#ff4e87);
                &:hover {
                  background: linear-gradient(to right,#cc5260,#cc5260);
                  color: #fff
                }
                b {
                  width: 15px;
                  height: 15px;
                  position: absolute;
                  top: 6px;
                  left: 12px;
                  background: url(../assets/home/transfer-icon.png) no-repeat;
                  transition: none
                }
              }
              .border {
                position: absolute;
                right: 0;
                width: 0;
                top: 70px;
                height: 107px;
                border-right: 1px dashed #3a435e
              }
              &.lg_PTZR {
                margin-left: 68px;
                background: url(../assets/home/pt-zr.png) no-repeat center 10px
              }
              &.lg_AGZR {
                background: url(../assets/home/ag-zr.png) no-repeat center 10px
              }
              &.lg_BBINZR {
                background: url(../assets/home/bbin-zr.png) no-repeat center 10px
              }
              &.lg_PTDZ {
                margin-left: 68px;
                background: url(../assets/home/pt-dz.png) no-repeat center 10px
              }
              &.lg_AGDZ {
                background: url(../assets/home/ag-dz.png) no-repeat center 10px
              }
              &.lg_BBINDZ {
                background: url(../assets/home/bbin-dz.png) no-repeat center 10px
              }
            }
          }
        }
        dl {
          dd {
            a {
              > span {
                width: 200px
              }
            }
          }
        }
      }
    }
  }
  .pannel-common {
    float: left;
    display: block;
    color: #fff!important;
    position: relative;
    cursor: pointer;
    b {
      display: block;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 1px;
      color: #fff;
      font-size: 15px
    }
    sup {
      font-size: 12px;
      display: block;
      line-height: 13px;
      font-family: arial;
      top: 0
    }
    em {
      display: block;
      width: 15px;
      height: 15px;
      position: absolute;
      top: 0;
      right: -6px
    }
  }
</style>