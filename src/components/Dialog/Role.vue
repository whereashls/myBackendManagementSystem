<template>
  <div class="dialog">
    <el-form ref="form" :model="formData" :rules="formRules" size="medium" label-width="100px">
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button size="medium" type="primary" :loading="loading" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { createRole, updateRole, getRoleDetail } from '@/api/role'

export default {
  // type 1 新增  2 编辑
  props: ['type', 'id'],
  data () {
    return {
      formData: {
        name: ''
      },
      formRules: {
        name: [
          { required: true, message: '请填写角色名称', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    form () {
      return this.$refs.form
    }
  },
  created () {
    if (this.type === 2) {
      getRoleDetail(this.id).then(res => {
        this.formData.name = res.data.r_name
      })
    }
  },
  methods: {
    submit () {
      this.form.validate().then(() => {
        if (this.loading) return false
        this.loading = true
        const requestData = { r_name: this.formData.name }
        const requestFn = this.type === 1 ? createRole(requestData) : updateRole(this.id, requestData)
        requestFn.then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.$emit('close')
            this.$emit('done')
          } else {
            this.$message.error(res.message)
          }
        }).finally(() => {
          this.loading = false
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.button {
  margin-top: 50px;
  text-align: center;
}
</style>
