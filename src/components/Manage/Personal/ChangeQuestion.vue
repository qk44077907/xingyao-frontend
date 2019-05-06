<template>
  <div class="mask-wrap">
    <div class="change-ques">
      <div class="modal-title">密保设定</div>
      <div class="layer-close" @click="closeMask"></div>
      <div class="content">
        <div class="tabs">
          <table width="100%" border="0" cellspacing="1" cellpadding="5">
            <tr>
              <td class="tdz3_left">密保问题：</td>
              <td class="tdz3_right">
                <!--<select class="select_text" v-model="selectedQuestion">-->
                  <!--<option v-for="question in userQuestions" :value="question">{{question}}</option>-->
                <!--</select>-->
                <select class="select_text" name="dna_ques">
                  <option value="-1">请选择密保问题</option>
                  <option value="4">您母亲的姓名是？</option>
                  <option value="8">您配偶的生日是？</option>
                  <option value="13">您的学号（或工号）是？</option>
                  <option value="5">您母亲的生日是？</option>
                  <option value="12">您高中班主任的名字是？</option>
                  <option value="1">您父亲的姓名是？</option>
                  <option value="10">您小学班主任的名字是？</option>
                  <option value="2">您父亲的生日是？</option>
                  <option value="7">您配偶的姓名是？</option>
                  <option value="11">您初中班主任的名字是？</option>
                  <option value="16">您最熟悉的童年好友名字是？</option>
                  <option value="17">您最熟悉的学校宿舍室友名字是？</option>
                  <option value="18">对您影响最大的人名字是？</option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="tdz3_left">答案：</td>
              <td class="tdz3_right">
                <input name="ans" id="ans2" type="text" width="100px" value="" maxlength="25">
                <span class="text_hint">长度最多为25个字符</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="list_btn_box">
          <input name="" type="submit" value="修改" class="pass-change" @click="answerQuestion">
          <input name="" type="reset" value="重置" class="pass-reset" @click="reset">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userQuestions:[],
      }
    },
    methods: {
      closeMask() {
        this.$emit('closeHandle');
      },
      answerQuestion() {

      },
      reset() {

      }
    }
  }
</script>

<style lang="scss">
  .change-ques {
    width: 820px;
    height: 560px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -410px;
    margin-top: -280px;
    background: #fff;
    .content {
      padding: 10px 20px 0;
      .tabs {
        margin: 0 auto;
        padding-top: 10px;
        table {
          width: 500px;
          margin: 0 auto;
        }
        .tdz3_left {
          width: 110px;
          text-align: right !important;
          font-size: 14px;
          color: #666;
        }
        .tdz3_left .red {
          color: #ff0000;
          margin-right: 10px;
        }
        .tdz3_right {
          text-align: left !important;
          padding: 10px 0;
          position: relative;
        }
        .tdz3_right input {
          width: 259px;
          height: 35px;
          vertical-align: middle;
          border: 1px solid #d8d8d8;
          font-size: 14px;
          padding: 0 5px;
          color: #666;
          -webkit-border-radius: 3px;
          border-radius: 3px;
          font-family: 'Microsoft Yahei';
        }
        .tdz3_right .select_text {
          width: 293px;
          height: 38px;
          border: 1px solid #d8d8d8;
          border-radius: 3px;
          font-size: 14px;
          color: #999;
        }
        #ans1, #ans2 {
          width: 282px;
        }
        .list_page {
          padding-left: 6px;
          color: #f5a623;
          font-size: 13px;
        }
        .list_page span {
          display: block;
        }
        .text_hint {
          display: inline-block;
          position: absolute;
          left: 305px;
          top: 19px;
          min-width: 220px;
          color: #ff632c;
          padding-left: 5px;
          font-size: 12px;
        }
        .text_hint-c {
          top: 12px;
        }

      }
      .list_btn_box {
        text-align: center;
        padding: 20px 0 0 0;
        .pass-change {
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
        }
        .pass-reset {
          font-size: 15px;
          width: 90px;
          height: 35px;
          line-height: 33px;
          color: #353434;
          margin: 0 10px;
          padding: 0 !important;
          border: 1px solid #d8d8d8 !important;
          font-family: Microsoft Yahei;
          cursor: pointer;
          letter-spacing: 3px;
          border-radius: 4px;
          background-color: #fff;
        }
      }
    }
  }
</style>