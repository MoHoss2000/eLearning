$(function () {
  $("html").bind("contextmenu", function (e) {
    return false;
  });
});

document.addEventListener('contextmenu', event => event.preventDefault());


document.onkeypress = function (event) {
  event = event || window.event;
  if (event.keyCode == 123 || event.keyCode == 93) {
    return false;
  }
};
document.onmousedown = function (event) {
  event = event || window.event;
  if (event.keyCode == 123 || event.keyCode == 93) {
    return false;
  }
};
document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode == 123 || event.keyCode == 93) {
    return false;
  }
};

//]]>

window.onload = function () {
  $("#title").html($(".btn1").text());
};


