<template>
  <div id="school-info">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/recommendList' }">云教材每日推荐管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.params.id">编辑每日推荐</el-breadcrumb-item>
      <el-breadcrumb-item v-else>上传每日推荐</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content"></div>
      <el-form ref="createRecommendInfo" :model="createRecommendInfo" label-width="100px" size="small">
        <el-form-item label="推荐名称：">
            <el-input style="width: 240px;" v-model="createRecommendInfo.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="封面:" class="add-img">
          <el-upload
            action="https://up-z2.qiniup.com"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :data="qiniuToken"
            :on-success="upLoadSucc"
            :on-remove="removeSucc"
            :file-list="logoList"
            :limit="1"
            v-if="$route.params.id"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-upload
            action="https://up-z2.qiniup.com"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :data="qiniuToken"
            :on-success="upLoadSucc"
            :on-remove="removeSucc"
            :limit="1"
            v-else
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="推荐日期：">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              v-model="createRecommendInfo.recommend_time"
              size="small"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="作者：">
            <el-input style="width: 240px;" v-model="createRecommendInfo.name_author" clearable></el-input>
        </el-form-item>
        <el-form-item label="学习人数：">
            <el-input style="width: 240px;" v-model="createRecommendInfo.numof_join" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容：">
            <vue-html5-editor :content="createRecommendInfo.content_article" @change="detection" :height="300" ref="edit"
              id="close"></vue-html5-editor>
        </el-form-item>
        <el-form-item label-width="0px">
          <div style="margin:20px 0 0 120px">
            <el-button type="primary" size="small" style="width: 100px" @click="AddRecommendationDaily">上传</el-button>
            <el-button size="small" style="width: 100px;margin-left:26px" @click="cancel">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
  import {province}  from '@/utils/province'
  import {schoolType}  from '@/utils/schoolType'
  import {profession}  from '@/utils/profession'
  import {subject}  from '@/utils/subject'
  import * as qiniu from 'qiniu-js'
  import {setSessionStorage, getSessionStorage} from '@/utils/mixin'
  export default {
    data() {
      return {
        qiniuToken: {
          token: ''
        },
        domain: '',
        content: '',
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        createRecommendInfo: {
          title: '',//文章标题	
          name_author: '',//作者名字
          url_cover: '',//封面图片的URL
          numof_join: '',//学习人数
          content_article: '',//富文本
          recommend_time: ''//推荐日期
        },
        editId: '',//编辑对象的ID
        hasEdit: false,//标识当前是否为编辑
        logoList: [
          {
            name: '1',
            url: ''
          }
        ],
      }
    },
    methods: {
      cancel(){
        history.go(-1)
      },
      detection(e){
        this.createRecommendInfo.content_article = e
      },
      onSubmit() {
        console.log('submit!');
      },
      removeSucc(e){
        this.createRecommendInfo.url_cover = '';
      },
      /*
       * 获得上传的token
       * */
      getUploadToken(){
        this.$store.dispatch('GetUploadToken').then(res => {
          this.qiniuToken.token = res.token;
          this.domain = res.bucketUrl;
        });
      },
      /*
       * 上传成功回调
       * */
      upLoadSucc(res){
        this.createRecommendInfo.url_cover = `${this.domain}/${res.key}`;
      },
       /*
       * 通过id查询单个云教材每日推荐
       * */
      SelectRecommendationDailyById(id){
        let that = this
        this.$store.dispatch('SelectRecommendationDailyById', {id:id}).then(res => {
           res.recommend_time = new Date(res.recommend_time).Format('yyyy-MM-dd')
           that.logoList[0].url = res.url_cover
           that.createRecommendInfo = Object.assign(that.createRecommendInfo,res)
           console.log(res,'createRecommendInfo')
        })
      },
      /*
       * 创建OR编辑单个推荐
       * */
      AddRecommendationDaily(){
        let newObj = JSON.parse(JSON.stringify(this.createRecommendInfo))
        let flag = false;
        let updateObj = JSON.parse(JSON.stringify(Object.assign(this.createRecommendInfo,{id:this.$route.params.id})))

        if (!this.$route.params.id) {
          this.$store.dispatch('AddRecommendationDaily', newObj).then(res => {
            this.$message({
              message: '添加推荐成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/recommendList');
            }, 2000)
          });
        } else {
          this.$store.dispatch('UpdateRecommendationDaily', updateObj).then(res => {
            this.$message({
              message: '添加推荐成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/recommendList');
            }, 2000)
          });
        }
      }
    },
    mounted(){
      this.getUploadToken();
      /*
       * 进这个页面，如果是编辑,走拉去信息流程
       * 如果是新增，在else 还原数据
       * */
    },
    activated (){
      console.log(this.$route.params.id,'params')
      if (this.$route.params.id) {
          this.SelectRecommendationDailyById(this.$route.params.id)
      } else {
        this.editId = '';
        this.logoList = [
          {
            name: '1',
            url: ''
          }
        ],
        this.createRecommendInfo = {
          title: '',//文章标题	
          name_author: '',//作者名字
          url_cover: '',//封面图片的URL
          numof_join: '',//学习人数
          content_article: '',//富文本
          recommend_time: ''//推荐日期
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  #school-info {
    .content {
      margin-top: 36px;

    }
    .add-img {
      img {
        width: 33px;
        vertical-align: bottom;
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      .tag {
        border: 1px solid #bbb;
        padding: 0 15px;
        font-size: 12px;
        margin-right: 10px;
        border-radius: 4px;
        cursor: pointer;
        line-height: 30px;
        margin-bottom: 5px;
        user-select: none;
      }
    }
    .active {
      background: #40b9e6;
      border: 1px solid #ffffff !important;
      color: #ffffff;
    }
    .hide-up-load {
      display: none;
    }
  }

</style>
<style>
  #school-info .el-upload-list__item-preview{
    display: none;
  }
</style>
