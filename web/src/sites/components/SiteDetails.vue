<template>
  <v-card>
    <v-toolbar color="pink" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title v-if="site">Site</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>create</v-icon>
      </v-btn>
    </v-toolbar>
    <span class="headline" v-if="site" v-text="site.Name"></span>
  </v-card>
</template>

<style>

</style>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Site } from "../site";

@Component({
  props: {
    site: Object as () => Site
  }
})
export default class SiteDetails extends Vue {
}
</script>