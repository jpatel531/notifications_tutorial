$(function () {

  // add in debounced resize for jQuery
  (function ($, sr) {
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this, args = arguments;
            function delayed () {
              if (!execAsap)
                func.apply(obj, args);
              timeout = null;
            };
            if (timeout)
              clearTimeout(timeout);
            else if (execAsap)
              func.apply(obj, args);

	          timeout = setTimeout(delayed, threshold || 100);
	      };
	  }
	  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
	})(jQuery,'smartresize');

	// functions for handling moving page elements on resize
	function moveDevicesToBottom() {
		var remainingHeight = $(window).height() - $('.splash-inner .row').height() + parseInt($('.splash-inner .row .page-heading').css('padding-top')) - 50;
		if (remainingHeight > 600) {
			$('.inputs').height(remainingHeight);
		}
		moveNotificationSubmitSection(remainingHeight);
	}

	function moveNotificationSubmitSection(remainingHeight) {
		if (remainingHeight > 800) {
			var temp = ($(window).height() - 700) / 2;
			$('.splash-inner .row .page-heading').css('padding-top', temp + 'px')
			$('.inputs').height($('.inputs').height() - temp);
		} else {
			$('.splash-inner .row .page-heading').css('padding-top', '0')
		}
	}

	moveDevicesToBottom();

  $(window).smartresize(function(){
	  moveDevicesToBottom();
	});

	var pusher = new Pusher('5fc7c2b982b526113bff');
	var notificationsChannel = pusher.subscribe(window.channelName);
	var nativeNotificationRetainCount = 0;

	function removeNativeNotificationIn(milliseconds, element, setHeightToZero) {
		window.setTimeout(function() {
			nativeNotificationRetainCount--;
			if (nativeNotificationRetainCount == 0) {
				if (setHeightToZero) {
					$('.mobile.native-notification').animate({
						height: '0'
					}, 600, 'easeInOutCubic')
				}
				element.addClass('fadeOutUp');
				element.one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
					$('.nat-not-components').remove();
				});
			}
		}, milliseconds);
	}

	function removeHTML5NotificationIn(milliseconds, element) {
		window.setTimeout(function() {
			element.addClass('animated fadeOutRight');
			element.one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
				$(this).hide('slow', function(){ $(this).remove(); });
			});
		}, milliseconds);
	}

	function addNotificationToiPhone(message) {
		var iPhoneNativeNotificationBox = $('.native-notification');
		if (nativeNotificationRetainCount == 0) {
			iPhoneNativeNotificationBox.css({'visibility':'visible'});
			iPhoneNativeNotificationBox.removeClass('fadeOutUp');
			iPhoneNativeNotificationBox.addClass('fadeInDown');
		} else {
			$('.nat-not-components').first().animate({
				opacity: '0',
				height: '0'
			}, 600, 'easeInOutCubic');
		}

		nativeNotificationRetainCount++;
		removeNativeNotificationIn(4000, iPhoneNativeNotificationBox);

		var notification = $("<div class='nat-not-components' style='height:0;opacity:0;'><div class='logo'></div><div class='name'>Pusher Notification</div><div class='time-ago'>now</div><div class='message'>" + message + "</div></div>")
		$('#iphone .inner-screen .native-notification').prepend(notification);
		notification.animate({
			opacity: '1',
			height: '100%'
		}, 600, 'easeInCubic');

		$('.native-notification .message').dotdotdot({ height: 30 });
	}

	function addNotificationToBrowser(message) {
    var notification = $("<section class='html5-notification animated fadeInUp'><div class='left-box'></div><div class='message'>" + message + "</div><div class='cross'><i class='icon ion-close'></i></div></section>").hide();
		$('.browser-container .inner-screen .notifications').append(notification);
		notification.css({'display':'block'});
		removeHTML5NotificationIn(4000, notification);
		$('.html5-notification .message').dotdotdot({ height: 30 });
	}

	function addFakeNativeNotification(message) {
		var mobileNativeNotificationBox = $('.mobile.native-notification');
		if (nativeNotificationRetainCount == 0) {
			mobileNativeNotificationBox.css({'visibility':'visible'});
			mobileNativeNotificationBox.animate({ height: '70px' }, 600, 'easeInOutCubic')
			$('html, body').animate({ scrollTop: 0 }, 100);
			mobileNativeNotificationBox.removeClass('fadeOutUp');
			mobileNativeNotificationBox.addClass('fadeInDown');
		} else {
			$('.nat-not-components').first().animate({
				opacity: '0',
				height: '0'
			}, 600, 'easeInOutCubic');
		}

		nativeNotificationRetainCount++;
		removeNativeNotificationIn(4000, mobileNativeNotificationBox, true);

		var notification = $("<div class='nat-not-components' style='height:0;opacity:0;'><div class='logo'></div><div class='name'>Pusher Notification</div><div class='time-ago'>now</div><div class='message'>" + message + "</div></div>")
		mobileNativeNotificationBox.prepend(notification);
		notification.animate({
			opacity: '1',
			height: '100%'
		}, 600, 'easeInCubic');

		$('.mobile.native-notification .message').dotdotdot({ height: 30 });
	}

	$('#browser-address-bar').val(document.URL);

	function addTutorialLink() {
		if ($('.tutorial-link').height() == 0) {
			$('.tutorial-link').animate({
				height: '30px',
				opacity: '1'
			});
		}
	}

	notificationsChannel.bind('new_notification', function(notification){
		// add notification to devices
		addTutorialLink()
		if ($(window).width() < 760) {
			addFakeNativeNotification(notification.message);
		} else {
			addNotificationToBrowser(notification.message);
			addNotificationToiPhone(notification.message);
		}
	});

	var sendNotification = function(){
		var text = $('input.create-notification').val();
		if (text === '') return;
		$.post('/notification', {message: text, channel: window.channelName}).success(function(){
			$('input.create-notification').val('');
		});
	};

	$('a.submit-notification').on('click', sendNotification);

	$('.create-notification').on('keydown', function(event){
		if (event.keyCode === 13) sendNotification();
	});
})