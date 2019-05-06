<template>
  <div class="manage-page">
    <!--<header class="header-framework">-->
      <!--<Header></Header>-->
      <!--<HeaderNav :index="5"></HeaderNav>-->
    <!--</header>-->
    <!--<SideBar></SideBar>-->
    <ManageContent></ManageContent>
    <!--<Footer></Footer>-->
  </div>
</template>

<script>
  import Header from '@/components/BetHeader.vue'
  import HeaderNav from '@/components/HeaderNav.vue'
  import SideBar from '@/components/SideBar.vue'
  import Footer from '@/components/BetFooter.vue'
  import ManageContent from '@/components/Manage/ManageContent.vue'

  export default {
    name: 'manage',
    components: {
      Header,
      HeaderNav,
      SideBar,
      ManageContent,
      Footer,
    },
    data() {
      return {

      }
    },
    computed:{

    },
    methods:{

    },
  }
</script>

<style lang="scss">
.manage-page {
  min-height: 100%;
  width: 100%;
  min-width: 1040px;
}
</style>