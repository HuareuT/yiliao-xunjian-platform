<script lang="ts" setup>
import type { YaopinRecord } from '../data';

import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { manufacturerOptions } from '../data';

const emits = defineEmits<{
  success: [YaopinRecord];
}>();

const editingId = ref<string>();

const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '药品名称',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'unit',
      label: '单位',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'specification',
      label: '规格',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        class: 'w-full',
        options: manufacturerOptions,
      },
      fieldName: 'manufacturer',
      label: '厂家',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
});

const title = computed(() => {
  return editingId.value ? '编辑药品' : '新增药品';
});

const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = (await formApi.getValues()) as YaopinRecord;
    const nextRow: YaopinRecord = {
      ...values,
      id: editingId.value || `YP${Date.now()}`,
    };
    emits('success', nextRow);
    drawerApi.close();
  },
  async onOpenChange(isOpen) {
    if (!isOpen) return;
    const data = drawerApi.getData<YaopinRecord>();
    formApi.resetForm();
    editingId.value = data?.id;
    await nextTick();
    if (data) {
      formApi.setValues(data);
    }
  },
});
</script>

<template>
  <Drawer :title="title">
    <Form class="mx-4" />
  </Drawer>
</template>
