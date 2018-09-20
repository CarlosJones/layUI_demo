import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FormExample from '@/components/Form'
import TableDemo from '@/components/Table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/form',
      name: 'FormExample',
      component: FormExample
    },
    {
      path: '/table',
      name: 'TableDemo',
      component: TableDemo
    }
  ]
})
