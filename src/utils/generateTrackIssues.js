function formDateStr(dateObj) {
  let year = dateObj.getFullYear()
  let mounth = ('0' + (dateObj.getMonth() + 1)).slice(-2)
  let date = ('0' + dateObj.getDate()).slice(-2)
  let hours =('0' + dateObj.getHours()).slice(-2)
  let minutes = ('0' +dateObj.getMinutes()).slice(-2)
  let seconds =('0' + dateObj.getSeconds()).slice(-2)
  return `${year}-${mounth}-${date} ${hours}:${minutes}:${seconds}`
}
function generateTrackIssue(currentTimeStamp,limit = 1){
  const everyDayCount = 1440
  const ahead = 15
  let res = []
  let current = new Date(currentTimeStamp + ahead * 1000)
  let currentHour = current.getHours()
  let currentMinute = current.getMinutes()
  let currentSecond = current.getSeconds()
  let issueNum = currentMinute + currentHour * 60 + 1;
  for(let i = 0;i<limit;i++){
    let year = current.getFullYear()
    let mounth = ('0' + (current.getMonth() + 1)).slice(-2)
    let date = ('0' + current.getDate()).slice(-2)
    let issueStr = ('000' + issueNum).slice(-4)
    let issue = `${year}${mounth}${date}-${issueStr}`
    //今天当期开奖时间戳
    let time = +new Date(`${year}-${mounth}-${date} 00:00:00`) + issueNum * 60 * 1000
    //开奖时间
    let drawtime = formDateStr(new Date(time))
    //封盘时间
    let saleEndTime = time - ahead * 1000
    let saleend = formDateStr(new Date(saleEndTime))
    //开盘时间
    let saleStartTime = saleEndTime - 60 * 1000
    let salestart = formDateStr(new Date(saleStartTime))
    res.push({
      issue,
      salestart,
      saleend,
      drawtime
    })

    if(issueNum === everyDayCount){
      currentTimeStamp += 3600*24*1000
      current = new Date(currentTimeStamp)
      issueNum = 1
    }else {
      issueNum++
    }
  }
  return res
}
function generate30sTrackIssue(currentTimeStamp,limit = 1){
  const everyDayCount = 2880
  const ahead = 15
  let res = []
  let current = new Date(currentTimeStamp + ahead * 1000)
  let currentHour = current.getHours()
  let currentMinute = current.getMinutes()
  let currentSecond = current.getSeconds()
  let issueNum = 2*(currentMinute + currentHour * 60) + Math.floor(currentSecond/30) + 1;
  for(let i = 0;i<limit;i++){
    let year = current.getFullYear()
    let mounth = ('0' + (current.getMonth() + 1)).slice(-2)
    let date = ('0' + current.getDate()).slice(-2)
    let issueStr = ('000' + issueNum).slice(-4)
    let issue = `${year}${mounth}${date}-${issueStr}`
    //今天当期开奖时间戳
    let time = +new Date(`${year}-${mounth}-${date} 00:00:00`) + issueNum * 30 * 1000
    //开奖时间
    let drawtime = formDateStr(new Date(time))
    //封盘时间
    let saleEndTime = time - ahead * 1000
    let saleend = formDateStr(new Date(saleEndTime))
    //开盘时间
    let saleStartTime = saleEndTime - 30 * 1000
    let salestart = formDateStr(new Date(saleStartTime))
    res.push({
      issue,
      salestart,
      saleend,
      drawtime
    })

    if(issueNum === everyDayCount){
      currentTimeStamp += 3600*24*1000
      current = new Date(currentTimeStamp)
      issueNum = 1
    }else {
      issueNum++
    }
  }
  return res
}
function generate_CQSSC_TrackIssue(currentTimeStamp,limit = 1) {
  const everyDayCount = 120
  const ahead = 45
  let res = []
  let current = new Date(currentTimeStamp + ahead * 1000)
  let currentHour = current.getHours()
  let currentMinute = current.getMinutes()
  let totalMinutes = (currentMinute + currentHour * 60);
  let issueNum
  if(totalMinutes < 60 * 2){
    issueNum = Math.floor((totalMinutes)/5) + 1;
  }else if(totalMinutes < 60 * 10){
    issueNum = 24
  }else if(totalMinutes < 60 * 22){
    issueNum = 24 + Math.floor((totalMinutes - 60 * 10)/10) + 1;
  }else if(totalMinutes < 60 * 24){
    issueNum = 96 + Math.floor((totalMinutes - 60 * 22)/5) + 1;
  }

  for(let i = 0;i<limit;i++){
    let year = current.getFullYear()
    let mounth = ('0' + (current.getMonth() + 1)).slice(-2)
    let date = ('0' + current.getDate()).slice(-2)
    let issueStr = ('000' + issueNum).slice(-4)
    let issue = `${year}${mounth}${date}-${issueStr}`
    //今天当期开奖时间戳
    let time
    let duration
    if(issueNum < 24){
      duration = 5
      time = +new Date(`${year}-${mounth}-${date} 00:00:00`) + issueNum * duration * 60 * 1000
    }else if(issueNum === 24){
      duration = 8 * 60
      time = +new Date(`${year}-${mounth}-${date} 10:00:00`)
    }else if(issueNum > 24 && issueNum <= 96){
      duration = 10
      time = +new Date(`${year}-${mounth}-${date} 10:00:00`) + (issueNum - 24) * duration * 60 * 1000
    }else if(issueNum > 96 && issueNum <= 120){
      duration = 5
      time = +new Date(`${year}-${mounth}-${date} 22:00:00`) + (issueNum - 96) * duration * 60 * 1000
    }
    //开奖时间
    let drawtime = formDateStr(new Date(time))
    //封盘时间
    let saleEndTime = time - ahead * 1000
    let saleend = formDateStr(new Date(saleEndTime))
    //开盘时间
    let saleStartTime = saleEndTime - duration * 60 * 1000
    let salestart = formDateStr(new Date(saleStartTime))
    res.push({
      issue,
      salestart,
      saleend,
      drawtime
    })

    if(issueNum === everyDayCount){
      currentTimeStamp += 3600*24*1000
      current = new Date(currentTimeStamp)
      issueNum = 1
    }else {
      issueNum++
    }
  }
  return res
}
const generateTrackIssueMap = {
  'txffc': generateTrackIssue,
  'rd1fc': generateTrackIssue,
  'hn1fc': generateTrackIssue,
  'rbffc': generateTrackIssue,
  'ynffc': generateTrackIssue,
  'xgffc': generateTrackIssue,
  'tx30s': generate30sTrackIssue,
  'cq30s': generate30sTrackIssue,
  'jnd30m': generate30sTrackIssue,
  'cqssc':generate_CQSSC_TrackIssue
}
export { generateTrackIssueMap,generateTrackIssue}