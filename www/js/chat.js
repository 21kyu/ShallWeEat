//
// var
var chatInterval;
var prevChatSender = "";
var chatid = 0;
var charGetInterval = 2000;

// event
ChatBody.addEventListener("touchend", onClickChatBody);
ExitChat.addEventListener("touchend", onClickExitChat);
ChatInput.addEventListener("input", onInputChatInput);
ChatSend.addEventListener("touchstart", touchButton);
ChatSend.addEventListener("touchend", onClickChatSend);

// func
function viewChat() {
    //StatusBar.styleLightContent();
    //ChatBody.style.webkitOverflowScrolling = "touch";
    
    ChatTitle.innerHTML = hashData[selectedMainItem]["day"] + " " + hashData[selectedMainItem]["state"] + " (" + hashData[selectedMainItem]["count"] + ")";
    
    ChatContainer.style.display = "block";
    setTimeout(function() { addClass("ChatBox", "view");
               
               setTimeout(function() { ChatInput.disabled = false; }, 500);
               
               showLoader();
               // ajax: 모든 채팅 가져오기
               var url = serverURL + "getAllChat.jsp";
               var param = "scheduleid=" + scheduleid;
               ajaxCall(url, param, successGetAllChat, null);
               
               ChatBody.scrollTop = ChatBody.scrollHeight; }, 10);
}

function successGetAllChat(responseText) {
    try {
        //alert(responseText);
        if (responseText != "") {
            var jsonData = JSON.parse(responseText);
            var newChat = "";
            
            for (var i=jsonData.length - 1; i>=0; i--) {
                var timeSplit = (jsonData[i].sendtime).split(".");
                var timeText = timeSplit[3] > 12 ? "오후" : "오전";
                var timeHour = timeSplit[3] > 12 ? timeSplit[3] - 12 : timeSplit[3];
                
                if (jsonData[i].talkid == getLocalData("stuid")) {
                    if (jsonData[i].talkid != prevChatSender) {
                        newChat += "<div class='chatMessageLine'> <div class='chatTextBox chatRight'> <div class='chatName me'>나</div> <div class='chatText'>" + jsonData[i].text + "</div> </div> <div class='chatTime chatRight'>" + timeText + " " + timeHour + ":" + timeSplit[4] + "</div> <div class='clearboth'></div> </div>";
                    } else {
                        newChat += "<div class='chatMessageLine continue'> <div class='chatTextBox chatRight'> <div class='chatText continue'>" + jsonData[i].text + "</div> </div> <div class='chatTime chatRight continue'>" + timeText + " " + timeHour + ":" + timeSplit[4] + "</div> <div class='clearboth'></div> </div>";
                    }
                } else {
                    if (jsonData[i].talkid != prevChatSender) {
                        newChat += "<div class='chatMessageLine'> <div class='chatPicture chatLeft'><img src='img/face_2.png' height='30'></div> <div class='chatTextBox chatLeft'> <div class='chatName'>" + jsonData[i].name + "</div> <div class='chatText'>" + jsonData[i].text + "</div> </div> <div class='chatTime chatLeft'>" + timeText + " " + timeHour + ":" + timeSplit[4] + "</div> <div class='clearboth'></div> </div>"
                    } else {
                        newChat += "<div class='chatMessageLine continue'> <div class='chatPicture chatLeft continue'> </div> <div class='chatTextBox chatLeft'> <div class='chatText continue'>" + jsonData[i].text + "</div> </div> <div class='chatTime chatLeft continue'>" + timeText + " " + timeHour + ":" + timeSplit[4] + "</div> <div class='clearboth'></div> </div>"
                    }
                }
                
                chatid = jsonData[i].id;
                prevChatSender = jsonData[i].talkid;
            }
            
            ChatHistory.innerHTML = newChat;
            ChatBody.scrollTop = ChatBody.scrollHeight;
        }
        
        hideLoader();
        // ajax: 주기적으로 채팅 가져오기
        chatInterval = setInterval(function() {
                                   var url = serverURL + "getChat.jsp";
                                   var param = "scheduleid=" + scheduleid +"&chatid=" + chatid + "&talkid=" + getLocalData("stuid");
                                   ajaxCall(url, param, successGetChat, null);
                                   }, charGetInterval);
    } catch (e) {
        alert(e.message);
    }
}

function successGetChat(responseText) {
    try {
        if (responseText != "") {
            var jsonData = JSON.parse(responseText);
            var newChat = "";
            
            for (var i=0; i<jsonData.length; i++) {
                var timeSplit = (jsonData[i].sendtime).split(".");
                var timeText = timeSplit[3] > 12 ? "오후" : "오전";
                var timeHour = timeSplit[3] > 12 ? timeSplit[3] - 12 : timeSplit[3];
                
                if (jsonData[i].talkid != prevChatSender) {
                    newChat = "<div class='chatMessageLine'> <div class='chatPicture chatLeft'><img src='img/face_2.png' height='30'></div> <div class='chatTextBox chatLeft'> <div class='chatName'>" + jsonData[i].name + "</div> <div class='chatText'>" + jsonData[i].text + "</div> </div> <div class='chatTime chatLeft'>" + timeText + " " + timeHour + ":" + timeSplit[4] + "</div> <div class='clearboth'></div> </div>"
                } else {
                    newChat = "<div class='chatMessageLine continue'> <div class='chatPicture chatLeft continue'> </div> <div class='chatTextBox chatLeft'> <div class='chatText continue'>" + jsonData[i].text + "</div> </div> <div class='chatTime chatLeft continue'>" + timeText + " " + timeHour + ":" + timeSplit[4] + "</div> <div class='clearboth'></div> </div>"
                }
                
                chatid = jsonData[i].id;
                prevChatSender = jsonData[i].talkid;
                ChatHistory.innerHTML = ChatHistory.innerHTML + newChat;
                ChatBody.scrollTop = ChatBody.scrollHeight;
            }
        }
    } catch (e) {
        alert(e.message);
    }
}

function onClickExitChat() {
    clearInterval(chatInterval);
    //ChatBody.style.webkitOverflowScrolling = "auto";
    //ChatBody.scrollTop = ChatBody.scrollHeight;
    //StatusBar.styleDefault();
    
    ChatInput.disabled = true;
    removeClass("ChatBox", "view");
    setTimeout(function() { ChatContainer.style.display = "none"; }, 300);
}

function onClickChatBody() {
    ChatInput.blur();
}

function onInputChatInput() {
    removeClass("ChatSend", "touch");
    
    if (this.value != "") {
        addClass("ChatSend", "sendEnable");
    } else {
        removeClass("ChatSend", "sendEnable");
    }
}

function onClickChatSend() {
    if (findClass("ChatSend", "sendEnable")) {
        removeClass(this.id, "touch");
    
        var currentChatSender = getLocalData("stuid");
        var newChat = "";
        
        // ajax: 채팅 입력
        var url = serverURL + "putChat.jsp";
        var param = "scheduleid=" + scheduleid +"&talkid=" + getLocalData("stuid") + "&text=" + encodeURIComponent(ChatInput.value);
        ajaxCall(url, param, null, null);
        
        var date = new Date();
        var timeText = date.getHours() > 12 ? "오후" : "오전";
        var timeHour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        
        if (currentChatSender == prevChatSender) {
            newChat = "<div class='chatMessageLine continue'> <div class='chatTextBox chatRight'> <div class='chatText continue'>" + ChatInput.value + "</div> </div> <div class='chatTime chatRight continue'>" + timeText + " " + timeHour + ":" + date.getMinutes() + "</div> <div class='clearboth'></div> </div>";
        } else {
            newChat = "<div class='chatMessageLine'> <div class='chatTextBox chatRight'> <div class='chatName me'>나</div> <div class='chatText'>" + ChatInput.value + "</div> </div> <div class='chatTime chatRight'>" + timeText + " " + timeHour + ":" + date.getMinutes() + "</div> <div class='clearboth'></div> </div>";
        }
    
        ChatHistory.innerHTML = ChatHistory.innerHTML + newChat;
        removeClass("ChatSend", "sendEnable");
        prevChatSender = currentChatSender;
        ChatInput.value = "";
        ChatBody.scrollTop = ChatBody.scrollHeight;
    }
}