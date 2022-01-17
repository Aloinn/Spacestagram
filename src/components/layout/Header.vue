<template>
  <q-toolbar class="container q-mx-auto q-pt-lg">
    <div class="row fit justify-center">
      <div class="col-none col-md row items-center">
        <div class="fn-xl">&#128640;</div>
        <div>
          <h1 class="fn-xl fn-w-bold q-my-none q-mb-sm">Spacestagram</h1>
          <div class="fn-w-light text-grey-6">Thank you NASA Image API!</div>
        </div>
      </div>
      <q-space class="gt-md" />

      <div class="text-right fn-sm col-md col-12 q-mt-md-none q-mt-md">
        <div class="fn-w-light">Shopify Frontend Developer Application</div>
        <div>
          <a class="fn-w-bold text-primary" href="https://www.aloinn.com/#/"
            >Alain Nguyen</a
          >, Summer 2022
        </div>
        <a
          class="fn-w-light text-primary no-underline"
          href="https://github.com/Aloinn/shopify-frontend"
        >
          <q-chip class="q-mx-none">
            <span>Github Repo</span>
            <q-icon name="ion-logo-github" class="q-ml-sm" size="sm" />
          </q-chip>
        </a>
      </div>
    </div>
  </q-toolbar>
</template>

<style lang="scss" scoped>
.no-underline {
  text-decoration: none;
}
.no-underline::hover {
  text-decoration: none !important;
}
</style>
<script>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
