//
// var
var selectedMainItem = "";
var mainContainerScrollTop = "";

// event
SunBF.addEventListener("touchstart", touchstartItem);
SunBF.addEventListener("touchend", touchendItem);

// func
function touchstartItem() {
    if (selectedMainItem == "")
        addClass(this.id, "start");
}

function touchendItem() {
    if (selectedMainItem == "") {
        removeClass(this.id, "start");
    
        if (checkAction()) {
            // if
            preventScrollMainContainer();
            addClass(this.id, "in");
            selectedMainItem = this.id;
    
            var element = document.getElementById("Child" + this.id);
            element.style.display = "none";
            
            NaviTitle.innerHTML = "등록하기";
            viewRegist();
    
            viewBackButton();
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