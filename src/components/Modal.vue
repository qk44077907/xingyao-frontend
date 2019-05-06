<template>
  <div class="modal" v-if="isModalShowed">
    <div class="tip-box">
      <div class="title">{{modalTitle}}</div>
      <div class="content">
        <div class="text" v-html="modalText">
        </div>
      </div>
      <div class="confirm-box">
        <div class="confirm-btn" @click="closeModal">确定</div>
      </div>


    </div>
  </div>
</template>

<script>
  import { mapMutations ,mapState} from 'vuex'

  export default {
    name: "modal",
    computed:{
      ...mapState(['modalText','modalTitle','isModalShowed'])
    },
    methods: {
      ...mapMutations([
        'closeModal',
      ]),
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
    width: 500px;
    background: #fff;
    padding: 0;
    position: fixed;
    text-align: left;
    box-shadow: 0 0 18px rgba(0,0,0,.2);
    margin-left: -250px;
    left: 50%;
    top: 50%;
    overflow: hidden;
    border-radius: 4px;
    z-index: 10000;
    transform: translateY(-50%);
    .title{
      height: 45px;
      line-height: 45px;
      background: #f0f4fc;
      border-radius: 2px 2px 0 0;
      font-size: 16px;
      color: #333;
      letter-spacing: 0;
      text-indent: 3.4%;
      font-weight: bold;
    }
    .content{
      word-break: break-all;
      font-family: Microsoft YaHei;

      font-size: 14px;
      color: #333;
      letter-spacing: 0;
      text-align: left;
      line-height: 25px;
      padding: 20px;
      min-height: 100px;
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
      justify-content: flex-end;
      background: #fff;
      padding: 12px 0;
      border-top: 1px solid #eee;
      font-size: 14px;
      overflow: hidden;
      text-align: right;
      padding-right: 5px;
      .confirm-btn{
        box-sizing: border-box;
        text-align: center;
        margin-right: 10px;
        cursor: pointer;
        padding: 0 10px;
        min-width: 90px;
        height: 32px;
        line-height: 32px;
        background: linear-gradient(to bottom,#57c1ef,#4a87e9);
        border-radius: 4px;
        border: none;
        font-size: 14px;
        color: #fff;
      }
    }

  }
}
</style>