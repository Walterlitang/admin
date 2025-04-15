<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="rules" label-width="100px">

      <el-form-item label="封面：" prop="pic" >
        <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="handleUploadForm"
            :headers="myHeaders"
            :before-upload="beforeAvatarUpload">
          <template>
            <img v-if="form.backgroundImage" :src="imageUrl + form.backgroundImage" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" maxlength="50" placeholder="名称" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="上级" prop="pid">
            <el-cascader style="width: 400px;" v-model="form.pid" :options="tree" :props="{value:'id',label:'name',children:'child'}"
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
              :value="item.value">
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
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary" @click="handlerSubmit" v-has-permi="['admin:classification:save']">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {detail,getTree, save} from "@/api/classification";
import {getForm} from "@/utils/utils";
import {getToken} from "@/utils/auth";
import {upload} from "@/api/upload";

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
        status:true,
        urlPath:'',
        backgroundImage:'',
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
      imageUrl: '',
      myHeaders: {"token": getToken()},
    }
  },
  mounted() {
    this.imageUrl = process.env.VUE_APP_IMAGE_URL
    if(this.id){
      this.getDetail();
    }
    if(this.pid)
    {
      this.form.pid=this.pid;
    }
    this.getTree()
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
    },
    handleAvatarSuccess(res, file) {
      this.form.backgroundImage = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isImageOrVideo = ['image/jpg', 'image/jpeg','image/gif', 'image/png'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 10; // 限制文件大小不超过2MB

      if (!isImageOrVideo) {
        this.$message.error('上传的文件只能是图片格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10MB!');
      }

      // 根据文件类型设置标志变量
      this.isVideo = file.type.startsWith('video/');

      return isImageOrVideo && isLt2M;
    },
    handleUploadForm(param) {
      const formData = new FormData();
      //0=>maintain 全部
      formData.append("file", param.file);
      let loading = this.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      upload(formData)
          .then((res) => {
            this.form.backgroundImage = res
            //图片上传接口 后期调用
            loading.close();
            this.$message.success("上传成功");
          }).catch((res) => {
        loading.close();
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
