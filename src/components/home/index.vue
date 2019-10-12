<template>
  <div id="home">
    <headers></headers>
    <el-container>
      <el-container>
        <el-aside width="200px" class="aside">
          <!-- <ul class="aside-list">
            <router-link :class="['aside-item',$route.path==='/home/welcome'&&'active']" to="/home/welcome"
                         tag="li">首页
            </router-link>
            <router-link :class="['aside-item',$route.path==='/home/adminSetting'&&'active']" to="/home/adminSetting"
                         tag="li" v-if="isSuper">管理员设置
            </router-link>
            <li class="aside-item">用户统计</li>
            <li class="aside-item" v-if="permissionsList.has_schoolAuthen||isSuper">学校认证管理</li>
            <li class="aside-item" v-if="permissionsList.has_cloudRecommend||isSuper">云教材中心管理</li>
            <router-link to="/home/signUpGuide" tag="li" v-if="permissionsList.has_examguide||isSuper"
                         :class="['aside-item',(($route.path==='/home/signUpGuide')||$route.path.indexOf('/addSchool') !== -1)&&'active',($route.path.indexOf('/setExamSiteAndSpecialty')!==-1)&&'active',$route.path.indexOf('/editSchool') !== -1&&'active']">
              报考指南管理
            </router-link>
            <li class="aside-item" v-if="permissionsList.has_sketch||isSuper">速写创作管理</li>
            <li class="aside-item" v-if="permissionsList.has_sketch||isSuper">考题创作管理</li>
            <li class="aside-item" v-if="permissionsList.has_dynamic||isSuper">奇点动态管理</li>
          </ul> -->
          <el-menu
            :default-active="$route.path"
            :router="true"
            class="el-menu-vertical-demo">
            <el-menu-item index="/home/welcome">
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/home/adminSetting">
              <span slot="title">管理员设置</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">学校认证管理</span>
            </el-menu-item>
            <el-submenu index="">
              <template slot="title">
                <span>云教材中心管理</span>
              </template>
              <el-menu-item index="/home/recommendList">每日推荐</el-menu-item>
              <el-menu-item index="/home/coursewareList">课件管理</el-menu-item>
              <el-menu-item index="/home/bookList">书籍管理</el-menu-item>
              <el-menu-item index="/home/templateList">课件模板管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="/home/systemList">
              <span slot="title">教材体系管理</span>
            </el-menu-item>
            <el-menu-item index="/home/publisherList">
              <span slot="title">出版社管理</span>
            </el-menu-item>
            <el-menu-item index="/home/signUpGuide">
              <span slot="title">报考指南管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <span slot="title">速写创作管理</span>
            </el-menu-item>
            <el-menu-item index="6">
              <span slot="title">考题创作管理</span>
            </el-menu-item>
            <el-menu-item index="7">
              <span slot="title">奇点动态管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="el-main">

          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import Headers from '@/components/header/headers'
  import {getSessionStorage} from '@/utils/mixin'
  export default {
    components: {
      Headers
    },
    data() {
      return {
        permissionsList: [],//权限数组
        isSuper: false,//是否超管
      }
    },
    mounted(){
      /*
       * 判断 权限数组是否为空
       * */
      if (getSessionStorage('permissionsList') !== '{}') {
        this.permissionsList = JSON.parse(getSessionStorage('permissionsList'));
        this.isSuper = Number(getSessionStorage('isSuper'))
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped lang="scss">
  #home {
    margin-top: 60px;

    .aside {
      background: #F7F7F7;
      border: 1px solid #E0E0E0;
      margin-left: 16px;
      margin-top: 20px;
      border-radius: 3px;
      position: fixed;
    }

    .el-main {
      margin-left: 220px;
    }

    .aside-list {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 14px;
      .aside-item {
        height: 46px;
        line-height: 46px;
        text-align: center;
        margin: 20px 0;
        color: #101010;
        cursor: pointer;
      }

      .active {
        background: #40b9e6;
        color: #fff;
      }

    }
  }

  .el-main {
    padding: 20px 30px;
  }

</style>
