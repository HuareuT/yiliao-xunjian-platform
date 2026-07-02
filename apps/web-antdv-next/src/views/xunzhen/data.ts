import type { DescriptionsItemType } from "@vben/common-ui";

import type { VbenFormSchema } from "#/adapter/form";
import type { VxeTableGridColumns } from "#/adapter/vxe-table";

export interface XunzhenRecord {
  campus: string;
  diagnosisType: string;
  doctorName: string;
  id: string;
  inspectionDate: string;
  nurseName: string;
  patientType: string;
  visitType: string;
}

interface XunzhenCareInfo {
  medicationDosage: string;
  medicationRemark: string;
  medicationUsage: string;
  treatmentItems: string[];
  treatmentRemarks: Record<string, string>;
}

export interface XunzhenQueryParams {
  campus?: string;
  doctorName?: string;
  inspectionDate?: string;
  nurseName?: string;
  page?: number;
  pageSize?: number;
  visitType?: string;
}

export const visitTypeOptions = [
  { label: "常规巡诊", value: "routine" },
  { label: "重点巡诊", value: "key" },
  { label: "复诊巡诊", value: "followUp" },
  { label: "临时巡诊", value: "temporary" },
];

export const campusOptions = [
  { label: "大学城", value: "大学城" },
  { label: "江津", value: "江津" },
];

export const mockXunzhenRecords: XunzhenRecord[] = [
  {
    campus: "大学城",
    diagnosisType: "高血压随访",
    doctorName: "张明",
    id: "XZ20260625001",
    inspectionDate: "2026-06-25",
    nurseName: "李雪",
    patientType: "慢病患者",
    visitType: "routine",
  },
  {
    campus: "大学城",
    diagnosisType: "糖尿病复查",
    doctorName: "陈宇",
    id: "XZ20260624002",
    inspectionDate: "2026-06-24",
    nurseName: "王琳",
    patientType: "复诊患者",
    visitType: "followUp",
  },
  {
    campus: "大学城",
    diagnosisType: "术后康复评估",
    doctorName: "刘洋",
    id: "XZ20260623003",
    inspectionDate: "2026-06-23",
    nurseName: "赵敏",
    patientType: "重点患者",
    visitType: "key",
  },
  {
    campus: "大学城",
    diagnosisType: "呼吸道感染",
    doctorName: "张明",
    id: "XZ20260622004",
    inspectionDate: "2026-06-22",
    nurseName: "孙悦",
    patientType: "普通患者",
    visitType: "temporary",
  },
  {
    campus: "大学城",
    diagnosisType: "冠心病管理",
    doctorName: "黄静",
    id: "XZ20260621005",
    inspectionDate: "2026-06-21",
    nurseName: "李雪",
    patientType: "慢病患者",
    visitType: "routine",
  },
  {
    campus: "大学城",
    diagnosisType: "脑卒中康复",
    doctorName: "周航",
    id: "XZ20260620006",
    inspectionDate: "2026-06-20",
    nurseName: "王琳",
    patientType: "重点患者",
    visitType: "key",
  },
  {
    campus: "江津",
    diagnosisType: "肺部感染观察",
    doctorName: "陈宇",
    id: "XZ20260619007",
    inspectionDate: "2026-06-19",
    nurseName: "赵敏",
    patientType: "普通患者",
    visitType: "temporary",
  },
  {
    campus: "江津",
    diagnosisType: "妊娠期血糖管理",
    doctorName: "黄静",
    id: "XZ20260618008",
    inspectionDate: "2026-06-18",
    nurseName: "孙悦",
    patientType: "复诊患者",
    visitType: "followUp",
  },
  {
    campus: "江津",
    diagnosisType: "慢阻肺随访",
    doctorName: "刘洋",
    id: "XZ20260617009",
    inspectionDate: "2026-06-17",
    nurseName: "李雪",
    patientType: "慢病患者",
    visitType: "routine",
  },
  {
    campus: "江津",
    diagnosisType: "贫血原因待查",
    doctorName: "周航",
    id: "XZ20260616010",
    inspectionDate: "2026-06-16",
    nurseName: "赵敏",
    patientType: "普通患者",
    visitType: "temporary",
  },
  {
    campus: "江津",
    diagnosisType: "骨折术后复查",
    doctorName: "张明",
    id: "XZ20260615011",
    inspectionDate: "2026-06-15",
    nurseName: "王琳",
    patientType: "复诊患者",
    visitType: "followUp",
  },
  {
    campus: "江津",
    diagnosisType: "肾功能异常观察",
    doctorName: "陈宇",
    id: "XZ20260614012",
    inspectionDate: "2026-06-14",
    nurseName: "孙悦",
    patientType: "重点患者",
    visitType: "key",
  },
];

const careInfoMap: Record<string, XunzhenCareInfo> = {
  高血压随访: {
    medicationDosage: "每日1次，每次1片",
    medicationRemark: "监测血压变化，低血压或头晕时暂停并复诊",
    medicationUsage: "口服",
    treatmentItems: ["静养观察"],
    treatmentRemarks: {
      静养观察: "减少剧烈运动，连续记录晨起和睡前血压",
    },
  },
  糖尿病复查: {
    medicationDosage: "每日2次，每次1片",
    medicationRemark: "餐后血糖异常时及时复查",
    medicationUsage: "餐后口服",
    treatmentItems: ["静养观察"],
    treatmentRemarks: {
      静养观察: "记录空腹及餐后血糖，避免空腹运动",
    },
  },
  术后康复评估: {
    medicationDosage: "按医嘱执行",
    medicationRemark: "如伤口红肿渗液需及时复诊",
    medicationUsage: "外用或口服",
    treatmentItems: ["换药", "静养观察"],
    treatmentRemarks: {
      换药: "保持伤口清洁干燥，每日观察敷料渗出情况",
      静养观察: "避免牵拉伤口，观察体温和疼痛变化",
    },
  },
  呼吸道感染: {
    medicationDosage: "每日3次，每次1袋",
    medicationRemark: "咳喘加重或发热不退时复诊",
    medicationUsage: "温水冲服",
    treatmentItems: ["静养观察"],
    treatmentRemarks: {
      静养观察: "保持室内通风，多饮水，观察呼吸频率",
    },
  },
  冠心病管理: {
    medicationDosage: "每日1次，每次1片",
    medicationRemark: "胸痛加重时立即停止活动并就医",
    medicationUsage: "口服",
    treatmentItems: ["静养观察"],
    treatmentRemarks: {
      静养观察: "避免情绪激动和剧烈运动，记录胸闷胸痛情况",
    },
  },
  脑卒中康复: {
    medicationDosage: "每日1次，每次1片",
    medicationRemark: "按康复计划执行，观察肢体活动变化",
    medicationUsage: "口服",
    treatmentItems: ["静养观察"],
    treatmentRemarks: {
      静养观察: "协助进行轻量康复训练，防跌倒",
    },
  },
  肺部感染观察: {
    medicationDosage: "每日2次，每次1片",
    medicationRemark: "痰量增多或气促加重时复诊",
    medicationUsage: "饭后口服",
    treatmentItems: ["静养观察"],
    treatmentRemarks: {
      静养观察: "观察体温、咳嗽和血氧变化",
    },
  },
  妊娠期血糖管理: {
    medicationDosage: "按医嘱调整",
    medicationRemark: "避免自行增减用药",
    medicationUsage: "餐前或餐后按医嘱使用",
    treatmentItems: ["静养观察"],
    treatmentRemarks: {
      静养观察: "记录饮食和血糖变化，异常时联系医生",
    },
  },
  慢阻肺随访: {
    medicationDosage: "每日2次，每次1吸",
    medicationRemark: "使用吸入装置后漱口",
    medicationUsage: "吸入",
    treatmentItems: ["静养观察"],
    treatmentRemarks: {
      静养观察: "避免冷空气刺激，观察喘息和活动耐量",
    },
  },
  贫血原因待查: {
    medicationDosage: "每日1次，每次1片",
    medicationRemark: "复查血常规后调整方案",
    medicationUsage: "饭后口服",
    treatmentItems: ["静养观察"],
    treatmentRemarks: {
      静养观察: "避免劳累，观察头晕乏力变化",
    },
  },
  骨折术后复查: {
    medicationDosage: "疼痛明显时按医嘱使用",
    medicationRemark: "避免超量使用止痛药",
    medicationUsage: "口服",
    treatmentItems: ["冰敷", "静养观察"],
    treatmentRemarks: {
      冰敷: "肿胀部位短时冰敷，避免冻伤",
      静养观察: "抬高患肢，观察肿胀和末梢血运",
    },
  },
  肾功能异常观察: {
    medicationDosage: "按医嘱执行",
    medicationRemark: "避免使用肾毒性药物",
    medicationUsage: "口服",
    treatmentItems: ["静养观察"],
    treatmentRemarks: {
      静养观察: "记录尿量、水肿和血压变化",
    },
  },
};

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
      (!params.campus || item.campus === params.campus) &&
      (!params.inspectionDate || item.inspectionDate === params.inspectionDate) &&
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
      component: "DatePicker",
      componentProps: {
        valueFormat: "YYYY-MM-DD",
      },
      fieldName: "inspectionDate",
      label: "巡诊日期",
    },
    {
      component: "Input",
      fieldName: "doctorName",
      label: "医生姓名",
    },
    {
      component: "Input",
      fieldName: "nurseName",
      label: "护士姓名",
    },
    {
      component: "Select",
      componentProps: {
        allowClear: true,
        options: visitTypeOptions,
      },
      fieldName: "visitType",
      label: "巡诊类型",
    },
  ];
}

export function useColumns(): VxeTableGridColumns<XunzhenRecord> {
  return [
    {
      field: "id",
      fixed: "left",
      title: "编号",
      width: 170,
    },
    {
      field: "inspectionDate",
      title: "巡检日期",
      width: 140,
    },
    {
      field: "doctorName",
      title: "医生姓名",
      width: 120,
    },
    {
      field: "nurseName",
      title: "护士姓名",
      width: 120,
    },
    {
      field: "patientType",
      title: "患者类型",
      width: 140,
    },
    {
      field: "diagnosisType",
      minWidth: 180,
      title: "诊断类型",
    },
    {
      align: "center",
      field: "operation",
      fixed: "right",
      slots: { default: "action" },
      title: "操作",
      width: 120,
    },
  ];
}

export function useDescriptionItems(row?: XunzhenRecord): DescriptionsItemType[] {
  return [
    { label: "编号", content: row?.id },
    { label: "保障点", content: row?.campus },
    { label: "巡检日期", content: row?.inspectionDate },
    { label: "医生姓名", content: row?.doctorName },
    { label: "护士姓名", content: row?.nurseName },
    { label: "患者类型", content: row?.patientType },
    { label: "诊断类型", content: row?.diagnosisType },
    { label: "巡诊类型", content: getVisitTypeLabel(row?.visitType) },
  ];
}

export function useMedicationDescriptionItems(
  row?: XunzhenRecord,
): DescriptionsItemType[] {
  const careInfo = row ? careInfoMap[row.diagnosisType] : undefined;

  return [
    { label: "用量", content: careInfo?.medicationDosage ?? "暂无" },
    { label: "用法", content: careInfo?.medicationUsage ?? "暂无" },
    { label: "备注", content: careInfo?.medicationRemark ?? "暂无" },
  ];
}

export function useTreatmentDescriptionItems(
  row?: XunzhenRecord,
): DescriptionsItemType[] {
  const careInfo = row ? careInfoMap[row.diagnosisType] : undefined;
  const treatmentItems = careInfo?.treatmentItems ?? [];

  if (treatmentItems.length === 0) {
    return [{ label: "处置项", content: "暂无" }];
  }

  return [
    { label: "处置项", content: treatmentItems.join("、") },
    ...treatmentItems.map((item) => ({
      content: careInfo?.treatmentRemarks[item] ?? "暂无",
      label: `${item}备注`,
    })),
  ];
}
