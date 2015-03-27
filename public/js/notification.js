$(function() {

	// add in debounced resize for jQuery
	(function($,sr){
	  var debounce = function (func, threshold, execAsap) {
	      var timeout;
	      return function debounced () {
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
	var notificationsReceived = 0;
	var originalTitle = document.title;

	function addNotificationTo(device, message) {
		var id = notificationsReceived;
		$('#' + device + ' .notifications').append(
			"<section class='notification'>" + message + "</section>"
		)
	}

	notificationsChannel.bind('new_notification', function(notification){

		// handle incrementing notification received counter
		notificationsReceived ++;
		if (notificationsReceived == 1) {
			$('.notification-circle').css('opacity', '1');
			$('.notification-circle').text(notificationsReceived);
		} else if (notificationsReceived > 99) {
			$('.notification-circle').text('...');
		} else {
			$('.notification-circle').text(notificationsReceived);
		}

		document.title = "(" + notificationsReceived + ") " + originalTitle;

		// add notification to devices
		addNotificationTo('ipad', notification.message);
		addNotificationTo('iphone', notification.message);

		// toastr notifications
		var message = notification.message;
		toastr.success(message);
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