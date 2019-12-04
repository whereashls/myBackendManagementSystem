<template>
  <div class="dialog">
    <el-form ref="form" :model="formData" :rules="formRules" size="medium" label-width="100px">
      <el-form-item label="名称:" prop="t_name">
        <el-input v-model="formData.t_name"></el-input>
      </el-form-item>
      <el-form-item label="工号:" prop="t_id">
        <el-input v-model="formData.t_id"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="t_sex">
        <el-select v-model="formData.t_sex" style="width: 100%;">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
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
import { createTeacher, updateTeacher, getTeacherDetail } from '@/api/teacher'
import { getDepartmentList } from '@/api/department'

export default {
  // type 1 新增  2 编辑
  props: ['type', 'id'],
  data () {
    return {
      formData: {
        t_id: '',
        t_name: '',
        t_sex: '',
        d_id: ''
      },
      formRules: {
        t_name: [
          { required: true, message: '请填写教师名称', trigger: 'blur' }
        ],
        t_id: [
          { required: true, message: '请填写教师工号', trigger: 'blur' }
        ],
        t_sex: [
          { required: true, message: '请填写教师性别', trigger: 'change' }
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
      getTeacherDetail(this.id).then(res => {
        this.formData.t_name = res.data.t_name
        this.formData.t_id = res.data.t_id
        this.formData.t_sex = res.data.t_sex
        this.formData.d_id = res.data.d_id || ''
      })
    }
  },
  methods: {
    submit () {
      this.form.validate().then(() => {
        if (this.loading) return false
        this.loading = true
        const requestData = {
          t_name: this.formData.t_name,
          t_id: this.formData.t_id,
          t_sex: this.formData.t_sex,
          d_id: this.formData.d_id
        }
        const requestFn = this.type === 1 ? createTeacher(requestData) : updateTeacher(this.id, requestData)
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
