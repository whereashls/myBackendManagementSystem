import axios from '@/plugins/axios'

// 获取列表
export const getStudentList = params => axios({
  url: 'user',
  method: 'get',
  params
})

// 新建
export const createStudent = data => axios({
  url: 'user',
  method: 'post',
  data
})

// 更新
export const updateStudent = (id, data) => axios({
  url: `user/${id}`,
  method: 'put',
  data
})

// 获取详情
export const getStudentDetail = id => axios({
  url: `user/${id}`,
  method: 'get'
})

// 删除
export const deleteStudent = id => axios({
  url: `user/${id}`,
  method: 'delete'
})
