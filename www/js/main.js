//
window.onload = initMain;

var hashData = [];
// Sun
hashData["SunBF"] = {"id":"", "day":"Sun", "state":"BF", "match":"", "stime":"", "etime":"", "count":""};
hashData["SunLC"] = {"id":"", "day":"Sun", "state":"LC", "match":"", "stime":"", "etime":"", "count":""};
hashData["SunDN"] = {"id":"", "day":"Sun", "state":"DN", "match":"", "stime":"", "etime":"", "count":""};
// Mon
hashData["MonBF"] = {"id":"", "day":"Mon", "state":"BF", "match":"", "stime":"", "etime":"", "count":""};
hashData["MonLC"] = {"id":"", "day":"Mon", "state":"LC", "match":"", "stime":"", "etime":"", "count":""};
hashData["MonDN"] = {"id":"", "day":"Mon", "state":"DN", "match":"", "stime":"", "etime":"", "count":""};
// Tue
hashData["TueBF"] = {"id":"", "day":"Tue", "state":"BF", "match":"", "stime":"", "etime":"", "count":""};
hashData["TueLC"] = {"id":"", "day":"Tue", "state":"LC", "match":"", "stime":"", "etime":"", "count":""};
hashData["TueDN"] = {"id":"", "day":"Tue", "state":"DN", "match":"", "stime":"", "etime":"", "count":""};
// Wed
hashData["WedBF"] = {"id":"", "day":"Wed", "state":"BF", "match":"", "stime":"", "etime":"", "count":""};
hashData["WedLC"] = {"id":"", "day":"Wed", "state":"LC", "match":"", "stime":"", "etime":"", "count":""};
hashData["WedDN"] = {"id":"", "day":"Wed", "state":"DN", "match":"", "stime":"", "etime":"", "count":""};
// Thu
hashData["ThuBF"] = {"id":"", "day":"Thu", "state":"BF", "match":"", "stime":"", "etime":"", "count":""};
hashData["ThuLC"] = {"id":"", "day":"Thu", "state":"LC", "match":"", "stime":"", "etime":"", "count":""};
hashData["ThuDN"] = {"id":"", "day":"Thu", "state":"DN", "match":"", "stime":"", "etime":"", "count":""};
// Fri
hashData["FriBF"] = {"id":"", "day":"Fri", "state":"BF", "match":"", "stime":"", "etime":"", "count":""};
hashData["FriLC"] = {"id":"", "day":"Fri", "state":"LC", "match":"", "stime":"", "etime":"", "count":""};
hashData["FriDN"] = {"id":"", "day":"Fri", "state":"DN", "match":"", "stime":"", "etime":"", "count":""};
// Sat
hashData["SatBF"] = {"id":"", "day":"Sat", "state":"BF", "match":"", "stime":"", "etime":"", "count":""};
hashData["SatLC"] = {"id":"", "day":"Sat", "state":"LC", "match":"", "stime":"", "etime":"", "count":""};
hashData["SatDN"] = {"id":"", "day":"Sat", "state":"DN", "match":"", "stime":"", "etime":"", "count":""};

// var
var selectedMainItem = "";
var mainContainerScrollTop = "";
var pageState = 0; // 1:Regist/Wait , 2:Room

// event
//Sun
SunBF.addEventListener("touchstart", touchstartItem);
SunBF.addEventListener("touchmove", touchmoveItem);
SunBF.addEventListener("touchend", touchendItem);
SunLC.addEventListener("touchstart", touchstartItem);
SunLC.addEventListener("touchmove", touchmoveItem);
SunLC.addEventListener("touchend", touchendItem);
SunDN.addEventListener("touchstart", touchstartItem);
SunDN.addEventListener("touchmove", touchmoveItem);
SunDN.addEventListener("touchend", touchendItem);
//Mon
MonBF.addEventListener("touchstart", touchstartItem);
MonBF.addEventListener("touchmove", touchmoveItem);
MonBF.addEventListener("touchend", touchendItem);
MonLC.addEventListener("touchstart", touchstartItem);
MonLC.addEventListener("touchmove", touchmoveItem);
MonLC.addEventListener("touchend", touchendItem);
MonDN.addEventListener("touchstart", touchstartItem);
MonDN.addEventListener("touchmove", touchmoveItem);
MonDN.addEventListener("touchend", touchendItem);
//Tue
TueBF.addEventListener("touchstart", touchstartItem);
TueBF.addEventListener("touchmove", touchmoveItem);
TueBF.addEventListener("touchend", touchendItem);
TueLC.addEventListener("touchstart", touchstartItem);
TueLC.addEventListener("touchmove", touchmoveItem);
TueLC.addEventListener("touchend", touchendItem);
TueDN.addEventListener("touchstart", touchstartItem);
TueDN.addEventListener("touchmove", touchmoveItem);
TueDN.addEventListener("touchend", touchendItem);
//Wed
WedBF.addEventListener("touchstart", touchstartItem);
WedBF.addEventListener("touchmove", touchmoveItem);
WedBF.addEventListener("touchend", touchendItem);
WedLC.addEventListener("touchstart", touchstartItem);
WedLC.addEventListener("touchmove", touchmoveItem);
WedLC.addEventListener("touchend", touchendItem);
WedDN.addEventListener("touchstart", touchstartItem);
WedDN.addEventListener("touchmove", touchmoveItem);
WedDN.addEventListener("touchend", touchendItem);
//Thu
ThuBF.addEventListener("touchstart", touchstartItem);
ThuBF.addEventListener("touchmove", touchmoveItem);
ThuBF.addEventListener("touchend", touchendItem);
ThuLC.addEventListener("touchstart", touchstartItem);
ThuLC.addEventListener("touchmove", touchmoveItem);
ThuLC.addEventListener("touchend", touchendItem);
ThuDN.addEventListener("touchstart", touchstartItem);
ThuDN.addEventListener("touchmove", touchmoveItem);
ThuDN.addEventListener("touchend", touchendItem);
//Fri
FriBF.addEventListener("touchstart", touchstartItem);
FriBF.addEventListener("touchmove", touchmoveItem);
FriBF.addEventListener("touchend", touchendItem);
FriLC.addEventListener("touchstart", touchstartItem);
FriLC.addEventListener("touchmove", touchmoveItem);
FriLC.addEventListener("touchend", touchendItem);
FriDN.addEventListener("touchstart", touchstartItem);
FriDN.addEventListener("touchmove", touchmoveItem);
FriDN.addEventListener("touchend", touchendItem);
//Sat
SatBF.addEventListener("touchstart", touchstartItem);
SatBF.addEventListener("touchmove", touchmoveItem);
SatBF.addEventListener("touchend", touchendItem);
SatLC.addEventListener("touchstart", touchstartItem);
SatLC.addEventListener("touchmove", touchmoveItem);
SatLC.addEventListener("touchend", touchendItem);
SatDN.addEventListener("touchstart", touchstartItem);
SatDN.addEventListener("touchmove", touchmoveItem);
SatDN.addEventListener("touchend", touchendItem);

// func
function initMain() {
    showLoader();
    
    //alert(getLocalData("name"));
    
    // TODO
    // 여기에 서버로부터 데이터를 받아서 hashData에 저장하는 로직 필요
    var url = serverURL + "getSchedule.jsp";
    var param = "stuid=" + getLocalData("stuid");
    ajaxCall(url, param, successGetSchedule, null);
}

function successGetSchedule(responseText) {
    try {
        if (responseText != "null") {
            //alert(responseText);
            
            var jsonData = JSON.parse(responseText);
            
            for (var i=0; i<jsonData.length; i++) {
                hashData[jsonData[i].day + jsonData[i].state] = {"id":jsonData[i].id, "day":jsonData[i].day, "state":jsonData[i].state, "match":jsonData[i].matchstate, "stime":jsonData[i].stime, "etime":jsonData[i].etime, "count":jsonData[i].mannum};
            }
            
            //hashData["SunLC"] = {"id":"", "day":"일요일", "state":"점심", "match":"wait", "stime":"13:00", "etime":"14:00", "count":"W"};
            //hashData["SunDN"] = {"id":"1005", "day":"일요일", "state":"저녁", "match":"match", "stime":"18:00", "etime":"19:00", "count":"5"};
            
            setMainItem("SunBF");
            setMainItem("SunLC");
            setMainItem("SunDN");
            
            setMainItem("MonBF");
            setMainItem("MonLC");
            setMainItem("MonDN");
            
            setMainItem("TueBF");
            setMainItem("TueLC");
            setMainItem("TueDN");
            
            setMainItem("WedBF");
            setMainItem("WedLC");
            setMainItem("WedDN");
            
            setMainItem("ThuBF");
            setMainItem("ThuLC");
            setMainItem("ThuDN");
            
            setMainItem("FriBF");
            setMainItem("FriLC");
            setMainItem("FriDN");
            
            setMainItem("SatBF");
            setMainItem("SatLC");
            setMainItem("SatDN");
            
            
        }
        
        StatusBar.styleLightContent();
        hideLoader();
        
        if (getLocalData("location") == "" || getLocalData("location") == "0")
            viewNotice();
        
    } catch (e) {
        alert(e.message);
    }
}

function setMainItem(_id) {
    var tID = "";
    var tEl = "";
    
    tID = _id;
    tEl = document.getElementById(tID);
    tElTime = document.getElementById(tID + "Time");
    if (hashData[tID]["match"] == "1") {
        addClass(tID, "match");
        addClass(tID + "Time", "match");
        tEl.innerHTML = "<div id='Child" + tID + "'>" + hashData[tID]["count"] + "</div>";
        tElTime.innerHTML = getTimeType(hashData[tID]["stime"]) + "-" + getTimeType(hashData[tID]["etime"]);
    } else if (hashData[tID]["match"] == "0") {
        addClass(tID, "wait");
        addClass(tID + "Time", "wait");
        tEl.innerHTML = "<div id='Child" + tID + "'>" + "W" + "</div>";
        tElTime.innerHTML = getTimeType(hashData[tID]["stime"]) + "-" + getTimeType(hashData[tID]["etime"]);
    } else {
        tEl.className = "main_home_item";
        tElTime.className = "main_home_item_time";
        tEl.innerHTML = "<img id='Child" + tID + "' src='img/plus.png' width='40'>";
        tElTime.innerHTML = "비어있어요";
    }
}

var touchStartX, touchStartY, touchEndX, touchEndY, isMove;

function touchstartItem(event) {
    isMove = false;
    if (selectedMainItem == "") {
        var touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchEndX = touchStartX;
        touchEndY = touchStartY;
        addClass(this.id, "start");
    }
}

function touchmoveItem(event) {
    try{
        var touch = event.touches[0];
        touchEndX = touch.clientX;
        touchEndY = touch.clientY;
    } catch (e) {
        alert(e.message);
    }
}

function touchendItem(event) {
    if (selectedMainItem == "") {
        removeClass(this.id, "start");
        //alert(Math.abs(touchEndY - touchStartY));
        if ( Math.abs(touchEndY - touchStartY) > 30 ) isMove = true;
    
        if (checkAction() && !isMove) {
            try {
                preventScrollMainContainer();
                addClass(this.id, "in");
                selectedMainItem = this.id;
            
                var element = document.getElementById("Child" + this.id);
                element.style.display = "none";
                
                NaviTitle.innerHTML = hashData[this.id]["day"] + " " + hashData[this.id]["state"];
                viewBackButton();
            
                if (hashData[this.id]["match"] == "1") { // 선택한 아이템이 매치 상태
                    viewRoom();
                } else if (hashData[this.id]["match"] == "0") { // 대기 상태
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
}

function enableScrollMainContainer() {
    removeClass("MainContainer", "prevent");
    setTimeout(function() {
               window.scrollTo(0, mainContainerScrollTop); }, 200);
}