<script lang="ts" setup>
import type { DiagnosisCategory, DiagnosisRecord } from '../data';

import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { useDiagnosisFormSchema } from '../data';

const emits = defineEmits<{
  success: [DiagnosisRecord];
}>();

const categories = ref<DiagnosisCategory[]>([]);
const editingId = ref<string>();

const [Form, formApi] = useVbenForm({
  schema: [],
  showDefaultActions: false,
});

const title = computed(() => {
  return editingId.value ? '修改诊断类型' : '新增诊断类型';
});

const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = (await formApi.getValues()) as DiagnosisRecord;
    const category = categories.value.find(
      (item) => item.id === values.categoryId,
    );
    const nextRow: DiagnosisRecord = {
      ...values,
      categoryName: category?.name || '',
      createBy: values.createBy || '管理员',
      createTime: values.createTime || new Date().toLocaleString('zh-CN'),
      id: editingId.value || `ZD${Date.now()}`,
      status: Number(values.status ?? 1),
      updateBy: '管理员',
      updateTime: new Date().toLocaleString('zh-CN'),
    };
    emits('success', nextRow);
    drawerApi.close();
  },
  async onOpenChange(isOpen) {
    if (!isOpen) return;
    const data = drawerApi.getData<{
      categories: DiagnosisCategory[];
      row?: DiagnosisRecord;
      selectedCategoryId?: string;
    }>();
    categories.value = data.categories;
    editingId.value = data.row?.id;
    formApi.setState({
      schema: useDiagnosisFormSchema(categories.value),
    });
    formApi.resetForm();
    await nextTick();
    formApi.setValues(
      data.row || {
        categoryId: data.selectedCategoryId,
        status: 1,
      },
    );
  },
});
</script>

<template>
  <Drawer :title="title">
    <Form class="mx-4" />
  </Drawer>
</template>

