var requiredLecture;
var pathname = window.location.pathname;
var pathElements = pathname.split("/");
var year = pathElements[2];


if (pathElements[3]){
    window.history.pushState("", "", `/lectures/${year}`);
    window.close();
}

$(".bt").click(function () {
    document.getElementById('logform').action = `/lectures/${year}/${requiredLecture._id}`;
    console.log(requiredLecture._id)
    console.log(requiredLecture);
    $('#logform').css("transform", " translateY(0%)");
});

