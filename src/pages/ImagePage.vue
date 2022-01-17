<template>
  <q-page class="q-mt-md fn-md">
    <div class="container q-mx-auto">
      <auth-header />
      <nasa-card-big :info="nasaInfo" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AuthHeader from 'src/components/auth/AuthHeader.vue';
import NasaCardBig from 'src/components/nasa/NasaCardBig.vue';
import { DailyData } from 'src/components/models';
import axios from 'axios';

export default defineComponent({
  components: {
    AuthHeader,
    NasaCardBig,
  },
  name: 'ImagePage',
  props: { date: String },
  setup(props) {
    const nasaInfo = ref<DailyData>();
    void (async () => {
      nasaInfo.value = await axios.get(
        `https://api.nasa.gov/planetary/apod?date=${props.date}&api_key=n456AUusbyyIwzzavMoVnUhpzb77qx4TTKKTt0cS`
      );
    });

    return { nasaInfo };
  },
});
</script>
