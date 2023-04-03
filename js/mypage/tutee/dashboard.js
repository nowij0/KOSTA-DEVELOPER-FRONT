$(() => {

    userCheckIntervalLogined()
    //=== 모든 수업 목록 보여주기 START ===
    let url = backURL + 'mypage/tutee';
    
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        success: function (jsonObj) {
            console.log(jsonObj)

            $('#showLoginId').html(sessionStorage.getItem("logined"));

            //승인 예정 수업
            let $origin = $('#applyWaitList').first();
            let $parent = $('#applyWait');        
            $(jsonObj.applyWaitList).each((i) => {
                let $copy = $origin.clone();
                $copy.find('div.al-lastLsit-lessonName').html('📍 ' + jsonObj.applyWaitList[i].lessonName).css('background-color', '#F9F9F9');
                $copy.find('div.al-lastLsit-lessonSeq').html( jsonObj.applyWaitList[i].lessonSeq)
                $parent.append($copy);
            })
            $origin.hide();

            //진행 예정 수업
            $origin = $('#notYetList').first();
            $parent = $('#notYet');        
            $(jsonObj.notYetList).each((i) => {
                let $copy = $origin.clone();
                $copy.find('div.ny-lastLsit-lessonName').html('📍 ' + jsonObj.notYetList[i].lessonName).css('background-color', '#F9F9F9');
                $copy.find('div.al-lastLsit-lessonSeq').html( jsonObj.notYetList[i].lessonSeq)
                $parent.append($copy);
            })
            $origin.hide();

            //승인 거절 수업
            $origin = $('#rejectList').first();
            $parent = $('#reject');        
            $(jsonObj.rejectList).each((i) => {
                let $copy = $origin.clone();
                $copy.find('div.rl-lastLsit-lessonName').html('📍 ' + jsonObj.rejectList[i].lessonName).css('background-color', '#F9F9F9');
                $copy.find('div.al-lastLsit-lessonSeq').html( jsonObj.rejectList[i].lessonSeq)
                $parent.append($copy);
            })
            $origin.hide();

            //진행 중인 수업 
            $origin = $('#proceedingList').first();
            $parent = $('#proceed');        
            $(jsonObj.proceedingList).each((i) => {
                let $copy = $origin.clone();
                $copy.find('div.pl-lastLsit-lessonName').html('📍 ' + jsonObj.proceedingList[i].lessonName).css('background-color', '#F9F9F9');
                $copy.find('div.al-lastLsit-lessonSeq').html( jsonObj.proceedingList[i].lessonSeq)
                $parent.append($copy);
            })
            $origin.hide();

            //진행 완료된 수업
            $origin = $('#lastList').first();
            $parent = $('#last');        
            $(jsonObj.lastList).each((i) => {
                let $copy = $origin.clone();
                $copy.find('div.la-lastLsit-lessonName').html('📍 ' + jsonObj.lastList[i].lessonName).css('background-color', '#F9F9F9');
                $copy.find('div.al-lastLsit-lessonSeq').html( jsonObj.notYetList[i].lessonSeq)
                $parent.append($copy);
            })
            $origin.hide();
        
        },
        error: function (xhr) {
            let jsonObj = JSON.parse(xhr.responseText);
            alert(jsonObj.msg);
        }
    });
    //=== 모든 수업 목록 보여주기 END ===


    //===  수업 제목 누르면 해당 수업 상세정보로 이동  START ===
    $("div.dash-box").on('click', 'div.al-lastLsit-lessonName', (e) => {
        let lessonSeq = $(e.target).parents('#applyWaitList').find('div.al-lastLsit-lessonSeq').html();
        location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
    })
    $("div.dash-box").on('click', 'div.ny-lastLsit-lessonName', (e) => {
        let lessonSeq = $(e.target).parents('#notYetList').find('div.al-lastLsit-lessonSeq').html();
        location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
    })
    $("div.dash-box").on('click', 'div.rl-lastLsit-lessonName', (e) => {
        let lessonSeq = $(e.target).parents('#rejectList').find('div.al-lastLsit-lessonSeq').html();
        location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
    })
    $("div.dash-box").on('click', 'div.pl-lastLsit-lessonName', (e) => {
        let lessonSeq = $(e.target).parents('#proceedingList').find('div.al-lastLsit-lessonSeq').html();
        location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
    })
    $("div.dash-box").on('click', 'div.la-lastLsit-lessonName', (e) => {
        let lessonSeq = $(e.target).parents('#lastList').find('div.al-lastLsit-lessonSeq').html();
        location.href = frontURL + 'lesson/detail.html?' + lessonSeq;
    })

    //===  수업 제목 누르면 해당 수업 상세정보로 이동  END ===
});

