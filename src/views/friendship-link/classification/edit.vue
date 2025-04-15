<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" maxlength="50" placeholder="名称" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="上级" prop="pid">
            <el-cascader v-model="form.pid" :options="tree" :props="{value:'id',label:'name',children:'child'}" style="width: 400px;"
               filterable clearable
            >
            </el-cascader>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" ></el-switch>
      </el-form-item>
      <el-form-item label="URL路径" prop="urlPath">
        <el-input v-model.number="form.urlPath" placeholder="请输入URL路径" style="width: 400px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="form.sort" placeholder="请输入排序" style="width: 400px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否导航" prop="isNavigation">
        <el-select v-model="form.isNavigation" clearable placeholder="请选择" style="width: 400px;">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否文章" prop="isArticle">
        <el-select v-model="form.isArticle" clearable placeholder="请选择" style="width: 400px;">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary" @click="handlerSubmit" v-has-permi="['admin:friendshipLink:classification:save']">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getTree, save,detail} from "@/api/friendshipLink";
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
        isNavigation:1,
        isArticle:1,
        sort:0,
        name:'',
        status:1,
        urlPath:'',
      },
      options: [{
        value: 0,
        label: '否'
      }, {
        value: 1,
        label: '是'
      }],
      rules:{
        name: [{ required: true, message: '请填写名称', trigger: ['blur'] }],
        sort: [{ required: true, message: '请填写排序', trigger: ['blur'] }]
      },
      tree:[],
      saveLoading:false,
      formLoading:false,
      treeLoading:false,
      selectedParentName: '', // 用于显示父级名称
    }
  },
  mounted() {

    if(this.id){
      this.form.pid=this.pid;
      this.getDetail();
    }
    if(this.pid)
    {
      this.form.pid=this.pid;
    }
    this.getTree()
  },
  computed: {
    cascaderProps() {
      return {
        checkStrictly: true,
        value: 'id',
        label: 'name',
        children: 'child',
        emitPath: false,
      };
    },
  },
  methods:{

    getTree(){
      this.treeLoading=true
      getTree({pid:this.id}).then(res=>{
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
        this.form.pid=this.pid;
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
