$(document).ready(function(){
    if(window.localStorage.getItem("authToken")){
        $.ajax({
            url: '/user/verifier',
            method: "POST",
            data: {
                token: window.localStorage.getItem('authToken')
            },
            success: function(result){
                if(result.body.success){
                    $('.loader').css("display", "none");
                    $('.main').css("display", "block");
                    $('.errors').css("display", "none");

                    $("#recipeForm").submit(function(e){
                        e.preventDefault();
                        var name = $("#name").val();
                        var description = $("#description").val();

                        $.ajax({
                            url: "/add/recipe",
                            method: "POST",
                            data: {
                                name: name,
                                description: description,
                                token: window.localStorage.getItem("authToken")
                            },
                            success: function(result){
                                if(result.body.success){
                                    var div = $("<div class='card-panel green'>"+result.body.result+" Added Successfully </div>");
                                    $(".info").append(div);
                                } else {
                                    var div = $("<div class='card-panel red'>Some error occured added successfully</div>");
                                    $(".info").append(div);
                                }
                            },
                            error: function(err){
                                var div = $("<div class='card-panel red'>Either the Server is Down or Your Internet</div>");
                                $(".info").append(div);
                            }
                        })

                    })
                } else {
                    window.localStorage.removeItem("authToken");
                    $('.loader').css("display", "none");
                    $('.main').css("display", "none");
                    $('.errors').css("display", "block");
                }
            },
            error: function(err){
                window.localStorage.removeItem("authToken");
                $('.errors').text("Either the Server is down or Check Your internet connectivity");
                $('.loader').css("display", "none");
                $('.main').css("display", "none");
                $('.errors').css("display", "block");
            }            
        })
    } else {
        $('.loader').css("display", "none");
        $('.main').css("display", "none");
        $('.errors').css("display", "block");
    }
});