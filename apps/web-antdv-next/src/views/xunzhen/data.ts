import type { DescriptionsItemType } from "@vben/common-ui";

import type { VbenFormSchema } from "#/adapter/form";
import type { VxeTableGridColumns } from "#/adapter/vxe-table";

import dayjs from "dayjs";

export interface XunzhenRecord {
  contactPhone: string;
  campus: string;
  diagnosisType: string;
  doctorName: string;
  gender: string;
  id: string;
  idCard: string;
  identityCategory: string;
  inspectionDate: string;
  nurseName: string;
  patientName: string;
  phone: string;
  protectionLocation: string;
  protectionObject: string;
  protectionPeopleCount: number;
  protectionType: string;
  queueInfo: string;
  soldierId: string;
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
  inspectionDateRange?: string[];
  nurseName?: string;
  page?: number;
  pageSize?: number;
  patientName?: string;
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
    contactPhone: "13800138001",
    campus: "大学城",
    diagnosisType: "高血压随访",
    doctorName: "张明",
    gender: "男",
    id: "XZ20260625001",
    idCard: "500381198805163215",
    identityCategory: "教职工",
    inspectionDate: "2026-06-25",
    patientName: "王建国",
    phone: "13900139001",
    protectionLocation: "大学城校区东操场",
    protectionObject: "新生军训",
    protectionPeopleCount: 320,
    protectionType: "军训保障",
    queueInfo: "校医院一连",
    soldierId: "DJC-001",
    nurseName: "李雪",
    visitType: "routine",
  },
  {
    contactPhone: "13800138002",
    campus: "大学城",
    diagnosisType: "糖尿病复查",
    doctorName: "陈宇",
    gender: "女",
    id: "XZ20260624002",
    idCard: "500381199103067428",
    identityCategory: "学生",
    inspectionDate: "2026-06-24",
    patientName: "李晓雨",
    phone: "13900139002",
    protectionLocation: "大学城校区学生活动中心",
    protectionObject: "拉练保障",
    protectionPeopleCount: 180,
    protectionType: "拉练保障",
    queueInfo: "护理学院二排",
    soldierId: "DJC-002",
    nurseName: "王琳",
    visitType: "followUp",
  },
  {
    contactPhone: "13800138003",
    campus: "大学城",
    diagnosisType: "术后康复评估",
    doctorName: "刘洋",
    gender: "男",
    id: "XZ20260623003",
    idCard: "500381198912121257",
    identityCategory: "学生",
    inspectionDate: "2026-06-23",
    patientName: "周俊杰",
    phone: "13900139003",
    protectionLocation: "大学城校区田径场",
    protectionObject: "操场值守",
    protectionPeopleCount: 260,
    protectionType: "训练保障",
    queueInfo: "机电学院三班",
    soldierId: "DJC-003",
    nurseName: "赵敏",
    visitType: "key",
  },
  {
    contactPhone: "13800138004",
    campus: "大学城",
    diagnosisType: "呼吸道感染",
    doctorName: "张明",
    gender: "女",
    id: "XZ20260622004",
    idCard: "500381200109084629",
    identityCategory: "学生",
    inspectionDate: "2026-06-22",
    patientName: "陈可欣",
    phone: "13900139004",
    protectionLocation: "大学城校区西区宿舍",
    protectionObject: "日常巡诊",
    protectionPeopleCount: 95,
    protectionType: "宿舍保障",
    queueInfo: "外语学院四队",
    soldierId: "DJC-004",
    nurseName: "孙悦",
    visitType: "temporary",
  },
  {
    contactPhone: "13800138005",
    campus: "大学城",
    diagnosisType: "冠心病管理",
    doctorName: "黄静",
    gender: "男",
    id: "XZ20260621005",
    idCard: "500381197707213214",
    identityCategory: "退休职工",
    inspectionDate: "2026-06-21",
    patientName: "赵志强",
    phone: "13900139005",
    protectionLocation: "大学城校区校医院门诊",
    protectionObject: "重点慢病保障",
    protectionPeopleCount: 42,
    protectionType: "慢病保障",
    queueInfo: "离退休保障组",
    soldierId: "DJC-005",
    nurseName: "李雪",
    visitType: "routine",
  },
  {
    contactPhone: "13800138006",
    campus: "大学城",
    diagnosisType: "脑卒中康复",
    doctorName: "周航",
    gender: "男",
    id: "XZ20260620006",
    idCard: "500381198204153817",
    identityCategory: "教职工家属",
    inspectionDate: "2026-06-20",
    patientName: "孙伟",
    phone: "13900139006",
    protectionLocation: "大学城校区康复室",
    protectionObject: "重点康复保障",
    protectionPeopleCount: 28,
    protectionType: "康复保障",
    queueInfo: "康复观察组",
    soldierId: "DJC-006",
    nurseName: "王琳",
    visitType: "key",
  },
  {
    contactPhone: "13800138007",
    campus: "江津",
    diagnosisType: "肺部感染观察",
    doctorName: "陈宇",
    gender: "男",
    id: "XZ20260619007",
    idCard: "500381199512304210",
    identityCategory: "学生",
    inspectionDate: "2026-06-19",
    patientName: "何明轩",
    phone: "13900139007",
    protectionLocation: "江津校区北区操场",
    protectionObject: "新生军训",
    protectionPeopleCount: 360,
    protectionType: "军训保障",
    queueInfo: "步兵一营一连",
    soldierId: "JJ-001",
    nurseName: "赵敏",
    visitType: "temporary",
  },
  {
    contactPhone: "13800138008",
    campus: "江津",
    diagnosisType: "妊娠期血糖管理",
    doctorName: "黄静",
    gender: "女",
    id: "XZ20260618008",
    idCard: "500381199411057526",
    identityCategory: "家属",
    inspectionDate: "2026-06-18",
    patientName: "林雅婷",
    phone: "13900139008",
    protectionLocation: "江津校区卫生所",
    protectionObject: "家属门诊",
    protectionPeopleCount: 36,
    protectionType: "门诊保障",
    queueInfo: "家属保障组",
    soldierId: "JJ-002",
    nurseName: "孙悦",
    visitType: "followUp",
  },
  {
    contactPhone: "13800138009",
    campus: "江津",
    diagnosisType: "慢阻肺随访",
    doctorName: "刘洋",
    gender: "男",
    id: "XZ20260617009",
    idCard: "500381197811235672",
    identityCategory: "退役军人",
    inspectionDate: "2026-06-17",
    patientName: "唐国华",
    phone: "13900139009",
    protectionLocation: "江津校区南区训练场",
    protectionObject: "拉练保障",
    protectionPeopleCount: 210,
    protectionType: "拉练保障",
    queueInfo: "后勤保障一组",
    soldierId: "JJ-003",
    nurseName: "李雪",
    visitType: "routine",
  },
  {
    contactPhone: "13800138010",
    campus: "江津",
    diagnosisType: "贫血原因待查",
    doctorName: "周航",
    gender: "女",
    id: "XZ20260616010",
    idCard: "500381200012166248",
    identityCategory: "学生",
    inspectionDate: "2026-06-16",
    patientName: "许梦洁",
    phone: "13900139010",
    protectionLocation: "江津校区教学楼A栋",
    protectionObject: "课堂保障",
    protectionPeopleCount: 120,
    protectionType: "教学保障",
    queueInfo: "通信学院五队",
    soldierId: "JJ-004",
    nurseName: "赵敏",
    visitType: "temporary",
  },
  {
    contactPhone: "13800138011",
    campus: "江津",
    diagnosisType: "骨折术后复查",
    doctorName: "张明",
    gender: "男",
    id: "XZ20260615011",
    idCard: "500381199901256411",
    identityCategory: "学生",
    inspectionDate: "2026-06-15",
    patientName: "郭子豪",
    phone: "13900139011",
    protectionLocation: "江津校区新训宿舍",
    protectionObject: "新生军训",
    protectionPeopleCount: 300,
    protectionType: "军训保障",
    queueInfo: "战术训练二排",
    soldierId: "JJ-005",
    nurseName: "王琳",
    visitType: "followUp",
  },
  {
    contactPhone: "13800138012",
    campus: "江津",
    diagnosisType: "肾功能异常观察",
    doctorName: "陈宇",
    gender: "女",
    id: "XZ20260614012",
    idCard: "500381198610087221",
    identityCategory: "文职人员",
    inspectionDate: "2026-06-14",
    patientName: "高静",
    phone: "13900139012",
    protectionLocation: "江津校区校医院留观室",
    protectionObject: "重点观察保障",
    protectionPeopleCount: 18,
    protectionType: "留观保障",
    queueInfo: "机关服务队",
    soldierId: "JJ-006",
    nurseName: "孙悦",
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

function getWeekStart(date = dayjs()) {
  const day = date.day();
  return date.add(day === 0 ? -6 : 1 - day, "day").startOf("day");
}

function getDateRangePresets() {
  const today = dayjs();
  const yesterday = today.subtract(1, "day");
  const thisWeekStart = getWeekStart(today);
  const lastWeekStart = thisWeekStart.subtract(7, "day");
  const lastMonth = today.subtract(1, "month");

  return [
    {
      label: "昨日",
      value: [yesterday.startOf("day"), yesterday.endOf("day")],
    },
    {
      label: "本周",
      value: [thisWeekStart, today.endOf("day")],
    },
    {
      label: "上周",
      value: [lastWeekStart, lastWeekStart.add(6, "day").endOf("day")],
    },
    {
      label: "本月",
      value: [today.startOf("month"), today.endOf("day")],
    },
    {
      label: "上月",
      value: [lastMonth.startOf("month"), lastMonth.endOf("month")],
    },
  ];
}

function isDateInRange(date: string, range?: string[]) {
  if (!range || range.length < 2 || !range[0] || !range[1]) return true;
  return date >= range[0] && date <= range[1];
}

export async function getMockXunzhenList(params: XunzhenQueryParams) {
  const currentPage = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  const filtered = mockXunzhenRecords.filter((item) => {
    return (
      fuzzyMatch(item.doctorName, params.doctorName) &&
      fuzzyMatch(item.nurseName, params.nurseName) &&
      fuzzyMatch(item.patientName, params.patientName) &&
      (!params.campus || item.campus === params.campus) &&
      (!params.inspectionDate || item.inspectionDate === params.inspectionDate) &&
      isDateInRange(item.inspectionDate, params.inspectionDateRange) &&
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
      component: "RangePicker",
      componentProps: {
        allowClear: true,
        presets: getDateRangePresets(),
        valueFormat: "YYYY-MM-DD",
      },
      fieldName: "inspectionDateRange",
      label: "巡诊日期",
    },
    {
      component: "Input",
      fieldName: "patientName",
      label: "患者姓名",
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
      title: "巡诊日期",
      width: 140,
    },
    {
      field: "patientName",
      title: "患者姓名",
      width: 120,
    },
    {
      field: "gender",
      title: "患者性别",
      width: 100,
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
    { label: "保障类型", content: row?.protectionType },
    { label: "保障地点", content: row?.protectionLocation },
    { label: "保障人数", content: row?.protectionPeopleCount },
    { label: "保障对象", content: row?.protectionObject },
    { label: "巡诊日期", content: row?.inspectionDate },
    { label: "医生姓名", content: row?.doctorName },
    { label: "护士姓名", content: row?.nurseName },
  ];
}

export function usePatientDescriptionItems(
  row?: XunzhenRecord,
): DescriptionsItemType[] {
  return [
    { label: "姓名", content: row?.patientName },
    { label: "性别", content: row?.gender },
    { label: "身份证号", content: row?.idCard },
    { label: "手机号", content: row?.phone },
    { label: "ID号", content: row?.soldierId },
    { label: "身份类别", content: row?.identityCategory },
    { label: "联系人电话", content: row?.contactPhone },
    { label: "单位/部队番号/队列", content: row?.queueInfo },
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
