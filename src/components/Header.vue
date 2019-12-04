<template>
  <div class="header">
    <div class="left">
      <span class="title">学生管理系统</span>
    </div>
    <div class="right">
      <span class="hello"><i class="el-icon-s-custom"></i> {{ name }}</span>
      <span @click="exit" class="exit"><i class="el-icon-switch-button"></i> 退出</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Admin'
    }
  },
  methods: {
    exit () {}
  }
}
</script>

<style scoped>
.header {
  height: 60px;
  min-height: 60px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}
.header .left .title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
}
.header .right {
  display: flex;
}
.header .right .hello {
  margin-right: 30px;
}
.header .right .exit {
  cursor: pointer;
  transition: all .15s;
}
.header .right .exit:hover {
  color: #409EFF;
}
</style>
