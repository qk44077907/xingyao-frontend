<template>
  <div v-if="show" class="mask-wrap">
    <div class="bet-box">
      <div class="modal-title">投注记录</div>
      <div class="layer-close" @click="closeBox"></div>
      <div class="bet-info">
        <div class="gy_search">
            <div class="inlineBlock">
              <label>日期：</label>
              <span id="today" style="display:none;">2018-11-11</span>
              <div class="calendar_input_kuang1 input_kuang2">
                <input type="text" value="2018-11-11 02:00:00" name="starttime" id="starttime" class="input_02 team">
                <span class="calendar_icon"></span>
              </div>
              <span class="z">至</span>
              <div class="calendar_input_kuang1 input_kuang2">
                <input type="text" value="2018-11-12 02:00:00" id="endtime" name="endtime" class="input_02 team">
                <span class="calendar_icon"></span>
              </div>
            </div>
            <div class="inlineBlock">
              <select class="team" name="lotteryid" id="lotteryid">
                <option value="0">所有彩种</option>
                <option value="1">重庆时时彩</option>
                <option value="5">山东11选5</option>
                <option value="6">新疆时时彩</option>
                <option value="7">江西11选5</option>
                <option value="8">广东11选5</option>
                <option value="9">北京快乐彩</option>
                <option value="11">福彩3D</option>
                <option value="12">体彩P3</option>
                <option value="13">天津时时彩@@</option>
                <option value="14">河内5分彩</option>
                <option value="15">江苏快3</option>
                <option value="19">河内1分彩</option>
                <option value="20">香港六合彩</option>
                <option value="23">杏耀秒秒彩</option>
                <option value="24">北京pk拾</option>
                <option value="25">急速赛马</option>
                <option value="26">瑞典1分彩</option>
                <option value="27">瑞典2分彩</option>
                <option value="28">腾讯分分彩</option>
                <option value="29">加拿大30秒</option>
                <option value="30">上海11选5</option>
                <option value="31">安徽11选5</option>
                <option value="34">意大利PK10</option>
                <option value="35">加拿大11选5</option>
                <option value="37">加拿大3D</option>
                <option value="38">日本分分彩</option>
                <option value="39">西贡分分彩</option>
                <option value="40">印尼分分彩</option>
                <option value="41">多彩重庆30秒</option>
                <option value="42">多彩腾讯30秒</option>
                <option value="44">安徽快三</option>
                <option value="45">广西快三</option>
                <option value="49">湖北快三</option>
              </select>
            </div>
            <div class="inlineBlock">
              <select name="methodid" id="game_info" style="width:100px;">
                <option value="0">所有玩法</option>
              </select>
            </div>
            <div class="inlineBlock">
              <input name="" type="submit" value="查询" class="formCheck">
            </div>
          </div>
        <table width="100%" border="0" cellspacing="1" cellpadding="0" class="grayTable">
          <tbody>
          <tr>
            <th>用户名</th>
            <th>投注时间</th>
            <th>彩种</th>
            <th>期号</th>
            <th>玩法</th>
            <th>投注内容</th>
            <th>投注金额</th>
            <th>奖金</th>
            <th>开奖号码</th>
            <th>状态</th>
          </tr>
          <tr>
            <td colspan="10" align="center" class="no-records">请选择查询条件之后进行查询</td>
          </tr>
          </tbody>
        </table>
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
  .bet-box {
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
    .bet-info {
      padding: 10px 20px 0;
      background: #fff;
      .no-records {
        padding: 30px 0 !important;
        text-align: center;
      }
    }
  }
</style>