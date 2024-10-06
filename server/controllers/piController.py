'''
This script will be used to do mobile connection to the user after the detection sensor goes
off. 
'''
from twilio.rest import Client

account_sid = ''
auth_token = ''
client = Client(account_sid, auth_token)

message = client.messages.create(
  from_='+18554496128',
  body='Hello from Twilio',
  to='+16673673947'
)

print(message.sid)