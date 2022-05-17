  
jQuery(function () {

    $(document).ready(function () {     
        /*Init WoW*/
        wow = new WOW(
            {
                boxClass: 'wow',      // default
                animateClass: 'animate__animated', // default
                offset: 50,          // default
                mobile: true,       // default
                live: true        // default
            }
        )
        wow.init();

        // Add Class active to selected lang
        $(".responsive-menu-item.lang .lang-button").on("click", function () {
            $(".responsive-menu-item.lang .lang-button").removeClass("active");
            $(this).addClass("active");
        });
       
        $(".who-ur-item").on("click", function () {
            $(".who-ur-item").removeClass("active");
            $(this).addClass("active");
        });
    //scrollbar in faq
    setTimeout(() => {
        $('.faq-list-scroll').eq(0).height($('#v-pills-tabContent').height())
    }, 50)

    $('.faq-list-scroll .nav-link').on('shown.bs.tab', function () {
        $('.faq-list-scroll').eq(0).height($('#v-pills-tabContent').height())
    });

    $(".accordion").each(function (i, val) {
        //when accrodion open
        $(val).on('shown.bs.collapse', function (e) {
            $('.faq-list-scroll').eq(0).height($('#v-pills-tabContent').height())
        });
        //when accrodion closed
        $(val).on('hidden.bs.collapse', function (e) {
            $('.faq-list-scroll').eq(0).height($('#v-pills-tabContent').height())
        });

    });
    
    
        // Add Class active to info-page 
        $(".info-page .nav-link").on("click", function () {
            $(".info-page .nav-link").removeClass("active");
            $(this).addClass("active");
        });

    /*countdown timer*/
    var countDownDate = new Date("apr 28, 2022 15:37:25").getTime(); //change time

    var counter = function () {
        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        $(".countdown").each(function (key, value) {
            $(value).find(".day .numbers").text(days);
            $(value).find(".hours .numbers").text(hours);
            $(value).find(".mintues .numbers").text(minutes);
            $(value).find(".seconds .numbers").text(seconds);
        });
    };
    counter();
    var x = setInterval(function () {
        counter();
    }, 1000);
    window.onbeforeunload = function () {
        $("html,body").scrollTop(0);
    };

        //$(this).scrollTop(0); 
        /* dashboard responsive */
        if ($(".dashboard .status-qa-list-right").length) {
            $(".dashboard .status-qa-list-right .nav-link").on("click", function () {
                $(".dashboard .status-qa-list-right .nav-link.active").parents(".dashboard .status-qa-list-right").addClass("active");
                $(".question-back").addClass("active");

            });
        }
        $(".question-back").on('click', function () {
            $(".status-qa-list-right .nav-link.active").parents(".status-qa-list-right").removeClass("active");
            $(this).removeClass("active");
        });
        if ($(".info-page .information-right").length) {
            $(".info-page .information-right .nav-link").on("click", function () {
                $(".info-page .information-right .nav-link.active").parents(".info-page .information-right").addClass("active");
                $(".question-back").addClass("active");

            });
        }
        $(".question-back").on('click', function () {
            $(".information-right .nav-link.active").parents(".information-right").removeClass("active");
            $(this).removeClass("active");
        });

        /*custom button for Share Component*/
        $(".share-btn").click(function (e) {
            $('.networks').not($(this).next(".networks")).each(function () {
                $(this).removeClass("active");
            });

            $(this).next(".networks").toggleClass("active");
        });

        var moreTextToggle = false;
        var owlNavPosition;
        /* Page Loader */
        setTimeout(function () {
            
            $(".page").show();
            $(".loader-container").hide();
            $(".owl-carousel").trigger('refresh.owl.carousel');
           
            $("form").attr('autocomplete', 'off');
         
            function isScrolledIntoView($elem) {
                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + $(window).height();
                var elemTop = $elem.offset().top;
                var elemBottom = elemTop + $elem.height();
                return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
            }

            /* Count numbers animation */
            function count($this) {
                var current = parseInt($this.html(), 10);
                if (isScrolledIntoView($this) && !$this.data("isCounting") && current < $this.data('count')) {
                    $this.html(++current);
                    $this.data("isCounting", true);
                    setTimeout(function () {
                        $this.data("isCounting", false);
                        count($this);
                    }, 1);
                }
            }

            $(".animated-count").each(function () {
                $(this).data('count', parseInt($(this).html(), 10));
                $(this).html('0');
                $(this).data("isCounting", false);
            });

            function startCount() {
                $(".animated-count").each(function () {
                    count($(this));
                });
            };

            $(window).scroll(function () {
                startCount();
            });

            startCount();

            //quick count 
            function countfast($this) {
                var current = parseInt($this.html(), 11);
                if (isScrolledIntoView($this) && !$this.data("isCounting") && current < $this.data('countfast')) {
                    $this.html(++current);
                    $this.data("isCounting", true);
                    setTimeout(function () {
                        $this.data("isCounting", false);
                        countfast($this);
                    }, 1);
                }
            }
            $(".animated-count-fast").each(function () {
                $(this).data('countfast', parseInt($(this).html(), 10));
                $(this).html('0');
                $(this).data("isCounting", false);
            });

            function startCountfast() {
                $(".animated-count-fast").each(function () {
                    countfast($(this));
                });
            };

            $(window).scroll(function () {
                startCountfast();
            });

            startCountfast();


        }, 0);
        

        $('.nav-link[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            e.target // newly activated tab
            e.relatedTarget // previous active tab
            $(".owl-carousel").trigger('refresh.owl.carousel');
        });

       

        /* Program Details Chart */
        myData = {
            '2016': 0,
            '2017': 48,
            '2018': 75,
            '2019': 60,
            '2020': 48,
            '2021': 0
        }
        drawBarChart(myData, {
            height: '380px',
            barColor: '#333',
            showTicks: true
        }, $("#my-bar-chart"));

        /*
         *Get height of window
         **/
        if ($(".authentication").length) { 
            var x = window.innerHeight;
            $(".authentication .page-content").css("height", (x - 75) + "px");
        }

        

        /* select all checkbox */
        $('#select_all').click(function () {
            var c = this.checked;
            $(':checkbox').prop('checked', c);   
        });
        /* inputs only numbers*/
        document.querySelectorAll('input[numbers-only]').forEach(function (input) {
            input.addEventListener('input', function () {
                input.value = input.value.replace(/[^.\d]+/g, '').replace(/^([^.]*\.)|\./g, '$1');
            });
        });
        /*Bebras Timeline*/
        if ($(".competation-steps-items").length) {
            $(".competation-steps-item.active").last().addClass("last-active");
            $(".steps-next").on('click', function () {
                $(".competation-steps-item.last-active").last().removeClass("last-active").next().addClass("last-active");
            });
            $(".steps-prev").on('click', function () {
                if ($(".competation-steps-item.last-active").last().prev().length) {
                    $(".competation-steps-item.last-active").last().removeClass("last-active").prev().addClass("last-active");

                }
            });
        }

        // Last Active in Steps
        if ($(".steps-container").length) {
            $(".steps-step.active").last().addClass("last-active");
            $(".steps-next").on('click', function () {
                $(".steps-step.last-active").last().removeClass("last-active").next().addClass("last-active");
            });
            $(".steps-prev").on('click', function () {
                if ($(".steps-step.last-active").last().prev().length) {
                    $(".steps-step.last-active").last().removeClass("last-active").prev().addClass("last-active");

                }
            });
        }
        /* card notification hide*/
        $(".dashboard-student .popup-card-notification .dashboard-table-content").on('click', function () {
            $(".popup-card-notification").hide();
        });

       /* dashboard questions responsive*/
        if ($(".dashboard .status-qa-list-right").length) {
            $(".dashboard .status-qa-list-right .nav-link").on("click", function () {
                $(".dashboard .status-qa-list-right .nav-link.active").parents(" .status-qa-list-right").addClass("active");
                $(".question-back").addClass("active");

            });
        }
        $(".question-back").on('click', function () {
            $(".status-qa-list-right .nav-link.active").parents(".status-qa-list-right").removeClass("active");
            $(this).removeClass("active");
        });

        $("#button-knowMe").on('click', function () {
            $("#button-knowMe").hide();
            $("#button-knowYou").css({"display":"block" });
        });

        /*
         *Hide Backdrop
         */
        if ($(".body-backdrop").length) {
            $(".body-backdrop").click(function () {
                $(".chat-popup").hide();
                $(".chat-container").hide();
                $(".body-backdrop").addClass("hide");
                $(".header-navbar-links").removeClass("responsive-menu-active");

                //$(".header-navbar-dropdown").hide();

                $(".mega-menu").removeClass("active");
                $(".mega-menu").addClass("hidden");
                $("body").removeClass("mega-menu-active");

                setTimeout(function () {
                    $(".body-backdrop").removeClass("show");
                }, 100);

            });
        }

        /*
         *Mega Menu
         */
        if ($(".who-ur-items").length) {
            $(".who-ur-item").on("click", function () {
                $(this).parents(".who-ur").addClass("active"); 
            });
            $(".who-ur-details-close").on("click", function () {
                $(".who-ur").removeClass("active"); 
            });
        }
        if ($(".mega-menu").length){
            $(".mega-menu-link-dropdown").on("click", function () {
                $(".mega-menu-link").removeClass("active");
                $(".mega-menu-submenu").removeClass("active");
                var getTarget = $(this).attr("data-target");
                $(getTarget).addClass("active");
                $(".mega-menu-list").addClass("mega-menu-center-active");
                $(this).addClass("active");
            });
            $(".mega-menu-submenu-details-link").on("click", function () {
                $(".mega-menu-submenu-link").removeClass("active");
                $(".mega-menu-submenu-details").removeClass("active");
                var getDegtailsTarget = $(this).attr("data-target");
                $(getDegtailsTarget).addClass("active");
                $(".mega-menu-list").addClass("mega-menu-left-active");
                $(this).addClass("active");
            });
            $(".mega-menu-center-back").on("click", function () {
                $(".mega-menu-link").removeClass("active");
                $(".mega-menu-list").removeClass("mega-menu-center-active");
            });
            $(".mega-menu-left-back").on("click", function () {
                $(".mega-menu-submenu-link").removeClass("active");
                $(".mega-menu-list").removeClass("mega-menu-left-active");
            });
            $(".who-ur-open").on("click", function () {
                $(".mega-menu-list").addClass("mega-menu-who-ur-active");
            });
            $(".mega-menu-submenus-details-back").on("click", function () {
                $(".mega-menu-list").removeClass("mega-menu-left-active");
            });
            $(".who-ur-close").on("click", function () {
                $(".mega-menu-list").removeClass("mega-menu-who-ur-active");
            });
        }
        
        /*
         *custom Select
         */
        if ($(".custom-select").length) {
            $(".custom-select-title").on('click', function () {
                $(this).parents(".custom-select-item").toggleClass("active");
            });
        }


        /*
         * Form  Steps
         */
        if ($(".form-next").length) {
            $(".form-next").on('click', function () {
                $(this).parents(".form-step").hide().removeClass("active");
                $(this).parents(".form-step").next().show().addClass("active");
            });
        }
        if ($(".form-prev").length) {
            $(".form-prev").on('click', function () {
                $(this).parents(".form-step").hide().removeClass("active");
                $(this).parents(".form-step").prev().show().addClass("active");
            });
        }

        /*
         *CHat
         */
        $(".chat-popup-open").on("click", function () {
            $(".chat-popup").show();
            $(".body-backdrop").addClass("show").removeClass("hide");

        });
        $(".end-chat").on('click', function () {
            $(".chat-container").hide();
            $(".chat-popup").hide();
            $(".body-backdrop").removeClass("show").addClass("hide");
        });
        $(".start-chat").on('click', function () {
            $(".chat-box").show();
            $(".chat-container").show();
            $(".chat-popup").hide();
        });
        /* 
         *CHat bot Animation
         */ 
        function removeChatbotAnimation() {
            setTimeout(function () {
                $(".chat-icon").removeClass("animate__tada");
            }, 2000);
        }
        function addChatbotAnimation() {
            $(".chat-icon").addClass("animate__tada");
            removeChatbotAnimation();
        }
        addChatbotAnimation();
        setInterval(addChatbotAnimation, 5000); // repeat animation  every 5 mintues

      
        /*
         * show Selected Item in dropdown
         */
        $(".dropdown-menu .dropdown-item").click(function () {
            var getText = $(this).text();
            $(this).parents(".dropdown").find('.dropdown-toggle').text(getText);
        });

        /*
         *Open & Close Responsive Menu
         */
        $(".responsive-menu-open").on('click', function () {
            $(".header-navbar-links").addClass("responsive-menu-active");
            $(".body-backdrop").removeClass("hide").addClass("show");
        });
        $(".responsive-menu-close").on('click', function () {
            $(".header-navbar-links").removeClass("responsive-menu-active");
            $(".body-backdrop").removeClass("show").addClass("hide");
        });
        /*
         * Open Mega Menu  
        */
        $(".mega-menu-open").on("click", function () {
            $(".body-backdrop").removeClass("hide");
            $(".mega-menu").addClass("active");
            $(".mega-menu").removeClass("hidden");
            $(".body-backdrop").addClass("show");
            $("body").addClass("mega-menu-active");
        });

        /*
        * Close Mega Menu  
        */
        $(".mega-menu-close").on("click", function () {
            $(".mega-menu").removeClass("active");
            $(".mega-menu").addClass("hidden");
            $(".body-backdrop").removeClass("show").addClass("hide");
            $("body").removeClass("mega-menu-active");
            $("#megaMenuList").removeAttr("class").addClass("mega-menu-list");

        });
        /*In case of English */
        if ($(".page-container").hasClass("en")) {
            $('head').append('<link rel="stylesheet" type="text/css" href="../css/main-en.css">');
            $('html').attr("dir", "ltr");
        }
            /*In case of AR */
        else if($(".page-container").hasClass("ar")) {
                $('html').attr("dir", "rtl");
            }

        /*Change lang property accordiong to language */
        var langFlag = true;
        if ($(".page-container").hasClass("ar")) {
            langFlag = true;
        }
        else if ($(".page-container").hasClass("en")) {
            langFlag = false;
        }
        /*
         * Owl Carousel
         */
        if ($(".owl-carousel").length) {
            /*Mawhiba Banner*/
            $(".mawhiba-home-section1.home-banner .owl-carousel").owlCarousel({
                autoplay: true,
                loop: true,
                rtl: langFlag,
                nav: false,
                dots: true,
                autoplayTimeout: 100000,
                items: 1,
                responsive: {
                    0: {
                        items: 1,
                        animateOut: 'animate__fadeIn',
                        animateIn: 'animate__fadeIn',
                        touchDrag: true,
                        mouseDrag: true,
                    },
                    600: {
                        items: 1,
                        animateOut: 'animate__fadeOutUp',
                        animateIn: 'animate__fadeInUp',
                        touchDrag: true,
                        mouseDrag: true,
                    },
                    1000: {
                        items: 1,
                        animateOut: 'animate__fadeOutUp',
                        animateIn: 'animate__fadeInUp',
                        touchDrag: true,
                        mouseDrag: true,
                    }
                }
               
            });
            $(".carousel-original .owl-carousel").owlCarousel({
                loop: false,
                rtl: langFlag,
                nav: false,
                dots: true,
                items: 1
            });

            /*Thumb Owl Carousel in albums*/
            $('.owl-carousel-thumb .owl-carousel').owlCarousel({
                thumbs: true,
                thumbsPrerendered: true,
                items: 1,
                rtl: langFlag,
                nav: true,
                dots: false
            });

            /*
            * Dashboard Carousel 
            */
            $(".dashboard-carousel .owl-carousel").owlCarousel({
                margin: 30,
                loop: false,
                rtl: langFlag,
                nav: true,
                dots: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                }
            });
            
            $('.carousel-cards-container.events-section .owl-carousel').owlCarousel({
                margin: 30,
                loop: false,
                items: 3,
                rtl: langFlag,
                nav: true,
                autoHeight: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1,
                        nav: false,
                        autoWidth: true
                    },
                    600: {
                        items: 1,
                        nav: false,
                        autoWidth: true
                    },
                    1000: {
                        items: 3,
                        nav: true,
                    }
                }
            });
           
            $('.carousel-numberic-list .owl-carousel').owlCarousel({
                margin: 50,
                loop: false,
                rtl: langFlag,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                }
            });
            $('.carousel-article .owl-carousel').owlCarousel({
                margin: 10,
                loop: false,
                rtl: langFlag,
                nav: true,
                items: 3,
                dots: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    800: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                }
            });
           /*events details carousel*/
            $('.events-details-content .section-events .owl-carousel').owlCarousel({
                items: 1,
                margin: 0,
                singleItem: true,
                autoplay: true,
                loop: true,
                autoplayTimeout: 5000,
                rtl: langFlag,
                itemsScaleUp: true,
                
                stopOnHover: true

            });

            $('.carousel-images .owl-carousel').owlCarousel({
                margin: 30,
                loop: false,
                autoWidth: true,
                items: 2,
                rtl: langFlag, 
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 2,
                        nav: false
                    },
                    600: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 2,
                        nav: true,
                    }
                }
            });
            
            $('.carousel-grid .owl-carousel').owlCarousel({
                margin: 30,
                loop: false,
                autoWidth: true,
                items: 2,
                rtl: langFlag, 
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 2,
                        nav: false
                    },
                    600: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 2,
                        nav: true,
                    }
                },
            });
          
            $('.carousel-videos .owl-carousel').owlCarousel({
                margin: 30,
                loop: false,
                autoWidth: true,
                items: 1,
                rtl: langFlag,
                nav: true,
                dots: false
                
            });
            $('.carousel-events .owl-carousel').owlCarousel({
                margin: 30,
                loop: false,
                rtl: langFlag,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    600: {
                        items: 1,
                        nav: false
                    },
                    1000: {
                        items: 3,
                        nav: true,
                    }
                }


            });
            $('.carousel-events-member .owl-carousel').owlCarousel({
                margin: 30,
                loop: false,
                rtl: langFlag,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    600: {
                        items: 1,
                        nav: false
                    },
                    1000: {
                        items: 2,
                        nav: true,
                    }
                }


            });
            $('.dashboard-overiew-carousel .owl-carousel').owlCarousel({
                margin: 30,
                loop: false,
                rtl: langFlag,
                nav: true,
                dots: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                }


            });
            $('.carousel-cards-container .owl-carousel').owlCarousel({
                margin: 30,
                loop: false,
                autoWidth: true,
                items: 1,
                rtl: langFlag,
                nav: true,
                autoHeight: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    600: {
                        items: 1,
                        nav: false
                    },
                    1000: {
                        items: 1,
                        nav: true,
                    }
                }
            });
            
            $(".carousel-bar .owl-carousel").owlCarousel({
                margin: 10,
                nav: true,
                loop: false,
                rtl: langFlag,
                items: 8,
                dots: false,
                responsive: {
                    0: {
                        items: 2,
                        nav: false,
                    },
                    400: {
                        items: 3,
                        nav: false,
                    },
                    
                    800: {
                        items: 4,
                        nav: true,
                    },
                    1000: {
                        items:5,
                        nav: true,
                    },
                    1100: {
                        items: 8,
                        nav: true,
                    },
                },
            });

            $('.owl-carousel').on('changed.owl.carousel', function (e) {

                var items = e.item.count;     // Number of items
                var item = e.item.index;     // Position of the current item
                var size = e.page.size;      // Number of items per page

                if (item === 0) {
                   $("")
                }

                if ((items - item) === size) {
                    // Last
                }
            });

           

            /*
             *Add class Current to active slide
             */
            var owl = $('.owl-carousel');
            owl.on('translate.owl.carousel', function (e) {
                idx = e.item.index;
                $('.owl-item.current').removeClass('current');
                $('.owl-item').eq(idx).addClass('current');

            });
            $('.owl-carousel').on('refresh.owl.carousel', function () {
                $(".carousel-grid-brief").each(function () {
                    var getParent = $(this).parents(".carousel-grid").attr("id");
                    getHeight = $("#" + getParent).find(".carousel-grid-brief").height();
                    $("#" + getParent).find(".owl-nav").css("top", (getHeight + 60) + "px");
                });
                $(".carousel-fullcontent .owl-stage-outer").each(function () {
                    $(this).css("width", $(this).find($(".owl-stage")).width() + "px");
                });
            });

           
           
         
            /*owl-thumb-item Clik*/
            $(".owl-thumb-item .item").on("click", function () {
                $(".owl-carousel-thumb").addClass("active");
                $(".owl-thumbs-container").addClass("hide");
                $('html, body').animate({
                    scrollTop: $(".page-title")[0].offsetTop  //#DIV_ID is an example. Use the id of your destination on the page
                }, 'fast');
            });

            $(".close-owl-thumbs-container").on("click", function () {
                $(".owl-carousel-thumb").removeClass("active");
                $(".owl-thumbs-container").removeClass("hide");
                $('.owl-item.active .youtube-iframe').each(function (index) {
                    $(this).attr('src', $(this).attr('src'));
                    return false;
                });
            });
                       
            //counter
            var countDownDate = new Date("Jan 31, 2022 15:37:25").getTime();
            var x = setInterval(function () {

                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                $('.countdown .days').innerHTML = days
                $('.countdown .hours').innerHTML = hours
                $('.countdown .minutes').innerHTML = minutes
               
            }, 1000);
           

            $(".search-carousel .owl-carousel").owlCarousel({
                margin: 50,
                loop: false,
                rtl: langFlag,
                nav: true,
                dots: true,
                items: 1
            });
            $('.numbers .owl-carousel').owlCarousel({
                items: 4,
                margin: 0,
                loop: false,
                rtl: langFlag,
                nav: true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 4000,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    850: {
                        items: 3
                    },
                    1000: {
                        items: 4
                    }
                }

            });

        } 
  
       

       
        /*
         *Quick  Search
         */
        $(".search-open").on('click', function () {
            $(".search-container").show();
            $("body").addClass("overflow-hidden");
            $(".search-header .search-input input").focus();
        });
        $(document).keyup(function (e) {
            if (e.key === "Escape") { // escape key maps to keycode `27`
                $(".search-container").hide();
                $("body").removeClass("overflow-hidden");
            }
        });
        $(".search-container-backdrop").on("click", function () {
            $(".search-container").hide();
            $("body").removeClass("overflow-hidden");
        });
        $(".search-header-close").on("click", function () {
            $(".search-container").hide();
            $("body").removeClass("overflow-hidden");
        });

        


        /*Scroll To Top*/
        $('.scrolltop').click(function () {
            $("html,body").scrollTop(0);
        });



        /*
         * Play video icon
         */
        $('.video-play').click(function () {
            if ($(this).prev().get(0).paused) {
                $(this).parents(".video-container").addClass("active");
                $(this).prev().get(0).play();
            }
        });

        /*
         *Play Video Youtube in case of click on image
         */
        $('.youtube-image').each(function (index) {
            $(this).click(function (e) {
                e.preventDefault();
                $(this).next(".youtube-container").html("");
                $(this).parents(".video-container").addClass("active");
                var URL = $(this).attr('href');
                var htm = '<iframe  src="http://www.youtube.com/embed/' + URL + '?rel=0" frameborder="0" allowfullscreen ></iframe>';
                $(this).next(".youtube-container").html(htm);

                return false;
            });
        });
    /*
     *Play Video Youtube in case of click on play icon
     */
        $('.video-play').each(function (index) {
            $(this).click(function (e) {
                e.preventDefault();
                $(this).prev(".youtube-container").html("");
                $(this).parents(".video-container").addClass("active");
                var URL = $(this).parents(".video-container").find(".youtube-image").attr('href');
                var htm = '<iframe  src="http://www.youtube.com/embed/' + URL + '?rel=0" frameborder="0" allowfullscreen ></iframe>';
                $(this).prev(".youtube-container").html(htm);

                return false;
            });
        });
        

        /*
         * Mouse Hover Menu
         */
        $('.header-navbar-dropdown-link-container').on("mouseenter", function () {
            if (!$(".header-navbar-links").hasClass("responsive-menu-active")) {
                $(this).find(".header-navbar-dropdown").removeClass("hide").addClass("show");
                $(".body-backdrop").removeClass("hide").addClass("show");
            }
           
        }).on("mouseleave", function () {
            if (!$(".header-navbar-links").hasClass("responsive-menu-active")) {
                $(".header-navbar-dropdown").removeClass("show").addClass("hide");
                $(".body-backdrop").removeClass("show").addClass("hide");
            }
        });
        $(".header-navbar-dropdown").on("mouseenter", function () {
            $(this).addClass("show");
        });
        $('.header-navbar-dropdown-link').on("click", function () {
            $(this).next(".header-navbar-dropdown").addClass("active");
        });
        $('.header-navbar-dropdown-close').on("click", function () {
            $(".header-navbar-dropdown").removeClass("active");
        });
      
        /*
         * Get Value from form upload
         */
       if( $("#idImagefileInput").length ){
            document.getElementById('idImagefileInput').onchange = function () {
                $(this).parents().find(".form-upload-value").text(this.value).show();
            }
        }
        /*
        open image infoGraph in modal
        */
        $('#openImage').on('show.bs.modal', function (event) {
            document.getElementById("imageModal").src = $(event.relatedTarget).attr('data-url');

        });
        $(".num-page").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
          });
        
        /*
         *Filter options in dashboard page
         */
        if ($(".filter-button").length) {
            $(".filter-button").on('click', function () {
                $(".filter-options").toggleClass("active");
            });
        }
        /*Copy Rights Year*/
        if ($(".footer").length) {
            document.getElementById("current-year").innerHTML = new Date().getFullYear();
        }
        /*drag and drop*/
        if ($("#sortable").length) {
            var LeftMenu = document.getElementById('menu-left');
            var RigtMenu = document.getElementById('menu-right');
            new Sortable(LeftMenu, {
                group: {
                    name: 'shared'

                },
                animation: 150
            });
            new Sortable(RigtMenu, {
                group: {
                    name: 'shared'
                },
                animation: 150
            });
        }
    
    /*count down characters in textarea*/
    var maxLength = 500;
    $('textarea').keyup(function () {
        var length = $(this).val().length;
        var length = maxLength - length;
        $('#characterLength').text(length);
    });

    /*
     * Make tr clickable
     */
    $(".clickable-row").click(function () {
        window.location = $(this).data("href");
    });

        /*
   *Status Card Menu
   */
        if ($(".status-qa-a-card-more").length) {
            $(".status-qa-a-card-more .more-link").on('click', function () {
                $(this).parent().addClass("active");
            });
        }

        /*
         *Notification more dropdown 
        */
        $(".notifications-container").on('click', function () {
            $(".notifications-container").addClass("active");
        });
        $(".notifications-menu .more-options-link").on('click', function () {
            $(".notifications-menu .more-options-menu").hide();
            $(this).next(".notifications-menu .more-options-menu").show();
        });


        /*countup fast*/
        if ($(".counterNumbers").length) {
            "use strict";
            var counterUp = window.counterUp["default"]; // import counterUp from "counterup2"

            var $counters = $(".counterNumbers");
            /* Start counting, do this on DOM ready or with Waypoints. */
            $counters.each(function (ignore, counter) {
                var waypoint = new Waypoint({
                    element: $(this),
                    handler: function () {
                        counterUp(counter, {
                            duration: 5000,
                            delay: 16
                        });
                        this.destroy();
                    },
                    offset: 'bottom-in-view',
                });
            });
        }


        /*
     *When Focus on body
     */
        $(document).on('click', function (event) {
            if (!$(event.target).closest(".status-qa-a-card-more").length) {
                $(".status-qa-a-card-more").removeClass("active");
            }
            if (!$(event.target).closest(".notifications-container").length) {
                $(".notifications-container").removeClass("active");
            }
            if (!$(event.target).closest(".more-options").length) {
                $(".more-options-menu").hide();
            }
            // close social share icons
            if (!$(event.target).closest(".social-share-links").length) {
                $(".social-share-links .social.networks").removeClass("active");
            }

            if (!$(event.target).closest(".dashboard-menu-responsive-link").length && !$(event.target).closest(".dashboard-menu-container").length) {
                $(".dashboard-menu-container").removeClass("active");
            }

        });

        /*
    * More Options
    */
        $(".more-options-link").on('click', function () {
            $(".more-options-menu").hide();
            $(this).parent(".more-options").children(".more-options-menu").show();
        });

        /* 
         * Program details / programs library / show all brief
         */
        $(".showAllBrief").on("click", function () {
            $(this).parents(".card-program").addClass("active");

        });
        $(".iconBackImage").on("click", function () {
            $(this).parents(".card-program").removeClass("active");
        });

        /*
     * Accordion
     */
        if ($(".accordion-button").length) {
            $(".accordion-button").on("click", function () {
                //$(".accordion-item").removeClass("active");
                $(".accordion-button").parents(".accordion-item").addClass("active");
                $(".accordion-button.collapsed").parents(".accordion-item").removeClass("active");
            });
        }


        $(function () {
            "use strict";
            $(".choose li").click(function () {
                $(".choose li").removeClass("active");
                $(this).addClass("active");
            });
            // Move Items On Click
            $(".adding").click(function () {
                if ($(this).data("value") === "add") {
                    $(".left .active").clone(true, true).appendTo(".right .choose");
                    $(".left .active").remove();
                } else {
                    $(".left li").clone(true, true).appendTo(".right .choose");
                    $(".left li").remove();
                }
            });
            $(".removing").click(function () {
                if ($(this).data("value") === "remove") {
                    $(".right .active").clone(true, true).appendTo(".left .choose");
                    $(".right .active").remove();
                } else {
                    $(".right li").clone(true, true).appendTo(".left .choose");
                    $(".right li").remove();
                }
            });
        });


        function autocomplete(inp, arr) {
            /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
            var currentFocus;
            if ($(".autocomplete").length) {
                /*execute a function when someone writes in the text field:*/
                inp.addEventListener("input", function (e) {
                    var a,
                        b,
                        i,
                        val = this.value;
                    /*close any already open lists of autocompleted values*/
                    closeAllLists();
                    if (!val) {
                        return false;
                    }
                    currentFocus = -1;
                    /*create a DIV element that will contain the items (values):*/
                    a = document.createElement("DIV");
                    a.setAttribute("id", this.id + "autocomplete-list");
                    a.setAttribute("class", "autocomplete-items");
                    /*append the DIV element as a child of the autocomplete container:*/
                    this.parentNode.appendChild(a);
                    /*for each item in the array...*/
                    for (i = 0; i < arr.length; i++) {
                        /*check if the item starts with the same letters as the text field value:*/
                        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                            /*create a DIV element for each matching element:*/
                            b = document.createElement("DIV");
                            /*make the matching letters bold:*/
                            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                            b.innerHTML += arr[i].substr(val.length);
                            /*insert a input field that will hold the current array item's value:*/
                            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                            /*execute a function when someone clicks on the item value (DIV element):*/
                            b.addEventListener("click", function (e) {
                                /*insert the value for the autocomplete text field:*/
                                inp.value = this.getElementsByTagName("input")[0].value;
                                /*close the list of autocompleted values,
                                    (or any other open lists of autocompleted values:*/
                                closeAllLists();
                            });
                            a.appendChild(b);
                        }
                    }
                });
                /*execute a function presses a key on the keyboard:*/
                inp.addEventListener("keydown", function (e) {
                    var x = document.getElementById(this.id + "autocomplete-list");
                    if (x) x = x.getElementsByTagName("div");
                    if (e.keyCode == 40) {
                        /*If the arrow DOWN key is pressed,
                          increase the currentFocus variable:*/
                        currentFocus++;
                        /*and and make the current item more visible:*/
                        addActive(x);
                    } else if (e.keyCode == 38) {
                        //up
                        /*If the arrow UP key is pressed,
                          decrease the currentFocus variable:*/
                        currentFocus--;
                        /*and and make the current item more visible:*/
                        addActive(x);
                    } else if (e.keyCode == 13) {
                        /*If the ENTER key is pressed, prevent the form from being submitted,*/
                        e.preventDefault();
                        if (currentFocus > -1) {
                            /*and simulate a click on the "active" item:*/
                            if (x) x[currentFocus].click();
                        }
                    }
                });
            }

            function addActive(x) {
                /*a function to classify an item as "active":*/
                if (!x) return false;
                /*start by removing the "active" class on all items:*/
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = x.length - 1;
                /*add class "autocomplete-active":*/
                x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
                /*a function to remove the "active" class from all autocomplete items:*/
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
            }
            function closeAllLists(elmnt) {
                /*close all autocomplete lists in the document,
                except the one passed as an argument:*/
                var x = document.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
        }
        var dwra = [
            "دورة العلوم و الرياضيات",
            "دورة العلوم و ",
            "دورة العلوم و الرياضيات",
        ];

        /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
        autocomplete(document.getElementById("myInput"), dwra);


        /*
         * Video Rating in video gallery
         */
        if ($(".video-rating").length) {
            var vid = document.getElementById("video-album");
            vid.onended = function () {
                $(".video-rating").toggleClass("show-video-rating");
            };
        }
        function myVideo() {
            $(".video-rating").show();
        }

        /* faq responsive*/
        if ($(".faq-category-list").length) {
            $(".faq-category-list .nav-link").on("click", function () {
                $(".faq-category-list .nav-link.active").parents(".faq-category-list").addClass("active");
                $(".faq-category-list.active").parent().prev().find(".page-title").hide();
                $(".faq-category-list.active").parent().prev().find(".page-title.faq-questions-title").show();
                $(".page-title.faq-questions-title").text($(".faq-category-list .nav-link.active .title").text());
                $(".faq-back").addClass("active");
            });
        }
        $(".faq-back").on('click', function () {
            $(".faq-category-list .nav-link.active").parents(".faq-category-list").removeClass("active");
            $(this).removeClass("active");
        });

        $("#yes-toggle").on('click', function () {
            $("#no-toggle").hide();
            $("#yes-toggle").hide();
            $("#title-toggle").hide();
            $("#edit-toggle").show();
            $("#title2-toggle").show();

        });
        $("#edit-toggle").on('click', function () {
            $("#title2-toggle").hide();
            $("#edit-toggle").hide();
            $("#no-toggle").show();
            $("#yes-toggle").show();
            $("#title-toggle").show();

        });

        $('.program-details-tabs #accordion13Collapse2').on('shown.bs.collapse', function () {
            $(".owl-carousel").trigger('refresh.owl.carousel');
        })

        if ($(".program-details-tabs  .nav-link").length) {
            $(".program-details-tabs .nav-link").on('click', function () {
                $(".program-details-tabs .nav-link").removeClass("active")
                $(this).addClass("active");

            })
            var tabEl = document.querySelector('#nav-faq-tab[data-bs-toggle="tab"]')
            tabEl.addEventListener('shown.bs.tab', function (event) {
                $('.faq-list-scroll').height($('#v-pills-tabContent').height())
            })
        }
        if ($(".program-details-tabs .carousel-bar .nav-link").length) {
            $(".program-details-tabs .carousel-bar .nav-link").on('click', function () {
                $(".program-details-tabs .carousel-bar .nav-link").removeClass("active")
                $(this).addClass("active");
            })

        }
    
        /*Youtube Background*/
        if ($('[data-youtube]').length) {
            $('[data-youtube]').youtube_background();
        }
      
    });

    $(window).scroll(function () {
        // close social share icons
        $(".social-share-links .social.networks").removeClass("active");

        /*Add Class to header when scroll*/
        $("header").addClass("header-sticky");
        if ($(this).scrollTop() <= 50) {
            $("header").removeClass("header-sticky");
        }
        

        /*
        * when footer in viewport
        */
        if ($(".footer").length) {
            var top_of_element = $(".footer").offset().top;
            var bottom_of_element = $(".footer").offset().top + $(".footer").outerHeight();
            var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
            var top_of_screen = $(window).scrollTop();

            if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
                // the element is visible, do something
                $(".dashboard").addClass("sticky");
            } else {
                // the element is not visible, do something else
                $(".dashboard").removeClass("sticky");
            }
        }

    });


    /* Window Resize */
    $(window).resize(function () {
        /* faq responsive*/
        if ($(".faq-category-list").length) {
            $(".faq-category-list .nav-link.active").parents(".faq-category-list").removeClass("active");
            $(".faq-back").removeClass("active");
        }
        $(".header-navbar-links").removeClass("responsive-menu-active");
        $(".body-backdrop").removeClass("show").addClass("hide");
    });


});

