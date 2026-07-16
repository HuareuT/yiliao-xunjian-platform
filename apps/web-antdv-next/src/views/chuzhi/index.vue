<script lang="ts" setup>
import type { ChuzhiRecord } from './data';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, Modal } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { mockChuzhiRecords, useColumns, useGridFormSchema } from './data';
import FormDrawer from './modules/form.vue';

const records = ref<ChuzhiRecord[]>([...mockChuzhiRecords]);

const [EditDrawer, editDrawerApi] = useVbenDrawer({
  connectedComponent: FormDrawer,
  destroyOnClose: true,
});

function getFilteredRecords(formValues: Record<string, any>) {
  const name = String(formValues.name || '').trim();
  const status = formValues.status;
  return records.value.filter((item) => {
    return (
      (!name || item.name.includes(name)) &&
      (status === undefined || status === null || item.status === status)
    );
  });
}

function paginate(list: ChuzhiRecord[], page: number, pageSize: number) {
  return list.slice((page - 1) * pageSize, page * pageSize);
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick, onStatusChange),
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
  } as VxeTableGridOptions<ChuzhiRecord>,
});

function onRefresh() {
  gridApi.query();
}

function onCreate() {
  editDrawerApi.setData({}).open();
}

function onEdit(row: ChuzhiRecord) {
  editDrawerApi.setData(row).open();
}

function onDelete(row: ChuzhiRecord) {
  Modal.confirm({
    content: `确认删除处置方式「${row.name}」吗？`,
    onOk() {
      records.value = records.value.filter((item) => item.id !== row.id);
      message.success(`已删除「${row.name}」`);
      onRefresh();
    },
    title: '删除处置方式',
  });
}

function onActionClick({ code, row }: { code: string; row: ChuzhiRecord }) {
  switch (code) {
    case 'delete': {
      onDelete(row);
      break;
    }
    case 'edit': {
      onEdit(row);
      break;
    }
  }
}

async function onStatusChange(newStatus: number, row: ChuzhiRecord) {
  const statusText = newStatus === 1 ? '启用' : '禁用';
  records.value = records.value.map((item) =>
    item.id === row.id
      ? {
          ...item,
          status: newStatus,
          updateBy: '管理员',
          updateTime: new Date().toLocaleString('zh-CN', { hour12: false }),
        }
      : item,
  );
  message.success(`已${statusText}「${row.name}」`);
  onRefresh();
  return true;
}

function upsertRecord(row: ChuzhiRecord) {
  const index = records.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    records.value = [row, ...records.value];
  } else {
    records.value[index] = {
      ...records.value[index],
      ...row,
      createBy: records.value[index]?.createBy || row.createBy,
      createTime: records.value[index]?.createTime || row.createTime,
    };
  }
  onRefresh();
}
</script>

<template>
  <Page auto-content-height>
    <EditDrawer @success="upsertRecord" />
    <Grid table-title="处置方式管理">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          新增
        </Button>
      </template>
    </Grid>
  </Page>
</template>
