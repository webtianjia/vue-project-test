<template>
  <div id="school-intro">
    <el-tabs v-model="activeName">
      <el-tab-pane label="招生简章" name="1">
        <div class="title">
          <el-button type="primary" size="small" @click="add(1)">添加招生简章</el-button>
        </div>
        <div class="box">
          <div class="leaflet-list" v-for="(item,index) in bookletListForCollege" :key="index">
            <div class="list-left">
              <span>{{index + 1}}.</span>
              <img src="@/assets/images/default.png" alt="" v-if="item.url_cover.length<=10">
              <img :src="item.url_cover" alt="" v-else>
            </div>
            <div class="list-center">
              <div>
                <span>标题：</span>
                <span>{{item.title_booklet}}</span>
              </div>
              <div class="content">
                <span>{{item.intro}}</span>
              </div>
            </div>
            <div class="list-right">
              <el-button type="text" @click="edit(1,item.id_booklet)">编辑内容</el-button>
              <el-button type="text" @click="deleteWho(item.id_booklet,'1')">删除</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历届考题" name="2">
        <div class="title">
          <el-button type="primary" size="small" @click="add(2)">添加历届考题</el-button>
        </div>
        <div class="box">
          <div class="leaflet-list" v-for="(item,index) in topicListForCollege" :key="index">
            <div class="list-left">
              <span>{{index + 1}}.</span>
              <img src="@/assets/images/default.png" alt="" v-if="item.url_cover.length<=10">
              <img :src="item.url_cover" alt="" v-else>
            </div>
            <div class="list-center">
              <div>
                <span>标题：</span>
                <span>{{item.title}}</span>
              </div>
              <div class="content">
                <span>{{item.intro}}</span>
              </div>
            </div>
            <div class="list-right">
              <el-button type="text" @click="edit(2,item.id)">编辑内容</el-button>
              <el-button type="text" @click="deleteWho(item.id,'2')">删除</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="高分卷" name="3">
        <div class="title">
          <el-button type="primary" size="small" @click="add(3)">添加高分卷</el-button>
        </div>
        <div class="box">
          <div class="leaflet-list" v-for="(item,index) in highScoreListForCollege" :key="index">
            <div class="list-left">
              <span>{{index + 1}}.</span>
              <img src="@/assets/images/default.png" alt="" v-if="item.url_cover.length<=10">
              <img :src="item.url_cover" alt="" v-else>
            </div>
            <div class="list-center">
              <div>
                <span>标题：</span>
                <span>{{item.title}}</span>
              </div>
              <div class="content">
                <span>{{item.intro}}</span>
              </div>
            </div>
            <div class="list-right">
              <el-button type="text" @click="edit(3,item.id)">编辑内容</el-button>
              <el-button type="text" @click="deleteWho(item.id,'3')">删除</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :center="true" @close="closeModal('upLoad1')"
               :close-on-click-modal="false">
      <el-form :model="addForm" size="small" ref="numberValidateFormAdd">
        <el-form-item label="标题：" label-width="100px">
          <el-input v-model="addForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题详情：" label-width="100px">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="addForm.intro">
          </el-input>
        </el-form-item>
        <el-form-item label="作者：" label-width="100px">
          <el-input v-model="addForm.name_author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面：" label-width="100px">
          <el-upload
            action="https://up-z2.qiniup.com"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :data="qiniuToken"
            :on-success="upLoadSucc"
            ref="upLoad1"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容：" label-width="100px">
          <vue-html5-editor :content="content" @change="detection" :height="300" ref="edit"
                            id="close"></vue-html5-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="decideWho" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="dialogFormEdit" :center="true" @close="closeModal('upLoad2')"
               :close-on-click-modal="false">
      <el-form :model="editForm" size="small" ref="numberValidateFormEdit">
        <el-form-item label="标题：" label-width="100px">
          <el-input v-model="editForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题详情：" label-width="100px">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="editForm.intro">
          </el-input>
        </el-form-item>
        <el-form-item label="作者：" label-width="100px">
          <el-input v-model="editForm.name_author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面：" label-width="100px">
          <el-upload
            action="https://up-z2.qiniup.com"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :data="qiniuToken"
            :on-success="upLoadSucc"
            ref="upLoad2"
            :file-list="urlList"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容：" label-width="100px">
          <vue-html5-editor :content="content" @change="detection" :height="300" ref="edit"
                            id="close"></vue-html5-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false" size="small">取 消</el-button>
        <el-button type="primary" @click="decideEditWho" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {setSessionStorage, getSessionStorage} from '@/utils/mixin'
  export default{
    data(){
      return {
        dialogFormVisible: false,
        dialogFormEdit: false,
        textarea: '',
        content: '',
        activeName: '1',
        inputTetxt: '',
        url: '',
        title: "添加",
        editId: '',//编辑的学校ID
        bookletListForCollege: [],//招生简章
        topicListForCollege: [],//历届考题
        highScoreListForCollege: [],//高分局
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        addForm: {
          id_college: '',
          title: '',
          name_author: '',
          intro: '',
          content: '',
          url_cover: '',
          id_title: 0
        },
        editForm: {
          id_college: '',
          title: '',
          name_author: '',
          intro: '',
          content: '',
          url_cover: '',
          id_title: ''
        },
        qiniuToken: {
          token: ''
        },
        domain: '',
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        urlList: [],
      }
    },
    methods: {
      add(index){
        this.title = index === 1 ? '添加招生简章' : index === 2 ? '添加历届考题' : '添加高分卷';
        this.dialogFormVisible = true;
      },
      async edit(index, id){
        this.title = index === 1 ? '编辑招生简章' : index === 2 ? '编辑历届考题' : '编辑高分卷';
        await this.getOneArticleContentOfCollegeInfo(index - 1, id);
        this.dialogFormEdit = true;
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
        this.url = `${this.domain}/${res.key}`;
      },
      /*
       * 获取一个学校的招生简章
       * */
      getBookletListForCollege(){
        this.$store.dispatch('GetBookletListForCollege', {id_college: this.editId}).then(res => {
          this.bookletListForCollege = res.list_booklet;
        });
      },
      /*
       *查询一个院校的“历史考题”列表
       * */
      getTopicListForCollege(){
        this.$store.dispatch('GetTopicListForCollege', {id_college: this.editId}).then(res => {
          this.topicListForCollege = res.list_topicList;
        })
      },
      /*
       *查询一个院校的“高分卷”列表
       * */
      getHighScoreListForCollege(){
        this.$store.dispatch('GetHighScoreListForCollege', {id_college: this.editId}).then(res => {
          this.highScoreListForCollege = res.list_highscore;
        })
      },
      /*
       * 富文本内容检测
       * */
      detection(e){
        this.inputTetxt = e;
      },
      /*
       * 添加一篇“招生简章”的文章
       * */
      addBookletForCollege(){
        this.addForm.id_college = Number(this.editId);
        this.addForm.content = this.inputTetxt;
        this.addForm.url_cover = this.url;
        if(this.addForm.id_title === ''){
          this.addForm.id_title = 0;
        }
        this.$store.dispatch('AddBookletForCollege', this.addForm).then(async res => {
          await this.getBookletListForCollege();
          this.dialogFormVisible = false;
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
        })
      },
      /*
       * 添加一篇“历史考题”的文章
       * */
      addTopicForCollege(){
        this.addForm.id_college = Number(this.editId);
        this.addForm.content = this.inputTetxt;
        this.addForm.url_cover = this.url;
        if(this.addForm.id_title === ''){
          this.addForm.id_title = 0;
        }
        this.$store.dispatch('AddTopicForCollege', this.addForm).then(async res => {
          await this.getTopicListForCollege();
          this.dialogFormVisible = false;
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
        })
      },
      /*
       * 添加一篇“高分卷”的文章
       * */
      addHighScoreForCollege(){
        this.addForm.id_college = Number(this.editId);
        this.addForm.content = this.inputTetxt;
        this.addForm.url_cover = this.url;
        if(this.addForm.id_title === ''){
          this.addForm.id_title = 0;
        }
        this.$store.dispatch('AddHighScoreForCollege', this.addForm).then(async res => {
          await this.getHighScoreListForCollege();
          this.dialogFormVisible = false;
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
        })
      },

      /*
       *编辑一篇“招生简章”的文章
       * */
      editBookletForCollege(){
        this.editForm.id_college = Number(this.editId);
        this.editForm.content = this.inputTetxt;
        this.editForm.url_cover = this.url;
        this.$store.dispatch('AddBookletForCollege', this.editForm).then(async res => {
          await this.getBookletListForCollege();
          this.dialogFormEdit = false;
          this.$message({
            message: '编辑成功！',
            type: 'success'
          })
        })
      },
      /*
       * 编辑一篇“历史考题”的文章
       * */
      editTopicForCollege(){
        this.editForm.id_college = Number(this.editId);
        this.editForm.content = this.inputTetxt;
        this.editForm.url_cover = this.url;
        this.$store.dispatch('AddTopicForCollege', this.editForm).then(async res => {
          await this.getTopicListForCollege();
          this.dialogFormEdit = false;
          this.$message({
            message: '编辑成功！',
            type: 'success'
          })
        })
      },
      /*
       * 编辑一篇“高分卷”的文章
       * */
      editHighScoreForCollege(){
        this.editForm.id_college = Number(this.editId);
        this.editForm.content = this.inputTetxt;
        this.editForm.url_cover = this.url;
        this.$store.dispatch('AddHighScoreForCollege', this.editForm).then(async res => {
          await this.getHighScoreListForCollege();
          this.dialogFormEdit = false;
          this.$message({
            message: '编辑成功！',
            type: 'success'
          })
        })
      },
      /*
       * 删除一篇“招生简章”
       * */
      delOneBooklet(id){
        this.$confirm('此操作将永久删除该招生简章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          this.$store.dispatch('DelOneBooklet', {id_booklet: id}).then(async res => {
            await this.getBookletListForCollege();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
        }).catch(err => {

        });

      },
      /*
       * 删除一篇“历史考题”
       * */
      delOneTopic(id){
        this.$confirm('此操作将永久删除该历史考题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          this.$store.dispatch('DelOneTopic', {id_topic: id}).then(async res => {
            await this.getTopicListForCollege();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
        }).catch(err => {

        });

      },
      /*
       * 删除一篇“高分卷”
       * */
      delOneHighScore(id){
        this.$confirm('此操作将永久删除该高分卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          this.$store.dispatch('DelOneHighScore', {id_highscore: id}).then(async res => {
            await this.getHighScoreListForCollege();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
        }).catch(err => {

        });

      },
      /*
       * 关闭时清空内容
       * */
      closeModal(ref){
        this.url = '';
        this.$refs[ref].clearFiles();
        this.inputTetxt = '';
        this.content = '';
        document.getElementById('close').children[1].innerText = '';
        this.urlList = [];
        this.$refs.edit.$children = [];
        for (let key in this.addForm) {
          this.addForm[key] = ''
        }
        for (let key in this.editForm) {
          this.editForm[key] = ''
        }
      },
      /*
       * 决定当前是调用 哪个添加方法的方法
       * */
      decideWho(){
        if (this.activeName === '1') {
          this.addBookletForCollege();
        } else if (this.activeName === '2') {
          this.addTopicForCollege();
        } else {
          this.addHighScoreForCollege();
        }
      },
      /*
       * 决定当前是调用 哪个编辑方法的方法
       * */
      decideEditWho(){
        if (this.activeName === '1') {
          this.editBookletForCollege();
        } else if (this.activeName === '2') {
          this.editTopicForCollege();
        } else {
          this.editHighScoreForCollege();
        }
      },
      /*
       * 决定当前删除的是哪个品类
       * */
      deleteWho(id, type){
          console.log(id)
        if (type === '1') {
          this.delOneBooklet(id)
        } else if (type === '2') {
          this.delOneTopic(id)
        } else {
          this.delOneHighScore(id);
        }
      },
      /*
       * 查询一篇文章
       * */
      getOneArticleContentOfCollegeInfo(type, id){
//          学校ID、查询的类、查询的文章ID
        let schoolId = Number(this.editId);
        this.$store.dispatch('GetOneArticleContentOfCollegeInfo', {
          id_college: schoolId,
          type_collegeinfo: type,
          id: id
        }).then(res => {
          this.editForm.id_title = res.id;
          this.editForm.title = res.title;
          this.editForm.name_author = res.name_author;
          this.editForm.intro = res.intro;
          this.inputTetxt = res.content;
          this.urlList.push({
            name: '1',
            url: res.url_cover
          });
          this.url = res.url_cover;
          this.content = res.content;
          document.getElementById('close').lastChild.innerHTML = res.content;
        });
      }
    },
    mounted(){
      if (this.$route.path.indexOf('/editSchool') !== -1) {
        this.editId = Number(getSessionStorage('editId'));
        this.getUploadToken();
        if (this.editId !== '') {
          this.getBookletListForCollege();
          this.getTopicListForCollege();
          this.getHighScoreListForCollege();
        } else {
          this.$message({
            message: "系统出现错误,请刷新重试",
            type: 'error'
          });
          this.$router.push('/home/signUpGuide')
        }
      }
    },
    activated(){

    }
  }
</script>
<style scoped lang="scss">
  #school-intro {
    .title {
      text-align: right;
    }
    .box {
      margin-top: 20px;
      .leaflet-list:nth-child(1) {
        border-top: 1px solid #e4e7ed;
      }
      .leaflet-list::after {
        content: '';
        display: table;
        clear: both;
      }
      .leaflet-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e4e7ed;
        padding: 10px 0;
        font-size: 14px;
        .list-left {
          /*flex-grow: 1;*/
          float: left;
          width: 30%;
          img {
            width: 50px;
            vertical-align: middle;
            margin-left: 40px;
          }
        }
        .list-center {
          /*flex-grow: 1;*/
          float: left;
          width: 50%;
          .content {
            max-width: 600px;
            font-size: 14px;
          }
        }
        .list-right {
          float: right;
          width: 18%;
          text-align: center;
        }
      }
    }
  }
</style>
