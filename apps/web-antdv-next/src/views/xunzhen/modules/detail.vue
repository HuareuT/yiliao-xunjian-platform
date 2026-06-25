<script lang="ts" setup>
import type { XunzhenRecord } from '../data';

import { computed, ref } from 'vue';

import { useVbenDrawer, VbenDescriptions } from '@vben/common-ui';

import { useDescriptionItems } from '../data';

const detailData = ref<XunzhenRecord>();

const items = computed(() => useDescriptionItems(detailData.value));

const [Drawer, drawerApi] = useVbenDrawer({
  onOpenChange(isOpen) {
    if (isOpen) {
      detailData.value = drawerApi.getData<XunzhenRecord>();
    }
  },
});
</script>

<template>
  <Drawer :footer="false" title="巡诊详情">
    <VbenDescriptions bordered :column="1" :items="items" />
  </Drawer>
</template>
