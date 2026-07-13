import type { UserInfo } from '@vben/types';

// import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi(): Promise<UserInfo> {
  // return requestClient.get<UserInfo>('/user/info');
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        id: 0,
        realName: '管理员',
        roles: ['super'],
        username: 'admin',
      });
    }, 300);
  });
}
