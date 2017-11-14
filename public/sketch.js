var socket;
socket = io.connect("https://audiencepoll.herokuapp.com/");

var name_error = "You have to have an alias!"

$(document).ready(function(){
  loadPage("login");
  $("#loginForm").submit(function(event){
    event.preventDefault();
    var username = $("#username").val();
    // $.ajax({
    //   type: "POST",
    //   url: url,
    //   data: username,
    //   success: success,
    //   dataType: dataType
    // });
    loadPage("survey_page");
  })
})

socket.on('sampleData', gotSampleData);
function gotSampleData(data) {
	console.log(data);
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
