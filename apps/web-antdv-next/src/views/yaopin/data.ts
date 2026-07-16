import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridColumns } from '#/adapter/vxe-table';

export interface YaopinRecord {
  id: string;
  manufacturer: string;
  name: string;
  specification: string;
  unit: string;
}

export const manufacturerOptions = [
  { label: '华北制药', value: '华北制药' },
  { label: '同仁堂', value: '同仁堂' },
  { label: '云南白药', value: '云南白药' },
  { label: '鱼跃医疗', value: '鱼跃医疗' },
  { label: '扬子江药业', value: '扬子江药业' },
];

export const mockYaopinRecords: YaopinRecord[] = [
  {
    id: 'YP20260625001',
    manufacturer: '华北制药',
    name: '阿莫西林胶囊',
    specification: '0.25g*24粒',
    unit: '盒',
  },
  {
    id: 'YP20260625002',
    manufacturer: '同仁堂',
    name: '感冒清热颗粒',
    specification: '10g*9袋',
    unit: '盒',
  },
  {
    id: 'YP20260625003',
    manufacturer: '扬子江药业',
    name: '布洛芬缓释胶囊',
    specification: '0.3g*20粒',
    unit: '盒',
  },
  {
    id: 'YP20260625004',
    manufacturer: '云南白药',
    name: '黄芪',
    specification: '250g/袋',
    unit: '袋',
  },
  {
    id: 'YP20260625005',
    manufacturer: '鱼跃医疗',
    name: '医用外科口罩',
    specification: '175mm*95mm',
    unit: '包',
  },
  {
    id: 'YP20260625006',
    manufacturer: '同仁堂',
    name: '板蓝根颗粒',
    specification: '10g*20袋',
    unit: '盒',
  },
  {
    id: 'YP20260625007',
    manufacturer: '华北制药',
    name: '二甲双胍片',
    specification: '0.5g*60片',
    unit: '盒',
  },
  {
    id: 'YP20260625008',
    manufacturer: '云南白药',
    name: '当归',
    specification: '250g/袋',
    unit: '袋',
  },
  {
    id: 'YP20260625009',
    manufacturer: '鱼跃医疗',
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
        options: manufacturerOptions,
      },
      fieldName: 'manufacturer',
      label: '厂家',
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
      minWidth: 180,
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
      field: 'manufacturer',
      width: 180,
      title: '厂家',
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
