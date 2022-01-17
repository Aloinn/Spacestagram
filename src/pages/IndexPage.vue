<template>
  <q-page class="q-mt-md fn-md">
    <div class="container q-mx-auto">
      <auth-header />
      <nasa-feed />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useFirebaseUser } from 'src/util/firebase-auth';

import AuthHeader from 'src/components/auth/AuthHeader.vue';
import NasaFeed from 'src/components/nasa/NasaFeed.vue';

export default defineComponent({
  components: {
    AuthHeader,
    NasaFeed,
  },
  name: 'HomePage',
  setup() {
    const userAuth = useFirebaseUser();

    return { userAuth };
  },
});
</script>
