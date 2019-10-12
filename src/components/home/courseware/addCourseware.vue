<template>
  <div id="school-info">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/coursewareList' }">云教材课件管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.params.id">编辑课件</el-breadcrumb-item>
      <el-breadcrumb-item v-else>上传课件</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content"></div>
      <el-form ref="createKejianInfo" :model="createKejianInfo" label-width="100px" size="small">
        <el-form-item label="课件标题：">
            <el-input style="width: 240px;" v-model="createKejianInfo.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="作者：">
            <el-input style="width: 240px;" v-model="createKejianInfo.author" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容：">
            <vue-html5-editor :content="createKejianInfo.content" @change="detection" :height="300" ref="edit"
              id="close"></vue-html5-editor>
        </el-form-item>
        <div style="display:flex;margin-bottom:10px;justify-content:space-between;margin-top:30px;">
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
          <div style="margin-right:150px">
            <el-form-item label="分类：">
                <el-select placeholder="选择" size="small" v-model="createKejianInfo.type" clearable>
                  <el-option label="校考必备" value="1"></el-option>
                  <el-option label="入门基础" value="2"></el-option>
                  <el-option label="免费基础" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学科：" style="margin-top:50px">
                <el-select placeholder="选择" size="small" v-model="createKejianInfo.id_subject" clearable>
                  <el-option label="素描" value="0"></el-option>
                  <el-option label="色彩" value="1"></el-option>
                  <el-option label="速写" value="2"></el-option>
                </el-select>
            </el-form-item>
          </div>
        </div>
        <el-form-item label="价格：">
            <el-input style="width: 240px;" v-model="createKejianInfo.price" clearable></el-input> /年
        </el-form-item>
        <el-form-item label-width="0px">
          <div style="margin:20px 0 0 120px">
            <el-button type="primary" size="small" style="width: 100px" @click="AddKejian">上传</el-button>
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
        createKejianInfo: {
          title: '',//文章标题	
          author: '',//作者名字
          url_cover: '',//封面图片的URL
          content: '',//学习人数
          intro: '',//富文本
          price: '',//价格
          type: '',//1-校考必备，2-入门基础，3-免费基础
          id_subject: ''//学科分类： 0-素描， 1-色彩， 2-速写
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
        this.createKejianInfo.content = e
        this.createKejianInfo.intro = e
      },
      onSubmit() {
        console.log('submit!');
      },
      removeSucc(e){
        this.createKejianInfo.url_cover = '';
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
        this.createKejianInfo.url_cover = `${this.domain}/${res.key}`;
      },
       /*
       * 通过id查询单个云教材每日推荐
       * */
      GetKejian(id,type){
        let that = this
        this.$store.dispatch('GetKejian', {kejianId:id,classification:type}).then(res => {
           res.recommend_time = new Date(res.recommend_time).Format('yyyy-MM-dd')
           that.logoList[0].url = res.url_cover
           that.createKejianInfo = Object.assign(that.createKejianInfo,res)
           console.log(res,'createKejianInfo')
        })
      },
      /*
       * 创建OR编辑单个推荐
       * */
      AddKejian(){
        let newObj = JSON.parse(JSON.stringify(this.createKejianInfo))
        let flag = false;
        let updateObj = JSON.parse(JSON.stringify(Object.assign(this.createKejianInfo,{id:this.$route.params.id})))

        if (!this.$route.params.id) {
          this.$store.dispatch('AddKejian', newObj).then(res => {
            this.$message({
              message: '添加课件成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/coursewareList');
            }, 2000)
          });
        } else {
          this.$store.dispatch('UpdateKejian', updateObj).then(res => {
            this.$message({
              message: '编辑课件成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/coursewareList');
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
          this.GetKejian(this.$route.params.id,this.$route.params.type)
      } else {
        this.editId = '';
        this.logoList = [
          {
            name: '1',
            url: ''
          }
        ],
        this.createKejianInfo = {
          title: '',//文章标题	
          author: '',//作者名字
          url_cover: '',//封面图片的URL
          content: '',//学习人数
          intro: '',//富文本
          price: '',//价格
          type: '',//1-校考必备，2-入门基础，3-免费基础
          id_subject: ''//学科分类： 0-素描， 1-色彩， 2-速写
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
