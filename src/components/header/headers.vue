<template>
  <div id="header">
    <!-- <el-container> -->
    <el-header class="header">
      <div class="header-info">
        <img src="@/assets/images/logo.png" alt="">
        <span class="title">奇点校园</span>
      </div>
      <div class="logout" @click="logOut">
        <img src="@/assets/images/logout.png" alt="">
        <span class="close">退出</span>
      </div>
    </el-header>
    <!-- </el-container> -->
  </div>
</template>
<script>
  import {removeSessionStorage} from '@/utils/mixin'
  export default{
    methods: {
      logOut(){
        removeSessionStorage('uid')
        removeSessionStorage('token')
        removeSessionStorage('editId')
        removeSessionStorage('isSuper')
        removeSessionStorage('permissionsList')
        removeSessionStorage('schoolId');
        this.$router.push('/login');
        window.location.reload();
      }
    }
  }
</script>
<style scoped lang="scss">

  #header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 999;
    .header {
      background-color: #f8f8f8;
      padding: auto 35px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e0e0e0;
      .header-info {
        img {
          /*width: 200px;*/
          height: 40px;
          vertical-align: middle;
          margin-right: 15px;
          margin-left: 60px;
        }
        .title {
          font-size: 20px;
          color: #40b9e6;
        }
      }
      .logout {
        cursor: pointer;
        img {
          width: 20px;
          margin-right: 5px;
          vertical-align: middle;
        }
        .close {
          font-size: 14px;
          color: #40b9e6;
        }
      }
    }
  }

</style>
