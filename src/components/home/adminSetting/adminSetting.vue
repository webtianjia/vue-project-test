<template>
  <div id="admin-setting">
    <div class="content">
      <div class="box">
        <div class="add-amdin">
          <el-button type="primary" size="small" @click="addAmdinVisible=true;">添加管理员</el-button>
        </div>
        <breadcrumb :router-list='breadcrumb'></breadcrumb>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          size="small"
        >
          <el-table-column label="序号" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" align="center"></el-table-column>
          <el-table-column prop="phonenum" label="手机号" align="center"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <div>
                <el-switch v-model="scope.row.is_enabled"
                           @change="forbideAdmin(scope.row.id,scope.$index,$event)">
                </el-switch>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div>
                <el-button type="text"
                           @click="showEditAdmin(scope.row.list_permissions,scope.row.username,scope.row.phonenum,scope.row.password,scope.row.id)">
                  管理员配置
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="添加管理员" :visible.sync="addAmdinVisible" :center="true">
      <el-form label-width="80px" :model="addAdminForm" size="small">
        <el-form-item label="姓名：">
          <el-input v-model="addAdminForm.username" style="width:250px;float:left;" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="addAdminForm.phonenum" style="width:250px;float:left;" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="addAdminForm.password" style="width:250px;float:left;"
                    placeholder="密码至少为6位数字、字母、下划线"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <span>权限配置：</span>
      </div>
      <el-table
        :data="addAdminRoleList"
        stripe
        style="width: 100%"
        size="small"
      >
        <el-table-column prop="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="role" label="权限" align="center"></el-table-column>
        <el-table-column label="开关" align="center">
          <template slot-scope="scope">
            <div>
              <el-switch v-model="scope.row.switch">
              </el-switch>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAmdinVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addAdmin" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="管理员配置" :visible.sync="editAdmin" :center="true" @close="closeEdit">
      <el-form label-width="80px" :model="editAdminForm" size="small">
        <el-form-item label="姓名：">
          <el-input v-model="editAdminForm.username" style="width:250px;float:left;" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="editAdminForm.phonenum" style="width:250px;float:left;" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="editAdminForm.password" style="width:250px;float:left;"
                    placeholder="密码至少为6位数字、字母、下划线"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <span>权限配置：</span>
      </div>
      <el-table
        :data="editAdminData"
        stripe
        style="width: 100%"
        size="small"
      >
        <el-table-column prop="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="role" label="权限" align="center"></el-table-column>
        <el-table-column label="开关" align="center">
          <template slot-scope="scope">
            <div>
              <el-switch v-model="scope.row.switch">
              </el-switch>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAdmin = false" size="small">取 消</el-button>
        <el-button type="primary" @click="updateAdmin" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  import Breadcrumb  from '@/components/breadcrumb/breadcrumb'
  import {checkMobile, checkPwd} from '@/utils/mixin'
  import {Loading} from 'element-ui'
  export default {
    components: {
      Breadcrumb
    },
    data() {
      return {
        tableData: [],
        //添加管理员权限列表
        addAdminRoleList: [
          {
            index: 101,
            role: '奇点动态管理权限',
            switch: true,
            name: 'has_dynamic'
          },
          {
            index: 102,
            role: '学校认证申请管理',
            switch: true,
            name: 'has_schoolAuthen'
          },
          {
            index: 103,
            role: '考题管理、速写创作、考题创作权限',
            switch: true,
            name: 'has_sketch'
          },
          {
            index: 104,
            role: '云教材每日推荐',
            switch: true,
            name: 'has_cloudRecommend'
          },
          {
            index: 105,
            role: '艺考助手、报考指南',
            switch: true,
            name: 'has_examguide'
          }
        ],
        editAdminData: [
          {
            index: 101,
            role: '奇点动态管理权限',
            switch: false,
            name: 'has_dynamic'
          },
          {
            index: 102,
            role: '学校认证申请管理',
            switch: false,
            name: 'has_schoolAuthen'
          },
          {
            index: 103,
            role: '考题管理、速写创作、考题创作权限',
            switch: false,
            name: 'has_sketch'
          },
          {
            index: 104,
            role: '云教材每日推荐',
            switch: false,
            name: 'has_cloudRecommend'
          },
          {
            index: 105,
            role: '艺考助手、报考指南',
            switch: false,
            name: 'has_examguide'
          }
        ],
        addAmdinVisible: false,
        editAdmin: false,
        addAdminForm: {
          phonenum: '',
          username: '',
          password: ''
        },
        editAdminForm: {
          phonenum: '',
          username: '',
          password: '',
          id: '',
        },
        breadcrumb: [//面包屑路径，Home默认存在,isDefault接受一个布尔类型,表示是否决定分隔符
          {
            path: '/home/adminSetting',
            name: '管理员设置',
            isDefault: true
          }
        ],
      }
    },
    methods: {
      /*
       * 编辑管理员模态框显示
       * */
      showEditAdmin(permissionsList, name, phone, password, id){
        this.editAdminForm.username = name;
        this.editAdminForm.phonenum = phone;
        this.editAdminForm.password = password;
        this.editAdminForm.id = id;

        Object.keys(permissionsList).forEach(item => {
          this.editAdminData.forEach(sub => {
            if (item === sub.name && permissionsList[item] === 1) {
              sub.switch = true;
            }

          })
        });
        this.editAdmin = true;
      },
      /*
       * 获取管理员列表
       * */
      async getAdminList(){
        let res = await this.$store.dispatch('GetAdminList');
        res.adminList.forEach((item, index) => {
          item.is_enabled = item.is_enabled === 0 ? false : true;
        });
        this.tableData = res.adminList;
      },
      /*
       * 添加管理员
       * */
      addAdmin(){
        if (!checkMobile(this.addAdminForm.phonenum)) {
          this.$message({
            message: "手机号输入有误,请检查",
            type: 'error'
          });
          return false;
        }
        if (!checkPwd(this.addAdminForm.password) && this.addAdminForm.password.length < 6) {
          this.$message({
            message: "密码至少为6位，只能是数字、字母、下划线",
            type: 'error'
          });
          return false;
        }
        let formData = {
          phonenum: this.addAdminForm.phonenum,
          username: this.addAdminForm.username,
          password: this.addAdminForm.password,
          permissions_user: {
            has_dynamic: 0,
            has_schoolAuthen: 0,
            has_sketch: 0,
            has_cloudRecommend: 0,
            has_examguide: 0
          }
        };
        let count = 0;
        this.addAdminRoleList.forEach((item, index) => {
          if (item.switch) {
            formData.permissions_user[item.name] = 1;
            ++count
          }
        });
        if (count === 0) {
          this.$message({
            message: "至少为管理员添加一项权限",
            type: 'error'
          });
          return false;
        }
        this.$store.dispatch('AddAdmin', formData).then(async res => {
          this.addAmdinVisible = false;
          await this.getAdminList();
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
      },
      /*
       * 禁用/启用管理员
       * */
      forbideAdmin(id, index, event){
        let status = event ? 1 : 0;
        this.$store.dispatch('ForbideAdmin', {
          id_admin: id,
          is_enabled: status
        }).then(res => {
          if (status) {
            this.$message({
              message: '启用成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '禁用成功',
              type: 'success'
            })
          }
        }).catch(err => {
          /*
           * 请求出错,取反还原 sitch状态
           * */
          this.tableData[index].is_enabled = !this.tableData[index].is_enabled;
        });
      },
      /*
       * 模态框关闭的回调,还原状态
       * */
      closeEdit(){
        this.editAdminData.forEach(item => {
          item.switch = false;
        })
      },
      /*
       * 编辑管理员
       * */
      async updateAdmin(id){
        let formData = {
          phonenum: this.editAdminForm.phonenum,
          username: this.editAdminForm.username,
          password: this.editAdminForm.password,
          id_admin: this.editAdminForm.id,
          permissions_user: {
            has_dynamic: 0,
            has_schoolAuthen: 0,
            has_sketch: 0,
            has_cloudRecommend: 0,
            has_examguide: 0
          }
        };
        let count = 0;
        this.editAdminData.forEach((item, index) => {
          if (item.switch) {
            ++count
            formData.permissions_user[item.name] = 1;
          }
        });
        if (!checkMobile(this.editAdminForm.phonenum)) {
          this.$message({
            message: "手机号输入有误,请检查",
            type: 'error'
          });
          return false;
        }
        if (!checkPwd(this.editAdminForm.password) && this.editAdminForm.password.length < 6) {
          this.$message({
            message: "密码至少为6位，只能是数字、字母、下划线",
            type: 'error'
          });
          return false;
        }
        if (count === 0) {
          this.$message({
            message: "至少为管理员添加一项权限",
            type: 'error'
          });
          return false;
        }
        await this.$store.dispatch('UpdateAdmin', formData);
        await this.getAdminList();
        this.editAdmin = false;
        this.$message({
          message: '配置成功',
          type: 'success'
        });

      }
    },
    mounted(){
      this.getAdminList();
    }
  }
</script>
<style scoped lang="scss">
  .content {
    .box {
      .add-amdin {
        float: right;
      }
    }
  }

  .el-button--text {
    padding: 0;
  }
</style>
