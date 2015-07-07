//
// var


// event
RegistButton.addEventListener("touchstart", touchButton);
RegistButton.addEventListener("touchend", onClickRegistButton);


// func
function viewRegist() {
    RegistContainer.style.display = "block";
    
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