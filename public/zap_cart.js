let but31 = document.querySelectorAll('.BB');
var f1=document.querySelector('.vyzov');
var brigad=document.querySelectorAll('.brrrr');
var surname2=document.querySelector('.surname');
var f2=document.querySelector('.form_req');
var name2=document.querySelector('.name');
var lastname2=document.querySelector('.Lastname');
var address2=document.querySelector('.adress');
var ops2=document.querySelector('.ops');
var dateRequest2=document.querySelector('.dateRequest');
var dateAccept2=document.querySelector('.dateAccept');

console.log(but31);
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
    request.addEventListener("load", function () {
      let receivedRequest = JSON.parse(request.response);
      f2.removeAttribute('hidden');
      f1.setAttribute('hidden', 'true')
      surname2.value=receivedRequest.ReqData[0].PatientSurname;
      surname2.setAttribute('readonly','true');
      name2.value=receivedRequest.ReqData[0].PatientName;
      name2.setAttribute('readonly','true');
      lastname2.value=receivedRequest.ReqData[0].PatientMiddleName;
      lastname2.setAttribute('readonly','true')
      address2.value=receivedRequest.ReqData[0].PatientAddress;
      address2.setAttribute('readonly','true')
      ops2.value=receivedRequest.ReqData[0].InformalDescription;
      ops2.setAttribute('readonly','true')
      dateRequest2.value=receivedRequest.ReqData[0].RequestTime;
      dateRequest2.setAttribute('readonly','true')
      dateAccept2.value=receivedRequest.ReqData[0].AcceptTime;
      dateAccept2.setAttribute('readonly','true')
    });

  //tim2[i].value=;
  
  //fr.submit();
}