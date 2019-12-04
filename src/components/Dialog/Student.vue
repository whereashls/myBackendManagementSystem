<template>
  <div class="dialog">
    <el-form ref="form" :model="formData" :rules="formRules" size="medium" label-width="100px">
      <el-form-item label="名称:" prop="s_name">
        <el-input v-model="formData.s_name"></el-input>
      </el-form-item>
      <el-form-item label="学号:" prop="s_id">
        <el-input v-model="formData.s_id"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="s_sex">
        <el-select v-model="formData.s_sex" style="width: 100%;">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop="r_id">
        <el-select v-model="formData.r_id" style="width: 100%;" clearable>
          <el-option v-for="(item, index) in roleOptions" :key="index" :label="item.r_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业:" prop="m_id">
        <el-select v-model="formData.m_id" style="width: 100%;" clearable>
          <el-option v-for="(item, index) in majorOptions" :key="index" :label="item.m_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button size="medium" type="primary" :loading="loading" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { createStudent, updateStudent, getStudentDetail } from '@/api/student'
import { getRoleList } from '@/api/role'
import { getMajorList } from '@/api/major'

export default {
  // type 1 新增  2 编辑
  props: ['type', 'id'],
  data () {
    return {
      formData: {
        s_name: '',
        password: '',
        s_id: '',
        s_sex: '',
        r_id: '',
        m_id: ''
      },
      formRules: {
        s_name: [
          { required: true, message: '请填写学生名称', trigger: 'blur' }
        ],
        s_id: [
          { required: true, message: '请填写学生学号', trigger: 'blur' }
        ],
        s_sex: [
          { required: true, message: '请填写学生性别', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      },
      loading: false,
      roleOptions: [],
      majorOptions: []
    }
  },
  computed: {
    form () {
      return this.$refs.form
    }
  },
  created () {
    getRoleList().then(res => {
      this.roleOptions = res.data.list
    })
    getMajorList().then(res => {
      this.majorOptions = res.data.list
    })
    if (this.type === 2) {
      getStudentDetail(this.id).then(res => {
        this.formData.s_name = res.data.s_name
        this.formData.password = res.data.password
        this.formData.s_id = res.data.s_id
        this.formData.s_sex = res.data.s_sex
        this.formData.r_id = res.data.r_id || ''
        this.formData.m_id = res.data.m_id || ''
      })
    }
  },
  methods: {
    submit () {
      this.form.validate().then(() => {
        if (this.loading) return false
        this.loading = true
        const requestData = {
          s_name: this.formData.s_name,
          password: this.formData.password,
          s_id: this.formData.s_id,
          s_sex: this.formData.s_sex,
          r_id: this.formData.r_id,
          m_id: this.formData.m_id
        }
        const requestFn = this.type === 1 ? createStudent(requestData) : updateStudent(this.id, requestData)
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
