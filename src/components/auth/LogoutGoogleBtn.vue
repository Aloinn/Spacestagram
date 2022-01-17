<template>
  <q-btn
    flat
    :label="label || 'Sign out'"
    class="bg-primary text-white"
    @click="signOut"
    clickable
    v-bind="$attrs"
  />
</template>
<style scoped lang="scss"></style>

<script lang="ts">
import { defineComponent } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default defineComponent({
  name: 'AuthGmailConnect',
  props: { label: String },
  setup() {
    const signOut = async () => {
      await firebase.auth().signOut();
    };
    return {
      signOut,
    };
  },
});
</script>
