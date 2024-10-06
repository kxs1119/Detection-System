'''
This script will be used to do mobile connection to the user after the detection sensor goes
off. 
'''
from twilio.rest import Client

account_sid = ''
auth_token = ''
client = Client(account_sid, auth_token)

message = client.messages.create(
  from_='',
  body='Hello from Twilio',
  to=''
)

print(message.sid)