<template>
    <HomeTemplate :dataHome="dataHome"/>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import HomeTemplate from '../../templates/home/Home.template.vue';
const dataHome :any = reactive({
    dataDocumentCreator:{
        setDataPage:()=>{},
    }
})
</script>
<style scoped></style>