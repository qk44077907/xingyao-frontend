<template>
  <div class="home-framework">
    <announce-modal v-if="isAnnounceShowed" @close="isAnnounceShowed = false"></announce-modal>
    <header class="header-framework">
      <BetHeader></BetHeader>
      <HeaderNav :index="0"></HeaderNav>
    </header>
    <SideBar :home="true"></SideBar>
    <Banner></Banner>
    <HomeContent></HomeContent>
    <BetFooter></BetFooter>
    <div :class="!noviceFlag?'novice-task novice-task-after':'novice-task-close'">
      <div class="open-novice"></div>
      <div class="close-novice" @click="showNoviceTask"></div>
    </div>
  </div>
</template>

<script>
import BetHeader from '@/components/BetHeader.vue'
import HeaderNav from '@/components/HeaderNav.vue'
import SideBar from '@/components/SideBar.vue'
import Banner from '@/components/Home/Banner.vue'
import HomeContent from '@/components/Home/HomeContent.vue'
import BetFooter from '@/components/BetFooter.vue'
import AnnounceModal from '@/components/AnnounceModal'

import {NOTICE_LIST} from '@/utils/apiUrl'
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'home',
  components: {
    BetHeader,
    HeaderNav,
    SideBar,
    Banner,
    HomeContent,
    BetFooter,
    AnnounceModal
  },
  data() {
    return {
      isAnnounceShowed:false,
      noviceFlag: false
    }
  },
  computed:{
    ...mapState(['noticeList']),
  },
  methods: {
    ...mapMutations(['updateNoticeList']),
    showNoviceTask() {
      this.noviceFlag = !this.noviceFlag;
    }
  },
  async created() {
    if(this.noticeList.length === 0){
      let res =await this.$axios({
        url: NOTICE_LIST,
        method: 'post',
        data: {
          page_idx:1,
          page_size:10
        },
        loading:true
      })
      this.updateNoticeList(res.data.data)
    }
    let lastAnnounced = this.getCookie('lastAnnounced')
    let now = new Date()
    if(!lastAnnounced || new Date() - lastAnnounced > 3600*24*1000 ){
      this.$setCookie('lastAnnounced',now)
      this.isAnnounceShowed = true
    }
  }
}
</script>

<style lang="scss">
.header-framework {
  background-color: #242933;
}
.novice-task {
  width: 252px;
  height: 201px;
  position: fixed;
  bottom: 20%;
  left: -167px;
  z-index: 100;
  cursor: pointer;
  transition: all .3s;
  padding-left: 18px;
  padding-top: 2px;
  background: url(../assets/home/noviceTask.png) no-repeat;
  &:hover {
    left: 0
  }
  .open-novice {
    float: left;
    width: 210px;
    height: 186px
  }
  .close-novice {
    float: left;
    width: 32px;
    height: 186px
  }
}
.novice-task-close {
  width: 252px;
  height: 201px;
  position: fixed;
  bottom: 20%;
  left: -167px;
  z-index: 100;
  cursor: pointer;
  transition: all .3s;
  padding-left: 18px;
  padding-top: 2px;
  background: url(../assets/home/noviceTask.png) no-repeat;
  .open-novice {
    float: left;
    width: 210px;
    height: 186px
  }
  .close-novice {
    float: left;
    width: 32px;
    height: 186px
  }
}
@media (max-width: 1400px) {
  .novice-task-origin {
    animation: novice 1.5s
  }
  .novice-task-after {
    left: -167px !important
  }
  .novice-task-after:hover {
    left: 0 !important
  }
}
@media (min-width: 1401px) {
  .novice-task-after, .novice-task-origin {
    left: 0 !important
  }
}
@-webkit-keyframes novice {
  0% {left: -167px }
  20% {left: 0 }
  23% {left: 2px }
  25% {left: -2px }
  80% {left: 0 }
  to {left: -167px }
}
@-moz-keyframes novice {
  0% {left: -167px }
  20% {left: 0 }
  23% {left: 2px }
  25% {left: -2px }
  80% {left: 0 }
  to {left: -167px }
}
@keyframes novice {
  0% {left: -167px }
  20% {left: 0 }
  23% {left: 2px }
  25% {left: -2px }
  80% {left: 0 }
  to {left: -167px }
}
</style>
