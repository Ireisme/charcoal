<template>
  <div style="background-image: url(https://upload.wikimedia.org/wikipedia/commons/6/6f/%C3%87atalh%C3%B6y%C3%BCk_after_the_first_excavations_by_James_Mellaart_and_his_team..jpg); background-size: 100% 100%; height: 100%">
    <v-layout row justify-end class="ma-3">
      <v-btn v-on:click="login" color="indigo">Login</v-btn>
    </v-layout>
    <v-layout row align-center justify-center>
      <h2 class="display-4 font-weight-black" style="margin-top: 200px">charcoal</h2>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Landing extends Vue {
  login() {
    this.$auth.login();
  }
}
</script>
