<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m12">
        <div class="banner card">
          <div class="card-title">
            <h1 class="banner-text">
              Track your
              <span class="banner-accent blue-text text-darken-4">Todos</span>
            </h1>
          </div>
          <div class="card-content">
            <router-link :to="{name: 'Signup'}" class="btn blue darken-4 btn-large">
              Sign up
              <i class="material-icons right">cloud</i>
            </router-link>
            <router-link
              :to="{name: 'Signin'}"
              class="btn blue darken-4 waves-effect waves-ripple btn-large"
            >
              Sign in
              <i class="material-icons right">forward</i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap");
.card {
  text-align: center;
  padding: 1rem;
  margin: auto;
}
.banner-text {
  /* width: 50%; */
  font-family: "Abril Fatface", cursive;
}
.btn {
  margin: 2rem;
  font-weight: 600;
  box-shadow: none;
}
</style>