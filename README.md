### To use this application:

1- Install dependencies:

`$ npm install`

2- Start server

`$ node src/index`

3- POST to /api/login (Postman app recommended) to generate and save a token as a cookie

http://localhost:3025/api/login

This will generate a token for a mock user (on production environment it would fetch user on DB):

`{ id: 'a0ece5db-cd14-4f21-812f-966633e7be86', role: 'admin' }`

To test with `user` role, change it on file `/src/controllers/user`.

### Example of Endpoints to test (Postman app recommended):

http://localhost:3025/api/policies?page=1&limit=12

http://localhost:3025/api/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b

http://localhost:3025/api/clients?page=2

http://localhost:3025/api/clients/a8988671-19a7-478d-b6c7-f345554b8776

http://localhost:3025/api/clients/a0ece5db-cd14-4f21-812f-966633e7be86/policies


### To run tests:

`$ npm run test`

### Comments:

- Insurance API does not return token maxAge, for that reason I cached it for 5 minutes.

- Could the Swagger documentacion be wrong? Sometimes is confusing because enpoint's requirements are repeated or dont have much sense in terms of performace.

For example, this enpoint:

http://localhost:3025/api/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b

Returns all polices if user's roles is `admin` or that specific policy if `user`




