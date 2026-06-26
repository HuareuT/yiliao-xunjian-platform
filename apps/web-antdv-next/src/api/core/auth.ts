import { baseRequestClient } from "#/api/request";

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  // return requestClient.post<AuthApi.LoginResult>("/auth/login", data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 0,
        password: "123456",
        realName: "Vben",
        roles: ["super"],
        username: "vben",
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicGFzc3dvcmQiOiIxMjM0NTYiLCJyZWFsTmFtZSI6IlZiZW4iLCJyb2xlcyI6WyJzdXBlciJdLCJ1c2VybmFtZSI6InZiZW4iLCJpYXQiOjE3ODI0NDU0MDEsImV4cCI6MTc4MzA1MDIwMX0.B_r-qx8r_JFUDHBi8DhQJWG6nAyskJsNlrZW5SrO90w",
      });
    }, 800);
  });
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>("/auth/refresh", {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  // return baseRequestClient.post("/auth/logout", {
  //   withCredentials: true,
  // });

  return new Promise((resolve) => {
    resolve("");
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  // return requestClient.get<string[]>("/auth/codes");
  return new Promise((resolve) => {
    resolve(["AC_100100", "AC_100110", "AC_100120", "AC_100010"]);
  });
}
