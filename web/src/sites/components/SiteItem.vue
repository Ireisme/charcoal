<template>
  <v-card hover style="min-width: 250px">
    <router-link :to="{name: 'view-site', params: { siteId: site.ID.toString() }}">
      <v-img :src="site.ImageURL" height="200px">
        <v-container fill-height fluid pa-2>
          <v-layout fill-height wrap>
            <v-flex xs12 align-end flexbox>
              <span class="headline white--text site-name" v-text="site.Name"></span>
            </v-flex>
            <v-flex xs12>
            <slot></slot>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
    </router-link>
  </v-card>
</template>

<style>
.site-name {
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
a {
  text-decoration: none;
}
</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Site } from "../site";

@Component({
  props: {
    site: Object as () => Site
  }
})
export default class SiteItem extends Vue {}
</script>