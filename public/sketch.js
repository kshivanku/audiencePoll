var socket;
socket = io.connect("https://audiencepoll.herokuapp.com/");

$(document).ready(function(){
  loadPage("login");
})

socket.on(‘sampleData’, gotSampleData);
function gotSampleData(data) {
	console.log(data);
}

function loadPage(page){
  switch (page) {
    case "login":
      $("#admin").css("display", "none");
      $("#login").css("display", "block");
      break;
    case "admin":
      $("#admin").css("display", "block");
      $("#login").css("display", "none");
  }
}
