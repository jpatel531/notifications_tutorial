require 'pusher'

Pusher.url = ENV["PUSHER_TUTORIAL_URL"]

Pusher['test_channel'].trigger('my_event', {
	message: 'hello world'
})