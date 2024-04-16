require('dotenv').config();
const fetchToken = require('./api/fetchToken');
const fetchHouseList = require('./api/fetchHouseList');
const fetchHouseDetail = require('./api/fetchHouseDetail');
const postLineNotify = require('./api/postLineNotify');
const express = require('express');
const line = require('@line/bot-sdk');
const botConfig = {
	channelId: process.env.LINE_CHANNEL_ID,
	channelSecret: process.env.LINE_CHANNEL_SECRET,
	channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
};
const client = new line.Client(botConfig);
const app = express();
const TRIGGER_KEY_WORD = 'go';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.post('/callback', line.middleware(botConfig), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

async function handleEvent(event) {
	if (event.type != 'message' || event.message.type != 'text') {
		return Promise.resolve(null);
	}

	if (event.message.text != TRIGGER_KEY_WORD) {
		return client.replyMessage(event.replyToken, { 
			type: 'text', 
			text: `Hi, 你說了：${event.message.text}`
		});
	}

	const { token, cookie, phpSid } = await fetchToken();
	console.log(`fetchToken()成功，token=${token}, cookie=${cookie}, phpSid=${phpSid}`);

	const houseData = await fetchHouseList(token, cookie);
	const houseList = houseData.data.data;
	console.log(`fetchHouseList()成功`);

	let listMessage = "";
	for (const house of houseList) {
		const houseDetail = await fetchHouseDetail(house.post_id, token, cookie, phpSid);
		console.log(`fetchHouseDetail()成功，post_id=${house.post_id}`);
		
		const url = `https://rent.591.com.tw/home/${house.post_id}`
		const watched = houseDetail.data.browse.pc + houseDetail.data.browse.mobile;
		listMessage = listMessage + `價格：${houseDetail.data.price}\n收藏：${houseDetail.data.favData.count}、觀看次數：${watched}\n${url}\n\n`
		await delay(300);
	}

	const message = `\n地點：台北\n類型：獨立套房\n價格區間：5000-10000\n前30筆資料如下\n\n${listMessage}`;  
	return client.replyMessage(event.replyToken, { 
		type: 'text', 
		text: message
	});
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
