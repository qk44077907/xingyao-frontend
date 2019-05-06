<template>
  <div class="mask-wrap">
    <div class="mail-page">
      <div class="modal-title">查看站内信</div>
      <div class="layer-close" @click="closeMask"></div>
      <div class="message-form">
        <table width="100%" border="0" cellspacing="1" cellpadding="0" class="grayTable">
          <tr>
            <th width="5%"><label>
              <input type="checkbox" class="clear-width border0">全选</label>
            </th>
            <th width="">标题</th>
            <th width="25%">日期</th>
            <th width="10%">操作</th>
          </tr>
          <tr>
            <td colspan="4">您暂时没有短消息</td>
          </tr>
        </table>
        <div class="list_page">
          <div class="pageinfo">总计 0 个记录, 分为 页, 当前第 1 页<span><a>尾页</a></span>
            转至 <input type="text" size="6">页 <input type="button" class="button" value="GO"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      closeMask() {
        this.$emit('closeHandle');
      }
    }
  }
</script>

<style lang="scss">
  .mail-page {
    width: 900px;
    height: 610px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -450px;
    margin-top: -305px;
    background: #fff;
    .message-form {
      padding: 10px 20px 0;
      background: #fff;

      .list_page {
        line-height: 30px;
        margin-top: 20px;
        color: #888;
      }

    }
  }
</style>