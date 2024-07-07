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

        // Ensure the active item is centered on initialization
        centerActiveItem();

        // Move next carousel
        $('.moveNextCarousel').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.carousel').carousel('next');
            setTimeout(centerActiveItem, 500); // Allow time for carousel to slide
        });

        // Move prev carousel
        $('.movePrevCarousel').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.carousel').carousel('prev');
            setTimeout(centerActiveItem, 500); // Allow time for carousel to slide
        });

        // Ensure the active item is centered on window resize
        $(window).resize(function() {
            centerActiveItem();
        });

        // Center the active item
        function centerActiveItem() {
            var $activeItem = $('.carousel .carousel-item.active');
            if ($activeItem.length) {
                var carouselWidth = $('.carousel.carousel-slider').width();
                var itemWidth = $activeItem.width();
                var offset = (carouselWidth - itemWidth) / 2;
                $activeItem.css('transform', 'translateX(' + offset + 'px)');
            }
        }

        function centerActiveItem() {
            var $activeItem = $('.carousel .carousel-item.active');
            if ($activeItem.length) {
                var carouselWidth = $('.carousel.carousel-slider').width();
                var itemWidth = $activeItem.width();
                var horizontalPadding = 20; // Horizontal padding
                var offset = (carouselWidth - itemWidth - 2 * horizontalPadding) / 2;
                $activeItem.css('transform', 'translateX(' + offset + 'px)');
                $activeItem.css('padding-left', horizontalPadding + 'px');
                $activeItem.css('padding-right', horizontalPadding + 'px');
            }
        }

        // -----------------------  Carousel Arrows - End -------------------------

        // Skills counter
        $("#skills-counter [data-star]").each(function(e) {
            var intValue = parseInt($(this).attr("data-star"));
            var floatValue = parseFloat($(this).attr("data-star"));

            // Make full with half star
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
            var makeEmpty = function(intValue, floatValue) {
                var html = "";
                for (let index = floatValue; index < 5; index++) {
                    html += '<i class="fa fa-star-o"></i>\n';
                }
                return html;
            };

            var html = makeFull(intValue, floatValue);
            html += makeEmpty(intValue, floatValue);

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
