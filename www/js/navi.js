//
// var


// event
NaviBack.addEventListener("touchstart", touchButton);
NaviBack.addEventListener("touchend", funcBack);
NaviSetting.addEventListener("touchstart", touchButton);
NaviSetting.addEventListener("touchend", funcSetting);


// func
function viewBackButton() {
    addClass("NaviBack", "view");
}

function funcBack() {
    removeClass(this.id, "touch");
    
    if (checkAction()) {
        removeClass("NaviBack", "view");
        removeClass(selectedMainItem, "in");
        
        enableScrollMainContainer();
        
        NaviTitle.innerHTML = "홈";
        hideRegist();
        
        setTimeout(function() {
                   var element = document.getElementById("Child" + selectedMainItem);
                   element.style.display = "";
                   selectedMainItem = "";
        }, 400);
    }
}

function funcSetting() {
    removeClass(this.id, "touch");
    
    if (checkAction()) {
    }
}