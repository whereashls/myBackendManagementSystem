import axios from '@/plugins/axios'

// 获取列表
export const getDepartmentList = params => axios({
  url: 'department',
  method: 'get',
  params
})

// 新建
export const createDepartment = data => axios({
  url: 'department',
  method: 'post',
  data
})

// 更新
export const updateDepartment = (id, data) => axios({
  url: `department/${id}`,
  method: 'put',
  data
})

// 获取详情
export const getDepartmentDetail = id => axios({
  url: `department/${id}`,
  method: 'get'
})

// 删除
export const deleteDepartment = id => axios({
  url: `department/${id}`,
  method: 'delete'
})
