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

const trendDataMap: Record<
  string,
  {
    keyVisits: number[];
    totalVisits: number[];
  }
> = {
  全部: {
    keyVisits: [7, 11, 9, 14, 12, 16, 11],
    totalVisits: [25, 34, 29, 39, 34, 45, 39],
  },
  大学城: {
    keyVisits: [4, 6, 5, 8, 7, 9, 6],
    totalVisits: [14, 19, 16, 22, 18, 25, 21],
  },
  江津: {
    keyVisits: [3, 5, 4, 6, 5, 7, 5],
    totalVisits: [11, 15, 13, 17, 16, 20, 18],
  },
};

function renderChart() {
  const data = trendDataMap[props.campus] ?? trendDataMap['全部']!;
  renderEcharts({
    legend: {
      data: ['巡诊总数', '重点巡诊'],
      top: 0,
    },
    grid: {
      bottom: 0,
      containLabel: true,
      left: '1%',
      right: '1%',
      top: '12%',
    },
    series: [
      {
        areaStyle: {},
        data: data.totalVisits,
        itemStyle: {
          color: '#5ab1ef',
        },
        name: '巡诊总数',
        smooth: true,
        type: 'line',
      },
      {
        areaStyle: {},
        data: data.keyVisits,
        itemStyle: {
          color: '#019680',
        },
        name: '重点巡诊',
        smooth: true,
        type: 'line',
      },
    ],
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: '#019680',
          width: 1,
        },
      },
      trigger: 'axis',
    },
    xAxis: {
      axisTick: {
        show: false,
      },
      boundaryGap: false,
      data: ['06-20', '06-21', '06-22', '06-23', '06-24', '06-25', '06-26'],
      splitLine: {
        lineStyle: {
          type: 'solid',
          width: 1,
        },
        show: true,
      },
      type: 'category',
    },
    yAxis: [
      {
        axisTick: {
          show: false,
        },
        max: props.campus === '全部' ? 50 : 30,
        splitArea: {
          show: true,
        },
        splitNumber: 4,
        type: 'value',
      },
    ],
  });
}

onMounted(renderChart);

watch(() => props.campus, renderChart);
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>
