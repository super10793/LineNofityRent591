const fetch = require('node-fetch');

async function getRequest(options) {
  const response = await fetch(options.url, {
    "credentials": "include",
    "method": 'GET',
    "headers": options.headers,
    "json": true
  });
    
  if (!response.ok) {
    throw new Error(`getRequest() 錯誤 -> ${response.status} ${response.statusText}`);
  }

  return response;
}

async function postRequest(options) {
  const response = await fetch(options.url, {
    "method": 'POST',
    "headers": options.headers,
    "body": options.body
  });
    
  if (!response.ok) {
    throw new Error(`postRequest() 錯誤 -> ${response.status} ${response.statusText}`);
  }

  return response;
}

module.exports = {
  getRequest,
  postRequest,
};
