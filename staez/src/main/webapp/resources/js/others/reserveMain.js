window.onload = function(){
    const body = document.querySelector("body");
    body.classList.add("noScroll");
    mainCategoryName((category) => drawOption(category));
    mainPopularBoardList((bList) => drawBoardListContent(bList));
    showAdvertisements()
}

let slideIndex = 0;
function showAdvertisements() {
    
    let advertisements = document.getElementsByClassName("advertisement");
   
    for (let i = 0; i < advertisements.length; i++) {
        advertisements[i].style.display = "none";
        advertisements[i].classList.remove("hidden")
    }
    slideIndex++;
    if (slideIndex > advertisements.length) {
        slideIndex = 1
    }
    advertisements[slideIndex - 1].style.display = "block";
    setTimeout(showAdvertisements, 2000); 
}

function drawOption(category){
    
    const select1 = document.getElementById("popularity-concert-category-box");
    const select2 = document.getElementById("latest-concert-category-box");
    
    for (let c of category){
        select1.innerHTML += `<option value="`+c.categoryNo+`">`+c.categoryName+`</option>`;
        select2.innerHTML += `<option value="`+c.categoryNo+`">`+c.categoryName+`</option>`;
    }

    select1.onchange = function() {
        const categoryNo1 = this.value;
        selectPopularConcert({
            categoryNo1
        },(pcConcerts) => drawPopularConcert(pcConcerts, categoryNo1));
    };

    select2.onchange = function() {
        const categoryNo2 = this.value;
        selectLatestConcert({
            categoryNo2
        },(lcConcerts) => drawLatestConcert(lcConcerts, categoryNo2));
    };

    const categoryNo1 = document.getElementById("popularity-concert-category-box").value;
    const categoryNo2 = document.getElementById("latest-concert-category-box").value;
    selectPopularConcert({
        categoryNo1
    },(pcConcerts) => drawPopularConcert(pcConcerts, categoryNo1));

    selectLatestConcert({
        categoryNo2
    },(lcConcerts) => drawLatestConcert(lcConcerts, categoryNo2))
}
function drawPopularConcert(pcConcerts, categoryNo1){
    
    const pcConsertsArea = document.querySelector(".popularity-concert-information-slider");
    pcConsertsArea.innerHTML = ``;
    
    if(pcConcerts.length != 0){
        totalImg1 = pcConcerts.length;
        for (let c of pcConcerts){
            let categoryName;
            let mapping;
            if(c.originName === 'api'){
                console.log()
                categoryName = '연극'
                mapping = `condeapi.co?concertId=`+c.concertPlot;
            }else{
                categoryName = c.categoryName;
                mapping = `detail.co?concertNo=`+ c.concertNo;
            }
            pcConsertsArea.innerHTML += `<div class="popularity-concert-information">
                                            <a class="popularity-concert-information-a" href="${mapping}"><img class="popularity-concert-information-img" src="" alt=""></a>
                                            <div class="concert-search-result-content-info">
                                                <span class="concert-search-result-content-span1">`+ categoryName+`</span>
                                                <span class="concert-search-result-content-span2">[`+ c.concertTitle +`]</span>
                                                <span class="concert-search-result-content-span3">`+ c.startDate + ` ~ ` + c.endDate +`</span>
                                            </div>
                                        </div>`
        } 
        popularConcertImg(categoryNo1)
    } else{
        pcConsertsArea.innerHTML += `<span style="width: 1000px; text-align: center; font-size: 35px;">준비된 공연이 없습니다</span>`
    }
}

function popularConcertImg(categoryNo1){
    selectPopularConcertImg({
        categoryNo1
    },(concertImgs) => drawPopularConcertImg(concertImgs));
}

function drawPopularConcertImg(concertImgs){
    console.log(concertImgs)
    const imgArea = document.querySelectorAll(".popularity-concert-information-img");

    for(let i = 0; i < imgArea.length; i++){
        
        if(concertImgs[i].originName === 'api'){
            imgArea[i].src=concertImgs[i].filePath;
        }else{
            imgArea[i].src="/staez" + concertImgs[i].filePath + concertImgs[i].changeName;
        }

    }
    checkedButtonHidden();
}

function drawLatestConcert(lcConcerts, categoryNo2){

    const pcConsertsArea = document.querySelector(".latest-concert-information-slider");
    pcConsertsArea.innerHTML = ``;
    
    if(lcConcerts != 0){
        totalImg2 = lcConcerts.length;
        for (let c of lcConcerts){
            let categoryName;
            let mapping;
            if(c.originName === 'api'){
                categoryName = "연극"
                mapping = `condeapi.co?concertId=`+c.concertPlot;
            }else{
                categoryName = c.categoryName;
                mapping = `detail.co?concertNo=`+ c.concertNo;
            }
            pcConsertsArea.innerHTML += `<div class="latest-concert-information">
                                            <a class="latest-concert-information-a" href="${mapping}"><img class="latest-concert-information-img" src="" alt=""></a>
                                            <div class="concert-search-result-content-info">
                                                <span class="concert-search-result-content-span1">`+ categoryName+`</span>
                                                <span class="concert-search-result-content-span2">[`+ c.concertTitle +`]</span>
                                                <span class="concert-search-result-content-span3">`+ c.startDate + ` ~ ` + c.endDate +`</span>
                                            </div>
                                        </div>`
        }
        latestConcertImg(categoryNo2)
    } else{
        pcConsertsArea.innerHTML += `<span style="width: 1000px; text-align: center; font-size: 35px;">준비된 공연이 없습니다</span>`
    }
    
}

function latestConcertImg(categoryNo2){
    selectlatestConcertImg({
        categoryNo2
    },(concertImgs) => drawlatestConcertImg(concertImgs));
}

function drawlatestConcertImg(concertImgs){

    const imgArea = document.querySelectorAll(".latest-concert-information-img");

    for(let i = 0; i < imgArea.length; i++){
        if(concertImgs[i].originName === 'api'){
            imgArea[i].src=concertImgs[i].filePath;
        }else{
            imgArea[i].src="/staez" + concertImgs[i].filePath + concertImgs[i].changeName;
        }
    }
    checkedButtonHidden();
}

function drawBoardListContent(bList){
    console.log("게시글" + bList)
    const userInput = document.querySelector("input[name = 'userNo']");
    const uNo = userInput.value;
    const boardArea = document.querySelector(".popularity-bulletin-information-area");
    if(!uNo){
        boardArea.innerHTML = ``
        for(let b of bList){
            boardArea.innerHTML += `<div class="popularity-bulletin-information">
                                        <div class="popularity-bulletin-information-a" onclick="noLogin()">
                                            <div class="popularity-bulletin-content-area">
                                                <div class="popularity-bulletin-title">
                                                    <span>`+ b.boardTitle +`</span>
                                                </div>
                                                <hr class="popularity-bulletin-hr">
                                                <div class="popularity-bulletin-detail-content">
                                                    <div class="content-box">`+ b.boardContent +`</div>
                                                    <div class="heart-count-area">
                                                        <img class="heart" src="/staez/resources/img/others/like-no.png" alt="">
                                                        <input type="hidden" value="`+ b.boardNo +`" class="imgLike" name="boardNo">
                                                        <input type="hidden" value="`+ b.userNo +`" name="userNo">
                                                        <span class="heart-count">`+ b.likeCount +`</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="user-and-category-tag-area">
                                                <div class="user-profile"><img class="user-profile-img" src="" alt=""></div>
                                                <button class="btn-staez checked" style="padding: 0px 10px"><h5 class="tag"></h5></button>
                                                <button class="btn-staez checked" style="padding: 0px 10px"><h5 class="tag"></h5></button>
                                            </div>  
                                        </div>
                                    </div>`
        } 
    } else {
        boardArea.innerHTML = ``
        for(let b of bList){
            boardArea.innerHTML += `<div class="popularity-bulletin-information">
                                        <div class="popularity-bulletin-information-a" onclick="location.href='detail.cm?boardNo=`+ b.boardNo +`'">
                                            <div class="popularity-bulletin-content-area">
                                                <div class="popularity-bulletin-title">
                                                    <span>`+ b.boardTitle +`</span>
                                                </div>
                                                <hr class="popularity-bulletin-hr">
                                                <div class="popularity-bulletin-detail-content">
                                                    <div class="content-box">`+ b.boardContent +`</div>
                                                    <div class="heart-count-area" onclick="changeLike(this, event, `+ b.boardNo +`)">
                                                        <img class="heart" src="/staez/resources/img/others/like-no.png" alt="">
                                                        <input type="hidden" value="`+ b.boardNo +`" class="imgLike" name="boardNo">
                                                        <input type="hidden" value="`+ b.userNo +`" name="userNo">
                                                        <span class="heart-count">`+ b.likeCount +`</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="user-and-category-tag-area">
                                                <div class="user-profile"><img class="user-profile-img" src="" alt=""></div>
                                                <button class="btn-staez checked" style="padding: 0px 10px"><h5 class="tag"></h5></button>
                                                <button class="btn-staez checked" style="padding: 0px 10px"><h5 class="tag"></h5></button>
                                            </div>  
                                        </div>
                                    </div>`
        }
        selectUserLikeBoardNo({
            uNo
        },(ubNoList) => drawLikeImg(ubNoList));
    }
   

    popularBoardCategory((boardCategory) => drawBoardListContentCategory(boardCategory));
}

function noLogin(){
    alert("로그인 후 이용가능한 서비스입니다.")
    location.href=`loginForm.me`
}

function drawLikeImg(ubNoList){
    const imgLike = document.querySelectorAll(".imgLike");
    var bNoList = ubNoList.map(function(obj) {
        return obj.boardNo;
    });
    for(let i = 0; i < imgLike.length; i++){
        let value = parseInt(imgLike[i].value.trim(), 10);
        if(bNoList.includes(value)){
            var targetImgEl = imgLike[i].parentElement;
            var targetImg = targetImgEl.querySelector(".heart");
            targetImg.src="/staez/resources/img/others/like-yes.png"
        } else {
            var targetImgEl = imgLike[i].parentElement;
            var targetImg = targetImgEl.querySelector(".heart");
            targetImg.src="/staez/resources/img/others/like-no.png"
        }
    }

    
}

function drawBoardListContentCategory(boardCategory){
    console.log(boardCategory)
   const  categoryTag = document.querySelectorAll(".tag");
   for(let i = 0; i < boardCategory.length; i++){
    categoryTag[i].innerHTML = boardCategory[i].categoryName;
    categoryTag[i+1].innerHTML = boardCategory[i+1].categoryName;
    i++;
   }


   const userNo = document.querySelectorAll(".heart-count-area input[name=userNo]");
   const imgArea = document.querySelectorAll(".user-profile-img");
   for(let i = 0; i < userNo.length; i++) {

        selectProfile({userNo: userNo[i].value}, (profile) => {
            imgArea[i].setAttribute("src", contextPath + profile);
        })
   }
    // userNo.forEach((uNo) => {selectProfile({userNo: uNo}, (profile) => 효영님함수(profile)})};
//    popularBoardUserProfile((profiles) => drawBoardListUserProFile(profiles));
}

// function drawBoardListUserProFile(profiles){
//     const imgArea = document.querySelectorAll(".user-profile-img");
//     for(let p of profiles){
//         imgArea[i].src="/staez" + p[i].filePath + p[i].changeName;
//     }
// }



/* 공연 리스트 슬라이드 하기 */

let currentIndex1 = 0;
let totalImg1 = 10;
const viewImg1 = 5;
const imgWidth1 =  10;

let currentIndex2 = 0;
let totalImg2 = 10;
const viewImg2 = 5;
const imgWidth2 =  10;

function checkedButtonHidden(){
    

    const pbutton = document.querySelector(".popularity-concert-information-area").querySelectorAll(".slider-btn");
    
    const lbutton = document.querySelector(".latest-concert-information-area").querySelectorAll(".slider-btn");
    
    const pCount = document.querySelectorAll(".popularity-concert-information");
    const lCount = document.querySelectorAll(".latest-concert-information");
   
    if(pCount.length < 6){
        currentIndex1 = 0
        updateSlider1()
        pbutton[0].classList.add("hidden")
        pbutton[1].classList.add("hidden")
    } else {
        pbutton[0].classList.remove("hidden")
        pbutton[1].classList.remove("hidden")
    }
    if(lCount.length < 6){
        currentIndex2 = 0
        updateSlider2()
        lbutton[0].classList.add("hidden")
        lbutton[1].classList.add("hidden")
    } else {
        lbutton[0].classList.remove("hidden")
        lbutton[1].classList.remove("hidden")
    }
}   

function slideLeft1() {
    if (currentIndex1 > 0) {
        currentIndex1--;
    }else{
        currentIndex1 = totalImg1-5;
    }
    updateSlider1();
}

function slideRight1() {
    if (currentIndex1 < totalImg1 - viewImg1) {
        currentIndex1++;
    } else{
        currentIndex1 = 0;
    }
    updateSlider1();
}

function updateSlider1() {
    const slider = document.querySelector('.popularity-concert-information-slider');
    const offset = -(currentIndex1 * imgWidth1);
    slider.style.transform = `translateX(${offset}%)`;
}


function slideLeft2() {
    if (currentIndex2 > 0) {
        currentIndex2--;
    }else{
        currentIndex2 = totalImg2-5;
    }
    updateSlider2();
}

function slideRight2() {
    if (currentIndex2 < totalImg2 - viewImg2) {
        currentIndex2++;
    } else{
        currentIndex2 = 0;
    }
    updateSlider2();
}

function updateSlider2() {
    const slider = document.querySelector('.latest-concert-information-slider');
    const offset = -(currentIndex2 * imgWidth2);
    slider.style.transform = `translateX(${offset}%)`;
}


/*따봉 누르기 */

function changeLike(_this, event, bNo) {
    event.stopPropagation(); 
    const likeNo = "/staez/resources/img/others/like-no.png";
    const likeYes = "/staez/resources/img/others/like-yes.png"; 
    let img = _this.querySelector('img')
    let src = img.src;
    const uNo = document.querySelector("input[name = 'userNo']").value;
    if(src.includes("no")){
        img.src = likeYes
        likeYesEv(uNo ,bNo, _this);
    } else {
        img.src = likeNo
        likeNoEv(uNo ,bNo, _this);
    } 
}

function likeYesEv(uNo ,bNo, countArea){
   
    insertUpdatelike({
        uNo,
        bNo
    },(likeCount) => drawLikeCount(likeCount, countArea))
}

function likeNoEv(uNo, bNo, countArea){
    updateNolike({
        uNo,
        bNo
    },(likeCount) => drawLikeCount(likeCount, countArea))
}

function drawLikeCount(likeCount, countArea){
    const countSpan = countArea.querySelector("span")
    countSpan.innerHTML = ``;
    countSpan.innerHTML = likeCount.length;
}

function popularConcert(){
    const categoryNo = document.querySelector("#popularity-concert-category-box").value;
    
    location.href="main.co?categoryNo="+categoryNo;
}

function latestConcert(){
    const categoryNo = document.querySelector("#latest-concert-category-box").value;
    
    location.href="main.co?categoryNo="+categoryNo;
}
