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

const diagnosisDataMap: Record<string, { name: string; value: number }[]> = {
  全部: [
    { name: '慢病管理', value: 86 },
    { name: '术后康复', value: 42 },
    { name: '呼吸感染', value: 58 },
    { name: '急症观察', value: 31 },
    { name: '妇儿随访', value: 27 },
  ],
  大学城: [
    { name: '慢病管理', value: 48 },
    { name: '术后康复', value: 24 },
    { name: '呼吸感染', value: 30 },
    { name: '急症观察', value: 16 },
    { name: '妇儿随访', value: 15 },
  ],
  江津: [
    { name: '慢病管理', value: 38 },
    { name: '术后康复', value: 18 },
    { name: '呼吸感染', value: 28 },
    { name: '急症观察', value: 15 },
    { name: '妇儿随访', value: 12 },
  ],
};

function renderChart() {
  const data = diagnosisDataMap[props.campus] ?? diagnosisDataMap['全部']!;

  renderEcharts({
    legend: {
      bottom: '2%',
      left: 'center',
    },
    series: [
      {
        animationDelay() {
          return Math.random() * 100;
        },
        animationEasing: 'exponentialInOut',
        animationType: 'scale',
        avoidLabelOverlap: false,
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9', '#ffb980'],
        data,
        emphasis: {
          label: {
            fontSize: '12',
            fontWeight: 'bold',
            show: true,
          },
        },
        itemStyle: {
          // borderColor: '#fff',
          borderRadius: 10,
          borderWidth: 2,
        },
        label: {
          position: 'center',
          show: false,
        },
        labelLine: {
          show: false,
        },
        name: '诊断分类',
        radius: ['40%', '65%'],
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
