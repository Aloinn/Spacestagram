<template>
  <div>
    <q-infinite-scroll @load="loadNasaInfo">
      <div class="row q-col-gutter-x-lg">
        <div class="column col-md-6 q-gutter-y-lg col-12">
          <nasa-card v-for="info in leftRow" :key="info.date" :info="info" />
        </div>
        <div class="column col-6 q-gutter-y-lg gt-sm">
          <nasa-card v-for="info in rightRow" :key="info.date" :info="info" />
        </div>
      </div>
    </q-infinite-scroll>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border-radius: 20px;
}
.video {
  min-height: 400px;
  max-height: 00px;
  height: 60vw;
}
</style>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, computed } from 'vue';
import NasaCard from './NasaCard.vue';
import { DailyData, Response } from '../models';
import { useQuasar } from 'quasar';

export default defineComponent({
  components: { NasaCard },
  setup() {
    const nasaInfo = ref<DailyData[]>([]);

    const todayPolarity = new Date().getDate() % 2;

    const nDaysAgo = (days: number) => {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return date.toISOString().split('T')[0];
    };

    const loadNasaInfo = async (index: number, done: () => void) => {
      const response: Response = await axios.get(
        `https://api.nasa.gov/planetary/apod?date=${nDaysAgo(
          index
        )}&api_key=n456AUusbyyIwzzavMoVnUhpzb77qx4TTKKTt0cS`
      );
      nasaInfo.value.push(response.data);
      done();
    };
    const $q = useQuasar();
    const leftRow = computed(() =>
      $q.screen.lt.md
        ? nasaInfo.value
        : nasaInfo.value.filter((_, i) => i % 2 == 0)
    );
    const rightRow = computed(() =>
      nasaInfo.value.filter((_, i) => i % 2 == 1)
    );

    return { nasaInfo, loadNasaInfo, todayPolarity, leftRow, rightRow };
  },
});
</script>
