
<template>
  <div>
    index
    <h3>{{msg}}</h3>
  </div>
  <p>
    <el-button type="primary" @click="changeMsg">Primary</el-button>
  </p>
</template>

<script lang="ts" setup>


import { ref,Ref } from 'vue';


let msg:Ref<string> = ref('hello world');

const changeMsg = () => {
  msg.value='你好世界'
}
</script>

<style scoped>

</style>
