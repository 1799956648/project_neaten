<template>
    <view class="drawer">
		<uni-drawer
			class="drawer__main"
			ref="drawer"
			mode="right"
			:mark="true"
			:mask-click="true"
			
			@change="change"
		>
		
			<!-- 内容做滚动视图，实现记忆滚动位置 -->
			<scroll-view
				class="drawer__scroll"
				scroll-y="true"
				@touchmove.stop.prevent="e => { e.stopPropagation }"
			>
				<!-- :scroll-top="scrollTop"
				@scroll="$set($data, 'scrollTop', $event.detail.scrollTop)" -->
				
				<!-- 内容 -->
				<view class="drawer__content">
					<view 
						v-for="(groupValues, groupKey) in opts"
						
						class="group"
						:key="groupKey"
					>
						<!-- 排序 -->
						<template v-if=" groupKey === 'sort' ">
							<view
								class="row"
							>
								<text class="row__desc">{{ groupValues.text }}</text>
								<view
									v-for="(sortValues, sortIdx) in groupValues.list"
									
									class="sort row__sort"
									:key="sortIdx"
									
									@tap="sort(sortValues)"
								>
									<text 
										class="sort__desc"
										:class="addActiveColor(sortValues.value)"
									>
										{{ sortValues.text }}
									</text>
									<view class="arrow-group sort__arrow-group">
										<text 
											class="iconfont icon-shang2 arrow-group__font"
											:class="addActiveColor(sortValues.value === 'asc')"
										>
										</text>
										<text 
											class="iconfont icon-xia arrow-group__font"
											:class="addActiveColor(sortValues.value === 'desc')"
										>
										</text>
									</view>
								</view>
							</view>
						</template>
						
						<!-- 输入 -->
						<template v-if=" groupKey === 'input' ">
							<view
								v-for="(iptValues, iptIdx) of groupValues"
								
								class="row"
								:key="iptIdx"
							>
								<text class="row__desc">{{ iptValues.text }}</text>
								<cjq-input
									v-model="iptValues.value"
									
									class="row__value"
									:zsTtpe="iptValues.key"
									:value="iptValues.value"
									:keyboard-close-blur="true"
									
									@focus="inputFocus(iptValues)"
								/>
								<text
									 v-show="iptValues.value"
									 
									 class="iconfont icon-quxiao row__clear"
									 
									 @tap="$eachAssignTarget(iptValues, {
										 value: '',
										 id: 0,
									 })"
								/>
							</view>
						</template>
						
						<!-- 选择 -->
						<template v-if=" groupKey === 'choose' ">
							<view
								v-for="(chooseValues, chooseIdx) of groupValues"
								
								:key="chooseIdx"
								class="row"
							>
								<text class="row__desc">{{ chooseValues.text }}</text>
								<text 
									class="row__value"
									
									@tap="rowValueTap(chooseValues)"
								>
									{{ chooseValues.value }}
								</text>
								
								<!-- 清除按钮 -->
								<text
									v-show="isShowClearBtn(chooseValues)"
									
									class="iconfont icon-quxiao row__clear"
									
									@tap="$eachAssignTarget(chooseValues, {
										value: '',
										id: 0,
									})"
								/>
								
								<!-- 跳转按钮 -->
								<text
									v-show="!isShowClearBtn(chooseValues)"
									
									class="iconfont icon-youfanhui row__clear"
								/>
							</view>
						</template>
						
						<!-- 开关 -->
						<template v-if=" groupKey === 'switch' ">
							<view
								v-for="(switchValues, switchIdx) of groupValues"
								
								:key="switchIdx"
								class="row"
							>
								<text class="row__desc">{{ switchValues.text }}</text>
								<switch
									class="row_switch"
									type="switch"
									style="transform: scale(0.6);" 
									color="#38B9FD" 
									:disabled="switchValues.disabled"
									:checked="switchValues.value"
									
									@change="$set(switchValues, 'value', $event.target.value)"
								/>
							</view>
						</template>
					</view>
				</view>
			</scroll-view>
		
			<!-- 底部按钮 -->
			<view class="footer drawer__footer">
				<cjq-submit-btn
					class="footer__btn"
					:isAddBoxshadow="false"
					:btn="btns" 
					:is_bgWhite="true"
					
					@onSubmit="footerBtnTap"
				/>
			</view>
		</uni-drawer>
	
		<!-- 单选 -->
		<cjq-select
			ref="single" 
			:status="true"
			:list="popupSelect.single.list"
			
			@change="singleChange"
		/>
		
		<!-- 多选 -->
		<cjq-select 
			ref="multiple" 
			:status="false"
			:list="popupSelect.multiple.list"
			
			@change="multipleChange"
		/>
    </view>
</template>

<script>
	const statusManage = new(require('common/js/class/StatusManage.js').default)();
	
	import {
		mergeRight,
	} from 'common/js/utils.js';
		
    export default {
        name: 'cjqFilters',
        
        model: {
			prop: 'opts',
			event: 'change',
		},
        
        props: {
			opts: { // 配置项
				type: Object,
				default: () => ({}),
			},
			
			btns: { // 底部按钮
				type: Array,
				default: () => ([]),
			},
		},
        
        data () {
            return {
				originOpts: {}, // 初始数据，重置功能使用
				popupSelect: {
					single: { // 单选
						key: '',
						list: [],
					},
					multiple: { // 多选
						key: '',
						list: [],
					},
				},
			};
        },
        
        methods:{
			open() {
				// 每次打开组件重置初始数据源
				this.$eachAssignTarget(this, {
					originOpts: JSON.parse(JSON.stringify(this.opts))
				});
				
				this.$openActionPopup.call(this, 'drawer');
			},
			
			close() {
				this.$closeActionPopup.call(this, 'drawer');
			},
			
			change(hasOpen) {
				this.$emit('change', this.opts, hasOpen);
			},
			
			footerBtnTap({
				name: status,
			}) {
				statusManage.execute({
					重置: () => {
						this.$emit('change', mergeRight(this.opts, this.originOpts), true);
					},
					搜索: () => {
						this.close();
					},
				}, {
					status
				})
			},
			
			sort: (function () { // 排序
				const sortStatus = ['', 'asc', 'desc'];
				return function (target) {
					let curIdx = sortStatus.findIndex( val => val === target.value );
					
					curIdx === sortStatus.length - 1 ? curIdx = 0 : curIdx++;
					
					this.$set(target, 'value', sortStatus[curIdx]);
				};
			})(),
			
			addActiveColor: condition => [condition ? 'color-blue' : null], // 选中类名
			
			isShowClearBtn: ({ type, value }) => type !== 'multiple' && value, // 是否显示清除按钮
			
			rowValueTap: (function () { // 值范围点击
				const types = {
					jump(values) { // 跳转页面
						if (values.auth()) this.$mRouter.push(values.params);
					},
					single(values) { // 单选弹窗
						this.$eachAssignTarget(this.popupSelect.single, {
							key: values.key,
							list: values.list,
						});
						this.$openActionPopup.call(this, 'single');
					},
					multiple(values) { // 多选弹窗
						this.$eachAssignTarget(this.popupSelect.multiple, {
							key: values.key,
							list: values.list,
						});
						this.$openActionPopup.call(this, 'multiple');
					},
				};
				return function (values) {
					types[values.type].call(this, values);
				};
			})(),
			
			singleChange({ // 弹出层单选关闭
				status: isTapShade,
				all_data: list,
			}) {
				if (!isTapShade) {
				};
			},
			
			multipleChange({ // 弹出层多选关闭
				status: isTapShade,
				all_data: list,
			}) {
				if (!isTapShade) {
					this.$emit('multiple-close', this.opts.choose.find(({ key }) => key === this.popupSelect.multiple.key));
				};
			},
			
			inputFocus(values) { // input聚焦
				this.$eachAssignTarget(values, {
					originValue: values.value,
				});
				this.$emit('input-focus');
			},
		},
        
    }
</script>

<style lang="scss" scoped>
	.drawer__scroll {
		overflow: hidden;
		height: 100%;
	}
	
	/* 修改 uni-popup 组件 */
	/deep/ .uni-popup {
		z-index: 1100;
	}
	
	/* 修改 uni-drawer 组件内部样式 */
	/deep/ .uni-drawer {
		top: $headerHeight;
	}
	
	/deep/ .uni-drawer__content {
		display: flex;
		width: 70% !important;
		background-color: #f7f7f7;
		flex-direction: column;
		box-sizing: border-box;
	}
	
	.drawer__content {
		@extend .overflow-y-auto, .flex-1;
	}
	
	/* 修改 cjq-submit-btn 组件 */
	page .drawer__footer /deep/ .submit {
		// position: static;
		width: 100%;
		border: none;
	}
	
	.row {
		@extend .flex, .align-center, .bg-white, .border-bottom05, .color-gray;
	}
	
	.row--padding-right {
		padding-right: 30rpx;
	}
	
	.row__desc {
		width: 140rpx;
		line-height: 120rpx;
		@extend .padding-right-30, .text-right, .font-32;
	}
	
	/deep/ .row_switch {
		margin-left: -22rpx;
	}
	
	/deep/ .row__value {
		@extend .flex, .align-center, .write-over, .flex-1, .base-input-height;
	}
	
	.row__clear {
		@extend .font-26;
		padding: 40rpx 36rpx;
	}
	
	/* 排序 */
	.row__sort {
		@extend .flex, .align-center, .flex-1, .justify-space;
		@include spaceEvenly(&);
		max-width: 33%;
	}
	
	.sort__desc {
		@extend .flex, .flex-flow, .font-30;
	}
	
	.sort__arrow-group {
		@extend .flex, .flex-flow, .align-center;
	}
	
	.arrow-group__font {
		@extend .font-28;
	}
</style>
