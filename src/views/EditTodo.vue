<template>
  <div class="edit-todo container">
    <h2>Edit Todo</h2>
    <div class="card">
      <div class="row">
        <form class="col s12" @submit.prevent="editTodo($event)">
          <div class="input-field col s12">
            <input name="title" id="activity" type="text" class="validate" v-model="title" />
            <label for="activity">Activity</label>
          </div>
          <div class="input-field col s12">
            <input name="desc" id="desc" type="text" class="validate" v-model="desc" />
            <label for="desc">Description</label>
          </div>
          <div class="input-field col s6">
            <select name="status" v-model="status">
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
            <button class="btn waves-effect waves-light" type="submit" name="action">
              Edit
              <i class="material-icons right">edit</i>
            </button>
            <button
              v-on:click="deleteTodo"
              class="delete btn-floating btn-small waves-effect waves-light center"
              type="button"
            >
              <i class="material-icons red right">delete</i>
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
  name: "EditTodo",
  props: {
    newTodo: {
      Type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    title: {
      get() {
        return this.newTodo.title;
      },
      set(value) {
        this.$store.commit("editTitle", {
          title: value,
          _id: this.newTodo._id
        });
      }
    },
    desc: {
      get() {
        return this.newTodo.desc;
      },
      set(value) {
        this.$store.commit("editDesc", {
          desc: value,
          _id: this.newTodo._id
        });
      }
    },
    status: {
      get() {
        return this.newTodo.status;
      },
      set(value) {
        this.$store.commit("editStatus", {
          status: value,
          _id: this.newTodo._id
        });
      }
    }
  },
  mounted() {
    M.AutoInit();
    var elems = document.querySelectorAll(".datepicker");
    var inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach(input => {
      input.focus();
    });
    M.Datepicker.init(elems, {});
  },
  methods: {
    editTodo() {
      var instance = M.Datepicker.getInstance(this.$refs.date);
      this.newTodo.date = instance.date;
      if (
        this.newTodo.title &&
        this.newTodo.desc &&
        this.newTodo.status &&
        this.newTodo.date
      ) {
        this.changeTodo(this.newTodo)
          .then(data => {
            console.log(data);
            M.toast({
              html: "Edited Successfully",
              classes: "rounded white-text green lighten-1 "
            });
            this.$router.push({ name: "Dashboard" });
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        M.toast({
          html: "All fields are mandatory",
          classes: "rounded white-text red lighten-1 "
        });
      }
    },
    deleteTodo() {
      this.removeTodo(this.newTodo)
        .then(data => {
          console.log(data);
          M.toast({
            html: "Deleted Successfully",
            classes: "rounded white-text blue-grey darken-3 "
          });
          this.$router.replace({ name: "Dashboard" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    ...mapActions(["changeTodo", "removeTodo"])
  }
};
</script>
<style scoped>
.card {
  box-shadow: none;
  padding: 1rem;
  width: 70%;
}
.delete {
  margin-left: 0.5rem;
  color: red;
}
</style>
