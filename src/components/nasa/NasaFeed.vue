<template>
  <div>
    <div class="row justify-end q-mt-md">
      <date-picker v-model="todayString" />
    </div>
    <q-infinite-scroll
      :offset="700"
      ref="infiniteScroll"
      @load="loadNasaInfo"
      v-if="todayString"
    >
      <div class="row q-col-gutter-x-lg scroll">
        <div class="column col-md-6 q-gutter-y-lg col-12">
          <nasa-card v-for="info in leftRow" :key="info.date" :info="info" />
        </div>
        <div class="column col-6 q-gutter-y-lg gt-sm">
          <nasa-card v-for="info in rightRow" :key="info.date" :info="info" />
        </div>
      </div>
    </q-infinite-scroll>
    <div class="row justify-center">
      <q-card flat bordered class="fit" v-if="invalidDate">
        <q-card-section>
          <h2 class="fn-lg fn-w-bold q-my-none q-my-sm">Invalid date!</h2>
          <p>
            The selected date is either invalid or in the future. Please select
            another date
          </p>
        </q-card-section></q-card
      >
      <q-spinner v-else size="50px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border-radius: 20px;
}
</style>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, computed } from 'vue';
import NasaCard from './NasaCard.vue';
import { DailyData, Response } from '../models';
import DatePicker from './DatePicker.vue';
import { QInfiniteScroll, useQuasar } from 'quasar';

export default defineComponent({
  components: { NasaCard, DatePicker },
  setup() {
    const nasaInfo = ref<DailyData[]>([]);
    const infiniteScroll = ref<QInfiniteScroll>(null);
    const invalidDate = ref<boolean>(false);

    const _todayString = ref<string>(
      new Date().toISOString().split('T')[0].replace(/-/gi, '/')
    );
    const todayString = computed({
      get: () => _todayString.value,
      set: (value) => {
        _todayString.value = value;
        if (Date.parse(value) == NaN || Date.parse(value) > Date.now()) {
          console.log('invalid');
          nasaInfo.value = [];
          invalidDate.value = true;
          infiniteScroll.value.stop();
          return;
        }
        invalidDate.value = false;
        nasaInfo.value = [];
        infiniteScroll.value.reset();
        infiniteScroll.value.resume();
        infiniteScroll.value.trigger();
      },
    });

    const today = computed<Date>(() => {
      const todayUnix = Date.parse(todayString.value);
      return todayUnix == NaN ? null : new Date(todayUnix);
    });
    // const todayPolarity = computed(() => today.value.getDate() % 2);

    const nDaysAgo = (days: number) => {
      const date = new Date(today.value);
      date.setDate(date.getDate() - days + 1);
      return date.toISOString().split('T')[0];
    };

    const loadNasaInfo = async (index: number, done: () => void) => {
      console.log(nDaysAgo(index));
      const response: Response = await axios.get(
        `https://api.nasa.gov/planetary/apod?date=${nDaysAgo(
          index
        )}&api_key=yKXLPMsNGHVd1mboSKerxFqp8v4cfraE4nJdmdQM` //13W3X6E2ESXFbqmxlecGR7b7MY1rHUZ2imRKG6i3` //yKXLPMsNGHVd1mboSKerxFqp8v4cfraE4nJdmdQM` //n456AUusbyyIwzzavMoVnUhpzb77qx4TTKKTt0cS`
      );
      // const response = {
      //   data: {
      //     copyright: 'T',
      //     date: '2001-09-09',
      //     explanation: 'asd',
      //     media_type: 'image' as 'image' | 'video',
      //     hdurl:
      //       'https://apod.nasa.gov/apod/image/2201/thundercloud_dyer_2000.jpg',
      //     url: 'https://apod.nasa.gov/apod/image/2201/thundercloud_dyer_2000.jpg',
      //     title: 'ASD',
      //   },
      // };

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

    return {
      today,
      nasaInfo,
      loadNasaInfo,
      // todayPolarity,
      leftRow,
      rightRow,
      todayString,
      infiniteScroll,
      invalidDate,
    };
  },
});
</script>
