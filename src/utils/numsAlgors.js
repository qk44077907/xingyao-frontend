function isArray(arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return true
  } else {
    return false
  }
}

function validateParms(betCodeArr) {
  if (!isArray(betCodeArr)) {
    return false
  }
  for (let i = 0; i < betCodeArr.length; i++) {
    if (!isArray(betCodeArr[i])) {
      return false
    }
  }
  return true
}
function factorialize(num) {
  let res = 1;
  for (let i=1; i<=num;i++){
    res = res * i;
  }
  return res;
}
function C(base, choose) {
  if(base < choose){
    return 0
  }
  return factorialize(base) / (factorialize(choose) * factorialize(base - choose))
}
function A(base, choose) {
  if(base < choose){
    return 0
  }
  return factorialize(base) / factorialize(base - choose)
}

//--------------------------------//
function generateRenXuanZhiXuanFuShi(size) {
  return function renxuan(betCodeArr) {
    if (!validateParms(betCodeArr)) {
      throw new Error('参数类型不符合[][]')
    }
    let temp = []
    betCodeArr.forEach((codeArr, index) => {
      if (codeArr.length === 0) {
        return
      } else {
        temp.push({
          index,
          value: codeArr
        })
      }
    })
    betCodeArr = temp;
    let result = []

    function loop(unselectedList, selectedList) {
      if (!selectedList) {
        selectedList = []
      }
      // 未被选择的list示例
      /*[
        {
          index: 0,
          value: [1, 2, 3]
        },
        {
          index: 3,
          value: [3]
        },
        {
          index: 4,
          value: [4]
        }
      ]*/
      // 已被选择的对象list示例
      /*[]*/

      //循环未选中的对象list，相当于位置上按123,124,125,134...的循环
      unselectedList.forEach((selected, i) => {
        //遍历当前对象的value :[1,2,3]
        selected.value.forEach((choice) => {
          const newSelectedList = [...selectedList, {
            index: selected.index,
            value: choice
          }];
          //新的未被选择的对象，过滤条件：在原未被选择的对象list里排在当前对象之后
          const newUnselectedList = unselectedList.filter((_, j) => j > i);
          //如果已被选择的对象格式达到任选X的数量X，则把已选推入结果list。
          if (newSelectedList.length === size) {
            result.push(newSelectedList);
            return;
          }
          loop(newUnselectedList, newSelectedList);
        })
      });
    }

    loop(betCodeArr)

    //res 的当前格式为
    /*[
      {
        index: 0,
        value: 1
      },
        {
          index: 3,
          value: 3
        },
        {
          index: 4,
          value: 4
        }
      ]*/
    //res的格式转换为
    // [[1,'-','-','3','4'] ,[2,'-','-','3','4']]
    // 格式转换在前端不必要，可以作为开奖校验逻辑的参考
    let res = result.map((r) => {
      let tmp = ['-', '-', '-', '-', '-']
      r.forEach((a) => {
        tmp[a.index] = a.value;
      })
      return tmp
    })
    //返回此单总注数
    return res.length
  }
}
function generateRenXuanZuXuanFuShi(size) {
  return function (betCodeArr,show_str,chosenPosition) {
    return C(betCodeArr[0].length,size) * C(chosenPosition.length,size)
  }
}
function generateDanShi(type,size) {
  return function (inputString,chosenPosition) {
    let res = {} //返回结果是对象
    let num = 0; //注数
    let codes    //下注编码
    let sameCodeMap = []
    let wrongCodeMap = []
    inputString.replace(/[;\s]/gi,',')
    let inputArr = inputString.split(',').filter(code => code.length > 0).map(code=> {
      //组选则进行排序，12与21视为一致
      switch (type){
        case 'zhixuan':
          return code;
        case 'zuxuan':
          return code.split('').sort().join('')
      }
    }
    ).filter(code =>{
      //记录及查询错误号码
      if(code.length === size){
        return true
      }else {
        if(wrongCodeMap.indexOf(code) === -1){
          wrongCodeMap.push(code)
        }
        return false
      }
    }).sort().sort((a,b) =>{
      //查重
      if(a==b && sameCodeMap.indexOf(a) === -1) sameCodeMap.push(a);
    })
    //去重
    inputArr =  [...new Set(inputArr)]

    if(typeof chosenPosition !== 'undefined'){
      let chosenPositionNums = chosenPosition.length
      if(chosenPositionNums < size){
        num = 0
      }else {
          num =C(chosenPositionNums,size) * inputArr.length
      }
    }else {
        num =inputArr.length
    }
    codes = inputArr.join(',')
    res = {num,codes}
    if(sameCodeMap.length > 0){
      res.same = sameCodeMap.join(',') //重复号码
    }
    if(wrongCodeMap.length > 0){
      res.wrong = wrongCodeMap.join(',') //错误号码
    }
    return res
  }.bind(this)
}

function zhixuan(betCodeArr, show_str) {
  if (!validateParms(betCodeArr)) {
    throw new Error('参数类型不符合[][]')
  }
  return betCodeArr.filter((arr, index) => show_str.split(',')[index] !== '-')
    .map(arr => arr.length)
    .reduce((accumulator, currentValue) => accumulator * currentValue)
}

function generateHeZhi(type, size) {
  return function (betCodeArr,show_str,chosenPosition) {
    const map = {
      zhixuan: {
        2: {
          0: 1,
          1: 2,
          2: 3,
          3: 4,
          4: 5,
          5: 6,
          6: 7,
          7: 8,
          8: 9,
          9: 10,
          10: 9,
          11: 8,
          12: 7,
          13: 6,
          14: 5,
          15: 4,
          16: 3,
          17: 2,
          18: 1,
        },
        3: {
          0: 1,
          1: 3,
          2: 6,
          3: 10,
          4: 15,
          5: 21,
          6: 28,
          7: 36,
          8: 45,
          9: 55,
          10: 63,
          11: 69,
          12: 73,
          13: 75,
          14: 75,
          15: 73,
          16: 69,
          17: 63,
          18: 55,
          19: 45,
          20: 36,
          21: 28,
          22: 21,
          23: 15,
          24: 10,
          25: 6,
          26: 3,
          27: 1,
        },
      },
      zuxuan: {
        2:{
          1: 1,
          2: 1,
          3: 2,
          4: 2,
          5: 3,
          6: 3,
          7: 4,
          8: 4,
          9: 5,
          10: 4,
          11: 4,
          12: 3,
          13: 3,
          14: 2,
          15: 2,
          16: 1,
          17: 1,
        },
        3: {
          1:1,
          2:2,
          3:2,
          4:4,
          5:5,
          6:6,
          7:8,
          8:10,
          9:11,
          10:13,
          11:14,
          12:14,
          13:15,
          14:15,
          15:14,
          16:14,
          17:13,
          18:11,
          19:10,
          20:8,
          21:6,
          22:5,
          23:4,
          24:2,
          25:2,
          26:1,
        }
      }
    }
    let nums = 0
    betCodeArr[0].forEach(sum => {
      nums += map[type][size][sum]
    })
    if(typeof chosenPosition !=='undefined'){
      nums*=C(chosenPosition.length,size)
    }
    //return map[type][size][sum]
    return nums
  }
}
function generateKuaDu(size) {
  return function (betCodeArr) {
    const map = {
      2:{
        0:10,
        1:18,
        2:16,
        3:14,
        4:12,
        5:10,
        6:8,
        7:6,
        8:4,
        9:2,
      },
      3:{
        0:10,
        1:54,
        2:96,
        3:126,
        4:144,
        5:150,
        6:144,
        7:126,
        8:96,
        9:54,
      }
    }
    let nums = 0
    betCodeArr[0].forEach(diff => {
      nums += map[size][diff]
    })
    //return map[type][size][sum]
    return nums
  }
}
//组3
function zu3(betCodeArr) {
  let chosenLength = betCodeArr[0].length
  return chosenLength * (chosenLength -1)
}
//组6
function zu6(betCodeArr) {
  let chosenLength = betCodeArr[0].length
  return C(chosenLength,3)
}
//前二，后二，组选
function ZuXuan2(betCodeArr) {
  let chosenLength = betCodeArr[0].length
  return C(chosenLength,2)
}
//定位胆
function DingWeiDan(betCodeArr) {
  let num = 0
  betCodeArr.forEach(arr => num+=arr.length)
  return num
}
//不定胆
function BuDingDan1(betCodeArr) {
  return betCodeArr[0].length
}
function BuDingDan2(betCodeArr) {
  return C(betCodeArr[0].length,2)
}
//趣味
function QuWei(betCodeArr) {
  return betCodeArr[0].length
}
//包胆
function BaoDan(betCodeArr) {
  return 54 * betCodeArr[0].length
}
//和值尾数
function HeZhiWeiShu(betCodeArr) {
  return betCodeArr[0].length
}
//大小单双
function dxds(betCodeArr) {
  return betCodeArr[0].length
}
//全5中1
function Quan5zhong1(betCodeArr) {
  return betCodeArr[0].length
}

const ZhiXuanHeZhi3 = generateHeZhi('zhixuan', 3)
const ZhiXuanHeZhi2 = generateHeZhi('zhixuan', 2)
const ZuXuanHeZhi3 = generateHeZhi('zuxuan', 3)
const ZuXuanHeZhi2 = generateHeZhi('zuxuan', 2)


const ZhiXuanDanShi3 = generateDanShi('zhixuan',3)
const ZhiXuanDanShi2 = generateDanShi('zhixuan',2)
const ZuXuanDanShi3 = generateDanShi('zuxuan',3)
const ZuXuanDanShi2 = generateDanShi('zuxuan',2)

const KuaDu3 = generateKuaDu(3)
const KuaDu2 = generateKuaDu(2)
export default {
  //腾讯分分彩,后三直选
  '后三码&复式': zhixuan,
  '后三码&单式':ZhiXuanDanShi3,
  '后三码&直选和值': ZhiXuanHeZhi3,
  '后三码&组三': zu3,
  '后三码&组六': zu6,
  '后三码&混合组选': ZuXuanDanShi3,
  '后三码&组选和值': ZuXuanHeZhi3,

  '前三码&复式': zhixuan,
  '前三码&单式':ZhiXuanDanShi3,
  '前三码&直选和值': ZhiXuanHeZhi3,
  '前三码&组三': zu3,
  '前三码&组六': zu6,
  '前三码&混合组选': ZuXuanDanShi3,
  '前三码&组选和值': ZuXuanHeZhi3,

  '中三码&复式': zhixuan,
  '中三码&单式':ZhiXuanDanShi3,
  '中三码&直选和值': ZhiXuanHeZhi3,
  '中三码&组三': zu3,
  '中三码&组六': zu6,
  '中三码&混合组选': ZuXuanDanShi3,
  '中三码&组选和值': ZuXuanHeZhi3,

  '二码&后二直选(复式)': zhixuan,
  '二码&后二直选(单式)': ZhiXuanDanShi2,
  '二码&后二直选和值': ZhiXuanHeZhi2,

  '二码&前二直选(复式)': zhixuan,
  '二码&前二直选(单式)': ZhiXuanDanShi2,
  '二码&前二直选和值': ZhiXuanHeZhi2,

  '二码&后二组选(复式)': ZuXuan2,
  '二码&后二组选(单式)': ZuXuanDanShi2,
  '二码&后二组选和值': ZuXuanHeZhi2,

  '二码&前二组选(复式)': ZuXuan2,
  '二码&前二组选(单式)': ZuXuanDanShi2,
  '二码&前二组选和值': ZuXuanHeZhi2,

  '定位胆&定位胆':DingWeiDan,

  '不定胆&后三一码不定胆':BuDingDan1,
  '不定胆&后三二码不定胆':BuDingDan2,
  '不定胆&前三一码不定胆':BuDingDan1,
  '不定胆&前三二码不定胆':BuDingDan2,

  '趣味&一帆风顺':QuWei,
  '趣味&好事成双':QuWei,
  '趣味&三星报喜':QuWei,
  '趣味&四季发财':QuWei,

  '任选二&直选复式': generateRenXuanZhiXuanFuShi(2),
  '任选二&直选单式': generateDanShi('zhixuan',2),
  '任选二&直选和值': ZhiXuanHeZhi2,
  '任选二&组选复式': generateRenXuanZuXuanFuShi(2),
  '任选二&组选单式': generateDanShi('zuxuan',2),
  '任选二&组选和值': ZuXuanHeZhi2,

  '直选跨度&前二跨度':KuaDu2,
  '直选跨度&后二跨度':KuaDu2,
  '直选跨度&前三跨度':KuaDu3,
  '直选跨度&中三跨度':KuaDu3,
  '直选跨度&后三跨度':KuaDu3,

  '组选包胆&前三包胆':BaoDan,
  '组选包胆&中三包胆':BaoDan,
  '组选包胆&后三包胆':BaoDan,

  '和值尾数&前三和值尾数':HeZhiWeiShu,
  '和值尾数&中三和值尾数':HeZhiWeiShu,
  '和值尾数&后三和值尾数':HeZhiWeiShu,

  '龙虎斗&万千':dxds,
  '龙虎斗&万百':dxds,
  '龙虎斗&万十':dxds,
  '龙虎斗&万个':dxds,
  '龙虎斗&千百':dxds,
  '龙虎斗&千十':dxds,
  '龙虎斗&千个':dxds,
  '龙虎斗&百十':dxds,
  '龙虎斗&百个':dxds,
  '龙虎斗&十个':dxds,

  '全5中1&组选10':Quan5zhong1,
  '全5中1&组选20':Quan5zhong1,
  '全5中1&组选30':Quan5zhong1,
  '全5中1&组选60':Quan5zhong1,
  '全5中1&组选120':Quan5zhong1,
}



