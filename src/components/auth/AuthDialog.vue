<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-px-lg q-py-md">
      <h2 class="fn-lg fn-w-bold q-mb-none">Beam me up!</h2>
      <p class="q-my-md">
        Login with a Google Account to heart your favourite space images
      </p>
      <login-google-btn
        @authed="onDialogOK()"
        class="text-white q-my-md q-py-sm fit"
        outline
      />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { defineComponent } from 'vue';
import LoginGoogleBtn from './LoginGoogleBtn.vue';
export default defineComponent({
  components: { LoginGoogleBtn },
  setup() {
    const { dialogRef, onDialogOK } = useDialogPluginComponent();

    return { dialogRef, onDialogOK };
  },
});
</script>
