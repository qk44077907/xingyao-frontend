<template>
  <div class="chart-page" :style="{width: wholeWidth}">
    <div class="code-spaning">
      <div class="lhfx_tit" @mouseenter="()=>{this.changeFlag=true}" @mouseleave="()=>{this.changeFlag=false}">
        <h5>{{currentLottery.name}}</h5>
        <p>基本走势</p>
        <span class="showAll"></span>
        <div v-show="changeFlag" class="lhfx_lotterylist">
          <div class="lhfx_lotterylist_con">
            <dl v-for="(item,index) in lotteryData" :key="index">
              <dt>{{item.categoryName}}</dt>
              <dd v-for="(elem,idx) in item.lotterys" :key="idx">
                <router-link :to="'/chart/'+elem.lotteryId">{{elem.name}}</router-link>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="secondary_tabs secondary_tabs_span">
        <ul>
          <li v-for="(item,index) in pagesizeList" :key="index" :class="{'curr':item.active}" @click="changePageSize(item.name)">
            <a>最近{{item.name}}期</a>
            <i></i>
          </li>
        </ul>
      </div>
      <div class="adjust-div"></div>
      <div class="clearfix"></div>
    </div>
    <div class="wo_choose">
      <ul class="type">
        <li v-if="item.show" v-for="(item,index) in checkboxList" :key="index" :class="{'active': item.active}" @click="checkboxHandle(item.id)"><span><i></i></span>{{item.name}}</li>
      </ul>
      <ul class="filter">
        <li v-if="item.show" :class="item.active?'hover':''" v-for="(item,index) in typeList" :key="index" @click="filterHandle(item.id)">{{item.name}}</li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <div class="test-wrap">
      <div class="result-list">
        <!-- 头部 标注 -->
        <div :class="{'top-box': true, 'w80': currentId==9}">
          <!-- 左侧 期数 & 开奖号码 -->
          <ul class="left-top" ref="dataLeft">
            <li>期号</li>
            <li :class="{'w10': currentPosNumber==10}">开奖号码</li>
          </ul>
          <!-- 中侧 表格 -->
          <ul v-if="currentId!=9" class="mid-top" ref="dataMid">
            <li v-for="(item,index) in renderTitleList" :key="index" :class="{'w11': currentMaxNumber==11&&currentMinNumber==1, 'w6': currentMaxNumber==6&&currentMinNumber==1&&currentPosNumber==3}">
              <span>{{item}}</span>
              <p>
                <i :class="{'w6': currentMaxNumber==6&&currentMinNumber==1&&currentPosNumber==3}" v-for="item in (currentMaxNumber-currentMinNumber+1)" :key="item">{{item-1+currentMinNumber}}</i>
              </p>
            </li>
          </ul>
          <!-- 右侧 表格 -->
          <ul v-if="currentMaxNumber==9&&currentMinNumber==0&&currentPosNumber==5" class="mid-top" ref="dataRight">
            <li>
              <span>号码分布</span>
              <p>
                <i v-for="item in (currentMaxNumber-currentMinNumber+1)" :key="item">{{item-1+currentMinNumber}}</i>
              </p>
            </li>
            <template v-if="[5,6].indexOf(currentType)>-1">
              <li v-for="(item,index) in twoList" :key="index" :class="{'single2': index==1||index==2}">
                <template v-if="index==0">
                  <span>{{item.name}}</span>
                  <p>
                    <i v-for="i in 10" :key="i">{{i-1}}</i>
                  </p>
                </template>
                <template v-else>
                  <em>{{item.name}}</em>
                </template>
              </li>
            </template>
            <template v-if="[2,3,4].indexOf(currentType)>-1">
              <li v-for="(item,index) in threeList" :key="index" :class="{'single3': [4,5,6,7].indexOf(index)==-1, 'single2': [4,5,6,7].indexOf(index)>-1}">
                <em>{{item.name}}</em>
              </li>
            </template>
          </ul>
          <ul v-if="currentId==9" class="mid-top" ref="dataRight">
            <li v-for="(item,index) in happyText" :key="index">
              <em>{{item}}</em>
            </li>
          </ul>
        </div>
        <!-- 中部 数据 -->
        <div :class="{'middle-box': true, 'zsx': this.checkboxList[0].active, 'yl': this.checkboxList[1].active, 'rh': this.checkboxList[2].active,'w80': currentId==9}">
          <ul class="left-box">
            <li :class="{'hov':currentHover==index}" v-for="(item,index) in renderResultList" :key="index" @mouseenter="enterItemBackground(index)" @mouseleave="leaveItemBackground(index)">
              <span>{{item.name}}</span>
              <p :class="{'w10': currentPosNumber==10}">
                <i v-for="(i,idx) in item.num" :key="idx">
                  <template v-if="currentId==9&&i<10">
                    0{{i}}
                  </template>
                  <template v-else>
                    {{i}}
                  </template>
                </i>
              </p>
            </li>
          </ul>
          <div v-if="currentId!=9" class="mid-box">
            <canvas id="canvas" :width="renderWidth" :height="renderHeight"></canvas>
            <!-- 1格 10列 showData -->
            <div v-for="(element,num) in renderShowList" :key="num" :class="{'part': true, 'w11': currentMaxNumber==11&&currentMinNumber==1, 'w6': currentMaxNumber==6&&currentMinNumber==1&&currentPosNumber==3}">
              <ul v-for="(item,index) in element" :key="index" class="column-ul">
                <li :class="{'hov':currentHover==idx}" v-for="(i,idx) in item" :key="idx" @mouseenter="enterItemBackground(idx)" @mouseleave="leaveItemBackground(idx)">
                  <span v-if="i.value==-1">{{i.back}}</span>
                  <span :class="{'bingo': true, 'hot': i.hot==1}" v-else>{{i.value}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="currentMaxNumber==9&&currentMinNumber==0&&currentPosNumber==5" class="mid-box">
            <div :class="{'part': true, 'w11': currentMaxNumber==11&&currentMinNumber==1, 'w6': currentMaxNumber==6&&currentMinNumber==1&&currentPosNumber==3}">
              <ul v-for="(item,index) in showAllList" :key="index" class="column-ul">
                <li v-for="(i,idx) in item" :key="idx">
                  <span v-if="i.value==-1">{{i.back}}</span>
                  <span class="bingo" v-else>{{i.value}}</span>
                </li>
              </ul>
            </div>
            <template v-if="[5,6].indexOf(currentType)>-1">
              <div v-for="(item,index) in twoList" :class="{'part': true, 'single2': index==1||index==2}">
                <template v-if="index==0">
                  <ul v-for="(item1,index1) in item.arr" :key="index1" class="column-ul">
                    <li v-for="(i,idx) in item1" :key="idx">
                      <span v-if="i.value==-1">{{i.back}}</span>
                      <span class="bingo" v-else>{{i.value}}</span>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <ul class="column-ul">
                    <li v-for="(item1,index1) in item.arr" :key="index1">
                      <span>{{item1}}</span>
                    </li>
                  </ul>
                </template>
              </div>
            </template>
            <template v-if="[2,3,4].indexOf(currentType)>-1">
              <div v-for="(item,index) in threeList" :class="{'part': true, 'single3': [4,5,6,7].indexOf(index)==-1, 'single2': [4,5,6,7].indexOf(index)>-1, 'darkbg': [0,1,2,3,9].indexOf(index)>-1}">
                <ul class="column-ul">
                  <li v-for="(item1,index1) in item.arr" :key="index1">
                    <span :class="{'letter': [0,1,2,3].indexOf(index)>-1}">{{item1}}</span>
                  </li>
                </ul>
              </div>
            </template>
          </div>
          <div v-if="currentId==9" class="mid-box">
            <div v-for="(item,index) in happyList" :class="{'part': true, 'red': index%2==0, 'blue': index%2==1}">
              <ul class="column-ul">
                <li v-for="(item1,index1) in item" :key="index1">
                  <span>{{item1}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 尾部 总数 -->
        <div v-if="currentId!=9" class="bottom-box">
          <ul class="left-bot">
            <li v-if="!(currentMaxNumber==11&&currentMinNumber==1&&(index==2||index==3))" v-for="(item,index) in totalText" :key="index">
              <span>{{item}}</span>
              <p :class="{'w10': currentPosNumber==10}"></p>
            </li>
          </ul>
          <div class="mid-bot">
            <!-- 1格 10列 showData -->
            <div v-for="(element,num) in renderTotalShowList" :key="num" :class="{'part': true, 'w11': currentMaxNumber==11&&currentMinNumber==1, 'w6': currentMaxNumber==6&&currentMinNumber==1&&currentPosNumber==3}">
              <ul v-for="(item,index) in element" :key="index" class="column-ul">
                <li v-if="!(currentMaxNumber==11&&currentMinNumber==1&&(idx==2||idx==3))" v-for="(i,idx) in item" :key="idx">
                  <span>{{i}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="currentMaxNumber==9&&currentMinNumber==0&&currentPosNumber==5" class="mid-bot">
            <div class="part">
              <ul v-for="(item,index) in totalShowAllList" :key="index" class="column-ul">
                <li v-for="(i,idx) in item" :key="idx">
                  <span>{{i}}</span>
                </li>
              </ul>
            </div>
            <template v-if="[5,6].indexOf(currentType)>-1">
              <div v-for="(item,index) in twoList" :class="{'part': true, 'nobr': true, 'single2': index==1||index==2}">
                <template v-if="index==0">
                  <ul v-for="(item1,index1) in item.arr" :key="index1" class="column-ul">
                    <li v-for="(i,idx) in 4" :key="idx">
                      <span>{{i}}</span>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <ul class="column-ul">
                    <li v-for="(item1,index1) in 4" :key="index1">
                      <span></span>
                    </li>
                  </ul>
                </template>
              </div>
            </template>
            <template v-if="[2,3,4].indexOf(currentType)>-1">
              <div v-for="(item,index) in threeList" :class="{'part': true, 'nobr': true, 'single3': [4,5,6,7].indexOf(index)==-1, 'single2': [4,5,6,7].indexOf(index)>-1, 'darkbg': [0,1,2,3,9].indexOf(index)>-1}">
                <ul class="column-ul">
                  <li v-for="(item1,index1) in 4" :key="index1">
                    <span></span>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </div>
        <!-- 尾部 标注 -->
        <div v-if="currentId!=9" :class="{'top-box': true, 'w80': currentId==9}">
          <!-- 左侧 期数 & 开奖号码 -->
          <ul class="left-top">
            <li>期号</li>
            <li :class="{'w10': currentPosNumber==10}">开奖号码</li>
          </ul>
          <!-- 中侧 表格 -->
          <ul v-if="currentId!=9" class="mid-top bot">
            <li v-for="(item,index) in renderTitleList" :key="index" :class="{'w11': currentMaxNumber==11&&currentMinNumber==1, 'w6': currentMaxNumber==6&&currentMinNumber==1&&currentPosNumber==3}">
              <p>
                <i :class="{'w6': currentMaxNumber==6&&currentMinNumber==1&&currentPosNumber==3}" v-for="item in (currentMaxNumber-currentMinNumber+1)" :key="item">{{item-1+currentMinNumber}}</i>
              </p>
              <span>{{item}}</span>
            </li>
          </ul>
          <!-- 右侧 表格 -->
          <ul v-if="currentMaxNumber==9&&currentMinNumber==0&&currentPosNumber==5" class="mid-top bot">
            <li>
              <p>
                <i v-for="item in 10" :key="item">{{item-1}}</i>
              </p>
              <span>号码分布</span>
            </li>
            <template v-if="[5,6].indexOf(currentType)>-1">
              <li v-for="(item,index) in twoList" :key="index" :class="{'single2': index==1||index==2}">
                <template v-if="index==0">
                  <span>{{item.name}}</span>
                  <p>
                    <i v-for="i in 10" :key="i">{{i-1}}</i>
                  </p>
                </template>
                <template v-else>
                  <em>{{item.name}}</em>
                </template>
              </li>
            </template>
            <template v-if="[2,3,4].indexOf(currentType)>-1">
              <li v-for="(item,index) in threeList" :key="index" :class="{'single3': [4,5,6,7].indexOf(index)==-1, 'single2': [4,5,6,7].indexOf(index)>-1}">
                <em>{{item.name}}</em>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <!-- 时时彩 显示 -->
    <div v-if="currentMaxNumber==9&&currentMinNumber==0&&currentPosNumber==5" class="num-des">
      <div class="title">
        <span>数值说明</span>
        <i></i>
      </div>
      <ul>
        <li>
          <h3>号码分布</h3>
          <h4>指对开奖号码去除重复的顺序分布。例如开奖号码为22478，号码分布为2、4、7、8。</h4>
        </li>
        <li v-if="[2,3,4].indexOf(currentType)>-1">
          <h3>大小形态</h3>
          <h4>指三位开奖号码的大小形态，0-4为小号，5-9为大号。例如：开奖号码783，大小形态为“大大小”。</h4>
        </li>
        <li v-if="[2,3,4].indexOf(currentType)>-1">
          <h3>单双形态</h3>
          <h4>指三位开奖号码的单双形态，13579为单号，02468为双号。例如：开奖号码783，单双形态为“单双单”。</h4>
        </li>
        <li v-if="[2,3,4].indexOf(currentType)>-1">
          <h3>质合形态</h3>
          <h4>指三位开奖号码的质合形态，12357为质数号，04689为合数号。例如：开奖号码783，质合形态为“质合质”。</h4>
        </li>
        <li v-if="[2,3,4].indexOf(currentType)>-1">
          <h3>012形态</h3>
          <h4>指三位上的开奖号码形态，0路包括的数字：0、3、6、9；1路包括的数字：1、4、7；2路包括的数字：2、5、8。例如：开奖号码783，那么形态为“120”。</h4>
        </li>
        <li v-if="[2,3,4].indexOf(currentType)>-1">
          <h3>豹子</h3>
          <h4>指三位开奖号码全部相同，例如：开奖号码333，那么则是豹子。豹子打“√”，如果不是豹子则按未开出豹子的次数依次列出次数。</h4>
        </li>
        <li v-if="[2,3,4].indexOf(currentType)>-1">
          <h3>组三</h3>
          <h4>指三位开奖号码其中两位号码相同，例如：开奖号码788，那么则是组三。如果是组三，则在方框内打“√”；如果不是组三，方框内则空白。</h4>
        </li>
        <li v-if="[2,3,4].indexOf(currentType)>-1">
          <h3>组六</h3>
          <h4>指三位开奖号码各不相同，例如：开奖号码748，那么则是组六。如果是组六，则在方框内打“√”；如果不是组六，方框内则空白。</h4>
        </li>
        <li v-if="[2,3,4].indexOf(currentType)>-1">
          <h3>跨度</h3>
          <h4>指三位开奖号码的最大号码和最小号码的差值，例如：开奖号码为306，那么跨度为“6”,6-0=6。</h4>
        </li>
        <li v-if="[2,3,4].indexOf(currentType)>-1">
          <h3>直选和值</h3>
          <h4>指三位开奖号码相加得出的值，例如：123，那么直选和值为“6”,1+2+3=6</h4>
        </li>
        <li v-if="[2,3,4].indexOf(currentType)>-1">
          <h3>和值尾数</h3>
          <h4>指三位开奖号码相加得出的值，取尾数。例如：245，那么和值尾数为“1”，2+4+5=11，尾数为“1”。</h4>
        </li>
        <li v-if="[5,6].indexOf(currentType)>-1">
          <h3>跨度走势</h3>
          <h4>指两位开奖号码的最大号码和最小号码的差值，例如：开奖号码为36，那么跨度为“3”,6-3=3。</h4>
        </li>
        <li v-if="[5,6].indexOf(currentType)>-1">
          <h3>对子</h3>
          <h4>指两位开奖号码相同，例如：开奖号码88，那么则是对子。如果是对子，则在方框内打“√”；如果不是对子，方框内则按未开出对子的次数依次列出次数。</h4>
        </li>
        <li v-if="[5,6].indexOf(currentType)>-1">
          <h3>和值</h3>
          <h4>指两位开奖号码相加得出的值，例如：开奖号码为36，那么和值为“9”,3+6=9。</h4>
        </li>
        <li>
          <h3>出现总次数</h3>
          <h4>指在选定的期数范围内开出号码的总次数。</h4>
        </li>
        <li>
          <h3>平均遗漏值</h3>
          <h4>指在选定的期数范围内的平均遗漏值。计算公式为：（开奖总期数-中奖次数）÷中奖次数=平均遗漏值。例如：号码01在100期的中奖次数为63，需计算平均遗漏值，则计算公式为（100-63）÷63=
            0.58，向上取整数，那么号码01在100期的平均遗漏值为1。</h4>
        </li>
        <li>
          <h3>最大遗漏值</h3>
          <h4>指在选定的期数范围内未开出号码的最长间隔期数，例如：万位03在100期中有63期未开出，则万位03在100期中的最大遗漏值为63。</h4>
        </li>
        <li>
          <h3>最大连出值</h3>
          <h4>指在选定的期数范围内连续开出的号码次数最大的值。例如：万位号码03在20170626-051期出现过，在下一次的20170626-052也出现了，那么万位上的最大连出值则是2。</h4>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        currentHover: -1,
        lotteryData: [
          {
            categoryName: '经典时时彩',
            lotterys: [
              {
                lotteryId: 1,
                name: '重庆时时彩',
                checkList: 1, // 1都有 2 只有走势 0都没有
                type: 1, // 1都有 2没有四五星 0都没有
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 13,
                name: '天津时时彩',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 6,
                name: '新疆时时彩',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 14,
                name: '河内5分彩',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
            ]
          },
          {
            categoryName: '高频时时彩',
            lotterys: [
              {
                lotteryId: 28,
                name: '腾讯分分彩',
                checkList: 1,
                type: 2,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 29,
                name: '加拿大30秒',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 41,
                name: '多彩重庆30s',
                checkList: 2,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 42,
                name: '多彩腾讯30s',
                checkList: 2,
                type: 2,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 19,
                name: '河内1分彩',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 38,
                name: '日本分分彩',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 26,
                name: '瑞典1分彩',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 40,
                name: '印尼分分彩',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 27,
                name: '瑞典2分彩',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 39,
                name: '西贡分分彩',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
              {
                lotteryId: 23,
                name: '杏耀秒秒彩',
                checkList: 1,
                type: 1,
                min: 0,
                max: 9,
                pos: 5
              },
            ]
          },
          {
            categoryName: '11选5',
            lotterys: [
              {
                lotteryId: 35,
                name: '加拿大11选5',
                checkList: 2,
                type: 0,
                min: 1,
                max: 11,
                pos: 5
              },
              {
                lotteryId: 8,
                name: '广东11选5',
                checkList: 2,
                type: 0,
                min: 1,
                max: 11,
                pos: 5
              },
              {
                lotteryId: 7,
                name: '江西11选5',
                checkList: 2,
                type: 0,
                min: 1,
                max: 11,
                pos: 5
              },
              {
                lotteryId: 5,
                name: '山东11选5',
                checkList: 2,
                type: 0,
                min: 1,
                max: 11,
                pos: 5
              },
              {
                lotteryId: 30,
                name: '上海11选5',
                checkList: 2,
                type: 0,
                min: 1,
                max: 11,
                pos: 5
              },
              {
                lotteryId: 30,
                name: '安徽11选5',
                checkList: 2,
                type: 0,
                min: 1,
                max: 11,
                pos: 5
              }
            ]
          },
          {
            categoryName: 'PK10/赛马',
            lotterys: [
              {
                lotteryId: 24,
                name: '北京PK拾',
                checkList: 2,
                type: 0,
                min: 1,
                max: 10,
                pos: 10
              },
              {
                lotteryId: 34,
                name: '意大利PK10',
                checkList: 2,
                type: 0,
                min: 1,
                max: 10,
                pos: 10
              },
              {
                lotteryId: 25,
                name: '急速赛马',
                checkList: 2,
                type: 0,
                min: 1,
                max: 10,
                pos: 10
              }
            ]
          },
          {
            categoryName: '3D/P3',
            lotterys: [
              {
                lotteryId: 37,
                name: '加拿大3D',
                checkList: 1,
                type: 0,
                min: 0,
                max: 9,
                pos: 3
              },
              {
                lotteryId: 11,
                name: '福彩3D',
                checkList: 2,
                type: 0,
                min: 0,
                max: 9,
                pos: 3
              },
              {
                lotteryId: 12,
                name: '体彩P3',
                checkList: 2,
                type: 0,
                min: 0,
                max: 9,
                pos: 3
              }
            ]
          },
          {
            categoryName: '其他',
            lotterys: [
              {
                lotteryId: 49,
                name: '湖北快三',
                checkList: 2,
                type: 0,
                min: 1,
                max: 6,
                pos: 3
              },
              {
                lotteryId: 15,
                name: '江苏快三',
                checkList: 2,
                type: 0,
                min: 1,
                max: 6,
                pos: 3
              },
              {
                lotteryId: 44,
                name: '安徽快三',
                checkList: 2,
                type: 0,
                min: 1,
                max: 6,
                pos: 3
              },
              {
                lotteryId: 45,
                name: '广西快三',
                checkList: 2,
                type: 0,
                min: 1,
                max: 6,
                pos: 3
              },
              {
                lotteryId: 9,
                name: '北京快乐8',
                checkList: 0,
                type: 0,
                min: 1,
                max: 80,
                pos: 20
              }
            ]
          },
        ],
        changeFlag: false,    // 下拉框 是否显示
        pageSize: 30,   // 多少期
        titleList: [],    // 百位 十位 ...
        totalText: ['出现总次数', '平均遗漏值', '最大遗漏值', '最大连出值'],
        happyText: ['大小', '单双', '上下', '奇偶', '总计'],
        resultList: [],  // 接口返回中奖期数和中奖号码
        resultArr: [],    // 30个数组，对应30期中奖号码
        dataList: [],    // left part [[], [], [], [], []] 对应 每个二级数组中有30个数
        showList: [],    // mid part [[], [], [], [], []] 对应 每个二级数组中有10个数组 每个三级数组中有30个对象
        showAllList: [],  // right part [[],[],[]...] 号码分布 对应 有10个数组 每个二级数组中有30个对象
        totalShowList: [],    // mid总计 [[], [], [], [], []] 对应 每个二级数组中有10个数组  每个三级数组中有4个数
        totalShowAllList: [],   // right总计 [[],[],[]...] 号码分布 对应 有10个数组 每个二级数组中有4个数
        twoList: [],    // 两种 对应右侧数据
        threeList: [],  // 三种 对应右侧数据
        happyList: [],  // 北京快乐8 右侧对应数据
        canvasData: [],    // 红球每列从上到下的整理数据
        canvasPosition: [],    // [[],[],[],[],[]] 二级数组中 有30个[x,y] 用于画线
        pagesizeList: [
          { name: 30, active: true },
          { name: 50, active: false },
          { name: 100, active: false }
        ],
        checkboxList: [
          { id: 0, name: '走势线', active: true, show: false },
          { id: 1, name: '遗漏', active: true, show: false },
          { id: 2, name: '热号', active: false, show: false }
        ],
        typeList: [
          { id: 0, name: '五星', value: [1,1,1,1,1], active: true, show: false},
          { id: 1, name: '四星', value: [0,1,1,1,1], active: false, show: false},
          { id: 2, name: '前三', value: [1,1,1,0,0], active: false, show: false},
          { id: 3, name: '中三', value: [0,1,1,1,0], active: false, show: false},
          { id: 4, name: '后三', value: [0,0,1,1,1], active: false, show: false},
          { id: 5, name: '前二', value: [1,1,0,0,0], active: false, show: false},
          { id: 6, name: '后二', value: [0,0,0,1,1], active: false, show: false}
        ],
        currentTypeValue: [1,1,1,1,1],
        currentType: 0,   // 当前选中typeList的id
        currentLottery: {},
        categoryName: '',
        wholeWidth: '',
        singleLiWidth: 23,
        currentId: 0,
        currentMaxNumber: 9,   // 奖中的最大数
        currentMinNumber: 0,   // 奖中的最小数
        currentPosNumber: 5   // 开奖的位数
      }
    },
    computed: {
      renderResultList() {
        let arr = [];
        arr = this.resultList.filter((item,index) => index < this.pageSize);
        return arr;
      },
      renderTitleList() {
        let arr = [];
        this.currentTypeValue.forEach((item,index) => {
          if (item == 1) {
            arr.push(this.titleList[index]);
          }
        });
        return arr;
      },
      renderShowList() {
        let arr = [];
        this.currentTypeValue.forEach((item,index) => {
          if (item == 1) {
            arr.push(this.showList[index]);
          }
        });
        return arr;
      },
      renderTotalShowList() {
        let arr = [];
        this.currentTypeValue.forEach((item,index) => {
          if (item == 1) {
            arr.push(this.totalShowList[index]);
          }
        });
        return arr;
      },
      renderWidth() {
        const W = (this.currentMaxNumber - this.currentMinNumber + 1) * this.singleLiWidth + 1;
        let wNum = this.currentTypeValue.filter((item) => item).length;
        return wNum * W;
      },
      renderHeight() {
        const H = 30;
        return this.pageSize * H;
      }
    },
    watch: {
      '$route' (to, from) {
        this.changeFlag = false;
        window.location.reload();
      }
    },
    mounted() {
      this.getCurrentLotteryData();

      document.body.style.background = '#fff';
      let resultList = [];
      for (let i = 1; i <= 100; i++) {
        let obj = {
          name: '20181112-' + i,
          num: this.getRandomArray()
        };
        resultList.push(obj);
      }
      this.resultList = resultList;
      this.initDataList();    // 获取接口数据
      this.initRender();
      this.calculateWholeWidth();
      if (this.currentType == 2) {
        this.initShowThreeList();
      }
      if (this.currentId == 9) {
        this.initHappyList();
      }
    },
    methods: {
      enterItemBackground(idx) {
        this.currentHover = idx;
      },
      leaveItemBackground(idx) {
        this.currentHover = -1;
      },
      initRender() {
        if (this.currentId == 9) {
          return;
        }
        this.initShowList();    // 初始化 中间表格
        this.initShowAllList();    // 初始化 号码分布
        this.calculateTotal();  // 计算total
        this.updateCanvas();
      },
      calculateWholeWidth() {
        let l = this.$refs.dataLeft.offsetWidth;
        let m = this.$refs.dataMid ? this.$refs.dataMid.offsetWidth : 0;
        let r = this.$refs.dataRight ? this.$refs.dataRight.offsetWidth : 0;
        this.wholeWidth = (l+m+r)+'px';
        if (this.currentPosNumber == 10) {
          this.wholeWidth = '2712px';
        }
        if (this.currentId == 9) {
          this.wholeWidth = '964px';
        }
      },
      checkboxHandle(id) {
        this.checkboxList.forEach((item) => {
          if (item.id == id) {
            item.active = !item.active;
          }
        });
      },
      filterHandle(id) {
        if (this.currentId == 9) {
          return;
        }
        this.typeList.forEach((item) => {
          if (item.id == id) {
            item.active = true;
            this.currentType = id;
            this.currentTypeValue = item.value;
          } else {
            item.active = false;
          }
        });
        this.updateCanvas();
        this.initShowAllList();
        if ([5,6].indexOf(this.currentType) > -1) { // 跨度走势 对子 和值  (前二后二)
          this.initShowTwoList();
        }
        if ([2,3,4].indexOf(this.currentType) > -1) { // 前三 中三 后三
          this.initShowThreeList();
        }
      },
      initShowTwoList() {
        this.twoList = [];
        this.initKuaduList();
        let first = 1, duiziList = [], hezhiList = [];
        for (let i = 0; i < this.pageSize; i++) {
          let value = [], temp = '';
          if (this.currentType == 5) {
            value = this.resultArr[i].slice(0, 2);
          } else if (this.currentType == 6) {
            value = this.resultArr[i].slice(-2);
          }
          if (value[0] == value[1]) {
            temp = '√';
            first = 1;
          } else {
            temp = first++;
          }
          duiziList.push(temp);
          hezhiList.push(parseInt(value[0])+parseInt(value[1]));
        }
        this.twoList.push({name: '对子', arr: duiziList}, {name: '和值', arr: hezhiList});
        // console.log(this.twoList);
      },
      initShowThreeList() {
        this.threeList = [];
        let daxiaoList = [], danshuangList = [], zhiheList = [], xingtaiList = [], baoziList = [],
            zusanList = [], zuliuList = [], kuaduList = [], zhixuanhezhiList = [], hezhiweishuList = [];
        let baoziFirst = 1;

        for (let i = 0; i < this.pageSize; i++) {
          let value = [];
          if (this.currentType == 2) {
            value = this.resultArr[i].slice(0,3);
          } else if (this.currentType == 3) {
            value = this.resultArr[i].slice(1,4);
          } else if (this.currentType == 4) {
            value = this.resultArr[i].slice(2,5);
          }
          let daxiao = '', danshuang = '', zhihe = '', xingtai = '', baozi = '',
              zusan = '', zuliu = '', kuadu = '', zhixuanhezhi = '', hezhiweishu = '';
          value.forEach((item) => {
            if (item <= 4) {
              daxiao += '小';
            } else {
              daxiao += '大';
            }
            if (parseInt(item) % 2) {
              danshuang += '单';
            } else {
              danshuang += '双';
            }
            if ('12357'.indexOf(item)>-1) {
              zhihe += '质';
            } else {
              zhihe += '合';
            }
            if ('0369'.indexOf(item)>-1) {
              xingtai += '0';
            } else if ('147'.indexOf(item)>-1) {
              xingtai += '1';
            } else {
              xingtai += '2';
            }
          });

          let v = value, reg = /(\d)\1+/g;
          zhixuanhezhi = v.reduce((x,y) => parseInt(x)+parseInt(y));
          hezhiweishu = zhixuanhezhi.toString().slice(-1);
          kuadu = Math.max.apply(null,v) - Math.min.apply(null,v);
          v = v.sort().join('');
          let arr = v.match(reg);
          if (arr) {
            if (arr[0].length == 2) { // 组三 两个号码相同
              zusan = '√';
              baozi = baoziFirst++;
            } else {  // 豹子 三个号码相同
              zusan = '';
              baozi = '√';
              baoziFirst = 1;
            }
            zuliu = '';
          } else {  // 组六 三个号码各不相同
            zusan = '';
            baozi = baoziFirst++;
            zuliu = '√';
          }

          daxiaoList.push(daxiao);
          danshuangList.push(danshuang);
          zhiheList.push(zhihe);
          xingtaiList.push(xingtai);
          baoziList.push(baozi);
          zusanList.push(zusan);
          zuliuList.push(zuliu);
          kuaduList.push(kuadu);
          zhixuanhezhiList.push(zhixuanhezhi);
          hezhiweishuList.push(hezhiweishu);
        }
        this.threeList.push(
          {name: '大小形态', arr: daxiaoList},
          {name: '单双形态', arr: danshuangList},
          {name: '质合形态', arr: zhiheList},
          {name: '012形态', arr: xingtaiList},
          {name: '豹子', arr: baoziList},
          {name: '组三', arr: zusanList},
          {name: '组六', arr: zuliuList},
          {name: '跨度', arr: kuaduList},
          {name: '直选和值', arr: zhixuanhezhiList},
          {name: '和值尾数', arr: hezhiweishuList}
        );
      },
      initHappyList() {
        // this.resultArr
        let happyList = [];
        const MIDTOTAL = 810, MID = 40, VAL = 10;
        let daxiaoArr = [], danshuangArr = [], shangxiaArr = [], jiouArr = [], zongjiArr = [];
        for (let i = 0; i < this.pageSize; i++) {
          let daxiao = '大', danshuang = '单', shangxia = '上', jiou = '奇', zongji = 0;
          let num1 = 0;  // 统计 上 的个数
          let num2 = 0;  // 统计 奇 的个数
          this.resultArr[i].forEach((elem) => { // item   每一期的数据 数组
            zongji += elem;
            if (elem <= MID) {
              num1++;
            }
            if (elem % 2 == 1) {
              num2++;
            }
          });
          if (zongji < MIDTOTAL) {
            daxiao = '小';
          } else if (zongji == MIDTOTAL) {
            daxiao = '和';
          }
          if (num1 < VAL) {
            shangxia = '下';
          } else if (num1 == VAL) {
            shangxia = '中';
          }
          if (num2 < VAL) {
            jiou = '偶';
          } else if (num2 == VAL) {
            jiou = '中';
          }
          if (zongji % 2 == 0) {
            danshuang = '双';
          }
          daxiaoArr.push(daxiao);
          danshuangArr.push(danshuang);
          shangxiaArr.push(shangxia);
          jiouArr.push(jiou);
          zongjiArr.push(zongji);
        }
        happyList.push(daxiaoArr, danshuangArr, shangxiaArr, jiouArr, zongjiArr);
        this.happyList = happyList;
        console.log(happyList)
      },
      updateCanvas() {    // 重新筛选后 更新canvas
        this.getCanvasPositionData();
        this.$nextTick(() => {
          this.initCanvasData();
          this.calculateWholeWidth();
        });
      },
      changePageSize(size) {
        this.pagesizeList.forEach((item) => {
          if (item.name == size) {
            item.active = true;
            this.pageSize = size;
          } else {
            item.active = false;
          }
        });
        this.initRender();
        if (this.currentId == 9) {
          this.initHappyList();
          return;
        }
        this.updateCanvas();
        if ([5,6].indexOf(this.currentType) > -1) { // 跨度走势 对子 和值  (前二后二)
          this.initShowTwoList();
        } else if ([2,3,4].indexOf(this.currentType) > -1) {
          this.initShowThreeList();
        }
      },
      getCurrentLotteryData() {
        this.currentId = this.$route.params.lotteryId;
        this.lotteryData.forEach((item,index) => {
          item.lotterys.forEach((elem,idx) => {
            if (elem.lotteryId == this.currentId) {
              this.currentLottery = elem;
              this.categoryName = item;
            }
          });
        });
        this.currentDataHandle();
      },
      currentDataHandle() {
        this.currentMaxNumber = this.currentLottery.max;
        this.currentMinNumber = this.currentLottery.min;
        this.currentPosNumber = this.currentLottery.pos;
        if (this.currentMaxNumber == 11 && this.currentMinNumber == 1) {  // 11选5 隐藏back
          this.checkboxList[1].active = false;
        }
        if (this.currentMaxNumber == 9 && this.currentMinNumber == 0 && this.currentPosNumber == 3) {  // 加拿大3D 湖北快三
          this.titleList = ['万位', '千位', '百位'];
          this.currentTypeValue = [1,1,1];
        }else if (this.currentMaxNumber == 6 && this.currentMinNumber == 1 && this.currentPosNumber == 3) {
          this.titleList = ['万位', '千位', '百位'];
          this.currentTypeValue = [1,1,1];
          this.singleLiWidth = 50;
        } else if (this.currentPosNumber == 10) {
          this.titleList = ['冠军', '亚军', '季军', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'];
          this.currentTypeValue = [1,1,1,1,1,1,1,1,1,1];
        } else {
          this.titleList = ['万位', '千位', '百位', '十位', '个位'];
          this.currentTypeValue = [1,1,1,1,1];
        }

        let checkNum = this.currentLottery.checkList;  // 1都有 2只有走势 3都没有
        this.checkboxList.forEach((item,index) => {
          if (checkNum == 1) {
            item.show = true;
          } else if (checkNum == 2) {
            item.show = index == 0 ? true : false;
          } else {
            item.show = false;
          }
        });
        let typeNum = this.currentLottery.type; // 1都有 2没有四五星 0都没有
        this.typeList.forEach((item,index) => {
          if (typeNum == 1) {
            item.show = true;
          } else if (typeNum == 2) {
            item.show = (index == 0 || index == 1) ? false : true;
            if (index == 2) {
              item.active = true;
              this.currentType = item.id;
              this.currentTypeValue = item.value;
            } else {
              item.active = false;
            }
          } else {
            item.show = false;
            item.active = false;
            this.currentType = 0;
          }
        })
      },
      initCanvasData() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        canvas.height = canvas.height;
        this.canvasPosition.forEach((item) => {
          ctx.beginPath();
          item.forEach((i, idx) => {
            if (idx == 0) {
              ctx.moveTo(i[0], i[1]);
            } else {
              ctx.lineTo(i[0], i[1]);
            }
          });
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgb(231,62,62)';
          ctx.stroke();
        });
      },
      getRandomArray() {  // 获取5位号码 随机
        let arr = [];
        for (let i = 1; i <= this.currentPosNumber; i++) {
          if (this.currentMaxNumber == 11 && this.currentMinNumber == 1) {  // 11选5
            arr.push(Math.ceil(Math.random() * 11));
          } else if (this.currentMaxNumber == 9 && this.currentMinNumber == 0) {  // 时时彩  3D
            arr.push(Math.floor(Math.random() * 10));
          } else if (this.currentMaxNumber == 6 && this.currentMinNumber == 1) { // 快三
            arr.push(Math.ceil(Math.random() * 6));
          } else if (this.currentMaxNumber == 10 && this.currentMinNumber == 1) { // pk10
            arr.push(Math.ceil(Math.random() * 10));
          } else if (this.currentMaxNumber == 80 && this.currentMinNumber == 1) {
            arr.push(Math.ceil(Math.random() * 80));
          }
        }
        if (this.currentId == 9) {
          arr = Array.from(new Set(arr));
          while(arr.length < 20) {
            arr.push(Math.ceil(Math.random() * 80));
            arr = Array.from(new Set(arr));
          }
          arr.sort((a,b) => a - b);
        }
        return arr;
      },
      initDataList() {
        let resultArr = []; // format result 30个数组，包含中奖号码
        this.resultList.forEach((item) => {
          resultArr.push(item.num); // 中奖号码数组
        });
        this.resultArr = resultArr;
        for (let i = 0; i < this.currentPosNumber; i++) {
          let temp = [];
          for (let j = 0; j < resultArr.length; j++) {
            temp.push(parseInt(resultArr[j][i]));
          }
          this.dataList.push(temp);
        }
      },
      initShowList() {
        let result = [];
        let canvasResult = [];  // 5个数组
        let wholeData = JSON.parse(JSON.stringify(this.dataList));
        wholeData.forEach((item, index) => {
          // item  1格 - 万
          canvasResult[index] = [];
          let showData = [];  // 万 里面有10个数组
          for (let i = this.currentMinNumber; i <= this.currentMaxNumber; i++) {  // i是固定的，对应万位相应的0-9
            let temp = [],    // 每个数组里面，有30个对象
              count = 1;
            for (let j = 0; j < this.pageSize; j++) {  // 万 对应的10个列 每一列的数据
              let obj = {
                back: count,  // 底部灰色字
                bingo: 0,     // 1=选中 2=未中
                value: -1     // 选中时的值
              };
              if (item[j] == i) {   // bingo=1，说明选中了
                obj.bingo = 1;
                obj.back = '';
                obj.value = i;
                count = 1;
                canvasResult[index].push({
                  index: j,
                  value: i
                });
              } else {
                count++;
              }
              temp.push(obj);
            }
            showData.push(temp);
          }
          result.push(showData);
          canvasResult[index] = canvasResult[index].sort((a, b) => a.index - b.index);
        });
        this.showList = result;
        this.canvasData = canvasResult;
        this.getCanvasPositionData();
      },
      getCanvasPositionData() {
        this.canvasPosition = [];
        let arr = JSON.parse(JSON.stringify(this.canvasData));

        arr = arr.filter((item,index) => {
          return this.currentTypeValue[index];
        });

        const LISTWIDTH = (this.currentMaxNumber - this.currentMinNumber + 1) * this.singleLiWidth + 1,
          LIHEIGHT = 30,
          W = parseInt(this.singleLiWidth/2),
          H = 15;
        arr.forEach((item, index) => {
          let temp = [];
          item.forEach((elem) => {
            temp.push([(elem.value - this.currentMinNumber) * this.singleLiWidth + index * LISTWIDTH + W, elem.index * LIHEIGHT + H]);
          });
          this.canvasPosition.push(temp);
        });
      },
      initShowAllList() {
        let showData = [];  // 里面有10个数组
        for (let i = this.currentMinNumber; i <= this.currentMaxNumber; i++) {  // i是固定的，对应万位相应的0-9
          let temp = [],    // 每个数组里面，有30个对象
            count = 1;
          for (let j = 0; j < this.pageSize; j++) {  // 万 对应的10个列 每一列的数据
            let obj = {
              back: count,  // 底部灰色字
              bingo: 0,     // 1=选中 2=未中
              value: -1     // 选中时的值
            };
            let pos = this.resultArr[j].indexOf(i);
            if (pos > -1 && this.currentTypeValue[pos] == 1) {   // bingo=1，说明选中了
              obj.bingo = 1;
              obj.back = '';
              obj.value = i;
              count = 1;
            } else {
              count++;
            }
            temp.push(obj);
          }
          showData.push(temp);
        }
        this.showAllList = showData;
      },
      initKuaduList() {
        let showData = [];  // 里面有10个数组
        for (let i = 0; i < 10; i++) {  // i是固定的，对应万位相应的0-9
          let temp = [],    // 每个数组里面，有30个对象
            count = 1;
          for (let j = 0; j < this.pageSize; j++) {  // 万 对应的10个列 每一列的数据
            let obj = {
              back: count,  // 底部灰色字
              bingo: 0,     // 1=选中 2=未中
              value: -1     // 选中时的值
            };
            let value = 0;  // 跨度值
            let arr = [];
            if (this.currentType == 5) {  // 前二
              arr = this.resultArr[j].slice(0,2);
            } else if (this.currentType == 6) { // 后二
              arr = this.resultArr[j].slice(-2);
            }
            arr = Array.from(arr);
            value = Math.max.apply(null,arr) - Math.min.apply(null,arr);
            if (value == i) {   // bingo=1，说明选中了
              obj.bingo = 1;
              obj.back = '';
              obj.value = i;
              count = 1;
            } else {
              count++;
            }
            temp.push(obj);
          }
          showData.push(temp);
        }
        this.twoList.push({name: '跨度走势', arr: showData});
      },
      calculateTotal() {
        let totalData = [];
        this.showList.forEach((element, num) => {
          // element  万位的数据 包含10个数组
          let part = [];  // 10个数组 每个数组4个值
          element.forEach((item, index) => {
            //  item   对应的30个对象的数组
            let total = [
              this.totalAverageMiss(item)[0],
              this.totalAverageMiss(item)[1],
              this.totalMaxMiss(item),
              this.totalMaxSeries(item)
            ];
            part.push(total);
          });
          totalData.push(part);
        });
        this.totalShowList = totalData;

        this.calculateHotNumber();

        let partAll = [];
        this.showAllList.forEach((item) => {
          //  item   对应的30个对象的数组
          let total = [
            this.totalAverageMiss(item)[0],
            this.totalAverageMiss(item)[1],
            this.totalMaxMiss(item),
            this.totalMaxSeries(item)
          ];
          partAll.push(total);
        });
        this.totalShowAllList = partAll;
      },
      calculateHotNumber() {
        let arr = []; // 5个数 分别是各个位置出现次数最多的数字
        this.totalShowList.forEach((item) => {  // item 万位 有10个数组
          let num = 0, value = [];
          item.forEach((elem,index) => { // elem 有四个数
            if (elem[0] > num) {
              num = elem[0];
              value = [index];
            } else if (elem[0] == num) {
              value.push(index);
            }
          });
          arr.push(value);
        });
        arr.forEach((item,index) => {
          this.showList.forEach((item1,idx) => {
            if (index == idx) {
              item1.forEach((elem,idxx) => {
                if (arr[index].indexOf(idxx) > -1) {
                  elem.forEach((i) => {
                    if (i.bingo) {
                      this.$set(i, 'hot', 1);
                    }
                  });
                }
              })
            }
          });
        });
      },
      totalAverageTimes(arr) { // 计算出现总次数
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].bingo == 1) {
            total++;
          }
        }
        return total;
      },
      totalAverageMiss(arr) { // 计算平均遗漏值
        let num = this.totalAverageTimes(arr);
        let total = 0;
        if (num == 0) {
          total = this.pageSize + 1;
        } else {
          total = Math.ceil((this.pageSize - num) / num);
        }
        return [num, total];
      },
      totalMaxMiss(arr) { // 计算最大遗漏值
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].back > total) {
            total = arr[i].back;
          }
        }
        return total;
      },
      totalMaxSeries(arr) { // 计算最大连出值
        let total = 0;
        let temp = [];
        arr.forEach((item) => {
          temp.push(item.bingo);
        });
        temp = temp.join('');
        let reg = /(1)\1*/g;  // 贪婪
        let result = temp.match(reg);
        if (result) {
          total = Math.max.apply(null, result).toString().length;
        }
        return total;
      }
    }
  }
</script>

<style lang="scss">
  .chart-page {
    min-width: 1122px;
    .code-spaning {
      height: 75px;
      background: #12131a;
      font-size: 14px;
      color: #fff;
      margin-bottom: 15px;
      position: relative;
      .lhfx_tit {
        float: left;
        text-align: left;
        margin: 13px 0 0 15px;
        h5 {
          font-size: 22px;
          background: url(../assets/chart/lhfx_czqh_jt.png) no-repeat right 12px;
          padding-right: 18px;
          font-weight: normal;
        }
        p {
          display: block;
          width: 100%;
          font-size: 14px;
          font-style: normal;
          color: #848484;
        }
        .showAll {
          vertical-align: middle;
          cursor: pointer;
          display: none;
          width: 30px;
          height: 30px;
          position: absolute;
        }
        .lhfx_lotterylist {
          position: absolute;
          z-index: 9900;
          top: 0;
          left: 0;
          line-height: 20px;
          padding-top: 75px;
        }
        .lhfx_lotterylist_con {
          border: 1px solid #ddd;
          box-shadow: 2px 3px 5px #ddd;
          background: #f8f8f8;
          padding: 10px 0 18px 15px;
          dl {
            font-size: 14px;
            overflow: hidden;
            width: 240px;
            dt {
              color: #2aa0fb;
              font-weight: bold;
              font-size: 16px;
              margin-top: 8px;
            }
            dd {
              padding: 5px 0px 0px 0;
              width: 120px;
              float: left;
              display: inline;
              a {
                font-size: 14px;
                color: #888;
                font-weight: normal;
                cursor: pointer;
                &:hover {
                  color: #2aa0fb;
                  font-weight: normal;
                }
              }
            }
          }
        }
      }
      .secondary_tabs {
        position: absolute;
        left: 317px;
        bottom: 0;
        ul {
          padding: 0;
          li {
            margin: 0 10px 0 0 !important;
            border: none;
            width: 120px;
            float: left;
            width: 120px;
            height: 40px;
            line-height: 40px;
            border-radius: 5px 5px 0 0;
            text-align: center;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            a, a:hover {
              display: inline;
              background: none;
              border: none;
            }
            i {
              width: 100%;
              height: 0;
              border-top: 4px solid #2ba3fa;
              position: absolute;
              top: 0;
              left: 0;
              margin: 0;
              padding: 0;
              display: none;
            }
            &.curr {
              background: #fff;
              font-weight: bold;
              a {
                color: #333;
                background: none;
                border: none;
              }
              i {
                display: block;
              }
            }
          }
        }
      }
      .adjust-div {
        height: 75px;
        background: #12131a;
      }
    }
    .wo_choose {
      padding-bottom: 18px;
      font-size: 14px;
      color: #333;
      clear: both;
      overflow: hidden;
      width: 100%;
      span {
        font-weight: bold;
        font-size: 18px;
      }
      label {
        color: #2aa1fa;
      }
      .type, .filter {
        float: left;
        overflow: hidden;
      }
      .type {
        margin-left: 45px;
        padding-top: 8px;
        li {
          float: left;
          margin-right: 25px;
          cursor: pointer;
          span {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 1px solid #ddd;
            border-radius: 100%;
            vertical-align: middle;
            margin-right: 5px;
            cursor: pointer;
            i {
              display: block;
              width: 10px;
              height: 10px;
              margin: 3px 0 0 3px;
              background: #d2cfcf;
              border-radius: 100%;
            }
          }
          &.active {
            span i {
              background: #2ea6f9;
            }
          }
        }
      }
      .filter {
        margin-left: 50px;
        li {
          float: left;
          width: 90px;
          height: 30px;
          margin: 0 10px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 5px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          &.hover, &:hover {
            background: linear-gradient(to bottom, #40c6e8, #2699ff);
            color: #fff;
          }
        }
      }
    }
    .num-des {
      font-size: 12px;
      margin-top: 20px;
      padding: 20px 0;
      border-top: 1px solid #ddd;
      background: #fafafa;
      position: relative;
      min-width: 1200px;
      ul {
        margin: 10px 50px 0 110px;
      }
      li {
        margin-bottom: 15px;
        color: #666666;
      }
      h4 {
        font-weight: normal;
        color: #888888;
        margin-top: 5px;
      }
      .title {
        font-size: 18px;
        font-weight: bold;
        position: absolute;
        left: 30px;
        top: 20px;
        span {
          display: inline-block;
          width: 45px;
          height: 48px;
        }
        i {
          display: inline-block;
          width: 4px;
          height: 42px;
          margin-left: 5px;
          vertical-align: -4px;
          background: #2ea6f9;
        }
      }
    }
  }

  .box-class {
    overflow: hidden;
    text-align: center;
  }

  .show-right {
    float: left;
    .part {
      float: left;
      display: inline-block;
      width: 231px;
      box-sizing: border-box;
      border-right: 1px solid #dbdddf;
      font-size: 16px;
      &.w11 {
        width: 254px;
      }
      &.w6 {
        width: 301px;
      }
    }
    .w6 {
      .column-ul {
        width: 50px;
      }
    }
    .column-ul {
      width: 23px;
      display: inline-block;
      li {
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        &.hov {
          background: rgba(245,226,208,.4);
        }
        &:nth-child(5n) {
          border-bottom: 1px solid #dbdddf;
        }
        span {
          display: inline-block;
          color: #bbb;
          font-size: 12px;
          &.bingo {
            color: #fff;
            width: 22px;
            height: 22px;
            line-height: 22px;
            background: #e73e3e;
            border-radius: 20px;
            font-size: 14px;
            position: relative;
            z-index: 200;
          }
        }
      }
    }
  }

  .test-wrap {
    .result-list {
      .top-box {
        @extend .box-class;
        color: #595959;
        font-size: 13px;
        background: #e6ecf8;
        font-weight: bold;
        &.w80 {
          .left-top li {
            height: 30px;
            line-height: 30px;
            &:last-child {
              width: 600px;
            }
          }
          .mid-top {
            height: 30px;
            li {
              width: 50px;
              height: 30px;
              line-height: 30px;
            }
          }
        }
        .left-top {
          border: 1px solid #dbdddf;
          float: left;
          box-sizing: border-box;
          font-size: 0;
          li {
            display: inline-block;
            width: 142px;
            &.w10 {
              width: 284px;
            }
            height: 54px;
            line-height: 54px;
            font-size: 13px;
            box-sizing: border-box;
            &:first-child {
              border-right: 1px solid #dbdddf;
              width: 112px;
            }
          }
        }
        .mid-top {
          float: left;
          border-top: 1px solid #dbdddf;
          border-bottom: 1px solid #dbdddf;
          font-size: 0;
          &.bot {
            li span {
              border-bottom: none;
              border-top: 1px solid #dbdddf;
            }
          }
          li {
            display: inline-block;
            width: 231px;
            &.w11 {
              width: 254px;
            }
            &.w6 {
              width: 301px;
            }
            box-sizing: border-box;
            border-right: 1px solid #dbdddf;
            font-size: 13px;
            float: left;
            &.single2 {
              width: 30px;
              line-height: 54px;
              text-align: center;
            }
            &.single3 {
              width: 60px;
              line-height: 54px;
              text-align: center;
            }
            span {
              display: block;
              height: 22px;
              line-height: 22px;
              box-sizing: border-box;
              border-bottom: 1px solid #dbdddf;
            }
            p {
              display: block;
              height: 32px;
              line-height: 32px;
              font-size: 0;
              i {
                font-style: normal;
                display: inline-block;
                width: 23px;
                &.w6 {
                  width: 50px;
                }
                font-size: 13px;
                color: #595959;
                font-weight: normal;
                border-right: 1px solid #dbdddf;
                box-sizing: border-box;
                &:last-child {
                  border-right: none;
                }
              }
            }
          }
        }
      }
      .middle-box {
        @extend .box-class;
        font-size: 16px;
        &.w80 {
          .left-box li {
            span {
              border-bottom: 1px solid #dbdddf;
            }
            p {
              width: 600px;
              border-bottom: 1px solid #dbdddf;
              i {
                background: none;
                color: #888;
                font-weight: normal;
                font-size: 13px;
                border-right: 1px solid #dbdddf;
                border-radius: 0;
                width: 5%;
                height: 100%;
                line-height: inherit;
                box-sizing: border-box;
                margin-right: 0;
                &:last-child {
                  border-right: none;
                }
              }
            }
            &:nth-child(5n) {
              border-bottom: none;
            }
            &:last-child {
              border-bottom: none;
            }
          }
          .mid-box {
            .part {
              width: 50px;
              &.red {
                .column-ul li span {
                  color: #CA5050;
                  font-weight: bold;
                }
              }
              &.blue {
                .column-ul li span {
                  color: #1A89D8;
                  font-weight: bold;

                }
              }
              .column-ul {
                width: 100%;
                li {
                  border-bottom: none;
                  span {
                    display: block;
                    border-bottom: 1px solid #dbdddf;
                  }
                }
              }
            }
          }
        }
        .left-box {
          float: left;
          border-left: 1px solid #dbdddf;
          border-right: 1px solid #dbdddf;
          box-sizing: border-box;
          li {
            height: 30px;
            line-height: 30px;
            box-sizing: border-box;
            font-size: 0;
            &.hov {
              background: rgba(245,226,208,.4);
            }
            span {
              display: inline-block;
              width: 112px;
              border-right: 1px solid #dbdddf;
              box-sizing: border-box;
              font-size: 12px;
            }
            p {
              display: inline-block;
              width: 142px;
              &.w10 {
                width: 284px;
              }
              box-sizing: border-box;
              font-size: 16px;
              i {
                font-style: normal;
                display: inline-block;
                width: 22px;
                height: 22px;
                background: #eee;
                color: #e73e3e;
                font-size: 15px;
                font-weight: bold;
                line-height: 22px;
                border-radius: 22px;
                margin-right: 5px;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
            &:nth-child(5n) {
              border-bottom: 1px solid #dbdddf;
            }
          }
        }
        .mid-box {
          @extend .show-right;
          .single2 .column-ul li {
            span {
              visibility: visible;
              color: #595959;
            }
          }
          .single3.darkbg {
            background: #909fbf;
            &:nth-child(2n+1) {
              background: #71af9e;
            }
            &:last-child{
              background: #909fbf;
            }
            .column-ul li {
              box-sizing: border-box;
              border-bottom: 1px solid #fff;
              span {
                color: #fff;
              }
            }
          }
          .single3 .column-ul li {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 5px;
            span {
              visibility: visible;
              color: #595959;
              &.letter {
                letter-spacing: 3px;
              }
            }
          }
          .column-ul li {
            span {
              visibility: hidden;
              &.bingo {
                visibility: visible;
              }
            }
          }
          .part.single2 {
            width: 30px;
            .column-ul {
              width: 100%;
            }
          }
          .part.single3 {
            width: 60px;
            .column-ul {
              width: 100%;
            }
          }
          position: relative;
          canvas {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
          }
        }
        &.zsx {
          .mid-box canvas {
            display: block;
          }
        }
        &.yl {
          .mid-box .column-ul li span {
            visibility: visible;
          }
        }
        &.rh {
          .mid-box .column-ul li span.bingo {
            &.hot {
              background: #f58500;
            }
          }
        }
      }
      .bottom-box {
        @extend .box-class;
        font-size: 12px;
        color: #595959;
        .left-bot {
          border-left: 1px solid #dbdddf;
          border-right: 1px solid #dbdddf;
          float: left;
          li {
            overflow: hidden;
            span {
              float: left;
              width: 112px;
              border-right: 1px solid #dbdddf;
              box-sizing: border-box;
              height: 35px;
              line-height: 35px;
              border-bottom: 1px solid #dbdddf;
            }
            &:last-child span {
              border-bottom: none;
            }
            p {
              float: left;
              height: 35px;
              line-height: 35px;
              display: inline-block;
              width: 142px;
              &.w10 {
                width: 284px;
              }
              border-bottom: 1px solid #dbdddf;
              box-sizing: border-box;
            }
            &:last-child p {
              border-bottom: none;
            }

          }
        }
        .mid-bot {
          @extend .show-right;
          .part.single2 {
            width: 30px;
            .column-ul {
              width: 100%;
            }
            &.nobr {
              border-right: none;
              &:last-child {
                border-right: 1px solid #dbdddf;
              }
            }
          }
          .part.single3 {
            width: 60px;
            .column-ul {
              width: 100%;
            }
            &.nobr {
              border-right: none;
              &:last-child {
                border-right: 1px solid #dbdddf;
              }
            }
          }
          .column-ul {
            li {
              height: 35px;
              line-height: 35px;
              box-sizing: border-box;
              border-bottom: 1px solid #dbdddf;
              &:last-child {
                border-bottom: 0;
              }
            }
          }
          .column-ul {
            li {
              span {
                color: #595959;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

</style>
