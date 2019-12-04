import axios from '@/plugins/axios'

// 获取角色列表
export const getRoleList = params => axios({
  url: 'role',
  method: 'get',
  params
})

// 新建角色
export const createRole = data => axios({
  url: 'role',
  method: 'post',
  data
})

// 更新角色
export const updateRole = (id, data) => axios({
  url: `role/${id}`,
  method: 'put',
  data
})

// 获取角色详情
export const getRoleDetail = id => axios({
  url: `role/${id}`,
  method: 'get'
})

// 删除角色
export const deleteRole = id => axios({
  url: `role/${id}`,
  method: 'delete'
})
