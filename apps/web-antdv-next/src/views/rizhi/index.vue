<script lang="ts" setup>
import type { RizhiRecord } from './data';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { getMockRizhiList, useColumns, useGridFormSchema } from './data';

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(),
    exportConfig: {
      types: ['xlsx', 'csv'],
      type: 'xlsx',
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
      export: true,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<RizhiRecord>,
});
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="日志管理" />
  </Page>
</template>
