//
// var


// event


// func
function viewRoom() {
    pageState = 2;
    RoomContainer.style.display = "block";
    
    setTimeout(function() { addClass("RoomMemberCount", "view"); }, 300);
    setTimeout(function() { addClass("RoomMemberContainer", "view"); }, 400);
    setTimeout(function() { addClass("RoomBottom", "view"); }, 500);
    //setTimeout(function() { addClass("RegistButtonContainer", "view"); }, 600);
}

function hideRoom() {
    removeClass("RoomMemberCount", "view");
    removeClass("RoomMemberContainer", "view");
    removeClass("RoomBottom", "view");
    
    setTimeout(function() { RoomContainer.style.display = "none"; }, 300);
}