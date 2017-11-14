var socket;
socket = io.connect("https://audiencepoll.herokuapp.com/");

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

var userkey;

$(document).ready(function(){
  loadPage("login");
})

$("#loginForm").submit(function(event){
  event.preventDefault();
  var username = $("#username").val();
  saveToDb(allusers, username, "name");
  loadPage("survey_page");
})

$("#questionForm").submit(function(event)){
  event.preventDefault();
  height = $("#height").val();
  saveToDb(userkey, height, "height");
}

socket.on('sampleData', gotSampleData);
function gotSampleData(data) {
	console.log(data);
}

function saveToDb(key, value, dataType) {
  if(dataType == "name"){
    var reqbody = {
      'name' : value
    }
    var result = key.push(reqbody);
    userkey = result.key;
  }
  else if(dataType == "height") {
    var reqbody = {
      'height': value
    }
    key.push(reqbody);
  }

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
