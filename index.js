const fetchToken = require('./api/fetchToken');
const fetchHouseList = require('./api/fetchHouseList');
const fetchHouseDetail = require('./api/fetchHouseDetail');
const postLineNofity = require('./api/postLineNotify');
const CronJob = require('cron').CronJob;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function start() {
	console.log('You will see this message every second');
	// const { token, cookie, phpSid } = await fetchToken();
	// const houseData = await fetchHouseList(token, cookie);
	// const houseList = houseData.data.data;
	
	// for (const house of houseList) {
	// 	const houseDetail = await fetchHouseDetail(house.post_id, token, cookie, phpSid);
	// 	console.log(`價格：${houseDetail.data.price}, 收藏：${houseDetail.data.favData.count}`);
	// 	await delay(100);
	// }

	// const aaa = await postLineNofity("Yoo man");
	// console.log(aaa)
}

const job = new CronJob('* * * * * *', function() {
	start();
}, null, true, 'Asia/Taipei');
job.start();