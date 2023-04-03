$(() => {
    userCheckIntervalLogined()
    //=== 즐겨찾기한 수업 목록 보여주기 START ===
    let url = backURL + 'mypage/tutee/myreview';

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)
            $('#showLoginId').html(sessionStorage.getItem("logined"));
            let $origin = $('#review').first();
            let $parent = $('#myreview-list');

            if (jsonObj.length != 0) {
                $(jsonObj).each((i) => {
                    let star;
                    if (2.0 > jsonObj[i].lessonStar && jsonObj[i].lessonStar >= 0) {
                        star = "⭐️";
                    } else if (3.0 > jsonObj[i].lessonStar && jsonObj[i].lessonStar >= 2.0) {
                        star = "⭐️⭐️";
                    } else if (4.0 > jsonObj[i].lessonStar && jsonObj[i].lessonStar >= 3.0) {
                        star = "⭐️⭐️⭐️";
                    } else if (5.0 > jsonObj[i].lessonStar && jsonObj[i].lessonStar >= 4.0) {
                        star = "⭐️⭐️⭐️⭐️";
                    } else if (jsonObj[i].lessonStar && jsonObj[i].lessonStar >= 5.0) {
                        star = "⭐️⭐️⭐️⭐️⭐️";
                    }

                    let $copy = $origin.clone();

                    $copy.find('.lessonName').html(jsonObj[i].lessonName)
                    $copy.find('.name').html(jsonObj[i].tuteeName)
                    $copy.find('.star').html(star + " (" + jsonObj[i].lessonStar + ")")
                    $copy.find('.review').html(jsonObj[i].lessonReview)

                    $parent.append($copy);
                })
                $origin.hide();
            } else {
                $origin.hide();
                $('#noReview').html("작성한 후기가 없습니다.")
            }
        },
        error: function (xhr) {
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
});
//=== 튜터 상세 내용 보여주기 END ===

