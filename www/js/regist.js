//
// var


// event
RegistButton.addEventListener("touchstart", touchButton);
RegistButton.addEventListener("touchend", onClickRegistButton);


// func
function viewRegist() {
    pageState = 1;
    RegistContainer.style.display = "block";
    
    RegistTitle.innerHTML = "등록하기";
    RegistButton.innerHTML = "등록";
    
    if (hashData[selectedMainItem]["state"] == "아침") {
        InputStartTime.value = "08:00";
        InputEndTime.value = "09:00";
    } else if (hashData[selectedMainItem]["state"] == "점심") {
        InputStartTime.value = "13:00";
        InputEndTime.value = "14:00";
    } else if (hashData[selectedMainItem]["state"] == "저녁") {
        InputStartTime.value = "18:00";
        InputEndTime.value = "19:00";
    }
    
    setTimeout(function() { addClass("RegistTitle", "view"); }, 300);
    setTimeout(function() { addClass("RegistStartTime", "view"); }, 400);
    setTimeout(function() { addClass("RegistEndTime", "view"); }, 500);
    setTimeout(function() { addClass("RegistButtonContainer", "view"); }, 600);
}

function viewWait() {
    pageState = 1;
    RegistContainer.style.display = "block";
    
    RegistTitle.innerHTML = "기다리는 중";
    RegistButton.innerHTML = "수정";
    
    InputStartTime.value = hashData[selectedMainItem]["stime"] ;
    InputEndTime.value = hashData[selectedMainItem]["etime"] ;
    
    setTimeout(function() { addClass("RegistTitle", "view"); }, 300);
    setTimeout(function() { addClass("RegistStartTime", "view"); }, 400);
    setTimeout(function() { addClass("RegistEndTime", "view"); }, 500);
    setTimeout(function() { addClass("RegistButtonContainer", "view"); }, 600);
}

function hideRegist() {
    removeClass("RegistTitle", "view");
    removeClass("RegistStartTime", "view");
    removeClass("RegistEndTime", "view");
    removeClass("RegistButtonContainer", "view");
    
    setTimeout(function() { RegistContainer.style.display = "none"; }, 400);
}

function onClickRegistButton() {
    removeClass(this.id, "touch");
    
    if (checkAction()) {
        matchStart();
    }
}