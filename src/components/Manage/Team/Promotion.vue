<template>
  <div class="mask-wrap">
    <div class="promotion-box">
      <div class="modal-title">推广链接</div>
      <div class="layer-close" @click="closeBox"></div>
      <div class="ex-info">
        <div class="user-marketing">
          <ul>
            <li>
              <label><em class="red">*</em>返点：</label>
              <select name="point" class="select_text" v-model="selectedRebate">
                <option v-for="option in rebateOptions" :value="option">{{option}}</option>
              </select> %
            </li>
            <li style="color: #aaa; font-size: 14px; display: none;">
              <label>QQ：</label>
              <input type="text" maxlength="12" placeholder="账号一" value="" style="color: #999">
              <input type="text" maxlength="12" placeholder="账号二" value="" style="color: #999">
              <p class="tip">选填，显示在推广注册页，便于用户联系您</p>
            </li>
            <li style="color: #aaa; font-size: 14px; display: none;">
              <label>邮箱：</label>
              <input type="text" placeholder="账号一" value="">
              <input type="text" placeholder="账号二" value="">
              <p class="tip">选填，显示在推广注册页，便于用户联系您</p>
            </li>
            <li class="submit-zone">
              <a class="submit" @click="setInviteRebate">保存更新</a>
            </li>
          </ul>
        </div>
        <div class="promotion-link">
          <div class="pm-con">
            <span><em class="icon-dot"></em>以下为您的推广链接：</span>
            <span class="btn_details">返点详情&gt;&gt;
              <div class="tz_details_shot">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                  <tr>
                    <th colspan="3">时时彩返点</th>
                  </tr>
                  <tr>
                    <td>
                      <div class="fdxq_td">重庆时时彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">新疆时时彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">福彩3D<i class="w_2">7.7%</i></div>
                      <div class="fdxq_td">体彩P3<i class="w_2">7.7%</i></div>
                      <div class="fdxq_td">天津时时彩@@<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">河内5分彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">江苏快3<i class="w_2">11.7%</i></div>
                      <div class="fdxq_td">河内1分彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">香港六合彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">杏耀秒秒彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">北京pk拾<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">急速赛马<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">瑞典1分彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">瑞典2分彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">腾讯分分彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">加拿大30秒<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">意大利PK10<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">加拿大3D<i class="w_2">7.7%</i></div>
                      <div class="fdxq_td">日本分分彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">西贡分分彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">印尼分分彩<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">多彩重庆30秒<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">多彩腾讯30秒<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">安徽快三<i class="w_2">11.7%</i></div>
                      <div class="fdxq_td">广西快三<i class="w_2">11.7%</i></div>
                      <div class="fdxq_td">湖北快三<i class="w_2">11.7%</i></div>
                    </td>
                  </tr>
                  <tr>
                    <th colspan="3">11选5返点</th>
                  </tr>
                  <tr>
                    <td>
                      <div class="fdxq_td">山东11选5<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">江西11选5<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">广东11选5<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">上海11选5<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">安徽11选5<i class="w_2">4.2%</i></div>
                      <div class="fdxq_td">加拿大11选5<i class="w_2">4.2%</i></div>
                    </td>
                  </tr>
                  <tr>
                    <th colspan="3">快乐彩返点</th>
                  </tr>
                  <tr>
                    <td>
                      <div class="fdxq_td">北京快乐彩<i class="w_2">6.7%</i></div>
                    </td>
                  </tr>
                </tbody>
              </table>
                <span class="tz_icon_sj"></span>
              </div>
			      </span>
            <div class="popularize_list">
              <ul id="popularize_list_ul">
                <li>
                  <span>  【彩票游戏】链接：</span>
                  <select name="" class="zeroclip-copy" v-model="selectedUrl">
                    <option :value="url" v-for="url in urls">{{url}}</option>
                  </select>
                  <span id="clipboard-txt-0" class="copy-txt-new">szmalasong.com/s1/rvjeg</span>
                  <button id="btn" type="button" data-clipboard-text="zxr2vip.com/s1/rvjeg" class="copy_btn_b">复制
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <tip-box :show="successFlag" @confirm="closeOperation">
          <div slot="msginfo" class="detail">操作成功</div>
        </tip-box>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {SET_LINK_REBATE} from "../../../utils/apiUrl";
  import TipBox from '../../TipBox'
  import numeral from 'numeral'

  export default {
    components: {TipBox},
    props: {
      show: Boolean
    },
    data() {
      return {
        selectedRebate: numeral(this.$store.state.profile.sub_rebate).format('0.0'),
        selectedUrl: this.$store.state.profile.invite_urls[0],
        successFlag: false
      }
    },
    computed: {
      ...mapState({
        rebate: state => state.profile.rebate,
        urls: state => state.profile.invite_urls
      }),

      rebateOptions() {
        let integerRebate = 10 * this.rebate
        let result = []
        for (; integerRebate >= 0; integerRebate--) {
          result.push((integerRebate / 10).toFixed(1))
        }
        return result
      },
    },
    methods: {
      ...mapActions(['getProfile']),
      closeBox() {
        this.$emit('closeBox');
      },
      setInviteRebate() {
        this.$axios({
          url: SET_LINK_REBATE,
          method: 'post',
          loading: true,
          data: {
            point: this.selectedRebate,
          },
        }).then((res) => {
          this.getProfile({isForce: true});
          this.successFlag = true;
        })
      },
      closeOperation() {
        this.successFlag = false;
      }
    }
  }
</script>

<style lang="scss">
  .promotion-box {
    position: absolute;
    width: 700px;
    height: 510px;
    top: 50%;
    left: 50%;
    margin-top: -255px;
    margin-left: -350px;
    z-index: 1000;
    background-color: #fff;
    transition: all .3s ease 0s;
    overflow: hidden;
    .ex-info {
      position: relative;
      height: 465px;
    }
    .user-marketing {
      width: 480px;
      margin: 0 auto;
      padding: 60px 0px 40px 0px;
      position: relative;
      li {
        font-size: 16px;
        color: #666;
        margin-bottom: 20px;
        &.submit-zone {
          position: absolute;
          right: 3px;
          top: 59px;
          a.submit {
            width: 125px;
            background: linear-gradient(to bottom, #71c8fb, #8b76f6);
            display: block;
            text-align: center;
            color: #fff;
            line-height: 35px;
            cursor: pointer;
            position: relative;
            border-radius: 5px;
          }
        }
        p {
          padding-left: 105px;
          margin: 5px 0 20px;
        }
        label {
          display: inline-block;
          width: 65px;
          text-align: right;
        }
        input, select {
          box-sizing: border-box;
          width: 30%;
          height: 27px;
          vertical-align: middle;
          margin-right: 5px;
          border: 1px solid #d6cff4;
          font-size: 14px;
          padding: 0 5px;
          color: #666;
          -webkit-border-radius: 3px;
          border-radius: 3px;
          font-family: 'Microsoft Yahei';
        }
        option {
          padding: 0;
          margin: 0;
        }
        p.tip {
          color: #ccc;
          font-size: 13px;
          padding-left: 70px;
        }
        select {
          width: 46%;
          color: #999;
          font-size: 16px;
        }
      }
    }
    .promotion-link {
      width: 453px;
      margin: 0 auto;
      border-top: 1px dashed #eee;
      padding-top: 50px;
      color: #999;
      font-size: 13px;
      .pm-con {
        margin: 0 auto;
      }
      .icon-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #7EA2F9;
        border-radius: 100%;
        margin-right: 8px;
        vertical-align: 1px;
      }
      ul li select {
        width: 65%;
        height: 35px;
        background: #eef3fd;
        font-size: 16px;
        color: #7EA2F9;
        border: none;
        border-radius: 5px;
      }
      .pl_r {
        float: right;
        width: 35%;
        border-left: 1px dotted #eae6ef;
      }
    }
    .tz_details_shot {
      display: none;
      width: 680px;
      color: #fff;
      position: absolute;
      left: 50%;
      max-height: 424px;
      overflow-y: auto;
      margin-left: -340px;
      top: 15px;
      cursor: text;
      background: #3d5ca7;
      z-index: 11;
      .tz_icon_sj {
        background: url(../../../assets/manage/tz_icon_sj.png);
        width: 13px;
        height: 11px;
        display: block;
        position: absolute;
        bottom: -11px;
        left: 50%;
        margin-left: -7px;
        display: none;
      }
      th {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        line-height: 16px;
        padding: 15px 0;
        border-top: 1px solid #6886d0;
        border-bottom: 1px solid #6886d0;
      }
      td {
        font-size: 13px;
        line-height: 16px;
        .fdxq_td {
          position: relative;
          float: left;
          display: inline-block;
          width: 200px;
          padding: 7px 10px;
          border-right: 1px solid #6886d0;
          border-bottom: 1px solid #6886d0;
          text-align: left
        }
        .w_2 {
          position: absolute;
          right: 10px;
          display: inline-block;
          font-style: normal;
        }
      }
    }
    .btn_details:hover .tz_details_shot {
      display: block;
    }
    .btn_details {
      float: right;
      font-size: 14px;
      color: #7EA2F9;
      padding: 0px 10px;
      margin-right: 200px;
      display: inline-block;
      text-decoration: underline;
      cursor: pointer;
    }
    .popularize_list ul {
      padding-top: 30px;
      li {
        margin-bottom: 20px;
        font-size: 14px;
      }
      .pl_l {
        float: left;
        width: 62%;
        color: #888;
        font-size: 15px;
      }
      .pl_l h3 {
        color: #333;
        font-weight: bold;
        font-size: 18px;
      }
      .pl_l_item {
        margin-top: 20px;
        line-height: 16px;
        .w_1 {
          width: 230px;
          display: inline-block;
        }
      }
      .copy-txt-new {
        display: inline-block;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
      .copy_btn_b {
        position: absolute;
        right: auto;
        width: 45px;
        height: 35px;
        line-height: 34px;
        margin-top: 0;
        text-align: center;
        color: #fff;
        font-size: 14px;
        background: linear-gradient(to bottom, #71c8fb, #8b76f6);
        border-radius: 5px;
        border: 0;
        cursor: pointer;
        font-family: 'microsoft yahei';
      }
    }
  }
</style>