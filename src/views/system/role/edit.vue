<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" maxlength="10" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="菜单权限" prop="menuOptions">
        <el-tree
            v-loading="treeLoading"
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            ref="menu"
            node-key="perms"
            :check-strictly="false"
            empty-text="加载中，请稍候"
            :props="defaultProps"
        ></el-tree>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary" @click="handlerSubmit" v-has-permi="['admin:system:role:save']">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {detail,save} from "@/api/role";
import {getTree} from "@/api/menu";
import {getForm} from "@/utils/utils";


export default {
  props:{
    id:{
      default:null
    }
  },
  data(){
    return{
      form:{
        id:null,
        roleName:'',
        status:1,
      },
      rules:{
        roleName: [{ required: true, message: '请填角色名称', trigger: ['blur'] }],
      },
      menuExpand: false,
      menuCheckStrictly: true,

      menuOptions:[],
      defaultProps: {
        children: "childList",
        label: "name",
      },
      menuIds:[],
      treeLoading:false,
      saveLoading:false,
      formLoading:false,
    }
  },
  mounted() {
    this.getTreeList();
    if(this.id){
      this.getDetail();
    }
  },
  methods:{
    handleCheckedTreeExpand(value, type) {
      if (type == 'menu') {
        let treeList = this.menuOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value;
        }
      }
    },
    getDetail(){
      this.formLoading=true
      detail(this.id).then(res=>{
        getForm(res,this.form);
      }).finally(()=>{
        this.formLoading=false;
      })
    },
    getTreeList(){
      this.treeLoading=true
      getTree({roleId:this.id}).then(res=>{
        this.menuOptions=res;
        this.getTreeId(res)
        this.$nextTick(()=>{
          this.menuIds.forEach((i,n) =>{
            var node = this.$refs.menu.getNode(i);
            if(node.isLeaf){
              this.$refs.menu.setChecked(node, true);
            }
          })
        })
      }).finally(()=>{
        this.treeLoading=false
      })
    },
    getTreeId(datas) {
      for(var i in datas){
        if(datas[i].checked) this.menuIds.push(datas[i].perms)
        if(datas[i].childList){
          this.getTreeId(datas[i].childList);
        }
      }
    },
    handlerSubmit(){
      if(this.saveLoading||this.formLoading||this.treeLoading){
        return;
      }
      this.$refs.form.validate(valid=>{
        if(!valid)return;
        let roles=this.getMenuAllCheckedKeys().toString();
        let form=JSON.parse(JSON.stringify(this.form));
        form.rules=roles;
        this.saveLoading=true
        save(form).then(()=>{
          this.$message.success('保存成功');
          this.close();
        }).finally(()=>{
          this.saveLoading=false
        })
      })
    },
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    close(){
      this.$emit('hideEditDialog')
    }
  }
}
</script>
