<template>
  <div id="guide">
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="招生范围" name="scope">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 10}"
            placeholder="请输入内容"
            v-model="allInfo.content_range">
          </el-input>
          <div style="text-align: center;margin-top: 20px;">
            <el-button type="primary" size="small" @click="setRangeForOneCollege">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="招生专业考试科目" name="subject">
          <vue-html5-editor :content="content3" :height="500" @change="subject" ref="subject"
                            id="subject"></vue-html5-editor>
          <div style="text-align: center;margin-top: 20px;">
            <el-button type="primary" size="small" @click="setProfessionSubjectForOneCollege">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="招生计划" name="plan">
          <span>地区：</span>
          <el-select v-model="selectId" placeholder="请选择" size="small" @change='changeProvince'>
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.province"
              :value="item.provinceID"
            >
            </el-option>
          </el-select>
          <vue-html5-editor :content="content2" :height="500" @change="plan"
                            style="margin-top: 40px;" id="plan"></vue-html5-editor>
          <div style="text-align: center;margin-top: 20px;">
            <el-button type="primary" size="small" @click="setProvinceScheduleForOneCollege">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="录取原则" name="principle">
          <vue-html5-editor :content="content" :height="500" @change="tenet" id="tenet"></vue-html5-editor>
          <div style="text-align: center;margin-top: 20px;">
            <el-button type="primary" size="small" @click="setPrincipleForOneCollege">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="小分限制" name="astrict">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 10}"
            placeholder="请输入内容"
            v-model="allInfo.content_smallscorelimit">
          </el-input>
          <div style="text-align: center;margin-top: 20px;">
            <el-button type="primary" size="small" @click="setSmallScoreLimitForOneCollege">提交</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import {setSessionStorage, getSessionStorage} from '@/utils/mixin'
  import {province}  from '@/utils/province'
  export default {
    data() {
      return {
        activeName: 'scope',
        textarea: '',
        textarea2: '',
        content: '',
        content2: '',
        content3: '',
        editId: '',
        selectId: '',
        schedule: '',
        editorOption: {
          // some quill options
        },
        formData: {
          content_range: '',//招生范围
        },
        value: '',
        allInfo: {},
        province: province
      };
    },
    methods: {
      handleClick(tab, event) {
//        console.log(tab, event);
      },
      getAllGuideContentForCollege(){
        this.$store.dispatch('getAllGuideContentForCollege', {
          id_college: Number(this.editId)
        }).then(res => {
          this.allInfo = res;
          if (res.content_profession_subject !== '') {
            document.getElementById('subject').lastChild.innerHTML = res.content_profession_subject
          }
          if (res.list_content_schedule.length !== 0) {
            this.selectId = res.list_content_schedule[0].id_province;
            document.getElementById('plan').lastChild.innerHTML = res.list_content_schedule[0].content_schedule;
            this.content2 = res.list_content_schedule[0].content_schedule;
            this.schedule = res.list_content_schedule[0].content_schedule;
          }
          if (res.content_principle !== '') {
            document.getElementById('tenet').lastChild.innerHTML = res.content_principle;
          }
        });
      },
//      招生专业考试科目富文本内容监控
      subject(e){
        this.allInfo.content_profession_subject = e;
      },
      plan(e){
        this.schedule = e;
      },
      tenet(e){
        this.allInfo.content_principle = e;
      },
      /*
       * 设置一个院校的招生范围
       * */
      setRangeForOneCollege(){
        this.$store.dispatch('SetRangeForOneCollege', {
          id_college: this.editId,
          content_range: this.allInfo.content_range
        }).then(async res => {
          await this.getAllGuideContentForCollege();
          this.$message({
            message: '设置成功',
            type: 'success'
          })
        })
      },
      /*
       *设置一个院校的招生专业考试科目
       * */
      setProfessionSubjectForOneCollege(){
        this.$store.dispatch('SetProfessionSubjectForOneCollege', {
          id_college: this.editId,
          content_profession_subject: this.allInfo.content_profession_subject
        }).then(async res => {
          await this.getAllGuideContentForCollege();
          this.$message({
            message: '设置成功',
            type: 'success'
          })
        })
      },
      /*
       *设置一个院校不同省份的招生计划
       * */
      setProvinceScheduleForOneCollege(){
        this.$store.dispatch('SetProvinceScheduleForOneCollege', {
          id_college: this.editId,
          id_province: this.selectId,
          content_schedule: this.schedule
        }).then(async res => {
          await this.getAllGuideContentForCollege();
          this.$message({
            message: '设置成功',
            type: 'success'
          })
        })
      },
      /*
       *设置一个院校的录取原则
       * */
      setPrincipleForOneCollege(){
        this.$store.dispatch('SetPrincipleForOneCollege', {
          id_college: this.editId,
          content_principle: this.allInfo.content_principle
        }).then(async res => {
          await this.getAllGuideContentForCollege();
          this.$message({
            message: '设置成功',
            type: 'success'
          })
        })
      },
      /*
       * 设置小分限制
       * */
      setSmallScoreLimitForOneCollege(){
        this.$store.dispatch('SetSmallScoreLimitForOneCollege', {
          id_college: this.editId,
          content_smallscorelimit: this.allInfo.content_smallscorelimit
        }).then(async res => {
          await this.getAllGuideContentForCollege();
          this.$message({
            message: '设置成功',
            type: 'success'
          })
        })
      },
      changeProvince(e){
        this.allInfo.list_content_schedule.forEach((item, index) => {
          if (item.id_province === e) {
            document.getElementById('plan').lastChild.innerHTML = item.content_schedule;
            this.content2 = item.content_schedule;
            this.schedule = item.content_schedule;
          } else {
            document.getElementById('plan').lastChild.innerHTML = '';
          }
        });
      },
      /*
       * 获得上传的token
       * */
      getUploadToken(){
        this.$store.dispatch('GetUploadToken').then(res => {
          setSessionStorage('qiniuToken',res.token)
          setSessionStorage('bucketUrl',res.bucketUrl)
        });
      },
    },
    mounted(){
        this.getUploadToken()
      if (this.$route.path.indexOf('/editSchool') !== -1) {
        this.editId = Number(getSessionStorage('editId'));
//        this.editId = 6;
        if (this.editId !== '') {
          this.getAllGuideContentForCollege();
        } else {
          this.$message({
            message: "系统出现错误,请刷新重试",
            type: 'error'
          });
          this.$router.push('/home/signUpGuide')
        }
      }
    }
  };
</script>
<style scoped lang="scss">
  #guide {
    .submit-btn {
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
