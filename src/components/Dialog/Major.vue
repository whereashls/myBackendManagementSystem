<template>
  <div class="dialog">
    <el-form ref="form" :model="formData" :rules="formRules" size="medium" label-width="100px">
      <el-form-item label="专业名称:" prop="m_name">
        <el-input v-model="formData.m_name"></el-input>
      </el-form-item>
      <el-form-item label="所属系别:" prop="d_id">
        <el-select v-model="formData.d_id" style="width: 100%;" clearable>
          <el-option v-for="(item, index) in departmentOptions" :key="index" :label="item.d_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button size="medium" type="primary" :loading="loading" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { createMajor, updateMajor, getMajorDetail } from '@/api/major'
import { getDepartmentList } from '@/api/department'

export default {
  // type 1 新增  2 编辑
  props: ['type', 'id'],
  data () {
    return {
      formData: {
        m_name: '',
        d_id: ''
      },
      formRules: {
        m_name: [
          { required: true, message: '请填写专业名称', trigger: 'blur' }
        ]
      },
      loading: false,
      departmentOptions: []
    }
  },
  computed: {
    form () {
      return this.$refs.form
    }
  },
  created () {
    getDepartmentList().then(res => {
      this.departmentOptions = res.data.list
    })
    if (this.type === 2) {
      getMajorDetail(this.id).then(res => {
        this.formData.m_name = res.data.m_name
        this.formData.d_id = res.data.d_id
      })
    }
  },
  methods: {
    submit () {
      this.form.validate().then(() => {
        if (this.loading) return false
        this.loading = true
        const requestData = {
          m_name: this.formData.m_name,
          d_id: this.formData.d_id
        }
        const requestFn = this.type === 1 ? createMajor(requestData) : updateMajor(this.id, requestData)
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
