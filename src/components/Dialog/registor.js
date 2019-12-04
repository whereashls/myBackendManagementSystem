import Vue from 'vue'
import router from '@/router'
import Dialog from './index'

Vue.use({
  install (Vue) {
    Vue.prototype.$Dialog = opts => {
      const Popup = Vue.extend(Dialog)
      const instance = new Popup({
        router
      })
      const id = 'custom-dialog-component'
      let el = document.getElementById(id)
      if (!el) {
        el = document.createElement('div')
        el.setAttribute('id', id)
        document.body.appendChild(el)
      }
      instance.$mount(`#${id}`)
      Vue.nextTick(() => {
        instance.show && instance.show(opts)
      })
      return instance
    }
  }
})
