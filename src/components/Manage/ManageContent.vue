<template>
  <div :class="personal?'report-container personal':'report-container'">
    <!-- 左侧列表 -->
    <div class="menus">
      <ul>
        <li>
          <router-link to="/manage/team" class="team ">
            <i></i>
            <span>管理中心</span>
          </router-link>
          <router-link to="/manage/team" :class="activePath=='/manage/team'?'active childrenMenu':'childrenMenu'">
            <i></i>
            <span>团队管理</span>
          </router-link>
        </li>
        <li>
          <router-link to="/manage/personal" :class="activePath=='/manage/personal'?'active personal':'personal'">
            <i></i>
            <span>个人管理</span>
          </router-link>
        </li>
        <li>
          <router-link to="/manage/lottery" class="reports">
            <i></i>
            <span>报表管理</span>
          </router-link>
          <router-link to="/manage/lottery" :class="activePath=='/manage/lottery'?'active childrenMenu':'childrenMenu'">
            <i></i>
            <span>彩票报表</span>
          </router-link>
          <router-link to="/manage/sports" :class="activePath=='/manage/sports'?'active childrenMenu':'childrenMenu'">
            <i></i>
            <span>真人电子体育</span>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activePath: '',
        personal: false
      }
    },
    mounted() {
      this.activePath = this.$route.path;

    },
    watch: {
      '$route'(from, to) {
        this.activePath = this.$route.path;
        if (this.$route.path.indexOf('personal') > -1) {
          this.personal = true;
        } else {
          this.personal = false;
        }
      }
    }
  }
</script>

<style lang="scss">
  .report-container {
    width: 1280px;
    min-height: 800px;
    background-color: #fff;
    box-shadow: 1px 1px 15px rgba(0, 0, 0, .1);
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    border-radius: 10px;
    overflow: hidden;
    color: #fff;
    display: flex;
    flex-direction: row;
    .menus {
      width: 204px;
      background: linear-gradient(to bottom, #5b90f2, #5b90f2, #8b76f6);
      font-size: 18px;
      display: inline-block;
      vertical-align: top;
      padding-bottom: 1000px;
      margin-bottom: -1000px;
      ul {
        li {
          cursor: pointer;
          border-bottom: 1px solid #2160ce;
          border-top: 1px solid #7aa0fd;
          &:last-child {
            border-bottom: 0 solid #2160ce
          }
          &:first-child {
            border-top: 0 solid #7aa0fd
          }
          a {
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 15px;
            color: #fff;
            padding: 0 0 0 20px;
            position: relative;
            overflow: hidden;
            i {
              margin-top: 18px;
              height: 20px;
              width: 20px;
              margin-right: 8px
            }
            i, span {
              display: inline-block;
              vertical-align: top
            }
            &.team i {
              background: url(../../assets/manage/sideMenuIcon.png) no-repeat 0 0
            }
            &.personal i {
              background: url(../../assets/manage/sideMenuIcon.png) no-repeat 0 -21px
            }
            &.reports i {
              margin-top: 16px;
              background: url(../../assets/manage/sideMenuIcon.png) no-repeat 0 -43px
            }
            &.active, &:hover {
              box-shadow: inset 0 0 5px 1px hsla(0, 0%, 100%, .5);
              background: linear-gradient(to bottom, #73cfff 0, #40c6e8 100%);
              &:after {
                content: "";
                position: absolute;
                right: 10px;
                top: -20px;
                width: 100px;
                height: 20px;
                border-radius: 100%;
                box-shadow: 0 5px 15px 0 hsla(0, 0%, 100%, .8)
              }
            }
          }
        }
      }
    }
    .contents {
      background-color: #fff;
      width: 100%;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: top;
      position: relative;
      color: #000;
      .title-warp {
        margin: 5px 20px 0;
        border-bottom: 1px solid #e1e8f5;
        .title {
          line-height: 60px;
          font-size: 24px;
          color: #5c93fd;
          font-weight: 600;
          display: inline-block
        }
      }
      .list_page {
        line-height: 30px;
        margin-top: 20px;
        color: #888;
        .pageinfo {
          font-size: 12px;
          color: #bdc9e0;
          text-align: center;
          padding-bottom: 20px;
          span {
            display: inline-block;
            height: 24px;
          }
          a {
            display: inline-table;
            margin-left: 3px;
            background: #e6ebf5;
            color: #3b476a;
            font-size: 14px;
            line-height: 26px;
            padding: 0 9px;
            height: 26px;
            border-radius: 100px;
            &:hover {
              background: #a5c5fc;
              color: #fff;
            }
          }
          strong {
            display: inline-table;
            margin-left: 3px;
            background: #a5c5fc;
            color: #fff;
            font-size: 14px;
            line-height: 26px;
            width: 26px;
            height: 26px;
            font-weight: normal;
            border-radius: 100px;
            text-align: center;
            cursor: pointer;
          }
          #iGotoPage {
            border-radius: 4px;
            border: 1px solid #dbdbdb;
            height: 25px;
            width: 40px;
            margin: 0 5px;
            text-align: center;
            color: #333;
          }
          .button {
            padding: 5px 12px;
            cursor: pointer;
            margin-left: 5px;
            background: #a5c5fc;
            color: #fff;
            font-size: 15px;
            border: 0;
            border-radius: 4px;
          }
          .last-two {
            width: 45px;
            border-radius: 25px;
          }
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
        select {
          padding: 0 0 0 5px;
          border: 1px solid #bbb;
          height: 34px;
          line-height: 34px;
          font-size: 14px;
          color: #666;
          font-family: Microsoft Yahei;
          min-width: 71px
        }
        .inlineBlock {
          display: inline-block;
          margin: 2px 8px 2px 0;
          label, span {
            display: inline-block;
          }
          .calendar_input_kuang1 {
            display: inline-block;
            width: 112px;
            input {
              width: 90px;
            }
          }
          .z {
            padding: 0 5px;
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
          #gametype {
            width: 80px;
            margin-right: 5px;
          }
          #username {
            width: 100px;
          }
          .select_text {
            height: 32px;
            line-height: 32px;
          }
          select {
            border-radius: 3px;
            box-shadow: 2px 2px 2px rgba(120, 180, 250, 0.15) inset;
            border-color: #a5c5fc;
            color: #7d8fb3;
            font-size: 12px;
          }
          .input_kuang2 {
            width: 155px;
            input {
              width: 125px;
            }
          }
          .search_br {
            display: inline-block;
            height: auto;
            margin: 0 10px;
            text-align: center;
            color: #666;
            span {
              color: #B3B3B3;
              height: 30px;
              line-height: 30px;
              display: inline-block;
              padding: 0 15px;
              font-size: 12px;
              border: 1px solid #B3B3B3;
              cursor: default;
              border-radius: 20px;
              cursor: pointer;
              margin-left: 5px;
              &.hover {
                color: #fc7c23;
                border: 1px solid #fc7c23;
              }
            }
            .radio_person {
              display: none;
            }
            .radio_team {
              display: none;
            }
          }
        }
        .formCheck {
          display: inline-block;
          margin: 0;
          border-radius: 15px;
          height: 32px;
          line-height: 32px;
          border: 0;
          cursor: pointer;
          color: #fff;
          text-align: center;
          width: 80px;
          background-color: #ff632c;
          font-size: 14px !important;
          background: linear-gradient(to bottom, #ffcc66 0%, #fe7f6d 100%);
        }
        .calendar_input_kuang1 {
          position: relative;
          border: 1px solid #a5c5fc;
          background: #fff;
          width: 180px;
          height: 30px;
          line-height: 30px;
          box-shadow: 2px 2px 2px rgba(120, 180, 250, 0.15) inset;
          border-radius: 3px;
          color: #bbb;
          font-family: 'Microsoft Yahei';
          input {
            border: 0;
            background: none;
            height: 30px;
            line-height: 30px;
            width: 164px;
            color: #7d8fb3;
            font-family: 'Microsoft Yahei';
            font-size: 12px;
            padding: 0 8px;
          }
        }
        .calendar_icon {
          position: absolute;
          top: 6px;
          right: 7px;
          width: 15px;
          height: 17px;
          display: block;
          background: url(../../assets/manage/calendar_icon.png) no-repeat;
          cursor: pointer;
        }
      }
      .tableTips {
        margin-bottom: 8px;
        font-size: 13px;
        color: #aaa;
        a {
          color: #5c93fd;
        }
      }
      .grayTable {
        background: #fff;
        border-top: 1px solid #edecf6;
        border-left: 1px solid #edecf6;
        border-collapse: collapse;
        tr {
          background: #fff;
          &:nth-child(odd) {
            background-color: #fbfbfb
          }
          &:hover {
            background-color: #f6f6f6
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
        .green {
          color: #2fab12;
        }
        .blue {
          color: #0b7bc3;
        }
        .orange {
          color: #ff6600;
        }
        .handle a {
          margin: 0 1px;
        }
      }
      .ylfh_warm-prompt {
        margin: 10px 0 0 0;
        padding: 20px 0 10px 0;
        border-top: 1px solid #e5e5e5;
        h6 {
          font-size: 15px;
          font-weight: bold;
          color: #6791e6;
          margin-bottom: 6px;
        }
        p {
          font-size: 13px;
          color: #7d8fb3;
          line-height: 30px;
          margin-left: 10px
        }
      }
      .open-account {
        width: 70%;
        margin: 0 auto;
        padding: 40px 0 0;
        li {
          font-size: 16px;
          color: #666;
          margin-bottom: 10px;
          &.submit-zone {
            text-align: center;
            margin-top: 40px;
            .disabled {
              background: #e6e6e6;
              color: #999;
            }
            button {
              width: 90px;
              height: 35px;
              line-height: 33px;
              font-size: 15px;
              color: #fff;
              padding: 0 !important;
              font-family: Microsoft Yahei;
              margin: 0 10px;
              border: 0 !important;
              background: linear-gradient(to bottom, #71c8fb, #8b76f6);
              border-radius: 4px;
              cursor: pointer;
              letter-spacing: 3px;
              &:nth-child(1) {
                color: #353434;
                border: 1px solid #d8d8d8 !important;
                background: #fff;
              }
              &.gray {
                background: #e6e6e6;
                color: #999;
              }
            }
          }
          p {
            padding-left: 95px;
            margin: 5px 0 20px;
          }
          i {
            font-style: normal;
          }
          .hint_error {
            color: #c00;
          }
          .hint_correct {
            color: #19ac68;
          }
          span {
            display: inline-block;
            font-size: 14px;
            color: #6f96f3
          }
        }
        label {
          display: inline-block;
          width: 90px;
          text-align: left;
        }
        input {
          width: 70%;
          height: 35px;
          vertical-align: middle;
          border: 1px solid #d6cff4;
          font-size: 14px;
          padding: 0 5px;
          color: #666;
          -webkit-border-radius: 3px;
          border-radius: 3px;
          font-family: 'Microsoft Yahei';
        }
        .text_hint {
          color: #ff632c;
          font-size: 12px;
          .hint_correct {
            color: #19ac68
          }
        }
        .number {
          font-size: 12px;
          color: #bea7dd;
          margin-bottom: 70px;
          .left-num {
            float: left;
          }
          .right-num {
            float: right;
          }
        }
        .info {
          display: inline-block;
          width: 270px;
          height: 35px;
          line-height: 35px;
          background: #f9f9f9;
          margin-bottom: 20px;
          padding: 0 10px;
        }
      }
    }
    .mask-wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .6);
      z-index: 999;
      .layer-close {
        position: absolute;
        width: 30px;
        height: 30px;
        top: 6px;
        right: 6px;
        cursor: pointer;
        background: url(../../assets/manage/close-button.png) 50% center no-repeat;
      }
    }
  }
</style>