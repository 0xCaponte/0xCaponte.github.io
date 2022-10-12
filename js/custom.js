(function($) {
    "use strict";

    $(document).ready(function() {
        // PRELOADER
        $("body").toggleClass("loaded");
        setTimeout(function() {
            $("body").addClass("loaded");
        }, 3000);

        // PORTFOLIO DIRECTION AWARE HOVER EFFECT
        var item = $("#bl-work-items>div");
        var elementsLength = item.length;
        for (var i = 0; i < elementsLength; i++) {
            $(item[i]).hoverdir();
        }

        // TEXT ROTATOR
        $("#selector").animatedHeadline({
            animationType: "clip",
        });

        // BOX LAYOUT
        Boxlayout.init();

        // REMOVE # FROM URL
        $("a[href='#']").on("click", function(e) {
            e.preventDefault();
        });

        // AJAX CONTACT FORM
        $(".contactform").on("submit", function() {
            $(".output_message").text("Loading...");
            return false;
        });


        // RESUME CARDS ANIMATION
        $(".resume-list-item, .resume-card").on("click", function() {

            var selected = parseInt($(this).data("index"), 10);
            $(".resume-list-item").removeClass("is-active");
            $("#resume-list-item-" + selected).addClass("is-active");

            $(".resume-card").removeClass("is-active");
            $("#resume-card-" + selected).addClass("is-active");
        });


        // ----------------------- Carousel Arrows - Start -------------------------

        // MATERIAL CAROUSEL
        $(".carousel.carousel-slider").carousel({
            fullWidth: true,
            indicators: true,
        });

        // move next carousel
        $('.moveNextCarousel').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.carousel').carousel('next');
        });

        // move prev carousel
        $('.movePrevCarousel').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.carousel').carousel('prev');
        });
        // -----------------------  Carousel Arrows - End -------------------------

        //skills-counter
        $("#skills-counter [data-star]").each(function(e) {
            var intValue = parseInt($(this).attr("data-star"));
            var floatValue = parseFloat($(this).attr("data-star"));

            // make full with half star
            var makeFull = function(intValue, floatValue) {
                var html = "";
                for (let index = 1; index < intValue + 1; index++) {
                    if (index == intValue && intValue !== floatValue) {
                        html += '<i class="fa fa-star-half-empty"></i>\n';
                    } else {
                        html += '<i class="fa fa-star"></i>\n';
                    }
                }
                return html;
            };
            var makeEmtry = function(intValue, floatValue) {
                var html = "";
                for (let index = floatValue; index < 5; index++) {
                    html += '<i class="fa fa-star-o"></i>\n';
                }
                return html;
            };

            var html = makeFull(intValue, floatValue);
            html += makeEmtry(intValue, floatValue);

            $(this).html(html);
        });

        if ($("#search-input").length > 0) {
            SimpleJekyllSearch({
                searchInput: document.getElementById("search-input"),
                resultsContainer: document.getElementById("results-container"),
                json: "/search.json",
                searchResultTemplate: '<li class="search-list"><a href="{{ site.url }}{url}">{title}</a></li>',
            });
        }
    });
})(jQuery);