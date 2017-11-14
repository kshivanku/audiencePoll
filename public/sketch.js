var socket;
socket = io.connect("https://audiencepoll.herokuapp.com/");

// Initialize Firebase
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

var username;

$(document).ready(function(){
  loadPage("login");
  $("#loginForm").submit(function(event){
    event.preventDefault();
    username = $("#username").val();
    saveNewUser(username);
    loadPage("survey_page");
  })
})

socket.on('sampleData', gotSampleData);
function gotSampleData(data) {
	console.log(data);
}

function saveNewUser(name) {
  reqbody = {
    'name' : name
  }
  allusers.push(reqbody);
  $.ajax({
    type: "POST",
    url: '/newUser',
    data: reqbody,
    dataType: JSON
  });
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
  }
}
