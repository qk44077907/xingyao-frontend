<template>
  <div class="toast" v-if="isToastShowed" v-html="toastText">

  </div>
</template>

<script>
  import { mapMutations ,mapState} from 'vuex'

  export default {
    name: "toast",
    computed:{
      ...mapState(['toastText','isToastShowed'])
    },
    methods: {
      ...mapMutations([
        'closeModal', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      ]),
    }
  }
</script>

<style scoped lang="scss">
.toast{
  position: fixed;
  background-image: linear-gradient(to bottom,#55c9f1,#69aceb);
  height: 60px;
  min-width: 80px;
  padding: 0 15px;
  border-radius: 4px;
  top: 40%;
  left: 50%;
  text-align: center;
  font-size: 16px;
  color: #fff;
  transform: translate(-50%,-80%);
  line-height: 59px;
  transition: all .5s;
  z-index: 99999;
  box-shadow: 0 5px 15px 0 #bfcbd8;
}
</style>