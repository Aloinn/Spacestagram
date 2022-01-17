<template>
  <div v-if="userAuth">
    <div class="row justify-between items-center q-my-md">
      <div class="fn-lg fn-w-light q-mb-none text-primary">
        Hi {{ userAuth.displayName }}
      </div>
      <div class="row q-gutter-x-sm items-center">
        <q-avatar size="40px"><q-img :src="userAuth.photoURL" /></q-avatar>
        <logout-google-btn class="text-white q-my-none" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useFirebaseUser } from 'src/util/firebase-auth';
import LogoutGoogleBtn from './LogoutGoogleBtn.vue';
// import LoginGoogleBtn from './LoginGoogleBtn.vue';

export default defineComponent({
  components: { LogoutGoogleBtn },
  setup() {
    const userAuth = useFirebaseUser();

    return { userAuth };
  },
});
</script>
