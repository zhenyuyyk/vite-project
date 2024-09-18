<script lang="jsx" setup>
import {productTypeList} from "@/utils/enum/product.js"
import {Form, message} from 'ant-design-vue';
import {useRouter} from 'vue-router';
// import {useListForm} from "./hook/useListForm.js"
import {ref} from "vue";

const router = useRouter();
// const {
//   formBind,
//   formState,
//   validateInfos,
//   rules,
//   columns,
// } = useListForm()
// 造100条数据
const list = []
for (let i = 0; i < 100; i++) {
  list.push({
    id: i,
    name: '商品' + (i + 1)
  })
}
const goDetail = (item) => {
  console.log('点击了商品')
  router.push({
    path: '/product/detail',
    query: {
      id: item.id
    }
  });
}
console.log("枚举", productTypeList)

// aaa
import { serviceOptions } from "@/api/product/list";
const optionsRef = ref([
  { label: "AppleLABEL", value: "Apple" },
  { label: "PearLABE", value: "Pear" },
  { label: "OrangeLABE", value: "Orange", disabled: true },
]);
const formBind = ref({
  labelCol: {
    style: {
      width: "110px",
    },
  },
  wrapperCol: {
    // offset: 1,
    span: 12,
  },
  layout: "horizontal",
  autocomplete: "off",
  class: "newForm formDemo",
});
const formState = ref({
  inputValue: "123",
  selectValue: "",
});
const rules = ref({
  inputValue: [{required: true, trigger: "blur"}],
  textareaValue: [
    {required: true, message: "Please input your password!", trigger: "blur"},
  ],
});
const columns = ref([
  {
    type: "custom",
    label: "自定义",
    name: "zidingyi",
    customRender: (val) => {
      console.log("customRender", val);
      let value = "";
      let onInput = (val) => {
        console.log("onInput");
        value = val;
      };
      return (
          <div>
            <p>自定义组件123</p>
            <p>自定义组件123</p>
            <p>自定义组件123</p>
            <h-input
                defaultValue={value}
                placeholder="自定义组件中的输入框"
                onInput={onInput}
            />
          </div>
      );
    },
  },
  {
    type: "input",
    label: "输入框",
    name: "inputValue",
    attrs: {
      placeholder: "自定义placeholder",
      showCount: true,
    },
  },
  {
    type: "textarea",
    label: "textarea输入框",
    name: "textareaValue",
    attrs: {
      placeholder: "自定义placeholder",
      onPressEnter: () => {
        console.log("回车事件");
      },
    },
  },
  {
    type: "inputPassword",
    label: "密码输入框",
    name: "inputPasswordValue",
    attrs: {},
  },
  {
    type: "radio",
    label: "单选框组",
    name: "radioValue",
    attrs: {
      options: optionsRef.value,
    },
  },
  {
    type: "checkbox",
    label: "多选框",
    name: "checkboxValue",
    attrs: {
      options: [
        {label: "AppleLABEL", value: "Apple"},
        {label: "PearLABE", value: "Pear"},
        {label: "OrangeLABE", value: "Orange", disabled: true},
      ],
    },
  },
  {
    type: "rate",
    label: "评分",
    name: "rateValue",
    attrs: {
      allowHalf: true,
    },
  },
  {
    type: "select",
    label: "选择器",
    name: "selectValue",
    attrs: {
      // options: optionsRef.value,
      service: () => {
        //如果有service,优先使用service,忽略options
        return serviceOptions({});
      },
    },
  },
  {
    type: "cascader",
    label: "级联选泽",
    name: "cascaderValue",
    attrs: {
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake",
                },
              ],
            },
          ],
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghuamen",
                  label: "Zhong Hua Men",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    type: "treeSelect",
    label: "树选择",
    name: "treeSelectValue",
    attrs: {
      treeData: [
        {
          title: "parent 1",
          value: "parent 1",
          children: [
            {
              title: "parent 1-0",
              value: "parent 1-0",
              children: [
                {
                  title: "my leaf",
                  value: "leaf1",
                },
                {
                  title: "your leaf",
                  value: "leaf2",
                },
              ],
            },
            {
              title: "parent 1-1",
              value: "parent 1-1",
            },
          ],
        },
      ],
    },
  },
  {
    type: "slider",
    label: "滑块",
    name: "sliderValue",
    attrs: {},
  },
  {
    type: "switch",
    label: "开关",
    name: "switchValue",
    attrs: {},
  },
  {
    type: "timePicker",
    label: "时间选择",
    name: "timePickerValue",
    attrs: {},
  },
  {
    type: "timeRangePicker",
    label: "时间范围选择",
    name: "timeRangePickerValue",
    attrs: {},
  },
  {
    type: "datePicker",
    label: "日期选择",
    name: "datePickerValue",
    attrs: {},
  },
  {
    type: "rangePicker",
    label: "日期范围选择",
    name: "rangePickerValue",
    attrs: {},
  },
]);
const useForm = Form.useForm;
const {validate, validateInfos, resetFields} = useForm(formState, rules);
</script>

<template>
  <p>商品列表</p>
  <p>枚举示例：{{ productTypeList._arr }}</p>
  <a-button type="primary" @click="message.info('点击了按钮')">点击消息提示</a-button>
  <zForm
        v-bind="formBind"
        v-model:formState="formState"
        :validateInfos="validateInfos"
        :rules="rules"
        :columns="columns"
    ></zForm>
  <ul>
    <li v-for="item in list" :key="item.id" @click="goDetail(item)">{{ item.name }}</li>
  </ul>
</template>

<style scoped>

</style>
