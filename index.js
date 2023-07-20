require('dotenv').config();
const fetchToken = require('./api/fetchToken');
const fetchHouseList = require('./api/fetchHouseList');
const fetchHouseDetail = require('./api/fetchHouseDetail');
const postLineNofity = require('./api/postLineNotify');
const CronJob = require('cron').CronJob;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function start() {
	const { token, cookie, phpSid } = await fetchToken();
	const houseData = await fetchHouseList(token, cookie);
	const houseList = houseData.data.data;
	
	let listMessage = "";
	for (const house of houseList) {
		const houseDetail = await fetchHouseDetail(house.post_id, token, cookie, phpSid);
		const url = `https://rent.591.com.tw/home/${house.post_id}`
		const watched = houseDetail.data.browse.pc + houseDetail.data.browse.mobile;
    listMessage = listMessage + `價格：${houseDetail.data.price}\n收藏：${houseDetail.data.favData.count}、觀看次數：${watched}\n${url}\n\n`
		await delay(300);
	}

	const message = `地點：台北\n類型：獨立套房\n價格區間：5000-10000\n前30筆資料如下\n\n${listMessage}`

	const aaa = await postLineNofity(message);
}

const job = new CronJob('0 10 * * *', function() {
	start();
}, null, true, 'Asia/Taipei');
job.start();