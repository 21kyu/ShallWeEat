//
// var
var matchStartTime = "";
var matchEndTime = "";

// event
CancelMatch.addEventListener("touchstart", touchButton);
CancelMatch.addEventListener("touchend", funcCancelMatch);

// func
function matchStart() {
    try {
        
    matchStartTime = InputStartTime.value;
    matchEndTime = InputEndTime.value;
    
    MatchContainer.style.display = "block";
    //StatusBar.styleLightContent();
    setTimeout(function() { addClass("MatchBody", "view");
               
               // 테스트를 위한 임시 코드
               //var isSuccess = hashData[selectedMainItem]["match"] == "wait" ? true : false;
               setTimeout(function() {
                          
                          var url = serverURL + "matching.jsp";
                          var param = "stuid=" + getLocalData("stuid") +"&day=" + hashData[selectedMainItem]["day"] + "&state=" + hashData[selectedMainItem]["state"] +"&stime=" + getNumberOnly(InputStartTime.value) +"&etime=" + getNumberOnly(InputEndTime.value) +"&location=" + getLocalData("location");
                          //alert(param);
                          ajaxCall(url, param, successMatching, null);
                          
                          }, 3000);
               
               }, 10);
        
    } catch (e) {
        alert(e.message);
    }
}

function successMatching(responseText) {
    try {
        if (responseText != "") {
            //alert(responseText);
            
            var jsonData = JSON.parse(responseText);
            
            var saveItemID = selectedMainItem;
            
            showLoader();
            
            if (jsonData[0].match == "1") {
                hashData[saveItemID]["id"] = jsonData[0].id;
                hashData[saveItemID]["match"] = "1";
                hashData[saveItemID]["stime"] = jsonData[0].stime;
                hashData[saveItemID]["etime"] = jsonData[0].etime;
                hashData[saveItemID]["count"] = Number(jsonData[0].mannum) + 1;
            
                // 화면 갱신
                setMainItem(saveItemID);
            
                // 매칭 화면 닫기
                funcCancelMatch();
            
                // 등록 화면 닫기
                hideRegist();
            
                // 뒤로가기
                funcBack();
            
                // Room으로 가기
                setTimeout(function() {
                       preventScrollMainContainer();
                       addClass(saveItemID, "in");
                       selectedMainItem = saveItemID;
                       
                       var element = document.getElementById("Child" + saveItemID);
                       element.style.display = "none";
                       
                       NaviTitle.innerHTML = hashData[saveItemID]["day"] + " " + hashData[saveItemID]["state"];
                       viewBackButton();
                       
                       viewRoom();
                       }, 500);
                
            } else {
                var msg = "해당 시간에 밥 먹기를 원하는 사람을 찾을 수 없습니다.<br>확인을 누르면 찾기를 그만두고 현재 정보로 상대방을 기다립니다.<br><br>이 작업은 자동으로 이루어지며 상대방을 찾으면 알림으로 알려드립니다.";
                
                hashData[saveItemID]["id"] = jsonData[0].id;
                hashData[saveItemID]["match"] = "0";
                hashData[saveItemID]["stime"] = jsonData[0].stime;
                hashData[saveItemID]["etime"] = jsonData[0].etime;
                hashData[saveItemID]["count"] = "1";
                
                showPopup(msg, failMatch);
            }
        }
    } catch (e) {
        alert(e.message);
    }
}

function funcCancelMatch() {
    if(this.id != null) removeClass(this.id, "touch");
    
    if (checkAction()) {
        removeClass("MatchBody", "view");
        //StatusBar.styleDefault();
    
        setTimeout(function() { MatchContainer.style.display = "none"; }, 400);
    }
}

function failMatch() {
    try {
        var saveItemID = selectedMainItem;
        
        // 팝업 닫기
        touchendPopupButton();
    
        // 매칭 화면 닫기
        funcCancelMatch();
    
        // 등록 화면 닫기
        hideRegist();
    
        // 뒤로가기
        funcBack();
        
        setMainItem(saveItemID);
        hideLoader();
        // 서버 연동
        //showLoader();
        // 화면 갱신
        //setTimeout(function() {hideLoader(); }, 1500);
        
    } catch(err) {
        alert(err.message);
    }
    
}