const isCache = function() {
	// 开发环境
	if (process.env.NODE_ENV === 'development') {
		return true;
	}

	// 生产环境
	if (process.env.NODE_ENV === 'production') {
		return false;
	};
	return true;
}

// 当前环境
const NOW_ENV = '71';

const envConfig = {
	71: { // 71开发环境
		$CLOUD_PRINT_URL: 'http://192.168.2.71:8082/print/', // 云打印地址
		$CLOUD_SERVICES: '192.168.2.76:2348', // 云服务 socket地址
		$VERSION: '3.1.2',
		$APP_VERSION: '2.1.2.b',
		$httpUrl: 'http://192.168.2.71:5000/api',
		$IMG_URL: 'http://192.168.2.71/bh_img/',
		$SERV_URL: {
			// "web_serv":"http://192.168.2.71/yby-web-serv/v3.5.3.20210801.nzms2/public/test.php/",
			
			web_serv: 'http://192.168.2.23/serv/v3.5.5.1101/public/test.php/',
			
			// "web_serv":"http://192.168.2.71/yby-web-serv/v3.5.5.20211101/public/test.php/",
			// "web_serv":"http://192.168.2.23/web/v3.5.5.1101/public/test.php/",
			// web_serv: 'http://192.168.2.140/online/bh-web-serv-3-5-5-online/public/test.php/',
			// 'web_serv': 'http://192.168.2.71/yby-web-serv/v3.5.3.20210907/public/test.php/',
			// 'web_serv': 'http://192.168.2.35:9096/bh/bh-web-serv/3-5-3-online/public/test.php/'
		},
	},
	'71sxtm': { // 71 纱线条码 开发环境
		$CLOUD_PRINT_URL: 'http://192.168.2.71:8082/print/', // 云打印地址
		$CLOUD_SERVICES: '192.168.2.76:2348', // 云服务 socket地址
		$VERSION: '3.1.2',
		$APP_VERSION: '2.1.2.b',
		$httpUrl: 'http://192.168.2.71:5000/api',
		$IMG_URL: 'http://192.168.2.71/bh_img/',
		$SERV_URL: {
			// "web_serv": "http://192.168.2.23/serv/v3.5.0.sxtm/public/test.php/",
			'web_serv': 'http://192.168.2.71/yby-web-serv/v3.5.0.20210501.sxtm/public/test.php/',
		},
	},
	76: { // 76开发环境
		$CLOUD_PRINT_URL: 'http://192.168.2.76:8082/print/', // 云打印地址
		$VERSION: '3.1.2',
		$APP_VERSION: '2.1.2.c',
		$httpUrl: 'http://gd932kj.gnway.org:7680/api',
		$IMG_URL: 'https://yby-res-test.obs.cn-south-1.myhuaweicloud.com',
		$SERV_URL: {
			// 'web_serv': 'http://gd932kj.gnway.org:7680/bh-web-serv-3-0-0/public/test.php/',
			"user_serv": "http://gd932kj.gnway.org:7651/",
			// "web_serv":"http://gd932kj.gnway.org:7680/bh-web-serv/public/test.php/",
			"web_serv": 'http://gd932kj.gnway.org:7680/bh-web-serv-dev/public/test.php/'
		},
	},
	online: { // 生产环境
		$CLOUD_PRINT_URL: 'https://prt.yunbuye.cn/print/', // 云打印地址
		$CLOUD_SERVICES: 'site.yunbuye.cn:80', // 云服务 socket地址
		$VERSION: '3.1.2',
		$APP_VERSION: '3.5.3.b_02',
		$httpUrl: 'https://apis.yunbuye.cn/api',
		$IMG_URL: 'https://cdn2-res.yunbuye.cn',
		$SERV_URL: {},
	}
};

/*
	$is_cache: 删除帐套缓存和仓库缓存
*/
export default Object.assign({
	$is_cache: isCache()
}, envConfig[NOW_ENV]);
