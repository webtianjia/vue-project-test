import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/login'
import Home from '@/components/home/index'
import AdminSetting from '@/components/home/adminSetting/adminSetting'
import SignUpGuide from '@/components/home/signUpGuide/index'
import AddSchool from '@/components/home/addSchool/index'
import SchoolInfo from '@/components/home/addSchool/info/schoolInfo'
import Guide from '@/components/home/addSchool/info/guide'
import SchoolIntro from '@/components/home/addSchool/info/schoolIntro'
import RecommendList from '@/components/home/dailyRecommend/recommendList'
import AddRecommend from '@/components/home/dailyRecommend/addRecommend'
import CoursewareList from '@/components/home/courseware/coursewareList'
import AddCourseware from '@/components/home/courseware/addCourseware'
import BookList from '@/components/home/book/bookList'
import AddBook from '@/components/home/book/addBook'
import BookCommentList from '@/components/home/book/bookCommentList'
import TemplateList from '@/components/home/kejianTemplate/templateList'
import AddTemplate from '@/components/home/kejianTemplate/addTemplate'
import AddSystem from '@/components/home/materialsSystem/addSystem'
import SystemList from '@/components/home/materialsSystem/systemList'
import PublisherList from '@/components/home/publisher/publisherList'
import KejianCommentList from '@/components/home/courseware/kejianCommentList'
import SystemCommentList from '@/components/home/materialsSystem/SystemCommentList'
import SetExamSiteAndSpecialty from '@/components/home/addSchool/setExamSiteAndSpecialty/index'

import Welcome from '@/components/home/index/welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Welcome,
      redirect:'/home/welcome'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {keepAlive: true}
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/adminSetting',
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: Welcome,
        },
        {
          path: 'adminSetting',
          name: 'AdminSetting',
          component: AdminSetting,
          meta: {keepAlive: true}
        },
        {
          path: 'signUpGuide',
          name: 'SignUpGuide',
          component: SignUpGuide,
          meta: {keepAlive: false}
        },
        {
          path: 'publisherList',
          name: 'publisherList',
          component: PublisherList,
          meta: {keepAlive: true}
        },
        {
          path: 'addSystem',
          name: 'addSystem',
          component: AddSystem,
          meta: {keepAlive: true}
        },
        {
          path: 'systemList',
          name: 'systemList',
          component: SystemList,
          meta: {keepAlive: true}
        },
        {
          path: 'addRecommend',
          name: 'AddRecommend',
          component: AddRecommend,
          meta: {keepAlive: true}
        },
        {
          path: 'recommendList',
          name: 'recommendList',
          component: RecommendList,
          meta: {keepAlive: true}
        },
        {
          path: 'coursewareList',
          name: 'coursewareList',
          component: CoursewareList,
          meta: {keepAlive: true}
        },
        {
          path: 'addCourseware',
          name: 'addCourseware',
          component: AddCourseware,
          meta: {keepAlive: true}
        },
        {
          path: 'bookList',
          name: 'bookList',
          component: BookList,
          meta: {keepAlive: true}
        },
        {
          path: 'addBook',
          name: 'addBook',
          component: AddBook,
          meta: {keepAlive: true}
        },
        {
          path: 'bookCommentList',
          name: 'bookCommentList',
          component: BookCommentList,
          meta: {keepAlive: true}
        },
        {
          path: 'templateList',
          name: 'templateList',
          component: TemplateList,
          meta: {keepAlive: true}
        },
        {
          path: 'addTemplate',
          name: 'addTemplate',
          component: AddTemplate,
          meta: {keepAlive: true}
        },
        {
          path: 'kejianCommentList',
          name: 'kejianCommentList',
          component: KejianCommentList,
          meta: {keepAlive: true}
        },
        {
          path: 'systemCommentList',
          name: 'systemCommentList',
          component: SystemCommentList,
          meta: {keepAlive: true}
        },
        {
          path: 'addSchool',
          name: 'AddSchool',
          component: AddSchool,
          redirect: '/home/addSchool/schoolInfo',
          meta: {keepAlive: true},
          children:[
            {
              path: 'schoolInfo',
              name: 'SchoolInfo',
              component: SchoolInfo,
              meta: {keepAlive: false}
            },
            {
              path: 'guide',
              name: 'Guide',
              component: Guide,
              meta: {keepAlive: true}
            },
            {
              path: 'schoolIntro',
              name: 'SchoolIntro',
              component: SchoolIntro,
              meta: {keepAlive: true}
            },
          ]
        },
        {
          path: 'editSchool',
          name: 'EditSchool',
          component: AddSchool,
          redirect: '/home/editSchool/schoolInfo',
          meta: {keepAlive: true},
          children:[
            {
              path: 'schoolInfo',
              name: 'editSchoolInfo',
              component: SchoolInfo,
              meta: {keepAlive: false}
            },
            {
              path: 'guide',
              name: 'editGuide',
              component: Guide,
              meta: {keepAlive: false}
            },
            {
              path: 'schoolIntro',
              name: 'editSchoolIntro',
              component: SchoolIntro,
              meta: {keepAlive: false}
            },
          ]
        },
        {
          path:'setExamSiteAndSpecialty',
          name:'SetExamSiteAndSpecialty',
          component:SetExamSiteAndSpecialty,
          meta:{keepAlive:true}
        }
      ]
    }
  ]
})
