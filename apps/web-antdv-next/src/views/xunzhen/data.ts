import type { DescriptionsItemType } from '@vben/common-ui';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridColumns } from '#/adapter/vxe-table';

export interface XunzhenRecord {
  diagnosisType: string;
  doctorName: string;
  id: string;
  inspectionDate: string;
  nurseName: string;
  patientType: string;
  visitType: string;
}

export interface XunzhenQueryParams {
  doctorName?: string;
  inspectionDate?: string;
  nurseName?: string;
  page?: number;
  pageSize?: number;
  visitType?: string;
}

export const visitTypeOptions = [
  { label: '常规巡诊', value: 'routine' },
  { label: '重点巡诊', value: 'key' },
  { label: '复诊巡诊', value: 'followUp' },
  { label: '临时巡诊', value: 'temporary' },
];

export const mockXunzhenRecords: XunzhenRecord[] = [
  {
    diagnosisType: '高血压随访',
    doctorName: '张明',
    id: 'XZ20260625001',
    inspectionDate: '2026-06-25',
    nurseName: '李雪',
    patientType: '慢病患者',
    visitType: 'routine',
  },
  {
    diagnosisType: '糖尿病复查',
    doctorName: '陈宇',
    id: 'XZ20260624002',
    inspectionDate: '2026-06-24',
    nurseName: '王琳',
    patientType: '复诊患者',
    visitType: 'followUp',
  },
  {
    diagnosisType: '术后康复评估',
    doctorName: '刘洋',
    id: 'XZ20260623003',
    inspectionDate: '2026-06-23',
    nurseName: '赵敏',
    patientType: '重点患者',
    visitType: 'key',
  },
  {
    diagnosisType: '呼吸道感染',
    doctorName: '张明',
    id: 'XZ20260622004',
    inspectionDate: '2026-06-22',
    nurseName: '孙悦',
    patientType: '普通患者',
    visitType: 'temporary',
  },
  {
    diagnosisType: '冠心病管理',
    doctorName: '黄静',
    id: 'XZ20260621005',
    inspectionDate: '2026-06-21',
    nurseName: '李雪',
    patientType: '慢病患者',
    visitType: 'routine',
  },
  {
    diagnosisType: '脑卒中康复',
    doctorName: '周航',
    id: 'XZ20260620006',
    inspectionDate: '2026-06-20',
    nurseName: '王琳',
    patientType: '重点患者',
    visitType: 'key',
  },
  {
    diagnosisType: '肺部感染观察',
    doctorName: '陈宇',
    id: 'XZ20260619007',
    inspectionDate: '2026-06-19',
    nurseName: '赵敏',
    patientType: '普通患者',
    visitType: 'temporary',
  },
  {
    diagnosisType: '妊娠期血糖管理',
    doctorName: '黄静',
    id: 'XZ20260618008',
    inspectionDate: '2026-06-18',
    nurseName: '孙悦',
    patientType: '复诊患者',
    visitType: 'followUp',
  },
  {
    diagnosisType: '慢阻肺随访',
    doctorName: '刘洋',
    id: 'XZ20260617009',
    inspectionDate: '2026-06-17',
    nurseName: '李雪',
    patientType: '慢病患者',
    visitType: 'routine',
  },
  {
    diagnosisType: '贫血原因待查',
    doctorName: '周航',
    id: 'XZ20260616010',
    inspectionDate: '2026-06-16',
    nurseName: '赵敏',
    patientType: '普通患者',
    visitType: 'temporary',
  },
  {
    diagnosisType: '骨折术后复查',
    doctorName: '张明',
    id: 'XZ20260615011',
    inspectionDate: '2026-06-15',
    nurseName: '王琳',
    patientType: '复诊患者',
    visitType: 'followUp',
  },
  {
    diagnosisType: '肾功能异常观察',
    doctorName: '陈宇',
    id: 'XZ20260614012',
    inspectionDate: '2026-06-14',
    nurseName: '孙悦',
    patientType: '重点患者',
    visitType: 'key',
  },
];

function fuzzyMatch(value: string, keyword?: string) {
  return !keyword || value.includes(keyword.trim());
}

export async function getMockXunzhenList(params: XunzhenQueryParams) {
  const currentPage = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  const filtered = mockXunzhenRecords.filter((item) => {
    return (
      fuzzyMatch(item.doctorName, params.doctorName) &&
      fuzzyMatch(item.nurseName, params.nurseName) &&
      (!params.inspectionDate ||
        item.inspectionDate === params.inspectionDate) &&
      (!params.visitType || item.visitType === params.visitType)
    );
  });

  return {
    items: filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    total: filtered.length,
  };
}

export function getVisitTypeLabel(value?: string) {
  return visitTypeOptions.find((item) => item.value === value)?.label ?? value;
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'DatePicker',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
      },
      fieldName: 'inspectionDate',
      label: '巡诊日期',
    },
    {
      component: 'Input',
      fieldName: 'doctorName',
      label: '医生姓名',
    },
    {
      component: 'Input',
      fieldName: 'nurseName',
      label: '护士姓名',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: visitTypeOptions,
      },
      fieldName: 'visitType',
      label: '巡诊类型',
    },
  ];
}

export function useColumns(): VxeTableGridColumns<XunzhenRecord> {
  return [
    {
      field: 'id',
      fixed: 'left',
      title: '编号',
      width: 170,
    },
    {
      field: 'inspectionDate',
      title: '巡检日期',
      width: 140,
    },
    {
      field: 'doctorName',
      title: '医生姓名',
      width: 120,
    },
    {
      field: 'nurseName',
      title: '护士姓名',
      width: 120,
    },
    {
      field: 'patientType',
      title: '患者类型',
      width: 140,
    },
    {
      field: 'diagnosisType',
      minWidth: 180,
      title: '诊断类型',
    },
    {
      align: 'center',
      field: 'operation',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
  ];
}

export function useDescriptionItems(
  row?: XunzhenRecord,
): DescriptionsItemType[] {
  return [
    { label: '编号', content: row?.id },
    { label: '巡检日期', content: row?.inspectionDate },
    { label: '医生姓名', content: row?.doctorName },
    { label: '护士姓名', content: row?.nurseName },
    { label: '患者类型', content: row?.patientType },
    { label: '诊断类型', content: row?.diagnosisType },
    { label: '巡诊类型', content: getVisitTypeLabel(row?.visitType) },
  ];
}
