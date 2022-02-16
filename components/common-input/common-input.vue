<template>
	<view>
		<input
			ref="ipt"
			type="text"
			:placeholder="placeholder"
			:placeholder-class="placeholderClass"
			:placeholder-style="placeholderStyle"
			:confirm-type="confirmType"
			:id="selfInputType"
			:value="selfValue"
			:maxlength="maxLength"
			:auto-blur="keyboardCloseBlur"
			:adjust-position="adjustPosition"
			:disabled="disabled"
			:change:id="inputElement.setCurSelector"
			@focus="inputElement.selectFoucs"
			@input="input"
			@blur="inputBlur"
			@confirm="inputConfirm"
			@keyboardheightchange="keyboardHeightChange"
		/>
	</view>
</template>

<script>
	const numberFormat = new (require('../../common/js/class/NumberFormat.js')).default();

	export default {
		name: 'CommonInput',

		model: {
			prop: 'value',
			event: 'input'
		},

		props: {
			// 是否禁用
			maxLength: {
				type: Number,
				default: -1,
			},

			// 是否禁用
			disabled: {
				type: Boolean,
				default: false,
			},

			// 键盘收起时，是否自动失去焦点
			keyboardCloseBlur: {
				type: Boolean,
				default: false,
			},

			// 键盘弹起时，是否自动上推页面
			adjustPosition: {
				type: Boolean,
				default: false,
			},

			// 占位符
			placeholder: {
				type: String,
				default: ''
			},

			// 指定 placeholder 的样式类
			placeholderClass: {
				type: String,
				default: '',
			},

			// 指定 placeholder 的样式
			placeholderStyle: {
				type: String,
				default: '',
			},

			// input类型，标识唯一key
			inputType: {
				type: String,
				default: '',
			},

			// input内容
			value: {
				type: [String, Number],
				default: '',
			},
			
			// 设置键盘右下角按钮的文字，仅在 type="text" 时生效。
			confirmType: {
				type: String,
				default: '',
			},

			// 限制输入的内容类型
			numberType: {
				type: String,
				default: 'unrestraint',
			},
			
			// 浮点数保留的小数位
			decimalPlaces: {
				type: [Number, String],
				default: 4,
			}
		},

		data() {
			return {
				originValue: '',
				selfValue: this.value,
				selfInputType: '',
				inputTimer: null,
				keyboardChangeTimer: null
			};
		},

		watch: {
			value: {
				handler(newValue) {
					this.selfValue = newValue;
				},
				immediate: true,
			},
			inputType: {
				handler(newValue) {
					setTimeout(() => {
						this.selfInputType = this.inputType;
					}, 100);
				},
				immediate: true,
			},
		},
		
		methods: {
			// input输入触发
			input(e) {
				const val =
					numberFormat.formatNumber({
						value: e.detail.value,
						numberType: this.numberType,
						decimalPlaces: this.decimalPlaces,
					}) + ' ';
					
				this.$set(this.$data, 'selfValue', val);

				clearTimeout(this.inputTimer);
				
				this.inputTimer = setTimeout(() => {
					this.$set(this.$data, 'selfValue', val.trim());
					
					this.$emit('input', val.trim(), {
						value: this.value,
						originValue: this.originValue,
						inputType: this.inputType
					});
				}, 20);
			},

			// input聚焦触发
			inputFocus(e) {
				this.$set(this.$data, 'originValue', this.selfValue);

				this.$emit('focus', {
					value: this.selfValue,
					originValue: this.originValue,
					inputType: this.inputType,
				});
			},
			
			// input失焦触发
			inputBlur() {
				this.$emit('blur', {
					value: this.selfValue,
					originValue: this.originValue,
					inputType: this.inputType,
				});
			},
			
			// input点击键盘确认按钮触发
			inputConfirm() {
				this.$emit('confirm', {
					value: this.selfValue,
					originValue: this.originValue,
					inputType: this.inputType,
				});
			},
			
			// 键盘高度发生变化触发（打开 | 关闭）
			keyboardHeightChange({ detail: { height } }) {
				clearTimeout(this.keyboardChangeTimer);

				this.keyboardChangeTimer = setTimeout(() => {
					this.$emit(Number(height) ? 'keyboard-open' : 'keyboard-close', {
						value: this.selfValue,
						originValue: this.originValue,
						inputType: this.inputType,
					});
				}, 100);
			}
		}
	};
</script>

<script module="inputElement" lang="renderjs">
	/* 
		
		nui-app 平台提供的聚焦选项 selection-start 、selection-end，无法实现 input 自动聚焦。
		故通过 render.js 开放dom操作的环境，并回调逻辑层的方法，实现 input 自动聚焦（在app上不能调用逻辑层的方法）
		
		APP 端可以使用 dom、bom API，不可直接访问逻辑层数据，不可以使用 uni 相关接口（如：uni.request）
		H5 端逻辑层和视图层实际运行在同一个环境中，相当于使用 mixin 方式，可以直接访问逻辑层数据。
		app 端通过 视图层 观察 逻辑层数据变化，实现 普通 script 与 render.js script 通信
		逻辑层数据变化 -> 视图层接收逻辑层数据实现需求
	 */
	const inpuAutoSelect = function (idSelector) {
		setTimeout(() => {
			document.querySelector(`#${idSelector} .uni-input-input`).select();
		}, 50);
	};

	export default {
		data() {
			return {
				selfVueInstance: null,
				idQuerySelector: '',
			};
		},
		methods: {
			// input自动聚焦
			selectFoucs(e, ownerInstance) {
				inpuAutoSelect(this.idQuerySelector);
				
				// 回调逻辑层的方法
				ownerInstance.callMethod('inputFocus');
			},
			
			// 设置当前选择器
			setCurSelector(newValue, oldValue, ownerVm, vm) {
				this.idQuerySelector = newValue;
			}
		}
	}
</script>

<style lang="scss" scoped></style>
