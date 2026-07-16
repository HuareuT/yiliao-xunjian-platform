<script lang="ts" setup>
import type { ChuzhiRecord } from '../data';

import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { statusOptions } from '../data';

const emits = defineEmits<{
  success: [ChuzhiRecord];
}>();

const editingRow = ref<ChuzhiRecord>();

const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '处置方式名称',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        optionType: 'button',
        options: statusOptions,
      },
      defaultValue: 1,
      fieldName: 'status',
      label: '状态',
    },
  ],
  showDefaultActions: false,
});

const title = computed(() => {
  return editingRow.value?.id ? '编辑处置方式' : '新增处置方式';
});

function getCurrentTime() {
  return new Date().toLocaleString('zh-CN', { hour12: false });
}

const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = (await formApi.getValues()) as ChuzhiRecord;
    const now = getCurrentTime();
    const nextRow: ChuzhiRecord = {
      ...editingRow.value,
      ...values,
      createBy: editingRow.value?.createBy || '管理员',
      createTime: editingRow.value?.createTime || now,
      id: editingRow.value?.id || `CZFS${Date.now()}`,
      status: Number(values.status),
      updateBy: '管理员',
      updateTime: now,
    };
    emits('success', nextRow);
    drawerApi.close();
  },
  async onOpenChange(isOpen) {
    if (!isOpen) return;
    const data = drawerApi.getData<ChuzhiRecord>();
    editingRow.value = data?.id ? data : undefined;
    formApi.resetForm();
    await nextTick();
    formApi.setValues({
      name: data?.name,
      status: data?.status ?? 1,
    });
  },
});
</script>

<template>
  <Drawer :title="title">
    <Form class="mx-4" />
  </Drawer>
</template>
