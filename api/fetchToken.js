const { getRequest } = require('../utils/request');
const userAgent = require('../utils/userAgent');

module.exports = async () => {
  const url = "https://rent.591.com.tw/";
  const regExp = new RegExp('<meta name="csrf-token" content="([A-Za-z0-9]*)">', 'gi');
  let cookie = ""
  let phpSid = ""
  const response = await getRequest({
    "url": url,
    "headers": userAgent,
  }).then((res) => {
    cookie = res.headers.get('set-cookie').split("; ").filter((data) => data.includes('591_new_session'))[0].split(", ")[1];
    phpSid = res.headers.get('set-cookie').split("; ").filter((data) => data.includes('PHPSESSID'))[0].split(", ")[1];
    return res.text();
  }).then((text) => {
    return text;
  })
  const token = regExp.exec(response)[1];
  return {token, cookie, phpSid};
};