//
// var

// event
NoticeStart1Next.addEventListener('touchstart', touchButton);
NoticeStart1Next.addEventListener('touchend', onClickNoticeStart1Next);
NoticeStart2Next.addEventListener('touchstart', touchButton);
NoticeStart2Next.addEventListener('touchend', onClickNoticeStart2Next);
Logout.addEventListener('touchstart', touchButton);
Logout.addEventListener('touchend', onClickLogout);

// func
function onClickNoticeStart1Next() {
    removeClass(this.id, "touch");
    //Start1.style.display = "none";
    addClass("Start1", "prev");
    addClass("Start2", "view");
    //Start2.style.display = "block";
}

function onClickNoticeStart2Next() {
    removeClass(this.id, "touch");
    
    if (MajorSelect.value == "0" || LocationSelect == "0" || GenderSelect == "0") {
        showPopup("선택되지 않은 정보가 있습니다.<br><br>모두 입력해 주세요.");
    } else {
        window.scrollTo(0, 0);
        
        addClass("NoticePopup", "hide");
        removeClass("NoticeBody", "view");
        
        var url = serverURL + "setStuinfo.jsp";
        var param = "stuid=" + getLocalData("stuid") + "&major=" + MajorSelect.value + "&location=" + LocationSelect.value + "&gender=" + GenderSelect.value;
        ajaxCall(url, param, null, null);
        
        setLocalData("gender", GenderSelect.value);
        setLocalData("major", MajorSelect.value);
        setLocalData("location", LocationSelect.value);
    
        setTimeout(function() {
                removeClass("NoticePopup", "hide");
               NoticePopup.style.display = "none";
               }, 200);
    }
}

function viewNotice() {
    NoticePopup.style.display = "block";
    setTimeout(function() {
               addClass("NoticeBody", "view");
               }, 10);
}

function viewSetting() {
    addClass("Start1", "prev");
    Start1.style.display = "none";
    addClass("Start2", "view");
    Logout.style.display = "block";
    
    GenderSelect.value = getLocalData("gender");
    MajorSelect.value = getLocalData("major");
    LocationSelect.value = getLocalData("location");
    
    NoticePopup.style.display = "block";
    setTimeout(function() {
               addClass("NoticeBody", "view");
               }, 10);
}

function onClickLogout() {
    showLoader();
    
    setLocalData("stuid", "");
    setLocalData("name", "");
    setLocalData("gender", "");
    setLocalData("major", "");
    setLocalData("location", "");
    
    addClass("NoticePopup", "hide");
    removeClass("NoticeBody", "view");
    
    StatusBar.styleDefault();
    
    setTimeout(function() {
               location.href = "login.html";
               }, 200);
}