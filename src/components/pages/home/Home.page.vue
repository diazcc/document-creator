<template>
    <HomeTemplate :dataHome="dataHome" />
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import HomeTemplate from '../../templates/home/Home.template.vue';
const dataHome: any = reactive({
    dataDocumentCreator: {
        setDataPage: () => { },
        dataDraggableBox: [
            {
                name: 'Sofia',
                email: 'sofia@example.com',
                type: 'img',
                content__img: {
                    base64: 'image_base64_5'
                },
                position: {
                    top: 0,
                    left: 0,
                },
                page: '5',
                width: 197.59,
                height: 60.8
            },
            {
                name: 'aaa',
                email: 'aaaa@sss.com',
                type: 'img',
                content__img: {
                    base64: 'image_base64_5'
                },
                position: {
                    top: 0,
                    left: 0,
                },
                page: '5',
                width: 197.59,
                height: 60.8
            },
        ]
    },
})
</script>
<style scoped></style>