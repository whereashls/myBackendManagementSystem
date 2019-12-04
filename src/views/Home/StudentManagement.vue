<template>
  <div class="page">
    <div class="content">
      <div class="content-header">
        <span>共 {{ list.total }} 条结果</span>
        <el-button @click="add" size="medium" type="primary">新增</el-button>
      </div>

      <el-table :data="list.data" border v-loading="list.loading">
        <el-table-column prop="s_name" label="学生姓名"></el-table-column>
        <el-table-column prop="s_id" label="学号"></el-table-column>
        <el-table-column prop="s_sex" label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.s_sex === 1">男</span>
            <span v-else-if="scope.row.s_sex === 2">女</span>
          </template>
        </el-table-column>
        <el-table-column label="专业">
          <template slot-scope="scope">
            <span v-if="scope.row.major">{{ scope.row.major.m_name }}</span>
            <span v-else class="null">无</span>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            <span v-if="scope.row.role">{{ scope.row.role.r_name }}</span>
            <span v-else class="null">无</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="update(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :current-page="list.page"
        :page-size="list.pageSize"
        :total="list.total"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getStudentList, deleteStudent } from '@/api/student'

export default {
  data () {
    return {
      list: {
        data: [],
        page: 1,
        pageSize: 11,
        total: 0,
        loading: false
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      if (this.list.loading) return false
      this.list.loading = true
      getStudentList({
        page: this.list.page,
        page_size: this.list.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.list.data = res.data.list
          this.list.total = res.data.total
          console.log(this.list.data)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.list.loading = false
      })
    },
    // 新增
    add () {
      this.$Dialog({
        name: 'Student',
        options: {
          title: '新增学生'
        },
        params: {
          type: 1
        },
        methods: {
          done: () => {
            this.getList()
          }
        }
      })
    },
    // 编辑
    update (id) {
      this.$Dialog({
        name: 'Student',
        options: {
          title: '编辑学生'
        },
        params: {
          type: 2,
          id
        },
        methods: {
          done: () => {
            this.getList()
          }
        }
      })
    },
    // 删除
    remove (id) {
      deleteStudent(id).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.getList()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 选择页数
    pageChange (current) {
      this.list.page = current
      this.getList()
    }
  }
}
</script>

<style>
.page {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.page .content {
  padding: 15px;
  flex-grow: 1;
  background-color: white;
}
.page .content .content-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.page .content .pagination {
  margin-top: 20px;
  text-align: center;
}
.page .content .null {
  color: #aaa;
}
</style>
