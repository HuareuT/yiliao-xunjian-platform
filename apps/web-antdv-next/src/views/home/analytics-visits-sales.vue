<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref, watch } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

const props = withDefaults(
  defineProps<{
    campus?: string;
  }>(),
  {
    campus: '全部',
  },
);

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

const medicineDataMap: Record<string, { name: string; value: number }[]> = {
  全部: [
    { name: '西药', value: 480 },
    { name: '中成药', value: 306 },
    { name: '中药饮片', value: 92 },
    { name: '耗材类', value: 1540 },
  ],
  大学城: [
    { name: '西药', value: 280 },
    { name: '中成药', value: 172 },
    { name: '中药饮片', value: 52 },
    { name: '耗材类', value: 820 },
  ],
  江津: [
    { name: '西药', value: 200 },
    { name: '中成药', value: 134 },
    { name: '中药饮片', value: 40 },
    { name: '耗材类', value: 720 },
  ],
};

function renderChart() {
  const data = medicineDataMap[props.campus] ?? medicineDataMap['全部']!;

  renderEcharts({
    series: [
      {
        animationDelay() {
          return Math.random() * 400;
        },
        animationEasing: 'exponentialInOut',
        animationType: 'scale',
        center: ['50%', '50%'],
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        data: data.toSorted((a, b) => {
          return a.value - b.value;
        }),
        name: '药品分类',
        radius: '80%',
        roseType: 'radius',
        type: 'pie',
      },
    ],

    tooltip: {
      trigger: 'item',
    },
  });
}

onMounted(renderChart);

watch(() => props.campus, renderChart);
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>
