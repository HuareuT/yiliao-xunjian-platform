import type { RouteRecordStringComponent } from "@vben/types";

import { requestClient } from "#/api/request";

const mockRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // {
        //   id: 10000,
        //   component: "home/index",
        //   type: "menu",
        //   status: 1,
        //   meta: {
        //     affixTab: true,
        //     icon: "lucide:copyright",
        //     order: -2,
        //     title: "首页",
        //   },
        //   name: "Home",
        //   path: "/home",
        // },
        // {
        //   id: 10001,
        //   component: "xunzhen/index",
        //   type: "menu",
        //   status: 1,
        //   meta: {
        //     icon: "lucide:copyright",
        //     order: 0,
        //     title: "巡诊管理",
        //   },
        //   name: "Xunzhen",
        //   path: "/xunzhen",
        // },
        // {
        //   id: 10002,
        //   component: "yaopin/index",
        //   type: "menu",
        //   status: 1,
        //   meta: {
        //     icon: "lucide:copyright",
        //     order: 2,
        //     title: "药品库管理",
        //   },
        //   name: "Yaopin",
        //   path: "/yaopin",
        // },
        // {
        //   id: 10003,
        //   component: "zhenduan/index",
        //   type: "menu",
        //   status: 1,
        //   meta: {
        //     icon: "lucide:copyright",
        //     order: 3,
        //     title: "诊断库管理",
        //   },
        //   name: "Zhenduan",
        //   path: "/zhenduan",
        // },
        // {
        //   id: 10004,
        //   component: "baozhang/index",
        //   type: "menu",
        //   status: 1,
        //   meta: {
        //     icon: "lucide:copyright",
        //     order: 4,
        //     title: "保障点管理",
        //   },
        //   name: "Baozhang",
        //   path: "/baozhang",
        // },
        // {
        //   id: 10005,
        //   component: "rizhi/index",
        //   type: "menu",
        //   status: 1,
        //   meta: {
        //     icon: "lucide:copyright",
        //     order: 5,
        //     title: "日志管理",
        //   },
        //   name: "Rizhi",
        //   path: "/rizhi",
        // },
        {
          id: 2,
          meta: {
            icon: "carbon:settings",
            order: 9997,
            title: "系统管理",
          },
          status: 1,
          type: "catalog",
          name: "System",
          path: "/system",
          children: [
            {
              id: 201,
              pid: 2,
              path: "/system/menu",
              name: "SystemMenu",
              authCode: "System:Menu:List",
              status: 1,
              type: "menu",
              meta: {
                icon: "carbon:menu",
                title: "system.menu.title",
              },
              component: "/system/menu/list",
              children: [
                {
                  id: 20101,
                  pid: 201,
                  name: "SystemMenuCreate",
                  status: 1,
                  type: "button",
                  authCode: "System:Menu:Create",
                  meta: {
                    title: "common.create",
                  },
                },
                // {
                //   id: 20102,
                //   pid: 201,
                //   name: "SystemMenuEdit",
                //   status: 1,
                //   type: "button",
                //   authCode: "System:Menu:Edit",
                //   meta: {
                //     title: "common.edit",
                //   },
                // },
                // {
                //   id: 20103,
                //   pid: 201,
                //   name: "SystemMenuDelete",
                //   status: 1,
                //   type: "button",
                //   authCode: "System:Menu:Delete",
                //   meta: {
                //     title: "common.delete",
                //   },
                // },
              ],
            },
          ],
        },
      ]);
    }, 800);
  });
};

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.get<RouteRecordStringComponent[]>("/menu/all");
}
