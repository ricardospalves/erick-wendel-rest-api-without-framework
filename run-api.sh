curl --silent localhost:3000/heroes
# {"results":[]}

curl \
  --silent \
  -X POST \
  -d '{"name":"Chapolin","age":100,"power":"hammer"}' \
  localhost:3000/heroes
# {"heroID":"dda37a98-118a-4fa0-8b43-80f766ffca4c","message":"User created with success"}

curl \
  --silent \
  -X POST \
  -d '{"invalid JSON payload"}' \
  localhost:3000/heroes
# {"error":"Internet server error"}
