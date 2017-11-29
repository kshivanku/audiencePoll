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


$(document).ready(function() {
    loadPage("login_page");
    $("#usernameForm").submit(function(event) {
        loadPage("chat_page");
        username = $("#username").val(); //sets the name of the user as a global variable
        profileColor = getRandomColor();
        $("#chat_page_header h1").html(username);
        $("#profileColor").css('background-color', profileColor);
        var welcomeMessage = "Welcome " + username + " to the chat group. You will be able to help the Writer in his date by answering simple questions which we will post at regular intervals.";
        socket.emit('newUserJoined', welcomeMessage);
        return false;
    })

    $("#questionForm").submit(function(event) {
        event.preventDefault();
        loadPage("chat_page");
        var answerKey = $('input[name=option]:checked').attr('id');
        var question = current_question.question_text;
        var answer = current_question[answerKey];
        saveToDb(database.ref("allusers/" + username), answer, question);
        var answerContent = {
          "username": username,
          "answer": answer
        }
        socket.emit('answerContent', answerContent);
        return false;
    })
})

socket.on('questionData', gotQuestionData);
function gotQuestionData(data) {
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
    var chatNameDiv = "<div id='chatNameDiv'>Admin</div>";
    var answerDiv = "<div id='answerDiv'>" + data.question_text + "</div>";
    $("#chat_body").append("<div id='adminChatEntry'>" + chatNameDiv + answerDiv + "</div>");
}

socket.on('answerContent', gotAnswerData);
function gotAnswerData(data) {
  console.log(data);
  var chatPicDiv = "<div id='chatPicDiv'></div>"
  var chatNameDiv = "<div id='chatNameDiv'>" + data.username + "</div>"
  var answerDiv = "<div id='answerDiv'>" + data.answer + "</div>"
  $("#chat_body").append("<div id='userChatEntry'>" + chatPicDiv + chatNameDiv + answerDiv + "</div>");
  $("#chatPicDiv").css("background-color", profileColor);
}

socket.on('welcomeMessage', gotWelcomeMessage);
function gotWelcomeMessage(data) {
  var chatNameDiv = "<div id='chatNameDiv'>Admin</div>";
  var answerDiv = "<div id='answerDiv'>" + data + "</div>";
  $("#chat_body").append("<div id='adminChatEntry'>" + chatNameDiv + answerDiv + "</div>");
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
