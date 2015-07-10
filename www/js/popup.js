//
// var


// event


// func
function touchendPopupButton() {
    if(this.id != null) removeClass(this.id, "touch");
    removeClass("GlobalPopup", "view");
}

function showPopup(text, func, leftText, rightText, rightFunc) {
    try {
    PopupText.innerHTML = text;
    
    if (arguments.length < 3) {
        PBContainer.innerHTML = "<div id='PopupButton' class='pButton'>확인</div>";
        
        var PopupButton = document.getElementById('PopupButton');
        PopupButton.addEventListener('touchstart', touchButton);
        
        if (func == null) {
            PopupButton.addEventListener('touchend', touchendPopupButton);
        } else {
            PopupButton.addEventListener('touchend', func);
        }
        
    } else {
        PBContainer.innerHTML = "<div id='PopupButton1' class='pButton doubleButton'>" + leftText + "</div><div id='PopupButton2' class='pButton doubleButton'>" + (rightText == null ? "취소" : rightText) + "</div><div class='clearboth'></div>";
        
        var PopupButton1 = document.getElementById('PopupButton1');
        var PopupButton2 = document.getElementById('PopupButton2');
        PopupButton1.addEventListener('touchstart', touchButton);
        PopupButton2.addEventListener('touchstart', touchButton);
        
        PopupButton1.addEventListener('touchend', func);
        
        if (rightFunc == null) {
            PopupButton2.addEventListener('touchend', touchendPopupButton);
        } else {
            PopupButton2.addEventListener('touchend', rightFunc);
        }
    }
    
    addClass("GlobalPopup", "view");
    } catch(err) {
        alert(err.message);
    }
}