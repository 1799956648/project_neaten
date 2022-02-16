# cjq-filters 抽屉搜索



## 介绍

> 高级搜索，适用于统计类型的页面筛选数据



## 引入

> 已实现组件自动注册，无需在页面注册，直接使用该组件



## 代码演示



### 基础用法

> 以下仅提供简单数据结构参考

```js
const opts = {
    sort: this.memory.search.sort,
    input: [
        {
            key: 'fk',
            text: '幅宽',
            value: ''
            originValue: '',
            id: 0,
            queryKey: 'fk',
            queryValue: 'value',
        },
        {
            key: 'kz',
            text: '克重',
            value: '',
            originValue: '',
            id: 0,
            queryKey: 'kz',
            queryValue: 'value',
        },
        {
            key: 'jh',
            text: '卷号',
            value: '',
            originValue: '',
            id: 0,
            queryKey: 'jh',
            queryValue: 'value',
        }
    ],
    choose: [
        {
            type: 'jump',
            key: 'gg',
            text: '规格',
            value: '',
            id: 0,
            queryKey: 'gg',
            queryValue: 'value',
            auth() {
                if (that.$isEmpty(Number(that.stockQueryConditions.cp_id))) {
                    that.$showToast('请先选择产品。');
                    return false;
                };
                return true;
            },
            params: {
                route: this.$mRoutesConfig.select_gg,
                query: {
                    cp_id: 197,
                    cp_bh: '1',
                    cp_mc: '2',
                    page_type: 'bp_tmcx',
                    back_type: true,
                }
            },
        },
        {
            type: 'multiple',
            key: 'group_mx',
            text: '汇总',
            value: joinStr(this.filterPreferencesListSelected(this.filterSummaryListByAuth), 'name', '、'),
            id: joinStr(this.filterPreferencesListSelected(this.filterSummaryListByAuth), 'value', '、'),
            list: this.filterSummaryListByAuth,
        },
        {
            type: 'jump',
            key: 'ywy',
            text: '业务员',
            value: '',
            id: 0,
            queryKey: 'ywy_id',
            queryValue: 'id',
            auth() {
                return true;
            },
            params: {
                route: this.$mRoutesConfig.select_yg,
                query: {
                    page_type: 'bp_tmcx',
                }
            },
        },
    ].concat(
        this.authCheck('yxckbpkgj', 'view')
        ? 
        [
            {
                type: 'jump',
                key: 'kh',
                text: '客户',
                value: '',
                id: 0,
                queryKey: 'bp_kh_id',
                queryValue: 'id',
                auth() {
                    return true;
                },
                params: {
                    route: this.$mRoutesConfig.select_kh,
                    query: {
                        page_type: 'bp_tmcx',
                        select_type: 'kh',
                        back_type: true, // 点击记录行不返回
                        goodsType: 'bp', // 查询纱线模块的数据
                    }
                },
            },
            {
                type: 'jump',
                key: 'gys',
                text: '供应商',
                value: '',
                id: 0,
                queryKey: 'bp_gys_id',
                queryValue: 'id',
                auth() {
                    return true;
                },
                params: {
                    route: this.$mRoutesConfig.select_kh,
                    query: {
                        page_type: 'bp_tmcx',
                        select_type: 'gys',
                        back_type: true, // 点击记录行不返回
                        goodsType: 'bp', // 查询纱线模块的数据
                    }
                },
            },
            {
                type: 'jump',
                key: 'jgs',
                text: '加工商',
                value: '',
                id: 0,
                queryKey: 'bp_jgs_id',
                queryValue: 'id',
                auth() {
                    return true;
                },
                params: {
                    route: this.$mRoutesConfig.select_kh,
                    query: {
                        page_type: 'bp_tmcx',
                        select_type: 'jgs',
                        back_type: true, // 点击记录行不返回
                        goodsType: 'bp', // 查询纱线模块的数据
                    }
                },
            }
        ]
        :
        []
    ),
    switch: this.memory.search.switch,
}
```



```vue
<cjq-filters
	v-model="opts"
/>
```



## API

### Props

|   参数    |            说明            |   类型   | 默认值 |
| :-------: | :------------------------: | :------: | :----: |
| `v-model` | 双向绑定配置项，做数据同步 | `Object` |  `{}`  |
|  `opts`   |           配置项           | `Object` |  `{}`  |
|  `btns`   |          底部按钮          | `Array`  |  `[]`  |



### opts 数据格式

|   key    | 说明 |   类型   |
| :------: | :--: | :------: |
|  `sort`  | 排序 | `Object` |
| `input`  | 输入 | `Array`  |
| `choose` | 选择 | `Array`  |
| `switch` | 开关 | `Array`  |



#### opts.sort 数据格式

|  key   |   说明   |   类型   |
| :----: | :------: | :------: |
| `text` | 选项描述 | `String` |
| `list` |   列表   | `Array`  |



##### opts.sort.list 数据格式

> 每个子项为对象形式

|   key   |       说明        | 类型 |
| :-----: | :---------------: | :--: |
|  `key`  | `key`名，标识唯一 |  ``  |
| `text`  |     选项描述      |      |
| `value` |     显示文本      |      |



#### opts.input 数据格式

>  每个子项为对象形式

|      key      |          说明          |      类型       |
| :-----------: | :--------------------: | :-------------: |
|     `key`     |   `key`名，标识唯一    |    `String`     |
|    `text`     |        选项描述        |    `String`     |
|    `value`    |        显示文本        |    `String`     |
| `originValue` |    未改变之前的文本    |    `String`     |
|     `id`      | 该值对应 `id`，没有给0 | `Number|String` |



#### opts.choose 数据格式

> 每个子项为对象形式

|   key   |                   说明                   |      类型       |
| :-----: | :--------------------------------------: | :-------------: |
|  `key`  |            `key`名，标识唯一             |    `String`     |
| `text`  |                 选项描述                 |    `String`     |
| `value` |                 显示文本                 |    `String`     |
|  `id`   |          该值对应 `id`，没有给0          | `Number|String` |
| `type`  | 允许多种类型（`jump、single、multiple`） |    `String`     |



##### `type` 为 `jump`

> 跳转页面，需增加  `auth` 、 `param` 选项

|   key    |                 说明                 |    类型    |
| :------: | :----------------------------------: | :--------: |
|  `auth`  | 校验器，是否通过 `true | false` 决定 | `Function` |
| `params` | 跳转参数，详细参数跟跳转页面传参一样 |  `Object`  |



##### `type` 为 `single`

> 单选弹窗，需增加 `list` 选项，`list`  子项为多个对象，具体参数同多选弹窗组件



##### `type` 为 `multiple`

> 多选弹窗，需增加 `list` 选项，`list`  子项为多个对象，具体参数同多选弹窗组件



#### opts.switch 数据格式

> 每个子项为对象形式

|    key     |       说明        |   类型    |
| :--------: | :---------------: | :-------: |
| `disabled` |     是否禁用      | `Boolean` |
|   `text`   |     选项描述      | `String`  |
|   `key`    | `key`名，标识唯一 | `String`  |
|  `value`   |     显示文本      | `String`  |



### Events

|      事件名      |          说明          |                   回调参数                    |
| :--------------: | :--------------------: | :-------------------------------------------: |
|     `change`     | 修改配置项内数据项触发 | `opts`：配置项<br />`hasOpen`：是否打开搜索页 |
|  `single-close`  |    单选弹窗关闭触发    |             `content`：当前选中项             |
| `multiple-close` |    多选弹窗关闭触发    |             `content`：多个选中项             |
|  `input-focus`   | `input` 输入框聚焦触发 |               无返回                                |
