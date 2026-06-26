<script lang="ts" setup>
import type { RizhiRecord } from './data';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { Button } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { getMockRizhiList, useColumns, useGridFormSchema } from './data';

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(),
    exportConfig: {
      filename: '操作日志',
      sheetName: '操作日志',
    },
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getMockRizhiList({
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
      export: false,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<RizhiRecord>,
});

function onExport() {
  gridApi.grid?.exportData({
    filename: '操作日志',
    sheetName: '操作日志',
    type: 'xlsx',
  });
}
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="日志管理">
      <template #toolbar-tools>
        <Button type="primary" @click="onExport">
          <IconifyIcon class="size-5" icon="lucide:download" />
          导出日志
        </Button>
      </template>
    </Grid>
  </Page>
</template>
