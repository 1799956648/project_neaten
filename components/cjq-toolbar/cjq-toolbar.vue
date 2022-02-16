<template>
	<view class="toolbar">
		<view
			v-for="({ placeholder, value, key, type, width }, idx) of list"
			
			class="toolbar-column toolbar-column--spacing"
			:style="addMinWidth(width)"
			:key="idx"
			
			@tap="columnTap(key)"
		>
			<cjq-input
				v-model="list[idx].value"
				
				type="text"
				class="toolbar-column__ipt"
				:zsTtpe="key"
				:disabled=" type !== 'input' "
				:placeholder="placeholder"
				:value="list[idx].value"
				:keyboard-close-blur="true"
				
				@focus="iptFocus(list[idx])"
				@keyboard-close="keyboardClose.call(null, list[idx], ...arguments)"
			/>
				<!-- @blur="iptBlur.call(null, list[idx], ...arguments)" -->
			<text
				v-show=" $isEmpty(value) && type === 'arrow' "
				
				class="iconfont icon-xiala toolbar-column__icon toolbar-column__icon--arrow"
			/>
			<text 
				v-show="$isTrue(value)"
				
				class="iconfont icon-quxiao toolbar-column__icon toolbar-column__icon--clear"
				
				@tap.stop="clear(key, list[idx])"
			/>
		<!-- 	<view 
				v-for="({ placeholder, value, key, type }, groupIdx) of group"
				class="flex justify-center align-center text-center bg-white border-bottom toolbar-column toolbar-column--spacing"
				:key="key"
			>
				@tap="columnTap(key)"
				
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CjqToolbar',

		components: {},

		filters: {},

		mixins: [],

		model: {
			prop: 'list',
			event: 'input'
		},

		props: {
			list: {
				type: Array,
				default: () => ([]),
			}
		},

		data() {
			return {};
		},

		watch: {},

		beforeCreate() {},

		created() {},

		beforeMount() {},

		mounted() {},

		beforeUpdate() {},

		updated() {},

		activated() {},

		deactivated() {},

		beforeDestroy() {},

		destroyed() {},

		errorCaptured(err, vm, info) {},

		methods: {
			clear(type, values) { // 清除
				// 触发对应对象的set拦截
				this.$eachAssignTarget(values, {
					value: '',
					id: 0,
				});
				
				// 发送清除事件
				this.$emit('clear', type);
			},
			
			addMinWidth: val => ({
				maxWidth: val,
				minWidth: val,
			}),
			
			iptFocus(values) { // input聚焦
				this.$eachAssignTarget(values, {
					originValue: values.value,
				});
				this.$emit('input-focus');
			},
			
			keyboardClose(values, {value, type}) { // 键盘收起
				this.$emit('keyboard-close', {
					value: String(value.trim()),
					originValue: values.originValue,
					type,
				});
			},
			
			iptBlur(values, value, idx, type) { // input失焦
				this.$emit('keyboard-close', {
					value: String(value.trim()),
					originValue: values.originValue,
					type,
				});
			},
			
			columnTap(type) { // 列点击
				this.$emit('column-tap', type);
			},
		},

	}
</script>

<style lang="scss" scoped>
	.toolbar {
		@extend .flex, .overflow-x-hidden, .flex-wrap, .bg-white;
	}

	.toolbar-column {
		@extend .flex, .align-center, .text-center, .flex-1, .box-sizing, .border-bottom;
		box-sizing: border-box;
	}
	
	.toolbar-column--spacing {
		padding: 0 10rpx;
	}
		
	page {
		.toolbar-column /deep/ .toolbar-column__ipt {
			width: calc(100% - 50rpx);
			color: #45b8ea;
				
			input {
				font-size: 28rpx;
			}
		}
	}
	
	.toolbar-column__icon {
		@include touchOffset(0, 20rpx);
		
		@extend .base-line-height, .font-25;
		
		min-width: 50rpx;
		text-align: center;
	}
	
	.toolbar-column__icon--arrow {
		@extend .color-gray2;
	}
	
	.toolbar-column__icon--clear {
		@extend .color-blue;
	}
</style>
