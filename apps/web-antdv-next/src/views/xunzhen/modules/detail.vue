<script lang="ts" setup>
import type { XunzhenRecord } from '../data';

import { computed, ref } from 'vue';

import { useVbenDrawer, VbenDescriptions } from '@vben/common-ui';

import {
  useDescriptionItems,
  useMedicationGroups,
  usePatientDescriptionItems,
  useTreatmentGroups,
} from '../data';

const detailData = ref<XunzhenRecord>();

const basicItems = computed(() => useDescriptionItems(detailData.value));
const patientItems = computed(() => usePatientDescriptionItems(detailData.value));
const medicationGroups = computed(() => useMedicationGroups(detailData.value));
const treatmentGroups = computed(() => useTreatmentGroups(detailData.value));

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
      <template v-if="medicationGroups.length > 0">
        <div
          v-for="(group, index) in medicationGroups"
          :key="`medication-${index}`"
          class="detail-subsection"
        >
          <VbenDescriptions bordered :column="1" :items="group.items" />
        </div>
      </template>
      <VbenDescriptions
        v-else
        bordered
        :column="1"
        :items="[{ label: '开药信息', content: '暂无' }]"
      />
    </div>
    <div class="detail-section">
      <div class="detail-section__title">处置</div>
      <template v-if="treatmentGroups.length > 0">
        <div
          v-for="(group, index) in treatmentGroups"
          :key="`treatment-${index}`"
          class="detail-subsection"
        >
          <VbenDescriptions bordered :column="1" :items="group.items" />
        </div>
      </template>
      <VbenDescriptions
        v-else
        bordered
        :column="1"
        :items="[{ label: '处置信息', content: '暂无' }]"
      />
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

.detail-subsection + .detail-subsection {
  margin-top: 12px;
}

</style>
