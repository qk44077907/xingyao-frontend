import Vue from 'vue'
import Vuex from 'vuex'
import {generateTrackIssueMap, generateTrackIssue} from './utils/generateTrackIssues.js'
import router from './router'
import {axios} from './initMethods'
import {BALANCE, PROFILE} from "./utils/apiUrl";
import lotteryCate from "@/utils/lotteryCate"

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    eventHub: new Vue(),
    serverTime: 0,
    localStartTime: +new Date(),
    localCurrentTime: +new Date(),
    timer: null,
    isProfileGotten: false,
    noticeList:[],
    noticeTotalNum:0,
    noticePageIdx:1,
    isSoundOpened:false,
    profile: {
      last_login_ip: '',
      last_login_time: '',
      register_ip: '',
      register_time: '',
      invite_code: '',
      username: '',
      userid: '',
      nickname: '',
      set_question: false,
      set_trans_password: false,
      preset_info: '',
      rebate: '0.0',
      balance: '0.0000',
    },
    lotteryCate: lotteryCate,
    saleendObj: {},
    salestartObj:{},
    remainingSecondsObj: {},
    modalText: '',
    modalTitle: '',
    modalHandler:{},
    toastText: '',
    isModalShowed: false,
    isToastShowed: false,
    isDepositModalShowed:false,
    shouldPrizeNotificationShowed: true,
    isRefreshingBalance: false,
  },
  getters: {
    allLottery(state) {
      let allLottery = []
      state.lotteryCate.forEach((cate) => {
        cate.lotterys.forEach((lottery) => {
          allLottery.push(lottery)
        })
      })
      return allLottery
    },
    currentTime(state) {
      return state.serverTime + state.localCurrentTime - state.localStartTime
    },
  },
  mutations: {
    switchSound(state) {
      state.isSoundOpened = !state.isSoundOpened
    },
    showModal(state, payload) {
      state.isModalShowed = true
      state.modalHandler = {}
      state.modalText = payload.text
      state.modalTitle = payload.title || '提示'
    },
    closeModal(state) {
      state.isModalShowed = false
      state.modalHandler.resolve && state.modalHandler.resolve()
    },
    showDepositModal(state) {
      state.isDepositModalShowed = true
    },
    closeDepositModal(state) {
      state.isDepositModalShowed = false
    },
    showToast(state, payload) {
      state.isToastShowed = true
      state.toastText = payload.text
    },
    closeToast(state) {
      state.isToastShowed = false
    },
    switchPrizeNotification(state) {
      state.shouldPrizeNotificationShowed = !state.shouldPrizeNotificationShowed
    },
    switchIsTranPasswordSet(state) {
      state.profile.set_trans_password = true
    },
    switchIsQuestionSet(state) {
      state.profile.set_question = true
    },
    openIsProfileGotten(state) {
      state.isProfileGotten = false
    },
    updateProfile(state, payload) {
      state.profile = payload
    },
    updateNoticeList(state,payload){
      state.noticeList = payload.list
      state.noticeTotalNum = payload.total
      state.noticePageIdx = payload.page_idx
    },
    updateBalance(state, payload) {
      state.profile.balance = payload.balance
    },
    initTime(state, payload) {
      state.serverTime = payload
    },
    changeCurrentTime(state, payload) {
      state.localCurrentTime = payload
    },
    initSaleendObj(state, {currentTime, allLottery}) {
      let endObj = {}
      let startObj = {}
      allLottery.forEach(lottery => {
        let func = generateTrackIssueMap[lottery.flaglot] || generateTrackIssue
        let saleobj = func(currentTime)[0]
        endObj[lottery.flaglot] = saleobj.saleend
        startObj[lottery.flaglot] = saleobj.salestart
      })
      state.saleendObj = endObj
      state.salestartObj = startObj
    },
    updateSaleendObj(state, {currentTime, flaglot}) {
      let func = generateTrackIssueMap[flaglot] || generateTrackIssue
      let saleobj = func(currentTime)[0]
      state.saleendObj[flaglot] = saleobj.saleend
      state.salestartObj[flaglot] = saleobj.salestart
    },
    updateRemainingSecondsObj(state, obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          Vue.set(state.remainingSecondsObj, key, obj[key])
        }
      }
    }
  },
  actions: {
    showModalAsync({state,commit}, payload) {
      commit('showModal',payload)
      return new Promise((resolve, reject)=>{
        state.modalHandler = {resolve, reject}
      })
    },
    getProfile({state, getters, commit, dispatch},{isForce}) {
      if(isForce){
        state.isProfileGotten = false
      }
      if (state.isProfileGotten === true) {
        return
      }

      return axios({
        url: PROFILE,
        method: 'post',
        loading: true,
        data: {},
      }).then((res) => {
        console.log();
        state.isProfileGotten = true
        commit('updateProfile', res.data.data)
        if(!state.serverTime){
          commit('initTime', parseInt(res.data.data.timestamp))
          let {currentTime, allLottery} = getters
          //commit('initTime',+new Date())
          console.log(state.serverTime);
          dispatch('startTimer')
          commit('initSaleendObj', {
            currentTime,
            allLottery,
          })

        }

      })
    },
    refreshBalance({commit, state}) {
      if(state.isRefreshingBalance = true){
        return
      }
      state.isRefreshingBalance = true
      return axios({
        url: BALANCE,
        method: 'post',
        data: {},
      }).then((res) => {
        state.isRefreshingBalance = false
        commit('updateBalance', res.data.data)
      })
    },
    startTimer({commit, state}) {
      state.timer = setInterval(() => {
        state.localCurrentTime = +new Date()

        //日志打印太多
        //commit('changeCurrentTime',+new Date())
      }, 250)
    }
  }
})
store.watch((state, getters) => {
  return Math.round(getters.currentTime / 1000)
}, (currentTimeCalcBySeconds) => {
  let res = {}
  for (let flaglot in store.state.saleendObj) {
    if (store.state.saleendObj.hasOwnProperty(flaglot)) {
      let currentTime = store.getters.currentTime
      let remainingSeconds = store.state.remainingSecondsObj[flaglot] || 0;
      if (remainingSeconds <= 0) {
        store.commit('updateSaleendObj', {flaglot, currentTime})
        let saleend = (+new Date(store.state.saleendObj[flaglot]))
        remainingSeconds = Math.round((saleend - currentTime) / 1000);
      } else {
        remainingSeconds--
      }
      res[flaglot] = remainingSeconds
    }
  }
  store.commit('updateRemainingSecondsObj', res)
})
export default store
