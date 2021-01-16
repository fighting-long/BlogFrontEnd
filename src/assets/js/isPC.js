function isPC() {
  let userAgentInfo = navigator.userAgent;
  let Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  if(window.screen.width>=768){
    flag = true;
  }
  return flag;
}
export{isPC}
