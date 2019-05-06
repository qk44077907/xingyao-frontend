<template>
  <div class="contents">
    <div class="title-warp">
      <span class="title">真人电子体育</span>
    </div>
    <div class="manage-sports">
      <div class="gy_search">
        <div class="inlineBlock">
          <label>日期：</label>
          <span id="today" style="display:none;">2018-11-10</span>
          <div class="calendar_input_kuang1">
            <input type="text" value="2018-11-10" name="starttime" id="starttime" class="input_02 team">
            <span class="calendar_icon"></span>
          </div>
          <span class="z">至</span>
          <div class="calendar_input_kuang1">
            <input type="text" value="2018-11-10" id="endtime" name="endtime" class="input_02 team">
            <span class="calendar_icon"></span>
          </div>
        </div>
        <div class="inlineBlock">
          <label>用户名：</label>
          <input type="text" value="" name="username" id="username" class="input_user_name inputNospace">
        </div>
        <div class="inlineBlock">
          <select name="cid" id="cid">
            <option value="0" selected="" id="gamefrom_0">所有平台</option>
            <option value="1" id="gamefrom_1">PT娱乐</option>
            <option value="2" id="gamefrom_2">BBIN娱乐</option>
            <option value="4" id="gamefrom_4">AG娱乐</option>
            <option value="3" id="gamefrom_3">沙巴体育</option>
            <option value="100" id="gamefrom_100">真人电子</option>
          </select>
        </div>
        <div class="inlineBlock">
          <input name="" type="submit" value="查询" class="formCheck">
        </div>
      </div>
      <div class="tableTips clearfix">
        <div class="fl tableLevel">
          本级:
          <a href="?userid=155547&amp;starttime=2018-11-10&amp;endtime=2018-11-10&amp;cid=0" style="font-weight:bold">geelao666</a>
        </div>
        <span class="fr">游戏平台: <b style="font-weight: normal; color: #f00">
        所有平台</b></span>
      </div>
      <table width="100%" border="0" cellspacing="1" cellpadding="0" class="grayTable">
        <tbody>
        <tr>
          <th><span class=" sort" orderby="username">用户名</span></th>
          <th><span class=" sort" orderby="sbet">总投注</span></th>
          <th><span class=" sort" orderby="seffective_bet">有效投注</span></th>
          <th><span class=" sort" orderby="sprize">中奖金额</span></th>
          <th><span class=" sort" orderby="sprofit_loss">盈亏金额</span></th>
          <th><span class=" sort" orderby="fee">渠道费</span></th>
          <th><span class=" sort" orderby="settlement">总结算</span></th>
          <th>操作</th>
        </tr>
        <tr>
          <td colspan="8" class="no-records">请选择查询条件之后进行查询</td>
        </tr>
        <tr class="tr_total">
          <td>本页合计</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td><span>0.0000</span></td>
          <td>0.0000</td>
          <td><span>0.0000</span></td>
          <td></td>
        </tr>
        <tr id="tr_all" class="tr_total">
          <td>团队合计</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td>0.0000</td>
          <td><span>0.0000</span></td>
          <td>0.0000</td>
          <td><span>0.0000</span></td>
          <td></td>
        </tr>
        </tbody>
      </table>
      <div class="list_page">
        <div class="pageinfo"></div>
      </div>
      <div class="ylfh_warm-prompt">

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
  .manage-sports {
    padding: 10px 20px 0;
    background: #fff;
  }
</style>