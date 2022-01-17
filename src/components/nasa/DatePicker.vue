<template>
  <div style="max-width: 300px">
    <q-input filled v-model="content" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="content">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
export default defineComponent({
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const content = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
      },
    });

    return { content };
  },
});
</script>
