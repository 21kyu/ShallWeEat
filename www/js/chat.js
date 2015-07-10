//
// var
var prevChatSender = "'11 현미림";

// event
ChatBody.addEventListener("touchend", onClickChatBody);
ExitChat.addEventListener("touchend", onClickExitChat);
ChatInput.addEventListener("input", onInputChatInput);
ChatSend.addEventListener("touchstart", touchButton);
ChatSend.addEventListener("touchend", onClickChatSend);

// func
function viewChat() {
    StatusBar.styleLightContent();
    
    ChatTitle.innerHTML = hashData[selectedMainItem]["day"] + " " + hashData[selectedMainItem]["state"] + " (" + hashData[selectedMainItem]["count"] + ")";
    
    ChatContainer.style.display = "block";
    setTimeout(function() { addClass("ChatBox", "view");
               
               setTimeout(function() { ChatInput.disabled = false; }, 500);
               
               ChatBody.scrollTop = ChatBody.scrollHeight; }, 10);
}

function onClickExitChat() {
    StatusBar.styleDefault();
    
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
    
        var currentChatSender = "나";
        var newChat = "";
        
        if (currentChatSender == prevChatSender) {
            newChat = "<div class='chatMessageLine continue'> <div class='chatTextBox chatRight'> <div class='chatText continue'>" + ChatInput.value + "</div> </div> <div class='chatTime chatRight continue'>오후 1:15</div> <div class='clearboth'></div> </div>";
        } else {
            newChat = "<div class='chatMessageLine'> <div class='chatTextBox chatRight'> <div class='chatName me'>나</div> <div class='chatText'>" + ChatInput.value + "</div> </div> <div class='chatTime chatRight'>오후 1:15</div> <div class='clearboth'></div> </div>";
        }
    
        ChatHistory.innerHTML = ChatHistory.innerHTML + newChat;
        removeClass("ChatSend", "sendEnable");
        prevChatSender = "나";
        ChatInput.value = "";
        ChatBody.scrollTop = ChatBody.scrollHeight;
    }
}