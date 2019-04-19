<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex sm12 md8>
        <v-card>
          <v-toolbar color="pink" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Trenches</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <router-link :to="{name: 'add-trench'}">
              <v-btn icon>
                <v-icon>add</v-icon>
              </v-btn>
            </router-link>
          </v-toolbar>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex v-for="trench in trenches" :key="trench.ID.toString()" xs4>
                <v-card style="height: 150px" text-center>
                  <v-container fill-height fluid pa-2>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text site-name" v-text="trench.Name"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex sm12 md4>
        <site-details v-bind:site="site"></site-details>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Guid } from "guid-typescript";

import { Site } from "./../../site";
import { Trench } from "../../../trenches/trench";
import { GetTrenchesBySiteAction } from "../../../trenches/store/action-types";
import SiteDetails from "../../components/SiteDetails.vue";

@Component({
  components: { SiteDetails }
})
export default class ViewSite extends Vue {
  created() {
    this.$store.dispatch(
      new GetTrenchesBySiteAction(Guid.parse(this.$route.params.siteId))
    );
  }

  get site(): Site {
    return this.$store.getters.getSiteById(this.$route.params.siteId);
  }

  get trenches(): Trench[] {
    return this.site ? this.$store.getters.getTrenchesBySite(this.site.ID) : [];
  }
}
</script>
