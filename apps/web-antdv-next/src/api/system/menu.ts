import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemMenuApi {
  /** 徽标颜色集合 */
  export const BadgeVariants = [
    'default',
    'destructive',
    'primary',
    'success',
    'warning',
  ] as const;
  /** 徽标类型集合 */
  export const BadgeTypes = ['dot', 'normal'] as const;
  /** 菜单类型集合 */
  export const MenuTypes = [
    'catalog',
    'menu',
    'embedded',
    'link',
    'button',
  ] as const;
  /** 系统菜单 */
  export interface SystemMenu {
    [key: string]: any;
    /** 后端权限标识 */
    authCode: string;
    /** 子级 */
    children?: SystemMenu[];
    /** 组件 */
    component?: string;
    /** 菜单ID */
    id: string;
    /** 菜单元数据 */
    meta?: {
      /** 激活时显示的图标 */
      activeIcon?: string;
      /** 作为路由时，需要激活的菜单的Path */
      activePath?: string;
      /** 固定在标签栏 */
      affixTab?: boolean;
      /** 在标签栏固定的顺序 */
      affixTabOrder?: number;
      /** 徽标内容(当徽标类型为normal时有效) */
      badge?: string;
      /** 徽标类型 */
      badgeType?: (typeof BadgeTypes)[number];
      /** 徽标颜色 */
      badgeVariants?: (typeof BadgeVariants)[number];
      /** 在菜单中隐藏下级 */
      hideChildrenInMenu?: boolean;
      /** 在面包屑中隐藏 */
      hideInBreadcrumb?: boolean;
      /** 在菜单中隐藏 */
      hideInMenu?: boolean;
      /** 在标签栏中隐藏 */
      hideInTab?: boolean;
      /** 菜单图标 */
      icon?: string;
      /** 内嵌Iframe的URL */
      iframeSrc?: string;
      /** 是否缓存页面 */
      keepAlive?: boolean;
      /** 外链页面的URL */
      link?: string;
      /** 同一个路由最大打开的标签数 */
      maxNumOfOpenTab?: number;
      /** 无需基础布局 */
      noBasicLayout?: boolean;
      /** 是否在新窗口打开 */
      openInNewWindow?: boolean;
      /** 菜单排序 */
      order?: number;
      /** 额外的路由参数 */
      query?: Recordable<any>;
      /** 菜单标题 */
      title?: string;
    };
    /** 菜单名称 */
    name: string;
    /** 路由路径 */
    path: string;
    /** 父级ID */
    pid: string;
    /** 重定向 */
    redirect?: string;
    /** 菜单类型 */
    type: (typeof MenuTypes)[number];
  }
}

/**
 * 获取菜单数据列表
 */
async function getMenuList() {
  // return requestClient.get<Array<SystemMenuApi.SystemMenu>>(
  //   '/system/menu/list',
  // );

  return new Promise((resolve) => {
    resolve([
      {
        id: 1,
        name: 'Workspace',
        status: 1,
        type: 'menu',
        icon: 'mdi:dashboard',
        path: '/workspace',
        component: '/dashboard/workspace/index',
        meta: {
          icon: 'carbon:workspace',
          title: 'page.dashboard.workspace',
          affixTab: true,
          order: 0,
        },
      },
      {
        id: 2,
        meta: {
          icon: 'carbon:settings',
          order: 9997,
          title: 'system.title',
          badge: 'new',
          badgeType: 'normal',
          badgeVariants: 'primary',
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
            authCode: 'System:Menu:List',
            status: 1,
            type: 'menu',
            meta: {
              icon: 'carbon:menu',
              title: 'system.menu.title',
            },
            component: '/system/menu/list',
            children: [
              {
                id: 20_101,
                pid: 201,
                name: 'SystemMenuCreate',
                status: 1,
                type: 'button',
                authCode: 'System:Menu:Create',
                meta: {
                  title: 'common.create',
                },
              },
              {
                id: 20_102,
                pid: 201,
                name: 'SystemMenuEdit',
                status: 1,
                type: 'button',
                authCode: 'System:Menu:Edit',
                meta: {
                  title: 'common.edit',
                },
              },
              {
                id: 20_103,
                pid: 201,
                name: 'SystemMenuDelete',
                status: 1,
                type: 'button',
                authCode: 'System:Menu:Delete',
                meta: {
                  title: 'common.delete',
                },
              },
            ],
          },
          {
            id: 202,
            pid: 2,
            path: '/system/dept',
            name: 'SystemDept',
            status: 1,
            type: 'menu',
            authCode: 'System:Dept:List',
            meta: {
              icon: 'carbon:container-services',
              title: 'system.dept.title',
            },
            component: '/system/dept/list',
            children: [
              {
                id: 20_401,
                pid: 202,
                name: 'SystemDeptCreate',
                status: 1,
                type: 'button',
                authCode: 'System:Dept:Create',
                meta: {
                  title: 'common.create',
                },
              },
              {
                id: 20_402,
                pid: 202,
                name: 'SystemDeptEdit',
                status: 1,
                type: 'button',
                authCode: 'System:Dept:Edit',
                meta: {
                  title: 'common.edit',
                },
              },
              {
                id: 20_403,
                pid: 202,
                name: 'SystemDeptDelete',
                status: 1,
                type: 'button',
                authCode: 'System:Dept:Delete',
                meta: {
                  title: 'common.delete',
                },
              },
            ],
          },
        ],
      },
      {
        id: 9,
        meta: {
          badgeType: 'dot',
          order: 9998,
          title: 'demos.vben.title',
          icon: 'carbon:data-center',
        },
        name: 'Project',
        path: '/vben-admin',
        type: 'catalog',
        status: 1,
        children: [
          {
            id: 901,
            pid: 9,
            name: 'VbenDocument',
            path: '/vben-admin/document',
            component: 'IFrameView',
            type: 'embedded',
            status: 1,
            meta: {
              icon: 'carbon:book',
              iframeSrc: 'https://doc.vben.pro',
              title: 'demos.vben.document',
            },
          },
          {
            id: 902,
            pid: 9,
            name: 'VbenGithub',
            path: '/vben-admin/github',
            component: 'IFrameView',
            type: 'link',
            status: 1,
            meta: {
              icon: 'carbon:logo-github',
              link: 'https://github.com/vbenjs/vue-vben-admin',
              title: 'Github',
            },
          },
          {
            id: 903,
            pid: 9,
            name: 'VbenAntdv',
            path: '/vben-admin/antdv',
            component: 'IFrameView',
            type: 'link',
            status: 0,
            meta: {
              icon: 'carbon:hexagon-vertical-solid',
              badgeType: 'dot',
              link: 'https://ant.vben.pro',
              title: 'demos.vben.antdv',
            },
          },
        ],
      },
      {
        id: 10,
        component: '_core/about/index',
        type: 'menu',
        status: 1,
        meta: {
          icon: 'lucide:copyright',
          order: 9999,
          title: 'demos.vben.about',
        },
        name: 'About',
        path: '/about',
      },
    ]);
  });
}

async function isMenuNameExists(
  _name: string,
  _id?: SystemMenuApi.SystemMenu['id'],
) {
  // return requestClient.get<boolean>("/system/menu/name-exists", {
  //   params: { id, name },
  // });
  return false;
}

async function isMenuPathExists(
  _path: string,
  _id?: SystemMenuApi.SystemMenu['id'],
) {
  // return requestClient.get<boolean>("/system/menu/path-exists", {
  //   params: { id, path },
  // });

  return false;
}

/**
 * 创建菜单
 * @param data 菜单数据
 */
async function createMenu(
  data: Omit<SystemMenuApi.SystemMenu, 'children' | 'id'>,
) {
  return requestClient.post('/system/menu', data);
}

/**
 * 更新菜单
 *
 * @param id 菜单 ID
 * @param data 菜单数据
 */
async function updateMenu(
  id: string,
  data: Omit<SystemMenuApi.SystemMenu, 'children' | 'id'>,
) {
  return requestClient.put(`/system/menu/${id}`, data);
}

/**
 * 删除菜单
 * @param id 菜单 ID
 */
async function deleteMenu(id: string) {
  return requestClient.delete(`/system/menu/${id}`);
}

export {
  createMenu,
  deleteMenu,
  getMenuList,
  isMenuNameExists,
  isMenuPathExists,
  updateMenu,
};
