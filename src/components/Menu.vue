<template>
  <div class="menu">
    <el-menu
      :default-active="currentRouteName"
      class="el-menu-vertical"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-menu-item index="StudentManagement">
        <i class="el-icon-s-custom"></i>
        <span slot="title">学生管理</span>
      </el-menu-item>
      <el-menu-item index="TeacherManagement">
        <i class="el-icon-s-check"></i>
        <span slot="title">教师管理</span>
      </el-menu-item>
      <el-menu-item index="MajorManagement">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">专业管理</span>
      </el-menu-item>
      <el-menu-item index="DepartmentManagement">
        <i class="el-icon-s-home"></i>
        <span slot="title">系别管理</span>
      </el-menu-item>
      <el-menu-item index="RoleManagement">
        <i class="el-icon-s-flag"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  },
  methods: {
    handleSelect (key) {
      if (key === this.currentRouteName) return false
      this.$router.replace({
        name: key
      })
    }
  }
}
</script>

<style scoped>
.menu {
  width: 200px;
  min-width: 200px;
  border-right: 1px solid #ddd
}
.menu .el-menu-vertical {
  height: 100%;
}
</style>
