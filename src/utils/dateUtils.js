function convertSecondsToTime(seconds) {
  let hour = ('0' + parseInt(seconds / 3600)).slice(-2)

  let minute = ('0' + parseInt((seconds - hour * 3600) / 60)).slice(-2)

  let second = ('0' + parseInt(seconds - hour * 3600 - minute * 60)).slice(-2)
  return {
    hour,
    minute,
    second,
    str: `${hour}:${minute}:${second}`
  }
}
function getDateString(timestamp) {
  let dateObj = timestamp ? new Date(timestamp) : new Date();
  let year = dateObj.getFullYear()
  let month = ('0' + (dateObj.getMonth() + 1)).slice(-2)
  let day = ('0' + dateObj.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}
export {
  convertSecondsToTime,
  getDateString
}