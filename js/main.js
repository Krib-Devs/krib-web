/* ===================================================================
 * Krib - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc',   // mailchimp url (deprecated)
        // Discord webhook URL - To get your webhook URL:
        // 1. Go to your Discord server settings
        // 2. Navigate to Integrations > Webhooks
        // 3. Create a new webhook or use an existing one
        // 4. Copy the webhook URL and paste it below
        discordWebhookURL : 'https://discord.com/api/webhooks/1441192876208951336/r9jpQXjkn1jCCwMItPt15cGU3WrFGvYLPsq0f_9kttsk01dIKeLFTJxL2ey2SWYYKGtc' // Example: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN'
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {
        
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        
        });
    };


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var ssMenuOnScrolldown = function() {
        
        var hdr= $('.s-header'),
            hdrTop = $('.s-header').offset().top;

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > hdrTop) {
                hdr.addClass('sticky');
            }
            else {
                hdr.removeClass('sticky');
            }

        });
    };


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    var ssMobileMenu = function() {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });

    };


   /* Highlight the current section in the navigation bar
    * ------------------------------------------------------ */
    var ssWaypoints = function() {

        var sections = $(".target-section"),
            navigation_links = $(".header-nav-wrap li a");

        sections.waypoint( {

            handler: function(direction) {

                var active_section;

                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prevAll(".target-section").first();

                var active_link = $('.header-nav-wrap li a[href="#' + active_section.attr("id") + '"]');

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");

            },

            offset: '25%'

        });
        
    };


   /* slick slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {
        
        $('.about-desc__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 1401,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1101,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 701,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    };


   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);
            
            // Only proceed if we have a valid hash target and the element exists
            if (!target || $target.length === 0) {
                return; // Allow default link behavior for non-hash links
            }
            
            e.preventDefault();
            e.stopPropagation();

            // Check if target element has offset (is visible/positioned)
            if (!$target.offset()) {
                return; // Allow default link behavior if element not found
            }

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                // if ($('body').hasClass('menu-is-open')) {
                //     $('.header-menu-toggle').trigger('click');
                // }

                window.location.hash = target;
            });
        });

    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    var ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var ssAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


    /* Back to Top
    * ------------------------------------------------------ */
    var ssBackToTop = function() {
        
    var pxShow      = 500,
        goTopButton = $(".go-top");

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!goTopButton.hasClass('link-is-visible')) goTopButton.addClass('link-is-visible')
            } else {
                goTopButton.removeClass('link-is-visible')
            }
        });
    };


   /* Discord Webhook Subscription
    * ------------------------------------------------------ */
    var ssDiscordSubscribe = function() {
        
        $('#mc-form').on('submit', function(e) {
            e.preventDefault();
            
            var form = $(this);
            var emailInput = form.find('input[type="email"]');
            var email = emailInput.val().trim();
            var messageLabel = form.find('.subscribe-message');
            
            // Basic email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                messageLabel.html('<i class="fas fa-exclamation-triangle"></i> Please enter a valid email address.')
                    .removeClass('valid')
                    .addClass('error')
                    .show();
                emailInput.addClass('error');
                return false;
            }
            
            // Check if Discord webhook URL is configured
            if (!cfg.discordWebhookURL || cfg.discordWebhookURL === '') {
                messageLabel.html('<i class="fas fa-exclamation-triangle"></i> Discord webhook not configured. Please contact administrator.')
                    .removeClass('valid')
                    .addClass('error')
                    .show();
                return false;
            }
            
            // Show submitting message
            messageLabel.html('<i class="fas fa-spinner fa-spin"></i> Submitting...')
                .removeClass('error valid')
                .show();
            emailInput.removeClass('error');
            
            // Prepare Discord webhook payload
            var timestamp = new Date().toISOString();
            var discordPayload = {
                embeds: [{
                    title: "📧 New Newsletter Subscription",
                    description: "A new user has subscribed to the Krib newsletter!",
                    color: 0x00a650, // Krib green color
                    fields: [
                        {
                            name: "Email Address",
                            value: email,
                            inline: false
                        },
                        {
                            name: "Subscription Date",
                            value: new Date().toLocaleString(),
                            inline: false
                        }
                    ],
                    footer: {
                        text: "Krib App Newsletter"
                    },
                    timestamp: timestamp
                }]
            };
            
            // Send to Discord webhook
            $.ajax({
                url: cfg.discordWebhookURL,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(discordPayload),
                success: function() {
                    messageLabel.html('<i class="fas fa-check"></i> Thank you for subscribing! We\'ll keep you updated.')
                        .removeClass('error')
                        .addClass('valid')
                        .show();
                    emailInput.removeClass('error').addClass('valid').val('');
                    
                    // Show success modal
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thank You!',
                            html: '<p style="font-size: 1.6rem; line-height: 1.8; margin-bottom: 1.5rem;">Thank you for subscribing to our newsletter!</p><p style="font-size: 1.6rem; line-height: 1.8;">We\'ll send you updates about new hostel listings, safety guides, and special offers for students.</p>',
                            confirmButtonText: 'Awesome!',
                            confirmButtonColor: '#FF400D',
                            background: '#ffffff',
                            color: '#000000',
                            width: '600px',
                            padding: '3rem',
                            customClass: {
                                popup: 'krib-swal-popup',
                                title: 'krib-swal-title',
                                content: 'krib-swal-content',
                                confirmButton: 'krib-swal-button'
                            }
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Discord webhook error:', error);
                    messageLabel.html('<i class="fas fa-exclamation-triangle"></i> Something went wrong. Please try again later.')
                        .removeClass('valid')
                        .addClass('error')
                        .show();
                    emailInput.addClass('error');
                }
            });
            
            return false;
        });
    };


   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        ssPreloader();
        ssMenuOnScrolldown();
        ssMobileMenu();
        ssWaypoints();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssAOS();
        ssBackToTop();
        ssDiscordSubscribe();

    })();

})(jQuery);