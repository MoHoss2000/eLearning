var year;
var lectureID;

$('#addLecture').click(() => {
    $('.lightboxContainer').css("top", "0%");
    $('.lightboxContainer').css("height", "100%");
})

$('.exit').click(() => {
    $('.lightboxContainer').css("top", "-200%");
    $('.lightboxContainer').css("height", "0");

    $('.editFormContainer').css("top", "-200%");
    $('.editFormContainer').css("height", "0");

    $('.searchContainer').css("top", "-200%");
    $('.searchContainer').css("height", "0");
})

$('.edit').click(() => {
    $('.editFormContainer').css("top", "0%");
    $('.editFormContainer').css("height", "100%");
})

$('.serach').click(() => {
    $('.searchContainer').css("top", "0%");
    $('.searchContainer').css("height", "100%");

})

$('.searchButton').click(() => {
    $.ajax({
        type: "POST",
        url: `/admin/code/${year}/${lectureID}`,
        data: { code: document.getElementById('searchTerm').value },
        dataType: 'json',
        success: function (response, status) {
            if (response['message'] == 'Success') {
                document.getElementById('changedCode').value = document.getElementById('searchTerm').value;
                document.getElementById('code').value = response['used']
                $('#searchForm').css("display" , "block");
            }
            else alert('Code not found');
        },
        error: function (response) {
            alert("Server error");
        },
    })



})



