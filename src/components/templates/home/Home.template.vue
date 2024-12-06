<template>
    <main class="home">
        <section class="home__wrapper">
            <section  class="home__wrapper__signs">
                <button @click="props.dataHome.addNewSign">
                    Agregar
                </button>
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
    </main>
</template>
<script setup lang="ts">
import FooterOrganism from '../../organims/footer/Footer.organism.vue';
import HeaderOrganism from '../../organims/header/Header.organism.vue'; 
import DraggableBox from '../../molecules/draggable/DraggableBox.molecule.vue';
import BoxSign from '../../molecules/box-sign/BoxSign.molecule.vue';
const props: any = defineProps(['dataHome'])



function addNew(){
    props.dataHome.dataKonva.addSquare();
}
</script>
<style scoped src="./Home.template.scss">

</style>