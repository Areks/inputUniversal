inputUniversal
==============

Cross browser "oninput" event.

Plugin add new event 'inputUniversal' to the jQuery, it's cross browser copy of html5 event "oninput".

Using.
You can use it like common event in jQuery.

$("#third-test").on("inputUniversal", function (e){
    $("#third-test_label").text($(this).val());
});

OR

$("#third-test").inputUniversal(function(){
    $("#third-test_label").text($(this).val());
});