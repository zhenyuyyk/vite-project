<template>
  <a-form :model="formData" v-bind="attrs">
    <a-form-item
      v-for="item in columns"
      v-bind="{ ...item, ...attrs.validateInfos?.[item.name] }"
      :key="item.name"
    >
      <div v-if="item.type == 'custom'">
        <component :is="item.customRender(formData[item.name])"></component>
      </div>
      <component
        v-else
        :is="getComponentName(item.type)"
        v-model:value="formData[item.name]"
        v-model:checked="formData[item.name]"
        v-bind="item.attrs"
      ></component>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { computed, onMounted, ref, useAttrs, watch } from "vue";

const props = defineProps({
  formState: {
    type: Object,
    default: () => {
      return {};
    },
  },
  columns: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const attrs = useAttrs();
const comEnum = {
  input: "a-input",
  textarea: "a-textarea",
  inputPassword: "a-input-password",
  inputNumber: "a-input-number",
  radio: "a-radio-group",
  checkbox: "a-checkbox-group",
  rate: "a-rate",
  select: "a-select",
  cascader: "a-cascader",
  treeSelect: "a-tree-select",
  slider: "a-slider",
  switch: "a-switch",
  timePicker: "a-time-picker",
  timeRangePicker: "a-time-range-picker",
  datePicker: "a-date-picker",
  rangePicker: "a-range-picker",
};

const formData = ref(props.formState);
//根据columns生成formData
for (let i of props.columns) {
  formData.value[i.name] =
    formData.value[i.name] !== null && formData.value[i.name] !== undefined
      ? formData.value[i.name]
      : null;
  //如果有service,执行service生成options
  if (i.attrs && i.attrs.service) {
    (async () => {
      let options = await i.attrs.service();
      console.log(options)
      i.attrs.options = options;
    })();
  }
}

//根据type计算相应的组件名称
const getComponentName = (type) => {
  return type ? comEnum[type] : "";
};

onMounted(() => {});
</script>

<style scoped lang="less"></style>
