<template>
  <v-layout row align-center justify-center>
    <h2 class="display-4 font-weight-black">{{ greeting }}</h2>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { HelloService } from '../services/hello.service'

@Component
export default class Home extends Vue {
  greeting: string = '';

  created() {
    new HelloService().getGreeting().then(greeting => {
      this.greeting = greeting.Greeting;
    });
  }
}
</script>
