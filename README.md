# smartcar-challenge
My implementation of the smartcar backend challenge which utilizes Node JS and Express. Each route will send a request to the GM api and transform the response into a better structured JSON.

Requirements
1. Node v10.6.3
2. npm 6.10.3

# Install
```js
git clone https://github.com/ronniepanaligan/smartcar-challenge.git
cd smartcar-challenge
npm install
```
# To start server
```js
npm run start
```

#To run tests
```js
npm run test
```
Each route in the api includes 2 test cases:
1. Test to ensure smartcar API returns appropriate response when GM API
2. Mock the request to the GM API to return empty response
