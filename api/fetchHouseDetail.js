const { getRequest } = require('../utils/request');
const userAgent = require('../utils/userAgent');

module.exports = async (postId, token, cookie, phpSid) => {
  const url = `https://bff.591.com.tw/v1/house/rent/detail?id=${postId}`
  const headerObj = {
      "X-CSRF-TOKEN": token,
      "Device": "pc",
      "Deviceid": phpSid.split("=")[1],
      "Cookie": cookie
  }
  const response = await getRequest({
    "url": url,
    "headers": {
      ...headerObj,
      ...userAgent,
    },
  }).then((res) => {
    return res.json();
  }).then((json) => {
    return json;
  })
  return response;
};