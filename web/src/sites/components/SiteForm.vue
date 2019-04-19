<template>
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
    <v-btn @click="cancel">cancel</v-btn>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SiteService } from "./../site-service";

import { validationMixin } from "vuelidate";
import { required, url } from "vuelidate/lib/validators";
import { Guid } from "guid-typescript";

import { Site } from "./../site";

@Component({
  mixins: [validationMixin],
  props: {
    onSubmit: Function,
    onCancel: Function
  },
  validations: {
    siteName: { required },
    imageUrl: { url }
  }
})
export default class SiteForm extends Vue {
  siteName: string = "";
  imageUrl: string = "";

  nameErrors: string[] = [];
  imageUrlErrors: string[] = [];

  submit() {
    if (!this.$v.$invalid) {
      const onSubmit = this.$props["onSubmit"];
      onSubmit(this.siteName, this.imageUrl);
    }
  }

  cancel() {
    const onCancel = this.$props["onCancel"];
    onCancel();
  }

  validateName() {
    const errors: string[] = [];
    const siteName: any = this.$v.siteName;
    siteName.$touch();

    if (siteName.$dirty) !siteName.required && errors.push("Name is required");

    this.nameErrors = errors;
  }

  validateImageUrl() {
    const errors: string[] = [];
    const imageUrl: any = this.$v.imageUrl;
    imageUrl.$touch();

    if (imageUrl.$dirty) !imageUrl.url && errors.push("Must be a valid url");

    this.imageUrlErrors = errors;
  }
}
</script>
