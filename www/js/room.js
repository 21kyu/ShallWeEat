//
// var
var scheduleid = "0";

// event
RoomTalkButton.addEventListener("touchstart", touchButton);
RoomTalkButton.addEventListener("touchend", onClickRoomTalkButton);
RoomLeaveButton.addEventListener("touchstart", touchButton);
RoomLeaveButton.addEventListener("touchend", onClickRoomLeaveButton);

// func
function viewRoom() {
    pageState = 2;
    RoomContainer.style.display = "block";
    scheduleid = hashData[selectedMainItem]["id"];
    
    showLoader();
    // 서버 연동: 받아오기
    var url = serverURL + "getMember.jsp";
    var param = "scheduleid=" + scheduleid;
    //alert(param);
    ajaxCall(url, param, successGetMember, null);
    
    /*
    if (hashData[selectedMainItem]["id"] == "1000") {
        RoomMemberCount.innerHTML = "참여인원 2";
        RoomMemberContainer.innerHTML = "<div class='roomMemberLine'> <div class='roomMemberImage'><img src='img/face_1.png' height='30'></div> <div class='roomMemberText'>나</div> <div class='clearboth'></div> </div> <div class='roomMemberLine'> <div class='roomMemberImage'><img src='img/face_2.png' height='30'></div> <div class='roomMemberText'>'11 현미림</div> <div class='clearboth'></div> </div>";
    } else {
        RoomMemberCount.innerHTML = "참여인원 5";
        RoomMemberContainer.innerHTML = "<div class='roomMemberLine'> <div class='roomMemberImage'><img src='img/face_1.png' height='30'></div> <div class='roomMemberText'>나</div> <div class='clearboth'></div> </div> <div class='roomMemberLine'> <div class='roomMemberImage'><img src='img/face_2.png' height='30'></div> <div class='roomMemberText'>'11 현미림</div> <div class='clearboth'></div> </div> <div class='roomMemberLine'> <div class='roomMemberImage'><img src='img/face_3.png' height='30'></div> <div class='roomMemberText'>'06 김상헌</div> <div class='clearboth'></div> </div> <div class='roomMemberLine'> <div class='roomMemberImage'><img src='img/face_4.png' height='30'></div> <div class='roomMemberText'>'13 임승민</div> <div class='clearboth'></div> </div> <div class='roomMemberLine'> <div class='roomMemberImage'><img src='img/face_5.png' height='30'></div> <div class='roomMemberText'>'00 화석</div> <div class='clearboth'></div> </div>";
    }
     */
    
}

function successGetMember(responseText) {
    try {
        if (responseText != "") {
            //alert(responseText);
            
            var jsonData = JSON.parse(responseText);
            
            var tempHTML = "";
            
            for (var i=0; i<jsonData.length; i++) {
                tempHTML += "<div class='roomMemberLine'> <div class='roomMemberImage'><img src='img/face_1.png' height='30'></div> <div class='roomMemberText'>" + (getLocalData("stuid") == jsonData[i].stuid ? "나" : jsonData[i].name) + "</div> <div class='clearboth'></div> </div>";
            }
            
            RoomMemberCount.innerHTML = "참여인원 " + hashData[selectedMainItem]["count"];
            RoomMemberContainer.innerHTML = tempHTML;
            
            hideLoader();
            
            setTimeout(function() { addClass("RoomMemberCount", "view"); }, 300);
            setTimeout(function() { addClass("RoomMemberContainer", "view"); }, 400);
            setTimeout(function() { addClass("RoomBottom", "view"); }, 500);

        }
    } catch (e) {
        alert(e.message);
    }
}

function hideRoom() {
    removeClass("RoomMemberCount", "view");
    removeClass("RoomMemberContainer", "view");
    removeClass("RoomBottom", "view");
    
    setTimeout(function() { RoomContainer.style.display = "none"; }, 300);
}

// 대화하기 버튼
function onClickRoomTalkButton() {
    removeClass(this.id, "touch");
    
    viewChat();
}

// 떠나기 버튼
function onClickRoomLeaveButton() {
    removeClass(this.id, "touch");
    
    var leaveMessage = "'" + hashData[selectedMainItem]["day"] + " " + hashData[selectedMainItem]["state"] + "' 모임에서 나가기를 원하십니까?<br><br>이 작업은 되돌릴 수 없습니다.";
    var leftText = "나갈게요";
    var rightText = "아니요";
    
    showPopup(leaveMessage, leaveRoom, leftText, rightText);
}

function leaveRoom() {
    var saveItemID = selectedMainItem;
    
    touchendPopupButton();
    funcBack();
    
    // 서버 연동: 상태 업데이트
    showLoader();
    var url = serverURL + "leaveRoom.jsp";
    var param = "stuid=" + getLocalData("stuid") + "&scheduleid=" + hashData[saveItemID]["id"];
    //alert(param);
    ajaxCall(url, param, successLeave, null);
}

function successLeave(responseText) {
    try {
        var saveItemID = selectedMainItem;
        
        if (responseText == "") {
            hashData[saveItemID]["id"] = "";
            hashData[saveItemID]["match"] = "";
            hashData[saveItemID]["stime"] = "";
            hashData[saveItemID]["etime"] = "";
            hashData[saveItemID]["count"] = "";
            
            setMainItem(saveItemID);
            hideLoader();
        } else {
            alert(responseText);
        }
    } catch (e) {
        alert(e.message);
    }
}