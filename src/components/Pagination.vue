<template>
  <div class="pagination">
    <div class="pageinfo">
      总计 {{totalNum}} 个记录, 分为 {{totalPage}} 页, 当前第 {{currentPage}} 页
      <div class="page-btn" v-if="currentPage !== 1" @click="changePage(1)">首页</div>
      <div class="page-btn" v-if="currentPage !== 1" @click="changePage(currentPage - 1)">上页</div>
      <span class="page-items">
          <span
              v-for="n in pagination"
              @click="jumpByClick(n)"
              class="page-item"
              :class="{active:currentPage === n}">{{n}}</span>
        </span>
      <div class="page-btn" v-if="currentPage !== totalPage" @click="changePage(currentPage+1)">下页</div>
      <div class="page-btn" v-if="currentPage !== totalPage" @click="changePage(totalPage)">尾页</div>
      转至
      <input type="number" id="jump" size="6" v-model.number="jumpPage">
      页
      <input type="button" class="confirm-jump" @click="changePage(jumpPage)" value="GO">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['currentPage', 'totalPage', 'totalNum'],
    inject: ['changePage'],
    data() {
      return {
        jumpPage: 1
      }
    },
    computed: {
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
      }
    },
  }
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    color: #888;

    .pageinfo{
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #bdc9e0;
      color: #bdc9e0;
      text-align: center;
      padding-bottom: 20px;
    }
    .page-btn{
      flex: none;
      display: inline-table;
      margin:0 3px;
      background: #e6ebf5;
      color: #3b476a;
      font-size: 14px;
      line-height: 26px;
      height: 26px;
      border-radius: 100px;
      padding: 0 9px;
      cursor: pointer;
      &:hover{
        background: #a5c5fc;
        color: #fff;
      }
    }
    .page-items{
      display: flex;
      align-items: center;
    }
    .page-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin:0 3px;
      background: #e6ebf5;
      color: #3b476a;
      font-size: 14px;
      height: 26px;
      width: 26px;
      border-radius: 50%;
      cursor: pointer;
      &.active, &:hover {
        background: #a5c5fc;
        color: #fff;
        font-weight: normal;
      }

    }
    #jump{
      border-radius: 4px;
      border: 1px solid #dbdbdb;
      height: 25px;
      width: 40px;
      margin: 0 5px;
      text-align: center;
      color: #333;
    }
    .confirm-jump{
      padding: 5px 12px;
      cursor: pointer;
      margin-left: 5px;
      background: #a5c5fc;
      color: #fff;
      font-size: 15px;
      border: 0;
      border-radius: 4px;
    }
  }

</style>