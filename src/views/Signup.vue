<template>
  <div class="sign-up container">
    <h3>Sign up</h3>
    <div class="card">
      <div class="row">
        <form class="col s12" @submit.prevent="register($event)">
          <div class="input-field col s12">
            <input name="email" id="email" type="text" class="validate" v-model="user.email" />
            <label for="email">Email</label>
          </div>
          <div class="input-field col s12">
            <input name="name" id="name" type="text" class="validate" v-model="user.name" />
            <label for="name">Name</label>
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
              Sign up
              <i class="material-icons right">cloud</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import { mapActions } from "vuex";
export default {
  name: "Signup",
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null
      }
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    register() {
      if (this.user.name && this.user.email && this.user.password) {
        this.signUp(this.user)
          .then(data => {
            console.log(data);
            this.$router.push({ name: "Signin" });
            M.toast({
              html: `A confirmation mail has been sent, Please confirm before Signing in `,
              classes: "rounded white-text blue-grey darken-3"
            });
          })
          .catch(error => {
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