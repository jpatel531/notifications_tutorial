import pusher
import os
from flask import Flask, render_template

app = Flask(__name__)

app_id = os.environ.get('PUSHER_APP_ID')
key = os.environ.get('PUSHER_APP_KEY')
secret = os.environ.get('PUSHER_APP_SECRET')

p = pusher.Pusher(
  app_id=app_id,
  key=key,
  secret=secret
)

@app.route("/")
def show_index():
    return render_template('index.html')

@app.route("/notification")
def trigger_notification():
	p['notifications'].trigger('new_notification', {'message': 'hello world'})
	return "Notification triggered!"

if __name__ == "__main__":
    app.run(debug=True)