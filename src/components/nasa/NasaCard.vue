<template>
  <article v-if="info">
    <q-card flat bordered class="rounded-borders">
      <img
        v-if="info.media_type == 'image'"
        :alt="info.title"
        :src="info.url"
      />
      <div v-else>
        <iframe
          :alt="info.title"
          class="fit video"
          :src="info.url"
          frameborder="0"
        />
      </div>

      <q-card-section>
        <div class="q-pa-md">
          <h2 class="fn-w-bold fn-lg q-mb-none q-mt-md">
            {{ info.title }}
          </h2>
          <time :datetime="info.date" class="fn-w-light text-grey-6 fn-sm">
            {{ info.date.replace(/-/gi, '/') }}
          </time>
          <p class="q-mt-md fn-sm">
            {{ info.explanation }}
          </p>
        </div>
      </q-card-section>
    </q-card>
  </article>
</template>
<style scoped lang="scss"></style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import 'firebase/auth';
import { DailyData } from '../models';

export default defineComponent({
  props: { info: Object as PropType<DailyData> },
  setup() {
    return;
  },
});
</script>
