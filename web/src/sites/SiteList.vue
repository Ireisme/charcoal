<template>
  <v-layout justify-center style="height: 100%">
    <v-flex xs12 sm8>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="site in sites" :key="site.ID" xs-6>
            <v-card hover style="min-width: 250px">
              <v-img :src="site.ImageURL" height="200px">
                <v-container fill-height fluid pa-2>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text site-name" v-text="site.Name"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-card>
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
</style>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SiteService } from "./site-service";
import { Site } from "./site";

@Component
export default class SiteList extends Vue {

  get sites () { return this.$store.state.sites; }
}
</script>