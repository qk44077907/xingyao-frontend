<template>
  <div class="content_bg">
    <div class="home_cont cf">
      <div class="shadow"></div>
      <!-- 公告轮播 -->
      <div class="marquee-container">
        <div class="center-warp">
          <div class="notice-icon"></div>
          <div
            class="list-warp"
            :class="{stopTrans: needStop}"
            :style="{top : noticeTop}"
            v-if="noticeList.length > 0"
          >
            <div v-for="item in noticeList" class="item">{{item.title}}</div>
          </div>
          <div class="more-notice">更多</div>
        </div>
      </div>
      <!-- 热门彩票 -->
      <div class="home-hot-lottery">
        <div class="title"></div>
        <ul>
          <li v-for="(item,index) in hotLotteryList" :key="index" @click="navToBet(item.tip)">
            <a></a>
            <p class="brand">{{item.name}}</p>
            <p :class="{timeNormal: true, red: remainingSecondsObj[item.tip]<=10}">倒计时 {{convertSecondsToTime(remainingSecondsObj[item.tip]).str}}</p>
          </li>
        </ul>
      </div>
      <!-- 境外境内高频彩 -->
      <div class="home-oversea">
        <div class="oversea-warp">
          <div class="title"></div>
          <div class="oversea">
            <ul>
              <li>加拿大30秒<i class="hot"></i></li>
              <li>加拿大11选5<i class="hot"></i></li>
              <li>加拿大3D<i class="hot"></i></li>
              <li>西贡分分彩<i class=""></i></li>
              <li>日本分分彩<i class=""></i></li>
              <li>印尼分分彩<i class=""></i></li>
              <li>瑞典1分彩<i class="new"></i></li>
              <li>瑞典2分彩<i class="new"></i></li>
            </ul>
          </div>
        </div>
        <div class="teritory-warp">
          <div class="title"></div>
          <div class="territory">
            <ul>
              <li>腾讯分分彩<i class="hot"></i></li>
              <li>多彩重庆30秒<i class="new"></i></li>
              <li>多彩腾讯30秒<i class="new"></i></li>
              <li>北京PK拾<i class="hot"></i></li>
              <li>急速赛马<i class="hot"></i></li>
              <li>重庆时时彩<i class="hot"></i></li>
              <li>江苏快三<i class=""></i></li>
              <li>杏耀秒秒彩<i class=""></i></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 真人游戏 -->
      <div class="home-game">
        <ul>
          <li>
            <div class="item">
              <div class="title title-merge"></div>
              <div class="group">
                <div class="tag">
                  <i>AG真人</i>
                  <div class="btns">
                    <span><b class="enter"></b>进入游戏</span>
                    <span><b class="trans"></b>游戏转账</span>
                  </div>
                </div>
                <div class="tag">
                  <i>PT真人</i>
                  <div class="btns">
                    <span><b class="enter"></b>进入游戏</span>
                    <span><b class="trans"></b>游戏转账</span>
                  </div>
                </div>
                <div class="tag">
                  <i>BBIN真人</i>
                  <div class="btns">
                    <span><b class="enter"></b>进入游戏</span>
                    <span><b class="trans"></b>游戏转账</span>
                  </div>
                </div>
              </div>
              <img>
            </div>
          </li>
          <li>
            <div class="item">
              <div class="title"></div>
              <div class="group">
                <div class="tag">
                  <i>AG电游</i>
                  <div class="btns">
                    <span><b class="enter"></b>进入游戏</span>
                    <span><b class="trans"></b>游戏转账</span>
                  </div>
                </div>
                <div class="tag">
                  <i>PT电游</i>
                  <div class="btns">
                    <span><b class="enter"></b>进入游戏</span>
                    <span><b class="trans"></b>游戏转账</span>
                  </div>
                </div>
                <div class="tag">
                  <i>BBIN电游</i>
                  <div class="btns">
                    <span><b class="enter"></b>进入游戏</span>
                    <span><b class="trans"></b>游戏转账</span>
                  </div>
                </div>
              </div>
              <img>
            </div>
          </li>
          <li>
            <div class="item">
              <div class="title"></div>
              <div class="group">
                <div class="tag">
                  <i>沙巴体育</i>
                  <div class="btns">
                    <span><b class="enter"></b>进入游戏</span>
                    <span><b class="trans"></b>游戏转账</span>
                  </div>
                </div>
              </div>
              <img>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {convertSecondsToTime} from "@/utils/dateUtils";
  import { mapState } from 'vuex'
  import { NOTICE_LIST } from '../../utils/apiUrl'
  export default {
    data() {
      return {
        noticeList: [],
        currentNoticeIndex: 1,
        timer:null,
        hotLotteryList: [
          { name: '腾讯分分彩', tip: 'txffc' },
          { name: '河内1分彩', tip: 'hn1fc' },
          { name: '加拿大30秒', tip: 'jnd30m' },
          { name: '瑞典1分彩', tip: 'rd1fc' },
          { name: '瑞典2分彩', tip: 'rd2fc' },
        ]
      }
    },
    computed: {
      ...mapState(['remainingSecondsObj']),
      noticeTop() {
        return (1-this.currentNoticeIndex) * 34 + 'px'
      },
      needStop() {
        return this.currentNoticeIndex === 1
      },
    },
    mounted() {
      this.getNoticeList();
    },
    methods: {
      convertSecondsToTime(seconds) {
        return convertSecondsToTime(seconds)
      },
      /*hour(tip) {
        return ('0' + parseInt(this.remainingSecondsObj[tip] / 3600)).slice(-2)
      },
      minute(tip) {
        return ('0' + parseInt((this.remainingSecondsObj[tip] - this.hour(tip) * 3600) / 60)).slice(-2)
      },
      second(tip) {
        return ('0' + parseInt(this.remainingSecondsObj[tip] - this.hour(tip) * 3600 - this.minute(tip) * 60)).slice(-2)
      },*/
      getNoticeList() {
        // this.noticeList = [{name: '工行维护公告'}, {name: '北京快乐8撤单公告'}, {name: 'AG维护公告'}, {name: '平台禁止使用多账号游戏通知'}, {name: '沙巴维护公告'}, {name: '安徽11选5开售公告'}, {name: '工行维护公告'}];

        this.$axios({
          url: NOTICE_LIST,
          method: 'post',
          data: {
            page_idx:1,
            page_size:10
          },
          loading:true,
        }).then((res) => {
          if (!res.data.data) {
            return;
          }
          this.noticeList = res.data.data.list;
          this.timer = setInterval(()=>{
            if(this.currentNoticeIndex === this.noticeList.length + 1){
              this.currentNoticeIndex = 1
              setTimeout(()=>{
                this.currentNoticeIndex++
              },0)
            }else {
              this.currentNoticeIndex++
            }
          },4000)
        });

      },
      setNoticeMove() {
        setInterval(() => {
          let single = 34;
          let len = this.noticeList.length;
          if (this.num == single * (len - 1)) {
            this.num = 0;
          } else {
            this.num = this.num + single;
          }
        }, 2000);
      },
      navToBet(lotteryName) {
        this.$router.push({
          name:'bet',
          params:{
            lotteryName
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .content_bg {
    width: 100%;
    margin-bottom: 30px;
    .title {
      width: 240px;
      height: 24px;
      background: url(../../assets/home/titles.png) no-repeat
    }
    .home_cont {
      width: 1080px;
      margin: 0 auto;
      background: #fff;
      margin-top: -34px;
      position: relative;
      z-index: 99;
      border-radius: 4px;
      box-shadow: 1px 10px 40px rgba(0, 0, 0, .1);
      box-sizing: border-box;
      padding-bottom: 50px;
    }
    .cf:before, .cf:after {
      content: '';
      display: table;
    }
    .shadow {
      width: 1100px;
      height: 16px;
      position: absolute;
      top: -16px;
      left: -10px
    }
    .marquee-container {
      align-items: center;
      display: flex;
      flex-direction: row;
      color: #303c66;
      width: 100%;
      padding-left: 40px;
      padding-right: 40px;
      box-sizing: border-box;
      line-height: 34px;
      box-shadow: 1px 1px 15px rgba(0, 0, 0, .1);
      border-radius: 4px;
      .center-warp {
        height: 34px;
        line-height: 34px;
        overflow: hidden;
        width: 1040px;
        font-size: 14px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        .more-notice {
          text-align: center;
          right: 5px;
          top: 10px;
          line-height: 34px;
          cursor: pointer;
          text-decoration: underline;
          float: right
        }
        .notice-icon {
          margin-top: 10px;
          width: 14px;
          height: 14px;
          background: url(../../assets/home/new_icon.png) no-repeat;
          background-position: -45px -75px;
          float: left
        }
        .list-warp {
          display: block;
          float: left;
          width: 940px;
          position: absolute;
          box-sizing: border-box;
          padding-left: 10px;
          width: 100%;
          left: 0;
          top: 0;
          transition: top 0.5s ease;
          &.stopTrans {
            transition: none;
          }
        }
        .item {
          display: block;
          margin-left: 10px;
          cursor: pointer;
          width: 100%;
          height: 34px;
          line-height: 34px;
        }
      }
    }
    .home-hot-lottery {
      margin-top: 30px;
      padding-left: 40px;
      padding-right: 40px;
      .title {
        background-position: 0 -73px
      }
      ul {
        margin-top: 20px;
        display: block;
        li {
          display: inline-block;
          height: 190px;
          width: 181px;
          background-color: #fff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, .15);
          margin-right: 23px;
          border-radius: 7px;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            box-shadow: 1px 1px 5px rgba(0, 0, 0, .2)
          }
          &:first-child a {
            background: url(../../assets/home/time1.png)
          }
          &:nth-child(2) a {
            background: url(../../assets/home/time2.png)
          }
          &:nth-child(3) a {
            background: url(../../assets/home/time3.png)
          }
          &:nth-child(4) a {
            background: url(../../assets/home/time4.png)
          }
          &:nth-child(5) a {
            background: url(../../assets/home/time5.png)
          }
          &:last-child {
            margin-right: 0
          }
          a {
            height: 131px;
            width: 100%;
            display: block
          }
          .brand {
            color: #09f;
            font-size: 15px;
            text-align: left;
            padding-left: 20px;
            height: 18px;
            line-height: 18px;
            font-weight: 700
          }
          .timeNormal {
            margin-top: 10px;
            color: #5b6280;
            font-size: 14px;
            text-align: left;
            padding-left: 20px;
            &.red {
              color: #ff632c;
            }
          }
        }
      }
    }
    .home-oversea {
      box-sizing: border-box;
      margin-top: 40px;
      padding-left: 40px;
      padding-right: 40px;
      .oversea-warp {
        display: inline-block;
        .title {
          background-position: 0 -46px
        }
        .oversea {
          box-shadow: 0 5px 20px rgba(0, 0, 0, .3);
          margin-top: 20px;
          box-sizing: border-box;
          height: 140px;
          width: 490px;
          background: linear-gradient(to right, #4e9fd8, #3ab6d5);
          margin-right: 20px;
          border-radius: 4px;
          padding-left: 16px;
          padding-top: 20px
        }
      }
      .teritory-warp {
        display: inline-block;
        .title {
          background-position: 0 -25px
        }
        .territory {
          box-shadow: 0 10px 20px rgba(0, 0, 0, .2);
          margin-top: 20px;
          box-sizing: border-box;
          height: 140px;
          width: 490px;
          background-color: #ccc;
          margin-right: 0;
          background: linear-gradient(to right, #4693cb, #7868dc);
          border-radius: 4px;
          padding-left: 16px;
          padding-top: 20px
        }
      }
      ul {
        border-radius: 4px;
        display: inline-block;
        li {
          border-radius: 4px;
          display: inline-block;
          width: 107px;
          height: 40px;
          background-color: rgba(0, 0, 0, .25);
          margin-right: 10px;
          line-height: 40px;
          text-align: center;
          color: #fff;
          cursor: pointer;
          font-size: 13px;
          margin-bottom: 6px;
          margin-top: 2px;
          &:hover {
            background-color: rgba(0, 0, 0, .4)
          }
          i {
            background: url(../../assets/home/hotnew.png) no-repeat 12px 12px;
            height: 12px;
            width: 12px;
            margin-top: 4px;
            position: absolute;
            font-size: 14px;
          }
          .hot {
            background-position: 0 0
          }
          .new {
            background-position: -15px 0
          }
          &:nth-child(5) {
            margin-top: 10px
          }
          &:last-child, &:nth-child(4) {
            margin-right: 0
          }
        }
      }
    }
    .home-game {
      margin-top: 36px;
      padding-left: 40px;
      padding-right: 40px;
      ul li {
        display: inline-block;
        .item {
          border-radius: 4px;
          width: 320px;
          position: relative;
          .title {
            background-position: 0 0;
          }
          .group {
            width: 100%;
            display: flex;
            justify-content: space-between;
            position: absolute;
            bottom: 0;
            left: 0;
            .tag {
              display: inline-block;
              width: 33.229%;
              height: 43px;
              line-height: 43px;
              text-align: center;
              background-color: rgba(129, 120, 192, 0);
              position: relative;
              transition: .3s;
              &:first-child, &:nth-child(2) {
                border-right: 1px solid #7c95c6
              }
              &:first-child{
                border-bottom-left-radius: 4px
              }
              &:nth-child(3) {
                border-bottom-right-radius: 4px
              }
              &:hover {
                transition: .3s;
                background-color: rgba(129, 120, 192, .5)
              }
              i {
                font-style: normal;
                color: #fff;
                display: inline-block;
                width: 100%;
                cursor: pointer
              }
              .btns {
                width: 100%;
                position: absolute;
                left: 0;
                transition: all .7s;
                bottom: 100%;
                height: 0;
                opacity: 0;
                overflow: hidden;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                span {
                  position: relative;
                  display: block;
                  margin: auto;
                  color: #fff;
                  width: 100%;
                  text-indent: 20px;
                  height: 38px;
                  line-height: 38px;
                  cursor: pointer;
                  background: rgba(40, 40, 40, .92);
                  border-bottom: 1px solid rgba(77, 73, 105, .92);
                  &:hover {
                    background: rgba(77, 73, 105, .92);
                    color: #fff
                  }
                  b.trans {
                    width: 15px;
                    height: 15px;
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    background: url(../../assets/home/transfer-icon.png) no-repeat;
                    transition: none
                  }
                  b.enter {
                    width: 15px;
                    height: 15px;
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    background: url(../../assets/home/enter-icon.png) no-repeat;
                    transition: none
                  }
                }
              }
              &:hover {
                .btns {
                  height: 76px;
                  opacity: 1
                }
              }
            }
          }
          img {
            width: 320px;
            height: 219px;
            background: url(../../assets/home/game.png) no-repeat;
            margin-top: 20px;
            box-shadow: 1px 5px 25px rgba(0, 0, 0, .3);
            border-radius: 5px;
            cursor: pointer;
            display: block;
            &:hover {
              box-shadow: 1px 5px 25px rgba(0, 0, 0, .3)
            }
          }
        }
        &:first-child {
          margin-right: 20px;
          .title, img {
            background-position: 0 0
          }
        }
        &:nth-child(2) {
          margin-right: 20px;
          .title {
            background-position: 0 -118px
          }
          img {
            background-position: -340px 0
          }
        }
        &:nth-child(3) {
          margin-right: 0;
          .title {
            background-position: 0 -94px
          }
          img {
            background-position: -680px 0
          }
        }
      }
    }
  }
</style>