import type { RouteRecordStringComponent } from '@vben/types';

// import { requestClient } from "#/api/request";

const mockRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 10_000,
          component: 'home/index',
          type: 'menu',
          status: 1,
          meta: {
            affixTab: true,
            icon: 'tabler:home',
            order: -2,
            title: '首页',
          },
          name: 'Home',
          path: '/home',
        },
        {
          id: 10_001,
          component: 'xunzhen/index',
          type: 'menu',
          status: 1,
          meta: {
            icon: 'lucide:stethoscope',
            order: 0,
            title: '巡诊管理',
          },
          name: 'Xunzhen',
          path: '/xunzhen',
        },
        {
          id: 10_002,
          component: 'yaopin/index',
          type: 'menu',
          status: 1,
          meta: {
            icon: 'lucide:pill',
            order: 2,
            title: '药品库管理',
          },
          name: 'Yaopin',
          path: '/yaopin',
        },
        {
          id: 10_003,
          component: 'zhenduan/index',
          type: 'menu',
          status: 1,
          meta: {
            icon: 'lucide:heart-pulse',
            order: 3,
            title: '诊断库管理',
          },
          name: 'Zhenduan',
          path: '/zhenduan',
        },
        {
          id: 10_004,
          component: 'baozhang/index',
          type: 'menu',
          status: 1,
          meta: {
            icon: 'lucide:hospital',
            order: 4,
            title: '保障点管理',
          },
          name: 'Baozhang',
          path: '/baozhang',
        },
        {
          id: 10_005,
          component: 'baozhang-leixing/index',
          type: 'menu',
          status: 1,
          meta: {
            icon: 'lucide:list-tree',
            order: 4,
            title: '保障类型管理',
          },
          name: 'BaozhangLeixing',
          path: '/baozhang-leixing',
        },
        {
          id: 10_006,
          component: 'rizhi/index',
          type: 'menu',
          status: 1,
          meta: {
            icon: 'lucide:history',
            order: 6,
            title: '日志管理',
          },
          name: 'Rizhi',
          path: '/rizhi',
        },
        {
          id: 10_007,
          component: 'chuzhi/index',
          type: 'menu',
          status: 1,
          meta: {
            icon: 'lucide:clipboard-list',
            order: 5,
            title: '处置方式管理',
          },
          name: 'Chuzhi',
          path: '/chuzhi',
        },
        {
          id: 2,
          meta: {
            icon: 'carbon:settings',
            order: 9997,
            title: '系统管理',
          },
          status: 1,
          type: 'catalog',
          name: 'System',
          path: '/system',
          children: [
            {
              id: 201,
              pid: 2,
              path: '/system/menu',
              name: 'SystemMenu',
              status: 1,
              type: 'menu',
              meta: {
                icon: 'carbon:menu',
                title: '菜单管理',
              },
              component: '/system/menu/list',
            },
            {
              id: 202,
              pid: 2,
              path: '/system/role',
              name: 'SystemRole',
              status: 1,
              type: 'menu',
              meta: {
                icon: 'lucide:user-check',
                title: '角色管理',
              },
              component: '/system/role/list',
            },
            {
              id: 203,
              pid: 2,
              path: '/system/user',
              name: 'SystemUser',
              status: 1,
              type: 'menu',
              meta: {
                icon: 'lucide:users',
                title: '用户管理',
              },
              component: '/system/user/list',
            },
            {
              id: 204,
              pid: 2,
              path: '/system/dept',
              name: 'SystemDept',
              status: 1,
              type: 'menu',
              meta: {
                icon: 'lucide:folder',
                title: '部门管理',
              },
              component: '/system/dept/list',
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
export async function getAllMenusApi(): Promise<RouteRecordStringComponent[]> {
  // requestClient.get<RouteRecordStringComponent[]>("/menu/all").then((res) => {
  //   console.log(res);
  // });
  // mockRequest().then((res) => {
  //   console.log("res2", res);
  // });
  // return requestClient.get<RouteRecordStringComponent[]>("/menu/all");
  return mockRequest() as Promise<RouteRecordStringComponent[]>;
}
