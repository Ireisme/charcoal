<template>
  <form>
    <v-text-field
      v-model="trenchName"
      :error-messages="nameErrors"
      label="Name"
      required
      @input="validateName"
    ></v-text-field>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="back">cancel</v-btn>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TrenchService } from "./../trench-service";

import { validationMixin } from "vuelidate";
import { required, url } from "vuelidate/lib/validators";
import { Guid } from "guid-typescript";

import { Trench } from "./../trench";

@Component({
  mixins: [validationMixin],
  props: {
    onSubmit: Function,
    onCancel: Function
  },
  validations: {
    trenchName: { required },
  }
})
export default class TrenchForm extends Vue {
  trenchName: string = "";

  nameErrors: string[] = [];

  async submit() {
    if (!this.$v.$invalid) {
    const onSubmit = this.$props["onSubmit"];
    onSubmit(this.trenchName);
    }
  }

  back() {
    const onCancel = this.$props["onCancel"];
    onCancel();
  }

  validateName() {
    const errors: string[] = [];
    const trenchName: any = this.$v.trenchName;
    trenchName.$touch();

    if (trenchName.$dirty) !trenchName.required && errors.push("Name is required.");

    this.nameErrors = errors;
  }
}
</script>
