$('#addLecture').click(()=>{
    $('.lightboxContainer').css("top" , "0%");
    $('.lightboxContainer').css("height" , "100%");
})
$('.exit').click(()=>{
    $('.lightboxContainer').css("top" , "-200%");
    $('.lightboxContainer').css("height" , "0");})