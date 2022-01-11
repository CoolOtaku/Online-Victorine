var initial_position;
var last_position;
var thisQuestion;
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setSesion(){
  initial_position = -1;
  last_position = TestData.questions.length-1;
}
function setQuestion(){
  initial_position++;
  if(initial_position > last_position){
    $("#question").empty();
    $("#answers").empty();
    $("#answers").html("<div class=\"col-4 text-center\"><h3>Тест</h3></div>"+
      "<div class=\"col-4 text-center align-items-center\"><img src=\"assets/img/balls.gif\" width=\"100%\">"+
      "<h4>Балів "+count_true_reply+" із "+Number(last_position+1)+"</h4>"+
      "</div><div class=\"col-4 text-center\"><h3>Завершено</h3></div>");
    $("#con-btn").html("<button id=\"btn_exit\" class=\"btn btn-primary\">Ок</button>");
    $("#btn_exit").click(function() {
      window.location.href = "index.html";
    });
    return true;
  }else if(initial_position == last_position) {
    $("#btn_next").text("Завершити тест");
  }
  thisQuestion = TestData.questions[initial_position];
  $("#question").text(thisQuestion.question);
  $("#answers").empty();
  $.each(thisQuestion.answers, function(i, v) {
    $("#answers").append("<div class=\"alert alert-dark\" role=\"alert\"><input type=\"radio\" class=\"btn-check\" name=\"resanswer\" id=\""+i+"\" autocomplete=\"off\"><label class=\"btn btn-outline-success\" for=\""+i+"\">"+v+"</label></div>");
  });
}
function verifyAnswer(){
  var selected = document.querySelector('input[name="resanswer"]:checked');
  if(selected == null){
    var noSelected = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(noSelected);
    toast.show();
    return false;
  }
  if(selected.id == thisQuestion.true_reply){
    count_true_reply++;
  }
  setQuestion();
}
jQuery.isSubstring = function(haystack, needle) {
  return haystack.indexOf(needle) !== -1;
};
