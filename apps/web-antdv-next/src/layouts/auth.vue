<script lang="ts" setup>
import { computed } from "vue";

import { AuthPageLayout } from "@vben/layouts";
import { preferences } from "@vben/preferences";

import xnyyImg from "#/assets/xnyy-img.png";
import xnyyLogo from "#/assets/xnyy-logo.png";

const appName = computed(() => preferences.app.name);
const logo = computed(() => preferences.logo.source);
const logoDark = computed(() => preferences.logo.sourceDark);
</script>

<template>
  <AuthPageLayout
    :app-name="appName"
    :logo="logo"
    :logo-dark="logoDark"
    :toolbar-list="['color', 'theme']"
    page-description="医疗巡检系统"
    page-title="陆军军医大学西南医院"
    :slogan-image="xnyyImg"
  >
    <!-- 自定义工具栏 -->
    <!-- <template #toolbar></template> -->
    <template #logo>
      <div class="fixed top-4 left-4">
        <img :src="xnyyLogo" />
      </div>
    </template>
  </AuthPageLayout>
</template>

<style lang="scss" scoped></style>
