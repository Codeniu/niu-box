<template>
  <a-layout style="min-height: 100%; min-width: 980px">
    <a-layout-sider
      :theme="theme"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }"
    >
      <div class="title-wrapper">
        <img :src="logo" />
        <span v-show="!collapsed" class="title">Box</span>
      </div>
      <a-menu :theme="theme" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="Dashboard">
          <user-outlined />
          <span>
            <router-link to="/"> 用户信息 </router-link>
          </span>
        </a-menu-item>
        <a-menu-item key="List">
          <video-camera-outlined />
          <span>
            <router-link to="/list">用户Token</router-link>
          </span>
        </a-menu-item>
        <a-menu-item key="UserList">
          <video-camera-outlined />
          <span>
            <router-link to="/user-list">用户列表</router-link>
          </span>
        </a-menu-item>
        <a-menu-item key="ExcelToJson">
          <video-camera-outlined />
          <span>
            <router-link to="/excel-to-json">ExcelToJson</router-link>
          </span>
        </a-menu-item>
        <!-- <a-menu-item key="NiuBoxs">
          <video-camera-outlined />
          <span>
            <router-link target="_blank" to="/niu-boxs">NiuBoxs</router-link>
          </span>
        </a-menu-item> -->
        <a-menu-item key="NiuboxManager">
          <video-camera-outlined />
          <span>
            <router-link to="/box-manager">BoxManager</router-link>
          </span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }">
      <a-layout-header
        :style="{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: '#fff',
        }"
      >
        <menu-unfold-outlined
          v-if="collapsed"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else @click="() => (collapsed = !collapsed)" />
        <a-button type="link" @click="signOut"> 退出登录 </a-button>
      </a-layout-header>
      <a-layout-content
        :style="{
          marginTop: '64px',
          padding: '24px',
          minHeight: '280px',
          overflow: 'auto',
        }"
      >
        <div :style="{ background: '#fff', padding: '10px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        codeniu
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, onMounted, ref, toRaw } from 'vue'
import logo from '@/assets/logo.svg'
import { userInfo } from '@/apis/user'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },

  setup() {
    const router = useRouter()

    const signOut = () => {
      localStorage.removeItem('token')
      router.push('./login')
    }

    const selectedKeys = ref(['Dashboard'])

    onMounted(() => {
      console.log('current router is :', router.currentRoute.value.name)
      selectedKeys.value = [router.currentRoute.value.name]
    })

    return {
      selectedKeys,
      collapsed: ref(false),
      logo,
      theme: 'light',
      signOut,
    }
  },
})
</script>
<style>
.title-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-right: 1px solid #f0f2f5;
}
.title-wrapper img {
  height: 28px;
}

.title-wrapper .title {
  font-size: 20px;
}
</style>
