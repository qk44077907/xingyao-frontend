<template>
  <div class="indexSideBar affix-sidebar-rec">
    <div class="indexSideBar affix-sidebar-rec">
      <a href="https://vngmm.chatinc.net/chat/chatClient/chatbox.jsp?companyID=12392&configID=484&jid=&s=1"
         target="_blank" class="sidebar-div">
        <span>客服</span>
      </a>
      <a class="sidebar-div appDownload" href="javascript:;" target="_blank">
        <span>APP</span>
        <div class="code-warp " :style="home?'animation: code-animate 2s;':'animation: none'">
          <b>
            <img src="https://xymobile.sqglb.com/xy/xy_h5code.png?n=0.38291117955254905">
          </b>
        </div>
      </a>
      <div class="sidebar-div hangUp" href="javascript:;" @mouseenter="hangUpEnter" @mouseleave="hangUpLeave">
        <span>挂机</span>
        <div v-show="hangUpFlag" class="hangUp-wrap">
          <h3>
            <p>自动投注挂机软件</p>
            <a href="https://xymobile.sqglb.com/xy_auto/pc/杏耀系列挂机说明书及常见问题.zip" target="_blank" class="tips">使用说明</a>
          </h3>
          <ul>
            <li>
              <h4>电脑版下载</h4>
              <p>推荐使用Win7以上系统<br>WinXP用户请百度安裝.net3.5</p>
              <p class="pc-icon"></p>
              <a href="http://dl4.enjoysincai.net/download/xy_auto.exe" target="_blank">高速下载</a>
            </li>
            <li>
              <h4>手机版下载</h4>
              <p>适用苹果/安卓系统</p>
              <p class="hangUp-qr"><img src="https://xymobile.sqglb.com/xy_auto/download/xyqr.png?n=0.85331202464129">
              </p>
              <p>推荐使用扫码工具扫一扫下载</p>
            </li>
            <li class="border"></li>
          </ul>
        </div>
      </div>
      <a class="sidebar-div personal" href="#/report/personal/management/index" target="_self">
        <span>我的</span>
      </a>
      <a class="sidebar-div chat">
        <span>聊天</span>
        <b class="s_msg" style="display: none;"></b>
      </a>
      <a href="#/report/help/playinfo" class="sidebar-div help">
        <span>帮助</span>
      </a>
      <a class="sidebar-div sound" :class="[isSoundOpened ? 'soundon' : 'soundoff']" @click="switchSound">
        <span>声音</span>
      </a>
      <div class="sidebar-div background" @mouseenter="backgroundEnter" @mouseleave="backgroundLeave">
        <span>背景</span>
        <div v-show="backgroundFlag" class="background-wrap">
          <div class="background-header">
            <span class="background-header-icon"></span>
            切换背景图片
          </div>
          <div class="background-list">
            <div v-for="item in backgroundList" class="background-conter">
              <a class="background-image" :title="item.title"
                 :style="{backgroundImage: 'url(https://www.zhixueonline.com/' + item.picture + ')'}"></a>
              <span class="background-label" style="display: none;"></span>
            </div>
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="多彩树叶" style="background-image: url('/uploads/attachments/6/201810/1540461329_suffix.jpg?v=18.10.17.30722');"></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="欧洲小镇" style="background-image: url('/uploads/attachments/6/201810/1540461175_suffix.jpg?v=18.10.17.30722');"></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="欢乐老虎机" style="background-image: url('/uploads/attachments/6/201810/1540461207_suffix.jpg?v=18.10.17.30722');"></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="繁花似锦" style="background-image: url('/uploads/attachments/6/201810/1540461249_suffix.jpg?v=18.10.17.30722");'></a>-->
            <!--<span class="background-label" style="display: block;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="欧洲城市" style="background-image: url('/uploads/attachments/6/201810/1540461279_suffix.jpg?v=18.10.17.30722");'></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="科幻人" style="background-image: url('/uploads/attachments/6/201810/1540461398_suffix.jpg?v=18.10.17.30722");'></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="夕阳下的街道" style="background-image: url('/uploads/attachments/6/201810/1540461562_suffix.jpg?v=18.10.17.30722');"></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="石头艺术" style="background-image: url('/uploads/attachments/6/201810/1540461307_suffix.jpg?v=18.10.17.30722');"></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="赛车" style="background-image: url('/uploads/attachments/6/201810/1540461503_suffix.jpg?v=18.10.17.30722');"></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="罗浮宫" style="background-image: url('/uploads/attachments/6/201810/1540461374_suffix.jpg?v=18.10.17.30722');"></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="蓝天碧海" style="background-image: url('/uploads/attachments/6/201810/1540461418_suffix.jpg?v=18.10.17.30722');"></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
            <!--<div class="background-conter">-->
            <!--<a class="background-image" title="跑车" style="background-image: url('/uploads/attachments/6/201810/1540461469_suffix.jpg?v=18.10.17.30722');"></a>-->
            <!--<span class="background-label" style="display: none;"></span>-->
            <!--</div>-->
          </div>
          <div class="background-footer">
            <div class="background-text">恢复默认背景</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    props: {
      home: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        hangUpFlag: false,
        backgroundFlag: false,
        backgroundList: []
      }
    },
    computed: {
      ...mapState(['isSoundOpened'])
    },
    methods: {
      ...mapMutations(['switchSound']),
      hangUpEnter() {
        this.hangUpFlag = true;
      },
      hangUpLeave() {
        this.hangUpFlag = false;
      },
      backgroundEnter() {
        this.backgroundFlag = true;
      },
      backgroundLeave() {
        this.backgroundFlag = false;
      }
    },
    mounted() {
      this.backgroundList = [{
        "title": "\u591a\u5f69\u6811\u53f6",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "1",
        "added_time": "2018-10-25 17:55:29",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461329.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461329_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u6b27\u6d32\u5c0f\u9547",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "2",
        "added_time": "2018-10-25 17:52:55",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461175.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461175_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u6b22\u4e50\u8001\u864e\u673a",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "2",
        "added_time": "2018-10-25 17:53:28",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461207.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461207_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u7e41\u82b1\u4f3c\u9526",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "3",
        "added_time": "2018-10-25 17:54:09",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461249.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461249_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u6b27\u6d32\u57ce\u5e02",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "4",
        "added_time": "2018-10-25 17:54:39",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461279.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461279_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u79d1\u5e7b\u4eba",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "4",
        "added_time": "2018-10-25 17:56:39",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461398.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461398_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u5915\u9633\u4e0b\u7684\u8857\u9053",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "4",
        "added_time": "2018-10-25 17:59:22",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461562.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461562_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u77f3\u5934\u827a\u672f",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "5",
        "added_time": "2018-10-25 17:55:07",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461307.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461307_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u8d5b\u8f66",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "5",
        "added_time": "2018-10-25 17:58:23",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461503.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461503_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u7f57\u6d6e\u5bab",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "7",
        "added_time": "2018-10-25 17:56:14",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461374.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461374_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u84dd\u5929\u78a7\u6d77",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "9",
        "added_time": "2018-10-25 17:56:58",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461418.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461418_suffix.jpg?v=18.10.17.30722"
      }, {
        "title": "\u8dd1\u8f66",
        "link": "",
        "start_time": "0000-00-00",
        "end_time": "0000-00-00",
        "sort": "11",
        "added_time": "2018-10-25 17:57:49",
        "picture": "\/uploads\/attachments\/6\/201810\/1540461469.jpg?v=18.10.17.30722",
        "thumb": "\/uploads\/attachments\/6\/201810\/1540461469_suffix.jpg?v=18.10.17.30722"
      }];
    },

  }
</script>

<style lang="scss">
  .affix-sidebar-rec {
    position: fixed;
    right: 2px;
    bottom: 30%;
    z-index: 999;
    font-size: 12px;
    text-align: center;
    .sidebar-div {
      height: 50px;
      width: 50px;
      display: block;
      text-decoration: none;
      background: #fff;
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#99000000", endColorStr="#99000000");
      transition: all .3s ease-out;
      cursor: pointer;
      margin-top: 3px;
      border-radius: 4px 4px 4px 4px;
      box-shadow: -1px 1px 10px rgba(0, 0, 0, .2);
      background-image: url(../assets/home/sidebar.png);
      margin-left: auto;
      box-sizing: border-box;
      white-space: nowrap;
      position: relative;
      span {
        display: block;
        color: #5c83fb;
        margin-top: 34px;
        position: absolute;
        text-align: center;
        width: 50px;
      }
      &:first-child {
        background-position: -66px -2px
      }
      &.appDownload {
        background-position: -6px -58px;
        position: relative;
        span {
          color: #fff
        }
        &:hover {
          background-position: -6px -58px;
          .code-warp {
            width: 150px;
            left: -156px;
            animation-play-state: paused
          }
        }
        .code-warp {
          width: 0;
          height: 150px;
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          transition: all .3s;
          box-sizing: border-box;
          overflow: hidden;
          box-shadow: 0 0 1px rgba(0, 0, 0, .1);
          animation: code-animate 3s;
          span {
            color: #fff
          }
          b {
            display: block;
            width: 100%;
            height: 100%;
            background: #fff;
            transition: all .2s;
            box-sizing: border-box;
            img {
              height: 133px;
              width: 133px;
              overflow: hidden;
              margin-right: auto;
              margin-left: auto;
              margin-top: 8px
            }
          }
        }
      }
      &:nth-child(3) {
        background-position: -66px -394px
      }
      &:nth-child(4) {
        background-position: -66px -114px
      }
      &:nth-child(5) {
        background-position: -66px -170px;
        .s_msg {
          position: absolute;
          top: -3px;
          right: -4px;
          width: 20px;
          height: 20px;
          background: #ff632c;
          line-height: 20px;
          text-align: center;
          border-radius: 50%;
          overflow: hidden;
          color: #fff;
          &:after {
            content: "\65B0"
          }
        }
      }
      &:nth-child(6) {
        background-position: -66px -226px
      }
      &.hangUp {
        position: relative;
        .hangUp-wrap {
          width: 180px;
          height: 382px;
          position: absolute;
          left: -186px;
          top: 0;
          box-shadow: 0 20px 30px 0 rgba(0, 0, 0, .039);
          transition: all 1s;
          h3 {
            background-image: linear-gradient(90deg, #4886e7 1%, #5d9aff 36%, #62b1f1 68%, #54c4ef 100%);
            height: 55px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            p {
              color: #fff;
              font-size: 15px;
              padding: 10px 0 6px;
              text-align: center
            }
            a {
              display: block;
              height: 16px;
              line-height: 16px;
              color: #fff;
              font-weight: 400;
              text-decoration: underline;
              background: url(../assets/home/tips.png) no-repeat 46px
            }
          }
          ul {
            background: #fff;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            li {
              background: #fff;
              h4 {
                color: #ff7800;
                font-size: 15px;
                text-align: center;
                padding: 16px 0 8px
              }
              p {
                color: #959aa2;
                font-size: 12px;
                line-height: 16px;
                &.hangUp-qr {
                  width: 115px;
                  height: 115px;
                  margin: 8px 0 4px 34px;
                  img {
                    width: 100%
                  }
                }
              }
              a {
                width: 120px;
                height: 26px;
                text-align: center;
                line-height: 26px;
                border-radius: 13px;
                display: block;
                background-image: linear-gradient(90deg, #fb7c2f 0, #f6bf47 99%);
                position: relative;
                font-size: 14px;
                color: #fff;
                margin: 11px 0 15px 30px;
                &:after {
                  content: "";
                  position: absolute;
                  left: 20px;
                  top: 7px;
                  width: 8px;
                  height: 13px;
                  background: url(../assets/home/lightning.png) no-repeat
                }
              }
              &:nth-child(2) {
                height: 208px;
                background: url(../assets/home/sidebar-border.png) no-repeat 0 0
              }
            }
          }
        }
      }
      &.soundon {
        background-position: -66px -282px
      }
      &.soundoff {
        background-position: -66px -338px
      }
      &.background {
        background-position: -66px -450px;
        position: relative;
        .background-wrap {
          width: 240px;
          height: 320px;
          position: absolute;
          left: -245px;
          bottom: 0;
          box-shadow: 0 20px 30px 0 rgba(0, 0, 0, .039);
          transition: all 1s;
          background-color: #fff;
          overflow: hidden;
          border-radius: 4px;
          .background-header {
            background-image: linear-gradient(90deg, #4886e7 1%, #5d9aff 36%, #62b1f1 68%, #54c4ef 100%);
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-weight: 700;
            font-size: 14px;
            text-indent: 33px;
            .background-header-icon {
              background: url(../assets/home/sidbar-bg-logo.png) no-repeat;
              display: inline-block;
              width: 20px;
              height: 20px;
              position: absolute;
              left: 70px;
              top: 10px;
              margin-top: 0
            }
          }
          .background-list {
            padding: 1px 5px 15px 15px;
            overflow-y: scroll;
            margin-top: 8px;
            overflow-x: hidden;
            height: calc(100% - 74px);
            box-sizing: border-box;
            &::-webkit-scrollbar {
              width: 4px;
              background-color: #f6f8fb
            }
            &::-webkit-scrollbar-track {
              background-color: #f6f8fb
            }
            &::-webkit-scrollbar-thumb {
              cursor: pointer;
              background-color: #c5cad6;
              border-radius: 10px
            }
            .background-conter {
              width: 100px;
              float: left;
              height: 61px;
              margin-right: 8px;
              margin-bottom: 9px;
              position: relative;
              .background-image {
                display: inline-block;
                height: 60px;
                width: 96px
              }
              .background-label {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                background: url(../assets/home/selected_03.png);
                width: 100px;
                height: 60px;
                margin-top: 3px
              }
            }
          }
          .background-footer {
            position: absolute;
            width: 240px;
            height: 35px;
            bottom: 0;
            text-align: center;
            line-height: 35px;
            background: #fefefe;
            color: #000;
            .background-text {
              width: 90px;
              height: 22px;
              border: 1px solid #c5cad6;
              text-align: center;
              line-height: 22px;
              border-radius: 4px;
              margin-left: 80px;
              margin-top: 5px;
              &:hover {
                color: #fff;
                background-image: -moz-linear-gradient(90deg, #4886e7 1%, #5d9aff 36%, #62b1f1 68%, #54c4ef 100%);
                background-image: -webkit-linear-gradient(90deg, #4886e7 1%, #5d9aff 36%, #62b1f1 68%, #54c4ef);
                background-image: -ms-linear-gradient(90deg, #4886e7 1%, #5d9aff 36%, #62b1f1 68%, #54c4ef 100%);
                border-radius: 4px
              }
            }
          }
        }
      }
      &:hover {
        -webkit-transition: width .3s, background-color .3s;
        -moz-transition: width .3s, background-color .3s;
        -o-transition: width .3s, background-color .3s;
        transition: all .3s;
        span {
          color: #fff
        }
        &:first-child {
          background-position: -6px -2px
        }
        &:nth-child(3) {
          background-position: -6px -394px
        }
        &:nth-child(4) {
          background-position: -6px -114px
        }
        &:nth-child(5) {
          background-position: -6px -170px
        }
        &:nth-child(6) {
          background-position: -6px -226px
        }
        &.soundon {
          background-position: -6px -282px
        }
        &.soundoff {
          background-position: -6px -338px
        }
        &.background {
          background-position: -6px -450px
        }
      }
    }
  }

  @keyframes code-animate {
    0% {
      left: 0;
      width: 0
    }
    20% {
      width: 150px;
      left: -156px
    }
    80% {
      width: 150px;
      left: -156px
    }
    to {
      left: 0;
      width: 0
    }
  }

  @-webkit-keyframes code-animate {
    0% {
      width: 150px;
      left: -156px
    }
    50% {
      left: 0;
      width: 0
    }
    to {
      width: 150px;
      left: -156px
    }
  }

  @-moz-keyframes code-animate {
    0% {
      width: 150px;
      left: -156px
    }
    50% {
      left: 0;
      width: 0
    }
    to {
      width: 150px;
      left: -156px
    }
  }
</style>