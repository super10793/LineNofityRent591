require('dotenv').config();
const fetchToken = require('./api/fetchToken');
const fetchHouseList = require('./api/fetchHouseList');
const fetchHouseDetail = require('./api/fetchHouseDetail');
const postLineNotify = require('./api/postLineNotify');
const CronJob = require('cron').CronJob;
const express = require('express');
const app = express();
const port = 10000; // 這裡指定你想要使用的連接埠號碼


function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function start() {
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

	const message = `\n地點：台北\n類型：獨立套房\n價格區間：5000-10000\n前30筆資料如下\n\n${listMessage}`

	const lineNotify = await postLineNotify(message);
	console.log(`lineNotify=${lineNotify}`);
}

app.listen(port, () => {
  	console.log(`應用程式正在運行於 http://0.0.0.0:${port}`);
  	
  	// 早上10點抓資料
	const morningJob = new CronJob('0 10 * * *', () => {
		console.log("morningJob start");
		start();
	}, null, true, 'Asia/Taipei');

	// 晚上10點抓資料
	const eveningJob = new CronJob('00 22 * * *', () => {
		console.log("eveningJob start");
		start();
	}, null, true, 'Asia/Taipei');

	console.log("set jobs");
	morningJob.start();
	eveningJob.start();
});



