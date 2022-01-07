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
          <div class="row q-gutter-sm justify-end">
            <q-btn
              @click="like"
              outline
              :icon-right="liked ? 'favorite' : 'favorite_border'"
              color="pink"
              size="md"
              ><div class="fn-sm fn-w-light q-mr-sm" v-if="likes.length">
                {{ likes.length }}
              </div>
            </q-btn>
            <q-btn outline icon="share" color="primary" size="md" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </article>
</template>
<style scoped lang="scss"></style>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import 'firebase/auth';
import { DailyData } from '../models';
import firebase from 'firebase';
import 'firebase/firestore';
import { useFirebaseUser } from 'src/util/firebase-auth';

interface Post {
  likes: string[];
}

export default defineComponent({
  props: { info: Object as PropType<DailyData> },
  setup(props) {
    const db = firebase.firestore();
    const likes = ref<string[]>([]);
    const postRef = db.collection('likes').doc(`${props?.info?.date || ''}`);
    postRef.onSnapshot((snap) => {
      likes.value = (snap.data() as unknown as Post).likes;
    });
    const userAuth = useFirebaseUser();
    const like = async () => {
      await postRef.set(
        {
          likes: likes.value?.includes(userAuth?.value?.uid || '')
            ? firebase.firestore.FieldValue.arrayRemove(
                userAuth?.value?.uid || 'ANON'
              )
            : firebase.firestore.FieldValue.arrayUnion(
                userAuth?.value?.uid || 'ANON'
              ),
        },
        { merge: true }
      );
    };
    const liked = computed(
      () => likes?.value?.includes(userAuth?.value?.uid || 'ANON') ?? false
    );
    return { like, likes, liked, userAuth };
  },
});
</script>
