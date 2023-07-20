const HouseKind = Object.freeze({
	"NoLimit": "0",			// 不限
	"WholeFloor": "1",		// 整層住家
	"IndependentSuite": "2",// 獨立套房
	"SubletSuite": "3"		// 分租套房
});

const MultiPrice = Object.freeze({
	"RangeUnder5000": "0_5000",			// 5000以下
	"Range5000to10000": "5000_10000",	// 5000~10000
	"Range10000to20000": "10000_20000",	// 10000~20000
	"Range20000to30000": "20000_30000",	// 20000~30000
	"Range30000to40000": "30000_40000",	// 30000~40000
	"RangeUp40000": "40000_",			// 40000以上
});

module.exports = {
	HouseKind,
	MultiPrice
}