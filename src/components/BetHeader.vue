<template>
  <div class="user_info">
    <div class="user_info_left">欢迎您，
      <span class="user_username">geelao666</span>
      <a class="ui_message">
        <i class="ic-message"></i>
        <span class="ui_msgnum" style="display: none;"></span>
      </a>预留信息：
      <span class="ui_yuliu"></span>
      <a class="ui_logout">安全退出</a>
    </div>
    <div class="user_info_right">
      <div :class="userMoneyFlag?'money-left activeds':'money-left'" @mouseenter="showUserMoney" @mouseleave="hideUserMoney">
        <div class="combo-box">
          <i class="t_drop"></i>
          <span>余额:</span>
          <span class="t_money">￥<span>
            <span v-if="balanceLook">{{isRefreshingBalance ? '刷新中':profile.balance}}</span>
            <span v-else>************</span>
          </span></span>
        </div>
        <span class="refresh ml5" @click="refreshBalance">刷新</span>
        <a class="ml5 pointer" @click="balanceLookHandle">
          <i :class="balanceLook?'ic-unlook':'ic-look'"></i>
        </a>
        <div class="nav-child">
          <div class="nav-child-350">
            <div class="money-top">
              <i class="balance-icon"></i>
              <span class="money-balance f15 ml5">彩票余额: </span>
              <span class="t_money">￥
                <span>
                  <span v-if="balanceLook">{{isRefreshingBalance ? '刷新中':profile.balance}}</span>
                  <span v-else>************</span>
                </span>
              </span>
              <a class="personal" href="#/manage/personal">
                <span>个人管理 <span class="enter-icon"></span></span>
              </a>
            </div>
            <div>
              <div class="money-div pt10 pb10">
                <p class="money-radius"></p>
                <p class="money-name">AG余额: </p>
                <p class="money-value">￥ 0.0000</p>
                <span><b></b>转账</span>
              </div>
              <div class="bottom-logo"></div>
            </div>
            <div>
              <div class="money-div pt10 pb10">
                <p class="money-radius"></p>
                <p class="money-name">PT余额: </p>
                <p class="money-value">￥ 0.0000</p>
                <span><b></b>转账</span>
              </div>
              <div class="bottom-logo"></div>
            </div>
            <div>
              <div class="money-div pt10 pb10">
                <p class="money-radius"></p>
                <p class="money-name">沙巴余额: </p>
                <p class="money-value">￥ 0.0000</p>
                <span><b></b>转账</span>
              </div>
              <div class="bottom-logo"></div>
            </div>
            <div>
              <div class="money-div pt10 pb10">
                <p class="money-radius"></p>
                <p class="money-name">BBIN余额: </p>
                <p class="money-value">￥ 0.0000</p>
                <span><b></b>转账</span>
              </div>
              <div class="bottom-logo"></div>
            </div>
          </div>
        </div>
      </div>
      <a title="充值" class="t_btn chongzhi" @click="showDepositModal">充值</a>
      <a title="提款" class="t_btn tixian">提款</a>
      <a href="https://vngmm.chatinc.net/chat/chatClient/chatbox.jsp?companyID=12392&amp;configID=484&amp;jid=&amp;s=1" target="_blank" title="在线客服" class="t_kefu">
        <i class="ic-kefu"></i>
        <span>客服</span>
      </a>
    </div>
  </div>
</template>

<script>
  import { mapMutations ,mapState,mapActions} from 'vuex'
  export default {
    data() {
      return {
        userMoneyFlag: false,   // 余额下拉框
        balanceLook: false  // true-显示余额 false-显示星号
      }
    },
    computed:{
      ...mapState(['profile','isRefreshingBalance'])
    },
    methods: {
      ...mapMutations(['showDepositModal']),
      ...mapActions(['refreshBalance']),
      showUserMoney() {
        this.userMoneyFlag = true;
      },
      hideUserMoney() {
        this.userMoneyFlag = false;
      },
      balanceLookHandle() {
        this.balanceLook = !this.balanceLook;
      }
    }
  }
</script>

<style lang="scss">
  .user_info {
    padding: 2px 0;
    width: 1080px;
    margin: 0 auto;
    color: #fff;
    font-family: microsoft yahei;
    font-size: 13px;
    height: 28px;
    line-height: 25px;
    position: relative;
    z-index: 200;
    .user_info_left {
      float: left;
      .ui_message {
        margin-left: 15px;
        margin-right: 10px;
        position: relative;
      }
      .user_username {
        color: #ffc34c;
      }
      .ic-message {
        cursor: pointer;
        width: 19px;
        height: 14px;
        background: url(../assets/home/top-icon.png) 0 -2px;
      }
      .ic-message:hover {
        background-position: 0 -21px;
      }
      .ui_message .ui_msgnum {
        text-align: center;
        font-size: 12px;
        color: #fff;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #fe3c85;
        display: inline-block;
        line-height: 14px;
        transform: scale(.8);
        position: absolute;
        right: 4px;
        top: -2px;
      }
      .ui_yuliu {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
        cursor: pointer;
      }
      .ui_logout {
        color: #a6a6a6;
        font-weight: 700;
        margin-left: 8px;
        transition: all .3s;
        cursor: pointer
      }
      .ui_logout:hover {
        color: #09f
      }
    }
    .user_info_right {
      float: right;
      .t_drop {
        width: 10px;
        height: 7px;
        background: url(../assets/home/drop-icon.png) no-repeat;
        display: inline-block;
        margin: 0 5px
      }
      .money-left {
        float: left;
        font-weight: 700;
        span:nth-child(3) {
          color: #ffc34c
        }
        span .refresh {
          color: #fff;
          cursor: pointer;
          padding-left: 10px
        }
        .combo-box {
          display: inline-block;
          padding: 2.5px 5px 2.5px 0
        }
        .combo-box .t_money {
          padding: 0 5px
        }
        .refresh {
          cursor: pointer
        }
        .nav-child {
          display: none
        }
        &.activeds {
          .nav-child {
            height: 229px;
            position: absolute;
            right: 65px;
            top: 32px;
            z-index: 9999;
            background: rgba(0,0,0,.88);
            display: block;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            font-weight: 400;
            transition: all .3s;
            .nav-child-350 {
              min-width: 300px;
              height: 229px;
              .money-top {
                position: relative;
                background: rgba(56,64,79,.5);
                padding-bottom: 8px;
                .t_money {
                  margin-left: 7px
                }
                .balance-icon {
                  width: 30px;
                  height: 30px;
                  background: url(../assets/home/balance.png) no-repeat;
                  display: inline-block;
                  margin-left: 15px;
                  position: relative;
                  top: 10px
                }
                .personal {
                  color: #fff;
                  font-weight: 700;
                  padding-left: 45px;
                  margin-right: 25px;
                  .enter-icon {
                    width: 8px;
                    height: 10px;
                    background: url(../assets/home/enter-icon.png) no-repeat;
                    display: inline-block
                  }
                  &:hover {
                    color: #4bbfff;
                    .enter-icon {
                      background: url(../assets/home/enter-hover.png) no-repeat
                    }
                  }
                }
              }
              .money-div {
                position: relative;
                color: #ccc;
                .money-radius {
                  width: 5px;
                  height: 5px;
                  background-color: #fe8076;
                  border-radius: 50%;
                  display: inline-block;
                  margin: 0 18px 2px 28px;
                }
                .money-name {
                  display: inline-block;
                  width: 70px;
                  white-space: nowrap
                }
                .money-value {
                  display: inline-block;
                  padding-left: 5px
                }
                span {
                  position: absolute;
                  display: block;
                  color: #fff;
                  bottom: 9px;
                  right: 6%;
                  width: 75px;
                  text-indent: 32px;
                  height: 27px;
                  line-height: 27px;
                  border-radius: 14px;
                  cursor: pointer;
                  background-image: linear-gradient(to bottom, #ff7e67, #ff4e87)
                }
                span b {
                  width: 15px;
                  height: 15px;
                  position: absolute;
                  top: 6px;
                  left: 12px;
                  background: url(../assets/home/transfer-icon.png) no-repeat;
                  transition: none
                }
                span:hover {
                  background: linear-gradient(to right, #cc5260, #cc5260)
                }
              }
              .bottom-logo {
                background: url(../assets/home/copy-border.png) no-repeat;
                height: 1px;
                background-size: 100% 100%
              }
            }
          }
          .combo-box {
            background: #353e4d
          }
        }
      }
      .t_btn {
        font-size: 14px;
        color: #fff;
        background: #a7678c;
        width: 52px;
        height: 22px;
        line-height: 22px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        margin-left: 8px;
        cursor: pointer;
        display: inline-block;
        text-align: center;
        margin-top: 3px
      }
      .chongzhi {
        background: linear-gradient(to right, #e84d80, #ff7f66);
        &:hover {
          background: linear-gradient(to right, #cc5260, #cc5260);
          color: #fff
        }
      }
      .tixian {
        background: linear-gradient(to right, #2699ff, #4cc3ff);
        &:hover {
          background: linear-gradient(to right, #228ae6, #228ae6);
          color: #fff
        }
      }
      .t_down, .t_kefu, .t_skin {
        font-size: 14px;
        margin-left: 20px;
        display: inline-block
      }
      .t_down {
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 3px;
        background: linear-gradient(to right, #8b7acf, #db79bc);
        transition: opacity .3s;
        position: relative;
        img {
          display: none;
          width: 110px;
          height: 110px;
          position: absolute;
          left: -12px;
          top: 30px;
          background-color: #fff;
          border: 1px solid #ccc
        }
        &:hover {
          opacity: .9;
          img {
            display: inline-block
          }
        }
        span {
          color: #fff
        }
        i {
          width: 16px;
          height: 16px;
          display: inline-block;
          margin-right: 3px;
          vertical-align: -4px;
          &.ic-downWin {
            margin-right: 5px
          }
        }
      }
      .t_kefu i {
        vertical-align: -3px;
        margin-right: 3px;
        background: url(../assets/home/top-icon.png) -60px 0;
        &:hover {
          background-position: -60px -19px
        }
      }
      .t_skin i.ic-skin {
        width: 21px;
        height: 16px;
        display: inline-block;
        margin-right: 2px;
        vertical-align: -4px
      }
      .ic-kefu {
        width: 16px;
        height: 16px
      }
      .t_kefu span, .t_skin span {
        padding-bottom: .5px;
        color: #fff
      }
      .ic-unlook {
        width: 16px;
        height: 16px;
        background-position: -31px 0;
        margin-left: 5px;
        margin-right: 10px;
      }
      .ic-look {
        width: 19px;
        height: 15px;
        margin-right: 10px;
        background: url(../assets/home/icon.png) no-repeat -103px -98px!important;
      }
      .ic-unlook:hover {
        background-position: -31px -19px
      }
      .t_kefu:hover span, .t_skin:hover span {
        color: #09f
      }
    }
    i[class*=ic-], i[class^=ic-] {
      display: inline-block;
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      background-image: url(../assets/home/top-icon.png);
      background-repeat: no-repeat;
      vertical-align: -2px;
    }
  }
</style>