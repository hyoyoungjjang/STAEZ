function faqCategoryName(callback){
    $.ajax({
        url : "ajaxSelectCategory.iq",
        success : function(result){
            callback(result);
        },error : function(){
            console.log("실패")
        }
    })

}

function selectFaq(data, callback){
    $.ajax({
        url : "ajaxSelectFaq.iq",
        data : data,
        success : function(result){
            callback(result)
        },error : function(){
            console.log("실패")
        }
    })
}

function drawFaqContent(data, callback){
    $.ajax({
        url : "ajaxCategoryFaq.iq",
        data : data,
        success : function(result){
            console.log(result)
            callback(result);
        }, error : function(){
            console.log("실패");
        }
    })
}

function faqSearch(data, callback){
    $.ajax({
        url : "ajaxSearchSelectFaq.iq",
        data : data,
        success : function(result){
            callback(result);
        },error : function(){
            console.log("실패");
        }
    })
}