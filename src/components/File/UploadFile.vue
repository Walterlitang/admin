<template>
  <file :multiple="multiple" @chooseFile="chooseFile" :use="'choose'"></file>
</template>
<script>
export default {
  components:{},
  props:{
    multiple:{
      default:false,
    }
  },
  methods:{
    chooseFile(fileList){
      this.$emit('getFile',fileList)
    }
  },
  data(){
    return{

    }
  }
}
</script>
