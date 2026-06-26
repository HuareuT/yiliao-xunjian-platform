<script lang="ts" setup>
import type { BaozhangPoint } from '../data';

import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

const emits = defineEmits<{
  success: [BaozhangPoint];
}>();

const editingId = ref<string>();
const parentId = ref<string>();
const parentName = ref<string>();

const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '保障点名称',
      rules: 'required',
    },
    {
      component: 'Textarea',
      componentProps: {
        maxLength: 100,
        rows: 3,
        showCount: true,
      },
      fieldName: 'remark',
      label: '备注',
    },
  ],
  showDefaultActions: false,
});

const title = computed(() => {
  if (editingId.value) return '编辑保障点';
  return parentName.value ? `新增「${parentName.value}」下级` : '新增保障点';
});

const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = (await formApi.getValues()) as BaozhangPoint;
    const now = new Date().toLocaleString('zh-CN');
    const nextRow: BaozhangPoint = {
      ...values,
      createBy: values.createBy || '管理员',
      createTime: values.createTime || now,
      id: editingId.value || `BZ${Date.now()}`,
      pid: parentId.value,
      updateBy: '管理员',
      updateTime: now,
    };
    emits('success', nextRow);
    drawerApi.close();
  },
  async onOpenChange(isOpen) {
    if (!isOpen) return;
    const data = drawerApi.getData<{
      parent?: BaozhangPoint;
      row?: BaozhangPoint;
    }>();
    const row = data.row;
    editingId.value = row?.id;
    parentId.value = row?.pid || data.parent?.id;
    parentName.value = data.parent?.name;
    formApi.resetForm();
    await nextTick();
    if (row) {
      formApi.setValues(row);
    }
  },
});
</script>

<template>
  <Drawer :title="title">
    <Form class="mx-4" />
  </Drawer>
</template>

