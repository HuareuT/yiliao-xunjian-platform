import type { OnActionClickFn, VxeTableGridColumns } from '#/adapter/vxe-table';

export interface BaozhangPoint {
  children?: BaozhangPoint[];
  createBy: string;
  createTime: string;
  id: string;
  name: string;
  pid?: string;
  remark?: string;
  updateBy: string;
  updateTime: string;
}

export const mockBaozhangPoints: BaozhangPoint[] = [
  {
    children: [
      {
        createBy: '管理员',
        createTime: '2026-06-01 09:30:00',
        id: 'bz_jj_training',
        name: '新生军训',
        pid: 'bz_jiangjin',
        remark: '江津校区新生军训保障',
        updateBy: '管理员',
        updateTime: '2026-06-18 10:12:00',
      },
      {
        createBy: '管理员',
        createTime: '2026-06-02 14:20:00',
        id: 'bz_jj_hike',
        name: '拉练',
        pid: 'bz_jiangjin',
        remark: '江津校区拉练保障',
        updateBy: '管理员',
        updateTime: '2026-06-19 11:05:00',
      },
    ],
    createBy: '管理员',
    createTime: '2026-06-01 08:00:00',
    id: 'bz_jiangjin',
    name: '江津',
    remark: '江津校区保障点',
    updateBy: '管理员',
    updateTime: '2026-06-18 09:20:00',
  },
  {
    children: [
      {
        createBy: '管理员',
        createTime: '2026-06-03 10:10:00',
        id: 'bz_dxc_playground',
        name: '操场',
        pid: 'bz_daxuecheng',
        remark: '大学城操场保障',
        updateBy: '管理员',
        updateTime: '2026-06-20 15:30:00',
      },
    ],
    createBy: '管理员',
    createTime: '2026-06-01 08:10:00',
    id: 'bz_daxuecheng',
    name: '大学城',
    remark: '大学城校区保障点',
    updateBy: '管理员',
    updateTime: '2026-06-18 09:40:00',
  },
];

export function useColumns(
  onActionClick: OnActionClickFn<BaozhangPoint>,
): VxeTableGridColumns<BaozhangPoint> {
  return [
    {
      align: 'left',
      field: 'name',
      fixed: 'left',
      title: '保障点名称',
      treeNode: true,
      minWidth: 220,
    },
    {
      field: 'remark',
      minWidth: 180,
      title: '备注',
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
      align: 'right',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: '保障点',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          {
            code: 'append',
            text: '新增下级',
          },
          'edit',
          'delete',
        ],
      },
      field: 'operation',
      fixed: 'right',
      headerAlign: 'center',
      showOverflow: false,
      title: '操作',
      width: 220,
    },
  ];
}

