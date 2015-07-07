LoginButton.addEventListener('touchstart', touchButton);
LoginButton.addEventListener('touchend', touchendLoginButton);

function touchendLoginButton() {
    
    cordova.exec(function(){}, function(){}, "NativeCall", "getSettings", [ "" ]);
    
    //StatusBar.styleLightContent();
    removeClass(this.id, "touch");
    
    location.href = "main.html";
}