<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="文件" prop="file">
        <el-button type="primary" @click="uploads.show=true" size="mini">选择文件</el-button>
      </el-form-item>
      <el-form-item label="富文本">
        <Tinymce v-model="form.content"></Tinymce>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary" @click="handlerSubmit" v-has-permi="['admin:demo:save']">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
        :visible.sync="uploads.show"
        title="上传文件"
        :append-to-body="true"
        destroy-on-close
        :close-on-click-modal="false"
        width="1000px">
      <UploadFile
          v-if="uploads.show"
          :multiple="uploads.multiple"
          @getFile="getFile"
          ref="uploads"
      />
    </el-dialog>
  </div>
</template>
<script>
import {detail, save} from "@/api/demo";
import {getForm} from "@/utils/utils";
import UploadFile from "@/components/File/UploadFile.vue";
import Tinymce from "@/components/Tinymce/index.vue";

export default {
  components: {Tinymce, UploadFile},
  props:{
    id:{
      default:null
    }
  },
  data(){
    return{
      form:{
        id:null,
        file:'',
        content:'',
        status:1,
      },
      rules:{
        file: [{ required: true, message: '请上传文件', trigger: ['blur'] }],
      },
      roles:[],
      saveLoading:false,
      formLoading:false,
      uploads:{
        show:false,
        multiple:true,
      }
    }
  },
  mounted() {
    if(this.id){
      this.getDetail();
    }
  },
  methods:{
    getFile(fileList){
      // console.log(fileList);
      // this.uploads.show = false
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
      if(this.saveLoading||this.formLoading){
        return;
      }
      /*this.$refs.form.validate(valid=>{
        if(!valid)return;
        this.saveLoading=true;
        save(this.form).then(()=>{
          this.$message.success('保存成功');
          this.close();
        }).finally(()=>{
          this.saveLoading=false
        })
      })*/
    },
    close(){
      this.$emit('hideEditDialog')
    }
  }
}
</script>
