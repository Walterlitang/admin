<template>
  <div>
    <el-row :gutter="30">
      <el-col v-bind="grid">
        <div class="Nav">
          <div class="trees-coadd">
            <div class="scollhide">
              <div
                class="trees"
                :style="{ maxHeight: !pictureType ? '300px' : '700px' }"
              >
                <el-tree
                  ref="tree"
                  :data="treeData2"
                  :filter-node-method="filterNode"
                  :props="defaultProps"
                  highlight-current
                >
                  <div
                    slot-scope="{ node, data }"
                    class="custom-tree-node"
                    @click.stop="handleNodeClick(data)"
                  >
                    <div>
                      <span
                        class="custom-tree-node-label"
                        :title="node.label"
                        >{{ node.label }}</span
                      >
                      <span
                        v-if="data.space_property_name"
                        style="font-size: 11px; color: #3889b1"
                        >（{{ data.name }}）</span
                      >
                    </div>
                  </div>
                </el-tree>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col v-bind="grid2" class="colLeft">
        <div class="conter mb15 relative">
          <div class="bnt">
            <el-button
              v-if="!pictureType"
              size="small"
              type="primary"
              class="mr15"
              style="margin-bottom:8px;height:33px;"
              @click="checkPics"
            >使用选中文件</el-button
            >
            <div class="mb20">
              <el-tooltip
                class="item"
                effect="dark"
                content="上传文件"
                placement="top-start"
              >
                <el-upload
                  class="upload-demo"
                  action
                  :http-request="handleUploadForm"
                  :on-change="imgSaveToUrl"
                  :headers="myHeaders"
                  :show-file-list="false"
                  multiple
                >
                  <el-button
                    icon="el-icon-upload2"
                    size="small"
                    class="mr15"
                    v-if="!pictureType"
                  ></el-button>
                </el-upload>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除文件"
                placement="top-start"
              >
                <el-button
                  icon="el-icon-delete"
                  class="mr15"
                  type="danger"
                  size="small"
                  @click.stop="editPicList('文件')"
                  v-hasPermi="['resourceDel']"
                  v-if="!pictureType"
                ></el-button>
              </el-tooltip>
            </div>
            <el-upload
              class="upload-demo"
              action
              :accept="allowAccept"
              :http-request="handleUploadForm"
              :on-change="imgSaveToUrl"
              :headers="myHeaders"
              :show-file-list="false"
              multiple
            >
              <el-button class="mr10" type="primary" v-if="pictureType" v-hasPermi="['resourceAdd']"
              >上传文件</el-button
              >
            </el-upload>
            <div>
              <el-button
                class="mr10"
                type="danger"
                @click.stop="editPicList('文件')"
                v-if="pictureType"
                v-hasPermi="['resourceDel']"
              >删除文件</el-button
              >
            </div>
            <!--<div>
              <el-button
                class="mr10"
                type="primary"
                @click.stop="downPicList('文件')"
                v-if="pictureType"
                v-hasPermi="['admin:system:attachment:download','admin:person:material:download']"
                >下载</el-button
              >
            </div>
            <el-select
              v-if="pictureType"
              v-model="sleOptions.attachment_category_name"
              placeholder="文件移动至"
              class="mb20"
              :size="pictureType ? '' : 'small'"
              v-hasPermi="['admin:system:attachment:move','admin:person:material:move']"
            >
              <el-option
                class="demo"
                :label="sleOptions.attachment_category_name"
                :value="sleOptions.attachment_category_id"
                style="
                  max-width: 560px;
                  height: 200px;
                  overflow: auto;
                  background-color: #fff;">
                <el-tree
                  ref="tree2"
                  :data="treeData2"
                  :filter-node-method="filterNode"
                  :props="defaultProps"
                  highlight-current
                  @node-click="handleSelClick"
                />
              </el-option>
            </el-select> -->
            <div class="abs_video">
               <el-radio-group v-model="tableData.fileType" @change="radioChange" size="small">
                  <el-radio-button label="1">图片</el-radio-button>
<!--                  <el-radio-button label="2">视频</el-radio-button>-->
<!--                  <el-radio-button label="3">文档</el-radio-button>-->
              </el-radio-group>
            </div>
          </div>
          <div class="pictrueList acea-row" v-loading="loadingPic">
            <div v-show="isShowPic" class="imagesNo">
              <i
                class="el-icon-picture"
                style="font-size: 60px; color: rgb(219, 219, 219)"
              />
              <span class="imagesNo_sp">文件库为空</span>
            </div>
            <div
              class="conters scrollbarAll"
              :style="{ maxHeight: !pictureType ? '500px' : '700px' }"
            >
              <div
                v-for="(item, index) in pictrueList.list"
                :key="index"
                class="gridPic"
              >
                <span class="num_badge" v-if="item.num > 0">{{item.num}}</span>
                <img
                  style="object-fit: contain;"
                  v-lazy="item.url ? item.url : localImg"
                  :class="item.isSelect ? 'on' : ''"
                  @click="changImage(item, index, pictrueList.list)"
                />
                <!--<video
                  :src="item.attDir"
                  :class="item.isSelect ? 'on' : ''"
                  @click="changImage(item, index, pictrueList.list)"
                  v-if="attTypeArr.video.includes(item.attType)"
                ></video>
                <img
                  style="object-fit: contain;"
                  v-lazy="localPdf"
                  :class="item.isSelect ? 'on' : ''"
                  @click="changImage(item, index, pictrueList.list)"
                  v-if="attTypeArr.pdf.includes(item.attType)"
                />
                <img
                  style="object-fit: contain;"
                  v-lazy="localWord"
                  :class="item.isSelect ? 'on' : ''"
                  @click="changImage(item, index, pictrueList.list)"
                  v-if="attTypeArr.word.includes(item.attType)"
                />
                <img
                  style="object-fit: contain;"
                  v-lazy="localExcel"
                  :class="item.isSelect ? 'on' : ''"
                  @click="changImage(item, index, pictrueList.list)"
                  v-if="attTypeArr.excel.includes(item.attType)"
                />
                <span class="file-name" :title="item.name">{{item.name}}</span>-->
              </div>
            </div>
          </div>
        </div>
        <div class="block">
          <el-pagination
            :page-sizes="!pictureType ? [10, 20, 30, 40] : [30, 60, 90, 120]"
            :page-size="tableData.limit"
            :current-page="tableData.page"
            :pager-count="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pictrueList.count"
            @size-change="handleSizeChange"
            @current-change="pageChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fileImageApi,
  fileListApi,
  fileDeleteApi,
  attachmentMoveApi,
} from "@/api/systemSetting";
import { getToken } from "@/utils/auth";
import { checkPermi } from "@/utils/permission"; // 权限判断函数
export default {
  name: "Upload",
  props: {
    pictureType: {
      type: String,
      default: "",
    },
    belongModel: {
      type: String,
      default: "0",
    },
    isMore: {
      type: String,
      default: "1",
    },
    modelName: {
      type: String,
      default: "",
    },
    checkedMore: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loadingPic: false,
      loading: false,
      modals: false,
      allTreeList: [],
      categoryProps: {
        value: "id",
        label: "name",
        children: "child",
        expandTrigger: "hover",
        checkStrictly: true,
        emitPath: false,
      },
      editPram: {
        pid: 1000,
        name: "",
        type: 2,
        sort: 1,
        status: 0,
        url: "url",
        id: 0,
      },
      visible: false,
      bizTitle: "",
      sleOptions: {
        ids: "",
        pid: "",
      },
      list: [],
      grid: {
        xl: 7,
        lg: 7,
        md: 7,
        sm: 7,
        xs: 24,
      },
      grid2: {
        xl: 17,
        lg: 17,
        md: 17,
        sm: 17,
        xs: 24,
      },
      filterText: "",
      treeData: [],
      treeData2: [],
      defaultProps: {
        children: "child",
        label: "name",
      },
      allowAccept:"image/gif,image/jpeg,image/png,image/gif,image/bmp,video/mp4,video/x-msvideo,video/x-flv,video/x-ms-wmv,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf",
      attTypeArr:{
        pic:["jpg","jpeg","gif","png","bmp","PNG","JPG"],
        video:["mp4","avi","flv","wmv"],
        pdf:["pdf","PDF"],
        word:["doc","docx","DOC","DOCX"],
        excel:["xls","xlsx","XLS","XLSX"],
      },
      tableData: {
        page: 1,
        limit: 10,
        pid: 0,
        //attType: "jpg,jpeg,gif,png,bmp,PNG,JPG",
        fileType:1,
      },
      classifyId: 0,
      myHeaders: { "X-Token": getToken() },
      treeFrom: {
        status: -1,
        type: 2,
      },
      pictrueList: {
        list: [],
        count: 0,
      },
      isShowPic: false,
      checkPicList: [],
      ids: [],
      listPram: {
        pid: 0,
        type: 2,
        status: 0,
        name: "",
        page: 1,
        limit: 9999,
      },
      localImg: "",
      localWord: require("@/assets/imgs/attr_word.png"),
      localPdf: require("@/assets/imgs/attr_pdf.png"),
      localExcel: require("@/assets/imgs/attr_excel.png"),
      videoStatus: false,
      typeDate:"pic",
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.pictureType
      ? (this.tableData.limit = 30)
      : (this.tableData.limit = 10);
    if (this.$route && this.$route.query.field === "dialog")
      import("./internal.js");
    this.getList();
    this.getFileList();
    // this.handlerGetList()
  },
  methods: {
    checkPermi,
    // 选取图片后自动回调，里面可以获取到文件
    imgSaveToUrl(event) {
      // 也可以用file
      this.localFile = event.raw; // 或者 this.localFile=file.raw

      // 转换操作可以不放到这个函数里面，
      // 因为这个函数会被多次触发，上传时触发，上传成功也触发
      let reader = new FileReader();
      reader.readAsDataURL(this.localFile); // 这里也可以直接写参数event.raw

      // 转换成功后的操作，reader.result即为转换后的DataURL ，
      // 它不需要自己定义，你可以console.integralLog(reader.result)看一下
      reader.onload = () => {
        // console.integralLog(reader.result)
      };

      /* 另外一种本地预览方法 */
      let URL = window.URL || window.webkitURL;
      this.localImg = URL.createObjectURL(event.raw);
      // 转换后的地址为 blob:http://xxx/7bf54338-74bb-47b9-9a7f-7a7093c716b5
    },
    closeModel() {
      this.$refs["editPram"].resetFields();
    },
    // 表单分类
    /*handlerGetList() {
      let datas = {
        name: "全部图片",
        id: "",
      };
      treeCategroy(this.treeFrom).then((data) => {
        this.allTreeList = data;
        this.allTreeList.unshift(datas);
      });
    },*/
    // 搜索分类
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 所有分类
    getList() {
      const data = {
        name: "全部文件",
        id: 10000,
      };

      //treeCategroyFile(this.treeFrom,this.belongModel).then((res) => {
        //this.treeData = res;
        this.treeData.unshift(data);
        this.treeData2 = [...this.treeData];
      //});
    },
    handleNodeClick(data) {
      this.checkPicList = [];
      this.tableData.pid = data.id;
      this.getFileList();
    },
    // 上传
    handleUploadForm(param) {
      const formData = new FormData();
      const data = {
        //model: this.modelName ? this.modelName : this.$route.path.split("/")[1],
        //pid: this.tableData.pid,
      };
      //0=>maintain 全部
      formData.append("file", param.file);
      //formData.append("modelName",data.model);
      //formData.append("pid",data.pid);
      let loading = this.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      //console.log(formData);return false;
      //let modelName = this.modelName ? this.modelName : this.$route.path.split("/")[1]
      fileImageApi(formData)
        .then((res) => {
        //图片上传接口 后期调用
        loading.close();
        this.$message.success("上传成功");
        this.tableData.page = 1;
        this.getFileList();
      }).catch((res) => {
        loading.close();
      });
    },
    // 文件列表
    getFileList() {
      if (this.tableData.pid === 10000) this.tableData.pid = 0;
      this.loadingPic = true;

      if(this.tableData.pid === 0) this.tableData.pid = this.belongModel;
      //let modelName = this.modelName ? this.modelName : this.$route.path.split("/")[1]
      fileListApi(this.tableData)
        .then(async (res) => {
          this.pictrueList.list = res.list;
          if (this.tableData.page === 1 && this.pictrueList.list.length > 0)
            this.pictrueList.list[0].localImg = this.localImg;
          if (this.pictrueList.list.length) {
            this.isShowPic = false;
          } else {
            this.isShowPic = true;
          }
          this.pictrueList.count = res.count;
          this.loadingPic = false;
        })
        .catch(() => {
          this.loadingPic = false;
        });
    },
    pageChange(page) {
      this.tableData.page = page;
      this.checkPicList = [];
      this.getFileList();
    },
    handleSizeChange(val) {
      this.tableData.limit = val;
      this.getFileList();
    },
    // 选中图片
    changImage(item, index, row) {
      let activeIndex = 0;
      if (!item.isSelect) {
        this.$set(item, "isSelect", true);
        this.checkPicList.push(item);
      } else {
        this.$set(item, "isSelect", !item.isSelect);
        this.checkPicList.map((el, index) => {
          if (el.id == item.id) {
            activeIndex = index;
          }
        });
        this.checkPicList.splice(activeIndex, 1);
      }
      this.ids = [];
      this.checkPicList.map((item, i) => {
        this.ids.push(item.id);
      });

      this.pictrueList.list.map((el, i) => {
        if (el.isSelect) {
          this.checkPicList.filter((el2, j) => {
            if (el.id == el2.id) {
              el.num = j + 1;
              this.$nextTick(() => {
                this.pictrueList.list;
              });
            }
          });
        } else {
          el.num = 0;
        }
      });
    },
    // 点击使用选中图片
    checkPics() {
      if (!this.checkPicList.length)return this.$message.warning("请先选择文件");
      if (this.$route && this.$route.query.field === "dialog") {
        let str = "";
        for (let i = 0; i < this.checkPicList.length; i++) {
          str += '<img src="' + this.checkPicList[i].attDir + '">';
        }
        /* eslint-disable */
        nowEditor.dialog.close(true);
        nowEditor.editor.setContent(str, true);
      } else {
        if (this.isMore === "1" && this.checkPicList.length > 1) {
          return this.$message.warning("最多只能选一个文件");
        }

        this.$emit("getImage", [...this.checkedMore, ...this.checkPicList]);
      }
    },
    //删除
    editPicList(tit) {
      if (!this.checkPicList.length)
        return this.$message.warning("请先选择文件");
      this.$modalSure().then(() => {
        let modelName = this.modelName ? this.modelName : this.$route.path.split("/")[1]
        fileDeleteApi(this.ids.join(","),modelName).then(() => {
          this.$message.success("刪除成功");
          this.getFileList();
          this.checkPicList = [];
        });
      });
    },
    // 下载
    downPicList(tit) {
      if (!this.checkPicList.length)
        return this.$message.warning("请先选择文件");
      this.$modalSure("下载该文件").then(() => {
        //fileDeleteApi(this.ids.join(",")).then(() => {
          //this.$message.success("刪除成功");
          //this.getFileList();
        this.handlerExport(this.checkPicList)
          //this.checkPicList = [];
        //});
      });
    },
    handlerExport(data) {
      let loading = this.$loading({
        lock: true,
        text: "导出中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      /*fileImageApi(formData)
        .then((res) => {*/
      //图片上传接口 后期调用
      let files = data.map(function(value,index) {
        return value['attDir'];
      })

      for(let i=0; i<files.length; i++) {
        this.downloadFile1(files[i])
      }

      loading.close();
      //this.$message.success("人员信息导出成功");
      /*})
      .catch((res) => {
        loading.close();
      });*/
    },
    downloadFile1(url) {
      const a = document.createElement('a');
      a.href = url; // 文件链接
      a.download = url; // 文件名，跨域资源download无效
      a.target = '_blank';
      a.click();
      a.remove();
    },

    // 移动分类点击
    handleSelClick(node) {
      if (this.ids.length) {
        this.sleOptions = {
          ids: this.ids.join(","),
          pid: node.id,
        };
        this.getMove();
      } else {
        this.$message.warning("请先选择文件");
      }
    },
    getMove() {
      //console.log(this.sleOptions);return false;
      let modelName = this.modelName ? this.modelName : this.$route.path.split("/")[1]
      attachmentMoveApi(this.sleOptions,modelName)
        .then(async (res) => {
          this.$message.success("操作成功");
          this.clearBoth();
          this.getFileList();
        })
        .catch((res) => {
          this.clearBoth();
        });
    },
    clearBoth() {
      this.sleOptions = {
        ids: "",
        pid: "",
      };
      this.checkPicList = [];
      this.ids = [];
    },
    radioChange(val){
      this.$set(this.tableData, "fileType", val);
      this.getFileList();

      /*switch (val){
        case '1':
          this.$set(this.tableData, "attType", "jpg,jpeg,gif,png,bmp,PNG,JPG");
          this.getFileList();
          break;
        case '2':
          this.$set(this.tableData, "attType", "mp4,avi,flv,wmv");
          this.getFileList();
          break;
        case '3':
          this.$set(this.tableData, "attType", "pdf,doc,docx,xls,xlsx,PDF,DOC,DOCX,XLS,XLSX");
          this.getFileList();
          break;
      }*/
    },
  },
};
</script>

<style scoped lang="scss">
.demo::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.demo {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
.temp {
  height: 0;
  margin-bottom: 0;
  border: none;
  padding: 0;
}
.selectTreeClass {
  background: #d5e8fc;
}
.treeBox {
  width: 100%;
  height: 100%;
}
.upload-demo {
  display: inline-block !important;
  float: left;
}
.tree_w {
  padding: 20px 30px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding-right: 8px;
  color: #4386c6;
}
.custom-tree-node-label {
  display: block;
  width: 125px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.el-ic {
  display: none;
  i,
  span {
    /*padding: 0 14px;*/
    font-size: 18px;
    font-weight: 600;
  }
  .svg-icon {
    color: #4386c6;
  }
}
.el-tree-node__content {
  height: 38px;
}
.el-tree-node__expand-icon {
  color: #428bca;
  /*padding: 10px 10px 0px 10px !important;*/
}
.el-tree-node__content:hover .el-ic {
  color: #428bca !important;
  display: inline-block;
}
.el-tree-node__content:hover {
  font-weight: bold;
}
.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content
  :hover {
  .el-tree-node__expand-icon.is-leaf {
    color: transparent;
    cursor: default;
  }
  /*background-color: #3998d9;*/
  .custom-tree-node {
    font-weight: bold;
  }
  .el-tree-node__expand-icon {
    font-weight: bold;
  }
}
.el-dialog__body {
  .upload-container .image-preview .image-preview-wrapper img {
    height: 100px;
  }
  .el-dialog .el-collapse-item__wrap {
    padding-top: 0px;
  }
  .spatial_img {
    .el-collapse-item__wrap {
      margin-bottom: 0;
      padding-top: 0px;
    }
  }
  .upload-container .image-preview .image-preview-wrapper {
    width: 120px;
  }
  .upload-container .image-preview .image-preview-action {
    line-height: 100px;
    height: 100px;
  }
}
.trees-coadd {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  .scollhide {
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 10px 0 10px 0;
    box-sizing: border-box;
    .trees {
      width: 100%;
    }
  }
  .scollhide::-webkit-scrollbar {
    display: none;
  }
}
.conters {
  display: flex;
  flex-wrap: wrap;
  /*max-height: 296px;*/
  overflow: auto;
}
.conters:after {
  content: "";
  width: 410px !important;
}
.gridPic {
  margin-right: 15px;
  margin-bottom: 40px;
  width: 110px;
  height: 110px;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  video {
    width: 100%;
    height: 100%;
    display: block;
  }
  .num_badge {
    position: absolute;
    bottom: 6px;
    right: 6px;
    display: inline-block;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #1890FF;
    font-size: 14px;
    text-align: center;
    color: #fff;
    line-height: 20px;
  }
  .file-name{
    width:100%;
    display:block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-top:5px;
  }
}
.conter {
  width: 99%;
  height: 100%;
  .bnt {
    width: 100%;
    height:50px;
    padding: 0 13px 60px 7px;
    box-sizing: border-box;
    display: flex;
  }
  .pictrueList {
    /*padding-left: 15px;*/
    width: 100%;
    el-image {
      width: 100%;
      border: 2px solid #fff;
    }
    .on {
      border: 2px solid #1890FF;
    }
  }
  .el-image {
    width: 110px;
    height: 110px;
    cursor: pointer;
  }
  .imagesNo {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 65px 0;
    .imagesNo_sp {
      font-size: 13px;
      color: #dbdbdb;
      line-height: 3;
    }
  }
}
.relative{
  position: relative;
}
.abs_video{
  position: absolute;
  right: 20px;
  top: 0;
}
</style>
