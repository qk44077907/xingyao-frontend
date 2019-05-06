<template>
  <div class="announce-modal">
    <div class="announce-box">
      <img src="../assets/manage/bulletinsTitle.png" alt="" class="announce-head">
      <div class="close-btn" @click="closeAnnounce"></div>
      <div class="list-wrap">
        <div class="list-title"><label class="content">公告标题</label><label class="time">发布日期</label></div>
        <ul class="list">
          <li :class="{active:noticeDetail.id === notice.msg_id}" @click="getNoticeDetail(notice.msg_id)" v-for="notice in notices"><label class="content"><p class="content-title">{{notice.title}}</p></label><label class="time">{{notice.create_time}}</label></li>
        </ul>
        <div class="pagination">
          <div class="btn first page" @click="changePage(1)"></div>
          <div class="btn prev page" @click="changePage(currentPage - 1)"></div>
          <div v-for="n in pagination" class="btn" :class="{active:currentPage === n }" @click="changePage(n)">{{n}}
          </div>
          <div class="btn next page" @click="changePage(currentPage+1)"></div>
          <div class="btn last page" @click="changePage(totalPage)"></div>
        </div>
      </div>
      <div class="content-wrap">
        <p class="content-title">{{noticeDetail.title}}</p>
        <img src="../assets/manage/notice-border.png" class="divider">
        <div class="content-detail" v-html="noticeDetail.content"></div>
      </div>


    </div>
  </div>
</template>

<script>
  import {NOTICE_LIST,NOTICE_DETAIL} from '@/utils/apiUrl'
  import {mapState,mapMutations} from 'vuex'

  export default {
    name: "announceModal",
    data(){
      return {
        noticeDetail:{},
        currentPage: this.$store.state.noticePageIdx,
        pageSize: 10,
      }

    },
    computed: {
      ...mapState({
        notices: state => state.noticeList,
        totalNum:state => state.noticeTotalNum,
      }),
      pagination() {
        let pagination = []
        let left = this.currentPage - 2
        let right = this.currentPage + 2
        for (; left <= right; left++) {
          if (left > 0 && left <= this.totalPage) {
            pagination.push(left)
          }
        }
        return pagination
      },
      totalPage() {
        return Math.ceil(this.totalNum / this.pageSize);
      },
      params() {
        return {
          page_idx: this.currentPage,
          page_size: this.pageSize
        }
      }
    },
    watch: {
      params: {
        handler(val, oldVal) {
          this.getNoticeList(val)
        },
      }
    },
    methods: {
      ...mapMutations(['updateNoticeList']),
      changePage(n) {
        if (n > 1 && n <= this.totalPage) {
          this.currentPage = n
        }
      },
      closeAnnounce() {
        this.$emit('close')
      },
      async getNoticeList(params) {
        let res = await this.$axios({
          url: NOTICE_LIST,
          method: 'post',
          data: params,
        })
        this.updateNoticeList(res.data.data)
      },
      async getNoticeDetail(msg_id) {
        this.noticeDetail = {}
        let res = await this.$axios({
          url: NOTICE_DETAIL,
          method: 'post',
          data: {
            msg_id
          },
        })
        this.noticeDetail = res.data.data
      }

    },
    created() {

    },
  }
</script>

<style scoped lang="scss">
  .announce-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    top: 0;
    left: 0;
    .announce-box {
      position: fixed;
      background-color: #fff;
      transition: all .3s;
      overflow: hidden;
      left: 50%;
      top: 50%;
      z-index: 100;
      transform: scale(1, 1) translate(-50%, -50%);

      border-radius: 8px;
      overflow: hidden;
      height: 570px;
      width: 980px;
      .announce-head {
        height: 50px;
        width: 980px;
        display: block;
        margin: 0 !important;
      }
      .close-btn {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 6px;
        top: 6px;
        cursor: pointer;
        text-indent: -9999999;
        background: url(../assets/manage/close-button.png) no-repeat 50%;
      }
      .list-wrap {
        width: 345px;
        background-color: #fffcfc;
        display: inline-block;
        height: 520px;
        line-height: 40px;
        color: #3b476a;
        font-size: 12px;
        border-right: 1px solid #d1e2f3;
        .list-title {
          height: 34px;
          line-height: 34px;
          border-bottom: 1px solid #d1e2f3;
          width: 344px;
          .content {
            width: 198px;
            display: inline-block;
            padding-left: 28px;
            box-sizing: border-box;
            color: #8795a8;
          }
          .time {
            width: 146px;
            display: inline-block;
            color: #8795a8;
            box-sizing: border-box;
          }
        }
        ul {
          height: 440px;
          width: 345px;
          li {
            list-style: none;
            font-style: normal;
            &.active {
              background: -webkit-linear-gradient(left, #2699ff, #40c6e8);
              .content, .time {
                color: #fff;
              }
            }
            .content {
              width: 198px;
              display: inline-block;
              padding-left: 28px;
              box-sizing: border-box;
              cursor: pointer;
              padding-right: 8px;
              .content-title {
                width: 164px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                display: inline-block;
                vertical-align: top;
              }
            }
            .time {
              width: 146px;
              display: inline-block;
              color: #aeaaaa;
              box-sizing: border-box;
              cursor: pointer;
            }
          }
        }
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 12px;
            background-color: #ecf5fb;
            line-height: 24px;
            color: #66b3ff;
            margin-right: 4px;
            margin-left: 4px;
            cursor: pointer;
            &.active {
              background: #66b3ff;
              color: #fff;
            }
            &.page {
              background-image: url(../assets/manage/icon.png);
              background-repeat: no-repeat;
              &.first {
                background-position: 2px -376px;
                transform: rotate(180deg);
              }
              &.prev {
                background-position: 2px -344px;
                transform: rotate(180deg);
                margin-right: 24px;
              }
              &.next {
                background-position: 2px -344px;
                margin-left: 24px;
              }
              &.last {
                background-position: 2px -375px;
              }
            }
          }
        }
      }
      .content-wrap {
        width: 634px;
        background-color: #fff;
        display: inline-block;
        vertical-align: top;
        height: 520px;
        box-shadow: inset 1px 0 12px #e5f1fd;
        .content-title {
          line-height: 55px;
          text-align: center;
          color: #2e6be5;
          font-size: 20px;
          font-weight: 600;
          min-height: 55px;
        }
        .divider {
          height: 1px;
          width: 634px;
        }

        .content-detail {
          display: block;
          margin-left: auto;
          margin-right: auto;
          font-size: 14px;
          color: #485374;
          margin-top: 30px;
          height: 375px;
          overflow-y: auto;
          padding: 0 20px;
        }
      }

    }
  }
</style>