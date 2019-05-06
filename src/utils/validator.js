// "-" 表示任意
//allBetCode = [
//  [2,'-',1,'-',3]
// ]
function validate(allBetCode, result) {
  let res = []
  allBetCode.forEach((betCode) => {
    for(let i = 0;i <betCode.length; i++ ){
      let code = betCode[i]
      if(!(code === '-' || code ===  parseInt(result[i])  )){
        return
      }
    }
    res.push(betCode)
  })
  return res
}