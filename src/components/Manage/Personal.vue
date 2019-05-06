<template>
  <div class="contents contents-personal">
    <div class="title-warp">
      <span class="title">个人管理</span>
    </div>
    <div class="manage-personal">
      <div class="personal-l">
        <dl>
          <dt>{{profile.nickname?profile.username.substring(0,2).toUpperCase():''}}</dt>
          <dd>{{profile.username}}</dd>
        </dl>
        <ul>
          <li>昵称：<span>{{profile.nickname}}</span><i @click="perfectInformation"></i></li>
          <li>预留信息：<span>建议填写</span><i @click="perfectInformation"></i></li>
          <li>彩票返点：<strong>{{profile.rebate}}%</strong><a class="pointer">彩票信息</a></li>
        </ul>
      </div>
      <div class="personal-r">
        <ul class="btnUl">
          <li><i class="recharge"></i><span>充值</span></li>
          <li><i class="withdrawal"></i><span>提款</span></li>
          <li><i class="transfer"></i><span>转账</span></li>
          <li><span>转账记录&gt;&gt;</span></li>
        </ul>
        <div class="clearfix"></div>
        <ul class="typeUl">
          <li class="active">
            <span>彩</span>
            <dl>
              <dt>彩票余额</dt>
              <dd>
                <strong>{{isRefreshingBalance?'刷新中':profile.balance}}</strong>
                <i class="" @click="refreshBalance"></i></dd>
            </dl>
          </li>
          <li><span>PT</span>
            <dl>
              <dt>PT余额</dt>
              <dd><strong>0.0000</strong><i class=""></i></dd>
            </dl>
          </li>
          <li><span>AG</span>
            <dl>
              <dt>AG余额</dt>
              <dd><strong><em>用户尚未加入游戏</em></strong><i class=""></i></dd>
            </dl>
          </li>
          <li><span>BB</span>
            <dl>
              <dt>BBIN余额</dt>
              <dd><strong>0.0000</strong><i class=""></i></dd>
            </dl>
          </li>
          <li><span>沙</span>
            <dl>
              <dt>沙巴余额</dt>
              <dd><strong>0.0000</strong><i class=""></i></dd>
            </dl>
          </li>
          <li><span>WM</span>
            <dl>
              <dt>WM余额</dt>
              <dd><strong><em>用户尚未加入游戏</em></strong><i class=""></i></dd>
            </dl>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>
      <ul class="settingBtn">
        <li>
          <span class="login-password"></span>
          <dl>
            <dt>登录密码</dt>
            <dd>6-16个字符</dd>
          </dl>
          <a class="pointer" @click="modifyPassword">修改登录密码</a>
        </li>
        <li>
          <span class="bind-card"></span>
          <dl>
            <dt>绑定银行卡</dt>
            <dd>最多可绑定5张银行卡</dd>
          </dl>
          <a class="pointer" @click="bindCardHandle">绑定银行卡</a>
        </li>
        <li>
          <span class="funding-password"></span>
          <dl>
            <dt>提款密码</dt>
            <dd>6-16个字符</dd>
          </dl>
          <a class="pointer" @click="modifyWithdrawPassword">修改提款密码</a>
        </li>
        <li>
          <span class="station-letter"></span>
          <dl>
            <dt>站内信</dt>
            <dd><i>0</i>条未读</dd>
          </dl>
          <a class="pointer" @click="openMail">查看站内信</a>
        </li>
        <li>
          <span class="security-settings"></span>
          <dl>
            <dt>密保设定</dt>
            <dd>用于找回密码</dd>
          </dl>
          <a class="pointer" @click="changeQuestion">修改密保设定</a>
        </li>
        <li>
          <span class="notice"></span>
          <dl>
            <dt>公告</dt>
            <dd>请随时关注最新公告</dd>
          </dl>
          <a class="pointer" @click="isAnnounceShowed = true">查看公告</a>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <Information v-if="perfectFlag" @closeHandle="closeInformation"></Information>
    <modify-password v-if="modifyPass" @closeHandle="closeModifyPassword"></modify-password>
    <withdraw-password v-if="withdrawPass" @closeHandle="closeModifyWithdrawPassword"></withdraw-password>
    <bind-card v-if="bindCardFlag" @closeHandle="closeBindCard"></bind-card>
    <Mail v-if="mailFlag" @closeHandle="closeMail"></Mail>
    <change-question v-if="changeQues" @closeHandle="closeChangeQuestion"></change-question>
    <announce-modal v-if="isAnnounceShowed" @close="isAnnounceShowed = false"></announce-modal>
  </div>
</template>

<script>
  import Information from './Team/Information'
  import ModifyPassword from './Personal/ModifyPassword'
  import WithdrawPassword from './Personal/WithdrawPassword'
  import BindCard from './Personal/BindCard'
  import Mail from './Personal/Mail'
  import ChangeQuestion from './Personal/ChangeQuestion'

  import AnnounceModal from '@/components/AnnounceModal'
  import {NOTICE_LIST} from '@/utils/apiUrl'
  import {mapState, mapActions,mapMutations} from 'vuex'
  export default {
    components: {
      Information,
      ModifyPassword,
      WithdrawPassword,
      BindCard,
      Mail,
      ChangeQuestion,
      AnnounceModal
    },
    data() {
      return {
        perfectFlag: false,
        modifyPass: false,
        withdrawPass: false,
        bindCardFlag: false,
        mailFlag: false,
        changeQues: false,
        isAnnounceShowed:false
      }
    },
    computed: {
      ...mapState(['profile','isRefreshingBalance','noticeList']),

    },
    methods: {
      ...mapMutations(['updateNoticeList']),
      ...mapActions(['refreshBalance']),
      perfectInformation() {
        this.perfectFlag = true;
      },
      closeInformation() {
        this.perfectFlag = false;
      },
      modifyPassword() {
        this.modifyPass = true;
      },
      closeModifyPassword() {
        this.modifyPass = false;
      },
      modifyWithdrawPassword() {
        this.withdrawPass = true;
      },
      closeModifyWithdrawPassword() {
        this.withdrawPass = false;
      },
      bindCardHandle() {
        this.bindCardFlag = true;
      },
      closeBindCard() {
        this.bindCardFlag = false;
      },
      closeMail() {
        this.mailFlag = false;
      },
      openMail() {
        this.mailFlag = true;
      },
      changeQuestion() {
        this.changeQues = true;
      },
      closeChangeQuestion() {
        this.changeQues = false;
      }
    },
    async created() {
      if(this.noticeList.length === 0){
        let res =await this.$axios({
          url: NOTICE_LIST,
          method: 'post',
          data: {
            page_idx:1,
            page_size:10
          },
          loading:true
        })
        this.updateNoticeList(res.data.data)
      }
    }
  }
</script>

<style lang="scss">
  .contents.contents-personal {
    min-height: 600px;
    width: 100%;
    background: url(.././../assets/manage/bg-personal.jpg) no-repeat;
    background-size: cover;
  }

  .manage-personal {
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    position: absolute;
    width: 816px;
    margin-left: 30px;
    .personal-l {
      width: 211px;
      background: #fff;
      float: left;
      padding-bottom: 10px;
      height: 260px;
      box-shadow: 0 2px 20px 3px rgba(138, 118, 246, .1);
      margin-top: 32px;
      border-radius: 4px;
      overflow: hidden;
      dl {
        margin: 15px 0;
      }
      dl dt {
        width: 90px;
        height: 90px;
        line-height: 90px;
        text-align: center;
        border-radius: 50%;
        background-image: linear-gradient(90deg, #4b98eb 0, #aeecff 100%);
        color: #fff;
        font-size: 18px;
        margin: 0 auto 10px;
        position: relative;
        font-weight: 700;
        box-shadow: 0 2px 10px 3px rgba(138, 118, 246, .1);
        &:after {
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          top: -2px;
          position: absolute
        }
      }
      dd {
        color: #000;
        text-align: center;
        line-height: 32px;
        font-size: 24px;
      }
      ul li {
        color: #9e9e9e;
        font-size: 14px;
        line-height: 30px;
        padding-left: 18px;
        i {
          display: inline-block;
          width: 15px;
          height: 17px;
          background: url(../../assets/manage/icons.png) no-repeat -210px 0;
          cursor: pointer;
          margin-left: 10px
        }
        span {
          color: #9e9e9e
        }
        strong {
          color: #fc6180
        }
        a {
          color: #7585e5;
          text-decoration: underline;
          float: right;
          padding-right: 16px
        }
      }
    }
    .personal-r {
      width: 580px;
      float: right;
      margin-top: 32px;
      .typeUl li {
        width: 182px;
        float: left;
        height: 92px;
        background: #fff;
        box-shadow: 0 2px 10px 3px rgba(138, 118, 246, .1);
        position: relative;
        overflow: hidden;
        border-radius: 5px;
        margin: 0 16px 20px 0;
        span {
          display: block;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          background-image: linear-gradient(90deg, #53d7fc 0, #2daefd 100%);
          font-size: 12px;
          position: absolute;
          top: -30px;
          left: -30px;
          color: #fff;
          text-indent: 38px;
          line-height: 92px;
        }
        dl {
          padding-top: 18px;
          height: 30px;
          line-height: 30px;
          dt {
            line-height: 20px;
            color: #b3b3b3;
            text-align: right;
            padding: 0 30px 8px 0
          }
          dd {
            color: #000;
            font-size: 18px;
            text-align: right;
            padding-right: 7px;
            i {
              display: inline-block;
              width: 14px;
              height: 14px;
              background: url(../../assets/manage/icons.png) no-repeat -168px -3px;
              cursor: pointer;
              margin-left: 8px;
              &.active {
                transform: rotate(1turn);
                transition: .8s
              }
            }
            strong {
              display: inline-block;
              font-weight: 400;
              em {
                font-size: 15px
              }
            }
          }
        }
        &.active {
          span {
            color: #fff;
            background-image: linear-gradient(90deg, #1557d2 0, #30a3ff 50%)
          }
          dl dd {
            color: #fc6180;
            height: 30px;
            line-height: 30px
          }
        }
        &:nth-child(3n) {
          margin-right: 0
        }
      }
      .btnUl {
        overflow: hidden;
        margin-bottom: 18px;
        li {
          background-image: linear-gradient(to bottom, #70cafe 0, #8a76f6 100%);
          width: 132px;
          height: 46px;
          float: left;
          border-radius: 25px;
          margin-right: 15px;
          i {
            display: block;
            width: 22px;
            height: 22px;
            float: left;
            margin: 12px 8px 0 30px;
            background: url(../../assets/manage/icons.png) no-repeat
          }
          .recharge {
            background-position: -189px -106px
          }
          .withdrawal {
            background-position: -127px -106px
          }
          .transfer {
            background-position: -67px -106px
          }
          span {
            display: block;
            height: 46px;
            line-height: 46px;
            color: #fff;
            font-size: 16px;
            cursor: pointer
          }
          &:hover {
            background-image: linear-gradient(90deg, #fe806c 0, #fc6 100%)
          }
          &:nth-child(4) {
            text-align: center;
            margin-right: 0
          }
        }
      }
    }
    .settingBtn {
      padding-top: 27px;
      line-height: 20px;
      border-top: 1px solid #f5f5f5;
      margin-top: 17px;
      li {
        width: 398px;
        height: 90px;
        background: #fff;
        margin: 0 20px 20px 0;
        float: left;
        border-radius: 3px;
        box-shadow: 0 2px 20px 3px rgba(43, 126, 255, .1);
        span {
          float: left;
          display: block;
          width: 60px;
          height: 60px;
          background: url(../../assets/manage/icons.png) no-repeat;
          border-radius: 50%;
          margin: 15px 15px 0
        }
        .login-password {
          background-position: -172px -30px
        }
        .bind-card {
          background-position: 18px -28px
        }
        .funding-password {
          background-position: 16px -86px
        }
        .station-letter {
          background-position: -45px -28px
        }
        .security-settings {
          background-position: -235px -30px
        }
        .notice {
          background-position: -108px -30px
        }
        dl {
          float: left;
          padding-top: 26px;
          dt {
            font-size: 16px;
            padding-bottom: 8px;
            color: #4a4a4a;
            font-weight: 600;
            em {
              display: inline-block;
              padding-left: 2px;
              color: red;
              font-size: 14px
            }
          }
          dd {
            color: #b9b9b9;
            i {
              font-style: normal;
              color: #fc6180;
              padding-right: 6px
            }
          }
        }
        a {
          float: right;
          padding: 28px 28px 0 0;
          color: #6791e5;
          text-decoration: underline
        }
        &:nth-child(2n) {
          margin-right: 0
        }
      }
    }
  }
</style>