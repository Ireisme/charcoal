<template>
  <v-layout justify-center style="height: 100%">
    <v-flex xs12 sm8>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="site in sites" :key="site.ID.toString()" xs-6>
            <site-item v-bind:site="site"></site-item>
          </v-flex>
        </v-layout>
      </v-container>
      <router-link :to="{name: 'add-site'}">
        <v-btn color="pink" dark fixed bottom right fab>
          <v-icon>add</v-icon>
        </v-btn>
      </router-link>
    </v-flex>
  </v-layout>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { SiteService } from "../site-service";
import { Site } from "../site";
import SiteItem from "../components/SiteItem.vue";

@Component({
  components: { SiteItem }
})
export default class SiteList extends Vue {
  get sites() {
    return this.$store.getters.listSites;
  }
}
</script>