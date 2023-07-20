const { getRequest } = require('../utils/request');
const { HouseKind, MultiPrice } = require('../utils/enum');
const userAgent = require('../utils/userAgent');

module.exports = async (token, cookie) => {
  const url = `https://rent.591.com.tw/home/search/rsList?is_format_data=1&is_new_list=1&type=1&kind=${HouseKind.IndependentSuite}&multiPrice=${MultiPrice.Range5000to10000}&order=posttime&orderType=desc`;
  let headerObj = {
      "X-CSRF-TOKEN": token,
      "Cookie": cookie,
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