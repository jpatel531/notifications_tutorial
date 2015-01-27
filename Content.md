#How To Create Realtime Notifications For Web Apps

There are few apps nowadays for which realtime notifications are not a core feature. From friend requests to pull requests, keeping users updated is key to their experience. 

In this tutorial, we will show you how simple it is to implement realtime notifications with Pusher.

##What We'll Cover

###How Our App Will Work

* One user can create a notification, and send it to the server.
* When the server receives data, it will broadcast that notification.
* All users will receive that notification with Javascript. It will be shown in the DOM.
* We will use a third party library to make the notification more attractive.

###Pusher Terminology

####Channels

In Pusher, channels are a way to organize your data. In this tutorial, we will create a channel called `notifications`, but for other things you might wish to add, such as `chat-messages` or `stock-prices`, you will want to create new channels to appropriately categorize the data you send.

To transmit notifications, we will be using **public channels**. Public channels do not control access to information. Unlike **private channels**, they do not require server-side authentication in order to receive messages. 

####Events

Events are simply a message on a channel. They have a name, such as `new_notification`, and some JSON data, such as `{message: 'hello world'}`.
They are sent by calling `trigger` on a channel. On the client, one calls `bind` and registers a callback to execute when an event is received.


## Step 0: Setting Up

[Sign up]() for a free account. Keep your application credentials to hand.

Make sure you have a server capable of running Ruby, PHP or Python.

Install the Pusher package for your given language, e.g. the 'pusher' gem.

Create an application, and name it whatever you wish, e.g. 'Notifications Tutorial'.

If at any point you are stuck, [feel free to browse the source code]().

## Step 1: Simply sending an event

To start with, we'll just send a simple Pusher trigger, and view it in our debug console.

First we import the Pusher package. And then we create our Pusher instance without app credentials.

Now, we wish to trigger on a channel called `test_channel`, an event called `my_event`. We'll give this event an arbitrary payload, such as `{message: 'hello world'}`.

	require 'pusher'
	
	Pusher.url = ENV["PUSHER_TUTORIAL_URL"]
	
	// trigger on 'test_channel' an event called 'my_event' with this payload:
	
	Pusher['test_channel'].trigger('my_event', {
		message: 'hello world'
	})

Open up your debug console for the app you have created. Then run this file.

You should see the event pop up in your browser window. Pretty nifty, huh?

## Step 2: Creating a very basic app

### On Your Client

Let's have a jump in and see what we do on the client-side when using Pusher.

Include PusherJS and jQuery, like such:

	<script src="http://js.pusher.com/2.2/pusher.min.js" type="text/javascript"></script>
	<script src="https://code.jquery.com/jquery-2.1.3.min.js" type="text/javascript"></script>  

To get things started, let's initialize our Pusher instance in a HTML script tag:

	var pusher = new Pusher('YOUR_APP_KEY');

Essentially, we wish to bind to an event on a channel, and pass a callback, such as this:

	myChannel.bind('my_event', function(data){
		// do something with our `data`
	});

Let's bind to a `notifications` channel, and an event called `notification`, and merely log it to the console:

	//subscribe to our notifications channel
	
	var notificationsChannel = pusher.subscribe('notifications');
	
	//do something with our new information
	
	notificationsChannel.bind('notification', function(notification){
		// assign the notification's message to a <div></div>
		var message = notification.message;
		$('div.notification').text(message);
	});
	
Now, within your HTML, create a div, with class 'notification', such as `<div class="notification"></div>`.

### On Your Server

This will just be a modification of your existing code. Whenever somebody sends a POST request to the `/notification` endpoint, we'll want to trigger the notification in the notifications-channel.

	post '/notification' do
		Pusher['notifications'].trigger('notification', {
			message: 'hello world'
		})
	end
	
	// don't forget to render your HTML page
	
	get '/' do
		erb :index
	end

Run your server and open your HTML on the browser. Now enter this curl command in your shell:

	curl -X POST http://localhost:9393/notification
	
Now you should see 'hello world' appear on your screen.


##Step 3: Make It Interactive

###On Your Client

That's all well and good - but what if we want to create notifications that say something other than 'hello world'? Let's make it so that we create a notification to all users whenever we submit some text to the UI.

Let's create our input:

	<input class="create-notification" placeholder="Send a notification :)"></input>
	
Now, whenever the user hits enter, we want to post to our `/notification` endpoint with the message to broadcast.

	$('input.create-notification').on('keydown', function(event){
		if (event.keyCode != 13) return;
		
		var text = this.value;
		$.post('/notification', {message: text}).success(function(){
			console.log("Notification sent!");
		});
	});

###On Your Server

Server-side, we'll just want to replace our hard-coded 'hello world' message with whatever was posted to that endpoint.

	post '/notification' do
		message = params[:message]
		
		Pusher['notifications'].trigger('notification', {
			message: message
		})
	end
	
Now, if you type a piece of text into your input box, and open up a second browser, you'll see that all browsers receive your new notification.

##Step 4: Make It Pretty

Toastr is a fairly popular and easy-to-use library for nice, non-blocking in-app notifications. In showing you how to further extend your notifications app, let's use it to display new notifications in the UI.

Link in the Toastr CSS and Javascript:
	
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
	<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
	
Remove our `<div class="notification"></div>` as we won't need it any more.

Now let's simply call toastr in our new notification Pusher callback:

	notificationsChannel.bind('notification', function(notification){
		var message = notification.message;
		toastr.success(message)
	});

So, test it out! You can open up a new browser window to check it works, or if you have ngrok installed, make a new tunnel by typing something like:

	ngrok -subdomain=pusher-notifications-tutorial 9393
	
Then open up 'pusher-notifications-tutorial.ngrok.com' in your phone, send yourself a notification and voilà! 

##What Now?

