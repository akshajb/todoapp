<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapActions } from "vuex";
export default {
  components: {
    Navbar
  },
  methods: {
    ...mapActions(["checkLocal"])
  },
  created() {
    this.checkLocal();
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap");
:root {
  --main_one: #0d47a1;
  --main_two: #dfeafb;
  --main_three: #3dedff;
}

body {
  font-family: "Lato", sans-serif;
  background: var(--main_two);
}
h2 {
  font-weight: 300 !important;
}
#toast-container {
  right: 50% !important;
  top: 80% !important;
}
.btn:hover {
  transform: scale(1.04);
}
</style>
