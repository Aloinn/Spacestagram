<template>
  <q-layout view="lhh lpr fff">
    <Header />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from 'src/components/layout/Header.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Header,
  },
});
</script>

<style lang="scss"></style>
