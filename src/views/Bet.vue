<template>
  <div class="bet">
    <audio id="sound" preload ref="sound">
      <source src="../assets/bet/ring.mp3" type="video/ogg">
      <source src="../assets/bet/ring.wav" type="video/mp4">
    </audio>
    <header class="header-framework">
      <BetHeader></BetHeader>
      <HeaderNav :index="1"></HeaderNav>
    </header>
    <side-bar></side-bar>
    <div class="notification-layout" v-if="isNotificationShowed">
      <div class="note-box">
        <div class="note-title">提示</div>
        <div class="note-content">
          <div class="content-title">{{shouldTrace ? `确定要追号${Object.keys(chosenTraceIssue).length}期？`
            :`确定要加入${currentIssue.issue}期？`}}
          </div>
          <div class="solo-hint" v-if="hasSoloOrder">投注包含单挑注单，单挑注单盈利上限为3万元</div>
          <div class="infos">

            <div
                class="order-info not-solo"
                :class="{'not-solo':!order.solo}"
                v-for="order in betOrders"
            >
              <div class="top">
                <span class="solo">单挑</span>
                <span class="mode">{{order.modeObject.name}}</span>
                <span class="method">{{order.descPrefix}}</span>
                <span class="money">{{order.moneyFormatted}}元</span>
              </div>
              <div class="bottom">
                号码：<span>{{order.descSuffix}}</span>
              </div>
            </div>

          </div>
          <div class="total-money">总金额:<span>{{shouldTrace ?totalTraceMoney:totalMoney}}</span></div>
        </div>
        <div class="note-bottom">
          <div class="left">
            <div class="clear-solo-btn" @click="filterSoloOrder"
                 v-if="betOrders.filter(order => order.solo).length > 0">清除单挑
            </div>
          </div>
          <div class="right">
            <div class="cancel" @click="closeNotification">取消</div>
            <div class="confirm" @click="bet">确定</div>
          </div>
        </div>
      </div>
    </div>
    <div class="trace-modal" v-show="isTracePanelShowed">
      <div class="trace-box">
        <div class="trace-head">
          <i></i>追号设置
          <div class="close-trace-btn" @click="isTracePanelShowed = false"></div>
        </div>
        <div class="trace-tabs">
          <div class="left">
            <div class="tab" :class="{active:currentTraceModel === 'profit'}"
                 @click="changeCurrentTraceModel('profit')">利润率追号
            </div>
            <div class="tab" :class="{active:currentTraceModel === 'same'}" @click="changeCurrentTraceModel('same')">
              同倍追号
            </div>
            <div class="tab" :class="{active:currentTraceModel === 'multiple'}"
                 @click="changeCurrentTraceModel('multiple')">翻倍追号
            </div>
          </div>
          <div class="right" @click="shouldStopAfterWin = !shouldStopAfterWin">
            <span :class="{checked:shouldStopAfterWin}"></span>
            中奖后停止追号
          </div>
        </div>
        <div class="controls">
          <div class="left">
            <div class="group">
              <span class="label">追号倍数: </span>
              <div class="number-input">
                <div class="minus" @click="currentTraceTime--">-</div>
                <input type="number" class="number" v-model="currentTraceTime"
                       @change="validateNumber('currentTraceTime',1,99999)">
                <div class="plus" @click="currentTraceTime++">+</div>
              </div>
            </div>
            <div class="group" v-if="currentTraceModel === 'profit'">
              <span class="label">最低收益: </span>
              <div class="number-input">
                <div class="minus" @click="currentTraceProfit--">-</div>
                <input type="number" class="number" v-model="currentTraceProfit"
                       @change="validateNumber('currentTraceProfit',1,999)">
                <div class="plus" @click="currentTraceProfit++">+</div>
              </div>
            </div>
            <div class="group" v-if="currentTraceModel === 'multiple'">
              <span class="label">隔</span>
              <div class="number-input">
                <div class="minus" @click="currentTraceGap--">-</div>
                <input type="number" class="number" v-model="currentTraceGap"
                       @change="validateNumber('currentTraceGap',1,999)">
                <div class="plus" @click="currentTraceGap++">+</div>
              </div>
              <span class="label">期</span>
            </div>
            <div class="group" v-if="currentTraceModel === 'multiple'">
              <span class="label">倍x</span>
              <div class="number-input">
                <div class="minus" @click="currentTraceMultiple--">-</div>
                <input type="number" class="number" v-model="currentTraceMultiple"
                       @change="validateNumber('currentTraceMultiple',1,99999)">
                <div class="plus" @click="currentTraceMultiple++">+</div>
              </div>
            </div>
            <div class="group">
              <span class="label">追号期数: </span>
              <div class="number-input">
                <div class="minus" @click="currentTraceCount--">-</div>
                <input type="number" class="number" v-model="currentTraceCount"
                       @change="validateNumber('currentTraceCount',1,trackingIssueData.length)">
                <div class="plus" @click="currentTraceCount++">+</div>
              </div>
            </div>
          </div>
          <div class="right" @click="generateChosenTraceIssue">
            <input type="button" value="生成">
          </div>
        </div>
        <div class="table-box">
          <table cellpadding="0" cellspacing="0">
            <tbody>
            <tr>
              <th>操作</th>
              <th>追号</th>
              <th>奖期</th>
              <th>倍数</th>
              <th>金额</th>
              <th>开奖时间</th>
            </tr>
            <tr v-for="(trackingIssue,index) in trackingIssueData">
              <td @click="switchTraceIssue(trackingIssue.issue)">
                <span class="check-btn" :class="{checked:chosenTraceIssue.hasOwnProperty(trackingIssue.issue)}"></span>
              </td>
              <td>{{index + 1}}</td>
              <td class="issue">{{trackingIssue.issue}}</td>
              <td class="times">
                <input type="number" class="input" :value="chosenTraceIssue[trackingIssue.issue]"
                       :disabled="!chosenTraceIssue.hasOwnProperty(trackingIssue.issue)"
                       @input="setTrace(trackingIssue.issue,$event.target.value)"
                       @blur="validateTimes(trackingIssue.issue)">倍
              </td>
              <td>
                <span class="red">
                  ￥ {{calcMoney(trackingIssue.issue)}}
                </span>
              </td>
              <td>
                {{trackingIssue.drawtime
                }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="handle">
          <div class="info-box">
            单期注数：
            <b class="nums-per-issue">{{totalNums}}</b>
            追号总期数：
            <b class="total-issues">{{Object.keys(chosenTraceIssue).length}}</b>
            追号总金额：
            <b class="total-money">{{totalTraceMoney}}</b>
          </div>
          <div class="final-btns">
            <div class="cancel" @click="cancelTrace">取消追号</div>
            <div class="confirm" @click="confirmTrace">确认追号</div>
          </div>
        </div>
      </div>

    </div>
    <div class="lottery-main">
      <div class="lottery-head">
        <div class="logo" :class="['logo-'+$route.params.lotteryName]"></div>
        <div class="time-box">
          <div class="left">
            <div class="current-issue">当前在售<span :class="{active:remainSeconds< 10}">{{currentIssue.issue}}</span>期
            </div>
            <div class="infos">
              <div class="favorite" :class="{'not-collected':favorites.indexOf(currentLotteryName) === -1}"
                   @click="addToFavorite(currentLotteryName)"><span class="star"></span>{{favorites.indexOf(currentLotteryName)
                === -1 ? '收藏' : '已收藏'}}
              </div>
              <div class="bet-time">投注时间</div>
              <div class="bell" @click="switchSound" :class="{active:isSoundOpened}"></div>
            </div>
          </div>
          <div class="right">
            <div class="time hours">
              <div class="time-wrapper" :class="{active: isClockHourActive}">
                <div class="next-num time-num">{{clockNextHour}}</div>
                <div class="current-num time-num">{{clockHour}}</div>
              </div>
            </div>
            <span class="division">:</span>
            <div class="time minutes">
              <div class="time-wrapper" :class="{active: isClockMinuteActive}">
                <div class="next-num time-num">{{clockNextMinute}}</div>
                <div class="current-num time-num">{{clockMinute}}</div>
              </div>
            </div>
            <span class="division">:</span>

            <div class="time seconds">
              <div class="time-wrapper" :class="{active: isClockSecondActive}">
                <div class="next-num time-num">{{clockNextSecond}}</div>
                <div class="current-num time-num">{{clockSecond}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="result-box">
          <div class="left">
            <div class="last-issue">20181118-1192期</div>
            <div class="hint-box">
              <span class="text">中奖提醒</span>
              <div class="notify-switcher" :class="{active : shouldPrizeNotificationShowed}"
                   @click="switchPrizeNotification"></div>
            </div>

          </div>
          <div class="right">
            <div class="issue-box" v-if="isBallShowed && lastIssue">
              <div class="lottery_num_box code-ball" v-for="(code,index) in lastIssue.split_code"
                   :class="['issueBox' + index]">{{code}}
              </div>
            </div>
          </div>

        </div>

      </div>
      <div class="lottery-body">
        <div class="select-area">
          <div class="left">
            <div class="method-head">
              <div
                  v-for="method in playMethods.labels"
                  @click="changeMethod(method)"
                  class="method"
                  :class="{active: method === currentMethod}"
              >{{method.title}}
              </div>
            </div>
            <div class="label-body">
              <div
                  class="type"
                  v-for="type in currentMethod.labels"
              >
                <div class="type-cell">{{type.title}}</div>
                <div
                    class="label"
                    :class="{active:currentLabel === label}" v-for="label in type.labels"
                    @click="changeLabel(label)"
                >{{label.description}}
                </div>
              </div>
              <div class="position-choose-box" v-if="currentLabel.selectarea &&currentLabel.selectarea.selPosition">

                <span>选择位置：</span>
                <div class="pos-box">
                  <input type="checkbox" id="wan" :value="1" v-model="currentLabel.chosenPosition">
                  <label for="wan">万位</label>
                </div>
                <div class="pos-box">
                  <input type="checkbox" id="qian" :value="2" v-model="currentLabel.chosenPosition">
                  <label for="qian">千位</label>
                </div>
                <div class="pos-box">
                  <input type="checkbox" id="bai" :value="3" v-model="currentLabel.chosenPosition">
                  <label for="bai">百位</label>
                </div>
                <div class="pos-box">
                  <input type="checkbox" id="shi" :value="4" v-model="currentLabel.chosenPosition">
                  <label for="shi">十位</label>
                </div>
                <div class="pos-box">
                  <input type="checkbox" id="ge" :value="5" v-model="currentLabel.chosenPosition">
                  <label for="ge">个位</label>
                </div>
              </div>
              <div class="rebate-select" v-if="currentLabel.prize_group">
                <select name="" id="" v-model="prizeModel">
                  <option v-for="prize in currentLabel.prize_group" :value="prize.value">{{prize.label}}</option>
                </select>
              </div>
            </div>
            <div class="bet-area">
              <div class="bet-head">
                <div class="instruction">
                  <div class="instruction-instrc">
                    <i class="icon_sm"></i>说明
                    <div class="desc-panel" v-html="currentLabel.methoddesc">
                    </div>
                  </div>
                  <div class="instruction-example">
                    <i class="icon_sl"></i>示例
                    <div class="desc-panel" v-html="currentLabel.methodexample">
                    </div>
                  </div>
                  <div class="instruction-help">
                    <i class="icon_bz"></i>帮助
                    <div class="desc-panel" v-html="currentLabel.methodhelp">
                    </div>
                  </div>
                </div>
              </div>
              <div class="bet-body" v-if="currentLabel.selectarea && currentLabel.selectarea.type !=='input'">
                <div
                    class="each"
                    v-for="(layout,index) in currentLabel.selectarea.layout"
                    :class="{follow: index>0 && currentLabel.selectarea.layout[index-1].place === layout.place}"
                >
                  <div class="code-box">
                    <div class="layout-title" :class="{hide:!layout.title}">
                      {{layout.title}}
                    </div>
                    <div class="balls">
                      <div
                          class="ball"
                          v-for="no in layout.splitNum" @click="chooseNum(no,layout.position)"
                          :class="{active:betCodeArr[layout.position].indexOf(no) !== -1}">{{no}}
                      </div>
                    </div>
                    <div
                        class="short-cuts"
                        v-if="!(!currentLabel.selectarea.isButton && currentLabel.selectarea.type ==='digital')"
                    >
                      <div
                          class="short-cut"
                          @click="quickChoose('全',layout)"
                      >全
                      </div>
                      <div
                          class="short-cut"
                          v-if="currentLabel.selectarea.type ==='digital'"
                          @click="quickChoose('大',layout)"
                      >大
                      </div>
                      <div
                          class="short-cut"
                          v-if="currentLabel.selectarea.type ==='digital'"
                          @click="quickChoose('小',layout)"
                      >小
                      </div>
                      <div
                          class="short-cut"
                          v-if="currentLabel.selectarea.type ==='digital'"
                          @click="quickChoose('奇',layout)"
                      >奇
                      </div>
                      <div
                          class="short-cut"
                          v-if="currentLabel.selectarea.type ==='digital'"
                          @click="quickChoose('偶',layout)"
                      >偶
                      </div>
                      <div
                          class="short-cut"
                          @click="quickChoose('清',layout)"
                      >清
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add-order-box">
                <div class="handle-line">
                  <div class="times-modes">
                    <div class="times">
                      <span class="minus">-</span>
                      <input type="number" class="times-input" v-model="currentMultiple"
                             @change="validateNumber('currentMultiple',1,99999)">
                      <span class="add">+</span>
                      <span class="text">倍</span>
                    </div>
                    <div class="modes">
                      <div class="mode" :class="{active:currentMoneyMode === moneyMode}"
                           v-for="moneyMode in currentLabel.money_modes"
                           @click="changeMoneyMode(moneyMode)">{{moneyMode.name}}
                      </div>
                    </div>
                  </div>
                  <div class="handle-btns">

                    <div class="bet-immediate handler" :class="{disabled:disabled}" @click="betImmediately">一键投注</div>
                    <div class="add-order handler" :class="{disabled:disabled}" @click="addOrder">+&nbsp;&nbsp;添加投注
                    </div>
                  </div>
                </div>
                <div class="money-line">
                  已选 <span class="bet-num">{{nums}}</span> 注&nbsp;&nbsp;共 <span class="total-money">{{cost}}</span> 元
                </div>
              </div>
            </div>
            <div class="right">
              <div class="history-head">
                近期开奖
                <a href="" class="history-line">走势图</a>
              </div>
              <div class="table-head">
                <span class="issue">期号</span>
                <span class="code">开奖号码</span>
                <span class="form" v-if="historyCodePattern.patternCate">{{historyCodePattern.patternCate}}</span>
              </div>
              <div class="table-body">
                <div class="history-code" v-for="(historyIssue,issueIndex) in historyIssueData">
                  <span class="code-issue">{{historyIssue.issue.slice(4)}}</span>
                  <span class="code-number">
                    <span
                        v-for="(code,index) in historyIssue.split_code"
                        :class="{active: historyCodePattern[issueIndex].codeObjs[index].isActive}">{{code}}
                    </span>
                  </span>
                  <span class="code-form" v-if="historyCodePattern[issueIndex].patternName">
                  <span
                      :class="[historyCodePattern[issueIndex].patternClassName]">{{historyCodePattern[issueIndex].patternName}}</span>
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div class="order-area">
          <div class="left">
            <table>
              <thead>
              <tr class="cleanall">
                <th>玩法与投注号码</th>
                <th>模式</th>
                <th>资金模式</th>
                <th width="10%">倍率</th>
                <th>注数</th>
                <th>金额</th>
                <th><a class="delete-all">清空</a></th>
              </tr>
              </thead>
              <tbody>
              <tr class="lottery" v-for="(order,index) in betOrders">
                <th>
                  <span>{{order.desc}}</span>
                </th>
                <td>{{currentLabel.prize_group[order.omodel].label.split(' ')[1].split('-')[0]}}</td>
                <td>
                  <select class="select-mode" id="selectValue0" :value="order.mode" @input="changeOrderMode(order,$event.target.value)">
                    <option v-for="(moneyMode,index) in currentLabel.money_modes" :value="moneyMode.modeid">{{moneyMode.name}}
                    </option>
                  </select>
                </td>
                <td>
                  <div class="times">
                    <span class="minus" @click="decreaseOrderTime(order)">-</span><input
                      maxlength="5"
                      type="number"
                      :value="order.times"
                      @input="changeOrderTime(order,$event.target.value)"
                      @blur="validateOrderTime(order,$event.target.value)"
                      class="times-input"><span
                      class="add" @click="increaseOrderTime(order)">+</span>
                  </div>
                </td>
                <td>{{order.nums}}注</td>
                <td class="blue">{{order.moneyFormatted}}元</td>
                <td class="del"><a class="del-btn" @click="cancelOrder(index)"></a></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="right">
            <div class="top-box">
              <div class="trace-left">
                <div class="count-down">
                  <div class="time-icon"></div>
                  <div class="time">
                    {{hour}}:{{minute}}:{{second}}
                  </div>
                </div>
                <div class="trace-btns">
                  <div class="check-box" @click="openTracePanel" :class="{active:shouldTrace}">
                    <span class="check"></span>
                    <span>追号</span>
                  </div>
                  <div class="trace-cancel" @click="cancelTrace">取消
                  </div>
                </div>
              </div>
              <div class="submit-btn">立即投注</div>
            </div>
            <div class="all-order-desc">
              <p>已选 <span>{{betOrders.length}}</span> 单 共计 <span>{{totalNums}}</span> 注</p>
              <p>总金额 <span>{{shouldTrace ?totalTraceMoney:totalMoney}}</span> 元</p>
            </div>
          </div>

        </div>
        <div class="bet-history-area">
          <div class="bet-history-head">
            <div class="head-left">投注记录</div>
            <div class="head-right">
              <div class="refresh-btn" @click="getBetRecord">刷新</div>
              <span class="more-btn">...<span>更多</span></span>

            </div>
          </div>
          <div class="bet-history-table">
            <table>
              <tbody>
              <tr>
                <th width="14%">投注时间</th>
                <th>彩种</th>
                <th width="12%">期号</th>
                <th>玩法</th>
                <th width="14%">投注内容</th>
                <th>投注金额</th>
                <th>奖金</th>
                <th width="12%">开奖号码</th>
                <th width="95">状态(点击查看)</th>
              </tr>
              <tr v-for="betRecord in betRecords">
                <td>{{betRecord.bet_time}}</td>
                <td>{{betRecord.lottery_name}}</td>
                <td>{{betRecord.issue}}</td>
                <td>{{betRecord.method_name}}</td>
                <td>{{betRecord.bet_code}}</td>
                <td>{{betRecord.bet_money}}</td>
                <td>{{betRecord.prize_money}}</td>
                <td>{{betRecord.draw_code}}</td>
                <td>{{betRecord.status}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="favorite-panel">
        <div class="panel-head">
          <i class="star"></i>
          <i class="my-collection"></i>
          <span class="edit">添加/编辑</span>
        </div>
        <div class="panel-content">
          <div class="item" v-for="favorite in favorites" :class="{active: favorite === currentLotteryName}"
               @click="navToBet(favorite)">
            <div class="lottery-name">
              <div class="name">{{allLottery.find(lottery => lottery.flaglot === favorite).name}}</div>
              <div class="countdown">{{convertSecondsToTime(remainingSecondsObj[favorite]).str}}</div>
            </div>
            <div class="progress">
              <b
                  class="progress-bar"
                  :class="{'last-ten':remainingSecondsObj[favorite] < 10}"
                  :style="{width:100 - remainingSecondsObj[favorite] * 1000 * 100 / ( new Date(saleendObj[favorite]) -new Date(salestartObj[favorite])) + '%' }"></b>
            </div>
          </div>
          <div class="edit">
            <span class="show-all">
              全部彩种
            <i class="arrow"></i>
            </span>
            <div class="all-lottery">
              <div class="category" v-for="cate in lotteryCate">
                <div class="title">{{cate.categoryName}}:</div>
                <div class="lottery-items">
                  <div
                      class="lottery-item"
                      :class="[favorites.indexOf(lottery.flaglot) > -1 ? 'check':'uncheck']"
                      v-for="lottery in cate.lotterys"
                      @click="navToBetFromFavor(lottery.flaglot,$event)"
                  >
                    <a
                        :class="[favorites.indexOf(lottery.flaglot) > -1 ? 'check':'uncheck']"
                        @click="switchFavorite(lottery.flaglot)"
                        :ref="lottery.flaglot"
                    >
                      <span class="starFavor">
                        {{favorites.indexOf(lottery.flaglot) > -1 ? '取消收藏':'加入收藏'}}
                        <i class="triangle-down"></i>
                      </span>
                    </a>
                    <span class="lotteryName">{{lottery.name}}</span>


                  </div>
                </div>
              </div>
              <div class="favor-instruct">
                <div class="title">收藏说明</div>
                <span>
                  点击彩种名称前的
                  <i class="star"></i>
                   可以添加或取消收藏，最多可同时收藏10个彩种
                </span>
              </div>
            </div>
          </div>
          <div class="hidden-menu">
            <i></i>
            <span>隐藏菜单</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import {axios} from '@/initMethods'
  import ALGORS from '@/utils/numsAlgors'
  import {generateTrackIssueMap, generateTrackIssue} from '@/utils/generateTrackIssues.js'
  import {setLocal, getLocal, updateLocal} from "@/utils/localStorageHandlers";
  import {convertSecondsToTime,getDateString} from "@/utils/dateUtils";

  import isSole from '@/utils/isSolo'
  import numeral from 'numeral'
  import BetHeader from '@/components/BetHeader.vue'
  import HeaderNav from '@/components/HeaderNav.vue'
  import SideBar from '@/components/SideBar.vue'


  export default {
    name: 'bet',
    data() {
      this.isClockSecondActive = false
      this.isClockMinuteActive = false
      this.isClockHourActive = false

      let remainSeconds = this.$store.state.remainingSecondsObj[this.$route.params.lotteryName]
      let time = this.convertSecondsToTime(remainSeconds)
      let nextTime = this.convertSecondsToTime(remainSeconds - 1)

      return {
        favorites: [],
        clockSecond: time.second,
        clockMinute: time.minute,
        clockHour: time.hour,
        clockNextSecond: nextTime.second,
        clockNextMinute: nextTime.minute,
        clockNextHour: nextTime.hour,
        isClockSecondActive: false,
        isClockMinuteActive: false,
        isClockHourActive: false,

        isBallShowed: true,
        isHistoryShowed: false,
        isTracePanelShowed: false,
        isNotificationShowed: false,
        isPanelShowed: true,
        isBalanceShowed: true,
        remainMilSeconds: 0,
        timer: null,
        betRecords: [],

        trackingIssueData: [],
        historyIssueData: [],
        playMethods: {},
        currentMethod: {},
        currentLabel: {},
        betCodeArr: [[]],
        singleTypeInput: '',
        currentMoneyMode: {},
        currentMultiple: 1,

        prizeModel: "1",
        codes: '',
        betOrders: [],
        params: {
          "lt_total_nums": 1,
          "lt_total_money": "0.020",
          "lt_project": [{
            "money": 0.02,
            "mode": 3,
            "codes": "2|2|2",
            "times": 1,
            "poschoose": null,
            "nums": 1,
            "desc": "[后三码_复式]-,-,2,2,2",
            "omodel": 2,
            "menuid": 338056,
            "type": "digital",
            "id": 1539771621762,
            "methodid": 6201005,
            "solo": true
          }],
          "lt_issue_start": "20181017-1102",
          "lt_trace_if": "no",
          "lotteryid": "28",
          "play_source": 1,
          "curmid": "338050",
          "lt_trace_count_input": 10,
          "lt_trace_issues": {},
          "lt_trace_money": null,
          "lt_trace_times_diff": 2,
          "lt_trace_times_same": 1,
          "lt_trace_stop": "yes",
          "lt_trace_diff": 1,
          "lt_trace_times_margin": 1,
          "lt_trace_margin": 50,
          "nonce": "ed22ca54fd164be9d981b770023f7fb0"
        },
        prize_group: [{value: 1, label: "奖金 1800.00-7.5%"}, {value: 2, label: "奖金 1950.00-0.0%"}],

        //追号面板数据
        currentTraceModel: 'profit',
        currentTraceTime: 1,
        currentTraceProfit: 50,
        currentTraceGap: 1,
        currentTraceMultiple: 2,
        currentTraceCount: 10,
        shouldStopAfterWin: true,
        chosenTraceIssue: {},

        totalMoney: '',
        totalNums: '',
      }
    },
    computed: {
      ...mapState([
        'profile',
        'shouldPrizeNotificationShowed',
        'lotteryCate',
        'isRefreshingBalance',
        'remainingSecondsObj',
        'salestartObj',
        'saleendObj',
        'isSoundOpened'
      ]),
      ...mapGetters(['allLottery', 'currentTime']),
      /*currentLotteryId(){
        let id
        this.lotteryCate.find(cate =>{
          return cate.find(lottery =>{
            if(lottery.flaglot === this.currentLotteryName){
              id = lottery.lotteryId
              return true
            }else {
              return false
            }
          })
        })
        return id

      },*/
      currentLotteryId() {
        return String(this.currentLottery.lotteryId)
      },
      currentLotteryName() {
        return this.$route.params.lotteryName
      },
      currentLottery() {
        return this.allLottery.find((lottery) => {
          return lottery.flaglot === String(this.currentLotteryName)
        })
      },
      remainSeconds() {
        return this.remainingSecondsObj[this.currentLotteryName]
      },
      hour() {
        return ('0' + parseInt(this.remainSeconds / 3600)).slice(-2)
      },
      minute() {
        return ('0' + parseInt((this.remainSeconds - this.hour * 3600) / 60)).slice(-2)
      },
      second() {
        return ('0' + parseInt(this.remainSeconds - this.hour * 3600 - this.minute * 60)).slice(-2)
      },
      historyCodePattern() {
        let method = this.currentMethod.title + this.currentLabel.name
        if (!method.indexOf) {
          return []
        }
        let mapRes = this.historyIssueData.map(historyIssue => {
          let res = {}
          res.codeObjs = historyIssue.split_code.map((code, index) => {
            let codeObj = {}
            codeObj.code = code
            if (method.indexOf('前三') > -1 && [0, 1, 2].indexOf(index) > -1
              || method.indexOf('中三') > -1 && [1, 2, 3].indexOf(index) > -1
              || method.indexOf('后三') > -1 && [2, 3, 4].indexOf(index) > -1
              || method.indexOf('前二') > -1 && [0, 1].indexOf(index) > -1
              || method.indexOf('后二') > -1 && [3, 4].indexOf(index) > -1
              || method.indexOf('万') > -1 && index === 0
              || method.indexOf('千') > -1 && index === 1
              || method.indexOf('百') > -1 && index === 2
              || method.indexOf('十') > -1 && index === 3
              || method.indexOf('个') > -1 && index === 4 || ['前三', '中三', '后三', '前二', '后二', '万', '千', '百', '十', '个'].every(str => method.indexOf(str) === -1)) {
              codeObj.isActive = true
            }
            return codeObj
          })
          return res
        })
        //确定形态种类
        if (method.indexOf('跨度') > -1) {
          mapRes.patternCate = '直选跨度'
          mapRes.forEach((issue) => {
            let patternCodes = issue.codeObjs.filter((codeObj) => {
              return codeObj.isActive
            }).map(codeObj => codeObj.code)
            let max = Math.max(...patternCodes)
            let min = Math.min(...patternCodes)
            let abs = Math.abs(max - min)
            issue.patternName = abs
            issue.patternClassName = 'abs'

          })
        } else if ((method.indexOf('和值尾数') > -1)) {
          mapRes.patternCate = '和值尾数'
          mapRes.forEach((issue) => {
            let patternCodes = issue.codeObjs.filter((codeObj) => {
              return codeObj.isActive
            }).map(codeObj => codeObj.code)
            let sum = String(patternCodes.reduce((a, b) => Number(a) + Number(b), 0)).slice(-1);
            issue.patternName = sum
            issue.patternClassName = 'sum'
          })
        } else if (method.indexOf('和值') > -1) {
          mapRes.patternCate = '和值'
          mapRes.forEach((issue) => {
            let patternCodes = issue.codeObjs.filter((codeObj) => {
              return codeObj.isActive
            }).map(codeObj => codeObj.code)
            let sum = String(patternCodes.reduce((a, b) => Number(a) + Number(b), 0));
            issue.patternName = sum
            issue.patternClassName = 'sum'
          })
        } else if (method.indexOf('龙虎') > -1) {
          mapRes.patternCate = '形态'
          mapRes.forEach((issue) => {
            let patternCodes = issue.codeObjs.filter((codeObj) => {
              return codeObj.isActive
            }).map(codeObj => codeObj.code)
            if (patternCodes[0] > patternCodes[1]) {
              issue.patternName = '龙'
              issue.patternClassName = 'long'
            } else if (patternCodes[0] === patternCodes[1]) {
              issue.patternName = '-'
              issue.patternClassName = ''
            } else {
              issue.patternName = '虎'
              issue.patternClassName = 'hu'
            }

          })
        } else if (method.indexOf('前三') > -1 || method.indexOf('中三') > -1 || method.indexOf('后三') > -1) {
          mapRes.patternCate = '三星形态'
          mapRes.forEach((issue) => {
            let patternCodes = issue.codeObjs.filter((codeObj) => {
              return codeObj.isActive
            }).map(codeObj => codeObj.code)
            let Duplicated = Array.from(new Set(patternCodes))
            if (Duplicated.length === 1) {
              issue.patternName = '-'
              issue.patternClassName = ''
            } else if (Duplicated.length === 2) {
              issue.patternName = '组三'
              issue.patternClassName = 'zu3'
            } else {
              issue.patternName = '组六'
              issue.patternClassName = 'zu6'
            }
          })
        } else {
          mapRes.patternCate = ''
          mapRes.forEach((issue) => {
            issue.patternName = ''
            issue.patternClassName = ''
          })
        }
        return mapRes
      },
      //当前正在下注的期
      currentIssue() {
        return this.trackingIssueData.length > 0 ? this.trackingIssueData[0] : {}
      },
      //最后开奖的期
      lastIssue() {
        return this.historyIssueData[0]
      },
      algor() {
        return ALGORS[this.currentMethodKey]
      },
      cost() {
        //注意模式rate是浮点数，先转换为整数
        return 2 * this.nums * (1000 * this.currentMoneyMode.rate) * this.currentMultiple / 1000
      },
      //注数
      nums() {
        if (this.currentLabel.selectarea && this.currentLabel.selectarea.type === 'input') {
          return this.algor(this.singleTypeInput, this.currentLabel.chosenPosition).num
        }
        if (this.algor) {
          //传入show_str以确定在betCodeArr哪些index上是有效的
          return this.algor(this.betCodeArr, this.currentLabel.show_str, this.currentLabel.chosenPosition)
        } else {
          return 0
        }
      },


      totalTraceMoney() {
        let num = 0
        num = numeral(num)
        for (let issue in this.chosenTraceIssue) {
          if (this.chosenTraceIssue.hasOwnProperty(issue)) {
            num.add(this.calcMoney(issue))
          }
        }
        return num.format('0.000')
      },
      shouldTrace() {
        return Object.keys(this.chosenTraceIssue).length > 0
      },
      currentMethodKey() {
        return `${this.currentMethod.title}&${this.currentLabel.name}`
      },
      //是否可以投注
      disabled() {
        if (this.nums === 0) {
          return true
        } else {
          return false
        }
      },
      hasSoloOrder() {
        return this.betOrders.some((order) => order.solo)
      },
    },
    watch: {
      remainSeconds(val, oldVal) {

        //播放倒计时声音
        if (val < 10 && this.isSoundOpened) {
          this.$refs['sound'].play()
        }

        let nextVal = val - 1
        let nextTime = this.convertSecondsToTime(nextVal)
        let nextHour = nextTime.hour
        let nextMinute = nextTime.minute
        let nextSecond = nextTime.second
        if (oldVal - val !== 1) {
          this.clockSecond = this.second
          this.clockMinute = this.minute
          this.clockHour = this.hour

          this.clockNextSecond = nextSecond
          this.clockNextMinute = nextMinute
          this.clockNextHour = nextHour
        } else {
          let oldTime = this.convertSecondsToTime(oldVal)
          let time = this.convertSecondsToTime(val)
          if (oldTime.second !== time.second) {
            this.isClockSecondActive = true
          }
          if (oldTime.minute !== time.minute) {
            this.isClockMinuteActive = true
          }
          if (oldTime.hour !== time.hour) {
            this.isClockHourActive = true
          }
          setTimeout(() => {
            this.isClockSecondActive = false
            this.isClockMinuteActive = false
            this.isClockHourActive = false
            this.clockSecond = this.second
            this.clockMinute = this.minute
            this.clockHour = this.hour

            this.clockNextSecond = nextSecond
            this.clockNextMinute = nextMinute
            this.clockNextHour = nextHour
          }, 300)
        }

      },
      currentLabel() {
        console.log('lable changing!');
        //下注格式， |和值，大小： "X" | 前三："X,X,X,-,-" | 任选 "X,X,X,X,X"
        let showStr = this.currentLabel.show_str
        let showStrArr = showStr.split(',')
        let length = showStrArr.length
        //初始化betCodeArr
        let betCodeArr = []
        for (let i = 0; i < length; i++) {
          betCodeArr.push([])
        }
        this.betCodeArr = betCodeArr
        //给这一排layout加上它在betCodeArr中的实际index
        //type === input类型的区域不存在layout属性
        if (this.currentLabel.selectarea.layout) {
          this.currentLabel.selectarea.layout.forEach((layout) => {
            layout.splitNum = layout.no.split('|')
            let xFound = -1
            showStrArr.forEach((str, index) => {
              if (str === 'X') {
                xFound++
                if (xFound === layout.place) {
                  layout.position = index
                }
              }
            })
          })
        }
        //将已经选择的位置存入，用来退出时缓存
        if (this.currentLabel.selectarea.selPosition && !this.currentLabel.chosenPosition) {

          switch (this.currentMethod.title) {
            case '任选二':
              this.$set(this.currentLabel, 'chosenPosition', [4, 5])
              break;
            case '任选三':
              this.$set(this.currentLabel, 'chosenPosition', [3, 4, 5])
              break;
            case '任选四':
              this.$set(this.currentLabel, 'chosenPosition', [2, 3, 4, 5])
              break;
          }
        }
        this.currentMoneyMode = this.currentLabel.money_modes[0]
      },
      /*isTracePanelShowed: {
        handler(newName, oldName) {
          if (this.isTracePanelShowed === true) {
            document.body.style.overflow = 'hidden'
          } else {
            document.body.style.overflow = 'auto'
          }
        },
        immediate: true
      },*/
      historyIssueData() {
        this.isBallShowed = false
        setTimeout(() => {
          this.isBallShowed = true
        }, 20)
      },
      betOrders: {
        handler() {
          let totalMoney = numeral(0)
          let totalNums = numeral(0)
          this.betOrders.forEach((order) => {
            totalMoney.add(order.money)
            totalNums.add(order.nums)
          })
          this.totalMoney = totalMoney.format('0.000')
          this.totalNums = totalNums.format('0')

          this.clearAllTrace()
        },
        deep: true,
        immediate: true
      },
      //校验追号参数
      /*currentTraceTime() {
        let currentTraceTime = parseInt(this.currentTraceTime)
        if (Number.isNaN(currentTraceTime) || currentTraceTime <= 0) {
          this.currentTraceTime = 1
        } else {
          this.currentTraceTime = Math.min(currentTraceTime, 99999)
        }
      },*/
      /* currentTraceProfit() {
         let currentTraceProfit = parseInt(this.currentTraceProfit)
         if (Number.isNaN(currentTraceProfit) || currentTraceProfit <= 0) {
           this.currentTraceProfit = 1
         } else {
           this.currentTraceProfit = Math.min(currentTraceProfit, 999)
         }
       },
       currentTraceGap() {
         let currentTraceGap = parseInt(this.currentTraceGap)
         if (Number.isNaN(currentTraceGap) || currentTraceGap <= 0) {
           this.currentTraceGap = 1
         } else {
           this.currentTraceGap = Math.min(currentTraceGap, 99999)
         }
       },
       currentTraceMultiple() {
         let currentTraceMultiple = parseInt(this.currentTraceMultiple)
         if (Number.isNaN(currentTraceMultiple) || currentTraceMultiple <= 0) {
           this.currentTraceMultiple = 1
         } else {
           this.currentTraceMultiple = Math.min(currentTraceMultiple, 99999)
         }
       },
       currentTraceCount() {
         let currentTraceCount = parseInt(this.currentTraceCount)
         if (Number.isNaN(currentTraceCount) || currentTraceCount <= 0) {
           this.currentTraceCount = 1
         } else {
           this.currentTraceCount = Math.min(currentTraceCount, 200)
         }
       },*/
    },
    methods: {
      ...mapMutations([
        'switchSound', 'showModal', 'showToast', 'closeToast', 'switchPrizeNotification'
      ]),
      ...mapActions(['refreshBalance']),
      navToBetFromFavor(lotteryName, event) {

        if (!this.$refs[lotteryName][0].contains(event.target)) {
          this.$router.push({
            name: 'bet',
            params: {
              lotteryName,
            }
          })
        }
      },
      navToBet(lotteryName) {
        this.$router.push({
          name: 'bet',
          params: {
            lotteryName,
          }
        })
      },
      addToFavorite(lotteryName) {
        if (this.favorites.indexOf(lotteryName) === -1) {
          this.favorites.unshift(lotteryName)
        }

      },
      switchFavorite(lotteryName) {
        let index = this.favorites.indexOf(lotteryName)
        if (index === -1) {
          this.favorites.unshift(lotteryName)
        } else {
          this.favorites.splice(index, 1)
        }
      },
      convertSecondsToTime(seconds) {
        return convertSecondsToTime(seconds)
      },
      backHome() {

        this.$router.push({
          name: 'home'
        })
      },
      clearInput() {
        this.singleTypeInput = ''
      },
      checkSingleTypeInput(e) {
        let value = e.target.value.replace(/[^,;\s\d]/gi, '')
        this.singleTypeInput = value
      },
      choosePosition(position) {
        let index = this.currentLabel.chosenPosition.indexOf(position)
        if (index > -1) {
          this.currentLabel.chosenPosition.splice(index, 1)
        } else {
          this.currentLabel.chosenPosition.push(position)
        }
      },
      addOrder() {
        //校验是否可以添加
        if (this.nums === 0) {
          return
        }
        let codes
        let descSuffix;


        //input的codes与descSuffix获取与digital不一样

        if (this.currentLabel.selectarea.type === 'input') {
          let algorRes = this.algor(this.singleTypeInput, this.currentLabel.chosenPosition)
          let text = ''

          if (algorRes.wrong) {
            text += `以下号码错误，已进行自动过滤<br>${algorRes.wrong}<br>`
          }
          if (algorRes.same) {
            text += `以下号码重复，已进行自动去重<br>${algorRes.same}<br>`
          }
          if (text) {
            this.showModal({
              text: text
            })
          }
          codes = algorRes.codes;
          descSuffix = algorRes.codes;
        } else {
          descSuffix = this.currentLabel.show_str.split(',').map((str, index) => {
            if (str === 'X') {
              return this.betCodeArr[index].join(this.currentLabel.code_sp)
            }
            return str
          }).join(',');
          codes = this.currentLabel.show_str.split(',').map((str, index) => {
            if (str === 'X') {
              return this.betCodeArr[index].join('&')
            }
            return str
          }).filter(str => str !== '-').join('|')
        }
        //组装订单描述
        let descPrefix = `[${this.currentMethod.title}_${this.currentLabel.name}]`
        let desc = `[${this.currentMethod.title}_${this.currentLabel.name}]${descSuffix}`

        //校验是否已有相同订单
        if (this.betOrders.some(order => order.desc === desc)) {
          this.showModal({
            text: '确认区有相同的投注内容'
          })
          return
        }

        //组装此注参数
        let nums = this.nums
        let modeObject = this.currentMoneyMode
        let mode = this.currentMoneyMode.modeid
        let money = this.cost
        let moneyFormatted = numeral(money).format('0.000')
        let times = this.currentMultiple
        let omodel = this.prizeModel
        let menuid = this.currentLabel.menuid
        let type = this.currentLabel.selectarea.type
        let id = +new Date()
        let methodid = this.currentLabel.methodid
        let poschoose = this.currentLabel.chosenPosition ? this.currentLabel.chosenPosition.sort().join(',') : null
        let chosenPositionsNum = poschoose ? this.currentLabel.chosenPosition.length : this.betCodeArr.filter(arr => arr.length > 0).length
        let solo = isSole(this.currentMethodKey, nums, chosenPositionsNum)


        //有些参数下注请求不需要，但模板需要，所以在下注时解构需要的属性
        this.betOrders.push({
          money,
          moneyFormatted,
          modeObject,
          mode,
          codes,
          times,
          poschoose,
          nums,
          desc,
          descSuffix,
          descPrefix,
          omodel,
          menuid,
          type,
          id,
          methodid,
          solo,
        })
        this.clearInput()
        this.clearBetCodeArr()
        //PC不用添加订单时滚动到最底部
        /*this.$nextTick(() => {
          window.scrollTo(0, document.body.scrollHeight);
        })*/
      },
      changeOrderTime(order, value) {
        if (value !== '') {
          order.times = Number(value)
          this.updateOrderMoney(order)
        } else {
          order.times = value
        }
      },
      validateOrderTime(order, value) {
        if (value === '') {
          order.times = 1
          this.updateOrderMoney(order)
        }
      },
      decreaseOrderTime(order) {
        if (order.times > 1) {
          order.times--
        }
      },
      increaseOrderTime(order) {
        order.times++
        this.updateOrderMoney(order)
      },
      changeOrderMode(order,modeid) {
        console.log(modeid);
        let modeObject = this.currentLabel.money_modes.find(moneyMode => moneyMode.modeid === Number(modeid))
        console.log(modeObject);
        order.modeObject = modeObject
        order.mode = modeObject.modeid
        this.updateOrderMoney(order)
      },
      updateOrderMoney(order) {
        order.money = 2 * order.nums * (1000 * order.modeObject.rate) * order.times / 1000
        order.moneyFormatted = numeral(order.money).format('0.000')
      },

      filterSoloOrder() {
        this.betOrders = this.betOrders.filter(order => order.solo !== true)
        if (this.betOrders.length === 0) {
          this.closeNotification()
        }
      },
      betImmediately() {
        if (this.nums === 0) {
          return
        }
        this.clearBetOrders()
        this.addOrder()
        if (this.hasSoloOrder) {
          this.showNotification()
        } else {
          this.bet()
        }
      },
      showNotification() {
        if (this.betOrders.length === 0) {
          return
        }
        this.isNotificationShowed = true
      },
      closeNotification() {
        this.isNotificationShowed = false
      },
      bet() {
        if (this.betOrders.length === 0) {
          return
        }
        let lottery_id = this.currentLotteryId
        let lt_total_nums = this.totalNums
        let lt_total_money = this.totalMoney
        let lt_trace_if = this.shouldTrace
        let lt_issue_start = this.currentIssue.issue
        let lt_trace_issues = this.chosenTraceIssue

        let lt_project = this.betOrders.map((order) => {
          let {
            money,
            mode,
            codes,
            times,
            poschoose,
            nums,
            desc,
            omodel,
            id,
            type,
            methodid,
            menuid
          } = order
          return {
            money,
            mode,
            codes,
            times,
            poschoose,
            nums,
            desc,
            omodel,
            id,
            type,
            methodid,
            menuid
          }
        })
        axios({
          url: 'lottery/bet',
          method: 'post',
          data: {
            lottery_id,
            lt_total_nums,
            lt_total_money,
            lt_trace_if,
            lt_issue_start,
            lt_project,
            lt_trace_issues
          },
          loading: true
        }).then(() => {
          this.showToast({
            text: '投注成功'
          })
        })
        this.clearBetOrders()
        this.closeNotification()
      },
      //清除某位上所有数字
      clearChooseOnPosition(position) {
        this.$set(this.betCodeArr, position, [])
        /* let positionArr = this.betCodeArr[position]
         let length = positionArr.length
         //vue对数组元素直接赋值无法触发watcher
         for (let i = 0; i < length; i++) {
           positionArr.shift()
         }*/
      },
      //清除所有数字
      clearBetCodeArr() {
        let length = this.betCodeArr.length
        for (let i = 0; i < length; i++) {
          this.clearChooseOnPosition(i)
        }
      },
      //清除订单
      clearBetOrders() {
        this.betOrders = []
      },
      cancelOrder(index) {
        this.betOrders.splice(index, 1)
      },
      decreaseMultiple() {
        this.currentMultiple--
      },
      increaseMultiple() {
        this.currentMultiple++
      },
      validateNumber(key, min, max) {
        if (this[key] <= (min - 1)) {
          this[key] = 1
        } else if (this[key] > max) {
          this[key] = max
        }
      },
      changeMoneyMode(modeid) {
        this.currentMoneyMode = modeid
      },
      chooseNum(num, position) {
        let positionArr = this.betCodeArr[position]
        let index = positionArr.indexOf(num)
        if (index === -1) {
          positionArr.push(num);
          //此处不会触发渲染，但模板中没有用到顺序的地方，所以无碍
          positionArr.sort()
        } else {
          positionArr.splice(index, 1)
        }
      },
      quickChoose(caseLetter, layout) {
        let position = layout.position
        this.clearChooseOnPosition(position)
        let positionArr = this.betCodeArr[position]
        let midNum = parseInt(layout.splitNum.length / 2)
        switch (caseLetter) {
          case '全':
            layout.splitNum.forEach((num) => {
              positionArr.push(num)
            });
            break;
          case '大':
            layout.splitNum.forEach((num, index) => {
              if (index >= midNum) {
                positionArr.push(num)
              }
            });
            break;
          case '小':
            layout.splitNum.forEach((num, index) => {
              if (index < midNum) {
                positionArr.push(num)
              }
            });
            break;
          case '奇':
            layout.splitNum.forEach((num) => {
              if (num % 2 === 1) {
                positionArr.push(num)
              }
            });
            break;
          case '偶':
            layout.splitNum.forEach((num) => {
              if (num % 2 === 0) {
                positionArr.push(num)
              }
            });
            break;
        }
      },

      showExample() {
        this.showModal({
          text: this.currentLabel.methodexample
        })
      },
      showHelp() {
        this.showModal({
          text: this.currentLabel.methodhelp
        })
      },
      changeMethod(method) {
        this.currentMethod = method
        this.currentLabel = method.labels[0].labels[0]
      },
      changeLabel(detail) {
        this.currentLabel = detail
      },
      //打开追号面板
      openTracePanel() {
        if (this.betOrders.length === 0) {
          this.showModal({
            text: '请先选号'
          })
          return
        }
        this.isTracePanelShowed = true
      },
      //切换追号快速生成模式
      changeCurrentTraceModel(model) {
        this.currentTraceModel = model
      },
      switchTraceIssue(issue) {
        if (!this.chosenTraceIssue[issue]) {
          this.setTrace(issue, 1)
        } else {
          this.$delete(this.chosenTraceIssue, issue)
        }
      },
      setTrace(issue, times) {
        /*if(Number.isNaN(parseInt(times)) || parseInt(times) <= 0){
          return
        }*/
        this.$set(this.chosenTraceIssue, issue, times)
      },
      generateChosenTraceIssue() {
        this.clearAllTrace()
        let time = this.currentTraceTime
        for (let i = 0; i < this.currentTraceCount; i++) {
          let issue = this.trackingIssueData[i].issue
          this.setTrace(issue, time)
          if (this.currentTraceModel === 'multiple' && (i + 1) % this.currentTraceGap === 0) {
            time = time * this.currentTraceMultiple
          }
        }
      },
      clearAllTrace() {
        this.chosenTraceIssue = {}
      },
      validateTimes(issue) {
        let times = this.chosenTraceIssue[issue]
        if (Number.isNaN(parseInt(times)) || parseInt(times) <= 0) {
          times = 1
        }
        this.setTrace(issue, times)
      },
      //计算追号金额
      calcMoney(issue) {
        let times
        if (this.chosenTraceIssue.hasOwnProperty(issue)) {
          times = this.chosenTraceIssue[issue]
          if (Number.isNaN(parseInt(times)) || parseInt(times) <= 0) {
            times = 1
          }

        } else {
          times = 0
        }
        return numeral(this.totalMoney).multiply(times).format('0.000')
      },
      //放弃追号
      cancelTrace() {
        this.clearAllTrace()
        this.isTracePanelShowed = false
      },
      confirmTrace() {
        if (!this.shouldTrace) {
          return
        }
        this.isTracePanelShowed = false
        this.showNotification()
      },
      openRecent() {
        this.isHistoryShowed = true
      },
      switchBalance() {
        this.isBalanceShowed = !this.isBalanceShowed
      },

      //去充值
      navTo(name) {
        this.$router.push({
          name
        })
      },
      updateTrackIssues() {
        let func = generateTrackIssueMap[this.currentLotteryName] || generateTrackIssue
        this.trackingIssueData = func(this.currentTime, 200)
      },
      getBetRecord() {

        return axios({
          method: 'post',
          url: '/lottery/bet_record',
          data: {
            userid: this.profile.userid,
            page_idx: 1,
            startdate: getDateString(new Date() - 14 * 24 * 3600 * 1000),
            enddate: getDateString(),
            page_size: 6,
          },
          loading: true
        })
      }
    },
    created() {


      let vm = this
      let localMethodName = `static_lottery_${this.$route.params.lotteryName}`
      let playMethod = getLocal(localMethodName)

      let playMethodsPromise
      if (playMethod) {
        playMethodsPromise = Promise.resolve({data: {data: getLocal(localMethodName)}})
      } else {
        playMethodsPromise = axios({
          url: '/lottery/method_menus',
          method: 'post',
          data: {
            lottery_id: this.currentLotteryId,
          },
          loading: true
        })
      }
      Promise.all([
        axios({
          url: '/lottery/lottery_history',
          method: 'post',
          data: {
            lottery_id: this.currentLotteryId,
            limit: 30,
          },
          loading: true
        }),
        playMethodsPromise,
        this.getBetRecord()
      ]).then(([historyIssue, methodMenus, betRecords]) => {
        vm.historyIssueData = historyIssue.data.data
        vm.playMethods = methodMenus.data.data
        vm.betRecords = betRecords.data.data.list

        this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
        let method_memory = getLocal('method_memory')
        //是否缓存了上次玩法
        let lastMenuid = method_memory && method_memory[this.currentLotteryName]
        let currentMethod
        let currentLabel
        if (lastMenuid) {
          currentMethod = vm.playMethods.labels.find(method => {
            return method.labels.find(type => {
              return type.labels.find(label => {
                if (label.menuid === lastMenuid) {
                  currentLabel = label
                  return true
                } else {
                  return false
                }
              })
            })
          })
        } else {
          currentMethod = vm.playMethods.labels[0]
          currentLabel = currentMethod.labels[0].labels[0]
        }
        vm.currentMethod = currentMethod
        vm.currentLabel = currentLabel

        vm.updateTrackIssues()
        vm.$store.subscribe(({type, payload}) => {
          if (type === 'updateSaleendObj' && payload.flaglot === vm.currentLotteryName) {
            vm.updateTrackIssues()
            vm.clearAllTrace()
            if (vm.isNotificationShowed) {
              vm.closeNotification()
            }
            vm.showToast({
              text: '当期销售已截止，请进入下一期购买。'
            })
            setTimeout(() => {
              vm.closeToast()
            }, 2000)

          }
        })
        //TODO:
        // 建立websocket连接，开奖后将结果推进历史队列，并且弹出中奖通知
        //
      }).catch((e) => {
        console.log(e);
      })
    },
    mounted() {

    },
    beforeRouteUpdate(to, from, next) {
      //获取该彩种的所有玩法
      let localMethodName = `static_lottery_${from.params.lotteryName}`
      let playMethod = getLocal(localMethodName)

      //本地缓存半小时玩法数据
      //如果存在且没过期，则只更新
      //如果不存在或过期，则设置
      if (playMethod) {
        updateLocal(localMethodName, this.playMethods)
      } else {
        //用来更新操作面板中的选项
        setLocal(localMethodName, this.playMethods, 0.02);
      }
      //缓存上次最后一次玩法
      let method_memory = getLocal('method_memory') || {}
      method_memory[this.currentLotteryName] = this.currentLabel.menuid
      setLocal('method_memory', method_memory, 30)
      next()
    },
    beforeRouteLeave(to, from, next) {
      let localMethodName = `static_lottery_${from.params.lotteryName}`
      let playMethod = getLocal(localMethodName)

      //本地缓存半小时玩法数据
      //如果存在且没过期，则只更新
      //如果不存在或过期，则设置
      if (playMethod) {
        updateLocal(localMethodName, this.playMethods)
      } else {
        //用来更新操作面板中的选项
        setLocal(localMethodName, this.playMethods, 0.02);
      }
      //缓存上次最后一次玩法
      let method_memory = getLocal('method_memory') || {}
      method_memory[this.currentLotteryName] = this.currentLabel.menuid
      setLocal('method_memory', method_memory, 30)

      next()
    },
    beforeDestroy() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    components: {
      BetHeader,
      HeaderNav,
      SideBar
    }
  }
</script>

<style lang="scss" scoped>
  .notification-layout {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 5000;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    .note-box {
      width: 500px;
      background: #fff;
      padding: 0;
      position: fixed;
      text-align: left;
      box-shadow: 0 0 18px rgba(0, 0, 0, .2);
      margin-left: -250px;
      left: 50%;
      overflow: hidden;
      border-radius: 4px;
      z-index: 10000;
    }
    .note-title {
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
    .note-content {
      font-size: 14px;
      color: #333;
      letter-spacing: 0;
      text-align: left;
      line-height: 25px;
      padding: 20px;
      min-height: 100px;
      .content-title {
        font-size: 16px;
        color: #3b476a;
        border: 0;
        margin-bottom: 8px;
      }
      .solo-hint {
        color: #e06363;
      }
      .infos {
        max-height: 350px;
        overflow-y: auto;
        color: #3b476a;
        font-size: 16px;
        word-wrap: break-word;
        .order-info {
          background: #f6f7fb;
          padding: 7px;
          border-radius: 10px;
          display: block;
          margin-top: 10px;
          box-shadow: 0 0 5px 0 #f4f4f4;
          border: 1px solid #e7eaf1;
          word-wrap: break-word;
          text-overflow: ellipsis;
          white-space: nowrap;
          &.not-solo {
            .solo {
              display: none;
            }
          }
          .top {
            display: flex;
            align-items: center;
            .solo {
              font-style: normal;
              width: 38px;
              height: 18px;
              line-height: 18px;
              text-align: center;
              font-size: 12px;
              color: #fff;
              border-radius: 9px 0 9px 9px;
              background: -webkit-linear-gradient(left, #8a76f6, #70cafe);
            }
            .mode {
              color: #fff;
              display: inline-block;
              width: 20px;
              line-height: 20px;
              height: 20px;
              border-radius: 50%;
              margin: 0 8px;
              font-size: 12px;
              text-align: center;
              background-image: -webkit-linear-gradient(-180deg, #7ebbff, #4886ff);

            }
            .method {
              color: #666;
              font-size: 13px;
              font-weight: 400;
            }
            .money {
              font-size: 13px;
              color: #ff632c;
              font-weight: 700;
              margin-left: 15px;
            }
          }
          .bottom {
            font-weight: 700;
            padding-left: 5px;
            color: #666;
            font-size: 13px;
            span {
              color: #666;
              font-size: 13px;
              font-weight: 400;
            }
          }
        }
      }
      .total-money {
        font-size: 15px;
        font-weight: 700;
        color: #6777e0;
        margin-top: 19px;
        text-align: left;
      }
    }
    .note-bottom {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      background: #fff;
      padding: 12px 15px;
      border-top: 1px solid #eee;
      font-size: 14px;
      overflow: hidden;
      .left {
        display: flex;
        justify-content: start;
        .clear-solo-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          border: 1px solid #dadee6;
          background: #fff;
          cursor: pointer;
          border-radius: 4px;
          margin-right: 10px;
          color: #6777e0;
          box-sizing: border-box;
          transition: all .3s;
          &:hover {
            background-color: #f5f0fd;
          }
        }
      }
      .right {
        display: flex;
        justify-content: end;
        .cancel {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          border: 1px solid #dadee6;
          background: #fff;
          cursor: pointer;
          border-radius: 4px;
          margin-right: 10px;
          color: #6777e0;
          box-sizing: border-box;
        }
        .confirm {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 32px;
          line-height: 32px;
          background: linear-gradient(top, #57c1ef, #4a87e9);
          background: -webkit-linear-gradient(top, #57c1ef, #4a87e9);
          background: -moz-linear-gradient(top, #57c1ef, #4a87e9);
          background: -ms-linear-gradient(top, #57c1ef, #4a87e9);
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #fff;
          &:hover {
            background: -webkit-linear-gradient(top, #4a87e9, #57c1ef);
          }
        }
      }
    }
  }

  .trace-modal {
    border: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: default;
    z-index: 979;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    .trace-box {
      width: 846px;
      height: 570px;
      border-top: 1px solid #8ac8ff;
      box-shadow: 0 0 15px #666;
      user-select: none;
      position: fixed;
      z-index: 980;
      top: 50%;
      margin-top: -285px;
      left: 50%;
      margin-left: -423px;
      background: #fff;
      border-radius: 12px;
      .trace-head {
        background: linear-gradient(top, #289aff, #40c5e9);
        height: 48px;
        line-height: 48px;
        border-top: 1px solid #4eabff;
        text-indent: 19px;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        font-size: 20px;
        font-style: italic;
        color: #fff;
        position: relative;
        font-weight: bold;
        i {
          height: 23px;
          width: 36px;
          vertical-align: -5px;
          display: inline-block;
          margin-right: 8px;
          background: url(../assets/bet/trace-icon.png) no-repeat;
        }
        .close-trace-btn {
          width: 16px;
          height: 16px;
          display: inline-block;
          position: absolute;
          right: 23px;
          top: 17px;
          cursor: pointer;
          background: url(../assets/bet/trace-icon.png) no-repeat -58px -81px
        }
      }
      .trace-tabs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .tab {
            width: 122px;
            height: auto;
            text-align: center;
            font-size: 16px;
            cursor: pointer;
            display: inline-block;
            padding: 14px 0 12px;
            color: #3b476a;
            &.active {
              border-bottom: 4px solid #4886ff;
              color: #4886ff;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          height: 22px;
          line-height: 22px;
          color: #333;
          font-size: 14px;
          cursor: pointer;
          margin-right: 22px;
          span {
            width: 20px;
            height: 20px;
            float: left;
            margin-top: 0;
            margin-right: 5px;
            cursor: pointer;
            background: url(../assets/bet/trace-icon.png) no-repeat -56px -55px;

            &.checked {
              background: url(../assets/bet/trace-icon.png) no-repeat -56px -25px
            }
          }
        }

      }
      .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        .left {
          display: flex;
          align-items: center;
          padding-left: 24px;
          .group {
            display: flex;
            align-items: center;
            margin-right: 20px;
            .label {
              color: #666;
              font-size: 14px;
            }
            .number-input {
              display: flex;
              align-items: center;
              margin: 0 5px;
              border: 1px solid #d3dbeb;
              border-radius: 4px;
            }
            .minus {
              cursor: pointer;
              font-weight: 400;
              margin-top: 0;
              margin-right: 0;
              background: #d8e0f0;
              color: #666;
              width: 21px;
              height: 28px;
              text-align: center;
              line-height: 28px;
            }
            .number {
              width: 47px;
              height: 24px;
              border: 0;
              float: left;
              display: inline;
              padding: 2px 4px;
              text-align: center;
              font-size: 14px;
              color: #6791e6;
              background: #e6ebf5;
            }
            .plus {
              cursor: pointer;
              font-weight: 400;
              margin-top: 0;
              margin-right: 0;
              background: #d8e0f0;
              color: #666;
              width: 21px;
              height: 28px;
              text-align: center;
              line-height: 28px;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          float: right;
          width: 100px;
          height: 32px;
          margin-right: 20px;
          border-radius: 16px;
          background: linear-gradient(top, #fc6, #fe806c);
          input {

            width: 100px;
            height: 32px;
            cursor: pointer;
            border: none;
            color: #fff;
            text-indent: 10px;
            font-size: 15px;
            background: url(../assets/bet/trace-icon.png) no-repeat -38px 8px;
          }
        }
      }
      .table-box {
        height: 335px;
        overflow: scroll;
        overflow-x: hidden;
        background: #fff;
        table {
          width: 100%;
          font-size: 12px;
          color: #494949;
          th {
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: #e6ebf5;
            font-size: 12px;
            color: #4a4a4a;
          }
          td {
            border-bottom: 1px solid #efeef7;
            border-right: 1px solid #efeef7;
            height: 41px;
            line-height: 41px;
            text-align: center;
            background: #fff;
            color: #3b476a;
            .check-btn {
              width: 18px;
              height: 18px;
              display: inline-block;
              vertical-align: -5px;
              background: url(../assets/bet/trace-icon.png) no-repeat -18px -67px;
              &.checked {
                background: url(../assets/bet/trace-icon.png) no-repeat -18px -37px;
              }
            }
            &.times {
              .input {
                width: 50px;
                padding: 5px 10px;
                text-align: center;
                border: 1px solid #d3dbeb;
                background: #f4f4f4;
                margin-right: 5px;
                color: #3b476a;
              }
            }
            .red {
              font-size: 14px;
              color: #fc6180;
            }
          }
        }
      }
      .handle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px dashed #cfdce6;
        padding: 16px 20px 16px 15px;
        color: #666;
        font-size: 13px;
        background: #fff;
        .info-box {
          display: flex;
          align-items: center;
          b {
            font-size: 20px;
            font-weight: 700;
          }
          .nums-per-issue {
            margin-right: 18px;
            color: #303c66;
          }
          .total-issues {
            margin-right: 18px;
            color: #666;
          }
          .total-money {
            color: #ff632c;
          }
        }
        .final-btns {
          display: flex;
          align-items: center;
          .cancel {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 40px;
            border-radius: 4px;
            color: #fff;
            font-size: 16px;
            letter-spacing: 5px;
            cursor: pointer;
            margin: 0 22px;
            background: #d1d2d5;
          }
          .confirm {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 40px;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            background: linear-gradient(top, #71ccfe, #8976f6);
            &:hover {
              background: linear-gradient(top, #8976f6, #71ccfe);
            }
          }
        }
      }

    }
  }

  .lottery-main {
    width: 1080px;
    border-radius: 10px;
    margin: auto;
    min-height: 600px;
    box-shadow: 0 0 30px rgba(0, 0, 0, .1);
    position: relative;
    margin-bottom: 20px;
    margin-top: 10px;
    .lottery-head {
      display: flex;
      height: 90px;
      padding: 6px 0 7px 7px;
      box-sizing: border-box;
      background-image: url(../assets/bet/bet-h-bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .logo {
        width: 170px;
        height: 70px;
        font-smoothing: antialiased;
        font-family: iconfont !important;
        font-style: normal;
        font-size: 140px;
        color: #ffffff;
        position: relative;
        &:after {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &-txffc:after {
          content: "\E709";
        }
        &-jnd30m:after {
          content: "\E70F";
        }
        &-cq30s:after {
          content: "\E721";
        }
        &-tx30s:after {
          content: "\E722";
        }
        &-hn1fc:after {
          content: "\E70E";
        }
        &-hn5fc:after {
          content: "\E711";
        }
        &-rd1fc:after {
          content: "\E719";
        }
        &-rd2fc:after {
          content: "\E718";
        }
        &-rbffc:after {
          content: "\E70B";
        }
        &-ynffc:after {
          content: "\E70D";
        }
        &-xgffc:after {
          content: "\E70C";
        }
        &-mmc:after {
          content: "\E714";
        }
        &-cqssc:after {
          content: "\E71A";
        }
        &-xjssc:after {
          content: "\E71D";
        }
        &-pk10:after {
          content: "\E715";
        }
        &-ydl10:after {
          content: "\E716";
        }
        &-jssm:after {
          content: "\E713";
        }
        &-jnd11x5:after {
          content: "\E707";
        }
        &-gd11x5:after {
          content: "\E706";
        }
        &-jx11x5:after {
          content: "\E702";
        }
        &-sd11x5:after {
          content: "\E705";
        }
        &-sh11x5:after {
          content: "\E708";
        }
        &-ah11x5:after {
          content: "\E703";
        }
        &-3djnd:after {
          content: "\E710";
        }
        &-3dfc:after {
          content: "\E704";
        }
        &-pl3:after {
          content: "\E717";
        }
        &-xglhc:after {
          content: "\E71C";
        }
        &-bjkl8:after {
          content: "\E70A";
        }
      }
      .time-box {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding-left: 8px;
        color: #fff;
        padding-top: 10px;
        .left {
          margin-right: 14px;
          .current-issue {
            padding: 5px;
            color: #fff;
            text-align: center;
            border-radius: 4px;
            background: rgba(0, 0, 0, .2);
            span {
              &.active {
                animation: shake .4s 5;
              }
            }
          }
          .infos {
            display: flex;
            margin-top: 8px;
            align-items: center;
            .favorite {
              width: 55px;
              height: 23px;
              line-height: 23px;
              background: linear-gradient(to right, #316395, #407db2);
              display: inline-block;
              text-align: center;
              border-radius: 4px;
              .star {
                display: none;
              }
              &.not-collected {
                background: linear-gradient(left, #ff4c88, #ff7f66);
                cursor: pointer;
                .star {
                  width: 11px;
                  height: 14px;
                  display: inline-block;
                  vertical-align: -2px;
                  background: url(../assets/bet/collection.png) no-repeat 0 2px;
                  margin-right: 2px;
                  background-size: 100%;
                }
              }

            }
            .bet-time {
              border-radius: 4px;
              color: #fff;
              display: inline-block;
              text-align: center;
              margin-left: 12px;
              background: rgba(0, 0, 0, .2);
              width: 52px;
              padding: 5px 6px;
            }
            .bell {
              margin-left: 10px;
              cursor: pointer;
              width: 30px;
              height: 25px;
              background: url(../assets/bet/lottery-icon.png) -17px -178px no-repeat;
              &.active {
                background: url(../assets/bet/lottery-icon.png) no-repeat 2px 0;
              }
            }
          }
        }
        .right {
          display: flex;
          .time {
            width: 59px;
            height: 56px;
            color: #fff;
            text-align: center;
            line-height: 56px;
            font-weight: 700;
            font-size: 32px;
            background: url(../assets/bet/time-bg.png) no-repeat;
            margin-left: 2px;
            box-shadow: 0 2px 15px #429ba0;
            overflow: hidden;
            position: relative;
            .time-wrapper {
              width: 59px;
              position: absolute;
              bottom: 0;
              left: 0;
              &.active {
                bottom: -56px;
                transition: bottom 0.3s;
              }
              .time-num {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 56px;
                line-height: 56px;
                font-size: 32px;
                color: #4d6683;
              }
            }

          }
          .division {
            display: inline-block;
            width: 18px;
            line-height: 56px;
            color: #fff;
            text-align: center;
            font-size: 25px;
          }
        }
      }
      .result-box {
        display: flex;
        justify-content: space-between;
        margin-left: 8px;
        color: #fff;
        .left {
          padding-top: 10px;
          padding-left: 10px;
          .last-issue {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 114px;
            box-sizing: border-box;
            font-size: 12px;

            padding: 5px 6px;
            background: rgba(0, 0, 0, .2);
            border-radius: 6px;
            margin-bottom: 8px;
          }
          .hint-box {
            display: flex;
            .text {
              width: 65px;
              height: 22px;
              line-height: 22px;
              text-align: center;
              background: rgba(0, 0, 0, .2);
              border-radius: 5px;
              margin-right: 14px;
            }
            .notify-switcher {
              display: inline-block;
              width: 36px;
              height: 20px;
              margin-top: 1px;
              background: url(../assets/bet/warnningbg.png) no-repeat;
              background-position-y: 0;
              cursor: pointer;
              &.active {
                background-position-y: -20px;
              }
            }
          }
        }
        .right {
          padding-top: 8px;
          padding-left: 5px;
          .issue-box {

          }
          .lottery_num_box {
            position: relative;
            transition: 1s;
            color: #4d6683;
            font-size: 26px;
            font-weight: 700;
            overflow: hidden;
            margin-right: 7px;
            float: left;
            display: inline;
            width: 51px;
            height: 51px;
            line-height: 51px;
            border-radius: 50%;
            border: 4px solid rgba(0, 0, 0, .09);
            text-align: center;
            background: url(../assets/bet/ball.png) no-repeat 50%;
            &.issueBox0 {
              animation: issueBoxOne .6s forwards
            }

            &.issueBox1 {
              animation: issueBoxTwo .8s forwards
            }

            &.issueBox2 {
              animation: issueBoxThree 1s forwards
            }

            &.issueBox3 {
              animation: issueBoxFour 1.2s forwards
            }

            &.issueBox4 {
              animation: issueBoxFive 1.4s forwards
            }

            &.issueBox5 {
              animation: issueBoxSix 1.6s forwards
            }

            &.issueBox6 {
              animation: issueBoxSeven 1.8s forwards
            }

            &.issueBox7 {
              animation: issueBoxEight 2s forwards
            }

            &.issueBox8 {
              animation: issueBoxNine 2.1s forwards
            }

            &.issueBox9 {
              animation: issueBoxTen 2.2s forwards
            }

            &.issueBox10 {
              animation: issueBoxEleven 2.3s forwards
            }

            &.issueBox11 {
              animation: issueBoxTwelve 2.4s forwards
            }

            &.issueBox12 {
              animation: issueBoxThirteen 2.5s forwards
            }

            &.issueBox13 {
              animation: issueBoxFourteen 2.6s forwards
            }

            &.issueBox14 {
              animation: issueBoxFiveteen 2.7s forwards
            }

            &.issueBox15 {
              animation: issueBoxSixteen 2.8s forwards
            }

            &.issueBox16 {
              animation: issueBoxSeventeen 2.9s forwards
            }

            &.issueBox17 {
              animation: issueBoxEighteen 3s forwards
            }

            &.issueBox18 {
              animation: issueBoxNineteen 3.1s forwards
            }

            &.issueBox19 {
              animation: issueBoxTwenty 3.2s forwards
            }
          }

        }
      }
    }
    .lottery-body {
      width: 1080px;
      padding-top: 15px;
      padding-bottom: 10px;
      background: #fdfdfd;
      position: relative;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      .select-area {
        display: flex;
        justify-content: space-between;
        .left {
          position: relative;
          margin-left: 16px;
          transition: .5s;
          width: 760px;
          margin-right: 10px;
          box-shadow: 0 2px 15px 0 #dce3e8;
          background: #f2f8f8;
          min-height: 274px;
          box-sizing: border-box;
          .method-head {
            display: flex;
            overflow-x: scroll;
            position: relative;
            height: 55px;
            background: linear-gradient(to right, #609ffe, #5acdd5);
            box-sizing: border-box;
            padding-left: 4px;
            align-items: center;
            user-select: none;
            /*&::-webkit-scrollbar {

              height: 8px;
              !*background-color: #e1e8f0*!
            }
            &::-webkit-scrollbar-thumb {
              cursor: pointer;
              background-color: #609ffe;
              border-radius: 10px
            }
            &::-webkit-scrollbar-track {
              background-color: #e1e8f0;
              height:10px;
            }*/
            .method {
              flex: none;
              cursor: pointer;
              font-size: 14px;
              color: #fff;
              display: block;

              height: 35px;
              line-height: 35px;
              padding: 0 12px;
              position: relative;
              &.active {
                color: #6880a0;
                background: #ecf8f9;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
              }
            }
          }
          .label-body {
            border-bottom: 6px solid #e1e8f0;
            padding: 5px 0;
            background: #ecf8f9;
            position: relative;
            .type {
              overflow: hidden;
              line-height: 20px;
              width: 600px;
              margin: 5px 0;
              .type-cell {
                display: block;
                float: left;
                line-height: 25px;
                text-align: right;
                font-size: 13px;
                color: #6880a0;
                margin-right: 10px;
                margin-left: 20px;
              }
              .label {
                margin: 0 10px 0 0;
                display: block;
                float: left;
                line-height: 20px;
                font-size: 13px;
                color: #6880a0;
                padding: 0 5px;
                cursor: pointer;
                padding: 2px 7px;
                border-radius: 3px;
                &.active {
                  color: #fff;
                  background: linear-gradient(to right, #69a7fe, #62d1d9);
                }
              }
            }
            .position-choose-box {
              overflow: hidden;
              line-height: 20px;
              width: 600px;
              margin: 5px 0;
              display: flex;
              span {
                display: block;
                float: left;
                line-height: 25px;
                text-align: right;
                font-size: 13px;
                color: #6880a0;
                margin-left: 20px;
              }
              .pos-box {
                margin: 0 10px 0 0;
                display: block;
                float: left;
                line-height: 20px;
                font-size: 13px;
                color: #6880a0;
                cursor: pointer;
                padding: 2px 7px;
              }
            }
            .rebate-select {
              font-size: 12px;
              top: 8px;
              right: 6px;
              position: absolute;
              select {
                cursor: pointer;
                color: #657d97;
                font-size: 12px;
                border: none;
                padding: 6px 2px;
                border-radius: 4px;
                box-shadow: 1.5px 3px 4px 0 rgba(95, 95, 95, .149);

                background-image: linear-gradient(0deg, #e5eaf4, #fff);

              }
            }
          }
          .bet-area {
            .bet-head {
              width: 100%;
              background: #f2f8f8;
              margin-bottom: 15px;
              height: 40px;
              .instruction {
                display: flex;
                position: relative;
                line-height: 22px;
                margin-right: 14px;
                margin-top: 16px;
                margin-left: 20px;
                i {
                  margin-right: 3px;
                  vertical-align: -3px;
                  width: 17px;
                  height: 17px;
                  display: inline-block;
                  background: url(../assets/bet/lottery-icon.png) no-repeat;
                }
                .desc-panel {
                  position: absolute;
                  box-shadow: 0 0 5px #ddd;
                  background: #fff;
                  border: 1px solid #ddd;
                  color: #777;
                  display: none;
                  font-size: 13px;
                  line-height: 20px;
                  overflow: hidden;
                  padding: 8px 10px;
                  text-align: left;
                  width: 300px;
                  z-index: 10;
                  left: 0;
                }
              }
              i.icon_sm {
                background-position: 0 -59px;
              }
              i.icon_sl {
                background-position: 0 -82px;
              }
              i.icon_bz {
                background-position: 0 -105px;
              }
              .instruction-instrc, .instruction-example, .instruction-help {
                color: #7d8fb3;
                font-size: 13px;
                cursor: pointer;
                margin-right: 20px;
                &:hover {
                  .desc-panel {
                    display: block;
                  }
                }

              }
            }
            .bet-body {
              border-bottom: 1px solid #e1e8f0;
              .each {
                overflow: hidden;
                padding-left: 10px;
                margin-bottom: 5px;
                .code-box {
                  display: flex;
                  width: 730px;
                  .layout-title {
                    width: 70px;
                    height: 38px;
                    line-height: 38px;
                    text-align: center;
                    color: #7d8fb3;
                    font-size: 14px;
                    margin-right: 5px;
                    flex: none;
                    font-weight: bold;
                    .hide {
                      opacity: 0;
                    }
                  }
                  .balls {
                    display: flex;
                    .ball {
                      cursor: pointer;
                      font-family: microsoft yahei;
                      margin-right: 9px;
                      margin-bottom: 10px;
                      display: inline-block;
                      background: linear-gradient(to bottom, #f8fcff, #dbdfe0);
                      width: 30px;
                      height: 30px;
                      line-height: 30px;
                      color: #505c76;
                      font-size: 16px;
                      font-weight: 700;
                      text-align: center;
                      border-radius: 50%;
                      margin-top: 4px;
                      border: 1px solid #bfc6d6;
                      &:hover {
                        background: #b6c6e2;
                        color: #fff;
                      }
                      &.active {
                        border: 1px solid transparent;
                        background: url(../assets/bet/lottery-icon.png) no-repeat -90px 0;
                        color: #fff;
                      }
                    }
                  }
                  .short-cuts {
                    flex: none;
                    display: flex;
                    margin-left: 30px;
                    margin-right: 6px;
                    .short-cut {
                      cursor: pointer;
                      display: inline-block;
                      width: 22px;
                      height: 38px;
                      line-height: 38px;
                      color: #6880a0;
                      font-size: 14px;
                      text-align: center;
                      margin-right: 5px;
                      &:hover {
                        color: #ff632c;
                      }
                    }
                  }
                }
              }
            }
            .add-order-box {
              padding: 15px 10px;
              height: 65px;
              font-family: Microsoft Yahei;
              background: #f2f8f8;
              position: relative;
              .handle-line {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .times-modes {
                  display: flex;
                  align-items: center;
                  .times {
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                    user-select: none;
                    .minus {
                      text-align: center;
                      width: 20px;
                      height: 26px;
                      line-height: 26px;
                      top: 2px;
                      font-size: 14px;
                      background: #d8e0f0;
                      left: -21px;
                      border: 1px solid #e2e1e1;
                      border-right: none;
                      z-index: 1;
                      border-top-left-radius: 3px;
                      border-bottom-left-radius: 3px;
                      cursor: pointer;
                    }
                    .times-input {
                      width: 50px;
                      height: 26px;
                      line-height: 20px;
                      left: 0;
                      top: 2px;
                      background: #e6ebf5;
                      color: #6791e6;
                      font-weight: 700;
                      text-align: center;
                      font-size: 14px;
                      border: 1px solid #d3dbeb;
                      border-right: 0;
                      border-left: 0;
                    }
                    .add {
                      text-align: center;
                      width: 20px;
                      height: 26px;
                      line-height: 26px;
                      top: 2px;
                      font-size: 14px;
                      background: #d8e0f0;
                      right: 1px;
                      border: 1px solid #d3dbeb;
                      border-left: none;
                      border-top-right-radius: 3px;
                      border-bottom-right-radius: 3px;
                      cursor: pointer;
                    }
                    .text {
                      margin-left: 2px;
                      font-size: 14px;
                      font-weight: 700;
                      color: #888;
                    }
                  }
                  .modes {
                    display: flex;
                    align-items: center;
                    .mode {
                      font-size: 14px;
                      color: #627a95;
                      border-radius: 5px;
                      display: inline-block;
                      width: 28px;
                      height: 28px;
                      line-height: 28px;
                      text-align: center;
                      margin-right: 2px;
                      cursor: pointer;
                      background: #e1e8f5;
                      &.active {
                        color: #fff;
                        background-image: -webkit-linear-gradient(left, #7ad6e5, #7fbff8);
                      }
                    }
                  }

                }
                .handle-btns {
                  display: flex;
                  align-items: center;
                  .handler {
                    height: 40px;
                    width: 119px;
                    border-radius: 5px;
                    color: #fff;
                    background-color: #e6ebf5;
                    border: 0;
                    font-size: 16px;
                    line-height: 40px;
                    text-align: center;
                    font-weight: 700;
                    margin-left: 5px;
                  }
                  .bet-immediate {
                    position: relative;
                    text-indent: 18px;
                    background-image: linear-gradient(top, #ec9527, #ed6e20);
                    cursor: pointer;
                    &.disabled {
                      background-image: linear-gradient(top, rgba(246, 193, 78, .5), rgba(251, 130, 56, .5));
                      cursor: auto;
                    }
                    &:after {
                      content: "";
                      width: 12px;
                      height: 16px;
                      position: absolute;
                      left: 18px;
                      top: 13px;
                      background: url(../assets/bet/lightning.png) no-repeat;
                    }
                  }
                  .add-order {
                    position: relative;
                    background-image: linear-gradient(top, #3cd2de, #64b2f4);
                    cursor: pointer;
                    &.disabled {
                      background-image: linear-gradient(top, rgba(101, 216, 223, .5), rgba(127, 185, 253, .5));
                      cursor: auto;
                    }
                    &:after {
                      content: "";
                      width: 0;
                      height: 0;
                      border-left: 4px solid transparent;
                      border-right: 4px solid transparent;
                      border-top: 6px solid rgba(127, 185, 253, .5);
                      position: absolute;
                      bottom: -6px;
                      left: 55px;
                    }
                  }
                }
              }
              .money-line {
                height: 32px;
                line-height: 32px;
                font-size: 14px;
                color: #303c66;
                padding-right: 10px;
                .bet-num {
                  color: #6791e6;
                  font-weight: 700;
                }
                .total-money {
                  color: #f15e24;
                  font-weight: 700;
                }
              }
            }
          }
        }
        .right {
          position: absolute;
          top: 0;
          right: -289px;
          width: 274px;
          background: #f6f8fb;
          box-shadow: 0 5px 10px 0 #f4f4f4;
          border: 1px solid #d0dbf3;
          overflow: hidden;
          margin-left: 20px;
          height: 100%;
          box-sizing: border-box;
          .history-head {
            color: #f6f8fb;
            font-size: 14px;
            height: 37px;
            line-height: 37px;
            background-image: linear-gradient(left, #61c3d7, #69aceb);
            width: 100%;
            text-indent: 10px;
            position: relative;
            border-top: 1px solid #80cfe2;
            border-bottom: 1px solid #5cbeca;
            font-weight: bold;
            .history-line {
              position: absolute;
              right: 10px;
              padding-left: 10px;
              top: 0;
              color: #fff;
              font-size: 12px;
              cursor: pointer;
              background: url(../assets/bet/lottery-icon.png) no-repeat 0 -21px;
            }
          }
          .table-head {
            display: flex;
            font-size: 12px;
            font-weight: 500;
            color: #97a6c5;
            height: 30px;
            line-height: 30px;
            padding: 0 5px;
            background: #eff1f7;
            span {
              display: flex;
              align-items: center;
              justify-content: center;
              flex: auto;
            }
            .issue {
              width: 24%;
            }
            .code {
              width: 44%;
            }
            .form {
              width: 31%;
            }

          }
          .table-body {
            padding: 5px;
            box-sizing: border-box;
            overflow-y: scroll;
            overflow-x: hidden;
            height: calc(100% - 67px);
            &::-webkit-scrollbar {
              width: 4px;
              background-color: #f6f8fb
            }
            &::-webkit-scrollbar-thumb {
              cursor: pointer;
              background-color: #d9e2ec;
              border-radius: 10px
            }
            &::-webkit-scrollbar-track {
              background-color: #f6f8fb
            }

            .history-code {
              display: flex;
              align-items: center;
              border-bottom: 1px dashed #d9deec;
              min-height: 30px;
              &:first-child {
                .code-number {
                  span {
                    color: #fff;
                    background: #b2bcdc;
                    border-radius: 50px;
                    margin: 0 1px;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    padding: 0;
                  }
                  .active {
                    font-weight: 600;
                    color: #fff;
                    background: #fc5d50;
                  }
                }
              }
            }
            .code-issue, .code-number, .code-form {
              display: flex;
              align-items: center;
              justify-content: center;
              flex: auto;
            }
            .code-issue {
              width: 25%;
            }
            .code-number {
              width: 44%;
              span {
                color: #7c8cab;
                padding: 0 2px;
              }
              .active {
                color: #fc5d50;
              }
            }
            .code-form {
              width: 31%;
              .zu3 {
                color: #fc5d50;
              }
              .zu6 {
                color: #0b9fb9;
              }
              .long, .hu, .sum, .abs {
                border-radius: 50%;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 20px;
                height: 20px;
                text-align: center;
              }
              .sum {
                background: #f8aa46;
              }
              .hu {
                background: #4c8bda;
              }
              .long {
                background: red;
              }
              .abs {
                background: #f8aa46;
              }
            }
          }

        }
      }
      .order-area {
        display: flex;
        padding: 5px 0 15px;
        padding-top: 10px;
        background: #fdfdfd;
        .left {
          width: 775px;
          margin-left: 16px;
          height: 200px;
          background: #f6f8fb;
          box-shadow: -3px 5px 15px hsla(0, 0%, 47%, .1);
          border: 1px solid #e0e4ee;
          box-sizing: border-box;
          table {
            width: 100%;
            border-collapse: collapse;
            .select-mode {
              color: #657d97;
              font-size: 12px;
              height: 24px;
              border-radius: 4px;
              background-image: linear-gradient(#fff, #e5eaf4);
              box-shadow: 1.5px 3px 4px 0 rgba(95, 95, 95, .149);
              border: 1px solid #e5eaf4;
            }
            .times {
              display: flex;
              align-items: center;
              user-select: none;
              .minus {
                text-align: center;
                width: 20px;
                height: 26px;
                line-height: 26px;
                top: 2px;
                font-size: 14px;
                background: #d8e0f0;
                left: -21px;
                border: 1px solid #e2e1e1;
                border-right: none;
                z-index: 1;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
                cursor: pointer;
              }
              .times-input {
                width: 50px;
                height: 26px;
                line-height: 20px;
                left: 0;
                top: 2px;
                background: #e6ebf5;
                color: #6791e6;
                font-weight: 700;
                text-align: center;
                font-size: 14px;
                border: 1px solid #d3dbeb;
                border-right: 0;
                border-left: 0;
              }
              .add {
                text-align: center;
                width: 20px;
                height: 26px;
                line-height: 26px;
                top: 2px;
                font-size: 14px;
                background: #d8e0f0;
                right: 1px;
                border: 1px solid #d3dbeb;
                border-left: none;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                cursor: pointer;
              }
              .text {
                margin-left: 2px;
                font-size: 14px;
                font-weight: 700;
                color: #888;
              }
            }
            .blue {
              color: #4886ff;
            }
            .del-btn {
              cursor: pointer;
              display: inline-block;
              width: 14px;
              height: 14px;
              vertical-align: -2px;
              background: url(../assets/bet/delete_one.png) no-repeat 100%;
            }
            .delete-all {
              display: inline-block;
              height: 100%;
              padding: 0 15px;
              cursor: pointer;
            }
            tr {
              line-height: 40px;
              background-color: #fff;
              &:nth-child(2n) {
                background: #f0f2f5;
              }
            }
            thead {
              th {
                height: 32px;
                background: #e5eaf4;
                color: #607791;
                font-size: 14px;
                text-align: center;
                font-weight: 700;
                &:first-child {
                  text-indent: 17px;
                }
              }
            }
            tbody {
              td, th {
                height: 40px;
                text-align: center;
                font-size: 12px;
                color: #3b476a;
                font-weight: 400;
              }
              th {
                border: none;
                text-align: left;
                text-indent: 17px;
              }
            }
          }
        }
        .right {
          background: #f7f9fc;
          position: relative;
          padding: 14px;
          width: 274px;
          height: 200px;
          box-shadow: 3px 5px 15px hsla(0, 0%, 47%, .1);
          border: 1px solid #e0e4ee;
          border-left: 0;
          box-sizing: border-box;
          .top-box {
            border-bottom: 1px dashed #cfdce6;
            height: 56px;
            display: flex;
            .trace-left {
              flex: auto;
              .count-down {
                display: flex;
                .time-icon {
                  width: 15px;
                  height: 20px;
                  background: url(../assets/bet/lottery-icon.png) no-repeat 0 -130px;
                }
                .time {
                  padding-left: 6px;
                  line-height: 20px;
                  font-weight: 700;
                  font-size: 13px;
                  color: #6da9f4;
                }
              }
              .trace-btns {
                display: flex;
                font-size: 13px;
                margin-top: 7px;
                .check-box {
                  display: flex;
                  cursor: pointer;
                  color: #fd7a6e;
                  font-weight: 400;
                  &.active {
                    .check {
                      background-position: 0 0;

                    }
                  }
                  .check {
                    width: 13px;
                    height: 13px;
                    margin-right: 2px;
                    background: url(../assets/bet/checkbox.png) no-repeat;
                    box-shadow: 1px 4.732px 6px 0 rgba(13, 6, 10, .063);
                    background-position: 0 -13px;

                  }
                }
                .trace-cancel {
                  cursor: pointer;
                  color: #657598;
                  margin-left: 8px;
                  &:hover {
                    color: #999;
                  }
                }
              }
            }
            .submit-btn {
              display: flex;
              justify-content: center;
              align-items: center;
              flex: none;
              background-image: linear-gradient(top, #fc6e65, #f16359);
              border-radius: 5px;
              color: #fff;
              font-size: 20px;
              width: 155px;
              height: 46px;
              opacity: .5;
              &.active {
                opacity: 1;
              }
            }
          }
          .all-order-desc {
            font-size: 14px;
            color: #657699;
            height: 87px;
            padding-top: 10px;
            p {
              padding-bottom: 15px;
              &:first-child {
                span {
                  font-weight: 700;
                  font-size: 18px;
                  color: #78b0f6;
                  vertical-align: -2px;
                }
              }
              &:nth-child(2) {
                span {
                  font-weight: 700;
                  font-size: 18px;
                  vertical-align: -2px;
                  color: #ff632c;
                }
              }
            }
          }
        }
      }
      .bet-history-area {
        position: relative;
        height: 100%;
        margin: 0 16px 23px;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .039);
        .bet-history-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          height: 37px;
          line-height: 37px;
          width: 100%;

          position: relative;
          background-image: linear-gradient(left, #61c3d7, #69aceb);
          border-top: 1px solid #d0dbf3;
          .head-left {
            text-indent: 28px;
          }
          .head-right {
            display: flex;
            align-items: center;
            .refresh-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              width: 60px;
              height: 25px;
              border-radius: 5px;
              background-image: linear-gradient(#e5eaf4 0, #fff 100%);
              font-weight: 500;
              font-size: 12px;
              color: #4f6a88;
              margin-right: 10px;
            }
            .more-btn {
              font-size: 12px;
              color: #fff;
              cursor: pointer;
              margin-right: 30px;
            }
          }
        }
        .bet-history-table {
          min-height: 150px;
          padding: 0 6px 5px 28px;
          border: 1px solid #d0dbf3;
          border-top: none;
          background: #f6f8fb;
          font-weight: normal;
          table {
            width: 100%;
          }
          th {
            height: 30px;
            text-align: center;
            font-size: 12px;
            color: #97a6c5;
            background: #f6f8fb;
            position: relative;
            &:first-child {
              text-align: left;
            }
          }
          td {
            height: 30px;
            text-align: center;
            font-size: 12px;
            color: #3b476a;
            background: #f6f8fb;
            position: relative;
            &:first-child {
              text-align: left;
            }
          }
        }
      }
    }
    .favorite-panel {
      position: absolute;
      top: 0;
      left: -160px;
      width: 160px;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      z-index: 5;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .5);
      transition: .8s;
      .panel-head {
        position: relative;
        height: 55px;
        color: #fff;
        background-image: linear-gradient(270deg, #63c3e3, #2699ff);
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        .star {
          position: absolute;
          left: 10px;
          top: -1px;
          background: url(../assets/bet/collection_new.png) 0 0 no-repeat;
          width: 20px;
          height: 26px;
          margin-right: 5px;
          z-index: 5;
        }
        .my-collection {
          position: absolute;
          left: 48px;
          top: 8px;
          background: url(../assets/bet/my_collection.png) 0 0 no-repeat;
          width: 77px;
          height: 17px;
        }
        .edit {
          background: url(../assets/bet/edit_new.png) 1px 1px no-repeat;
          display: inline-block;
          position: absolute;
          left: 48px;
          top: 34px;
          color: #fff;
          font-size: 12px;
          font-weight: 400;
          padding-left: 15px;
        }
      }
      .panel-content {
        background: #fff;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        .item {
          height: 44px;
          line-height: 44px;
          border-bottom: 1px solid #e0e7ef;
          padding: 0 10px;
          font-size: 12px;
          cursor: pointer;
          &.active {
            color: #fff;
            background: #62b1f1;
            .lottery-name {
              .name {
                padding-left: 14px;
                background: url(../assets/bet/music.gif) 0 9px no-repeat;
              }
              .countdown {
                color: #fff;
              }
            }
            .progress {
              background: #589dd6;
              .progress-bar {

                background: linear-gradient(left, #54d5ff, rgba(75, 248, 254, .8));
                &.last-ten {
                  background: linear-gradient(left, #ff4c88, rgba(255, 127, 102, .8))
                }
              }
            }
          }
          .lottery-name {
            display: flex;
            height: 30px;
            line-height: 30px;
            .name {
              width: 60%;
              display: inline-block;
            }
            .countdown {
              width: 40%;
              text-align: right;
              display: inline-block;
              color: #62b1f1;
            }
          }
          .progress {
            width: 100%;
            height: 3px;
            background: #e4f0fb;
            overflow: hidden;
            .progress-bar {
              display: block;
              position: relative;
              top: 0;
              left: 0;
              height: 100%;
              background: linear-gradient(left, #2699ff, rgba(64, 198, 232, .6))
            }
          }
        }
        .edit {
          border-bottom: 1px solid #e0e7ef;
          .all-lottery {
            display: none;
            position: absolute;
            left: 160px;
            top: 0;
            background: rgba(0, 0, 0, .9);
            width: 1028px;
            color: #fff;
            border-radius: 10px;
            z-index: 10;
            font-size: 14px;
            .category {
              display: flex;
              align-items: center;
              .title {
                font-weight: 600;
                color: #6cb8fd;
                width: 100px;
                text-align: right;
                margin: 12.5px 0;
                line-height: 22px;
                height: 22px;
              }
              .lottery-items {
                width: 890px;
                display: flex;
                flex-wrap: wrap;
                border-bottom: 1px dashed #3a3a3a;
                text-align: center;
                margin-left: 15px;
                padding-top: 18px;
                .lottery-item {
                  width: 130px;
                  display: flex;
                  align-items: center;
                  flex: none;
                  border: 1px solid #3d4143;
                  border-radius: 50px;
                  position: relative;
                  cursor: pointer;
                  height: 32px;
                  margin-bottom: 18px;
                  font-size: 14px;
                  margin-right: 15px;
                  &.check {
                    border: 1px solid #fe7d8d;
                    color: #fe7d8d;
                  }
                  &:hover {
                    color: #fdd251;
                    border: 1px solid #f26d7d;
                    background: #382528;
                  }
                  a {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    margin: 0 6px 0 10px;
                    font-size: 14px;
                    background: url(../assets/bet/star_over.png) no-repeat 4px 4px;
                    &.uncheck {
                      background: url(../assets/bet/star_new.png) no-repeat 5px 5px;
                    }
                    &:hover {
                      background: url(../assets/bet/star_over.png) no-repeat 4px 4px;
                      .starFavor {
                        display: block;
                      }
                    }
                  }
                  .starFavor {
                    position: absolute;
                    top: -22px;
                    left: -12px;
                    display: none;
                    color: #fff;
                    width: 56px;
                    height: 20px;
                    padding: 2px 5px;
                    line-height: 20px;
                    border-radius: 5px;
                    background: linear-gradient(top, #ff4c88, #ff7f66);
                  }
                  .triangle-down {
                    width: 0;
                    height: 0;
                    border-left: 4px solid transparent;
                    border-right: 4px solid transparent;
                    border-top: 4px solid #ff7f66;
                    display: inline-block;
                    position: absolute;
                    top: 24px;
                    left: 28px;
                  }
                }
              }
            }
            .favor-instruct {
              border-top: 1px solid #4e5054;
              .title {
                font-weight: 600;
                color: #dfa745;
                width: 100px;
                text-align: right;
                line-height: 64px;
                height: 64px;
                display: inline-block;
              }
              span {
                line-height: 48px;
                height: 48px;
                display: inline-block;
                padding-left: 20px;
                padding-right: 120px;
                background: url(../assets/bet/img.png) no-repeat 100% 0;
                .star {
                  width: 12px;
                  height: 12px;
                  background: url(../assets/bet/star_over.png) no-repeat 0 0;
                  display: inline-block;
                }
              }
            }

          }
          &:hover {
            .all-lottery {
              display: block;
            }
          }
          .show-all {
            height: 35px;
            width: 100%;
            background-image: linear-gradient(90deg, #fe8c83, #fe7469);
            border: 0;
            color: #fff;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &:hover {
              background: linear-gradient(left, #e84d80, #ff7f66);

            }
            .arrow {
              position: relative;
              background: url(../assets/bet/arrow.png) 0 0 no-repeat;
              width: 11px;
              height: 12px;
              left: 32px;
            }
          }
        }
        .hidden-menu {
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #727272;
          i {
            background: url(../assets/bet/hide.png) 0 0 no-repeat;
            width: 15px;
            height: 13px;
            margin-right: 5px;
          }
          span {
            cursor: pointer;
          }
        }
      }
    }
  }

  @keyframes shake {
    0% {
      opacity: 0
    }

    to {
      opacity: 1
    }
  }

  @keyframes issueBoxOne {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxTwo {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxThree {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxFour {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxFive {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxSix {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxSeven {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxEight {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxNine {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxTen {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxEleven {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxTwelve {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxThirteen {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxFourteen {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxFiveteen {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxSixteen {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxSeventeen {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxEighteen {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxNineteen {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }

  @keyframes issueBoxTwenty {
    0% {
      top: -39px
    }

    25% {
      top: 20px
    }

    50% {
      top: -9px
    }

    75% {
      top: 5px
    }

    to {
      top: 0
    }
  }
</style>