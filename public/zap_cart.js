var but31 = document.querySelectorAll('.BIG_B');
var forms=document.getElementsByTagName("form");
var brigad=document.querySelectorAll('.brrrr');
for (let i=0; i<but31.length;i++){
    but31[i].addEventListener("click", function(e){
    e.preventDefault();
    buttonsControl(this,i)},false);
}
function getISOStringWithoutSecsAndMillisecs1(date) {
  date.setMilliseconds(3 * 60 * 60 * 1000);
  const dateAndTime = date.toISOString().split('T')
  const time = dateAndTime[1].split(':')
  const sec=time[2].split('.')
  return dateAndTime[0]+'T'+time[0]+':'+time[1]+':'+sec[0]
}

function buttonsControl(button, i){
  console.log(button.value);
  tim=getISOStringWithoutSecsAndMillisecs1(new Date())
  let brig=JSON.stringify(
    {
    idReq:button.value,
    idBrig: brigad[i].value,
    dA:tim
})
console.log(brig)
let request = new XMLHttpRequest();
    request.open("POST", "/account_doctor", true); 
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        console.log(this.response);
    };
    request.send(brig);
    request.addEventListener("load", function () {});

  //tim2[i].value=;
  
  //fr.submit();
}