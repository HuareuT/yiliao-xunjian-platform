<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    legend: {
      bottom: 0,
      data: ['本月', '上月'],
    },
    radar: {
      indicator: [
        {
          max: 180,
          name: '常规巡诊',
        },
        {
          max: 120,
          name: '重点巡诊',
        },
        {
          max: 120,
          name: '复诊巡诊',
        },
        {
          max: 80,
          name: '临时巡诊',
        },
        {
          max: 260,
          name: '开药处理',
        },
        {
          max: 180,
          name: '处置处理',
        },
      ],
      radius: '60%',
      splitNumber: 5,
    },
    series: [
      {
        areaStyle: {
          opacity: 1,
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
        },
        data: [
          {
            itemStyle: {
              color: '#b6a2de',
            },
            name: '本月',
            value: [132, 76, 68, 50, 214, 156],
          },
          {
            itemStyle: {
              color: '#5ab1ef',
            },
            name: '上月',
            value: [118, 64, 58, 48, 186, 139],
          },
        ],
        itemStyle: {
          // borderColor: '#fff',
          borderRadius: 10,
          borderWidth: 2,
        },
        symbolSize: 0,
        type: 'radar',
      },
    ],
    tooltip: {},
  });
});
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>
