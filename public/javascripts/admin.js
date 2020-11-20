var year;
var lectureID;
var lecture;
var button = document.getElementById("button");

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

$('.add').click(() => {
    $('.addContainer').css("top", "0%");
    $('.addContainer').css("height", "100%");
})



function closeAllForms() {

    $('.lightboxContainer').css("top", "-200%");
    $('.lightboxContainer').css("height", "0");

    $('.editFormContainer').css("top", "-200%");
    $('.editFormContainer').css("height", "0");

    $('.searchContainer').css("top", "-200%");
    $('.searchContainer').css("height", "0");

    $('.addContainer').css("top", "-200%");
    $('.addContainer').css("height", "0");
}


function loadSearchForm(lectureID) {
    document.getElementById("searchItem").innerHTML = `<div class="exit" onclick="closeAllForms()">
    <span class="iconify" data-icon="bx:bxs-x-circle" data-inline="false"
      style="color: rgba(17, 17, 113, 1)"></span>
  </div>
  <div class="wrap">
    <div class="search">
      <input type="text" id="searchTerm" class="searchTerm" placeholder="Write Code Here."
        required />
      <button id="button" onclick="" type="submit" class="searchButton">
        <span class="iconify" data-icon="ant-design:search-outlined" data-inline="false"></span>
      </button>
    </div>

    <div id="searchForm" class="mt-1">
      <form method="POST" action="/admin/updateCode/${year}/${lectureID}">
        <input style="display: none" name="code" id="changedCode" value="" />
        <select class="form-control" name="used" id="code">
          <option value="true">true</option>
          <option value="false">false</option>
        </select>

        <input type="submit" class="btn mt-1" value="Update " />
      </form>
    </div>
  </div>`

    $('.searchButton').click(() => {
        console.log("search");
        $.ajax({
            type: "POST",
            url: `/admin/code/${year}/${lectureID}`,
            data: { code: document.getElementById('searchTerm').value },
            dataType: 'json',
            success: function (response, status) {
                if (response['message'] == 'Success') {
                    document.getElementById('changedCode').value = document.getElementById('searchTerm').value;
                    document.getElementById('code').value = response['used']
                    $('#searchForm').css("display", "block");
                }
                else alert('Code not found');
            },
            error: function (response) {
                alert("Server error");
            },
        })



    })
}

function loadEditForm(lecture) {

    document.getElementById("editFormItem").innerHTML = `<div class="exit" onclick="closeAllForms()">
    <span class="iconify" data-icon="bx:bxs-x-circle" data-inline="false"
      style="color: rgba(17, 17, 113, 1)"></span>
  </div>
  <form method="POST" action="/admin/update/${year}/${lecture._id}" class="container p-4">
    <div class="name">
      <label for="" class="pt-4">Name:</label>
      <input required type="text" name="name" value="${lecture.name}" class="form-control" />
    </div>
    <div class="link">
      <label for="" class="pt-4">Link:</label>
      <input required type="url" name="link" value="${lecture.link}" class="form-control" />
    </div>
    <div class="time">
      <label for="" class="pt-4">Time:</label>
      <input required type="number" name="time" value="${lecture.time}" class="form-control" />
    </div>
    <div class="button">
      <button type="submit" class="btn mt-4 bg-blue">
        Update
      </button>
    </div>
  </form>`
}

function loadAddForm(lectureID) {
    document.getElementById("addItem").innerHTML = `
    <div class="exit" onclick="closeAllForms()">
    <span class="iconify" data-icon="bx:bxs-x-circle" data-inline="false"
      style="color: rgba(17, 17, 113, 1)"></span>
  </div>
  <div id="addForm" class="mt-5">
    <form method="POST" action="/admin/addCodes/${year}/${lectureID}" class="container">
      <input required type="number" name="count" id="add" placeholder="How many code?" class="form-control mt-3">
      <button type="submit" class="btn mt-1 mb-3">add</button>
    </form>
  </div>
</div>
    `;
}