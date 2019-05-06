<template>
  <div class="contents">
    <div class="title-warp">
      <span class="title">彩票报表</span>
    </div>
    <div class="manage-lottery">
      <div class="gy_search">
      <div class="inlineBlock">
        <label>日期：</label>
        <span id="today" style="display:none;">2018-11-10</span>
        <div class="calendar_input_kuang1">
          <input type="text" value="2018-11-10" name="star_date" id="starttime" class="input_02 team">
          <span class="calendar_icon"></span>
        </div>
        <span class="z">至</span>
        <div class="calendar_input_kuang1">
          <input type="text" value="2018-11-10" id="endtime" name="end_date" class="input_02 team">
          <span class="calendar_icon"></span>
        </div>
      </div>
      <div class="inlineBlock">
        <label>用户名：</label>
        <input type="text" value="" name="username" id="username" class="input_user_name inputNospace">
      </div>
      <div class="inlineBlock">
        <div class="search_br"><span data="person">个人</span> <span data="team" class="hover">团队</span></div>
        <input name="" type="submit" value="查询" class="formCheck">
      </div>
    </div>
      <div class="tableTips clearfix">
        <div class="fl tableLevel">
          本级：
          <a
            href="/gameinfo/historyteamlottery?userid=155547&amp;star_date=2018-11-10&amp;end_date=2018-11-10&amp;ischild="
            style="font-weight:bold;">geelao666</a>
        </div>
        <span class="fr">注: 此处账变为彩票账变</span>
      </div>
      <table width="100%" border="0" cellspacing="1" cellpadding="0" class="grayTable">
        <tbody>
        <tr>
          <th><span class="sortBtn1 sort" orderby="username">用户名</span></th>
          <th><span class=" betBtn sort" orderby="sum_deposit">充值</span></th>
          <th><span class=" betBtn sort" orderby="sum_withdraw">提现</span></th>
          <th><span class=" betBtn sort" orderby="sum_prize">投注金额</span></th>
          <th><span class=" betBtn sort" orderby="sum_bonus">中奖金额</span></th>
          <th><span class=" betBtn sort" orderby="sum_point">返点金额</span></th>
          <th><span class=" betBtn sort" orderby="sum_activity">活动奖金</span></th>
          <th><span class=" betBtn sort" orderby="profit_loss">盈亏金额</span></th>
          <th>操作</th>
        </tr>
        <tr>
          <td colspan="10" class="no-records">请选择查询条件之后进行查询</td>
        </tr>
        <tr class="tr_total">
          <td>本页合计</td>
          <td>--</td>
          <td>--</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td>--</td>
        </tr>
        <tr id="tr_all" class="tr_total">
          <td>总合计</td>
          <td>--</td>
          <td>--</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td>0.000</td>
          <td>--</td>
        </tr>
        </tbody>
      </table>
      <div class="list_page">
        <div class="pageinfo"></div>
      </div>
      <div class="ylfh_warm-prompt">
        <h6>温馨提示:</h6>
        <p>彩票统计时间为：02:00:00--02:00:00</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  .manage-lottery {
    padding: 10px 20px 0;
    background: #fff;
  }
</style>