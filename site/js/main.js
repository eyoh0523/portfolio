(function ($) {
    'use strict';

    $(function () {
        var $window = $(window),
            $html = $('html'),
            $body = $('body'),
            $footer = $('footer');


        /*project*/
        var $project = $body.find('.project_box'),
            $projectList = $project.find('.project_list'),
            $projectPrev = $project.find('.project_prev'),
            $projectNext = $project.find('.project_next'),
            $projectProgressbar = $project.find('.project_progressbar span');

        const settings = {
            autoplay: false,
            swipe: true,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            variableWidth: true,
            prevArrow: $projectPrev,
            nextArrow: $projectNext,
        };
        $projectList.slick(settings);

        $(document).ready(function () {
            if ($window.width() > 1000) {
                $projectList.slick('unslick');
            }
        });


        $window.on('resize', function () {
            if ($window.width() > 1000) {
                if ($projectList.hasClass('slick-initialized'))
                    $projectList.slick('unslick');
                return
            }
            if (!$projectList.hasClass('slick-initialized'))
                return $projectList.slick(settings);
        });


        /* progressbar */
        function progress() {
            var percent = Math.floor(($('.project_list .slick-active').length / $('.project_list .slick-slide').length) * 100);
            $projectProgressbar.css('width', percent + '%').text(percent + '퍼센트');
        }

     /*   setTimeout(progress, 100);
        $projectList.slick(settings);*/


        $projectList.on('beforeChange', function (event, slick, current, next) {
            var percent = Math.floor((slick.options.slidesToShow + next) * (100 / slick.slideCount));
            $projectProgressbar.css('width', percent + '%').text(percent + '퍼센트');
            $(this)[$(this).hasClass('active') ? 'removeClass' : 'addClass']('active');
        });



        /* 상단으로 */
        var $wrapper = $('#wrapper'),
            $upButton = $footer.find('.up_button');

        $upButton.click(function () {
            $('html, body').animate({scrollTop: 0}, 400);
            return false;
        });

        $window.scroll(function () {
            var scrollTop = $window.scrollTop(),
                scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

            if (scrollTop > 1) {
                $upButton.addClass('active');
            } else {
                $upButton.removeClass('active');
            }
            if (scrollBottom < 1) {
                $upButton.addClass('bottom');
            } else {
                $upButton.removeClass('bottom');
            }
        });

    });

})(window.jQuery);
