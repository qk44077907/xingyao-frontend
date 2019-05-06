<template>
  <div class="contents">
    <div class="title-warp">
      <span class="title">团队管理</span>
    </div>
    <div class="manage-team">
      <div id="searchBox" class="re" style="padding-top: 0;">
        <table width="100%" border="0" cellspacing="1" cellpadding="0" class="formTable">
          <tr>
            <td>
              <div class="search-container">
                <div class="gy_search">
                  <div class="inlineBlock">
                    <label>用户名：</label>
                    <input type="text" v-model="searchText" class="input_user_name inputNospace" id="username" value="">
                  </div>
                  <input name="" type="submit" value="查询" class="formCheck" @click="search">
                </div>
                <div class="link-box">
                  <a href="javascript:;" class="registration" @click="openRegisterBox"></a>
                  <a href="javascript:;" class="promotion" @click="openPromotionBox"></a>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="tableTips clearfix">
        <div class="fl tableLevel">
          本级：
          <a>{{profile.username}}</a>

        </div>
        <h3 style="">注：可点击标题修改排序</h3>
      </div>
      <table width="100%" border="0" cellspacing="1" cellpadding="0" class="grayTable">
        <tr>
          <th v-for="(item,index) in sortList" :key="index">
            <span :class="{'sort': true, 'jt_down': !sortType&&item.active, 'jt_up': sortType&&item.active}"
                  @click="sortByItem(item.sort)">{{item.name}}</span>
          </th>
          <th width="">操作</th>
        </tr>
        <tr v-for="(user,index) in userList" :key="index">
          <td><a class="team-user-name" @click="changeUser(user.userid)">{{user.username}}</a></td>
          <td>{{user.rebate}}</td>
          <td>{{user.children_num}}</td>
          <td>{{user.balance}}</td>
          <td>{{user.team_balance}}</td>
          <td>{{user.register_time}}</td>
          <td>{{user.last_login_time}}</td>
          <td class="handle">
            <a v-if="profile.username !== user.username" href="javascript:;" @click="openRebateBox(user)"><strong>返点设定</strong></a>
            <a href="javascript:;" class="postMessage" @click="openBetBox"><strong>投注记录</strong></a>
            <a href="javascript:;" class="postMessage" @click="openAccountBox"><strong>账变记录</strong></a>
          </td>
        </tr>
      </table>
      <Pagination :totalNum="totalNum" :totalPage="totalPage" :currentPage="currentPage"></Pagination>
    </div>
    <Register v-if="registerFlag" @closeBox="closeRegisterBox"></Register>
    <Promotion v-if="promotionFlag" @closeBox="closePromotionBox"></Promotion>
    <Bet v-if="betFlag" @closeBox="closeBetBox"></Bet>
    <Account v-if="accountFlag" @closeBox="closeAccountBox"></Account>
    <Rebate v-if="rebateFlag" @closeBox="closeRebateBox" :user="rebateUser"></Rebate>
  </div>
</template>

<script>
  import Register from './Team/Register'
  import Promotion from './Team/Promotion'
  import Bet from './Team/Bet'
  import Account from './Team/Account'
  import Rebate from './Team/Rebate'
  import Pagination from '@/components/Pagination'
  import {mapState} from 'vuex'
  import {TEAM_INFO} from '../../utils/apiUrl'

  export default {
    components: {Register, Promotion, Bet, Account, Rebate,Pagination},
    data() {
      return {
        registerFlag: false,
        promotionFlag: false,
        betFlag: false,
        accountFlag: false,
        rebateFlag: false,
        rebateUser: {},
        userList: [],
        sortList: [
          {name: '用户名', active: false, sort: 'username'},
          {name: '返点', active: false, sort: 'rebate'},
          {name: '人数', active: true, sort: 'children_num'},
          {name: '个人余额', active: false, sort: 'balance'},
          {name: '团队余额', active: false, sort: 'team_balance'},
          {name: '注册日期', active: false, sort: 'register_time'},
          {name: '最后登录', active: false, sort: 'last_login_time'},
        ],
        sortType: false,    // 1-up 0-down
        currentUserid: this.$store.state.profile.userid,
        currentPage: 1,
        pageSize:10,
        sortName: 'children_num',
        totalNum: 1,
        currentPageBackup: '',
        searchText: '',

      }
    },
    computed: {
      ...mapState(['profile']),
      params() {
        return {
           uid: this.currentUserid,
           page_idx: this.currentPage,
           order_type: !this.sortType ? 'desc' : 'asc',
           sort_name: this.sortName,
           page_size: this.pageSize,
        }
      },
      totalPage() {
        return Math.ceil(this.totalNum / this.pageSize);
      }
    },
    watch: {
      params: {
        handler(val, oldVal) {
          this.getTeam(val)
        },
        immediate: true
      },
    },
    provide() {
      return {
        changePage: this.changePage
      }
    },
    methods: {
      changeUser(userid) {
        this.currentUserid = userid
      },
      changePage(n) {
        this.currentPage = n
      },
      async getTeam(params) {
        let result = await this.$axios({
          url: TEAM_INFO,
          method: 'POST',
          data: params,
          loading: true
        });
        /*result.data.data.list.forEach((item) => {
          let idx = item.register_time.indexOf(' ');
          if (idx > -1) {
            item.register_time = item.register_time.substring(0, idx);
          }
          idx = item.last_login_time.indexOf(' ');
          if (idx > -1) {
            item.last_login_time = item.last_login_time.substring(0, idx);
          }
        });*/
        this.userList = result.data.data.list;
        this.totalNum = result.data.data.total;

      },
      search() {
        if (this.searchText === '') {
          return
        }
        let params = {
          ...this.params,
          search: this.searchText
        }
        this.getTeam(params)
      },
      jumpByInput() {
        if (!/^-?\d+$/.test(this.currentPageBackup)) {
          alert('输入整数的页码');
          return;
        }
        if (this.currentPageBackup <= 0) {
          alert('输入正整数的页码');
          return;
        }
        if (this.currentPageBackup > this.totalPage) {
          alert('输入页码超出尾页页码');
          return;
        }
        this.currentPage = this.currentPageBackup;

      },
      jumpByClick(item) {
        this.currentPage = item;
      },
      sortByItem(val) {
        this.sortList.forEach((item) => {
          if (item.sort == val) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        this.currentPage = 1;
        if (this.sortName == val) {
          this.sortType = !this.sortType;
        } else {
          this.sortType = true;
        }
        this.sortName = val;
      },
      openRegisterBox() {
        this.registerFlag = true;
      },
      closeRegisterBox() {
        this.registerFlag = false;
      },
      closePromotionBox() {
        this.promotionFlag = false;
      },
      openPromotionBox() {
        this.promotionFlag = true;
      },
      closeBetBox() {
        this.betFlag = false;
      },
      openBetBox() {
        this.betFlag = true;
      },
      closeAccountBox() {
        this.accountFlag = false;
      },
      openAccountBox() {
        this.accountFlag = true;
      },
      closeRebateBox() {
        this.rebateFlag = false;
      },
      openRebateBox(user) {
        this.rebateUser = user
        this.rebateFlag = true;
      }
    }
  }
</script>

<style lang="scss">
  .manage-team {
    background: #fff;
    padding: 10px 20px 0;
    #searchBox {
      padding: 10px 0 10px 0;
      font-size: 14px;
      color: #888;
      margin-bottom: 15px;
      border-radius: 8px;
      border-bottom: 1px solid #f2f2f2;
      position: relative;
      .search-container {
        float: right;
        width: 100%;
        .input_user_name {
          border: 1px solid #a5c5fc;
        }
      }
      .link-box {
        float: right;
        a {
          display: inline-block;
          width: 126px;
          height: 47px;
          background: url(../../assets/manage/zh_icon_sprites.png) no-repeat;
        }
        .registration {
          background-position: 0 -50px;
        }
        .promotion {
          background-position: 0 1px;
        }
      }
      .gy_search {
        background: url(../../assets/manage/search_icon.png) no-repeat 0 center;
        padding: 10px 0 10px 60px;
        font-size: 14px;
        color: #6791e6;
        margin: 0 auto 10px;
        border-radius: 6px;
        background-position-y: 19px;
        display: inline-block;
        .inlineBlock {
          display: inline-block;
          margin: 2px 8px 2px 0;
          label, span {
            display: inline-block;
          }
          .input_user_name {
            display: inline-block;
            padding: 0 0 0 5px;
            margin-right: 5px;
            border: 1px solid #a5c5fc;
            height: 30px;
            line-height: 30px;
            font-size: 13px;
            color: #454ec5;
            font-family: "Microsoft Yahei";
            border-radius: 3px;
            box-shadow: 2px 2px 1px #ebe8ef inset;
          }
          #username {
            width: 100px;
          }
        }
        .formCheck {
          display: inline-block;
          border-radius: 15px;
          cursor: pointer;
          font-size: 14px !important;
          color: #fff;
          background: url(../../assets/manage/zh_icon_sprites.png) -315px -58px no-repeat;
          width: 82px;
          height: 35px;
          line-height: 32px;
          padding: 0;
          font-size: 16px;
          color: #fff;
          font-family: Microsoft Yahei;
          margin: 0;
          border: 0;
          cursor: pointer;
          letter-spacing: 5px;
          vertical-align: middle;
          text-indent: -9999px;
        }
      }
      span.image {
        background: url(../../assets/manage/calendar_icon.png) no-repeat;
        display: inline-block;
        width: 15px;
        height: 17px;
        vertical-align: middle;
        cursor: pointer;
        margin-left: 5px;
      }
    }
    .tableTips {
      margin-bottom: 8px;
      font-size: 13px;
      color: #aaa;
      a {
        font-weight: bold;
      }
      h3 {
        color: #ff6b71;
        font-size: 12px;
        margin-bottom: 10px;
        font-weight: normal;
        float: right;
      }
    }
    .clearfix:after {
      display: block;
      content: "clear";
      height: 0;
      clear: both;
      overflow: hidden;
      visibility: hidden;
    }
    a {
      text-decoration: none;
      color: #5c93fd;
    }
    .grayTable {
      background: #fff;
      border-top: 1px solid #edecf6;
      border-left: 1px solid #edecf6;
      border-collapse: collapse;
      .team-user-name{
        cursor: pointer;
      }
      tr {
        background: #fff;
        &:nth-child(odd) {
          background-color: #fbfbfb
        }
        &:hover {
          background-color: #f6f6f6
        }
      }
      th {
        border-right: 1px solid #edecf6;
        border-bottom: 1px solid #edecf6;
        font-weight: bold;
        background: #f0f3fb;
        color: #3e3e3e;
        text-align: center;
        padding: 8px 0;
        font-size: 13px;
        .jt_down, .jt_up {
          display: inline-block;
          padding-right: 13px;
          height: 15px;
          color: #ff6b71;
          background: url(../../assets/manage/table_jt_down_zh.png) right center no-repeat;
        }
        .jt_up {
          background-image: url(../../assets/manage/table_jt_up_zh.png);
        }
        span {
          cursor: pointer;
        }
      }
      td {
        border-right: 1px solid #edecf6;
        border-bottom: 1px solid #edecf6;
        text-align: center;
        line-height: 24px;
        color: #3b476a;
        padding: 8px 5px;
        font-size: 12px;
        .noCheck {
          color: #ff0000;
        }
        .Check {
          color: #bbb;
          font-size: 12px;
          background-color: #f3f3f3;
          padding: 0px 10px;
          position: absolute;
          right: 10px;
          width: 50px;
        }
        .fandianinput {
          text-align: right;
          vertical-align: 1px;
          color: #ff0000;
        }
        > a {
          white-space: nowrap;
        }
      }
      input {
        vertical-align: middle;
        padding: 8px 3px;
        border: 1px solid #bbb;
        font-size: 14px;
      }
      .red {
        color: #e2420a;
      }
      .handle a {
        margin: 0 1px;
      }
    }
  }

  .mask-wrap {
    .modal-title {
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      background: linear-gradient(to right, #71A4FF, #7BDDFC);
    }
    .box-info {
      padding: 10px 20px 0;
      background: #fff;
    }
  }


</style>