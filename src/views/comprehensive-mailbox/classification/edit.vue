<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="背景图：" prop="backgroundImage">
        <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="handleUploadForm"
            :headers="myHeaders"
            :before-upload="beforeIconUpload">
          <img v-if="form.backgroundImage" :src="baseURL + form.backgroundImage" class="icon" alt="" style="width: 400px;height: 200px">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" maxlength="50" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="留言说明" prop="messageExplanation">
        <el-input v-model.number="form.messageExplanation" placeholder="请输入留言说明"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input-number :step="1" :min="1" :max="99" v-model="form.sort" style="margin-right: 10px"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="状态：" prop="status">
              <el-switch  v-model="form.status"
                          :active-value="true" :inactive-value="false"/>
            </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary" @click="handlerSubmit" v-has-permi="['admin:classification:save']">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {detail,getTree, save} from "@/api/comprehensiveMailbox";
import {getForm} from "@/utils/utils";
import {getToken} from "@/utils/auth";
import {upload} from "@/api/upload";

export default {
  props:{
    id:{
      default:null
    },
    baseURL: {
      type: String,
      default: () => {
        return ''
      }
    },
  },
  data(){
    return{
      form:{
        id:null,
        pid:null,
        sort:0,
        name:'',
        status:true,
        backgroundImage:'',
        messageExplanation:'',
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
        sort: [{ required: true, message: '请填写排序', trigger: ['blur'] }],
        messageExplanation: [{ required: true, message: '请填写留言说明', trigger: ['blur'] }],
        backgroundImage: [{ required: true, message: '请上传背景图', trigger: ['blur'] }],
      },
      tree:[],
      saveLoading:false,
      formLoading:false,
      treeLoading:false,
      myHeaders: {"X-Token": getToken()},
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
    beforeIconUpload(file) {
      const isIMAGE = ['image/jpg', 'image/jpeg','image/gif', 'image/png'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isIMAGE) {
        this.$message.error('上传图标只能是 JPG、PNG、JPEG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图标大小不能超过 10MB!');
      }
      return isIMAGE && isLt2M;
    },
    async handleUploadForm(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      let loading = this.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        const res = await upload(formData);
        this.form.backgroundImage = res;
        loading.close();
        this.$message.success("上传成功");
      } catch (error) {
        loading.close();
      }
    },
    close(){
      this.$emit('hideEditDialog')
    }
  }
}
</script>
