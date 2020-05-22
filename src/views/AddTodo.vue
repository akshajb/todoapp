<template>
  <div class="add-todo container">
    <h4>Add Todo</h4>
    <div class="card">
      <div class="row">
        <form class="col s12" @submit.prevent="addTodo($event)">
          <div class="input-field col s12">
            <input name="title" id="activity" type="text" class="validate" v-model="newTodo.title" />
            <label for="activity">Activity</label>
          </div>
          <div class="input-field col s12">
            <input name="desc" id="desc" type="text" class="validate" v-model="newTodo.desc" />
            <label for="desc">Description</label>
          </div>
          <div class="input-field col s6">
            <select name="status" v-model="newTodo.status">
              <option value disabled selected>Choose your option</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="overdue">Overdue</option>
            </select>
            <label>Status</label>
          </div>
          <div class="input-field col s6">
            <input name="date" type="text" class="datepicker" ref="date" />
            <label>Due Date</label>
          </div>
          <div class="input-field col s6">
            <button class="btn blue darken-4 waves-effect waves-light" type="submit" name="action">
              Add
              <i class="material-icons right">add_circle</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import M from "materialize-css";
import { mapActions, mapGetters } from "vuex";
// import moment from "moment";
export default {
  name: "AddTodo",
  data() {
    return {
      newTodo: {
        title: null,
        desc: null,
        status: null,
        date: null,
        uid: null
      }
    };
  },
  mounted() {
    M.AutoInit();
    var elems = document.querySelectorAll(".datepicker");
    var instances = M.Datepicker.init(elems, {});
    console.log(instances);
  },
  methods: {
    addTodo() {
      this.newTodo.user_id = this.userInfo.uid;
      var instance = M.Datepicker.getInstance(this.$refs.date);
      this.newTodo.date = instance.date;
      if (
        this.newTodo.title &&
        this.newTodo.desc &&
        this.newTodo.status &&
        this.newTodo.date
      ) {
        this.storeTodo(this.newTodo)
          .then(() => {
            M.toast({
              html: "Added Successfully",
              classes: "rounded white-text green lighten-1 "
            });
            this.$router.push({ name: "Dashboard" });
          })
          .catch(error => console.log(error.response));
        // this.newTodo.title = this.newTodo.desc = this.newTodo.status = this.newTodo.date = null;
      } else {
        M.toast({
          html: "All fields are mandatory",
          classes: "rounded white-text red lighten-1 "
        });
      }
    },
    ...mapActions(["storeTodo"])
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>
<style scoped>
.card {
  box-shadow: none;
  padding: 1rem;
  width: 100%;
}
@media only screen and (min-width: 600px) {
  .card {
    width: 70%;
  }
}
</style>
