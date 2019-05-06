function setLocal(name,data,expire,timestamp) {
  let createDate = timestamp ? timestamp :+new Date()
  localStorage.setItem(name,
    JSON.stringify({
      createDate: createDate,
      expire: expire,
      data: data
    })
  );
}
function getLocal(name) {
  if(isLocalAvailable(name)){
    return JSON.parse(localStorage.getItem(name)).data;
  }
  return null;
}
function updateLocal(name,newData) {
  let oldData = JSON.parse(localStorage.getItem(name))
  let {createDate,expire} = oldData
  if((new Date() - new Date(createDate)) < 24 * 3600 * 1000 * expire){
    setLocal(name,newData,expire)
  }
  console.log('expire',expire);
  setLocal(name,newData,expire,createDate)
}
function isLocalAvailable(name) {
  let item = localStorage.getItem(name);
  if (item) {
    item = JSON.parse(item)
  }
  return item && Object.keys(item.data).length > 0 && (new Date() - new Date(item.createDate)) < 24 * 3600 * 1000 * item.expire
}
function isExpire(name) {
  let item = localStorage.getItem(name);
  if (item) {
    item = JSON.parse(item)
  }
  return (new Date() - new Date(item.createDate)) < 24 * 3600 * 1000 * item.expire
}
export {setLocal,getLocal,isExpire,updateLocal}