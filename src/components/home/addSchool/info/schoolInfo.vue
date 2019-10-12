<template>
  <div id="school-info">
    <el-form ref="createSchoolInfo" :model="createSchoolInfo" label-width="100px" size="small">
      <el-form-item label="LOGO:" class="add-img">
        <el-upload
          action="https://up-z2.qiniup.com"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :data="qiniuToken"
          :on-success="upLoadSucc"
          :on-remove="removeSucc"
          :file-list="logoList"
          :limit="1"
          v-if="editId"
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
      <el-form-item label="高校名称：">
        <el-input v-model="createSchoolInfo.title" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label="地区：">
        <el-select v-model="createSchoolInfo.provinceID" placeholder="" style="width: 240px;">
          <el-option
            v-for="item in province"
            :key="item.id"
            :label="item.province"
            :value="item.provinceID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="院校性质：">
        <el-checkbox-group v-model="createSchoolInfo.list_level">
          <el-checkbox :label="item.id" v-for="item in schoolType" :name="item.title" :key="item.id">{{item.title}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="专业：">
        <el-checkbox-group v-model="createSchoolInfo.list_profession">
          <el-checkbox :label="item.id" v-for="item in profession" :name="item.title" :key="item.id">{{item.title}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="考试科目：">
        <el-checkbox-group v-model="createSchoolInfo.list_subject_examguide[0].isChecked">
          <el-checkbox :label="createSchoolInfo.list_subject_examguide[0].id_subject_examguide"
                       name="type">
            {{Number(subject[0].type_subject) ? subject[0].title + '(统考)' : subject[0].title + '(校考)'}}
          </el-checkbox>
        </el-checkbox-group>
        <div class="tags" v-if="createSchoolInfo.list_subject_examguide[0].isChecked">
          <div class="tag" v-for="item in province" :key="item.id" :data-id="item.provinceID"
               @click="selectProvince($event,0,item.provinceID)" ref="subject1">
            {{item.province}}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="createSchoolInfo.list_subject_examguide[1].isChecked">
          <el-checkbox :label="Number(subject[1].type_subject)?subject[1].title+'(统考)':subject[1].title+'(校考)'"
                       name="type"></el-checkbox>
        </el-checkbox-group>
        <div class="tags" v-if="createSchoolInfo.list_subject_examguide[1].isChecked">
          <div class="tag" v-for="item in province" :key="item.id" :data-id="item.provinceID"
               @click="selectProvince($event,1,item.provinceID)" ref="subject2">
            {{item.province}}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="createSchoolInfo.list_subject_examguide[2].isChecked">
          <el-checkbox :label="Number(subject[2].type_subject)?subject[2].title+'(统考)':subject[2].title+'(校考)'"
                       name="type"></el-checkbox>
        </el-checkbox-group>
        <div class="tags" v-if="createSchoolInfo.list_subject_examguide[2].isChecked">
          <div class="tag" v-for="item in province" :key="item.id" :data-id="item.provinceID"
               @click="selectProvince($event,2,item.provinceID)" ref="subject3">
            {{item.province}}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="最低录取分数线 / 招生计划：" label-width="200px">
        <el-select v-model="nowIndex" placeholder="" @change="changeProvince"
                   style="width: 240px;">
          <el-option
            v-for="item in province"
            :key="item.id"
            :label="item.province"
            :value="item.provinceID"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最低录取分数线：" label-width="132px">
        <el-input v-model="createSchoolInfo.list_score_lowest[flagIndex].score_lowest" style="width: 60px;"
                  :disabled="disabledInput" size="mini"></el-input>
        <span style="margin-left: 30px;">招生计划：</span>
        <el-input v-model="createSchoolInfo.list_score_lowest[flagIndex].numof_schedule" style="width: 60px;"
                  :disabled="disabledInput" size="mini"></el-input>
        <el-button type="primary" v-show="!disabledInput" style="margin-left: 20px;" size="mini"
                   @click="disabledInput = true">确认
        </el-button>
        <el-button type="text" @click="disabledInput=false" v-show="disabledInput" style="margin-left: 30px;">编辑
        </el-button>
      </el-form-item>
      <el-form-item label-width="0px">
        <div class="submit-btn" style="text-align: center;">
          <el-button type="primary" size="small" style="width: 100px" @click="createSchool">保存</el-button>
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
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        disabledInput: false,
        province: province,
        schoolType: schoolType,
        profession: profession,
        subject: subject,
        flagIndex: 0,
        nowIndex: 110000,
        createSchoolInfo: {
          title: '',
          provinceID: 110000,
          url_logo: '',
          list_level: [],//院校级别
          list_profession: [],//院校专业ID的数组
          list_subject_examguide: [//院校考试科目的数组
            {
              id_subject_examguide: 1,//科目列表的Id
              type_subject_examguide: 0,//0-校考，1-统考
              list_provinceID: [],//这个考试科目只对这些地区可见
              isChecked: false,
            },
            {
              id_subject_examguide: 2,//科目列表的Id
              type_subject_examguide: 1,//0-校考，1-统考
              list_provinceID: [],//这个考试科目只对这些地区可见
              isChecked: false,
            },
            {
              id_subject_examguide: 3,//科目列表的Id
              type_subject_examguide: 0,//0-校考，1-统考
              list_provinceID: [],//这个考试科目只对这些地区可见
              isChecked: false,
            },
          ],
          list_score_lowest: [{
            id_province: 110000,
            score_lowest: '',
            numof_schedule: ''
          }]
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
      onSubmit() {
        console.log('submit!');
      },
      /*
       * 选择某个省份,并将其ID添加到data数据里对应的数组位置
       * 接受三个参数，event，当前点击元素绑定参数在数组中的下标位置，当前tabs的id
       *
       * */
      selectProvince(e, index, id){
        let havClass = this.toggleClass(e, 'active');
        let list_provinceID = this.createSchoolInfo.list_subject_examguide[index].list_provinceID;
        if (havClass) {
          list_provinceID.splice(list_provinceID.indexOf(id), 1);
        } else {
          list_provinceID.push(id);
        }
        this.createSchoolInfo.list_subject_examguide[index].list_provinceID = list_provinceID;
      },
      removeSucc(e){
        this.createSchoolInfo.url_logo = '';
      },
      /*
       * 选择分数省份时的select事件
       * */
      changeProvince(e){
        this.disabledInput = false;
        let flag = true;
        this.createSchoolInfo.list_score_lowest.forEach((item, index) => {
          if (e === item.id_province) {
            this.flagIndex = index;
            flag = false;
          }
        });
        if (flag) {
          this.createSchoolInfo.list_score_lowest.push({
            id_province: e,
            score_lowest: '',
            numof_schedule: ''
          })
          this.flagIndex = this.createSchoolInfo.list_score_lowest.length - 1;
        }
      },
      /*
       * 切换某个class
       * 接受 event和class名两个参数
       * 如果当前class被找到且成功被移除 返回 true，否则返回false
       * */
      toggleClass(e, className){
        let flag = false;
        Object.keys(e.path[0].classList).forEach(item => {
          if (e.path[0].classList[item] === className) {
            flag = true;
          }
        });
        if (flag) {
          e.path[0].classList.remove(className);
          return true;
        } else {
          e.path[0].classList.add(className);
          return false;
        }
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
        this.createSchoolInfo.url_logo = `${this.domain}/${res.key}`;
      },
      /*
       * 创建OR编辑一所学校
       * */
      createSchool(){
        let newObj = JSON.parse(JSON.stringify(this.createSchoolInfo));
        let flag = false;
        newObj.list_subject_examguide.forEach(item => {
          if (item.isChecked && item.list_provinceID.length === 0) {
            flag = true;
          }
        });
        /* 如果条件成立，说明有未勾选省份的科目,抛错 */
        if (flag) {
          this.$message({
            message: '已勾选考试科目,但可见省份为空！',
            type: 'error'
          });
          return false;
        }
        if (this.createSchoolInfo.url_logo === '') {
          this.$message({
            message: '学校LOGO不能为空',
            type: 'error'
          });
          return false;
        }
        /* 剔除未勾选的考试科目 */
        for (let i = newObj.list_subject_examguide.length; i >= 0; i--) {
          if (newObj.list_subject_examguide[i]) {
            if (!newObj.list_subject_examguide[i].isChecked) {
              newObj.list_subject_examguide.splice(i, 1);
            } else {
              delete newObj.list_subject_examguide[i].isChecked
            }
          }
        }
        /*
         * 剔除未填写分数的身份
         * */
        for (let i = newObj.list_score_lowest.length; i >= 0; i--) {
          if(newObj.list_score_lowest[i]){
            if (newObj.list_score_lowest[i].score_lowest === '' || newObj.list_score_lowest[i].numof_schedule === '') {
              newObj.list_score_lowest.splice(i, 1);
            }else {
              newObj.list_score_lowest[i].score_lowest = Number(newObj.list_score_lowest[i].score_lowest);
              newObj.list_score_lowest[i].numof_schedule = Number(newObj.list_score_lowest[i].numof_schedule);
            }
          }
        }
        newObj.list_score_lowest[0].score_lowest = Number(newObj.list_score_lowest[0].score_lowest);
        newObj.list_score_lowest[0].numof_schedule = Number(newObj.list_score_lowest[0].numof_schedule);
        if (!this.editId) {
          this.$store.dispatch('AddOneCollege', newObj).then(res => {
            this.$message({
              message: '添加院校成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/signUpGuide');
            }, 2000)
          });
        } else {
          newObj.id_college = this.editId;
          this.$store.dispatch('UpdateOneCollege', newObj);
          this.$message({
            message: '修改院校成功！',
            type: 'success'
          });
        }
      },
      /*
       * 查询一个院校
       * */
      getOneCollege(){
        this.$store.dispatch('GetOneCollege', {id_college: this.editId}).then(res => {
          /*
           * 保留后台传过来的省份数据
           * */
          let all = res.list_subject_examguide;
          this.logoList[0].url = res.url_logo;
          if(res.list_score_lowest.length!==0){
            this.nowIndex = res.list_score_lowest[0].id_province;
          }
          /*
           * 为省份科目数据重新赋默认值，因后台传过来的数据个数不确定性，页面依赖三个对象
           * */
          res.list_subject_examguide = [//院校考试科目的数组
            {
              id_subject_examguide: 1,//科目列表的Id
              type_subject_examguide: 0,//0-校考，1-统考
              list_provinceID: [],//这个考试科目只对这些地区可见
              isChecked: false,
            },
            {
              id_subject_examguide: 2,//科目列表的Id
              type_subject_examguide: 1,//0-校考，1-统考
              list_provinceID: [],//这个考试科目只对这些地区可见
              isChecked: false,
            },
            {
              id_subject_examguide: 3,//科目列表的Id
              type_subject_examguide: 0,//0-校考，1-统考
              list_provinceID: [],//这个考试科目只对这些地区可见
              isChecked: false,
            }
          ];
          /*
           * 遍历后台传过来的省份数据，为重新赋值的默认数据添加对应的数据
           * */
          all.forEach((item, index) => {
            if (item.id_subject_examguide === 1) {
              res.list_subject_examguide[0].list_provinceID = all[index].list_provinceID;
              res.list_subject_examguide[0].isChecked = true;
            } else if (item.id_subject_examguide === 2) {
              res.list_subject_examguide[1].list_provinceID = all[index].list_provinceID;
              res.list_subject_examguide[1].isChecked = true;
            } else {
              res.list_subject_examguide[2].list_provinceID = all[index].list_provinceID;
              res.list_subject_examguide[2].isChecked = true;
            }
          });
          this.createSchoolInfo = res;
          /*
           * 疯狂遍历，为选中的元素添加class
           * */
          this.$nextTick(() => {
            let subject1 = this.$refs.subject1;//第一个考试科目下的所有tab
            let subject2 = this.$refs.subject2;//第2个考试科目下的所有tab
            let subject3 = this.$refs.subject3;//第3个考试科目下的所有tab
            if (subject1) {
              subject1.forEach((item, index) => {
                this.createSchoolInfo.list_subject_examguide[0].list_provinceID.forEach(value => {
                  if (item.dataset.id == value) {
                    subject1[index].classList.add('active');
                  }
                })
              })
            }
            if (subject2) {
              subject2.forEach((item, index) => {
                this.createSchoolInfo.list_subject_examguide[1].list_provinceID.forEach(value => {
                  if (item.dataset.id == value) {
                    subject2[index].classList.add('active');
                  }
                })
              })
            }
            if (subject3) {
              subject3.forEach((item, index) => {
                this.createSchoolInfo.list_subject_examguide[2].list_provinceID.forEach(value => {
                  if (item.dataset.id == value) {
                    subject3[index].classList.add('active');
                  }
                })
              })
            }
          })
        });
      },
    },
    mounted(){
      this.getUploadToken();
      /*
       * 进这个页面，如果是编辑,走拉去信息流程
       * 如果是新增，在else 还原数据
       * */
      if (this.$route.path.indexOf('/editSchool') !== -1) {
        if (this.$route.query.id) {
          this.editId = this.$route.query.id;
          this.hasEdit = true;
          setSessionStorage('editId', this.$route.query.id);
          this.getOneCollege();
        } else {
          this.editId = getSessionStorage('editId');
          if (this.editId !== '') {
            this.hasEdit = true;
            this.getOneCollege();
          } else {
            this.$message({
              message: "系统出现错误,请刷新重试",
              type: 'error'
            });
            this.$router.push('/home/signUpGuide')
          }
        }
      } else {
        this.editId = '';
        this.createSchoolInfo = {
          title: '',
          provinceID: 110000,
          url_logo: '',
          list_level: [],//院校级别
          list_profession: [],//院校专业ID的数组
          list_subject_examguide: [//院校考试科目的数组
            {
              id_subject_examguide: 1,//科目列表的Id
              type_subject_examguide: 0,//0-校考，1-统考
              list_provinceID: [],//这个考试科目只对这些地区可见
              isChecked: false,
            },
            {
              id_subject_examguide: 2,//科目列表的Id
              type_subject_examguide: 1,//0-校考，1-统考
              list_provinceID: [],//这个考试科目只对这些地区可见
              isChecked: false,
            },
            {
              id_subject_examguide: 3,//科目列表的Id
              type_subject_examguide: 0,//0-校考，1-统考
              list_provinceID: [],//这个考试科目只对这些地区可见
              isChecked: false,
            }
          ],
          list_score_lowest: [{
            id_province: 110000,
            score_lowest: '',
            numof_schedule: ''
          }]
        }
      }
    },
    activated (){

    }
  }
</script>
<style scoped lang="scss">
  #school-info {
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
