<template>
  <el-dialog ref="popup" :title="opts.title" custom-class="custom-dialog" :visible.sync="dialogVisible" :close-on-click-modal="opts.closeOnClickModal" :append-to-body="true" @closed="dialogClosed">
    <div id="custom-dialog-content"></div>
  </el-dialog>
</template>

<script>
import Vue from 'vue'
import router from '@/router'
import dialogCollection from './collection'

export default {
  data () {
    return {
      tips: false,
      dialogVisible: false,
      content: null,
      opts: {
        title: '',
        closeOnClickModal: false
      }
    }
  },
  watch: {
    $route () {
      this.close()
    }
  },
  methods: {
    // 显示并且挂载
    show ({ name = '', options = {}, params = {}, methods = {} }) {
      this.opts = Object.assign(this.opts, options)
      const component = dialogCollection[name]
      const Content = Vue.extend(component)
      this.dialogVisible = true
      this.$nextTick(() => {
        const content = new Content({
          propsData: {
            ...params
          },
          router
        })
        Object.keys(methods).forEach(fnName => {
          content.$on(fnName, methods[fnName])
        })
        content.$on('close', this.close)
        this.content = content.$mount('#custom-dialog-content')
      })
    },
    // 关闭
    close () {
      this.dialogVisible = false
    },
    // 关闭后销毁组件
    dialogClosed () {
      this.content.$destroy()
      this.$destroy()
    }
  }
}
</script>
