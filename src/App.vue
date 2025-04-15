<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  beforeCreate() {

  },
  mounted() {

  },
  beforeDestroy() {

  }
}
</script>

<style lang="scss">
.divBox{
  padding: 0 20px!important;
}
* {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  outline: none;
}
.edit-container{
  overflow-y: auto;
  max-height: 700px;
  padding-right: 5px;
}
.edit-container::-webkit-scrollbar-track {
  background-color: #F5F5F5
}

.edit-container::-webkit-scrollbar {
  width: 3px;
  background-color: #F5F5F5
}

.edit-container::-webkit-scrollbar-thumb {
  background-color: #d6d6d6
}
</style>
