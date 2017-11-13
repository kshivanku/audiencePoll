var socket;
socket = io.connect("https://audiencepoll.herokuapp.com/");

$(document).ready(function(){
  loadPage("login");
  var url = window.location.href;
  console.log(url);
  if(location.search == "admin"){
    loadPage("admin")
}
  // $.get('/login', function(data){
  //   console.log("login page");
  //   loadPage(data);
  // })
})

$.get('/admin', function(data){
  console.log("admin page");
  loadPage(data);
})

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
