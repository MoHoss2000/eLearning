console.log("Da");
$("#button1").click(function () {
    console.log("dada");
    // $('#logform').css("transform" , " translateY(0%)");
    $.ajax({
        type: "POST",
        // url: "https://api.mostafafarid.com:3000/api/student",
        data: {'name': 'da'},
        url: "http://localhost:3000/lectures",
        success: function (data) {},
        error: function (data) {alert('error')}
    });

    // window.location = "/lectures";
});


// var navigator_info = window.navigator;
// var screen_info = window.screen;
// var uid = navigator_info.mimeTypes.length;
// uid += navigator_info.userAgent.replace(/\D+/g, '');
// uid += navigator_info.plugins.length;
// uid += screen_info.height || '';
// uid += screen_info.width || '';
// uid += screen_info.pixelDepth || '';
// console.log(uid);
// // document.write(uid);
