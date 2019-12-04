<template>
  <div class="page">
    <div class="content">
      <div class="content-header">
        <span>共 {{ list.total }} 条结果</span>
        <el-button @click="add" size="medium" type="primary">新增</el-button>
      </div>

      <el-table :data="list.data" border v-loading="list.loading">
        <el-table-column prop="m_name" label="专业名称"></el-table-column>
        <el-table-column label="所属系别">
          <template slot-scope="scope">
            <span v-if="scope.row.department">{{ scope.row.department.d_name }}</span>
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
import { getMajorList, deleteMajor } from '@/api/major'

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
      getMajorList({
        page: this.list.page,
        page_size: this.list.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.list.data = res.data.list
          this.list.total = res.data.total
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
        name: 'Major',
        options: {
          title: '新增专业'
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
        name: 'Major',
        options: {
          title: '编辑专业'
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
      deleteMajor(id).then(res => {
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
