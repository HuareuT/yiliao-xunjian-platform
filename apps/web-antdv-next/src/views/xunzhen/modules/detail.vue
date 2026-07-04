<script lang="ts" setup>
import type { XunzhenRecord } from '../data';

import { computed, ref } from 'vue';

import { useVbenDrawer, VbenDescriptions } from '@vben/common-ui';

import {
  useDescriptionItems,
  useMedicationDescriptionItems,
  usePatientDescriptionItems,
  useTreatmentDescriptionItems,
} from '../data';

const detailData = ref<XunzhenRecord>();

const basicItems = computed(() => useDescriptionItems(detailData.value));
const patientItems = computed(() => usePatientDescriptionItems(detailData.value));
const medicationItems = computed(() =>
  useMedicationDescriptionItems(detailData.value),
);
const treatmentItems = computed(() =>
  useTreatmentDescriptionItems(detailData.value),
);

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
    <div class="detail-section">
      <div class="detail-section__title">基础信息</div>
      <VbenDescriptions bordered :column="1" :items="basicItems" />
    </div>
    <div class="detail-section">
      <div class="detail-section__title">患者信息</div>
      <VbenDescriptions bordered :column="1" :items="patientItems" />
    </div>
    <div class="detail-section">
      <div class="detail-section__title">开药</div>
      <VbenDescriptions bordered :column="1" :items="medicationItems" />
    </div>
    <div class="detail-section">
      <div class="detail-section__title">处置</div>
      <VbenDescriptions bordered :column="1" :items="treatmentItems" />
    </div>
  </Drawer>
</template>

<style scoped>
.detail-section {
  margin-bottom: 16px;
}

.detail-section__title {
  margin-bottom: 8px;
  color: hsl(var(--foreground));
  font-size: 15px;
  font-weight: 600;
}
</style>
