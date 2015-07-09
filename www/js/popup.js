//
// var


// event


// func
function touchendPopupButton() {
    if(this.id != null) removeClass(this.id, "touch");
    removeClass("GlobalPopup", "view");
}

function showPopup(text, func) {
    PopupText.innerHTML = text;
    
    PBContainer.innerHTML = "<div id='PopupButton' class='pButton'>확인</div>";
    var PopupButton = document.getElementById('PopupButton');
    PopupButton.addEventListener('touchstart', touchButton);
    
    if (func == null) {
        PopupButton.addEventListener('touchend', touchendPopupButton);
    } else {
        PopupButton.addEventListener('touchend', func);
    }
    
    addClass("GlobalPopup", "view");
}