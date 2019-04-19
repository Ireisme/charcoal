<template>
  <v-layout justify-center style="height: 100%">
    <v-flex xs12 md6>
      <v-card>
        <v-toolbar color="pink" dark>
          <v-toolbar-title>Add Site</v-toolbar-title>
        </v-toolbar>
        <v-layout justify-center>
          <v-flex xs6 ma-2>
            <site-form v-bind:on-submit="submit" v-bind:on-cancel="back"></site-form>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SiteService } from "./../site-service";

import { Guid } from "guid-typescript";

import SiteForm from "../components/SiteForm.vue";

import { AddSiteAction } from "../store/action-types";
import { Site } from "./../site";

@Component({
  components: { SiteForm }
})
export default class AddSite extends Vue {
  submit(name: string, imageUrl: string) {
    this.$store.dispatch(
      new AddSiteAction(new Site(Guid.create(), name, imageUrl))
    );
    this.$router.push('list');
  }

  back() {
    this.$router.push('list');
  }
}
</script>
