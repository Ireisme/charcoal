<template>
  <v-layout justify-center style="height: 100%">
    <v-flex xs12 md4 sm6>
      <form>
        <v-text-field
          v-model="siteName"
          :error-messages="nameErrors"
          label="Name"
          required
          @input="validateName"
        ></v-text-field>
        <v-text-field
          v-model="imageUrl"
          :error-messages="imageUrlErrors"
          label="Image"
          required
          @input="validateImageUrl"
        ></v-text-field>

        <v-btn @click="submit">submit</v-btn>
        <v-btn @click="back">back</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SiteService } from "./site-service";

import { validationMixin } from "vuelidate"
import { required, url } from "vuelidate/lib/validators";
import { Guid } from "guid-typescript";

import { AddSiteAction } from '../store/sites/add-site.action'
import { Site } from "./site";

@Component({
  mixins: [validationMixin],
  validations: {
    siteName: { required },
    imageUrl: { url }
  }
})
export default class AddSite extends Vue {
  siteName: string = "";
  imageUrl: string = "";

  nameErrors: string[] = [];
  imageUrlErrors: string[] = [];

  async submit() {
    if(!this.$v.$invalid)
    {
      this.$store.dispatch(new AddSiteAction(new Site(Guid.create(), this.siteName, this.imageUrl)));
      this.$router.push('list');
    }
  }

  back() {
    this.$router.push('list');
  }

  validateName() {
    const errors: string[] = [];
    const siteName: any = this.$v.siteName;
    siteName.$touch();

    if (siteName.$dirty)
      !siteName.required && errors.push("Name is required.");
    
    this.nameErrors = errors;
  }

  validateImageUrl() {
    const errors: string[] = [];
    const imageUrl: any = this.$v.imageUrl;
    imageUrl.$touch();

    if (imageUrl.$dirty)
      !imageUrl.url && errors.push("Must be valid url");
    
    this.imageUrlErrors = errors;
  }
}
</script>
