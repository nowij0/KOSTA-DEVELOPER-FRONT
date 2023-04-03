$(() => {
     userCheckIntervalLogined();
     //let queryStr = location.search.substring(1) // ?뒤에 붙는 매개변수 값 반환 
     // let arr = queryStr.split('=')

    
    let $banner = $(".banner-container").find("ul");

    let $bannerWidth = $banner.children().outerWidth();//배너 이미지의 폭
    let $bannerHeight = $banner.children().outerHeight(); // 높이
    let $bannerLength = $banner.children().length;//배너 이미지의 갯수
    let rollingId;
    rollingId = setInterval(function () { rollingStart(); }, 2000)

//=================[마우스 오버(롤링멈춤) & 마우스아웃(다시 롤링) START]==================
    $banner.mouseover(function () {
        //중지
        clearInterval(rollingId);
        $(this).css("cursor", "pointer");
    });
    //마우스 아웃되면 다시 시작
    $banner.mouseout(function () {
        rollingId = setInterval(function () { rollingStart(); }, 3000);
        $(this).css("cursor", "default");
    });
//=================[마우스 오버(롤링멈춤) & 마우스아웃(다시 롤링) END]==================



//=================[배너 START]==================
    function rollingStart() {
        $banner.css("width", $bannerWidth * $bannerLength + "px");
        $banner.css("height", $bannerHeight + "px");
        $banner.animate({ left: - $bannerWidth + "px" }, 5000, function () { //숫자는 롤링 진행되는 시간이다.
            //첫번째 이미지를 마지막 끝에 복사(이동이 아니라 복사)해서 추가한다.
            $(this).append("<li>" + $(this).find("li:first").html() + "</li>");
            //뒤로 복사된 첫번재 이미지는 필요 없으니 삭제한다.
            $(this).find("li:first").remove();
            //다음 움직임을 위해서 배너 좌측의 위치값을 초기화 한다.
            $(this).css("left", 0);
            //이 과정을 반복하면서 계속 롤링하는 배너를 만들 수 있다.
        });
    }

//=================[배너 END]==================



//=================[수업 & 게시글 START]==================
    let url = backURL + 'main/'
    let $origin_lesson = $('div.lessonlistorigin').first()
    let $origin_board = $('div.communityListOrigin').first()
    $origin_lesson.show()
    $origin_board.show()

    //천단위 콤마 함수
    function priceToString(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    $.ajax({
        xhrFields: {
            withCredentials: true //크로스오리진을 허용!
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)
            let $parent_lesson = $('div.lessonlist');
            let $parent_board = $('div.communityList');


            $(jsonObj.listBoard).each((index) => {
                let $copy_board = $origin_board.clone()
                $copy_board.find('div.postSeq').html(jsonObj.listBoard[index].postSeq) //우선 display:hidden
                if (jsonObj.listBoard[index].category == 0) {
                    $copy_board.find('div.postCategory').html('[Q/A]')
                } else if (jsonObj.listBoard[index].category == 1) {
                    $copy_board.find('div.postCategory').html('[스터디모집]')
                } else if (jsonObj.listBoard[index].category == 2) {
                    $copy_board.find('div.postCategory').html('[자유게시판]')
                }
                $copy_board.find('div.postTitle').html(jsonObj.listBoard[index].title)
                $copy_board.find('div.postContent').html(jsonObj.listBoard[index].boardContent)
                $copy_board.find('div.nickname').html('작성자: ' + jsonObj.listBoard[index].usersDTO.nickname)
                $copy_board.find('span.postCDate').html('작성일: ' + jsonObj.listBoard[index].boardDate)
                $copy_board.find('span.postRecommend').html('추천수: ' + jsonObj.listBoard[index].like)
                $copy_board.find('span.postCnt').html('조회수: ' + jsonObj.listBoard[index].hit)
                $parent_board.append($copy_board)
            })
            $origin_board.hide()

            $(jsonObj.listLesson).each((index) => {
                //lesson 부분
                let $copy_lesson = $origin_lesson.clone()
                let imgPath = jsonObj.listLesson[index].imgPath
                console.log(imgPath)


                //=================[이미지 다운로드 START]==================
                $.ajax({
                    xhrFields: {
                        responseType: "blob",
                    },
                    cashe: false,
                    url: backURL + "download/lesson",
                    method: "get",
                    data: "imgPath=" + imgPath + "&opt=inline&type=1",
                    success: function (result) {
                        //console.log(result);
                        let blobStr = URL.createObjectURL(result);
                        $copy_lesson.find("img.lessonImg").attr("src", blobStr);
                    },
                });
                //=================[이미지 다운로드 END]==================

                $copy_lesson.find('div.lessonSeq').html(jsonObj.listLesson[index].lessonSeq) //우선 display:hidden
                $copy_lesson.find('div.lessonName').html(jsonObj.listLesson[index].lessonName)
                $copy_lesson.find('div.lessonImgPath').html(jsonObj.listLesson[index].imgPath)
                if (jsonObj.listLesson[index].price == 0) {
                    $copy_lesson.find('div.lessonPrice').html('무료')
                } else if (jsonObj.listLesson[index].category != 0) {
                    $copy_lesson.find('div.lessonPrice').html(priceToString(jsonObj.listLesson[index].price) + '원')
                }
                $parent_lesson.append($copy_lesson)
            })
            $origin_lesson.hide()
        },
        error: function (xhr) {
            alert(xhr.status)  //에러메시지다시해보기
        }
    })

//=================[수업 & 게시글 END]==================

})


//================[수업이미지 클릭 시 START]==================-
$(document).on('click', 'img.lessonImg', (e) => {
    let lessonSeq = $(e.target).parents('div.lessonlistorigin').find('div.lessonSeq').text();
    console.log(lessonSeq)
    location.href = frontURL + 'lesson/detail.html?' + lessonSeq
})

//================[수업이미지 클릭 시 END]==================




//================[게시글영역 클릭 시 START]==================-
$(document).on('click', 'div.communityListOrigin', (e) => {
    let postSeq = $(e.target).parents('div.communityList').find('div.postSeq').eq(1).text();
    console.log(postSeq)
    location.href = frontURL + 'board/boarddetail.html?postSeq=' + postSeq
})
//================[게시글영역 클릭 시 END]==================