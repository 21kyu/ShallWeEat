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
    
        // ajax: 로그인 체크
        var url = serverURL + "login.jsp";
        var param = "id=" + LoginInput.value +"&pw=" + LoginPass.value;
        ajaxCall(url, param, successLogin, null);
        //setTimeout(function() { location.href = "main.html"; }, 3000);
        //location.href = "main.html";
    }
}

function successLogin(responseText) {
    try {
        if (responseText != "null") {
            var jsonData = JSON.parse(responseText);
            
            setLocalData("stuid", jsonData[0].stuid);
            setLocalData("name", jsonData[0].name);
            setLocalData("gender", jsonData[0].gender);
            setLocalData("major", jsonData[0].major);
            setLocalData("location", jsonData[0].location);
            
            location.href = "main.html";
        } else {
            showPopup("학번 또는 비밀번호가 잘못 입력되었습니다.<br><br>다시 시도해 주세요.");
            hideLoader();
        }
    } catch (e) {
        alert(e.message);
    }
}