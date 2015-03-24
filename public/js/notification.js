$(function() {
	var pusher = new Pusher('5fc7c2b982b526113bff');
	var notificationsChannel = pusher.subscribe(window.channelName);
	var notificationsReceived = 0;
	var originalTitle = document.title;

	notificationsChannel.bind('new_notification', function(notification){

		// handle incrementing notification received counter
		notificationsReceived ++;
		$('.notification-circle').css('opacity', '1');
		$('.count .notification-circle').text(notificationsReceived);

		document.title = "(" + notificationsReceived + ") " + originalTitle;

		// toastr notifications
		var message = notification.message;
		toastr.options = {
	    positionClass: "notification",
	    target: ".notifications",
		}
		toastr.success(message);
	});

	var update = function(id, now) {
		setInterval(function(){
			$('article.message-'+id).text(moment(now).fromNow())
		}, 5000)
	}

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