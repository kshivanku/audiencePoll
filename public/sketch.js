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
var current_question;


//**************************//


$(document).ready(function() {
    loadPage("login_page");
    $("#usernameForm").submit(function(event) {
        loadPage("chat_page");
        username = $("#username").val(); //sets the name of the user as a global variable
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
    loadPage("question_page");
    current_question = data;
    $("#question_text").html(data.question_text);
    $("[for=" + $("#option1").attr("id") + "]").html(data.option1);
    $("[for=" + $("#option2").attr("id") + "]").html(data.option2);
    $("[for=" + $("#option3").attr("id") + "]").html(data.option3);
    $("[for=" + $("#option4").attr("id") + "]").html(data.option4);
}

socket.on('answerContent', gotAnswerData);
function gotAnswerData(data) {
  var chatNameDiv = "<div id='chatNameDiv'>" + data.username + "</div>"
  var answerDiv = "<div id='answerDiv'>" + data.answer + "</div>"
  $("#chat_page_body").append(chatNameDiv + answerDiv);
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
            $("#login_page").css("display", "block");
            $("#chat_page").css("display", "none");
            $("#question_page").css("display", "none");
            break;
        case "chat_page":
            $("#login_page").css("display", "none");
            $("#chat_page").css("display", "block");
            $("#question_page").css("display", "none");
        case "question_page":
            $("#login_page").css("display", "none");
            $("#chat_page").css("display", "none");
            $("#question_page").css("display", "block");
            break;
    }
}
