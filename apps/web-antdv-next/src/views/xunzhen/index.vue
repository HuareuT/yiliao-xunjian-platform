<script lang="ts" setup>
import type { XunzhenRecord } from './data';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { Button } from 'antdv-next';

import { useVbenVxeGrid, VbenTableAction } from '#/adapter/vxe-table';

import {
  getMockXunzhenList,
  useColumns,
  useGridFormSchema,
} from './data';
import Detail from './modules/detail.vue';

const [DetailDrawer, detailDrawerApi] = useVbenDrawer({
  connectedComponent: Detail,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(),
    exportConfig: {
      filename: '巡诊记录',
      sheetName: '巡诊记录',
    },
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getMockXunzhenList({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: true,
      export: true,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<XunzhenRecord>,
});

function onDetail(row: XunzhenRecord) {
  detailDrawerApi.setData(row).open();
}

function onExport() {
  gridApi.grid?.exportData({
    filename: '巡诊记录',
    sheetName: '巡诊记录',
    type: 'xlsx',
  });
}
</script>

<template>
  <Page auto-content-height>
    <DetailDrawer />
    <Grid table-title="巡诊记录">
      <template #toolbar-tools>
        <Button type="primary" @click="onExport">
          <IconifyIcon class="size-5" icon="lucide:download" />
          导出记录
        </Button>
      </template>
      <template #action="{ row }">
        <VbenTableAction
          :actions="[
            {
              text: '详情',
              icon: 'lucide:eye',
              onClick: () => onDetail(row),
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
