import axios from '@/plugins/axios'

// 获取列表
export const getTeacherList = params => axios({
  url: 'teacher',
  method: 'get',
  params
})

// 新建
export const createTeacher = data => axios({
  url: 'teacher',
  method: 'post',
  data
})

// 更新
export const updateTeacher = (id, data) => axios({
  url: `teacher/${id}`,
  method: 'put',
  data
})

// 获取详情
export const getTeacherDetail = id => axios({
  url: `teacher/${id}`,
  method: 'get'
})

// 删除
export const deleteTeacher = id => axios({
  url: `teacher/${id}`,
  method: 'delete'
})
