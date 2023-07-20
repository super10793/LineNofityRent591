const { postRequest } = require('../utils/request');
const FormData = require('form-data');
const token = process.env.LINE_NOTIFY_TOKEN;

module.exports = async (message) => {
  const formData = new FormData();
  formData.append("message", message);

  const options = {
    "url": "https://notify-api.line.me/api/notify",
    "headers": {
      "authorization": `Bearer ${token}`,
    },
    "body": formData
  };
  const response = await postRequest(options);
  return response;
};