<template>
  <div v-if="show" class="mask-wrap">
    <div class="account-box">
      <div class="modal-title">账变记录</div>
      <div class="layer-close" @click="closeBox"></div>
      <div class="account-info">
        <div class="gy_search">
          <div class="inlineBlock">
            <label>日期：</label>
            <span id="today" style="display:none;">2018-11-11</span>
            <div class="calendar_input_kuang1 input_kuang2">
              <input type="text" value="2018-11-11 00:00:00" name="starttime" id="starttime" class="input_02 team">
              <span class="calendar_icon"></span>
            </div>
            <span class="z">至</span>
            <div class="calendar_input_kuang1 input_kuang2">
              <input type="text" value="2018-11-12 00:00:00" id="endtime" name="endtime" class="input_02 team">
              <span class="calendar_icon"></span>
            </div>
          </div>
          <div class="inlineBlock">
            <label>从</label>
            <select name="ordertype" id="ordertype" class="team">
              <option value="0">所有类型</option>
              <option value="1">充值</option>
              <option value="2">提款</option>
              <option value="3">上下级转账</option>
              <option value="4">活动</option>
              <option value="7">第三方转账</option>
              <option value="8">其他</option>
            </select>
          </div>
          <div class="inlineBlock">
            <select name="status" id="status" class="team">
              <option value="0">所有状态</option>
              <option value="1">成功</option>
              <option value="2">失败</option>
            </select>
          </div>
          <input name="" type="submit" value="查询" class="formCheck">
        </div>
        <table width="100%" border="0" cellspacing="1" cellpadding="0" class="grayTable">
          <tbody><tr>
            <th>时间</th>
            <th>用户名</th>
            <th>账变编号</th>
            <th>类型</th>
            <th>收入</th>
            <th>支出</th>
            <th>余额</th>
            <th>状态</th>
            <th>备注</th>
          </tr>
          <tr>
            <td colspan="9" class="no-records">请选择查询条件之后进行查询</td>
          </tr>
          <tr>
            <td colspan="4">本页合计</td>
            <td>+0.0000</td>
            <td>-0.0000</td>
            <td colspan="3">--</td>
          </tr>
          </tbody></table>
      </div>
      <div class="list_page">
        <span class="page"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: Boolean
    },
    data() {
      return {}
    },
    methods: {
      closeBox() {
        this.$emit('closeBox');
      }
    }
  }
</script>

<style lang="scss">
  .account-box {
    position: absolute;
    width: 1040px;
    height: 580px;
    top: 50%;
    left: 50%;
    margin-top: -290px;
    margin-left: -520px;
    z-index: 1000;
    background-color: #fff;
    transition: all .3s ease 0s;
    overflow: hidden;
    .account-info {
      padding: 10px 20px 0;
      background: #fff;
      .no-records {
        padding: 30px 0 !important;
        text-align: center;
      }
    }
  }
</style>