<template>
  <div class="Navbar navbar-fixed">
    <nav class="nav-extended blue darken-4">
      <div class="nav-wrapper">
        <ul class="center">
          <li>
            <router-link class="secondary" to="/">Home</router-link>
          </li>
          <li>
            <router-link class="secondary" to="/about">About</router-link>
          </li>
          <li v-if="userInfo.uid">
            <a
              @click="signOutandRedirect"
              class="btn blue darken-4 waves-effect waves-ripple btn-small"
            >
              Sign out
              <i class="material-icons right">exit_to_app</i>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="userInfo.uid" class="nav-content">
        <router-link
          :to="{ name: 'AddTodo' }"
          class="btn btn-floating btn-large blue-grey darken-4 waves-effect waves-light halfway-fab"
        >
          <i class="material-icons">add</i>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  methods: {
    ...mapActions(["signOut"]),
    signOutandRedirect() {
      this.signOut()
        .then(data => {
          console.log(data);
          this.$router.push({ name: "Home" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.secondary {
  color: #dfeafb;
}
.modal {
  height: 100%;
}
.router-link-exact-active {
  border-bottom: 4px solid white;
}
.sign-out {
  margin-left: 1rem;
}
</style>
