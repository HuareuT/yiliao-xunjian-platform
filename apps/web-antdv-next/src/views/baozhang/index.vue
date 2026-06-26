<script lang="ts" setup>
import type { BaozhangPoint } from './data';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { mockBaozhangPoints, useColumns } from './data';
import Form from './modules/form.vue';

const treeData = ref<BaozhangPoint[]>([...mockBaozhangPoints]);

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async () => treeData.value,
      },
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      zoom: true,
    },
    treeConfig: {
      expandAll: true,
      parentField: 'pid',
      rowField: 'id',
      transform: false,
    },
  } as VxeTableGridOptions<BaozhangPoint>,
});

function onActionClick({ code, row }: OnActionClickParams<BaozhangPoint>) {
  switch (code) {
    case 'append': {
      onAppend(row);
      break;
    }
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

function onRefresh() {
  gridApi.query();
  gridApi.grid?.setAllTreeExpand(true);
}

function onCreate() {
  formDrawerApi.setData({}).open();
}

function onAppend(row: BaozhangPoint) {
  formDrawerApi.setData({ parent: row }).open();
}

function onEdit(row: BaozhangPoint) {
  formDrawerApi.setData({ row }).open();
}

function updateNode(
  list: BaozhangPoint[],
  id: string,
  updater: (row: BaozhangPoint) => BaozhangPoint,
): BaozhangPoint[] {
  return list.map((item) => {
    if (item.id === id) {
      return updater(item);
    }
    return {
      ...item,
      children: item.children
        ? updateNode(item.children, id, updater)
        : item.children,
    };
  });
}

function removeNode(list: BaozhangPoint[], id: string): BaozhangPoint[] {
  return list
    .filter((item) => item.id !== id)
    .map((item) => ({
      ...item,
      children: item.children ? removeNode(item.children, id) : item.children,
    }));
}

function upsertNode(row: BaozhangPoint) {
  if (!row.pid) {
    const index = treeData.value.findIndex((item) => item.id === row.id);
    if (index >= 0) {
      treeData.value[index] = {
        ...treeData.value[index],
        ...row,
        children: treeData.value[index]?.children,
      };
    } else {
      treeData.value = [row, ...treeData.value];
    }
    onRefresh();
    return;
  }

  let updated = false;
  treeData.value = updateNode(treeData.value, row.id, (item) => {
    updated = true;
    return {
      ...item,
      ...row,
      children: item.children,
    };
  });
  if (!updated) {
    treeData.value = updateNode(treeData.value, row.pid, (parent) => ({
      ...parent,
      children: [row, ...(parent.children || [])],
    }));
  }
  onRefresh();
}

function onDelete(row: BaozhangPoint) {
  treeData.value = removeNode(treeData.value, row.id);
  message.success(`已删除「${row.name}」`);
  onRefresh();
}
</script>

<template>
  <Page auto-content-height>
    <FormDrawer @success="upsertNode" />
    <Grid table-title="保障点管理">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          新增保障点
        </Button>
      </template>
    </Grid>
  </Page>
</template>
