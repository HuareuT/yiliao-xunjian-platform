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

const monthlyDataMap: Record<string, number[]> = {
  全部: [186, 204, 218, 246, 263, 326, 0, 0, 0, 0, 0, 0],
  大学城: [98, 112, 126, 141, 158, 186, 0, 0, 0, 0, 0, 0],
  江津: [88, 92, 92, 105, 105, 140, 0, 0, 0, 0, 0, 0],
};

function renderChart() {
  const data = monthlyDataMap[props.campus] ?? monthlyDataMap['全部']!;

  renderEcharts({
    grid: {
      bottom: 0,
      containLabel: true,
      left: '1%',
      right: '1%',
      top: '2%',
    },
    series: [
      {
        barMaxWidth: 80,
        color: '#5ab1ef',
        data,
        name: '巡诊数',
        type: 'bar',
      },
    ],
    tooltip: {
      axisPointer: {
        lineStyle: {
          // color: '#4f69fd',
          width: 1,
        },
      },
      trigger: 'axis',
    },
    xAxis: {
      data: Array.from({ length: 12 }).map((_item, index) => `${index + 1}月`),
      type: 'category',
    },
    yAxis: {
      max: props.campus === '全部' ? 360 : 220,
      splitNumber: 4,
      type: 'value',
    },
  });
}

onMounted(renderChart);

watch(() => props.campus, renderChart);
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>
