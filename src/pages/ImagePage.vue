<template>
  <q-page class="q-mt-md fn-md">
    <div class="container q-mx-auto q-mt-xl">
      <auth-header />
      <nasa-card :info="nasaInfo" :date="imageId" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AuthHeader from 'src/components/auth/AuthHeader.vue';
import NasaCard from 'src/components/nasa/NasaCard.vue';
import { DailyData } from 'src/components/models';
import axios from 'axios';

export default defineComponent({
  components: {
    AuthHeader,
    NasaCard,
  },
  name: 'ImagePage',
  props: { imageId: String },
  setup(props) {
    const nasaInfo = ref<DailyData>();
    void (async () => {
      const res = await axios.get(
        `https://api.nasa.gov/planetary/apod?date=${props.imageId}&api_key=n456AUusbyyIwzzavMoVnUhpzb77qx4TTKKTt0cS`
      );
      nasaInfo.value = res.data as DailyData;
    })();

    return { nasaInfo };
  },
});
</script>
