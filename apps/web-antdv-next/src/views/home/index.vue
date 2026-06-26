<script lang="ts" setup>
import type { AnalysisOverviewItem } from '@vben/common-ui';
import type { TabOption } from '@vben/types';

import {
  AnalysisChartCard,
  AnalysisChartsTabs,
  AnalysisOverview,
} from '@vben/common-ui';
import {
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
} from '@vben/icons';

import AnalyticsTrends from './analytics-trends.vue';
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSales from './analytics-visits-sales.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';
import AnalyticsVisits from './analytics-visits.vue';

const overviewItems: AnalysisOverviewItem[] = [
  {
    icon: SvgCardIcon,
    title: '今日巡诊数',
    totalTitle: '昨日巡诊数',
    totalValue: 15,
    value: 18,
  },
  {
    icon: SvgCakeIcon,
    title: '本月巡诊数',
    totalTitle: '上月巡诊数',
    totalValue: 288,
    value: 326,
  },
  {
    icon: SvgDownloadIcon,
    title: '药品预警数',
    totalTitle: '低库存药品',
    totalValue: 4,
    value: 4,
  },
  {
    icon: SvgBellIcon,
    title: '启用诊断类型',
    totalTitle: '诊断库总数',
    totalValue: 8,
    value: 7,
  },
];

const chartTabs: TabOption[] = [
  {
    label: '巡诊趋势分析',
    value: 'trends',
  },
  {
    label: '月度巡诊统计',
    value: 'visits',
  },
];
</script>

<template>
  <div class="p-5">
    <AnalysisOverview :items="overviewItems" />
    <AnalysisChartsTabs :tabs="chartTabs" class="mt-5">
      <template #trends>
        <AnalyticsTrends />
      </template>
      <template #visits>
        <AnalyticsVisits />
      </template>
    </AnalysisChartsTabs>

    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard class="mt-5 md:mt-0 md:mr-4 md:w-1/3" title="巡诊处理画像">
        <AnalyticsVisitsData />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:mr-4 md:w-1/3" title="按诊断分类">
        <AnalyticsVisitsSource />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/3" title="按药品分类">
        <AnalyticsVisitsSales />
      </AnalysisChartCard>
    </div>
  </div>
</template>
