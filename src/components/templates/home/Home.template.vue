<template>
    <main class="home">
        <HeaderOrganism />
        <section class="home__wrapper">
            <DocumentCreatorOrganism :data-document-creator="dataHome.dataDocumentCreator"/>
        </section>
        <FooterOrganism />
    </main>
</template>
<script setup lang="ts">
import FooterOrganism from '../../organims/footer/Footer.organism.vue';
import HeaderOrganism from '../../organims/header/Header.organism.vue';
import DocumentCreatorOrganism from '../../organims/document-creator/DocumentCreator.organism.vue';
const props :any = defineProps(['dataHome'])
</script>
<style scoped src="./Home.template.scss"></style>