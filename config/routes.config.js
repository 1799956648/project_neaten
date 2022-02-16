/* 
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.login,query:{a:1}})
 * 如果不需要传数据到下个页面,query可以不加
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 * 
 * 配置参数项说明： 
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 */

export default {
	/**
	 * 权限路由
	 * 遇到页面名称中 带有 - 的，要改为 _
	 */

	/* 登录、欢迎、应用页面展示 */
	login: {
		name: "登录",
		path: "pages/login/login",
	},
	reg: {
		name: "注册",
		path: "pages/reg/reg",
	},
	sq: {
		name: "注册",
		path: "pages/sq/sq",
	},
	welcome: {
		name: "欢迎页",
		path: "pages/welcome/welcome",
	},
	xzsq: {
		name: "协助授权",
		path: "pages/xzsq/xzsq",
	},
	print: {
		name: "打印预览",
		path: "pages/print/print",
	},

	/* 应用页面 */
	main: {
		name: "首页",
		path: "pages/apply-index/main",
	},
	apply_index: {
		name: "应用页",
		path: "pages/apply-index/apply-index",
	},
	index: {
		name: "首页",
		path: "pages/apply-index/index",
	},
	wo: {
		name: "我的",
		path: "pages/apply-index/wo",
	},
	ds: {
		name: "待扫",
		path: "pages/apply-index/ds",
	},
	jgs_index: {
		name: "加工商首页",
		path: "pages/jgs_index/jgs_index",
	},



	/* 布匹主要应用页面 */
	bpnc: {
		name: "布匹挪仓",
		path: "pages/bpnc/bpnc",
	},
	tmpd_stm: {
		name: "条码盘点-扫条码",
		path: "pages/tmpd-stm/tmpd-stm",
	},
	tmpd_tj: {
		name: "条码盘点-统计",
		path: "pages/tmpd-tj/tmpd-tj",
	},
	ghbq_tj: {
		name: "更换标签-统计",
		path: "pages/ghbq-tj/ghbq-tj",
	},
	ghbq_edit: {
		name: "更换标签-编辑",
		path: "pages/ghbq-edit/ghbq-edit",
	},
	fhcj: {
		name: "发货采集",
		path: "pages/fhcj/fhcj",
	},
	ddxq: {
		name: "剪样订单",
		path: "pages/ddxq/ddxq",
	},
	bpnc_cx: {
		name: "布匹挪仓-查询",
		path: "pages/bpnc-cx/bpnc-cx",
	},
	fhd: {
		name: "发货单",
		path: "pages/fhd/fhd",
	},
	
	bp_fhcj_xx: {
		name: "布匹-发货采集-信息",
		path: "pages/bp-fhcj-xx/bp-fhcj-xx",
	},
	
	bp_ddcj_xx: {
		name: "布匹-订单采集-信息",
		path: "pages/bp-ddcj-xx/bp-ddcj-xx",
	},
	
	fhd_tj: {
		name: "发货单统计",
		path: "pages/fhd-tj/fhd-tj",
	},
	fhd_ycjtm: {
		name: "已采集条码",
		path: "pages/fhd-ycjtm/fhd-ycjtm"
	},
	fhd_bj: {
		name: "已采集条码",
		path: "pages/fhd-bj/fhd-bj"
	},
	cjjl: {
		name: "采集记录",
		path: "pages/cjjl/cjjl"
	},
	ckhy_tj: {
		name: "出库核验-统计",
		path: "pages/ckhy-tj/ckhy-tj"
	},
	ckhy_bj: {
		name: "出库核验-编辑",
		path: "pages/ckhy-bj/ckhy-bj"
	},
	pdrk_tj: {
		name: "盘点入库-统计",
		path: "pages/pdrk-tj/pdrk-tj"
	},
	pdrk_bj: {
		name: "盘点入库-编辑",
		path: "pages/pdrk-bj/pdrk-bj"
	},
	qtck_tj: {
		name: "其他出库",
		path: "pages/qtck-tj/qtck-tj",
	},
	qtck_bj: {
		name: "其他出库-编辑",
		path: "pages/qtck-bj/qtck-bj"
	},
	lx_sm: {
		name: "离线-扫码",
		path: "pages/lx-sm/lx-sm"
	},
	tmcx: {
		name: "条码查询",
		path: "pages/tmcx/tmcx"
	},
	rclh_tj: {
		name: "染厂来货-统计",
		path: "pages/rclh-tj/rclh-tj"
	},
	rclh_bj: {
		name: "染厂来货-编辑",
		path: "pages/rclh_bj/rclh_bj"
	},
	rcwc_tj: {
		name: "染厂完成-统计",
		path: "pages/rcwc_tj/rcwc_tj"
	},
	rcwc_bj: {
		name: "染厂完成-手动编辑",
		path: "pages/rcwc_bj/rcwc_bj"
	},
	rcwc_zdpp: {
		name: "染厂完成-自动匹配",
		path: "pages/rcwc_zdpp/rcwc_zdpp"
	},
	
	bp_xsth_tj: {
		name: "布匹-销售退货-统计",
		path: "pages/bp-xsth-tj/bp-xsth-tj",
	},
	
	bp_xsthbj_zdms: {
		name: "布匹-销售退货-自动模式",
		path: "pages/bp-xsth-zdms/bp-xsth-zdms",
	},
	
	bp_xsthbj_sdms: {
		name: "布匹-销售退货-手动模式",
		path: "pages/bp-xsth-sdms/bp-xsth-sdms",
	},


	/* 纱线主要应用页面 */
	sx_lscj_tj: {
		name: "领纱采集-统计",
		path: "pages/sx-lscj-tj/sx-lscj-tj",
	},
	sx_lscj_bj: {
		name: "领纱采集-编辑",
		path: "pages/sx-lscj-bj/sx-lscj-bj",
	},
	sx_lscj_xx: {
		name: "领纱采集-信息",
		path: "pages/sx-lscj-xx/sx-lscj-xx",
	},
	sx_lscj_ycjtm: {
		name: "领纱采集-已采集条码",
		path: "pages/sx-lscj-ycjtm/sx-lscj-ycjtm"
	},
    sx_ghbq_tj: {
		name: "更换标签-统计",
		path: "pages/sx-ghbq-tj/sx-ghbq-tj",
	},
	sx_ghbq_edit: {
		name: "更换标签-编辑",
		path: "pages/sx-ghbq-edit/sx-ghbq-edit",
	},
	
	sxnc_tj: {
		name: "纱线挪仓-统计",
		path: "pages/sxnc-tj/sxnc-tj",
	},
	sxnc_bj: {
		name: "纱线挪仓-编辑",
		path: "pages/sxnc-bj/sxnc-bj",
	},
	sx_lsd_tj: {
		name: "领纱单-统计",
		path: "pages/sx-lsd-tj/sx-lsd-tj",
	},
	sx_lsd_bj: {
		name: "领纱单-编辑",
		path: "pages/sx-lsd-bj/sx-lsd-bj",
	},
	sx_lscjjl: {
		name: "纱线-领纱采集记录",
		path: "pages/sx-lscjjl/sx-lscjjl",
	},
	sx_ds_ddxq: {
		name: "纱线-待扫-订单详情",
		path: "pages/sx-ds-ddxq/sx-ds-ddxq",
	},
	sx_ddcj_xx: {
		name: "纱线-订单采集信息",
		path: "pages/sx-ddcj-xx/sx-ddcj-xx",
	},
	sx_ddcj_ycjtm: {
		name: "纱线-订单采集-已采集条码",
		path: "pages/sx-ddcj-ycjtm/sx-ddcj-ycjtm",
	},
	sx_rswc_tj: {
		name: "纱线-染纱完成-统计",
		path: "pages/sx-rswc-tj/sx-rswc-tj",
	},
	sx_rswcbj_sdms: {
		name: "纱线-染纱完成-手动模式",
		path: "pages/sx-rswcbj-sdms/sx-rswcbj-sdms",
	},
	sx_rswcbj_zdms: {
		name: "纱线-染纱完成-自动模式",
		path: "pages/sx-rswcbj-zdms/sx-rswcbj-zdms",
	},
	
	sx_rslh_tj: {
		name: "纱线染纱来货-统计",
		path: "pages/sx-rslh-tj/sx-rslh-tj"
	},
	sx_rslh_bj: {
		name: "纱线染纱来货-编辑",
		path: "pages/sx-rslh-bj/sx-rslh-bj"
	},

	/* 选产品、仓库、等等...组件页面 */
	select_cp: {
		name: "选产品",
		path: "pages/select-cp/select-cp",
	},
	select_cw: {
		name: "选仓位",
		path: "pages/select-cw/select-cw",
	},
	select_kh: {
		name: "选客户",
		path: "pages/select-kh/select-kh",
	},
	select_lxr: {
		name: "选联系人",
		path: "pages/select-lxr/select-lxr",
	},
	select_yg: {
		name: "选员工",
		path: "pages/select-yg/select-yg",
	},
	select_ys: {
		name: "选颜色",
		path: "pages/select-ys/select-ys",
	},
	select_ck: {
		name: "选仓库",
		path: "pages/select_ck/select_ck",
	},
	select_gg: {
		name: "选规格",
		path: "pages/select-gg/select-gg",
	},

	select_bb: {
		name: "选报表",
		path: "pages/select_bb/select_bb",
	},

	select_print: {
		name: "选打印机",
		path: "pages/select_print/select_print",
	},
	/* 更多设置 */
	zxkf: {
		name: "在线客服",
		path: "pages/zxkf/zxkf",
	},
	about: {
		name: "关于",
		path: "pages/about/about",
	},
	change_password: {
		name: "修改密码",
		path: "pages/apply-index/wo-more/change-password",
	},
	help_zx: {
		name: "帮助中心",
		path: "pages/apply-index/wo-more/help-zx",
	},
	more_setting: {
		name: "更多设置",
		path: "pages/apply-index/wo-more/more-setting",
	},

	version_updating: {
		name: "版本更新",
		path: "pages/version_updating/version_updating",
	},
	select_sxxz: {
		name: "选择纱线性质",
		path: "pages/select-sxxz/select-sxxz",
	},
	
	// 权限跳转页面
	glms: {
		name: "管理模式",
		path: "pages/glms/glms",
	},
	
	/* 赋值展示的页面 */
	cjsc: {
		name: "采集上传",
		path: "pages/cjsc/cjsc",
	}
}
