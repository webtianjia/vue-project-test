<template>
  <div id="set-exam-site-and-specialty">
    <breadcrumb :router-list='breadcrumb'></breadcrumb>
    <div>
      <div class="school-name">
        <span>学校名称：</span>
        <span>{{schoolName}}</span>
      </div>
      <div class="site">
        <h5>考试地点</h5>
        <div>
          <el-button type="text" @click="addSite">添加地点</el-button>
          <ul class="site-list">
            <li class="item" v-for="(item,index) in siteList" :key="index">
              <span>{{item.title_place}}</span>
              <el-button type="text" style="margin-left: 50px;" @click="delPlaceForCollege(item.id_place)">删除
              </el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="specialty">
        <h5>考试专业</h5>
        <div>
          <ul class="specialty-list">
            <li class="item" v-for="(item,index) in profession" :key="index">
              <span>{{item.title_profession}}</span>
              <el-button type="text" style="margin-left: 50px;" @click="showProfessionTime(item)">编辑</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div style="text-align: center">
        <el-button type="primary" size="small">保 存</el-button>
      </div>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" :center="true">
      <el-form :model="form" size="small">
        <el-form-item label="专业名称：" :label-width="formLabelWidth">
          <span>{{professionName}}</span>
        </el-form-item>
        <el-form-item label="报名时间：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="applyTime"
            :default-value="applyTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            unlink-panels
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="确认时间：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="affirmTime"
            :default-value="affirmTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            unlink-panels
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="考试时间：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.time_exam"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="updateTimeForCollegeProfession" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Breadcrumb  from '@/components/breadcrumb/breadcrumb'
  import {setSessionStorage, getSessionStorage} from '@/utils/mixin'
  export default{
    components: {
      Breadcrumb
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
            name: '设置考试地点、考试专业',
            isDefault: true
          },
        ],
        dialogFormVisible: false,
        form: {
          id_college: '',
          id_profession: '',//专业ID
          time_signup_start: '',//报名开始时间,
          time_signup_end: '',//报名结束时间
          time_confirm_start: '',//确认开始时间
          time_confirm_end: '',//确认结束时间
          time_exam: '',//考试时间
        },
        formLabelWidth: '120px',
        value6: '',
        editId: '',
        siteList: [],//所有考试地点
        schoolName: '',
        profession: [],
        applyTime: [],//报名时间
        affirmTime: [],//确认时间
        professionName: ''//专业名称
      }
    },
    methods: {
      addSite(){
        this.$prompt('考试地点', '添加考试地点', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(({value}) => {
          this.addPlaceForCollege(value);
        }).catch(() => {

        });
      },
      /*
       * 考试地点
       * */
      getPlaceListForCollege(){
        this.$store.dispatch('GetPlaceListForCollege', {
          id_college: Number(this.editId)
        }).then(res => {
          this.siteList = res.list_place
        })
      },
      /*
       * 增加考试地点
       * */
      addPlaceForCollege(name){
        this.$store.dispatch('AddPlaceForCollege', {
          id_college: Number(this.editId),
          title_place: name
        }).then(async res => {
          await this.getPlaceListForCollege();
          this.$message({
            message: '增加成功！',
            type: 'success'
          })
        })
      },
      /*
       * 删除考试地点
       * */
      delPlaceForCollege(id){
        this.$confirm('此操作将永久删除该考试地点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          this.$store.dispatch('DelPlaceForCollege', {id_college: this.editId, id_place: id}).then(async (res) => {
            await this.getPlaceListForCollege();
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
          });
        }).catch(err => {

        });
      },
      /*
       * 查询一个院校每个专业的报名时间、确认时间和考试时间
       * */
      getProfessionTimeListForCollege(){
        this.$store.dispatch('GetProfessionTimeListForCollege', {
          id_college: this.editId
        }).then(res => {
          this.profession = res.list_time;
        });
      },
      /*
       * 显示模态框
       * */
      showProfessionTime(item){
        let timestamp = Date.parse(new Date());
        this.dialogFormVisible = true;
        this.applyTime = [item.time_signup_start || timestamp, item.time_signup_end || timestamp];
        this.affirmTime = [item.time_confirm_start || timestamp, item.time_confirm_end || timestamp];
        this.form.time_exam = item.time_exam || timestamp;
        this.form.id_profession = item.id_profession;
        this.professionName = item.title_profession;
      },
      /*
       *
       * */
      updateTimeForCollegeProfession(){
        this.form.id_college = Number(this.editId);
        this.form.time_signup_start = this.applyTime[0];
        this.form.time_signup_end = this.applyTime[1];
        this.form.time_confirm_start = this.affirmTime[0];
        this.form.time_confirm_end = this.affirmTime[1];
        this.$store.dispatch('UpdateTimeForCollegeProfession', this.form).then(async res => {
          await this.getProfessionTimeListForCollege();
          this.dialogFormVisible = false;
          this.$message({
            message: '编辑时间成功',
            type: 'success'
          })
        });
      }
    },
    mounted(){
    },
    activated (){
      this.editId = Number(getSessionStorage('schoolId'));
      this.schoolName = getSessionStorage('schoolName')
      if (this.editId !== '') {
        this.getPlaceListForCollege();
        this.getProfessionTimeListForCollege();
      } else {
        this.$message({
          message: "系统出现错误,请刷新重试",
          type: 'error'
        });
        this.$router.push('/home/signUpGuide')
      }
    }
  }
</script>
<style scoped lang="scss">
  #set-exam-site-and-specialty {
    .school-name {
      font-size: 14px;
      margin-top: 20px;
    }
    .site {
      h5 {
        border-bottom: 2px solid #e4e7ed;
        padding-bottom: 10px;
      }
      .site-list {
        padding: 0;
        margin: 0;
        list-style: none;
        font-size: 14px;
        color: #010101;
      }
    }
    .specialty {
      h5 {
        border-bottom: 2px solid #e4e7ed;
        padding-bottom: 10px;
      }
      .specialty-list {
        padding: 0;
        margin: 0;
        list-style: none;
        font-size: 14px;
        color: #010101;
      }
    }
  }
</style>
