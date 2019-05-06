<template>
  <div class="modal">
    <div class="tip-box">
      <div class="title">充值<div class="close-btn" @click="closeDepositModal"></div></div>
      <div class="content">
        <div class="service-time">充值处理时间：7*24小时充值服务</div>
        <div class="chosen-result">
          <span class="desc">选择充值方式：</span>
          <span class="result">
            <div class="icon" :class="[chosenMethod.icon]"></div>
            <div class="method-name">{{chosenMethod.name}}</div>
          </span>
        </div>
        <div class="choose-box">
          <div
              class="method-item"
              :class="{active:method.key === chosenMethod.key}"
              v-for="method in methods"
              :key="method.key"
              @click="chooseMethod(method)"
          >
            <div class="icon" :class="[method.icon]"></div>
            <div class="method-name">{{method.name}}</div>
          </div>
        </div>
        <div class="deposit-box">
          <div class="deposit-desc">充值金额(人民币):</div>
          <div class="input-box">
            <input
                type="number"
                class="amount"
                :class="{error:!isValid}"
                v-model.number="amount" @blur="validateAmount">
            <span class="yuan">元</span>
            <span class="invalid-hint" v-if="!isValid">
              请输入范围{{chosenMethod.min}}~{{chosenMethod.max}}内的金额！
            </span>
            <div class="tips">
              单笔充值限额：最低 <span>{{chosenMethod.min}}</span>元，最高 <span>{{chosenMethod.max}}</span>元
            </div>
          </div>
        </div>
        <div class="uppercase-box">
          <div class="uppercase-desc">充值金额(大写):</div>
          <div class="uppercase-amount">{{uppercaseMoney}}</div>
        </div>
      </div>
      <div class="confirm-box">
        <p>*平台填写金额应当与网银汇款金额完全一致，否则将无法即时到账！</p>
        <div class="confirm-btn">确定</div>
      </div>


    </div>
  </div>
</template>

<script>
  import numeral from 'numeral'
  import digitUppercase from '@/utils/digitUppercase'
  import {DEPOSIT} from '@/utils/apiUrl'
  import { mapMutations ,mapState} from 'vuex'

  export default {
    name: "depositModal",
    data() {
      return {
        amount:0,
        isValid:true,
        chosenMethod:{},
        uppercaseMoney:'',
        methods:[
          {
            key:'zfb1',
            name:'支付宝支付1',
            icon:'zfb',
            min:50,
            max:40000,
          },
          {
            key:'wy1',
            name:'网银快充1',
            icon:'wy',
            min:50,
            max:40000,
          },
        ]
      }
    },
    computed:{

    },
    methods: {
      ...mapMutations([
        'closeDepositModal',
      ]),
      chooseMethod(method) {
        this.chosenMethod = method
      },
      validateAmount() {
        if(this.amount >= this.chosenMethod.min && this.amount <= this.chosenMethod.max){
          this.isValid = true
        }else {
          this.isValid = false
        }
        this.uppercaseMoney = digitUppercase(this.amount)
      },
      submit() {
        this.validateAmount()
        if(!this.isValid){
          return
        }
        this.$axios({
          url: DEPOSIT,
          method: 'post',
          loading:true,
          data: {
            amount:this.amount
          },
        }).then((res)=>{
          window.open(res.data.data.url,'充值')
        })

      }

    },
    created() {
      this.chosenMethod = this.methods[0]
    }
  }
</script>

<style scoped lang="scss">
.modal{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  z-index: 9998;
  top: 0;
  left: 0;
  .tip-box{
    background: #fff;
    padding: 0;
    position: fixed;
    text-align: left;
    box-shadow: 0 0 18px rgba(0,0,0,.2);
    left: 50%;
    top: 50%;
    overflow: hidden;
    border-radius: 4px;
    z-index: 10000;

    transform: scale(1, 1);
    width: 900px;
    height: 660px;
    margin-left: -450px;
    margin-top: -330px;
    .title{
      position: relative;
      height: 45px;
      line-height: 45px;
      border-radius: 2px 2px 0 0;
      font-size: 16px;
      color: #fff;
      letter-spacing: 0;
      text-align: center;
      font-weight: bold;
      background: -webkit-linear-gradient(left,#71a4ff,#7bddfc);
      .close-btn{
        position: absolute;
        width: 30px;
        height: 30px;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        background: url(../assets/manage/close-button.png) no-repeat 50%;
      }
    }
    .content{
      word-break: break-all;
      font-family: Microsoft YaHei;

      font-size: 14px;
      color: #333;
      letter-spacing: 0;
      text-align: left;
      line-height: 25px;
      padding: 20px 30px 0;
      min-height: 100px;
      .service-time{
        display: inline-block;
        font-size: 14px;
        color: #00a854;
        line-height: 20px;
        background-color: #e5f6ed;
        padding: 5px 10px;
      }
      .icon{
        width: 30px;
        height: 30px;
        background-size: 100% 100%;
        &.wy{
          background-image: url(../assets/manage/wy.png);
        }
        &.zfb{
          background-image: url(../assets/manage/zfb.png);
        }
      }
      .method-name{
        margin-left: 5px;
        font-size: 16px;
      }
      .chosen-result{
        display: flex;
        align-items: center;
        padding: 12px 0;
        .desc{
          width: 145px;
          float: left;
          font-size: 17px;
          line-height: 36px;
          color: #000;
          padding-right: 10px;
          text-align: left;
        }
        .result{
          display: flex;
          align-items: center;

        }
      }
      .choose-box{
        display: flex;
        align-items: center;
        border-bottom: 1px dashed #ddd;
        padding-bottom: 10px;
        margin-bottom: 10px;
        .method-item{
          display: flex;
          align-items: center;
          width: 145px;
          border: 1px solid #ddd;
          padding: 5px 0 5px 5px;
          background: #fff;
          margin-right: 20px;
          margin-bottom: 10px;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 4px;
          &.active{
            border: 1px solid #667ae5;
            box-shadow: 0 0 15px 0 rgba(102,122,230,0.3);
            &:after{
              content: '';
              position: absolute;
              right: 0px;
              bottom: 0px;
              background: url(../assets/manage/choose.png) no-repeat;
              width: 21px;
              height: 19px;
              display: block;
            }
          }
        }
      }
      .deposit-box{
        overflow: hidden;
        zoom: 1;
        padding: 12px 0;
        position: relative;
        display: flex;
        .deposit-desc{
          width: 145px;
          font-size: 17px;
          line-height: 36px;
          color: #000;
          padding-right: 10px;
          text-align: left;
        }
        .input-box{
          .amount{
            width: 240px;
            font-family: Microsoft Yahei;
            text-align: left;
            height: 35px;
            line-height: 35px;
            font-size: 16px;
            color: #333;
            border: 1px solid #bbb;
            padding: 0 8px;
            color: #333;
            border-radius: 5px;
            margin-right: 8px;
            &.error{
              border: 1px solid red
            }
          }
          .yuan{
            font-size: 20px;
            color: #333;
            vertical-align: -3px;
          }
          .invalid-hint{
            color: red;
            padding: 0 10px 0 18px;
            font-size: 14px;
          }

        }
        .tips{
          color: #888;
          padding: 10px 0 0 0;
          font-size: 13px;
          span{
            color: #667ae5;
            font-weight: bold;
          }
        }
      }
      .uppercase-box{
        overflow: hidden;
        zoom: 1;
        padding: 12px 0;
        position: relative;
        display: flex;
        .uppercase-desc{
          width: 145px;
          float: left;
          font-size: 17px;
          line-height: 36px;
          color: #000;
          padding-right: 10px;
          text-align: left;
        }
        .uppercase-amount{
          font-size: 20px;
          color: #667ae5;
          line-height: 36px;
        }

      }
      .text{
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        align-items: start;
        overflow: auto;
        overflow-x: hidden;
        line-height: 22px;
        overflow-y: auto;
        color: #3b476a;
        font-size: 16px;
      }
    }
    .confirm-box{
      display:flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      padding: 12px 0;
      border-top: 1px solid #eee;
      p{
        padding: 0 0 15px 0;
        color: #888;
      }
      .confirm-btn{
        font-family: 'Microsoft Yahei';
        width: 250px;
        height: 45px;
        font-size: 20px;
        line-height: 45px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background: #759EF7;
        background: linear-gradient(top, #72cbfb, #777DF4);
        &:hover{
          background: linear-gradient(top, #62bdef, #696fe8);
        }
      }
    }

  }
}
</style>