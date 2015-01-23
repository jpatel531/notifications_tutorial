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

## Step 1: 




