
$("#button1").click(function () {
    $('#logform').css("transform" , " translateY(0%)");
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

