// dismissanble alert boxes
$(document).ready(function() {
    $(".alert-dismissible .close").click( function () {
        $(this).closest(".alert").slideUp(100);
    })
});

// scroll to top button
$(document).ready(function() {
	$("body").append('<span id="back_top"></span>');
	$(window).scroll(function() {
		if ($(this).scrollTop() > 250) {
			$('#back_top').fadeIn(700);
		} else {
			$('#back_top').fadeOut(500);
		}
	});
	$('#back_top').click(function(event) {
		$('html, body').animate({scrollTop: 0}, 250);
		event.preventDefault();
	})
});

// to make sure that the body's bottom margin is equal the height of the sticky footer
$(function() {
    var wWidth = $(window).width();
    var headH = $("#header-wrapper").css("height")
    var footH = $("#footer-wrap").css("height")
    $("body").css( "margin-bottom", footH );
    $(window).resize(function() {
        var headH = $("#header-wrapper").css("height")
        var footH = $("#footer-wrap").css("height")
        if( wWidth != $(window).width() ) {
            $("body").css( "margin-top", headH );
            $("body").css( "margin-bottom", footH );
        }
    });
});
