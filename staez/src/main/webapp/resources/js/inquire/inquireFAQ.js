window.onload = function(){
    const cPage = '1';
    faqCategoryName((category) => drawCategory(category));
    selectFaq({cPage},(res) => drawFaq(res));
}

function drawCategory(categorys){
    const categorySpen = document.querySelectorAll(".categoryName");

    for (let i= 0; i < categorySpen.length; i++){
        categorySpen[i].innerHTML = categorys[i].categoryName;
        categorySpen[i].id = categorys[i].categoryNo;
    }       
}

function drawFaq(res){
    const faqCount = document.querySelector(".faq-count");
    const faqContent = document.querySelector(".faq-content-container");
    faqCount.innerHTML = `전체 ` + res.pi.listCount; 

    for(let f of res.faqs){
        faqContent.innerHTML += `<div class="faq-content-area">
                                    <div class="faq-content-category"><span>`+ f.categoryName +`</span></div>
                                    <span class="faq-content">`+ f.boardTitle +`</span>
                                    <img class="arrow-img" onclick="changeImg(this)" src="/staez/resources/img/inquire/down.png" alt="">
                                </div>
                                <div class="faq-content-answer-area">
                                    <div class="faq-content-answer">
                                        <p>`+ f.boardContent +`</p>
                                    </div>
                                    <div class="customer-service-insert-from-shortcut"><a href="insertForm.iq?categoryNo=`+ f.categoryNo +`">1대1 문의</a></div>
                                </div>`
    } 

    const pageArea = document.querySelector(".paging-area-container")
    const pi = res.pi;
    pageArea.innerHTML = ``;
    if(pi.currentPage === pi.maxPage){
        pageArea.innerHTML = ``
    } else {
        pageArea.innerHTML = `<div id="paging-area" onclick="addFaq(`+ (pi.currentPage+1) +`)">
                                    <a id="paging-tag">
                                        <span>더보기 +</span>
                                    </a>
                                </div>`
    } 
}

function addFaq(currentPage){
    const cPage = currentPage;
    const categoryNameArea = document.querySelector(".choice-background");
    const categoryName = categoryNameArea.querySelector(".choice-color-span").innerHTML;
    drawFaqContent({cPage, categoryName},(res)=>drawFaq(res));
}

function faqSearchEv(){
    const option = document.getElementById("search-way-box").value;
    const content = document.getElementById("input-search-bar").value;
    const cPage = 1;
    faqSearch({
        option,
        content,
        cPage
    }, (faqs) => drawSearchFaq(faqs));

}

function addSearchFaq(currentPage){
    const cPage = currentPage;
    const option = document.getElementById("search-way-box").value;
    const content = document.getElementById("input-search-bar").value;
    faqSearch({
        option,
        content,
        cPage
    }, (res) => drawSearchAddFaq(res));
}

function drawSearchFaq(res){
    const categoryBtn = document.querySelectorAll(".category-choice");
    const categoryText = document.querySelectorAll(".category-choice>span");

    for(let i = 0; i < categoryBtn.length; i++){
        categoryBtn[i].classList.remove("choice-background");
        categoryText[i].classList.remove("choice-color-span");
    }

    const faqCount = document.querySelector(".faq-count");
    const faqContent = document.querySelector(".faq-content-container");
    faqCount.innerHTML = `전체 ` + res.pi.listCount;

    faqContent.innerHTML = ``;
    if(res.faqs.length === 0){
        
        faqContent.innerHTML += `<div style="margin-top: 30px;"><span style="font-size: 30px;">검색 결과가 없습니다.</span></div>`
    } else {
        for(let f of res.faqs){
            faqContent.innerHTML += `<div class="faq-content-area">
                                        <div class="faq-content-category"><span>`+ f.categoryName +`</span></div>
                                        <span class="faq-content">`+ f.boardTitle +`</span>
                                        <img class="arrow-img" onclick="changeImg(this)" src="/staez/resources/img/inquire/down.png" alt="">
                                    </div>
                                    <div class="faq-content-answer-area">
                                        <div class="faq-content-answer">
                                            <p>`+ f.boardContent +`</p>
                                        </div>
                                        <div class="customer-service-insert-from-shortcut"><a href="insertForm.iq">1대1 문의</a></div>
                                    </div>`
        } 

        const pageArea = document.querySelector(".paging-area-container")
        const pi = res.pi;
        pageArea.innerHTML = ``;
        if(pi.currentPage === pi.maxPage){
            pageArea.innerHTML = ``
        } else {
            pageArea.innerHTML = `<div id="paging-area" onclick="addSearchFaq(`+ (pi.currentPage+1) +`)">
                                        <a id="paging-tag">
                                            <span>더보기 +</span>
                                        </a>
                                    </div>`
        } 
    }
}

function drawSearchAddFaq(res){
    console.log(res)
    const faqContent = document.querySelector(".faq-content-container");
    for(let f of res.faqs){
        faqContent.innerHTML += `<div class="faq-content-area">
                                    <div class="faq-content-category"><span>`+ f.categoryName +`</span></div>
                                    <span class="faq-content">`+ f.boardTitle +`</span>
                                    <img class="arrow-img" onclick="changeImg(this)" src="/staez/resources/img/inquire/down.png" alt="">
                                </div>
                                <div class="faq-content-answer-area">
                                    <div class="faq-content-answer">
                                        <p>`+ f.boardContent +`</p>
                                    </div>
                                    <div class="customer-service-insert-from-shortcut"><a href="insertForm.iq">1대1 문의</a></div>
                                </div>`
    } 

    const pageArea = document.querySelector(".paging-area-container")
    const pi = res.pi;
    pageArea.innerHTML = ``;
    if(pi.currentPage === pi.maxPage){
        pageArea.innerHTML = ``
    } else {
        pageArea.innerHTML = `<div id="paging-area" onclick="addSearchFaq(`+ (pi.currentPage+1) +`)">
                                    <a id="paging-tag">
                                        <span>더보기 +</span>
                                    </a>
                                </div>`
    } 
}



function categoryChange(_this){
    const categoryBtn = document.querySelectorAll(".category-choice");
    const categoryText = document.querySelectorAll(".category-choice>span");

    for(let i = 0; i < categoryBtn.length; i++){
        categoryBtn[i].classList.remove("choice-background");
        categoryText[i].classList.remove("choice-color-span");
    }
    _this.classList.add("choice-background");
    _this.querySelector("span").classList.add("choice-color-span");
    categoryName = _this.querySelector("span").innerHTML;
    const cPage = 1;
    drawFaqContent({categoryName, cPage}, (res) => (drawCategoryFaq(res)));
}

function drawCategoryFaq(res){
    const faqCount = document.querySelector(".faq-count");
    const faqContent = document.querySelector(".faq-content-container");
    const pageArea = document.querySelector(".paging-area-container")
    faqCount.innerHTML = `전체 ` + res.pi.listCount;
    pageArea.innerHTML = ``;
    faqContent.innerHTML = ``;
    if(res.faqs.length === 0){
        faqContent.innerHTML += `<div style="margin-top: 30px;"><span style="font-size: 30px;">해당하는 FAQ가 없습니다.</span></div>`
    } else {
        for(let f of res.faqs){
            faqContent.innerHTML += `<div class="faq-content-area">
                                        <div class="faq-content-category"><span>`+ f.categoryName +`</span></div>
                                        <span class="faq-content">`+ f.boardTitle +`</span>
                                        <img class="arrow-img" onclick="changeImg(this)" src="/staez/resources/img/inquire/down.png" alt="">
                                    </div>
                                    <div class="faq-content-answer-area">
                                        <div class="faq-content-answer">
                                            <p>`+ f.boardContent +`</p>
                                        </div>
                                        <div class="customer-service-insert-from-shortcut"><a href="insertForm.iq">1대1 문의</a></div>
                                    </div>`
        } 
       
        const pi = res.pi;
        
        if(pi.currentPage === pi.maxPage){
            pageArea.innerHTML = ``
        } else {
            pageArea.innerHTML = `<div id="paging-area" onclick="addFaq(`+ (pi.currentPage+1) +`)">
                                        <a id="paging-tag">
                                            <span>더보기 +</span>
                                        </a>
                                    </div>`
        } 
    }

}

function changeImg(_this){
    const answerArea = $(_this).parent().next();  
    if (answerArea.css("display") === "none") {
        $(".faq-content-container .faq-content-answer-area").slideUp();
        $(_this).attr("src", "/staez/resources/img/inquire/up.png")
        answerArea.slideDown(); 
    } else {
        $(_this).attr("src", "/staez/resources/img/inquire/down.png")
        answerArea.slideUp(); 
    }
}





