<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile @click.stop router :to="{name: 'site-list'}">
          <v-list-tile-action>
            <v-icon>place</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sites</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Charcoal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-on:click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GetSitesAction } from "../sites/store/action-types";

@Component
export default class Home extends Vue {
  drawer: boolean = false;

  created() {
    this.$store.dispatch(new GetSitesAction());
  }

  logout() {
    this.$auth.logOut();
  }
}
</script>
