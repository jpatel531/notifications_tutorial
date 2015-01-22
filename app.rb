require 'sinatra'
require 'pusher'
require 'cgi'

pusher = Pusher::Client.new({
	app_id: ENV["PUSHER_APP_ID"],
	key: ENV["PUSHER_APP_KEY"],
	secret: ENV["PUSHER_APP_SECRET"]
})

get '/' do
	erb :index
end

post '/notification' do
	message = CGI.escape_html params[:message]
	pusher.trigger('notifications', 'new_notification', {
		message: message
	})
end