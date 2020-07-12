### To use this application:

1- Install dependencies:

`$ npm install marked`

2- Start server

`$ npm node src/index`

3- POST to /api/login to generate and save a token

http://localhost:3025/api/login


### Example of Endpoints to test:

http://localhost:3025/api/policies?page=1&limit=12

http://localhost:3025/api/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b

http://localhost:3025/api/clients?page=2

http://localhost:3025/api/clients/a8988671-19a7-478d-b6c7-f345554b8776

http://localhost:3025/api/clients/a0ece5db-cd14-4f21-812f-966633e7be86/policies


### To run tests:

`$npm run test`

### Comments:

- Insurance API does not return token maxAge, for that reason I cached it for 5 minutes.

- Could the Swagger documentacion be wrong? Sometimes is confusing because enpoint's requirements are repeated or dont have much sense in terms of performace

