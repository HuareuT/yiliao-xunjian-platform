import { requestClient } from '#/api/request';

export namespace SystemDeptApi {
  export interface SystemDept {
    [key: string]: any;
    children?: SystemDept[];
    id: string;
    name: string;
    remark?: string;
    status: 0 | 1;
  }
}

/**
 * 获取部门列表数据
 */
async function getDeptList(): Promise<SystemDeptApi.SystemDept[]> {
  // return requestClient.get<Array<SystemDeptApi.SystemDept>>(
  //   '/system/dept/list',
  // );
  return new Promise<any>((resolve) => {
    resolve([
      {
        id: '7b123eb9-50e3-451f-9c20-dc904a317243',
        pid: 0,
        name: 'Jewelry',
        status: 1,
        createTime: '2022/12/09 00:59:14',
        remark: 'Tergum depromo succedo sopor catena tabesco.',
        children: [
          {
            id: 'eab9117e-de3b-4b72-9938-17fca9b6e029',
            pid: '7b123eb9-50e3-451f-9c20-dc904a317243',
            name: 'Computers',
            status: 1,
            createTime: '2023/09/02 14:16:38',
            remark:
              'Usus crux taceo virtus voluptatum stabilis copiose voluntarius turba ad.',
          },
          {
            id: 'e5371367-547c-48f1-8ad2-2edb23056b84',
            pid: '7b123eb9-50e3-451f-9c20-dc904a317243',
            name: 'Computers',
            status: 0,
            createTime: '2023/12/03 15:37:27',
            remark: 'Vester tametsi volva aranea conspergo campana victoria.',
          },
          {
            id: '55df59e2-b053-42c1-8334-bee2bee0372c',
            pid: '7b123eb9-50e3-451f-9c20-dc904a317243',
            name: 'Baby',
            status: 1,
            createTime: '2023/03/04 23:46:13',
            remark:
              'Tempus alii conventus sophismata cumque sumo articulus laudantium aequus.',
          },
          {
            id: '29212875-8aa4-4c1d-884c-e50791c7bab8',
            pid: '7b123eb9-50e3-451f-9c20-dc904a317243',
            name: 'Music',
            status: 0,
            createTime: '2023/06/07 22:02:18',
            remark:
              'Sed odio ter iste demitto certus aggredior conduco id correptius.',
          },
          {
            id: 'b948de8b-fe6c-4567-b375-70414829b6bb',
            pid: '7b123eb9-50e3-451f-9c20-dc904a317243',
            name: 'Jewelry',
            status: 1,
            createTime: '2023/01/27 06:02:44',
            remark:
              'Baiulus curatio virtus facilis deserunt nemo bene officiis velit carpo.',
          },
        ],
      },
    ]);
  });
}

/**
 * 创建部门
 * @param data 部门数据
 */
async function createDept(
  data: Omit<SystemDeptApi.SystemDept, 'children' | 'id'>,
) {
  return requestClient.post('/system/dept', data);
}

/**
 * 更新部门
 *
 * @param id 部门 ID
 * @param data 部门数据
 */
async function updateDept(
  id: string,
  data: Omit<SystemDeptApi.SystemDept, 'children' | 'id'>,
) {
  return requestClient.put(`/system/dept/${id}`, data);
}

/**
 * 删除部门
 * @param id 部门 ID
 */
async function deleteDept(id: string) {
  return requestClient.delete(`/system/dept/${id}`);
}

export { createDept, deleteDept, getDeptList, updateDept };
