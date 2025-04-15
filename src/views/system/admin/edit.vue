<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" maxlength="20" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="password">
        <el-input
            v-model="form.password"
            placeholder="管理员密码"
            clearable
            @input="handlerPwdInput"
            @clear="handlerPwdInput"
        />
      </el-form-item>
      <el-form-item v-if="form.password" label="确认密码" prop="repwd">
        <el-input v-model="form.repwd" placeholder="确认密码" clearable />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-loading="rolesLoading" v-model="form.roleId">
          <el-option v-for="item in roles" :key="item.id" :value="item.id" :label="item.roleName" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择单位:" prop="departmentId"  v-if="form.roleId===4">
        <el-select v-model="form.departmentId" placeholder="请选择单位" class="form-info">
          <el-option  v-for="item in options"  :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName" v-if="form.roleId===5">
        <el-input v-model="form.realName" placeholder="请填写真实姓名" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="职务(姓+职务)" prop="position" v-if="form.roleId===2">
        <el-input v-model="form.position" placeholder="请填写职务" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number :step="1" :min="1" :max="99" v-model="form.sort" style="margin-right: 10px"></el-input-number>
      </el-form-item>
<!--      <el-form-item label="管理员身份" prop="roleName">-->
<!--        <el-select v-model="form.roleName" placeholder="身份" clearable style="width: 100%">-->
<!--          <el-option-->
<!--              v-for="(item,index) in roleList.list"-->
<!--              :key="index"-->
<!--              :label="item.roleName"-->
<!--              :value="item.id"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary" @click="handlerSubmit" v-has-permi="['admin:system:admin:save']">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {detail, save} from "@/api/admin";
import {getRoleByStatus} from '@/api/role'
import {getForm} from "@/utils/utils";
import {getUnitList} from "@/api/register";

export default {
  props:{
    id:{
      default:null
    }
  },
  data(){
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pram.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return{
      roleList:{
        list:[
          {
            id:1,
            roleName:'超级管理员'
          },
          {
            id:2,
            roleName:'二级管理员'
          },
        ]
      },
      form:{
        roleId:null,
        id:null,
        realName:'',
        username:'',
        surname:'',
        position:'',
        // password:'',
        // repwd:'',
        // roles:null,
        roleName:null,
        phone:'',
        departmentId:null,
        status:1,
        sort:0,

      },
      rules:{
        realName: [{ required: true, message: '请填姓名', trigger: ['blur'] }],
        username: [{ required: true, message: '请填写账号', trigger: ['blur'] }],
        password: [{ required: true, message: '请填写管理员密码', trigger: ['blur', 'change'] }],
        repwd: [{ required: true, message: '请再次输入密码', validator: validatePass, trigger: ['blur', 'change'] }],
        roleId: [{ required: true, message: '请选择角色', trigger: ['blur'] }]
      },
      roles:[],
      saveLoading:false,
      formLoading:false,
      rolesLoading:false,
      options: [],
    }
  },
  mounted() {
    if(this.id){
      this.getDetail();
    }
    this.getRole()
    this.getUnit()
  },
  methods:{
    change(e){
    },
    getRole(){
      this.rolesLoading=true
      getRoleByStatus().then(res=>{
        this.roles=res;
      }).finally(()=>{
        this.rolesLoading=false
      })
    },
    getUnit() {
      getUnitList().then(( data ) => {
        this.options = data
      }).catch(({ message }) => {
        this.$message.error(message)
      })
    },
    handlerPwdInput(val) {
      if (!val) {
        this.rules.password = []
        this.rules.repwd = []
        return
      }
      this.rules.password = [
        { required: true, message: '请填管理员密码', trigger: ['blur', 'change'] },
        { min: 6, max: 20, message: '长度6-20个字符', trigger: ['blur', 'change'] }]
      this.rules.repwd = [{ required: true, message: '两次输入密码不一致', validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('两次输入密码不一致!'))
          } else if (value !== this.form.password) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        }, trigger: ['blur', 'change'] }]
    },
    getDetail(){
      this.formLoading=true
      detail(this.id).then(res=>{
        getForm(res,this.form);
        this.rules.password = []
        this.rules.repwd = []
      }).finally(()=>{
        this.formLoading=false;
      })
    },
    handlerSubmit(){
      if(this.saveLoading||this.formLoading||this.rolesLoading){
        return;
      }
      this.$refs.form.validate(valid=>{
        if(!valid)return;
        this.saveLoading=true;
        let form=JSON.parse(JSON.stringify(this.form));
        delete form.repwd;
        save(form).then(()=>{
          this.$message.success('保存成功');
          this.close();
        }).finally(()=>{
          this.saveLoading=false
        })
      })
    },
    close(){
      this.$emit('hideEditDialog')
    }
  }
}
</script>
