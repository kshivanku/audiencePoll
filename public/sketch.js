var socket;
socket = io.connect("https://audiencepoll.herokuapp.com/");

socket.on('questionData', gotQuestionData);
function gotQuestionData(data) {
  $("#loader").css("display", "none");
  $("#questionForm").css("display", "block");
	$("#question_text").html(data.question_text);
  $("[for=" + $("#option1").attr("id") + "]").html(data.option1);
  $("[for=" + $("#option2").attr("id") + "]").html(data.option2);
  $("[for=" + $("#option3").attr("id") + "]").html(data.option3);
  $("[for=" + $("#option4").attr("id") + "]").html(data.option4);
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDB7c6Uf8dcA5m8jrWEyjKSPK7crGENyyQ",
  authDomain: "audiencepoll-7e23c.firebaseapp.com",
  databaseURL: "https://audiencepoll-7e23c.firebaseio.com",
  projectId: "audiencepoll-7e23c",
  storageBucket: "audiencepoll-7e23c.appspot.com",
  messagingSenderId: "580263770976",
};
firebase.initializeApp(config);
var database = firebase.database();
var allusers = database.ref('allusers');

var username;

$(document).ready(function(){
  loadPage("login");
  $("#usernameForm").submit(function(event){
    loadPage("survey_page");
    username = $("#username").val(); //sets the name of the user as a global variable
    return false;
  })

  $("#questionForm").submit(function(event){
    $("#loader").css("display", "block");
    $("#questionForm").css("display", "none");
    event.preventDefault();
    answer = $('input[name=option]:checked').attr('id');
    //saveToDb(database.ref("allusers/" + username), answer, "question");
    return false;
  })
})

function saveToDb(key, value, dataType) {
    var reqbody = {};
    reqbody[dataType] = value;
    key.push(reqbody);
  }


function loadPage(page){
  switch (page) {
    case "login":
      $("#survey_page").css("display", "none");
      $("#login").css("display", "block");
      break;
    case "survey_page":
      $("#survey_page").css("display", "block");
      $("#login").css("display", "none");
      $("#loader").css("display", "block");
      $("#questionForm").css("display", "none");
      break;
  }
}
