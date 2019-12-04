<template>
  <div class="app">
    <my-header class="header-component"></my-header>
    <div class="content">
      <my-menu class="menu-component"></my-menu>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
import MyMenu from '@/components/Menu'

export default {
  components: {
    MyHeader,
    MyMenu
  }
}
</script>

<style scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.app .content {
  flex-grow: 1;
  display: flex;
  height: 1px;
}
.app .content .main-content {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  width: 1px;
  padding: 20px;
  background-color: #f1f1f1;
}
</style>
