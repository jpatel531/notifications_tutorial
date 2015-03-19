$(function() {
	var pusher = new Pusher('5fc7c2b982b526113bff');

	var notificationsChannel = pusher.subscribe('notifications');

	var notificationsReceived = 0;

	var originalTitle = document.title

	notificationsChannel.bind('new_notification', function(notification){
		notificationsReceived ++;
		document.title = "(" + notificationsReceived + ") " + originalTitle
		$('span.badge').text(notificationsReceived);
		var message = notification.message;
		toastr.success(message);
		var id = notificationsReceived;
		var now = new Date()
		$('ul.notifications').prepend(
			"<li><h4>"+ message + "</h4><p id='" + id + "'>" + moment(now).fromNow() + "</p></li>"
		)
		update(id, now)
	});

	var update = function(id, now) {
		setInterval(function(){
			$('p#'+id).text(moment(now).fromNow())
		}, 5000)
	}

	var sendNotification = function(){
		console.log('hello there')
		var text = $('input.create-notification').val();
		if (text === '') return;
		$.post('/notification', {message: text}).success(function(){
			console.log('Notification sent!');
		});
	};

	$('a.submit-notification').on('click', sendNotification);

	$('.create-notification').on('keydown', function(event){
		if (event.keyCode === 13) sendNotification();
	});

	$('.show-ipad').on('click', function(){
		$('.iphone').hide();
		$('.ipad').show();
		$('.show-iphone').show()
		$('.show-ipad').hide();
	});

	$('.show-iphone').on('click', function(){
		$('.ipad').hide();
		$('.iphone').show();
		$('.show-ipad').show();
		$('.show-iphone').hide();
	});
})