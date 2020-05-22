<template>
  <div class="home container">
    <h4>{{userInfo.name}}'s Dashboard</h4>
    <div class="card content">
      <ul class="collection" v-if="allTodos.length">
        <li class="collection-item row" v-for="(todo, i) in allTodos" :key="i">
          <i
            :class="
              `material-icons  circle blue-grey-text left text-darken-4 
              ${statusStyle[todo.status].color} 
              ${statusStyle[todo.status].shade}`
            "
          >{{ statusStyle[todo.status].icon }}</i>
          <div class="name col s12 m4">
            <p>
              <span class="title">{{ todo.title }}</span>
              <br />
              <span class="subtext">{{ todo.desc }}</span>
            </p>
          </div>
          <div class="date col s4 m3">
            <span class="pl-3 blue-grey-text text-darken-4 white-text">
              {{
              formatDate(todo.date)
              }}
            </span>
          </div>
          <div
            class="status col s4 m2"
            :class="`chip blue-grey-text center-align text-darken-4 
              ${statusStyle[todo.status].color} 
              ${statusStyle[todo.status].shade}`"
          >
            <span>{{ todo.status }}</span>
          </div>
          <div class="edit m2">
            <i
              @click="editTodo(todo)"
              class="material-icons waves-effect waves-light blue-grey darken-4 white-text circle right"
            >edit</i>
          </div>
        </li>
      </ul>
      <div class="no-todo" v-if="!allTodos.length">
        <h4>You dont have any todos</h4>
        <router-link
          :to="{ name: 'AddTodo' }"
          class="btn blue-grey darken-4 waves-effect waves-light"
          type="submit"
          name="action"
        >
          Add
          <i class="material-icons right">add_circle</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      statusStyle: {
        overdue: { color: "red", shade: "lighten-1", icon: "cancel" },
        ongoing: { color: "yellow", shade: "darken-2", icon: "hourglass_full" },
        completed: { color: "green", shade: "lighten-1", icon: "check_circle" }
      }
    };
  },
  methods: {
    ...mapActions(["getAllTodos"]),
    editTodo(todo) {
      this.$router.push({ name: "EditTodo", params: { newTodo: todo } });
    },
    formatDate(date) {
      return moment(date).format("MMM DD, YYYY");
    }
  },
  computed: {
    ...mapGetters(["allTodos", "userInfo"])
  },
  created() {
    this.getAllTodos();
  }
};
</script>
<style scoped>
.home {
  font-family: "Lato", sans-serif;
}
.card {
  box-shadow: none;
}
.collection {
  background-color: var(--main_two);
  border: none;
}
.collection .collection-item {
  font-family: "Lato", sans-serif;
  border: none;
  margin: 1rem;
  display: block;
  border-radius: 20px;
}
.title {
  font-weight: 700;
}
.subtext {
  color: #aaaaaa;
  font-size: 0.9rem;
}
.collection .material-icons {
  padding: 0.7rem;
}
.no-todo {
  padding: 1.5rem;
}
.no-todo h4 {
  margin: 1rem;
}
.no-todo .btn {
  margin: 1rem;
}
i {
  transition: all 500ms;
}
i:hover {
  transform: rotate(360deg);
}
.edit i {
  cursor: pointer;
}

@media only screen and (min-width: 600px) {
  .collection .collection-item {
    display: flex;
    align-items: center;
  }
}
</style>
