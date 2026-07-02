import { defineOverridesPreferences } from "@vben/preferences";

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
    accessMode: "backend",
    defaultHomePath: "/home",
    authPageLayout: "panel-center",
  },
  theme: {
    mode: "light",
    builtinType: "deep-green",
    colorPrimary: "hsl(181 84% 32%)",
  },

  sidebar: {
    collapsedButton: false,
    fixedButton: false,
    width: 174,
  },
  widget: {
    languageToggle: false,
    notification: false,
    timezone: false,
    globalSearch: false,
  },

  copyright: {
    companyName: "西南医大",
    companySiteLink: "http://www.xnyy.cn",
    date: "2026",
    icp: "ICP备案号",
  },
  footer: {
    enable: false,
    fixed: false,
  },
});
