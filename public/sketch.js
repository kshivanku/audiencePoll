// INITIALIZE FIREBASE
var config = {
    apiKey: "AIzaSyDB7c6Uf8dcA5m8jrWEyjKSPK7crGENyyQ",
    authDomain: "audiencepoll-7e23c.firebaseapp.com",
    databaseURL: "https://audiencepoll-7e23c.firebaseio.com",
    projectId: "audiencepoll-7e23c",
    storageBucket: "audiencepoll-7e23c.appspot.com",
    messagingSenderId: "580263770976"
};
firebase.initializeApp(config);
var database = firebase.database();
var allusers = database.ref('allusers');

//CONNECT TO SOCKET SERVER
var socket;
socket = io.connect("https://audiencepoll.herokuapp.com/");

//GLOBAL VARIABLES
var username;
var profileColor;
var current_question;

//**************************//

//PREVENT RELOAD
window.onbeforeunload = function() {
    console.log("Trying to refresh");
    return "Refreshing the page will end your session and make us sad. Please don't refresh.";
}

$(document).ready(function() {
    loadPage("login_page");
    $("#usernameForm").submit(function(event) {
        loadPage("chat_page");
        username = $("#username").val();
        profileColor = getRandomColor();
        $("#chat_page_header h1").html(username);
        $("#profileColor").css('background-color', profileColor);
        var welcomeMessage = "Welcome <span style='font-weight: bold'>" + username + "</span> to the chat group. Please wait for a question.";
        socket.emit('newUserJoined', welcomeMessage);
        return false;
    })

    $("#questionForm").submit(function(event) {
        event.preventDefault();
        loadPage("chat_page");
        window.scrollTo(0, document.body.scrollHeight);
        var answerKey = $('input[name=option]:checked').attr('id');
        var question = current_question.question_text;
        var answer = current_question[answerKey];
        saveToDb(database.ref("allusers/" + username), answer, question);
        var messageContent = {
            "username": username,
            "profileColor": profileColor,
            "message": answer
        }
        socket.emit('userChatMessage', messageContent);
        return false;
    })
})

socket.on('questionData', gotQuestionData);
function gotQuestionData(data) {
    var canVibrate = "vibrate" in navigator || "mozVibrate" in navigator;
    if (canVibrate && !("vibrate" in navigator)){
      navigator.vibrate = navigator.mozVibrate;
    }
    if(navigator.vibrate) {
      navigator.vibrate([500]);
    }
    console.log(data);
    loadPage("question_page");
    current_question = data;
    //For Question Body
    $("#question_text").html(data.question_text);
    $("[for=" + $("#option1").attr("id") + "]").html(data.option1);
    $("[for=" + $("#option2").attr("id") + "]").html(data.option2);
    $("[for=" + $("#option3").attr("id") + "]").html(data.option3);
    $("[for=" + $("#option4").attr("id") + "]").html(data.option4);
    //For chat body
    gotAdminChatMessage(data.question_text);
}

socket.on('userChatMessage', gotUserChatMessage);
function gotUserChatMessage(data) {
    console.log(data);
    var chatPicDiv = "<div class='chatPicDiv " + data.username + "DP'></div>"
    var chatNameDiv = "<div class='chatNameDiv'>" + data.username + "</div>"
    var chatMessageDiv = "<div class='chatMessageDiv'>" + data.message + "</div>"
    $("#chat_body").append("<div class='userChatEntry'>" + chatPicDiv + chatNameDiv + chatMessageDiv + "</div>");
    $("." + data.username + "DP").css("background-color", data.profileColor);
}

socket.on('adminChatMessage', gotAdminChatMessage);
function gotAdminChatMessage(data) {
    navigator.vibrate([500]);
    var chatNameDiv = "<div class='chatNameDiv'>Researcher</div>";
    var chatMessageDiv = "<div class='chatMessageDiv'>" + data + "</div>";
    $("#chat_body").append("<div class='adminChatEntry'>" + chatNameDiv + chatMessageDiv + "</div>");
}

function saveToDb(key, answer, question) {
    var reqbody = {};
    reqbody[question] = answer;
    key.push(reqbody);
}

//**************************//

function loadPage(page) {
    switch (page) {
        case "login_page":
            console.log("loading login page");
            $("#login_page").css("display", "block");
            $("#chat_page").css("display", "none");
            $("#question_body").css("display", "none");
            break;
        case "chat_page":
            console.log("loading chat page");
            $("#login_page").css("display", "none");
            $("#chat_page").css("display", "block");
            $("#chat_body").css("display", "block");
            $("#question_body").css("display", "none");
            break;
        case "question_page":
            console.log("loading question page");
            $("#login_page").css("display", "none");
            $("#chat_page").css("display", "block");
            $("#chat_body").css("display", "none");
            $("#question_body").css("display", "block");
            break;
    }
}

//**************************//

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
