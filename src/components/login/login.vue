<template>
  <div id="login">
    <div class="logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="login-form">
      <p class="title">后台管理系统</p>
      <el-form ref="form" :model="form" label-width="0">
        <el-form-item label="">
          <el-input v-model="form.name" placeholder="登录手机号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input type="password" v-model="form.password" placeholder="登录密码"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" style="width: 100%;" :loading="isDisabled" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {
    checkMobile,
    setSessionStorage,
  } from '@/utils/mixin'
  import {
    mapGetters,
    mapMutations
  } from 'vuex';
  export default {
    data() {
      return {
        form: {
          name: '18613974745',
          password: '666666'
        },
        isDisabled: false,
      }
    },
    methods: {
      ...mapMutations([
        'SET_TOKEN',
        'SET_UID'
      ]),
      /*
       * 校验密码
       * */
      checkPassword() {

      },
      /*
       * 登录方法
       * */
      login() {
        if (!checkMobile(this.form.name)) {
          this.$message({
            message: '手机号格式错误,请检查输入。',
            type: 'error'
          });
          return false;
        }
        if (this.checkPassword(this.form.password)) {
          this.$message({
            message: '密码格式错误,请检查输入。',
            type: 'error'
          });
          return false;
        }
        this.$store.dispatch('Login', {phonenum: this.form.name, password: this.form.password}).then((res) => {
          this.SET_TOKEN(res.token);
          this.SET_UID(res.id);
          setSessionStorage('token', res.token)
          setSessionStorage('uid', res.id)
          setSessionStorage('isSuper', res.isSuper)
          setSessionStorage('permissionsList', res.list_permissions);
          /*
          * 判断超级管理员，决定跳转地址
          * */
//          if(Number(res.isSuper)){
//
//          }
          this.$router.push('/home/welcome');
        }).catch(err => {

        })
      }
    },
    mounted(){
    }
  }
</script>

<style scoped lang="scss">
  #login {
    width: 500px;
    margin: 0 auto;
    padding-top: 150px;
    .logo {
      text-align: center;
      img {
        width: 170px;
      }
    }
    .login-form {
      .title {
        font-size: 30px;
        color: #4D4D4D;
        text-align: center;
      }
    }
  }
</style>
