<template>
  <div class="sign-in container">
    <h4>Sign in</h4>
    <div v-if="!loading" class="card">
      <div class="row">
        <form class="col s12" @submit.prevent="validate">
          <div class="input-field col s12">
            <input name="email" id="email" type="text" class="validate" v-model="user.email" />
            <label for="email">Email</label>
          </div>
          <div class="input-field col s12">
            <input
              name="password"
              id="password"
              type="password"
              class="validate"
              v-model="user.password"
            />
            <label for="password">Password</label>
          </div>
          <div class="input-field col s6">
            <button class="btn waves-effect waves-light blue darken-3" type="submit" name="action">
              Sign in
              <i class="material-icons right">forward</i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import M from "materialize-css";
import { mapActions } from "vuex";
export default {
  name: "Signin",
  components: {
    Loader
  },
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      loading: false
    };
  },
  methods: {
    ...mapActions(["signIn"]),
    validate() {
      if (this.user.email && this.user.password) {
        this.loading = true;
        this.signIn(this.user)
          .then(data => {
            this.loading = false;
            M.toast({
              html: `Welcome ${data.name} !`,
              classes: "rounded white-text green lighten-1 "
            });
            this.$router.push({ name: "Dashboard" });
          })
          .catch(error => {
            this.loading = false;
            M.toast({
              html: `${error.message}`,
              classes: "rounded white-text red lighten-1 "
            });
          });
      } else {
        M.toast({
          html: "Please enter email and password",
          classes: "rounded white-text red lighten-1 "
        });
      }
    }
  }
};
</script>

<style scoped>
.card {
  width: 100%;
}
@media only screen and (min-width: 600px) {
  .card {
    width: 70%;
  }
}
</style>