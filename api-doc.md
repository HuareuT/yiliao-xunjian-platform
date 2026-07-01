## API 文档

本文档仅保留后端实现所需接口契约，按前端实际调用顺序整理。

## 通用约定

### 认证

- 登录成功后，后端返回 `accessToken`
- 同时通过 `Set-Cookie` 写入 `refreshToken`
- 除登录、刷新 token、退出登录外，其余接口都需要：

```http
Authorization: Bearer {accessToken}
```

### 普通接口返回格式

除 `/auth/refresh` 外，其余业务接口统一返回：

```json
{
  "code": 0,
  "data": {},
  "error": null,
  "message": "ok"
}
```

### 分页接口返回格式

```json
{
  "code": 0,
  "data": {
    "items": [],
    "total": 0
  },
  "error": null,
  "message": "ok"
}
```

---

## 一、登录成功链路

前端登录成功后的调用顺序如下：

1. `POST /auth/login`
2. `GET /user/info`
3. `GET /auth/codes`
4. `GET /menu/all`

补充接口：

- token 过期时：`POST /auth/refresh`
- 退出登录时：`POST /auth/logout`

### 1. `POST /auth/login`

用途：账号密码登录。

#### 请求

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "username": "admin",
  "password": "123456"
}
```

#### 请求字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `username` | `string` | 是 | 用户名 |
| `password` | `string` | 是 | 密码 |

#### 成功响应

```json
{
  "code": 0,
  "data": {
    "accessToken": "jwt-token"
  },
  "error": null,
  "message": "ok"
}
```

#### `data` 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | `string` | 是 | 访问令牌 |

#### 响应头

需要写入 refreshToken cookie，例如：

```http
Set-Cookie: refreshToken=xxx; Path=/; HttpOnly
```

#### 失败响应

用户名或密码错误时返回 `403`。

### 2. `GET /user/info`

用途：登录成功后获取当前用户信息。

#### 请求

```http
GET /user/info
Authorization: Bearer {accessToken}
```

#### 成功响应

```json
{
  "code": 0,
  "data": {
    "id": 1,
    "username": "admin",
    "realName": "管理员",
    "roles": ["admin"],
    "homePath": "/workspace"
  },
  "error": null,
  "message": "ok"
}
```

#### `data` 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `string \| number` | 是 | 用户 ID |
| `username` | `string` | 是 | 用户名 |
| `realName` | `string` | 是 | 用户姓名 |
| `roles` | `string[]` | 是 | 角色标识列表 |
| `homePath` | `string` | 否 | 登录成功默认跳转路径 |

### 3. `GET /auth/codes`

用途：登录成功后获取按钮/操作权限码。

#### 请求

```http
GET /auth/codes
Authorization: Bearer {accessToken}
```

#### 成功响应

```json
{
  "code": 0,
  "data": ["AC_100100", "AC_100110", "AC_100120"],
  "error": null,
  "message": "ok"
}
```

#### `data`

| 类型 | 说明 |
| --- | --- |
| `string[]` | 权限码列表 |

### 4. `GET /menu/all`

用途：登录成功后获取当前用户可访问菜单和动态路由。

#### 请求

```http
GET /menu/all
Authorization: Bearer {accessToken}
```

#### 成功响应示例

```json
{
  "code": 0,
  "data": [
    {
      "name": "System",
      "path": "/system",
      "redirect": "/system/menu",
      "meta": {
        "title": "系统管理",
        "icon": "carbon:settings",
        "order": 9997
      },
      "children": [
        {
          "name": "SystemMenu",
          "path": "/system/menu",
          "component": "/system/menu/list",
          "meta": {
            "title": "菜单管理",
            "icon": "carbon:menu"
          }
        },
        {
          "name": "SystemRole",
          "path": "/system/role",
          "component": "/system/role/list",
          "meta": {
            "title": "角色管理",
            "icon": "lucide:user-check"
          }
        }
      ]
    }
  ],
  "error": null,
  "message": "ok"
}
```

#### 菜单节点字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | `string` | 是 | 路由名 |
| `path` | `string` | 是 | 路由路径 |
| `component` | `string` | 菜单页必填 | 页面组件路径 |
| `redirect` | `string` | 否 | 重定向路径 |
| `children` | `array` | 否 | 子路由 |
| `meta.title` | `string` | 是 | 菜单标题 |
| `meta.icon` | `string` | 否 | 菜单图标 |
| `meta.order` | `number` | 否 | 菜单排序 |
| `meta.affixTab` | `boolean` | 否 | 是否固定标签 |
| `meta.keepAlive` | `boolean` | 否 | 是否缓存 |
| `meta.authority` | `string[]` | 否 | 路由权限标识 |
| `meta.menuVisibleWithForbidden` | `boolean` | 否 | 无权限时菜单可见但访问 403 |

### 5. `POST /auth/refresh`

用途：accessToken 过期后，用 refreshToken 换新 accessToken。

#### 请求

```http
POST /auth/refresh
Cookie: refreshToken=xxx
```

#### 成功响应

该接口直接返回新的 accessToken 字符串，不走统一包裹：

```json
"new-access-token"
```

#### 响应头

可以重新写入 refreshToken cookie。

#### 失败响应

refreshToken 无效或缺失时返回 `403`。

### 6. `POST /auth/logout`

用途：退出登录。

#### 请求

```http
POST /auth/logout
Cookie: refreshToken=xxx
```

#### 成功响应

```json
{
  "code": 0,
  "data": "",
  "error": null,
  "message": "ok"
}
```

#### 处理要求

- 清除 refreshToken cookie

---

## 二、菜单管理接口

页面：

- `/system/menu`
- `/system/role` 中的权限树也会复用菜单列表接口

### 菜单对象

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `string \| number` | 返回时必有 | 菜单 ID |
| `pid` | `string \| number` | 否 | 父级 ID |
| `name` | `string` | 是 | 菜单名称 |
| `path` | `string` | `catalog/menu/embedded` 必填 | 路由路径 |
| `type` | `'catalog' \| 'menu' \| 'embedded' \| 'link' \| 'button'` | 是 | 菜单类型 |
| `authCode` | `string` | 否 | 权限标识 |
| `component` | `string` | `menu` 必填 | 组件路径 |
| `redirect` | `string` | 否 | 重定向 |
| `status` | `0 \| 1` | 是 | 状态 |
| `children` | `array` | 否 | 子菜单 |
| `meta` | `object` | 否 | 菜单扩展信息 |

### `meta`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `meta.title` | `string` | 菜单标题 |
| `meta.icon` | `string` | 图标 |
| `meta.activeIcon` | `string` | 激活图标 |
| `meta.activePath` | `string` | 激活路径 |
| `meta.badgeType` | `'dot' \| 'normal'` | 徽标类型 |
| `meta.badge` | `string` | 徽标内容 |
| `meta.badgeVariants` | `'default' \| 'destructive' \| 'primary' \| 'success' \| 'warning'` | 徽标颜色 |
| `meta.keepAlive` | `boolean` | 是否缓存 |
| `meta.affixTab` | `boolean` | 是否固定标签 |
| `meta.hideInMenu` | `boolean` | 是否隐藏菜单 |
| `meta.hideChildrenInMenu` | `boolean` | 是否隐藏子菜单 |
| `meta.hideInBreadcrumb` | `boolean` | 是否隐藏面包屑 |
| `meta.hideInTab` | `boolean` | 是否隐藏标签页 |
| `meta.iframeSrc` | `string` | 内嵌地址，`embedded` 类型使用 |
| `meta.link` | `string` | 外链地址，`link` 类型使用 |
| `meta.order` | `number` | 排序 |

### 1. `GET /system/menu/list`

用途：菜单管理列表、父级菜单下拉、角色权限树。

#### 请求

```http
GET /system/menu/list
Authorization: Bearer {accessToken}
```

#### 成功响应

```json
{
  "code": 0,
  "data": [
    {
      "id": 2,
      "name": "System",
      "path": "/system",
      "type": "catalog",
      "status": 1,
      "meta": {
        "title": "系统管理",
        "icon": "carbon:settings"
      },
      "children": [
        {
          "id": 201,
          "pid": 2,
          "name": "SystemMenu",
          "path": "/system/menu",
          "type": "menu",
          "status": 1,
          "authCode": "System:Menu:List",
          "component": "/system/menu/list",
          "meta": {
            "title": "菜单管理",
            "icon": "carbon:menu"
          }
        }
      ]
    }
  ],
  "error": null,
  "message": "ok"
}
```

### 2. `GET /system/menu/name-exists`

用途：校验菜单名称是否重复。

#### 请求

```http
GET /system/menu/name-exists?name=SystemMenu&id=201
Authorization: Bearer {accessToken}
```

#### Query 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | `string` | 是 | 菜单名称 |
| `id` | `string \| number` | 否 | 编辑时传当前菜单 ID |

#### 成功响应

```json
{
  "code": 0,
  "data": false,
  "error": null,
  "message": "ok"
}
```

说明：

- `true`：名称已存在
- `false`：名称可用

### 3. `GET /system/menu/path-exists`

用途：校验菜单路径是否重复。

#### 请求

```http
GET /system/menu/path-exists?path=/system/menu&id=201
Authorization: Bearer {accessToken}
```

#### Query 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `path` | `string` | 是 | 菜单路径 |
| `id` | `string \| number` | 否 | 编辑时传当前菜单 ID |

#### 成功响应

```json
{
  "code": 0,
  "data": false,
  "error": null,
  "message": "ok"
}
```

说明：

- `true`：路径已存在
- `false`：路径可用

### 4. `POST /system/menu`

用途：新增菜单。

#### 请求

```http
POST /system/menu
Authorization: Bearer {accessToken}
Content-Type: application/json
```

```json
{
  "pid": 2,
  "name": "SystemRole",
  "path": "/system/role",
  "type": "menu",
  "authCode": "System:Role:List",
  "component": "/system/role/list",
  "status": 1,
  "meta": {
    "title": "角色管理",
    "icon": "lucide:user-check"
  }
}
```

#### 请求说明

- 请求体不传 `id`
- `type=link` 时传 `meta.link`
- `type=embedded` 时传 `meta.iframeSrc`

#### 成功响应

```json
{
  "code": 0,
  "data": {
    "id": 202
  },
  "error": null,
  "message": "ok"
}
```

### 5. `PUT /system/menu/{id}`

用途：编辑菜单。

#### 请求

```http
PUT /system/menu/201
Authorization: Bearer {accessToken}
Content-Type: application/json
```

```json
{
  "pid": 2,
  "name": "SystemMenu",
  "path": "/system/menu",
  "type": "menu",
  "authCode": "System:Menu:List",
  "component": "/system/menu/list",
  "status": 1,
  "meta": {
    "title": "菜单管理",
    "icon": "carbon:menu"
  }
}
```

#### 成功响应

```json
{
  "code": 0,
  "data": {
    "id": 201
  },
  "error": null,
  "message": "ok"
}
```

### 6. `DELETE /system/menu/{id}`

用途：删除菜单。

#### 请求

```http
DELETE /system/menu/201
Authorization: Bearer {accessToken}
```

#### 成功响应

```json
{
  "code": 0,
  "data": null,
  "error": null,
  "message": "ok"
}
```

---

## 三、角色管理接口

页面：

- `/system/role`

### 角色对象

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `string \| number` | 返回时必有 | 角色 ID |
| `name` | `string` | 是 | 角色名称 |
| `status` | `0 \| 1` | 是 | 状态 |
| `permissions` | `Array<string \| number>` | 是 | 菜单/按钮权限 ID 列表 |
| `remark` | `string` | 否 | 备注 |
| `createTime` | `string` | 列表返回 | 创建时间 |

### 1. `GET /system/role/list`

用途：角色分页列表。

#### 请求

```http
GET /system/role/list?page=1&pageSize=20&name=&id=&status=&remark=&startTime=&endTime=
Authorization: Bearer {accessToken}
```

#### Query 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page` | `number` | 是 | 页码 |
| `pageSize` | `number` | 是 | 每页条数 |
| `name` | `string` | 否 | 角色名称，模糊查询 |
| `id` | `string` | 否 | 角色 ID，模糊查询 |
| `status` | `0 \| 1` | 否 | 状态 |
| `remark` | `string` | 否 | 备注，模糊查询 |
| `startTime` | `string` | 否 | 创建时间开始 |
| `endTime` | `string` | 否 | 创建时间结束 |

#### 成功响应

```json
{
  "code": 0,
  "data": {
    "items": [
      {
        "id": "4092d98f-d740-4069-8e30-ec5243fdc7bb",
        "name": "管理员",
        "status": 1,
        "createTime": "2023/01/09 06:13:16",
        "permissions": [201, 20101, 20102, 202, 901],
        "remark": ""
      }
    ],
    "total": 100
  },
  "error": null,
  "message": "ok"
}
```

### 2. `POST /system/role`

用途：新增角色。

#### 请求

```http
POST /system/role
Authorization: Bearer {accessToken}
Content-Type: application/json
```

```json
{
  "name": "药品管理",
  "status": 1,
  "remark": "负责药品相关操作",
  "permissions": [2, 201, 202, 901, 902]
}
```

#### 成功响应

```json
{
  "code": 0,
  "data": {
    "id": "c7930ae8-f35b-49b5-bad2-94f6aa8a8891"
  },
  "error": null,
  "message": "ok"
}
```

### 3. `PUT /system/role/{id}`

用途：

- 编辑角色
- 切换角色状态

#### 请求

```http
PUT /system/role/4092d98f-d740-4069-8e30-ec5243fdc7bb
Authorization: Bearer {accessToken}
Content-Type: application/json
```

#### 请求体示例一：编辑角色

```json
{
  "name": "医生管理",
  "status": 1,
  "remark": "",
  "permissions": [2, 9, 1, 901, 902, 20102]
}
```

#### 请求体示例二：仅更新状态

```json
{
  "status": 0
}
```

#### 实现要求

- 支持部分字段更新

#### 成功响应

```json
{
  "code": 0,
  "data": {
    "id": "4092d98f-d740-4069-8e30-ec5243fdc7bb"
  },
  "error": null,
  "message": "ok"
}
```

### 4. `DELETE /system/role/{id}`

用途：删除角色。

#### 请求

```http
DELETE /system/role/4092d98f-d740-4069-8e30-ec5243fdc7bb
Authorization: Bearer {accessToken}
```

#### 成功响应

```json
{
  "code": 0,
  "data": null,
  "error": null,
  "message": "ok"
}
```

