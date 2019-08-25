import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Comics from './views/comicInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      props: (route) => ({query:
        { title: route.query.title ? route.query.title : ''
        ,orderBy: route.query.orderBy ? route.query.orderBy : 'focDate'
        ,asc: typeof route.query.asc != 'undefined' ? route.query.asc : true
        ,page: route.query.page ? route.query.page : 1
        ,limit: route.query.limit ? route.query.limit : 10}
      })
    }
    ,{
      path: '/comics/:id',
      name: 'comicInfo',
      component: Comics
    }
    ,{
      path: '/'
      ,redirect: 'home'
    }
  ]
})
