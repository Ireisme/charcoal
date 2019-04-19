import { Component, Vue } from "vue-property-decorator";

@Component({
  template: `<div>
  <p>Loading...</p>
</div>`
})
export default class Callback extends Vue {
  created() {
    this.$auth.handleAuthentication()
    .then(() => {
      this.$router.push('/home');
    });
  }
}