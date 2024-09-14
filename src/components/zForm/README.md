# 组件设计说明

设计初衷:解决form表单大量重复工作的问题,把常用的表单原件封装到一起,方便后续表单开发.

## 设计思路

原则上此组件不处理业务问题,不会写业务代码,如果无法满足业务功能,请使用custom自定义功能,或者使用原生表单组件.

## 使用文档

看demo.vue,里面有详细的使用过程.

### 注意事项

1. radio需要注意，使用了radio-group，即使一个的情况也要写options。详细文档参考：[RadioGroup 组合 - 配置方式](https://blue-whale.haier.net/design-vue/components/radio)
2. 所有内部组件不提供插槽.后续赠加
3. 内部组件的事件可以写在attrs中,需要加on前缀,如onBlur
4. select组件使用options写法,不支持插槽
5. radio和checkbox暂时只支持组的写法

| type | 组件     | 备注              |
|------|--------|-----------------|
| input  | 输入框    |
| textarea  | 多行输入框  |
| inputPassword  | 密码输入框  |
| inputNumber  | 数字输入框  |
| radio  | 选择框组   | 只支持组,即使是一个也要写数组 |
| checkbox  | 多选框组   |只支持组,即使是一个也要写数组 |
| rate  | 评分     |
| select  | 选择器    |
| cascader  | 级联选择器  |
| treeSelect  | 树形选择器  |
| slider  | 滑块     |v-model:checked|
| switch  | 开关     |
| timePicker  | 时间选择   | 时分秒选泽           |
| timeRangePicker  | 时间范围选择 | 开始时间和结束时间       |
| datePicker  | 日期选择   | 年月日,可添加时分秒      |


