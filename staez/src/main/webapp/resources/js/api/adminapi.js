function category(data, callback){
    $.ajax({
        url: contextPath + "category.ad",
        data: data,
        success : function(res) {
            callback(res);
        }, error() {
            console.log("카테고리 요청 실패");
        }
    });
}

function ajaxToggleSeat(data, callback) {
    $.ajax({
        url: contextPath + "toggleSeat.ad",
        data: data,
        success : function(res) {
            callback(res);
        }, error() {
            console.log("toggleSeat 요청 실패");
        }
    });
}

function summernote() {
    $('#summernote').summernote({
        placeholder: '원하는 내용을 입력하세요',
        lang: 'ko-KR',
        tabsize: 2,
        height: 500,
        callbacks: {
            onImageUpload: fileUpload
        }
    });
}

function ajaxConcertSchedule(data, callback) {
    $.ajax({
        url: contextPath + "concertScheduleIncert.ad",
        data: data,
        success : function(res) {
            callback(res);
        }, error() {
            console.log("스케줄 요청 실패");
        }
    });
}

function ajaxSearchTheaterList(data, callback) {
    $.ajax({
        url: contextPath + "searchTheaterList.ad",
        data: data,
        success : function(res) {
            callback(res);
        }, error() {
            console.log("공연 검색 실패");
        }
    });
}

function insertFileApi(data, callback) {
    $.ajax({
        url: contextPath + "concertImgUpload.ad",
        type: "POST",
        data: data,
        processData: false, // 기본이 true로 true일 때는 전송하는 data를 string으로 변환해서 요청
        contentType: false, // application/x-www-form-urlencoded; charset=UTF-8; -> multipart/form-data로 보내기위해 false로 지정
        dataType: "json", // 서버로부터 json으로 데이터를 받겠다.
        success: function (changeNameList) {
            callback(changeNameList);
        },
        error: function () {
            console.log("파일업로드 api요청 실패")
        }
    })
}

function consertInsert(data, callback) {
    $.ajax({
        url: contextPath + "concertInsert.ad",
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        success: function(res) {
            callback(res);
        }, error() {
            console.log("삽입 실패");
        }
    })
}