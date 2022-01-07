<template>
  <q-btn
    dark
    :label="label || 'Sign in with Google'"
    class="bg-primary text-white"
    @click="signIn"
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
  props: { label: String },
  setup() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const signIn = async () => {
      await firebase.auth().signInWithPopup(provider);
    };
    return {
      signIn,
    };
  },
});
</script>
