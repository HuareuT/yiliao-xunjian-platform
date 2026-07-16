import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridColumns } from '#/adapter/vxe-table';

export interface ChuzhiRecord {
  createBy: string;
  createTime: string;
  id: string;
  name: string;
  status: number;
  updateBy: string;
  updateTime: string;
}

export const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

export const mockChuzhiRecords: ChuzhiRecord[] = [
  {
    createBy: '管理员',
    createTime: '2026-06-01 09:20:00',
    id: 'CZFS20260601001',
    name: '静养观察',
    status: 1,
    updateBy: '管理员',
    updateTime: '2026-06-18 11:30:00',
  },
  {
    createBy: '管理员',
    createTime: '2026-06-03 10:12:00',
    id: 'CZFS20260603002',
    name: '换药',
    status: 1,
    updateBy: '李医生',
    updateTime: '2026-06-20 14:22:00',
  },
  {
    createBy: '王护士',
    createTime: '2026-06-05 15:35:00',
    id: 'CZFS20260605003',
    name: '冰敷',
    status: 1,
    updateBy: '王护士',
    updateTime: '2026-06-21 09:42:00',
  },
  {
    createBy: '管理员',
    createTime: '2026-06-08 08:45:00',
    id: 'CZFS20260608004',
    name: '雾化吸入',
    status: 0,
    updateBy: '管理员',
    updateTime: '2026-06-23 16:10:00',
  },
  {
    createBy: '赵医生',
    createTime: '2026-06-12 13:18:00',
    id: 'CZFS20260612005',
    name: '伤口消毒',
    status: 1,
    updateBy: '赵医生',
    updateTime: '2026-06-25 10:08:00',
  },
];

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: '处置方式名称',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: statusOptions,
      },
      fieldName: 'status',
      label: '状态',
    },
  ];
}

export function useColumns<T = ChuzhiRecord>(
  onActionClick: OnActionClickFn<T>,
  onStatusChange?: (
    newStatus: number,
    row: T,
  ) => PromiseLike<boolean | undefined>,
): VxeTableGridColumns<T> {
  return [
    {
      field: 'name',
      fixed: 'left',
      minWidth: 180,
      title: '处置方式名称',
    },
    {
      cellRender: {
        attrs: { beforeChange: onStatusChange },
        name: 'CellSwitch',
      },
      field: 'status',
      title: '状态',
      width: 120,
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 180,
    },
    {
      field: 'createBy',
      title: '创建人',
      width: 120,
    },
    {
      field: 'updateTime',
      title: '修改时间',
      width: 180,
    },
    {
      field: 'updateBy',
      title: '修改人',
      width: 120,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: '处置方式',
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
