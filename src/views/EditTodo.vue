<template>
  <div class="edit-todo container">
    <h4>Edit Todo</h4>
    <div class="card" v-if="newTodo">
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
            <input
              name="date"
              type="text"
              class="datepicker"
              :value="date"
              ref="date"
              @change="changeDate"
            />
            <label>Due Date</label>
          </div>
          <div class="input-field col s6">
            <button class="btn blue darken-4 waves-effect waves-light" type="submit" name="action">
              Edit
              <i class="material-icons right">edit</i>
            </button>
            <button
              data-target="deleteModal"
              class="delete btn-floating btn-flat btn-small waves-effect waves-light center modal-trigger"
              type="button"
            >
              <i class="material-icons red right">delete</i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal Markup -->
    <div id="deleteModal" class="modal">
      <div class="modal-content">
        <h5>Are you sure you want to delete this Todo ?</h5>
      </div>
      <div class="modal-footer">
        <a
          href="#!"
          class="btn btn-small modal-close waves-effect red waves-green white-text"
          v-on:click="deleteTodo"
        >
          <i class="material-icons red right">delete</i>
          Delete
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import M from "materialize-css";
import { mapActions } from "vuex";
import moment from "moment";
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
    },
    date: {
      get() {
        return moment(this.newTodo.date).format("MMM DD, YYYY");
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
    const instances = M.Datepicker.init(elems, {});
    instances[0].setDate(this.newTodo.date);
  },
  methods: {
    changeDate() {
      var instance = M.Datepicker.getInstance(this.$refs.date);
      this.$store.commit("editDate", {
        date: instance.date,
        _id: this.newTodo._id
      });
    },
    editTodo() {
      if (
        this.newTodo.date &&
        this.newTodo.title &&
        this.newTodo.desc &&
        this.newTodo.status
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
  width: 100%;
}
.delete {
  margin-left: 0.5rem;
  color: red;
}
.modal {
  top: 30% !important;
  border-radius: 20px !important;
}
@media only screen and (min-width: 600px) {
  .card {
    width: 70%;
  }
}
</style>
