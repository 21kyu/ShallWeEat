//
// var


// event
CancelMatch.addEventListener("touchstart", touchButton);
CancelMatch.addEventListener("touchend", funcCancelMatch);

// func
function matchStart() {
    MatchContainer.style.display = "block";
    StatusBar.styleLightContent();
    
    setTimeout(function() { addClass("MatchContainer", "view"); }, 10);
}

function funcCancelMatch() {
    removeClass(this.id, "touch");
    
    if (checkAction()) {
        removeClass("MatchContainer", "view");
        StatusBar.styleDefault();
    
        setTimeout(function() { MatchContainer.style.display = "none"; }, 400);
    }
}