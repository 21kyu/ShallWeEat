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
var serverURL = "http://52.68.241.16:8080/";

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

// Ajax
function ajaxCall(url, param, successCallback, errorCallback) {
    var xhr;
    
    try {
    
    if (window.XMLHttpRequest)
        xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //alert(xhr.responseText);
                
                successCallback(trim(xhr.responseText));
            } else {
                if (errorCallback)
                    errorCallback();
                else
                    alert("ERROR " + xhr.status + " " + xhr.statusText + " " + xhr.responseXML);
            }
        }
    }
    
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(param);
        
    } catch (e) {
        alert(e.message);
    }
}

// 앞뒤 공백문자열을 제거
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/gi, "");
}

// html5 Storage
function setLocalData(key, value) {
    localStorage.setItem(key, value);
}

function getLocalData(key) {
    return localStorage.getItem(key);
}

function getNumberOnly(value){
    var regex = /[^0-9]/g;
    return Number(value.replace(regex, ''));
}

function getTimeType(value) {
    var val = value.toString();
    if (val.length == 3) {
        return val.substr(0,1) + ":" + val.substr(1,2);
    } else {
        return val.substr(0,2) + ":" + val.substr(2,2);
    }
}

function getTimeTypeForWait(value) {
    var val = value.toString();
    if (val.length == 3) {
        return "0" + val.substr(0,1) + ":" + val.substr(1,2);
    } else {
        return val.substr(0,2) + ":" + val.substr(2,2);
    }
}