<template>
  <div class="edit-container">
    <el-form v-loading="saveLoading" ref="form" :model="form" :rules="dynamicRules" label-width="120px" @submit.native.prevent>

      <el-form-item label="封面：" prop="pic">
        <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="handleUploadForm"
            :headers="myHeaders"
            :before-upload="beforeAvatarUpload">
          <!-- 判断是显示图片还是视频 -->
          <template v-if="isVideo">
            <video v-if="form.pic" :src="imageUrl + form.pic" controls class="avatar-video" referrerpolicy="no-referrer"></video>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </template>
          <template v-else>
            <img v-if="form.pic" :src="imageUrl + form.pic" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </template>
        </el-upload>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title" placeholder="标题" maxlength="30" style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章来源：" prop="articleSource">
            <el-input v-model="form.articleSource" placeholder="文章来源" maxlength="30" style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="分类：" prop="categoryId" >
            <el-cascader v-model="form.categoryId" :options="classificationList" style="width: 300px;"
                         :props="{value:'id',label:'name',children:'child',emitPath:false}" filterable clearable>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否焦点关注：" prop="isFocus">
            <el-select v-model="form.isFocus" clearable placeholder="请选择" style="width: 300px;">
              <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.data"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="浏览量：" prop="viewCount">
            <el-input-number :step="1" :min="1" :max="99" v-model="form.viewCount" style="width: 300px;"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序：" prop="sort">
            <el-input-number :step="1" :min="1" :max="99" v-model="form.sort" style="width: 300px;"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="审核人：" prop="departmentId" v-if="role[0]===1">
            <el-input v-model="form.reviewer" placeholder="请输入审核人" maxlength="30" style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部职别：" prop="departmentTitle" v-if="role[0]===1">
            <el-input v-model="form.departmentTitle" placeholder="部职别" maxlength="30" style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="外部链接：" prop="jumpUrl" >
            <el-input v-model="form.jumpUrl" placeholder="外部链接" maxlength="100" style="width: 300px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间：" prop="createTime">
            <el-date-picker style="width: 300px;"
                            v-model="form.createTime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="摘要：" prop="pick">
        <el-input type="textarea" v-model="form.pick" placeholder="摘要" style="width: 85%;" ></el-input>
      </el-form-item>

      <el-form-item label="内容：" prop="content">
        <Tinymce v-model="form.content" :imageUrl="imageUrl"></Tinymce>
      </el-form-item>
      <!--      <el-form-item label="状态" prop="status">-->
      <!--        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary"
                   @click="handlerSubmit" v-has-permi="['admin:content:save']">保存
        </el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {saveContent,getClassification} from "@/api/classification";
import Tinymce from "@/components/Tinymce/index.vue";
import {getToken} from "@/utils/auth";
import {upload} from "@/api/upload";
import {getUnitList} from "@/api/register";

export default {
  components: {Tinymce},
  props: {
    isCreate: {
      type: Number,
      required: true
    },
    editData: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      form: {
        id: null,
        articleSource: '',
        categoryName: '',
        categoryId: null,
        content: '',
        pick: '',
        pic: '',
        isDel: null,
        isFocus: 0,
        roleId: null,
        viewCount: null,
        sort: null,
        createTime: this.formatDate(new Date()), // 设置默认时间为当前时间并格式化
        departmentId:null,
        departmentTitle:'',
        jumpUrl:'',
      },
      isVideo: false, // 标志变量，用于判断上传的是图片还是视频
      pram: {
        pid: null,
        keyword: '',
      },
      rules: {
        title: [{required: true, message: '请填写标题', trigger: ['blur']}],
        content: [{required: true, message: '请填写内容', trigger: ['blur']}],
        categoryId: [{required: true, message: '请选择分类', trigger: ['blur']}],
      },
      roles: [],
      saveLoading: false,
      formLoading: false,
      uploads: {
        show: false,
        multiple: true,
      },
      typeList: [{id: 0, data: "否"}, {id: 1, data: "是"}],
      departmentTitleList: [],
      classificationList: [],
      myHeaders: {"token": getToken()},
      imageUrl: '',
      role: this.$store.getters.roles,
    }
  },
  mounted() {

    this.imageUrl = process.env.VUE_APP_IMAGE_URL
    if (this.isCreate === 1) {
      this.getDetail();
    }
    this.getClassificationList();
    this.getUnit();
    this.form.createTime = this.formatDate(new Date());

  },
  computed: {
    dynamicRules() {
      if (this.form.jumpUrl) {
        // 如果有外部链接，则只需验证标题
        return {
          title: this.rules.title,
          categoryId: this.rules.categoryId
        };
      } else {
        // 否则需要验证所有字段
        return this.rules;
      }
    }
  },
  watch: {
    'form.jumpUrl': function() {
      // 当外部链接发生变化时，重新验证表单
      this.$nextTick(() => {
        this.$refs.form.clearValidate(); // 清除之前的验证结果
        this.$refs.form.validate(); // 重新触发验证
      });
    }
  },
  methods: {
    getDetail() {
      this.form = this.editData
    },

    formatDate(date) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    getClassificationList() {
        this.saveLoading = true;
      getClassification(this.pram).then((res) => {
        this.classificationList = res
        }).finally(() => {
          this.saveLoading = false
        })
    },
    getUnit() {
        this.saveLoading = true;
        getUnitList(this.pram).then((res) => {
        this.departmentTitleList = res
        }).finally(() => {
          this.saveLoading = false
        })
    },
    handlerSubmit() {
      if (this.saveLoading) {
        return;
      }
      this.$refs.form.validate(valid => {
        if (!valid) return;
        this.saveLoading = true;
        saveContent(this.form).then(() => {
          this.$message.success('保存成功');
          this.close();
        }).finally(() => {
          this.saveLoading = false
        })
      })
    },
    handleAvatarSuccess(res, file) {
      this.form.pic = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isImageOrVideo = ['image/jpg', 'image/jpeg','image/gif', 'image/png', 'video/mp4'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 10; // 限制文件大小不超过2MB

      if (!isImageOrVideo) {
        this.$message.error('上传的文件只能是图片或视频格式!');
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
            this.form.pic = res
            //图片上传接口 后期调用
            loading.close();
            this.$message.success("上传成功");
          }).catch((res) => {
        loading.close();
      });
    },
    close() {
      this.$emit('hideEditDialog');
    },
  }
}
</script>

<style>
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

.avatar, .avatar-video {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
