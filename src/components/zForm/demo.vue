<template>
  <p>表单测试</p>
  <div class="homePage swa">
    <div class="hwPage p80">
      <div class="form">
        <p>{{ formState }}</p>
        <button @click="waiSubmit">提交</button>
        <zForm
          v-bind="formBind"
          v-model:formState="formState"
          :validateInfos="validateInfos"
          :rules="rules"
          :columns="columns"
          @finish="onFinish"
          @submit="onSubmit"
        ></zForm>
      </div>
    </div>
  </div>
</template>
<script setup>
import zForm from "@/components/zForm/zForm.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Form } from 'ant-design-vue';
import { serviceOptions } from "@/api/assets/index";

const options = reactive([]);
const optionsRef = ref([]);

let formBind = ref({
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
  inputValue: [{ required: true, trigger: "blur" }],
  textareaValue: [
    { required: true, message: "Please input your password!", trigger: "blur" },
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
        { label: "AppleLABEL", value: "Apple" },
        { label: "PearLABE", value: "Pear" },
        { label: "OrangeLABE", value: "Orange", disabled: true },
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

const onSubmit = (e) => {
  console.log("onSubmit", e);
};
const onFinish = (values) => {
  console.log("onFinish", values);
};
// 使用useForm进行表单校验
const useForm = Form.useForm;
const { validate, validateInfos, resetFields } = useForm(formState, rules);
const waiSubmit = () => {
  validate()
    .then(() => {
      console.log("then");
    })
    .catch((err) => {
      console.log("error", err);
    });
};
//赋值options需要使用push
const getOptions = () => {
  setTimeout(() => {
    let optionsData = [
      { label: "AppleLABEL", value: "Apple" },
      { label: "PearLABE", value: "Pear" },
      { label: "OrangeLABE", value: "Orange", disabled: true },
    ];
    options.push(...optionsData);
    optionsRef.value.push(...optionsData);
  }, 1000);
};
onMounted(() => {
  getOptions();
});
//示例:当某一项变化时,options变更
watch(
  () => formState.value.selectValue,
  (newVal) => {
    console.log(newVal);
    if (!newVal) {
      return false;
    }
    console.log(123);
    let optionsData = [
      { label: "AAA", value: "AAA" },
      { label: "BBB", value: "BBB" },
      { label: "CCC", value: "CCC", disabled: true },
    ];
    options.length = 0;
    options.push(...optionsData);
    optionsRef.value.length = 0;
    optionsRef.value.push(...optionsData);
  }
);
</script>

<style lang="less" scoped>
.formDemo {
  display: flex;
  flex-wrap: wrap;
  /deep/ .bwdv-form-item {
    width: 33%;
  }
}
.protocolPage {
  position: relative;
}
// :deep(.bwdv-modal-content .bwdv-modal-body) {
//   padding: 24px 0 0 32px !important;
// }
.sticky-btns {
  font-size: 18px;
  font-weight: 600;
  color: #112233;
  line-height: 26px;
  height: 56px;
  background: #ffffff;
  position: fixed;
  top: 48px;
  right: 0;

  width: calc(100%);
  line-height: 56px;
  padding: 0 16px + 6px;
  margin-top: 16px;
  border-top: 1px solid rgb(217, 217, 217);
  z-index: 2;
}

.foundationInfo {
  margin-top: 60px;
  width: 100%;
  padding: 10px 0;
  background: #ffffff;
  height: 144px;
  border-radius: 10px;
  margin-bottom: 16px;
}

.form {
  // padding: 0 10px;

  .formItem {
    display: flex !important;
    // width: 88%;
    // margin-left: 15px;
    input {
      // width: 100px;
    }
  }
  .formTitle {
    position: relative;
    width: 100%;
    margin: 10px 30px;
    height: 24px;
    font-size: 16px;
    font-weight: 600;
    color: #3d3d3d;
    line-height: 17px;

    div {
      float: right;
    }
  }

  .formTitle::before {
    position: absolute;
    left: -19px;
    top: -1px;
    content: "";
    width: 3px;
    height: 19px;
    background: #3471ff;
    margin-right: 10px;
    margin-left: 10px;
  }

  .formBtn {
    margin: 20px;
    display: flex;
    justify-content: center;
  }
}

.isResignation {
  line-height: 30px;
  margin-left: 10px;
}

.p80 {
  // padding-right: 80px;
}
.form-footer {
  background: #fff;
  border-top: 1px solid #c9cdd4;
  height: 60px;
  line-height: 60px;
  text-align: right;
  padding-right: 20px;
}
.mrg-right {
  margin-right: 20px;
}
:deep(.bwdv-picker-input) > input {
  padding-left: 24px;
}
.purchaseModleOutBox {
  position: relative;
  display: flex;
  align-items: center;
  .addBtn {
    // position: absolute;
    // top: 50%;
    // transform: translate(0, -50%);

    // z-index: 22;
  }
}
.view_purchase_modal {
  color: #165dff;
  cursor: pointer;
}
.zipBox {
  display: flex;
  background: #f7f8fa;
  flex-direction: column;
  border-radius: 8px;
  .zip {
    display: flex;
    padding: 12px 0 8px 16px;
    cursor: pointer;
    align-items: center;
    .zipUpload {
      // flex: 1;
    }
    .zipTitle {
      font-size: 14px;
      color: #1d2129;
      margin-right: 4px;
    }
    .zipItem {
      font-size: 12px;
      color: #86909c;
      height: 32px;
      line-height: 32px;

      margin-right: 11px;
      display: flex;
      align-items: center;
      .myFileIcon {
        width: 16px;
        height: 16px;
        background: url("../../assets/fileIcon.svg") no-repeat 0 0;
        background-size: 100% 100%;
        margin-right: 4px;
      }

      .iconBox2 {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
        // display: none;
        &:hover {
          background-color: #e4e6ed;
        }
      }
      .removeIcon {
        width: 16px;
        height: 16px;
        background: url("../../assets/bool.svg") no-repeat 0 0;
        background-size: 100% 100%;
        // opacity: 0;
      }
      .myFileContent {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
      }
    }
    .zipUpload > span {
      display: flex;
      align-items: center;
      flex: 1;
    }
    .pathItemHover:hover {
      background: #f1f2f8;
      border-radius: 6px;
    }
  }
  .path {
    display: flex;
    padding-left: 16px;
    padding-bottom: 12px;
    cursor: pointer;
    align-items: center;
    .pathTitle {
      font-size: 14px;
      color: #1d2129;
      margin-right: 4px;
    }
    .pathItem {
      font-size: 12px;
      color: #86909c;
      height: 32px;
      line-height: 32px;
      margin-right: 11px;
      display: flex;
      align-items: center;
      // margin-left: 10px;

      .myFileIcon {
        width: 16px;
        height: 16px;
        background: url("../../assets/fileIcon.svg") no-repeat 0 0;
        background-size: 100% 100%;
        margin-right: 4px;
      }
      .myFileContent {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
      }
      .iconBox2 {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
        // display: none;
        &:hover {
          background-color: #e4e6ed;
        }
      }
      .removeIcon {
        width: 16px;
        height: 16px;
        background: url("../../assets/bool.svg") no-repeat 0 0;
        background-size: 100% 100%;
      }
    }
    // .pathItem:hover .iconBox2 {
    //   display: block;
    // }
    .pathItemHover:hover {
      background: #f1f2f8;
      border-radius: 6px;
    }
  }
}
:deep .bwdv-upload-list {
  // margin-left: 10px;
  // margin-bottom: 5px;
  // height: 32px;
  // line-height: 32px;
  // cursor: pointer;
  flex: 1;
}
.iconBox2 {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  // display: none;
  &:hover {
    background-color: #e4e6ed;
  }
}
.removeIcon {
  width: 16px;
  height: 16px;
  background: url("../../assets/bool.svg") no-repeat 0 0;
  background-size: 100% 100%;
  opacity: 0;
}
.myFileContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  &:hover .removeIcon {
    opacity: 1 !important;
  }
}

:deep.bwdv-upload-list-item-card-actions {
  right: 8px;
  opacity: 1 !important;
}
:deep .bwdv-upload-list-item-card-actions-btn {
  right: 8px;
  // opacity: 1 !important;
}
:deep .bwdv-upload-list-item-card-actions-btn:hover {
  background-color: #e4e6ed !important;
  // color: #4e5969 !important;
}
:deep .bwdv-upload-list-item {
  margin-top: 0;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  margin-right: 11px;
}
:deep .bwdv-upload-list-item:hover {
  background: #f1f2f8;
  border-radius: 6px;
  &:hover .removeIcon {
    opacity: 1 !important;
  }
}
.timeLineHeader {
  font-size: 16px;
  color: #1d2129;
}
.timeLineBody {
  width: 100%;
  background: rgb(241, 242, 248);
}
.timeLineContent {
  border-radius: 8px;
}
.hwPage {
  // margin-right: 16px;
  // margin-left: 16px;
  border-radius: 8px;
  position: relative;
  overflow: auto;
  height: calc(100% - 60px);
}
.titleBtn {
  float: right;
  position: relative;
  top: 8px;
  right: 16px;
}
.titleToLong {
  padding-right: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.smTableBox {
  display: flex;
  flex-direction: column;
  // padding: 0 30px;
}
.titleBoxInfo {
  // width: 80%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
:deep .bwdv-form-item-label > label {
  color: #4e5969;
}
:deep .bwdv-form-item-label > label::after {
  content: ":";
  position: relative;
  top: -0.5px;
  margin: 0 8px 0 2px;
  display: block !important;
}
:deep .bwdv-form-item-label > label::before {
}
:deep .bwdv-form-item-control-input-content span {
  // color: #1d2129;
}
.colItem {
  height: 32px;
  margin-bottom: 16px !important;
}
:deep .bwdv-table-thead > tr > th {
  background-color: #f1f2f8 !important;
  font-weight: normal;
}
:deep .bwdv-select-selector {
  padding-left: 12px !important;
}
:deep .bwdv-picker-input > input {
  padding-left: 12px !important;
}
:deep .bwdv-form-item {
  // margin-bottom: 0;
}
:deep .bwdv-upload-list-item-name {
  font-size: 14px;
}
.addUploadIcon {
  width: 16px;
  height: 16px;
  background: url("../../assets/addUploadIcon.svg") no-repeat 0 0;
  background-size: 100% 100%;
  margin-right: 10px;
}
:deep .bwdv-upload-list-item-info {
  padding: 0 !important;
}
.my {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 32px;
}
.myFileIcon {
  width: 16px;
  height: 16px;
  background: url("../../assets/fileIcon.svg") no-repeat 0 0;
  background-size: 100% 100%;
  margin-right: 4px;
}
.zipListItem {
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f1f2f8;
    border-radius: 6px;
  }
}
:deep .bwdicon-delete {
  font-size: 16px;
}
.labelBox {
  display: flex;
}
.labelIcon1 {
  width: 20px;
  height: 20px;
  background: url("../../assets/fileHlepIcon.svg") no-repeat 0 0;
  background-size: 100% 100%;
  margin-right: 8px;
}
.labelIcon2 {
  width: 20px;
  height: 20px;
  background: url("../../assets/zipIcon.svg") no-repeat 0 0;
  background-size: 100% 100%;
  margin-right: 8px;
}
.downIconS {
  width: 16px;
  height: 16px;
  background: url("../../assets/downLoadIcon.svg") no-repeat 0 0;
  background-size: 100% 100%;
  opacity: 0;
}
.previewIconS {
  width: 16px;
  height: 16px;
  background: url("../../assets/previewIcon.svg") no-repeat 0 0;
  background-size: 100% 100%;
  opacity: 0;
}
.zipListItemContent {
  display: flex;
  justify-content: space-between;
  flex: 1;
  &:hover .downIconS,
  &:hover .previewIconS {
    opacity: 1;
  }
}
:deep .bwdv-form-item-label {
  text-align: right !important;
}
.dateWidth {
  display: block !important;
}
.numberWidth {
  width: 100% !important;
}
.mw280 {
  max-width: 280px !important;
}
.contract {
  margin-top: 5px;
}
</style>
