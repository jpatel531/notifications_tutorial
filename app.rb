require 'sinatra'
require 'pusher'

Pusher.url = ENV["PUSHER_TUTORIAL_URL"]

get '/' do
	erb :index
end

post '/notification' do
	Pusher['notifications'].trigger('notification', {
		message: 'hello world'
	})
end


