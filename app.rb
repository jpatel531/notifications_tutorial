require 'sinatra'
require 'pusher'

Pusher.url = ENV["PUSHER_TUTORIAL_URL"]

get '/' do
	erb :index
end

post '/notification' do
	message = params[:message]
	Pusher['notifications'].trigger('notification', {
		message: message
	})
end