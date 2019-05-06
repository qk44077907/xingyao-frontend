<template>
  <div class="mask-wrap">
    <div class="rebate-box">
      <div class="modal-title">返点设定</div>
      <div class="layer-close" @click="closeBox"></div>
      <div v-if="!rebateSuccess" class="rebate-info">
        <ul class="open-account">
          <li>
            <label>用户名：</label>
            <span class="info">{{user.username}}</span>
          </li>
          <li>
            <label>当前返点：</label>
            <span class="info">{{user.rebate}}</span>
          </li>
          <li>
            <label>返点设置：</label>
            <div class="selectpointBox">
              <select class="prisepoint" name="point" v-model="subRebate">
                <option v-for="option in rebateOptions" :value="option">{{option}}</option>
              </select>
            </div>
            %
            　　<span>自身返点：{{profile.rebate}}%</span>
          </li>
          <li class="submit-zone">
            <button>重置</button>
            <button class="formWord" @click="confirmDataHandle">确定</button>
          </li>
        </ul>
      </div>
      <div v-else class="box-success">
        <h3>您的下级返点已设置为{{subRebate}}%</h3>
        <div style="display:none;" class="yhlb_back">
          <button>返回</button>
        </div>
      </div>
      <div class="list_page">
        <span class="page"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { SET_SUB_REBATE } from '@/utils/apiUrl'
  import { mapState } from 'vuex'

  export default {
    props: {
      user: Object
    },
    data() {
      return {
        rebateSuccess: false,
        subRebate:'',
      }
    },
    computed: {
      ...mapState(['profile']),
      rebateOptions() {
        let integerRebate = 10 * this.profile.rebate
        let result = []
        for (; integerRebate > 10 * this.user.rebate; integerRebate--) {
          result.push((integerRebate / 10).toFixed(1))
        }
        return result
      }
    },
    methods: {
      closeBox() {
        this.$emit('closeBox');
      },
      confirmDataHandle() {
        let uid = this.user.userid
        let point = String(Math.floor(this.subRebate * 10) / 10)
        console.log(uid, point);
        if (parseFloat(point) > parseFloat(this.profile.rebate)) {
          this.showModal({
            text: '下级返点不能超过上级'
          })
          return
        }
        this.$axios({
          method: 'post',
          url: SET_SUB_REBATE,
          data: {
            uid,
            point
          },
          loading: true
        }).then((res) => {
          this.rebateSuccess = true;
          this.user.rebate = point
        })

      }
    },
    created() {
      this.subRebate = this.rebateOptions[0]
    }
  }
</script>

<style lang="scss">
  .rebate-box {
    position: absolute;
    width: 600px;
    height: 380px;
    top: 50%;
    left: 50%;
    margin-top: -190px;
    margin-left: -300px;
    z-index: 1000;
    background-color: #fff;
    transition: all .3s ease 0s;
    overflow: hidden;
    .rebate-info {
      padding: 10px 20px 0;
      background: #fff;
    }
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
    .box-success{
      background: url(../../../assets/manage/icon_success-big.png) no-repeat center 35px;
      padding: 110px 0 100px;
      h3 {
        font-size: 18px;
        text-align: center;
        color: #4680e8;
      }
    }

  }
</style>