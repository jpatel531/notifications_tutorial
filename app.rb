require 'sinatra'
require 'pusher'
require 'active_support/core_ext/integer/inflections'

Pusher.app_id = '105362'
Pusher.key = '5fc7c2b982b526113bff'
Pusher.secret = '75fe6698eb03e6ed17ea'

get '/' do
	erb :index
end

post '/notification' do
	message = params[:message]
	Pusher.trigger('notifications', 'new_notification', {
		message: message
	})
end