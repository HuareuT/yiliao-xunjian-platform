import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridColumns } from '#/adapter/vxe-table';

export interface RizhiRecord {
  content: string;
  id: string;
  operationTime: string;
  operationType: string;
  operator: string;
}

export interface RizhiQueryParams {
  operationTime?: string;
  operationType?: string;
  operator?: string;
  page?: number;
  pageSize?: number;
}

export const operationTypeOptions = [
  { label: '新增', value: '新增' },
  { label: '修改', value: '修改' },
  { label: '删除', value: '删除' },
  { label: '导出', value: '导出' },
  { label: '停用', value: '停用' },
];

export const mockRizhiRecords: RizhiRecord[] = [
  {
    content: '新增了保障点[江津-新生军训]',
    id: 'LOG20260626001',
    operationTime: '2026-06-26 09:12:00',
    operationType: '新增',
    operator: '管理员',
  },
  {
    content: '修改了药品[硝苯地平缓释片]的库存数量',
    id: 'LOG20260626002',
    operationTime: '2026-06-26 09:28:00',
    operationType: '修改',
    operator: '张明',
  },
  {
    content: '删除了诊断类型[慢性支气管炎]',
    id: 'LOG20260626003',
    operationTime: '2026-06-26 10:05:00',
    operationType: '删除',
    operator: '李雪',
  },
  {
    content: '导出了巡诊记录',
    id: 'LOG20260626004',
    operationTime: '2026-06-26 10:36:00',
    operationType: '导出',
    operator: '管理员',
  },
  {
    content: '停用了诊断类型[急性腹痛]',
    id: 'LOG20260626005',
    operationTime: '2026-06-26 11:10:00',
    operationType: '停用',
    operator: '陈宇',
  },
  {
    content: '新增了药品[布洛芬缓释胶囊]',
    id: 'LOG20260625006',
    operationTime: '2026-06-25 14:22:00',
    operationType: '新增',
    operator: '王琳',
  },
  {
    content: '修改了保障点[大学城-操场]的备注',
    id: 'LOG20260625007',
    operationTime: '2026-06-25 15:18:00',
    operationType: '修改',
    operator: '赵敏',
  },
  {
    content: '导出了药品管理列表',
    id: 'LOG20260624008',
    operationTime: '2026-06-24 16:45:00',
    operationType: '导出',
    operator: '管理员',
  },
  {
    content: '删除了药品[板蓝根颗粒]',
    id: 'LOG20260624009',
    operationTime: '2026-06-24 17:12:00',
    operationType: '删除',
    operator: '黄静',
  },
  {
    content: '新增了诊断分类[急诊科]',
    id: 'LOG20260623010',
    operationTime: '2026-06-23 08:40:00',
    operationType: '新增',
    operator: '周航',
  },
];

function fuzzyMatch(value: string, keyword?: string) {
  return !keyword || value.includes(keyword.trim());
}

export async function getMockRizhiList(params: RizhiQueryParams) {
  const currentPage = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  const filtered = mockRizhiRecords.filter((item) => {
    return (
      fuzzyMatch(item.operator, params.operator) &&
      (!params.operationType || item.operationType === params.operationType) &&
      (!params.operationTime ||
        item.operationTime.startsWith(params.operationTime))
    );
  });

  return {
    items: filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    total: filtered.length,
  };
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'operator',
      label: '操作人',
    },
    {
      component: 'DatePicker',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
      },
      fieldName: 'operationTime',
      label: '操作时间',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: operationTypeOptions,
      },
      fieldName: 'operationType',
      label: '操作类型',
    },
  ];
}

export function useColumns(): VxeTableGridColumns<RizhiRecord> {
  return [
    {
      field: 'operationTime',
      fixed: 'left',
      title: '操作时间',
      width: 180,
    },
    {
      field: 'operator',
      title: '操作人',
      width: 120,
    },
    {
      field: 'operationType',
      title: '操作类型',
      width: 120,
    },
    {
      field: 'content',
      minWidth: 320,
      title: '操作内容',
    },
  ];
}

