<script lang="ts" setup>
import type { DiagnosisCategory, DiagnosisRecord } from './data';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h, ref, watch } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, Card, Input, InputSearch, message, Modal } from 'antdv-next';

import { useVbenVxeGrid, VbenTableAction } from '#/adapter/vxe-table';

import {
  mockDiagnosisCategories,
  mockDiagnosisRecords,
  useColumns,
  useGridFormSchema,
} from './data';
import DiagnosisForm from './modules/form.vue';

const categories = ref<DiagnosisCategory[]>([...mockDiagnosisCategories]);
const records = ref<DiagnosisRecord[]>([...mockDiagnosisRecords]);
const categorySearchValue = ref('');
const selectedCategoryId = ref(categories.value[0]?.id || '');

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: DiagnosisForm,
  destroyOnClose: true,
});

function getCategoryName(categoryId: string) {
  return categories.value.find((item) => item.id === categoryId)?.name || '';
}

function getVisibleCategories() {
  const keyword = categorySearchValue.value.trim();
  if (!keyword) return categories.value;
  return categories.value.filter((item) => item.name.includes(keyword));
}

function getFilteredRecords(formValues: Record<string, any>) {
  const diagnosisType = String(formValues.diagnosisType || '').trim();
  return records.value.filter((item) => {
    return (
      (!selectedCategoryId.value ||
        item.categoryId === selectedCategoryId.value) &&
      (!diagnosisType || item.diagnosisType.includes(diagnosisType))
    );
  });
}

function paginate(list: DiagnosisRecord[], page: number, pageSize: number) {
  return list.slice((page - 1) * pageSize, page * pageSize);
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onStatusChange),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          const filtered = getFilteredRecords(formValues);
          return {
            items: paginate(filtered, page.currentPage, page.pageSize),
            total: filtered.length,
          };
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<DiagnosisRecord>,
});

function onRefresh() {
  gridApi.query();
}

function onSelectCategory(value: string) {
  selectedCategoryId.value = value;
  onRefresh();
}

function onCreateCategory() {
  const categoryName = ref('');
  Modal.confirm({
    cancelText: '取消',
    content: () =>
      h(Input, {
        placeholder: '请输入分类名称',
        value: categoryName.value,
        'onUpdate:value': (value: string) => {
          categoryName.value = value;
        },
      }),
    onOk() {
      const name = categoryName.value.trim();
      if (!name) {
        message.warning('请输入分类名称');
        return Promise.reject(new Error('请输入分类名称'));
      }
      const id = `category_${Date.now()}`;
      categories.value = [{ id, name }, ...categories.value];
      selectedCategoryId.value = id;
      message.success(`已新增分类「${name}」`);
      onRefresh();
      return true;
    },
    okText: '确定',
    title: '新增分类',
  });
}

function onCreate() {
  formDrawerApi
    .setData({
      categories: categories.value,
      selectedCategoryId: selectedCategoryId.value,
    })
    .open();
}

function onEdit(row: DiagnosisRecord) {
  formDrawerApi
    .setData({
      categories: categories.value,
      row,
    })
    .open();
}

function onDelete(row: DiagnosisRecord) {
  records.value = records.value.filter((item) => item.id !== row.id);
  message.success(`已删除「${row.diagnosisType}」`);
  onRefresh();
}

async function onStatusChange(newStatus: number, row: DiagnosisRecord) {
  const statusText = newStatus === 1 ? '启用' : '停用';
  records.value = records.value.map((item) =>
    item.id === row.id
      ? {
          ...item,
          status: newStatus,
          updateBy: '管理员',
          updateTime: new Date().toLocaleString('zh-CN'),
        }
      : item,
  );
  message.success(`已${statusText}「${row.diagnosisType}」`);
  onRefresh();
  return true;
}

function upsertRecord(row: DiagnosisRecord) {
  const categoryName = getCategoryName(row.categoryId);
  const nextRow = {
    ...row,
    categoryName,
  };
  const index = records.value.findIndex((item) => item.id === row.id);
  if (index >= 0) {
    records.value[index] = {
      ...records.value[index],
      ...nextRow,
      createBy: records.value[index]?.createBy || nextRow.createBy,
      createTime: records.value[index]?.createTime || nextRow.createTime,
    };
  } else {
    records.value = [nextRow, ...records.value];
  }
  selectedCategoryId.value = nextRow.categoryId;
  onRefresh();
}

watch(categorySearchValue, () => {
  const visibleCategories = getVisibleCategories();
  if (
    visibleCategories.length > 0 &&
    !visibleCategories.some((item) => item.id === selectedCategoryId.value)
  ) {
    selectedCategoryId.value = visibleCategories[0]!.id;
    onRefresh();
  }
});
</script>

<template>
  <Page auto-content-height>
    <FormDrawer @success="upsertRecord" />
    <div class="flex size-full">
      <Card class="w-1/6">
        <div class="mb-3 flex gap-2">
          <InputSearch
            v-model:value="categorySearchValue"
            placeholder="搜索分类"
          />
          <Button type="primary" @click="onCreateCategory">
            <Plus class="size-5" />
          </Button>
        </div>
        <div class="space-y-1">
          <button
            v-for="category in getVisibleCategories()"
            :key="category.id"
            type="button"
            class="flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
            :class="{
              'bg-primary/10 text-primary': selectedCategoryId === category.id,
            }"
            @click="onSelectCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
      </Card>

      <div class="ml-4 w-5/6">
        <Grid table-title="诊断库管理">
          <template #toolbar-tools>
            <Button type="primary" @click="onCreate">
              <Plus class="size-5" />
              新增诊断类型
            </Button>
          </template>
          <template #action="{ row }">
            <VbenTableAction
              :actions="[
                {
                  text: '修改',
                  icon: 'lucide:edit',
                  onClick: () => onEdit(row),
                },
              ]"
              :dropdown-actions="[
                {
                  text: row.status === 1 ? '停用' : '启用',
                  icon: row.status === 1 ? 'lucide:pause' : 'lucide:play',
                  onClick: () => onStatusChange(row.status === 1 ? 0 : 1, row),
                },
                {
                  text: '删除',
                  icon: 'lucide:trash-2',
                  danger: true,
                  popConfirm: {
                    title: `确认删除诊断类型「${row.diagnosisType}」吗？`,
                    confirm: () => onDelete(row),
                  },
                },
              ]"
              align="center"
            />
          </template>
        </Grid>
      </div>
    </div>
  </Page>
</template>
