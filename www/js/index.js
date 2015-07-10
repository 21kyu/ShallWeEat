/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// var
var actionInterval = 500;
var isAction = true;
var timeoutAction;

// event

// func
function addClass(curID, name) {
    var element = document.getElementById(curID);
    if (!findClass(curID, name))
        element.className = element.className + " " + name;
}

function removeClass(curID, name) {
    var element = document.getElementById(curID);
    var splitClass = element.className.split(" ");
    var splitLength = splitClass.length;
    var tempClass = "";
    
    for (var i=0; i < splitLength; i++) {
        if (splitClass[i] != name)
            tempClass += splitClass[i] + " ";
    }
    
    element.className = tempClass;
}

function findClass(curID, name) {
    var element = document.getElementById(curID);
    var splitClass = element.className.split(" ");
    var splitLength = splitClass.length;
    var tempClass = "";
    
    for (var i=0; i < splitLength; i++) {
        if (splitClass[i] == name)
            return true;
    }
    
    return false;
    
}

function checkAction() {
    if (isAction) {
        clearTimeout(timeoutAction);
        isAction = false;
        timeoutAction = setTimeout(function() { isAction = true }, actionInterval);
        return true;
    } else
        return false;
}

function touchButton() {
    addClass(this.id, "touch");
}

function showLoader() {
    GlobalLoader.style.display = "block";
}

function hideLoader() {
    GlobalLoader.style.display = "none";
}

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