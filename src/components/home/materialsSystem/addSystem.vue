<template>
  <div id="school-info">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/systemList' }">教材体系管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.params.materialsSystemID">编辑教材体系</el-breadcrumb-item>
      <el-breadcrumb-item v-else>上传教材体系</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content"></div>
      <el-form ref="form" :model="form" label-width="100px" size="small">
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
            v-if="$route.params.materialsSystemID"
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
        <el-form-item label="教材体系名：">
            <el-input style="width: 240px;" v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="介绍：">
            <el-input type="textarea" rows="6" style="width: 240px;" v-model="form.intro" clearable></el-input>
        </el-form-item>
        <el-form-item label="分类">
            <el-select placeholder="选择" size="small" v-model="form.type_sort" clearable>
                <el-option label="权威出版社" value="0"></el-option>
                <el-option label="名家出品" value="1"></el-option>
                <!-- <el-option label="入门基础" value="2"></el-option>
                <el-option label="免费基础" value="3"></el-option> -->
            </el-select>
            <!-- <el-input v-model="formInline.user" placeholder="审批人"></el-input> -->
        </el-form-item>
        <el-form-item label="出版社">
            <el-select placeholder="选择" size="small" v-model="form.id_publisher" clearable>
                <el-option :label="item.title" :value="item.id" v-for="item in publisherList" :key="item.id"></el-option>
                <!-- <el-option label="色彩" value="1"></el-option>
                <el-option label="速写" value="2"></el-option> -->
            </el-select>
        </el-form-item>
        <el-form-item label="单套价格：">
            <el-input style="width: 240px;" v-model="form.price" clearable></el-input> /年
        </el-form-item>
        <el-form-item label="团购折扣：">
            <el-input style="width: 240px;" v-model="form.discount" clearable></el-input> %
        </el-form-item>
        <el-form-item label="最少团购数量：">
            <el-input style="width: 240px;" v-model="form.numof_discount" clearable></el-input> 套
        </el-form-item>
        <el-form-item label-width="0px">
          <div style="margin:20px 0 0 120px">
            <el-button type="primary" size="small" style="width: 100px" @click="AddCloudMaterialsSystem">上传</el-button>
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
        publisherList:[],          
        qiniuToken: {
          token: ''
        },
        domain: '',
        content: '',
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        form: {
          url_cover: '',//封面
          title: '',//名称	
          type_sort: '',//0-权威出版社， 1-名家出品
          id_publisher: '',//出版社ID
          price: '',//价格
          intro: '',//简介
          numof_discount: '',//最低团购数量
          discount: ''//团购折扣
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
        this.form.content_article = e
      },
      onSubmit() {
        console.log('submit!');
      },
      removeSucc(e){
        this.form.url_cover = '';
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
        this.form.url_cover = `${this.domain}/${res.key}`;
      },
       /*
       * 通过id查询单个云教材每日推荐
       * */
      GetCloudMaterialsSystemBasic(materialsSystemID){
        let that = this
        this.$store.dispatch('GetCloudMaterialsSystemBasic', {materialsSystemID:materialsSystemID}).then(res => {
           that.logoList[0].url = res.url_cover
           that.form = Object.assign(that.form,res)
           console.log(res,'form')
        })
      },
      /* 出版社列表 */
      GetAllPublisher(){
        this.$store.dispatch('GetAllPublisher', {}).then(res => {
          this.publisherList = []
          res.forEach((item)=> {
            item.recommend_time_show = new Date(item.recommend_time).Format('yyyy-MM-dd')
            this.publisherList.push(item)
          })
          this.total = res.total
          console.log(this.publisherList,'this.publisherList')
        })
      },
      /*
       * 创建OR编辑单个推荐
       * */
      AddCloudMaterialsSystem(){
        let newObj = JSON.parse(JSON.stringify(this.form))
        let flag = false;
        let updateObj = JSON.parse(JSON.stringify(Object.assign(this.form,{materialsSystemID:this.$route.params.materialsSystemID})))

        if (!this.$route.params.materialsSystemID) {
          this.$store.dispatch('AddCloudMaterialsSystem', newObj).then(res => {
            this.$message({
              message: '添加教材体系成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/systemList');
            }, 2000)
          });
        } else {
          this.$store.dispatch('UpdateRecommendationDaily', updateObj).then(res => {
            this.$message({
              message: '编辑教材体系成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/systemList');
            }, 2000)
          });
        }
      }
    },
    mounted(){
      this.getUploadToken();
      this.GetAllPublisher()
      /*
       * 进这个页面，如果是编辑,走拉去信息流程
       * 如果是新增，在else 还原数据
       * */
    },
    activated (){
      console.log(this.$route.params.materialsSystemID,'params')
      if (this.$route.params.materialsSystemID) {
          this.GetCloudMaterialsSystemBasic(this.$route.params.materialsSystemID)
      } else {
        this.editId = '';
        this.logoList = [
          {
            name: '1',
            url: ''
          }
        ],
        this.form = {
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
