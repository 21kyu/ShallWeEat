//
window.onload = initMain;

var hashData = [];
hashData["SunBF"] = {"id":"", "day":"일요일", "state":"아침", "match":"", "stime":"", "etime":"", "count":""};
hashData["SunLC"] = {"id":"", "day":"일요일", "state":"점심", "match":"", "stime":"", "etime":"", "count":""};
hashData["SunDN"] = {"id":"", "day":"일요일", "state":"저녁", "match":"", "stime":"", "etime":"", "count":""};

// var
var selectedMainItem = "";
var mainContainerScrollTop = "";
var pageState = 0; // 1:Regist/Wait , 2:Room

// event
SunBF.addEventListener("touchstart", touchstartItem);
SunBF.addEventListener("touchend", touchendItem);
SunLC.addEventListener("touchstart", touchstartItem);
SunLC.addEventListener("touchend", touchendItem);
SunDN.addEventListener("touchstart", touchstartItem);
SunDN.addEventListener("touchend", touchendItem);

// func
function initMain() {
    showLoader();
    
    // TODO
    // 여기에 서버로부터 데이터를 받아서 hashData에 저장하는 로직 필요
    hashData["SunLC"] = {"id":"", "day":"일요일", "state":"점심", "match":"wait", "stime":"13:00", "etime":"14:00", "count":"W"};
    hashData["SunDN"] = {"id":"1005", "day":"일요일", "state":"저녁", "match":"match", "stime":"18:00", "etime":"19:00", "count":"5"};
    
    setTimeout(function() {
               setMainItem("SunBF");
               setMainItem("SunLC");
               setMainItem("SunDN");
               
               hideLoader();
    }, 2000);
}

function setMainItem(_id) {
    var tID = "";
    var tEl = "";
    
    tID = _id;
    tEl = document.getElementById(tID);
    tElTime = document.getElementById(tID + "Time");
    if (hashData[tID]["match"] == "match") {
        addClass(tID, "match");
        addClass(tID + "Time", "match");
        tEl.innerHTML = "<div id='Child" + tID + "'>" + hashData[tID]["count"] + "</div>";
        tElTime.innerHTML = hashData[tID]["stime"] + "-" + hashData[tID]["etime"];
    } else if (hashData[tID]["match"] == "wait") {
        addClass(tID, "wait");
        addClass(tID + "Time", "wait");
        tEl.innerHTML = "<div id='Child" + tID + "'>" + hashData[tID]["count"] + "</div>";
        tElTime.innerHTML = hashData[tID]["stime"] + "-" + hashData[tID]["etime"];
    } else {
        tEl.className = "main_home_item";
        tElTime.className = "main_home_item_time";
        tEl.innerHTML = "<img id='Child" + tID + "' src='img/plus.png' width='40'>";
        tElTime.innerHTML = "비어있어요";
    }
}

function touchstartItem() {
    if (selectedMainItem == "")
        addClass(this.id, "start");
}

function touchendItem() {
    if (selectedMainItem == "") {
        removeClass(this.id, "start");
    
        if (checkAction()) {
            try {
                preventScrollMainContainer();
                addClass(this.id, "in");
                selectedMainItem = this.id;
            
                var element = document.getElementById("Child" + this.id);
                element.style.display = "none";
                
                NaviTitle.innerHTML = hashData[this.id]["day"] + " " + hashData[this.id]["state"];
                viewBackButton();
            
                if (hashData[this.id]["match"] == "match") { // 선택한 아이템이 매치 상태
                    viewRoom();
                } else if (hashData[this.id]["match"] == "wait") { // 대기 상태
                    viewWait();
                } else { // 비어있는 상태
                    viewRegist();
                }
            } catch(err) {
                alert(err.message);
            }
        }
    }
}

function preventScrollMainContainer() {
    mainContainerScrollTop = window.pageYOffset;
    setTimeout(function() {
               window.scrollTo(0, 0);
               addClass("MainContainer", "prevent"); }, 300);
   //alert(mainContainerScrollTop);
}

function enableScrollMainContainer() {
    removeClass("MainContainer", "prevent");
    setTimeout(function() {
               window.scrollTo(0, mainContainerScrollTop); }, 200);
}