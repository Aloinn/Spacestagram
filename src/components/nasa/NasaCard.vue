<template>
  <article
    v-if="info"
    :class="date ? '' : 'cursor-pointer'"
    @click="date ? '' : reroute(info?.date)"
  >
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
              @click.stop="like"
              outline
              :icon-right="liked ? 'favorite' : 'favorite_border'"
              color="pink"
              size="md"
              ><div class="fn-sm fn-w-light q-mr-sm" v-if="likes.length">
                {{ likes.length }}
              </div>
            </q-btn>
            <q-btn
              outline
              @click.stop="share"
              icon="share"
              color="primary"
              size="md"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </article>
</template>
<style scoped lang="scss">
.video {
  min-height: 600px;
  max-height: 00px;
  height: 60vw;
}
</style>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { DailyData, Post } from '../models';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { useFirebaseUser } from 'src/util/firebase-auth';
import AuthDialog from '../auth/AuthDialog.vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import useClipboard from 'vue-clipboard3';

export default defineComponent({
  props: { info: Object as PropType<DailyData>, date: String },
  setup(props) {
    const db = firebase.firestore();
    const likes = ref<string[]>([]);
    const postRef = db
      .collection('likes')
      .doc(`${props?.info?.date || props.date}`);
    postRef.onSnapshot((snap) => {
      likes.value = (snap.data() as Post)?.likes ?? [];
    });
    const userAuth = useFirebaseUser();

    const $q = useQuasar();

    const share = () => {
      const hook = useClipboard();
      void hook.toClipboard(
        `https://aloinn.github.io/Spacestagram-page/images/${
          props?.info?.date || props.date
        }`
      );
      $q.dialog({
        title: 'Link copied!',
        message: 'You can send this space image to your friends now!',
      });
    };
    const like = async () => {
      if (!userAuth?.value) {
        $q.dialog({
          component: AuthDialog,
        });
        return;
      }

      await postRef.set(
        {
          likes: likes.value?.includes(userAuth?.value?.uid || '')
            ? firebase.firestore.FieldValue.arrayRemove(userAuth?.value?.uid)
            : firebase.firestore.FieldValue.arrayUnion(userAuth?.value?.uid),
        },
        { merge: true }
      );
    };
    const liked = computed(
      () => likes?.value?.includes(userAuth?.value?.uid || 'ANON') ?? false
    );

    const router = useRouter();
    const reroute = (date: string) => {
      void router.push(`/images/${date}`);
    };

    return { like, likes, liked, share, reroute, userAuth };
  },
});
</script>
