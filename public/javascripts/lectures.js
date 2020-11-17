var requiredLecture;
var pathname = window.location.pathname;
var pathElements = pathname.split("/");
var year = pathElements[2];


if (pathElements[3]) {
    window.history.pushState("", "", `/lectures/${year}`);
    window.close();
}

$(".bt").click(function () {
    document.getElementById('logform').action = `/lectures/${year}/${requiredLecture._id}`;
    $('#logform').css("transform", " translateY(0%)");
});

$("#login").click(function() {
    var uuid = getUniqueID();
    console.log(uuid);
    document.getElementById('uid').value = uuid;

});

function getUniqueID() {
    var navigator_info = window.navigator;
    var screen_info = window.screen;
    var uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || '';
    uid += screen_info.width || '';
    uid += screen_info.pixelDepth || '';
    return uid;
}