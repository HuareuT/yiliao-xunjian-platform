import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridColumns } from '#/adapter/vxe-table';

export interface YaopinRecord {
  category: string;
  id: string;
  inventory: number;
  limit: string;
  name: string;
  specification: string;
  unit: string;
}

export const categoryOptions = [
  { label: '西药', value: '西药' },
  { label: '中成药', value: '中成药' },
  { label: '中药饮片', value: '中药饮片' },
  { label: '耗材类', value: '耗材类' },
];

export const mockYaopinRecords: YaopinRecord[] = [
  {
    category: '西药',
    id: 'YP20260625001',
    inventory: 320,
    limit: '儿童慎用',
    name: '阿莫西林胶囊',
    specification: '0.25g*24粒',
    unit: '盒',
  },
  {
    category: '中成药',
    id: 'YP20260625002',
    inventory: 186,
    limit: '孕妇慎用',
    name: '感冒清热颗粒',
    specification: '10g*9袋',
    unit: '盒',
  },
  {
    category: '西药',
    id: 'YP20260625003',
    inventory: 86,
    limit: '需医嘱使用',
    name: '布洛芬缓释胶囊',
    specification: '0.3g*20粒',
    unit: '盒',
  },
  {
    category: '中药饮片',
    id: 'YP20260625004',
    inventory: 52,
    limit: '煎煮后服用',
    name: '黄芪',
    specification: '250g/袋',
    unit: '袋',
  },
  {
    category: '耗材类',
    id: 'YP20260625005',
    inventory: 640,
    limit: '一次性使用',
    name: '医用外科口罩',
    specification: '175mm*95mm',
    unit: '包',
  },
  {
    category: '中成药',
    id: 'YP20260625006',
    inventory: 120,
    limit: '饭后服用',
    name: '板蓝根颗粒',
    specification: '10g*20袋',
    unit: '盒',
  },
  {
    category: '西药',
    id: 'YP20260625007',
    inventory: 74,
    limit: '糖尿病患者慎用',
    name: '二甲双胍片',
    specification: '0.5g*60片',
    unit: '盒',
  },
  {
    category: '中药饮片',
    id: 'YP20260625008',
    inventory: 40,
    limit: '遵医嘱煎服',
    name: '当归',
    specification: '250g/袋',
    unit: '袋',
  },
  {
    category: '耗材类',
    id: 'YP20260625009',
    inventory: 900,
    limit: '无菌保存',
    name: '一次性注射器',
    specification: '5ml',
    unit: '支',
  },
];

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: '名称',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: categoryOptions,
      },
      fieldName: 'category',
      label: '分类',
    },
  ];
}

export function useColumns<T = YaopinRecord>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridColumns<T> {
  return [
    {
      field: 'name',
      fixed: 'left',
      title: '药品名称',
      width: 180,
    },
    {
      field: 'unit',
      title: '单位',
      width: 100,
    },
    {
      field: 'specification',
      title: '规格',
      width: 160,
    },
    {
      field: 'category',
      title: '分类',
      width: 120,
    },
    {
      field: 'inventory',
      title: '库存',
      width: 100,
    },
    {
      field: 'limit',
      minWidth: 180,
      title: '使用限制',
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: '药品名称',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
      field: 'operation',
      fixed: 'right',
      title: '操作',
      width: 180,
    },
  ];
}

