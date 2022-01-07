<template>
  <q-page class="q-mt-md fn-md">
    <div class="container q-mx-auto">
      <auth-prompt />
      <nasa-feed />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useFirebaseUser } from 'src/util/firebase-auth';

import AuthPrompt from 'src/components/auth/AuthPrompt.vue';
import NasaFeed from 'src/components/nasa/NasaFeed.vue';

export default defineComponent({
  components: {
    AuthPrompt,
    NasaFeed,
  },
  name: 'HomePage',
  setup() {
    const userAuth = useFirebaseUser();

    return { userAuth };
  },
});
</script>
