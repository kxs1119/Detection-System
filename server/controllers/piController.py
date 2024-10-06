from twilio.rest import Client

account_sid = 'AC7d04ca953b5cb6e282b9d1baeb63227f'
auth_token = '171359f5bdbc966bcb7b6f3fab9be2d9'
client = Client(account_sid, auth_token)

message = client.messages.create(
  from_='+18554496128',
  body='Hello from Twilio',
  to='+16673673947'
)

print(message.sid)