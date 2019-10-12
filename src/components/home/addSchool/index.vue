<template>
  <div id="">
    <breadcrumb :router-list='breadcrumb'></breadcrumb>
    <div class="content">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-if="isAdd">
        <el-tab-pane label="基本信息" name="info"></el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-else>
        <el-tab-pane label="基本信息" name="info"></el-tab-pane>
        <el-tab-pane label="报考指南" name="guide"></el-tab-pane>
        <el-tab-pane label="院校信息" name="intro"></el-tab-pane>
      </el-tabs>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>
<script>
  import Breadcrumb  from '@/components/breadcrumb/breadcrumb'
  export default{
    components: {
      Breadcrumb,
    },
    data(){
      return {
        breadcrumb: [
          {
            path: '/home/signUpGuide',
            name: '报考指南管理',
            isDefault: false
          },
          {
            path: '',
            name: '添加院校',
            isDefault: true
          },
          {
            path: '',
            name: '基本资料',
            isDefault: true
          },
        ],
        activeName: 'info',
        isAdd: true,
      }
    },
    methods: {
      /*
       * tab切换时，根据tab项，修改对应的面包屑以及 跳转对应路由
       * */
      handleClick(tab, event) {
        if (tab.name === 'info') {
          this.breadcrumb[2].name = '基本信息';
          if (this.$route.path.indexOf('edit') !== -1) {
            this.$nextTick(() => {
              this.$router.push('/home/editSchool/schoolInfo')
            })
          } else {
            this.$nextTick(() => {
              this.$router.push('/home/addSchool/schoolInfo')
            })
          }
        } else if (tab.name === 'guide') {
          this.breadcrumb[2].name = '报考指南';
          if (this.$route.path.indexOf('edit') !== -1) {
            this.$router.push('/home/editSchool/guide')
          } else {
            this.$router.push('/home/addSchool/guide')
          }
        } else if (tab.name === 'intro') {
          this.breadcrumb[2].name = '院校信息';
          if (this.$route.path.indexOf('edit') !== -1) {
            this.$router.push('/home/editSchool/schoolIntro')
          } else {
            this.$router.push('/home/addSchool/schoolIntro')
          }
        }
      }
    },
    mounted(){
      /*
       * 获取路由信息，判断当前选中的tab项
       * */
      if (this.$route.path.indexOf('/schoolInfo') !== -1) {
        this.activeName = 'info'
      } else if (this.$route.path.indexOf('/guide') !== -1) {
        this.activeName = 'guide'
      } else if (this.$route.path.indexOf('/schoolIntro') !== -1) {
        this.activeName = 'intro'
      }
      /*
       * 获取路由信息,判断当前是新增还是编辑
       * */
      if (this.$route.path.indexOf('edit') !== -1) {
        this.isAdd = false;
        this.breadcrumb[1].name = '编辑院校';
      } else {
        this.isAdd = true;
        this.breadcrumb[1].name = '添加院校';
      }
    },
    activated(){

    }
  }
</script>
<style scoped lang="scss">
  .content {
    margin-top: 20px;

  }

  .submit-btn {
    margin-top: 20px;
    text-align: center;
  }

</style>
