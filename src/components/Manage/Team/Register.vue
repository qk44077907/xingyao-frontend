<template>
  <div class="mask-wrap">
    <div class="register-box">
      <div class="modal-title">注册开户</div>
      <div class="layer-close" @click="closeBox"></div>
      <div v-if="!registerSuccess" class="box-info">
        <ul class="open-account">
          <li>
            <label>用户名：</label>
            <input v-model="username" type="text" @blur="nameBlurHandle">
            <p class="text_hint">
              <i v-if="nameFlag===''">字母或数字6-16个字符,不能连续四位相同,首字不能0或者o</i>
              <i v-else-if="nameFlag===true" class="hint_correct">用户名可用</i>
              <i v-else-if="nameFlag===false" class="hint_error">用户名不可用</i>
            </p>
          </li>
          <li>
            <label>密码：</label>
            <input v-model="userpass" type="password" @blur="passBlurHandle">
            <p class="text_hint">
              <i v-if="passFlag===''">由字母和数字组成6-16个字符；且必须包含数字和字母</i>
              <i v-else-if="passFlag===true" class="hint_correct">密码可用</i>
              <i v-else-if="passFlag===false" class="hint_error">密码不可用</i>
            </p>
          </li>
          <li style="margin: 30px 0">
            <label>返点设置：</label>
            <div class="selectpointBox">
              <select v-model="currentPoint" class="prisepoint" name="point">
                <option v-for="option in rebateOptions" :value="option">{{option}}</option>
              </select>
            </div>
            %
            <span>自身返点：{{rebate}}%</span>
          </li>
          <li class="submit-zone">
            <button @click="resetDataHandle">重置</button>
            <button :class="nameFlag&&passFlag?'':'gray'" @click="confirmDataHandle">确定</button>
          </li>
        </ul>
      </div>
      <div v-else class="box-success">
        <h3>您的下级返点已设置为{{currentPoint}}%</h3>
        <div style="display:none;" class="yhlb_back">
          <button>返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {CREATE_SUB} from '../../../utils/apiUrl'
  import {mapState} from 'vuex'
  export default {
    props: {
      show: Boolean
    },
    data() {
      return {
        nameFlag: '', // name验证标识
        passFlag: '', // pass验证标识
        username: '',
        userpass: '',
        currentPoint: 7.5,
        registerSuccess: false
      }
    },
    computed: {
      ...mapState({rebate: state => state.profile.rebate}),
      rebateOptions() {
        let integerRebate = 10 * this.rebate
        let result = []
        for (; integerRebate >= 0; integerRebate--) {
          result.push((integerRebate / 10).toFixed(1))
        }
        return result
      }
    },
    methods: {
      nameBlurHandle() {
        let reg = /^(\w){6,16}$/;
        this.nameFlag = reg.test(this.username);
      },
      passBlurHandle() {
        let reg = /^(\w){6,16}$/;
        this.passFlag = reg.test(this.userpass);
      },
      resetDataHandle() {
        this.nameFlag = '';
        this.passFlag = '';
        this.username = '';
        this.userpass = '';
        this.currentPoint = 7.5;
      },
      async confirmDataHandle() {
        let result = await this.$axios({
          url: CREATE_SUB,
          method: 'POST',
          data: {
            username: this.username,
            nickname: this.username,
            password: this.userpass,
            point: this.currentPoint
          },
          loading:true,
        });
        if (result.data.status == 1000) {
          this.registerSuccess = true;
        }

      },
      closeBox() {
        this.$emit('closeBox');
      }
    }
  }
</script>

<style lang="scss">
  .register-box {
    position: absolute;
    width: 650px;
    height: 400px;
    left: 50%;
    top: 50%;
    margin-left: -325px;
    margin-top: -200px;
    z-index: 1000;
    background-color: #fff;
    transition: all .3s ease 0s;
    overflow: hidden;
    select {
      padding: 0 0 0 5px;
      border: 1px solid #bbb;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      color: #666;
      font-family: Microsoft Yahei;
      min-width: 71px
    }

    .selectpointBox {
      position: relative;
      display: inline;
      width: 60px;
    }
    .prisepoint {
      border: 1px solid #d6cff4;
      padding: 3px 9px 3px 5px;
      color: #666;
      font-size: 12px;
      border-radius: 3px;
    }
    .box-success {
      background: url(../../../assets/manage/icon_success-big.png) no-repeat center 35px;
      padding: 110px 0 100px;
      h3 {
        font-size: 18px;
        text-align: center;
        color: #4680e8;
      }
      .yhlb_back {
        margin: 20px 0px;
        text-align: center;
        line-height: 30px;
        button {
          cursor: pointer;
          display: inline-table;
          width: 120px;
          height: 39px;
          line-height: 39px;
          background: url(../../../assets/manage/reset.png) no-repeat;
          color: #333;
          font-size: 14px;
        }
      }
    }
  }
</style>