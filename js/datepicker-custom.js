jQuery(function () {
    $(document).ready(function () {
        var owl = $('.owl-carousel');

        /*
        * Weekdays In Arabic
        */
        if ($(".page-container").hasClass("ar")) {
            $.fn.datepicker.dates['ar'] = {
                days: ["الأحد", "الأثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"],
                daysShort: ["الأحد", "الأثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"],
                daysMin: ["الأحد", "الأثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"],
                months: ["يناير", "فبراير", "مارس", "أبريل ", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
                monthsShort: ["يناير", "فبراير", "مارس", "أبريل ", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
                today: "Today",
                clear: "Clear",
                format: "mm/dd/yyyy",
                titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
                weekStart: 6
            };
        }


        /* 
        *Call Datepicker for inputs
        */
        $('.form-datepicker input').datepicker({
            language: "ar",
            autoclose: true,
        });

        /*inline Datepicker like homepage*/
        $('.datepicker-div div').datepicker({
            forceParse: false,
            todayHighlight: true,
            language: "ar",
            format: "MM",
            multidate: true,
            updateViewDate: false,
            beforeShowDay: function (date) {
                var hilightedDays = [1];
                if (~hilightedDays.indexOf(date.getDate())) {
                    return {
                        classes: 'highlight',
                        tooltip: '3',
                    }
                }
            }
        });

        // Datepicker Popup
        $('.datepicker-div-desktop .datepicker.datepicker-inline .datepicker-days .table-condensed tbody').on('click', 'tr > .day', function (e) { //Default mouse Position 
            if ($(this).hasClass("highlight")) {
                var getPositionLeft = e.pageX;
                var getPositionTop = e.pageY;
                $(".datepicker-card-popup-desktop .datepicker-card-popup").addClass("active");
                if ($(".page-container").hasClass("ar")) {
                    $(".datepicker-card-popup-desktop .datepicker-card-popup").css("left", (getPositionLeft - 20) + "px");
                }
                else if ($(".page-container").hasClass("en")) {
                    $(".datepicker-card-popup-desktop .datepicker-card-popup").css("left", (getPositionLeft - 280) + "px");
                }
                $(".datepicker-card-popup-desktop .datepicker-card-popup").css("top", (getPositionTop + 20) + "px");
                owl.trigger('refresh.owl.carousel');
                $(".datepicker-card-popup-shadow").show();
                $(".datepicker-card-popup-desktop .datepicker-card-popup-step1").removeClass("hide");
            }
        });

        $(".datepicker-card-popup-shadow").click("on", function () {
            $(".datepicker-card-popup").removeClass("active");
            $(this).hide();
        });

        // Datepicker popup in responsive
        $('.datepicker-div-responsive .datepicker.datepicker-inline .datepicker-days .table-condensed tbody').on('click', 'tr > .day', function (e) { //Default mouse Position 
            if ($(this).hasClass("highlight")) {
                $(".carousel-original.datepicker-card-popup-step1").trigger('refresh.owl.carousel');
                $(".datepicker-card-popup-responsive .datepicker-card-popup").addClass("active");
                //$(".datepicker-card-popup-responsive .datepicker-card-popup-step1").removeClass("hide");
                $(".datepicker-card-popup-responsive .datepicker-card-popup-no-data").hide();
            }
            else {
                $(".datepicker-card-popup-responsive .datepicker-card-popup").removeClass("active");
                $(".datepicker-card-popup-responsive .datepicker-card-popup-no-data").show();
            }

        });

        $('.datepicker-div-responsive .datepicker.datepicker-inline .datepicker-days .table-condensed thead').click(function (e) { //Default mouse Position 
            $(".datepicker-card-popup-responsive .datepicker-card-popup").removeClass("active");
            $(".datepicker-card-popup-responsive .datepicker-card-popup-no-data").show();
        });

        if ($("#datepickerCard").length) {
            var myModalEl = document.getElementById('datepickerCard')
            myModalEl.addEventListener('hide.bs.modal', function (event) {
                $(".datepicker-card-popup-responsive .datepicker-card-popup").removeClass("active");
                $(".datepicker-card-popup-responsive .datepicker-card-popup-no-data").show();
            })
        }

        /*
        *Datepicker EVents Popup
        */
        if ($(".datepicker-card-popup").length) {
            $(".datepicker-card-popup-add").on("click", function () {
                $(".datepicker-card-popup-step1").addClass("hide");
            });
        }

        $(window).scroll(function () {
            /*
            *CLose Datepicker popup when scroll
            */
            $(".datepicker-card-popup-desktop .datepicker-card-popup").removeClass("active");
            $(".datepicker-card-popup-desktop .datepicker-card-popup-step1").removeClass("hide");
            $(".datepicker-card-popup-shadow").hide();
        });
    });
});