<template>
  <div class="edit-container">
    <el-form v-loading="formLoading" ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="单位名称" prop="companyName">
        <el-input
            style="width: 500px"
            placeholder="请输入名称"
            maxlength="20"
            v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="companyPhone">
        <el-input
            style="width: 500px"
            placeholder="请输入电话"
            maxlength="11"
            v-model="form.companyPhone"></el-input>
      </el-form-item>
      <el-form-item label="单价(元/m³):" prop="unitPrice">
        <el-input
            style="width: 500px"
            placeholder="单价"
            maxlength="5"
            v-model="form.unitPrice"
            @input="handleInput"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="companyAddress">{{ form.companyAddress }}
        <el-button icon="el-icon-location" size="mini" type="primary" @click="showChoosePosition=true">
          点击选择位置
        </el-button>
      </el-form-item>
<!--      <el-form-item label="支付密钥" prop="payKey">-->
<!--        <el-input-->
<!--            style="width: 500px"-->
<!--            placeholder="请输入名称"-->
<!--            maxlength="20"-->
<!--            v-model="form.payKey"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button v-loading="saveLoading" element-loading-background="rgba(0, 0, 0, 0.3)" type="primary"
                   @click="handlerSubmit" v-has-permi="['admin:units:save']">保存
        </el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-if="showChoosePosition" :close-on-click-modal="false" :close-on-press-escape="false"
               :destroy-on-close="true"
               :visible.sync="showChoosePosition" append-to-body title="选择位置" top="5vh"
               width="40%">
      <iframe v-if="showChoosePosition" id="choosePosition" frameborder=0
              src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=ZILBZ-FEDCL-6M3PO-M7GUW-PXP5T-ABFB4&referer=零工超市"
              style="width: 100%;height: 500px">
      </iframe>
      <span slot="footer" class="dialog-footer">
            <el-button class="primary" type="primary" @click="showChoosePosition = false">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script>
import {detail, save} from "@/api/units";
import {getForm} from "@/utils/utils";

export default {
  components: {},
  props: {
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
        companyName: '',
        companyPhone: '',
        companyAddress: '',
        unitPrice: 0,
        latitude: '',
        longitude: '',
        payKey: '',
      },
      rules: {
        companyName: [{required: true, message: '请输入', trigger: ['blur']}],
        companyPhone: [{required: true, message: '请输入', trigger: ['blur']}],
        companyAddress: [{required: true, message: '请输入', trigger: ['blur']}],
        unitPrice: [{required: true, message: '请输入', trigger: ['blur']}],
        // payKey: [{required: true, message: '请输入', trigger: ['blur']}],
      },
      keyUrl: '',
      roles: [],
      showChoosePosition: false,
      saveLoading: false,
      formLoading: false,
      uploads: {
        show: false,
        multiple: true,
      }
    }
  },
  mounted() {
    if (this.editData) {
      this.getDetail();
    }
    window.addEventListener('message', (event) => {
      // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
      let loc = event.data;
      if (loc && loc.module === 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        this.form.latitude = loc.latlng.lat;
        this.form.longitude = loc.latlng.lng;
        this.form.companyAddress = loc.poiaddress
      }
    }, false);
  },
  methods: {
    handleInput(value) {
      // 使用正则限制输入，只允许数字和小数点，保留最多一个小数点
      const validValue = value.replace(/[^\d.]/g, '').replace(/(\..*?)\..*/g, '$1');
      // 限制小数点后的最多两位数字
      const formattedValue = validValue.replace(/^(\d*\.\d{0,2}).*$/, '$1');
      this.form.unitPrice = formattedValue;
    },
    getDetail() {
      this.form = this.editData
    },
    handlerSubmit() {
      if (this.saveLoading || this.formLoading) {
        return;
      }
      this.$refs.form.validate(valid => {
        if (!valid) return;
        this.saveLoading = true;
        save(this.form).then(() => {
          this.$message.success('保存成功');
          this.close();
        }).finally(() => {
          this.saveLoading = false
        })
      })
    },
    close() {
      this.$emit('hideEditDialog')
    }
  }
}
</script>
