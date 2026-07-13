import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemRoleApi {
  export interface SystemRole {
    [key: string]: any;
    id: string;
    name: string;
    permissions: string[];
    remark?: string;
    status: 0 | 1;
  }
}

/**
 * 获取角色列表数据
 */
async function getRoleList(_params: Recordable<any>) {
  // return requestClient.get<Array<SystemRoleApi.SystemRole>>(
  //   '/system/role/list',
  //   { params },
  // );
  return new Promise<any>((resolve) => {
    resolve({
      items: [
        {
          id: '4092d98f-d740-4069-8e30-ec5243fdc7bb',
          name: '管理员',
          status: 1,
          createTime: '2023/01/09 06:13:16',
          permissions: [
            20_103, 901, 902, 2, 20_401, 20_102, 20_402, 202, 9, 1, 20_403, 201,
            10,
          ],
          remark: '',
        },
        {
          id: 'c7930ae8-f35b-49b5-bad2-94f6aa8a8890',
          name: '医生管理',
          status: 1,
          createTime: '2023/01/30 09:18:30',
          permissions: [
            2, 9, 1, 20_102, 903, 20_402, 201, 20_401, 20_101, 202, 10, 902,
          ],
          remark: '',
        },
        {
          id: 'c7930ae8-f35b-49b5-bad2-94f6aa8a8891',
          name: '药品管理',
          status: 1,
          createTime: '2023/01/30 09:18:30',
          permissions: [
            2, 9, 1, 20_102, 903, 20_402, 201, 20_401, 20_101, 202, 10, 902,
          ],
          remark: '',
        },
      ],
    });
  });
}

/**
 * 创建角色
 * @param data 角色数据
 */
async function createRole(data: Omit<SystemRoleApi.SystemRole, 'id'>) {
  return requestClient.post('/system/role', data);
}

/**
 * 更新角色
 *
 * @param id 角色 ID
 * @param data 角色数据
 */
async function updateRole(
  id: string,
  data: Omit<SystemRoleApi.SystemRole, 'id'>,
) {
  return requestClient.put(`/system/role/${id}`, data);
}

/**
 * 删除角色
 * @param id 角色 ID
 */
async function deleteRole(id: string) {
  return requestClient.delete(`/system/role/${id}`);
}

export { createRole, deleteRole, getRoleList, updateRole };
