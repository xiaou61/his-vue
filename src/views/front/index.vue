
<template>
  <div>
    index
    <h3>{{msg}}</h3>
  </div>
  <p>
    <el-button type="primary" @click="changeMsg">Primary</el-button>
  </p>
  <p><svg-icon name="assurance_fill" class="icon-svg" /></p>
</template>

<script lang="ts" setup>


import { ref,Ref } from 'vue';


import SvgIcon from "../../components/SvgIcon.vue";

let msg:Ref<string> = ref('hello world');

const changeMsg = () => {
  msg.value='你好世界'
}
</script>

<style scoped>

</style>
