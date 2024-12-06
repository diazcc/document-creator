<template>
    <HomeTemplate :dataHome="dataHome" />
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, Ref } from 'vue';
import HomeTemplate from '../../templates/home/Home.template.vue';
const urlPdf: any = ref();
const signs: Ref<any[]> = ref([]);
const dataHome: any = reactive({
    signs: [],
    addNewSign: () => {
        addNewSign();
    },
    dataPdfViewer: {
        urlPdf: urlPdf.value,
        toolbar: {
            toolbar: false
        },
        onClose: () => {

        }
    }
});

onMounted(() => {
    addNewSign();
})



function addNewSign() {
    console.log('hola');
    dataHome.signs.push({
        signatorEmail: '', //Flujo de firmante o destinatario
        config: {
            canSign: false,
            canDraw: true,
            canMove: false,
            canRotate: false,
            canDefineSign: false,
            canDuplicate: false,
            canDelete: false,
            canResize: false,
        },
        data: {
            userEmail: '@email',
            width: 200,
            height: 65,
            imgUserSign: 'base:64 / url',
            userName: 'base:64 / url',
            imgDraw: 'base:64 / url',
            rotation: 0,
            position: {
                x: 200,
                y: 200
            },
        },
        typeOfSign: 'name',
        state: 'free'

    })
    console.log(dataHome.signs);
}


const dataDocumentCreator = {
    positionator: true,
    users: [
        {
            name: 'Andres Felipe',
            email: 'adiaz@suntic.co',
            graph: 'base:64',
            img: 'base:64'
        },
        {
            name: 'Luis Gerdez',
            email: 'lgerdex@suntic.co',
            graph: 'base:64',
            img: 'base:64'
        },

    ],
    signs: [
        {
            signatorEmail: 'adiaz@suntic.co', //Flujo de firmante o destinatario
            config: {
                canSign: false,
                canDraw: true,
                canMove: false,
                canRotate: false,
                canDefineSign: false,
                canDuplicate: false,
                canDelete: false,
                canResize: false,
            },
            data: {
                userEmail: '@email',
                width: 200,
                height: 65,
                imgUserSign: 'base:64 / url',
                userName: 'base:64 / url',
                imgDraw: 'base:64 / url',
                rotation: 0,
                position: {
                    x: 200,
                    y: 200
                },
            },
            typeOfSign: 'name',
            state: 'free'

        },
        {
            signatorEmail: 'adiaz@suntic.co',//2  FIRMA DE ANDRES 
            config: {
                canSign: false,
                canDraw: true,
                canMove: false,
                canRotate: false,
                canDefineSign: false,
                canDuplicate: false,
                canDelete: false,
                canResize: false,
            },
            data: {
                userEmail: '@email',
                width: 200,
                height: 65,
                imgUserSign: 'base:64 / url',
                userName: 'base:64 / url',
                imgDraw: 'base:64 / url',
                rotation: 0,
                position: {
                    x: 200,
                    y: 200
                },
            },
            typeOfSign: 'name',
            state: 'free'

        },
        {
            signatorEmail: 'lgerdex@suntic.co', //1 FIRMA DE LUIS
            config: {
                canSign: false,
                canDraw: true,
                canMove: false,
                canRotate: false,
                canDefineSign: false,
                canDuplicate: false,
                canDelete: false,
                canResize: false,
            },
            data: {
                userEmail: '@email',
                width: 200,
                height: 65,
                imgUserSign: 'base:64 / url',
                userName: 'base:64 / url',
                imgDraw: 'base:64 / url',
                rotation: 0,
                position: {
                    x: 200,
                    y: 200
                },
            },
            typeOfSign: 'name',
            state: 'free'

        }
    ]
}
</script>
<style scoped></style>