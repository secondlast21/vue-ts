<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import logoTopLeft from '@/assets/img/product-logo-gold-to-mecca-horizontal.png'
import { SidebarMenuCloseIcon, SidebarMenuOpenIcon, UserCircleIcon } from '@/icons'
import { formatLabel } from '@/utils/stringFormatter'
import { removeTokenFromLocalStorage } from '@/utils/tokenManager'

const route = useRoute()
const router = useRouter()
const isSubmenuOpen = ref(false)

const subMenuList = ['airports', 'airlines', 'package-type', 'city'] as const
type SubMenu = (typeof subMenuList)[number]

const logout = () => {
  removeTokenFromLocalStorage()
  router.push('/login')
}

const isActiveRoute = (menuName: string | null) => {
  const subRoutes = ['airports', 'airlines', 'package-type', 'city']

  if (menuName) {
    return route.name === menuName
  } else return subRoutes.includes(route.name as string)
}

const getMenuClass = (menuName: string) => {
  return isActiveRoute(menuName)
    ? 'bg-primary text-white px-2 py-3 rounded-md mb-2'
    : 'hover:bg-primary hover:text-white px-2 py-3 rounded-md mb-2'
}

const getMasterDataClass = (menuName: SubMenu) => {
  return isActiveRoute(menuName)
    ? 'text-primary font-bold hover:bg-primary hover:text-white px-2 py-3 rounded-md mb-2'
    : 'hover:bg-primary hover:text-white px-2 py-3 rounded-md mb-2'
}

const toggleSubmenu = () => {
  isSubmenuOpen.value = !isSubmenuOpen.value
}
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <!-- Navbar -->
    <div class="navbar bg-white sticky top-0 w-full z-10">
      <div class="flex-none">
        <label
          for="my-drawer-3"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-6 w-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div class="mx-2 flex-1 px-2">
        <img
          :src="logoTopLeft"
          alt="Logo"
          class="w-[152px] hidden lg:inline"
        />
      </div>
      <div class="flex-none block">
        <ul class="menu menu-horizontal">
          <!-- Navbar menu content here -->
          <li>
            <div class="dropdown dropdown-bottom dropdown-end">
              <div
                tabindex="0"
                role="button"
                class="text-[#16754d] flex items-center gap-2"
              >
                <p>Admin GTM</p>
                <UserCircleIcon />
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <button
                    @click="logout"
                    class="text-[#16754d] hover:bg-[#16754d] hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Page content with drawer -->
    <div class="flex-1 overflow-hidden">
      <!-- Drawer for sidebar -->
      <div class="drawer drawer-mobile lg:drawer-open h-full">
        <input
          id="my-drawer-3"
          type="checkbox"
          class="drawer-toggle"
        />
        <div class="drawer-content flex flex-col overflow-auto !h-[calc(100%-68px)]">
          <!-- Page content here -->
          <div class="p-4">
            <!-- <slot></slot> -->
            <RouterView />
          </div>
        </div>
        <div class="drawer-side">
          <label
            for="my-drawer-3"
            aria-label="close sidebar"
            class="drawer-overlay lg:hidden"
          ></label>
          <ul class="menu bg-white min-h-full w-60 py-4 px-2 pt-20 lg:pt-0">
            <!-- Sidebar content here -->
            <li>
              <img
                :src="logoTopLeft"
                alt="Logo"
                class="w-[152px] lg:hidden mb-2"
              />
            </li>
            <li>
              <RouterLink
                to="/biro-travel"
                :class="getMenuClass('biro-travel')"
              >
                <SidebarMenuOpenIcon
                  width="24"
                  height="24"
                  v-if="isActiveRoute('biro-travel')"
                />
                <SidebarMenuCloseIcon
                  width="24"
                  height="24"
                  v-else
                />
                Biro Travel
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/pesanan"
                :class="getMenuClass('pesanan')"
              >
                <SidebarMenuOpenIcon
                  width="24"
                  height="24"
                  v-if="isActiveRoute('pesanan')"
                />
                <SidebarMenuCloseIcon
                  width="24"
                  height="24"
                  v-else
                />
                Pesanan
              </RouterLink>
            </li>
            <li>
              <p
                :class="getMenuClass('airports')"
                @click="toggleSubmenu"
              >
                <SidebarMenuOpenIcon
                  width="24"
                  height="24"
                  v-if="isActiveRoute('airports')"
                />
                <SidebarMenuCloseIcon
                  width="24"
                  height="24"
                  v-else
                />
                Data
              </p>
              <ul
                v-if="isSubmenuOpen"
                class="before:content-none"
              >
                <li
                  v-for="item in subMenuList"
                  :key="item"
                >
                  <RouterLink
                    :to="`/${item}`"
                    :class="getMasterDataClass(item)"
                  >
                    {{ formatLabel(item) }}
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drawer-content {
  height: 100%;
  overflow-y: auto;
}
</style>
