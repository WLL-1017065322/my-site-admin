<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        theme="dark"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        @click="handleClick"
      >
        <router-link to="/">
          <a-menu-item key="1">
            <pie-chart-outlined />
            <span>首页</span>
          </a-menu-item>
        </router-link>
        <router-link to="/myinfo">
          <a-menu-item key="2">
            <desktop-outlined />
            <span>个人信息</span>
          </a-menu-item>
        </router-link>
        <router-link to="/blog">
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                <span>博客</span>
              </span>
            </template>
            <a-menu-item key="3">列表</a-menu-item>
            <a-menu-item key="4">正文</a-menu-item>
            <a-menu-item key="5">标签</a-menu-item>
          </a-sub-menu>
        </router-link>
        <router-link to="/myinfo">
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <team-outlined />
                <span>评论</span>
              </span>
            </template>
            <a-menu-item key="6">评论</a-menu-item>
            <a-menu-item key="8">留言</a-menu-item>
          </a-sub-menu>
        </router-link>
        <router-link to="/roles">
          <a-sub-menu key="sub3">
            <template #title>
              <span>
                <team-outlined />
                <span>角色管理</span>
              </span>
            </template>
            <a-menu-item key="6">用户管理</a-menu-item>
            <a-menu-item key="8">权限管理</a-menu-item>
          </a-sub-menu>
        </router-link>
        <router-link to="/myinfo"></router-link>

        <a-menu-item key="9">
          <file-outlined />
          <span>登出</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="avatar">头像</div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  },
  data() {
    const handleClick = (e: Event) => {
      console.log("click", e);
    };

    return {
      handleClick,
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
    };
  },
});
</script>
<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
.avatar {
  width: 50px;
  float: right;
}
</style>
