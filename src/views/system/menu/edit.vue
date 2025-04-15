<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" maxlength="50" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="父级" prop="pid">
        <el-cascader v-model="form.pid" :options="tree" :props="{checkStrictly:true,value:'id',label:'name',children:'childList',emitPath:false}" filterable clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="form.icon" maxlength="50" placeholder="图标"></el-input>
      </el-form-item>
      <el-form-item label="前端path" prop="component">
        <el-input v-model="form.component" maxlength="50" placeholder="前端path"></el-input>
      </el-form-item>
      <el-form-item label="权限标识" prop="perms">
        <el-input v-model="form.perms" maxlength="50" placeholder="权限标识"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型" prop="menu_type">
        <el-select v-model="form.menuType">
          <el-option value="M" label="顶级菜单"></el-option>
          <el-option value="C" label="次级菜单"></el-option>
          <el-option value="A" label="操作"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求url" prop="url">
        <el-input v-model="form.url" placeholder="请输入请求url" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" placeholder="请输入排序"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary" @click="handlerSubmit" v-has-permi="['admin:system:menu:save']">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {detail,getTree, save} from "@/api/menu";
import {getForm} from "@/utils/utils";

export default {
  props:{
    id:{
      default:null
    },
    pid:{
      default:null
    }
  },
  data(){
    return{
      form:{
        id:null,
        pid:null,
        name:'',
        icon:'',
        component:'',
        perms:'',
        v:null,
        url:'',
        sort:0,
      },
      rules:{
        name: [{ required: true, message: '请填写姓名', trigger: ['blur'] }],
        perms: [{ required: true, message: '请填写权限标识', trigger: ['blur'] }],
        menuType: [{ required: true, message: '请选择菜单类型', trigger: ['blur'] }],
        sort: [{ required: true, message: '请填写排序', trigger: ['blur'] }]
      },
      tree:[],
      saveLoading:false,
      formLoading:false,
      treeLoading:false,
    }
  },
  mounted() {
    if(this.id){
      this.getDetail();
    }
    this.getTree()
  },
  methods:{
    getTree(){
      this.treeLoading=true
      getTree({keyword:''}).then(res=>{
        if(this.pid){
          this.form.pid=this.pid
        }
        this.tree=res;
      }).finally(()=>{
        this.treeLoading=false
      })
    },
    getDetail(){
      this.formLoading=true
      detail(this.id).then(res=>{
        getForm(res,this.form);
      }).finally(()=>{
        this.formLoading=false;
      })
    },
    handlerSubmit(){
      if(this.saveLoading||this.formLoading||this.treeLoading){
        return;
      }
      this.$refs.form.validate(valid=>{
        if(!valid)return;
        this.saveLoading=true;
        save(this.form).then(()=>{
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
