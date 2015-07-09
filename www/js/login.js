LoginButton.addEventListener('touchstart', touchButton);
LoginButton.addEventListener('touchend', touchendLoginButton);

function touchendLoginButton() {
    
    cordova.exec(function(){}, function(){}, "NativeCall", "getSettings", [ "" ]);
    
    LoginInput.blur();
    LoginPass.blur();
    
    //StatusBar.styleLightContent();
    removeClass(this.id, "touch");
    
    if(LoginInput.value == "") {
        showPopup("학번을 입력하세요.");
    } else if(LoginPass.value == "") {
        showPopup("비밀번호를 입력하세요.");
    } else {
        showLoader();
    
        setTimeout(function() { location.href = "main.html"; }, 3000);
        //location.href = "main.html";
    }
}