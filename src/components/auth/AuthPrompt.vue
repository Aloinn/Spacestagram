<template>
  <div v-if="userAuth">
    <div class="row justify-between">
      <div class="fn-lg fn-w-light q-mb-none text-primary">
        Welcome {{ userAuth.displayName }}
      </div>
      <div class="row q-gutter-x-sm">
        <q-avatar size="40px"><q-img :src="userAuth.photoURL" /></q-avatar>
        <logout-google-btn class="text-white q-my-none" />
      </div>
    </div>
    <slot />
  </div>
  <div class="q-pa-lg" v-else>
    <h2 class="fn-lg fn-w-bold q-mb-none">Welcome to Astronomical!</h2>
    <p class="q-my-md">Login with a Google Account load your store</p>
    <login-google-btn class="text-white q-my-md" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LoginGoogleBtn from 'src/components/auth/LoginGoogleBtn.vue';
import { useFirebaseUser } from 'src/util/firebase-auth';
import LogoutGoogleBtn from './LogoutGoogleBtn.vue';

export default defineComponent({
  components: { LoginGoogleBtn, LogoutGoogleBtn },
  setup() {
    const userAuth = useFirebaseUser();

    return { userAuth };
  },
});
</script>
