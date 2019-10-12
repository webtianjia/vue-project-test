<template>
  <div id="sign-up-guide">
    <breadcrumb :router-list='breadcrumb'></breadcrumb>
    <div class="search-bar">
      <div class="search-left">
        <div>
          <span>地区：</span>
          <el-select v-model="id_province" placeholder="请选择" size="small">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.province"
              :value="item.provinceID">
            </el-option>
          </el-select>
        </div>
        <div class="search-school">
          <el-input v-model="keyword_college" placeholder="请输入院校名称" size="small" style="width: 200px;"></el-input>
          <el-button type="primary" size="small" @click="getCollegeList">查询</el-button>
        </div>
      </div>
      <div class="search-right">
        <el-button type="primary" size="small" @click="publishCollege">发布</el-button>
        <el-button type="primary" size="small" @click="$router.push('/home/addSchool/schoolInfo')">添加院校</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="schoolList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="学校名称" prop="title" align="center"></el-table-column>
        <el-table-column label="LOGO" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.url_logo" alt="" class="school-logo" v-if="scope.row.url_logo.length>=10">
            <img src="@/assets/images/default.png" alt="" class="school-logo" v-else>
          </template>
        </el-table-column>
        <el-table-column label="地区" prop="province" align="center"></el-table-column>
        <el-table-column label="状态" prop="is_published" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="btns">
              <div>
                <div>
                  <el-button type="text" @click="localTo(scope.row.title,scope.row.id_college)">设置考试地点</el-button>
                </div>
                <div>
                  <el-button type="text" @click="localTo(scope.row.title,scope.row.id_college)">设置考试专业</el-button>
                </div>
                <div>
                  <el-button type="text" @click="editFocusNumShow(scope.row.id_college)">修改关注量</el-button>
                </div>
              </div>
              <div>
                <div>
                  <el-button type="text"
                             @click="$router.push({path:'/home/editSchool/schoolInfo',query:{id:scope.row.id_college}})">
                    编辑
                  </el-button>
                </div>
                <div>
                  <el-button type="text" @click="deleteSchool(scope.row.id_college,scope.row.title)">删除
                  </el-button>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer" v-if="total>=1">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="修改关注量" :visible.sync="editFocusNum" :center="true" width="300px">
      <el-form :model="form">
        <el-form-item label="地区:" label-width="80px">
          <el-select v-model="editForm.provinceID" placeholder="请选择" size="small" @change="getAttentionNumForCollege"
                     style="width: 150px;">
            <el-option
              v-for="item in province"
              v-if="item.id!==0"
              :key="item.id"
              :label="item.province"
              :value="item.provinceID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关注量:" label-width="80px">
          <el-input v-model="editForm.numof_attention" placeholder="请输入关注量" size="small"
                    style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button @click="editFocusNum = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="setAttentionNumForCollege" size="mini">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  import Breadcrumb  from '@/components/breadcrumb/breadcrumb'
  import {province}  from '@/utils/province'
  import {setSessionStorage, getSessionStorage} from '@/utils/mixin'
  let newArr = [
    {
      "id": 0,
      "provinceID": 0,
      "province": "全国"
    }
  ];
  let newArr2 = newArr.concat(province);
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
            isDefault: true
          }
        ],
        province: newArr2,
        schoolList: [],
        multipleSelection: [],//所有被选择的院校
        editFocusNum: false,
        editForm: {
          provinceID: '',
          numof_attention: '',
          id_college: ''
        },
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
        currentPage: 1,
        id_province: 0,//省份的ID，传0代表全国
        keyword_college: '',//院校名称的关键词
        pageSize: 10,
        pageNo: 1,
        total: ''
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(e){
        this.pageNo = e;
        this.getCollegeList();
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /*
       * 删除一个院校
       * */
      deleteSchool(id, name){
        this.$confirm(`确定要删除“${ name }”吗？`, '删除院校', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          await this.$store.dispatch('DeleteOneCollege', {id_college: id});
          await this.getCollegeList();
          this.editFocusNum = false;
          this.$message({
            message: '删除成功！',
            type: "success"
          });
        }).catch(() => {

        });
      },
      editFocusNumShow(id){
        this.editForm.id_college = id;
        if (this.editForm.provinceID !== '') {
            this.getAttentionNumForCollege();
        }
        this.editFocusNum = true;
      },
      /* 查询院校列表 */
      getCollegeList(){
        let formData = {
          id_province: this.id_province,
          keyword_college: this.keyword_college,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        };
        this.$store.dispatch('GetCollegeList', formData).then(res => {
          res.list_college.forEach(item => {
            item.is_published = Number(item.is_published) ? '已发布' : '未发布';
            item.province = item.province ? item.province : '暂无';
            this.total = res.total;
          });
          this.schoolList = res.list_college;
        })
      },
      /*
       * 发布一个院校OR批量发布院校
       * */
      async publishCollege(){
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请至少选择一个院校发布',
            type: 'error'
          });
          return false;
        }
        if (this.multipleSelection.length === 1) {
          this.$confirm('是否确认发布?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('PublishOneCollege', {id_college: this.multipleSelection[0].id_college}).then(async res => {
              await this.getCollegeList();
              this.$message({
                message: '发布成功！',
                type: 'success'
              });
            });
          }).catch(err => {

          });
        } else {
          let formData = {
            is_all: 0,
            list_college: []
          };
          this.multipleSelection.forEach((item, index) => {
            formData.list_college.push(item.id_college)
          });
          this.$confirm('是否确认发布?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(res => {
            this.$store.dispatch('PublishSomeColleges', formData).then(async res => {
              await this.getCollegeList();
              this.$message({
                message: '发布成功！',
                type: 'success'
              });
            });
          }).catch(err => {

          })
        }
      },
      /*
       * 设置一个院校不同省份的关注量
       * */
      setAttentionNumForCollege(){
        let formData = {
          id_college: this.editForm.id_college,
          list_attention: {
            provinceID: this.editForm.provinceID,
            numof_attention: Number(this.editForm.numof_attention)
          }
        };
        if (formData.list_attention.numof_attention === '') {
          this.$message({
            message: "请先输入关注量",
            type: "error"
          });
          return false;
        }
        this.$store.dispatch('SetAttentionNumForCollege', formData).then(res => {
          this.editFocusNum = false;
          this.editForm.numof_attention = '';
          this.$message({
            message: "修改关注量成功",
            type: "success"
          });
        })
      },
      localTo(name, id){
        setSessionStorage('schoolName', name);
        setSessionStorage('schoolId', id);
        this.$router.push('/home/setExamSiteAndSpecialty')
      },
      /*
       * 获取关注量
       * */
      getAttentionNumForCollege(){
        this.$store.dispatch('GetAttentionNumForCollege', {
          id_college: this.editForm.id_college,
          provinceID: this.editForm.provinceID
        }).then((res) => {
          this.editForm.numof_attention = res.numof_attention;
        })
      }
    },
    mounted(){
      this.getCollegeList();
    }

  }
</script>
<style scoped lang="scss">
  #sign-up-guide {
    .search-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
      padding: 0 30px 15px 30px;
      font-size: 14px;
      border-bottom: 1px solid #ebeef5;
      .search-left {
        display: flex;
        .search-school {
          margin-left: 60px;
        }
      }
    }
    .content {
      .school-logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .btns {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 12px;
        color: #3F51B5;
        .el-button--text {
          padding: 0;
        }
      }
    }
    .footer {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
