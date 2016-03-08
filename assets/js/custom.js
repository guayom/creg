(function($){

	loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current){
        $('#show-previous-image, #show-next-image').show();
        if(counter_max == counter_current){
            $('#show-next-image').hide();
        } else if (counter_current == 1){
            $('#show-previous-image').hide();
        }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr){
        var current_image,
            selector,
            counter = 0;

        $('#show-next-image, #show-previous-image').click(function(){
            if($(this).attr('id') == 'show-previous-image'){
                current_image--;
            } else {
                current_image++;
            }

            selector = $('[data-image-id="' + current_image + '"]');
            updateGallery(selector);
        });

        function updateGallery(selector) {
            var $sel = selector;
          	console.log('hola');
            current_image = $sel.data('image-id');
            $('#image-gallery-caption').text($sel.data('caption'));
            $('#image-gallery-title').text($sel.data('title'));
            $('#image-gallery-image').attr('src', $sel.data('image'));

            disableButtons(counter, $sel.data('image-id'));
        }

        if(setIDs == true){
            $('[data-image-id]').each(function(){
                counter++;
                $(this).attr('data-image-id',counter);
            });
        }
        $(setClickAttr).on('click',function(){
            updateGallery($(this));
        });
    }


	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {

		$('.grid').masonry({
		  // options
		  columnWidth: '.grid-sizer',
		  itemSelector: '.grid-item'
		});

		/* ---------------------------------------------- /*
		 * Animated scrolling / Scroll Up
		/* ---------------------------------------------- */

		$('a[href*=#]').bind("click", function(e){
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
		});

		/* ---------------------------------------------- /*
		 * Background image
		/* ---------------------------------------------- */

		$('#intro').backstretch(['/images/eventos/image2.PNG']);

		/* ---------------------------------------------- /*
		 * Navbar
		/* ---------------------------------------------- */

		$('body').scrollspy({
			target: '.navbar-custom',
			offset: 70
		})

		var navbar = $('.navbar');
		var navHeight = navbar.height();

		$(window).scroll(function() {
			if($(this).scrollTop() >= navHeight) {
				navbar.addClass('navbar-color');
			}
			else {
				navbar.removeClass('navbar-color');
			}
		});

		if($(window).width() <= 767) {
			navbar.addClass('custom-collapse');
		}

		$(window).resize(function() {
			if($(this).width() <= 767) {
				navbar.addClass('custom-collapse');
			}
			else {
				navbar.removeClass('custom-collapse');
			}
		});

		/* ---------------------------------------------- /*
		 * Carousel Galería
		/* ---------------------------------------------- */

		$('#myCarousel').carousel({
            interval: 5000
    });

    //Handles the carousel thumbnails
    $('[id^=carousel-selector-]').click(function () {
		    var id_selector = $(this).attr("id");
		    try {
		        var id = /-(\d+)$/.exec(id_selector)[1];
		        console.log(id_selector, id);
		        jQuery('#myCarousel').carousel(parseInt(id));
		    } catch (e) {
		        console.log('Regex failed!', e);
		    }
		});
    // When the carousel slides, auto update the text
    $('#myCarousel').on('slid.bs.carousel', function (e) {
             var id = $('.item.active').data('slide-number');
            $('#carousel-text').html($('#slide-content-'+id).html());
    });

		/* ---------------------------------------------- /*
		 * Knob Animation
		/* ---------------------------------------------- */

		$(".custom-knob").knob({
			font: 'Montserrat',
			bgColor: '#C4C4C4',
			fgColor: '#90C695',
			thickness: '0.05',
			readOnly: true,
			max: 100,
			min: 0,
			step: 1,
			value: 0,
			width: 150,
			height: 150
		});

		$('#skill').waypoint(function() {
			$('#skill .custom-knob').each(function() {
				counter = $(this).attr('data-count-to'),
				$(this).animate({ value: counter }, {
					duration: 1500,
					easing:'swing',
					progress: function() {
						$(this).val(Math.ceil(this.value)).trigger('change');
					}
				})
			});
		}, { offset: '70%', triggerOnce: true });

		/* ---------------------------------------------- /*
		 * WOW Animation When You Scroll
		/* ---------------------------------------------- */

		wow = new WOW({
			mobile: false
		});
		wow.init();

		/* ---------------------------------------------- /*
		 * Owl slider - (clients, testimonials)
		/* ---------------------------------------------- */

		$("#owl-testimonials").owlCarousel({
			items : 1,
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			slideSpeed : 300,
			paginationSpeed : 400,
			autoPlay: 5000,
			singleItem: true
		});

		$("#owl-clients").owlCarousel({
			items : 5,
			pagination: false,
			slideSpeed : 300,
			paginationSpeed : 400,
			autoPlay: 5000
		});

		/* ---------------------------------------------- /*
		 * Rotate
		/* ---------------------------------------------- */

		$(".rotate").textrotator({
			animation: "dissolve",
			separator: "|",
			speed: 3000
		});

		/* ---------------------------------------------- /*
		 * Portfolio pop up
		/* ---------------------------------------------- */

		$('#portfolio').magnificPopup({
			delegate: 'a.pop-up',
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		$('.video-pop-up').magnificPopup({
			type: 'iframe',
		});

		/* ---------------------------------------------- /*
		 * A jQuery plugin for fluid width video embeds
		/* ---------------------------------------------- */

		$(".video").fitVids();

		/* ---------------------------------------------- /*
		 * E-mail validation
		/* ---------------------------------------------- */

		function isValidEmailAddress(emailAddress) {
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			return pattern.test(emailAddress);
		};

		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$("#contact-form").submit(function(e) {

			e.preventDefault();

			var c_name = $("#c_name").val();
			var c_email = $("#c_email").val();
			var c_message = $("#c_message ").val();
			var responseMessage = $('#contact-form .ajax-response');

			if (( c_name== "" || c_email == "" || c_message == "") || (!isValidEmailAddress(c_email) )) {
				responseMessage.fadeIn(500);
				responseMessage.html('<i class="fa fa-warning"></i> Check all fields.');
			}

			else {
				$.ajax({
					type: "POST",
					url: "assets/php/contactForm.php",
					dataType: 'json',
					data: {
						c_email: c_email,
						c_name: c_name,
						c_message: c_message
					},
					beforeSend: function(result) {
						$('#contact-form button').empty();
						$('#contact-form button').append('<i class="fa fa-cog fa-spin"></i> Wait...');
					},
					success: function(result) {
						if(result.sendstatus == 1) {
							$('#contact-form .ajax-hidden').fadeOut(500);
							responseMessage.html(result.message).fadeIn(500);
						} else {
							$('#contact-form button').empty();
							$('#contact-form button').append('<i class="fa fa-retweet"></i> Try again.');
							responseMessage.html(result.message).fadeIn(1000);
						}
					}
				});
			}

			return false;

		});

	});

})(jQuery);
