import axios from '@/plugins/axios'

// 获取列表
export const getMajorList = params => axios({
  url: 'major',
  method: 'get',
  params
})

// 新建
export const createMajor = data => axios({
  url: 'major',
  method: 'post',
  data
})

// 更新
export const updateMajor = (id, data) => axios({
  url: `major/${id}`,
  method: 'put',
  data
})

// 获取详情
export const getMajorDetail = id => axios({
  url: `major/${id}`,
  method: 'get'
})

// 删除
export const deleteMajor = id => axios({
  url: `major/${id}`,
  method: 'delete'
})
