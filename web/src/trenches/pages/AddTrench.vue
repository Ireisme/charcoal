<template>
  <v-layout justify-center style="height: 100%">
    <v-flex xs12 md6>
      <v-card>
        <v-toolbar color="pink" dark>
          <v-toolbar-title>Add Trench</v-toolbar-title>
        </v-toolbar>
        <v-layout justify-center>
          <v-flex xs6 ma-2>
            <trench-form v-bind:on-submit="submit" v-bind:on-cancel="back"></trench-form>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TrenchService } from "./../trench-service";

import { Guid } from "guid-typescript";

import TrenchForm from "../components/TrenchForm.vue";

import { AddTrenchAction } from "../store/action-types";
import { Trench } from "./../trench";

@Component({
  components: { TrenchForm }
})
export default class AddTrench extends Vue {
  submit(name: string) {
    let siteId = Guid.parse(this.$route.params.siteId);

    this.$store.dispatch(
      new AddTrenchAction(new Trench(Guid.create(), siteId, name))
    );
    this.$router.push("../view");
  }

  back() {
    this.$router.push("../view");
  }
}
</script>
