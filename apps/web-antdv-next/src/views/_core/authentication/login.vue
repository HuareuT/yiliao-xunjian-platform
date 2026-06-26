<script lang="ts" setup>
import type { VbenFormSchema } from "@vben/common-ui";
import type { BasicOption } from "@vben/types";

import { computed, markRaw } from "vue";

import { AuthenticationLogin, SliderCaptcha, z } from "@vben/common-ui";
import { $t } from "@vben/locales";
import { preferences } from "@vben/preferences";

import { useAuthStore } from "#/store";

defineOptions({ name: "Login" });

const appName = computed(() => preferences.app.name);

const authStore = useAuthStore();

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: "Super",
    value: "vben",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "User",
    value: "jack",
  },
];

const formSchema = computed((): VbenFormSchema[] => {
  return [
    // {
    //   component: "VbenSelect",
    //   componentProps: {
    //     options: MOCK_USER_OPTIONS,
    //     placeholder: $t("authentication.selectAccount"),
    //   },
    //   fieldName: "selectAccount",
    //   label: $t("authentication.selectAccount"),
    //   rules: z
    //     .string()
    //     .min(1, { message: $t("authentication.selectAccount") })
    //     .optional()
    //     .default("vben"),
    // },
    {
      component: "VbenInput",
      componentProps: {
        placeholder: $t("authentication.usernameTip"),
      },
      dependencies: {
        trigger(values, form) {
          if (values.selectAccount) {
            const findUser = MOCK_USER_OPTIONS.find((item) => item.value === values.selectAccount);
            if (findUser) {
              form.setValues({
                password: "123456",
                username: findUser.value,
              });
            }
          }
        },
        triggerFields: ["selectAccount"],
      },
      fieldName: "username",
      label: $t("authentication.username"),
      rules: z.string().min(1, { message: $t("authentication.usernameTip") }),
    },
    {
      component: "VbenInputPassword",
      componentProps: {
        placeholder: $t("authentication.password"),
      },
      fieldName: "password",
      label: $t("authentication.password"),
      rules: z.string().min(1, { message: $t("authentication.passwordTip") }),
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: "captcha",
      rules: z.boolean().refine((value) => value, {
        message: $t("authentication.verifyRequiredTip"),
      }),
    },
  ];
});
</script>

<template>
  <AuthenticationLogin
    title="欢迎使用👋"
    :sub-title="`请登录,${appName}`"
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    :show-qrcode-login="false"
    :show-register="false"
    :show-third-party-login="false"
    :show-forget-password="false"
    :show-code-login="false"
    @submit="authStore.authLogin"
  />
</template>
