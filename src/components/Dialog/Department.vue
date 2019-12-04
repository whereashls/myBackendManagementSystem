<template>
  <div class="dialog">
    <el-form ref="form" :model="formData" :rules="formRules" size="medium" label-width="100px">
      <el-form-item label="系别名称:" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button size="medium" type="primary" :loading="loading" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { createDepartment, updateDepartment, getDepartmentDetail } from '@/api/department'

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
          { required: true, message: '请填写系别名称', trigger: 'blur' }
        ]
      },
      loading: false
      // loading: true
    }
  },
  computed: {
    form () {
      return this.$refs.form
    }
  },
  created () {
    if (this.type === 2) {
      getDepartmentDetail(this.id).then(res => {
        this.formData.name = res.data.d_name
      })
    }
  },
  methods: {
    submit () {
      this.form.validate().then(() => {
        if (this.loading) return false
        this.loading = true
        const requestData = { d_name: this.formData.name }
        const requestFn = this.type === 1 ? createDepartment(requestData) : updateDepartment(this.id, requestData)
        requestFn.then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.$emit('close')
            this.$emit('done')
          } else {
            this.$message.error(res.message)
          }
          //
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
