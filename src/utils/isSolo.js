//校验是否是单挑注
//说明http://www.cgeat.com/%E9%BE%99%E8%B1%B9%E6%96%970822.png
const Xing3 = 10;
const Xing3Zu3Zu6 = 1
const Xing3HunHeZuXuan = 1
const Xing3ZuXuanHeZhi = 2
const Xing2 = 1
const RENXUAN22 = 1;
const RENXUAN23 = 3;
const RENXUAN24 = 6;
const RENXUAN25 = 10;
const RENXUAN33 = 2;
const RENXUAN34 = 8;
const RENXUAN35 = 20;
const map = {
  '后三码&复式': Xing3,
  '后三码&单式': Xing3,
  '后三码&直选和值': Xing3,
  '后三码&组三': Xing3Zu3Zu6,
  '后三码&组六': Xing3Zu3Zu6,
  '后三码&混合组选': Xing3HunHeZuXuan,
  '后三码&组选和值': Xing3ZuXuanHeZhi,

  '前三码&复式': Xing3,
  '前三码&单式': Xing3,
  '前三码&直选和值': Xing3,
  '前三码&组三': Xing3Zu3Zu6,
  '前三码&组六': Xing3Zu3Zu6,
  '前三码&混合组选': Xing3HunHeZuXuan,
  '前三码&组选和值': Xing3ZuXuanHeZhi,

  '中三码&复式': Xing3,
  '中三码&单式': Xing3,
  '中三码&直选和值': Xing3,
  '中三码&组三': Xing3Zu3Zu6,
  '中三码&组六': Xing3Zu3Zu6,
  '中三码&混合组选': Xing3HunHeZuXuan,
  '中三码&组选和值': Xing3ZuXuanHeZhi,

  '二码&后二直选(复式)': Xing2,
  '二码&后二直选(单式)': Xing2,
  '二码&后二直选和值': Xing2,
  '二码&前二直选(复式)': Xing2,
  '二码&前二直选(单式)': Xing2,
  '二码&前二直选和值': Xing2,

  '任选二&直选复式': {
    2: RENXUAN22,
    3: RENXUAN23,
    4: RENXUAN24,
    5: RENXUAN25,
  },
  '任选二&直选单式': {
    2: RENXUAN22,
    3: RENXUAN23,
    4: RENXUAN24,
    5: RENXUAN25,
  },
  '任选二&直选和值': {
    2: RENXUAN22,
    3: RENXUAN23,
    4: RENXUAN24,
    5: RENXUAN25,
  },
  '任选二&组选复式': {
    2: RENXUAN22,
    3: RENXUAN23,
    4: RENXUAN24,
    5: RENXUAN25,
  },
  '任选二&组选单式': {
    2: RENXUAN22,
    3: RENXUAN23,
    4: RENXUAN24,
    5: RENXUAN25,
  },
  '任选二&组选和值': {
    2: RENXUAN22,
    3: RENXUAN23,
    4: RENXUAN24,
    5: RENXUAN25,
  },

  '龙虎斗&万千':0,
  '龙虎斗&万百':0,
  '龙虎斗&万十':0,
  '龙虎斗&万个':0,
  '龙虎斗&千百':0,
  '龙虎斗&千十':0,
  '龙虎斗&千个':0,
  '龙虎斗&百十':0,
  '龙虎斗&百个':0,
  '龙虎斗&十个':0,
}

export default function common(methodKey, nums, chosenPositionsNum) {
  if(!map[methodKey]){
    return false
  }
  let limit = typeof map[methodKey] === 'number' ? map[methodKey] : map[methodKey][chosenPositionsNum]
  if (nums <= limit) {
    return true
  } else {
    return false
  }
}



