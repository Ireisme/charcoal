<template>
  <div>
    <p>Loading...</p>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Callback extends Vue {

  created() {
    this.$auth.handleAuthentication()
    .then(() => {
      this.$router.push("/home");
    });
  }
}
</script>