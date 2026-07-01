import type { Recordable } from "@vben/types";

import { requestClient } from "#/api/request";

export namespace SystemUserApi {
  export interface SystemUser {
    [key: string]: any;
    id: string;
    name: string;
    permissions: string[];
    remark?: string;
    status: 0 | 1;
  }
}

/**
 * 获取用户列表数据
 */
async function getUserList(params: Recordable<any>) {
  // return requestClient.get<Array<SystemUserApi.SystemUser>>(
  //   '/system/user/list',
  //   { params },
  // );
  return new Promise((resolve) => {
    resolve({
      items: [
        {
          id: "0f3620e2-d5c8-41ec-92aa-e4200e77b05c",
          name: "王医生",
          status: 0,
          createTime: "2022/12/24 10:15:02",
          deptId: "6a2bee61-c474-4dfe-88c7-02e62e768182",
          remark: "救死扶伤王大夫",
        },
        {
          id: "ffc479e6-ccfc-4b30-a266-125286653bb4",
          name: "李医生",
          status: 0,
          createTime: "2024/02/25 06:15:37",
          deptId: "c77dea39-504c-4c3a-a03f-43b21a69a095",
          remark: "急死扶伤李大夫",
        },
        {
          id: "80f52d10-c229-4de7-91f9-791c2a64a20e",
          name: "张护士",
          status: 0,
          createTime: "2022/06/04 05:39:31",
          deptId: "9073e9bd-c3dd-4688-ac35-19e41e5ed664",
          remark: "矜矜业业张护士",
        },
      ],
    });
  });
}

/**
 * 创建用户
 * @param data 用户数据
 */
async function createUser(data: Omit<SystemUserApi.SystemUser, "id">) {
  return requestClient.post("/system/user", data);
}

/**
 * 更新用户
 *
 * @param id 用户 ID
 * @param data 用户数据
 */
async function updateUser(id: string, data: Omit<SystemUserApi.SystemUser, "id">) {
  return requestClient.put(`/system/user/${id}`, data);
}

/**
 * 删除用户
 * @param id 用户 ID
 */
async function deleteUser(id: string) {
  return requestClient.delete(`/system/user/${id}`);
}

export { createUser, deleteUser, getUserList, updateUser };
