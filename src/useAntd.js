// antd按需引入
// 因为安装了unplugin-vue-components插件，不需要手动import。这部分只是针对需要手动import的组件，比如zForm组件的is动态组件

import {
    Input,
    Textarea,
    InputPassword,
    InputNumber,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Rate,
    Select,
    Cascader,
    TreeSelect,
    Slider,
    Switch,
    TimePicker,
    TimeRangePicker,
    DatePicker,
    RangePicker,
} from "ant-design-vue";

export function install(app) {
    app.use(Input)
        .use(Textarea)
        .use(InputPassword)
        .use(InputNumber)
        .use(Radio)
        .use(RadioGroup)
        .use(Checkbox)
        .use(CheckboxGroup)
        .use(Rate)
        .use(Select)
        .use(Cascader)
        .use(TreeSelect)
        .use(Slider)
        .use(Switch)
        .use(TimePicker)
        .use(TimeRangePicker)
        .use(DatePicker)
        .use(RangePicker)
}

