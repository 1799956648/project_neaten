export default {
	/**
	 * 权限检查
	 * @param { String } winName 窗口名称
	 * @param { String } authName 权限名称
	 * @return { Boolean } 该窗口是否有该权限
	 */
	authCheck({ authority }) {
		return (winName, authName) => !!(Number(authority?.[winName]?.[authName]));
	},
	
	/**
	 * 过滤已选偏好设置列表
	 */
	filterPreferencesListSelected() {
		return preferenceList => preferenceList.filter(preferences => preferences.select_type);
	},
}