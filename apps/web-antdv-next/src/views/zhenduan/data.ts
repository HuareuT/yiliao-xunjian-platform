import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridColumns } from '#/adapter/vxe-table';

export interface DiagnosisCategory {
  id: string;
  name: string;
}

export interface DiagnosisRecord {
  categoryId: string;
  categoryName: string;
  createBy: string;
  createTime: string;
  diagnosisType: string;
  id: string;
  status: number;
  updateBy: string;
  updateTime: string;
}

export const mockDiagnosisCategories: DiagnosisCategory[] = [
  { id: 'internal', name: '内科' },
  { id: 'surgery', name: '外科' },
  { id: 'pediatrics', name: '儿科' },
  { id: 'gynecology', name: '妇科' },
  { id: 'emergency', name: '急诊科' },
];

export const mockDiagnosisRecords: DiagnosisRecord[] = [
  {
    categoryId: 'internal',
    categoryName: '内科',
    createBy: '管理员',
    createTime: '2026-06-01 09:12:00',
    diagnosisType: '高血压',
    id: 'ZD20260601001',
    status: 1,
    updateBy: '管理员',
    updateTime: '2026-06-18 11:20:00',
  },
  {
    categoryId: 'internal',
    categoryName: '内科',
    createBy: '管理员',
    createTime: '2026-06-03 10:25:00',
    diagnosisType: '2型糖尿病',
    id: 'ZD20260603002',
    status: 1,
    updateBy: '李医生',
    updateTime: '2026-06-20 14:10:00',
  },
  {
    categoryId: 'internal',
    categoryName: '内科',
    createBy: '王医生',
    createTime: '2026-06-05 15:42:00',
    diagnosisType: '慢性支气管炎',
    id: 'ZD20260605003',
    status: 0,
    updateBy: '王医生',
    updateTime: '2026-06-19 09:30:00',
  },
  {
    categoryId: 'surgery',
    categoryName: '外科',
    createBy: '赵医生',
    createTime: '2026-06-06 08:50:00',
    diagnosisType: '阑尾炎',
    id: 'ZD20260606004',
    status: 1,
    updateBy: '赵医生',
    updateTime: '2026-06-21 16:18:00',
  },
  {
    categoryId: 'surgery',
    categoryName: '外科',
    createBy: '管理员',
    createTime: '2026-06-08 13:16:00',
    diagnosisType: '胆囊结石',
    id: 'ZD20260608005',
    status: 1,
    updateBy: '管理员',
    updateTime: '2026-06-22 10:08:00',
  },
  {
    categoryId: 'pediatrics',
    categoryName: '儿科',
    createBy: '陈医生',
    createTime: '2026-06-10 10:35:00',
    diagnosisType: '小儿肺炎',
    id: 'ZD20260610006',
    status: 1,
    updateBy: '陈医生',
    updateTime: '2026-06-23 09:18:00',
  },
  {
    categoryId: 'gynecology',
    categoryName: '妇科',
    createBy: '刘医生',
    createTime: '2026-06-11 11:08:00',
    diagnosisType: '盆腔炎',
    id: 'ZD20260611007',
    status: 1,
    updateBy: '刘医生',
    updateTime: '2026-06-24 15:42:00',
  },
  {
    categoryId: 'emergency',
    categoryName: '急诊科',
    createBy: '急诊护士站',
    createTime: '2026-06-12 18:20:00',
    diagnosisType: '急性腹痛',
    id: 'ZD20260612008',
    status: 1,
    updateBy: '急诊护士站',
    updateTime: '2026-06-25 08:45:00',
  },
];

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'diagnosisType',
      label: '诊断类型',
    },
  ];
}

export function useDiagnosisFormSchema(
  categories: DiagnosisCategory[],
): VbenFormSchema[] {
  return [
    {
      component: 'Select',
      componentProps: {
        allowClear: false,
        options: categories.map((item) => ({
          label: item.name,
          value: item.id,
        })),
      },
      fieldName: 'categoryId',
      label: '分类',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'diagnosisType',
      label: '诊断类型',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        optionType: 'button',
        options: [
          { label: '启用', value: 1 },
          { label: '停用', value: 0 },
        ],
      },
      defaultValue: 1,
      fieldName: 'status',
      label: '状态',
    },
  ];
}

export function useColumns(
  onStatusChange?: (
    newStatus: number,
    row: DiagnosisRecord,
  ) => PromiseLike<boolean | undefined>,
): VxeTableGridColumns<DiagnosisRecord> {
  return [
    {
      field: 'categoryName',
      fixed: 'left',
      title: '分类',
      width: 120,
    },
    {
      field: 'diagnosisType',
      minWidth: 180,
      title: '诊断类型',
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
      field: 'operation',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 180,
    },
  ];
}

