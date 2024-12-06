<template>
    <main class="home">
        <section class="home__wrapper">
            <section  class="home__wrapper__signs">
                <BoxSign  v-for="(boxSing,index) in dataHome.signs" :dataBoxSign="boxSing"/>
            </section>
            <ul class="home__wrapper__document ">
                <li class="home__wrapper__document__square ">
                    pagina
                </li>
                <li class="home__wrapper__document__square ">
                    pagina
                </li>
                <li class="home__wrapper__document__square ">
                    pagina
                </li>
                <li class="home__wrapper__document__square ">
                    pagina
                </li>
            </ul>
        </section>
    <PdfViewerAtom :dataPdfViewer="dataHome.dataPdfViewer"/>
    </main>
</template>
<script setup lang="ts">
import BoxSign from '../../molecules/box-sign/BoxSign.molecule.vue';
import PdfViewerAtom from '../../atoms/pdf-viewer/PdfViewer.atom.vue';
const props: any = defineProps(['dataHome'])



function addNew(){
    props.dataHome.dataKonva.addSquare();
}
</script>
<style scoped src="./Home.template.scss">

</style>