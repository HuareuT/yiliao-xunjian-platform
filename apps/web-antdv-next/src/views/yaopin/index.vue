<script lang="ts" setup>
import type { UploadChangeParam } from "antdv-next";

import type { VxeTableGridOptions } from "#/adapter/vxe-table";

import { computed, ref } from "vue";

import { Page, useVbenDrawer } from "@vben/common-ui";
import { IconifyIcon, Plus } from "@vben/icons";

import { Button, message, Modal, Upload } from "antdv-next";

import { useVbenVxeGrid } from "#/adapter/vxe-table";

import {
  categoryOptions,
  mockYaopinRecords,
  useColumns,
  useGridFormSchema,
  type YaopinRecord,
} from "./data";
import FormDrawer from "./modules/form.vue";

const records = ref<YaopinRecord[]>([...mockYaopinRecords]);

const [EditDrawer, editDrawerApi] = useVbenDrawer({
  connectedComponent: FormDrawer,
  destroyOnClose: true,
});

const categoryOptionMap = computed(() => {
  return new Map(categoryOptions.map((item) => [item.value, item.label]));
});

function buildRecord(row: YaopinRecord) {
  return {
    ...row,
    category: categoryOptionMap.value.get(row.category) || row.category,
  };
}

function getFilteredRecords(formValues: Record<string, any>) {
  const name = String(formValues.name || "").trim();
  const category = formValues.category as string | undefined;
  return records.value.filter((item) => {
    return (!name || item.name.includes(name)) && (!category || item.category === category);
  });
}

function paginate(list: YaopinRecord[], page: number, pageSize: number) {
  return list.slice((page - 1) * pageSize, page * pageSize);
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick),
    height: "auto",
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          const filtered = getFilteredRecords(formValues);
          return {
            items: paginate(filtered, page.currentPage, page.pageSize).map(buildRecord),
            total: filtered.length,
          };
        },
      },
    },
    rowConfig: {
      keyField: "id",
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<YaopinRecord>,
});

function onRefresh() {
  gridApi.query();
}

function onCreate() {
  editDrawerApi.setData({}).open();
}

function onEdit(row: YaopinRecord) {
  editDrawerApi.setData(row).open();
}

function onDelete(row: YaopinRecord) {
  Modal.confirm({
    content: `确认删除药品「${row.name}」吗？`,
    onOk() {
      records.value = records.value.filter((item) => item.id !== row.id);
      message.success(`已删除「${row.name}」`);
      onRefresh();
    },
    title: "删除药品",
  });
}

function onActionClick({ code, row }: { code: string; row: YaopinRecord }) {
  switch (code) {
    case "delete": {
      onDelete(row);
      break;
    }
    case "edit": {
      onEdit(row);
      break;
    }
  }
}

function upsertRecord(row: YaopinRecord) {
  const index = records.value.findIndex((item) => item.id === row.id);
  if (index >= 0) {
    records.value[index] = row;
  } else {
    records.value = [row, ...records.value];
  }
  onRefresh();
}

const importLoading = ref(false);

function parseCsv(content: string) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length <= 1) return [];
  const headers = lines
    .shift()!
    .split(",")
    .map((item) => item.trim());
  return lines
    .map((line) => {
      const values = line.split(",").map((item) => item.trim());
      const record: Record<string, string> = {};
      headers.forEach((header, index) => {
        record[header] = values[index] ?? "";
      });
      return record;
    })
    .map((item, index) => ({
      category: item["分类"] || "西药",
      id: item["编号"] || `YP${Date.now()}${index}`,
      inventory: Number(item["库存"] || 0),
      limit: item["使用限制"] || "",
      name: item["药品名称"] || item["名称"] || "",
      specification: item["规格"] || "",
      unit: item["单位"] || "",
    }))
    .filter((item) => item.name && item.unit && item.specification);
}

async function handleImportChange(event: UploadChangeParam) {
  const file = event.file.originFileObj;
  if (!file) return;
  importLoading.value = true;
  try {
    const content = await file.text();
    const imported = parseCsv(content);
    if (imported.length === 0) {
      message.warning("未识别到可导入的数据，请检查 CSV 表头");
      return;
    }
    records.value = [...imported, ...records.value];
    message.success(`已导入 ${imported.length} 条药品记录`);
    onRefresh();
  } finally {
    importLoading.value = false;
  }
}
</script>

<template>
  <Page auto-content-height>
    <EditDrawer @success="upsertRecord" />
    <Grid table-title="药品管理">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          新增
        </Button>
        <Upload
          :show-upload-list="false"
          accept=".csv,.txt"
          :before-upload="() => false"
          @change="handleImportChange"
        >
          <Button :loading="importLoading" class="ml-2">
            <IconifyIcon class="size-5" icon="lucide:upload" />
            批量导入
          </Button>
        </Upload>
      </template>
    </Grid>
  </Page>
</template>
