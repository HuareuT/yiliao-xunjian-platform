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
  medicationDosage?: string;
  medicationRemark?: string;
  medicationUsage?: string;
  status: number;
  treatmentDressingRemark?: string;
  treatmentIceRemark?: string;
  treatmentItems?: string[];
  treatmentObservationRemark?: string;
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
    medicationDosage: '每日1次，每次1片',
    medicationRemark: '监测血压变化，低血压时暂停使用',
    medicationUsage: '口服',
    status: 1,
    treatmentItems: ['静养观察'],
    treatmentObservationRemark: '建议减少剧烈运动，观察头晕、胸闷等症状',
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
    medicationDosage: '每日2次，每次1片',
    medicationRemark: '餐后血糖异常时及时复查',
    medicationUsage: '餐后口服',
    status: 1,
    treatmentItems: ['静养观察'],
    treatmentObservationRemark: '记录血糖变化，避免空腹运动',
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
    medicationDosage: '每日3次，每次1袋',
    medicationRemark: '咳喘加重时复诊',
    medicationUsage: '温水冲服',
    status: 0,
    treatmentItems: ['静养观察'],
    treatmentObservationRemark: '避免冷空气刺激，保持室内通风',
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
    medicationDosage: '按医嘱执行',
    medicationRemark: '术前禁食禁水',
    medicationUsage: '静脉给药',
    status: 1,
    treatmentItems: ['冰敷', '静养观察'],
    treatmentIceRemark: '腹部疼痛区域短时冰敷，避免冻伤',
    treatmentObservationRemark: '严密观察腹痛变化和体温',
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
    medicationDosage: '每日2次，每次1粒',
    medicationRemark: '疼痛明显时及时处理',
    medicationUsage: '饭后口服',
    status: 1,
    treatmentItems: ['静养观察'],
    treatmentObservationRemark: '清淡饮食，观察右上腹疼痛变化',
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
    medicationDosage: '按体重计算用量',
    medicationRemark: '注意观察皮疹、腹泻等不良反应',
    medicationUsage: '雾化或口服',
    status: 1,
    treatmentItems: ['静养观察'],
    treatmentObservationRemark: '观察体温、咳嗽和呼吸频率',
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
    medicationDosage: '每日2次，每次1片',
    medicationRemark: '遵医嘱完成疗程',
    medicationUsage: '口服',
    status: 1,
    treatmentItems: ['静养观察'],
    treatmentObservationRemark: '避免劳累，观察腹痛和分泌物变化',
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
    medicationDosage: '按急诊医嘱执行',
    medicationRemark: '明确病因前慎用止痛药',
    medicationUsage: '静脉或口服',
    status: 1,
    treatmentItems: ['冰敷', '静养观察'],
    treatmentIceRemark: '疼痛区域短时冰敷',
    treatmentObservationRemark: '观察疼痛部位、程度和伴随症状',
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
    {
      component: 'Divider',
      fieldName: 'prescriptionDivider',
      hideLabel: true,
      renderComponentContent: () => ({
        default: () => '开药',
      }),
    },
    {
      component: 'Input',
      fieldName: 'medicationDosage',
      label: '用量',
    },
    {
      component: 'Input',
      fieldName: 'medicationUsage',
      label: '用法',
    },
    {
      component: 'Textarea',
      componentProps: {
        maxLength: 100,
        rows: 3,
        showCount: true,
      },
      fieldName: 'medicationRemark',
      label: '开药备注',
    },
    {
      component: 'Divider',
      fieldName: 'treatmentDivider',
      hideLabel: true,
      renderComponentContent: () => ({
        default: () => '处置',
      }),
    },
    {
      component: 'CheckboxGroup',
      componentProps: {
        options: [
          { label: '换药', value: '换药' },
          { label: '冰敷', value: '冰敷' },
          { label: '静养观察', value: '静养观察' },
        ],
      },
      fieldName: 'treatmentItems',
      label: '处置项',
    },
    {
      component: 'Textarea',
      componentProps: {
        maxLength: 100,
        rows: 3,
        showCount: true,
      },
      fieldName: 'treatmentDressingRemark',
      label: '换药备注',
    },
    {
      component: 'Textarea',
      componentProps: {
        maxLength: 100,
        rows: 3,
        showCount: true,
      },
      fieldName: 'treatmentIceRemark',
      label: '冰敷备注',
    },
    {
      component: 'Textarea',
      componentProps: {
        maxLength: 100,
        rows: 3,
        showCount: true,
      },
      fieldName: 'treatmentObservationRemark',
      label: '静养观察备注',
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
      align: 'center',
      fixed: 'left',
      type: 'checkbox',
      width: 60,
    },
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
