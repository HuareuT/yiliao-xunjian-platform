<script lang="ts" setup>
import type { AnalysisOverviewItem } from '@vben/common-ui';

import { computed, ref } from 'vue';

import { AnalysisChartCard, AnalysisOverview } from '@vben/common-ui';
import {
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
} from '@vben/icons';

import { RadioGroup } from 'antdv-next';

import AnalyticsTrends from './analytics-trends.vue';
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSales from './analytics-visits-sales.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';
import AnalyticsVisits from './analytics-visits.vue';

const activeCampus = ref('全部');
const campusOptions = [
  { label: '全部', value: '全部' },
  { label: '大学城', value: '大学城' },
  { label: '江津', value: '江津' },
];

const overviewDataMap = {
  全部: {
    diagnosisEnabled: 7,
    diagnosisTotal: 8,
    drugWarning: 4,
    lastMonthVisits: 288,
    monthVisits: 326,
    todayVisits: 18,
    yesterdayVisits: 15,
  },
  大学城: {
    diagnosisEnabled: 5,
    diagnosisTotal: 6,
    drugWarning: 2,
    lastMonthVisits: 158,
    monthVisits: 186,
    todayVisits: 10,
    yesterdayVisits: 8,
  },
  江津: {
    diagnosisEnabled: 4,
    diagnosisTotal: 5,
    drugWarning: 2,
    lastMonthVisits: 130,
    monthVisits: 140,
    todayVisits: 8,
    yesterdayVisits: 7,
  },
};

const overviewItems = computed<AnalysisOverviewItem[]>(() => {
  const data =
    overviewDataMap[activeCampus.value as keyof typeof overviewDataMap] ??
    overviewDataMap['全部'];

  return [
    {
      icon: SvgCardIcon,
      title: '今日巡诊数',
      totalTitle: '昨日巡诊数',
      totalValue: data.yesterdayVisits,
      value: data.todayVisits,
    },
    {
      icon: SvgCakeIcon,
      title: '本月巡诊数',
      totalTitle: '上月巡诊数',
      totalValue: data.lastMonthVisits,
      value: data.monthVisits,
    },
    {
      icon: SvgDownloadIcon,
      title: '药品预警数',
      totalTitle: '低库存药品',
      totalValue: data.drugWarning,
      value: data.drugWarning,
    },
    {
      icon: SvgBellIcon,
      title: '启用诊断类型',
      totalTitle: '诊断库总数',
      totalValue: data.diagnosisTotal,
      value: data.diagnosisEnabled,
    },
  ];
});

</script>

<template>
  <div class="p-5">
    <div class="mb-5 flex justify-start">
      <RadioGroup
        v-model:value="activeCampus"
        :options="campusOptions"
        button-style="solid"
        option-type="button"
      />
    </div>
    <AnalysisOverview :items="overviewItems" />

    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard
        class="mt-5 md:mt-0 md:mr-4 md:w-1/2"
        title="巡诊趋势分析"
      >
        <AnalyticsTrends :campus="activeCampus" />
      </AnalysisChartCard>
      <AnalysisChartCard
        class="mt-5 md:mt-0 md:w-1/2"
        title="月度巡诊统计"
      >
        <AnalyticsVisits :campus="activeCampus" />
      </AnalysisChartCard>
    </div>

    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard class="mt-5 md:mt-0 md:mr-4 md:w-1/3" title="巡诊处理画像">
        <AnalyticsVisitsData :campus="activeCampus" />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:mr-4 md:w-1/3" title="按诊断分类">
        <AnalyticsVisitsSource :campus="activeCampus" />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/3" title="按药品分类">
        <AnalyticsVisitsSales :campus="activeCampus" />
      </AnalysisChartCard>
    </div>
  </div>
</template>
