//
// var
var matchStartTime = "";
var matchEndTime = "";

// event
CancelMatch.addEventListener("touchstart", touchButton);
CancelMatch.addEventListener("touchend", funcCancelMatch);

// func
function matchStart() {
    matchStartTime = InputStartTime.value;
    matchEndTime = InputEndTime.value;
    
    MatchContainer.style.display = "block";
    StatusBar.styleLightContent();
    
    setTimeout(function() { addClass("MatchContainer", "view"); }, 10);
    
    // 테스트를 위한 임시 코드
    var isSuccess = hashData[selectedMainItem]["match"] == "wait" ? true : false;
    setTimeout(function() {
        if(isSuccess) { // 매칭 성공 케이스
               var saveItemID = selectedMainItem;
               
               showLoader();
               
               // 서버 연동
               hashData[saveItemID]["id"] = "1000";
               hashData[saveItemID]["match"] = "match";
               hashData[saveItemID]["stime"] = matchStartTime;
               hashData[saveItemID]["etime"] = matchEndTime;
               hashData[saveItemID]["count"] = "2";
               
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
        } else { // 매칭 실패 케이스
               var msg = "해당 시간에 밥 먹기를 원하는 사람을 찾을 수 없습니다.<br>확인을 누르면 찾기를 그만두고 현재 정보로 상대방을 기다립니다.<br><br>이 작업은 자동으로 이루어지며 상대방을 찾으면 알림으로 알려드립니다.";
               showPopup(msg, failMatch);
        } }, 3000);
}

function funcCancelMatch() {
    if(this.id != null) removeClass(this.id, "touch");
    
    if (checkAction()) {
        removeClass("MatchContainer", "view");
        StatusBar.styleDefault();
    
        setTimeout(function() { MatchContainer.style.display = "none"; }, 400);
    }
}

function failMatch() {
    try {
        var saveItemID =selectedMainItem;
        
        // 팝업 닫기
        touchendPopupButton();
    
        // 매칭 화면 닫기
        funcCancelMatch();
    
        // 등록 화면 닫기
        hideRegist();
    
        // 뒤로가기
        funcBack();
        
        // 서버 연동
        showLoader();
        hashData[saveItemID]["match"] = "wait";
        hashData[saveItemID]["stime"] = matchStartTime;
        hashData[saveItemID]["etime"] = matchEndTime;
        hashData[saveItemID]["count"] = "W";
        
        // 화면 갱신
        setTimeout(function() { setMainItem(saveItemID); hideLoader(); }, 1500);
        
    } catch(err) {
        alert(err.message);
    }
    
}