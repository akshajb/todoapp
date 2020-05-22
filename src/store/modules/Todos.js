// import moment from "moment";
import axios from "axios";
import config from "../../config";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => {
    const newTodos = [...state.todos];
    return newTodos;
  },
};

const mutations = {
  assignTodos: (state, todos) => (state.todos = todos),

  setTodo: (state, todo) => state.todos.unshift(todo),

  removeTodo: (state, todo) =>
    state.todos.filter((item) => item._id != todo._id),

  editTodo: (state, todo) => {
    var index = state.todos.findIndex((element) => element._id == todo._id);
    state.todos[index] = todo;
  },

  editTitle: (state, todo) => {
    var index = state.todos.findIndex((element) => element._id == todo._id);
    state.todos[index].title = todo.title;
  },

  editDesc: (state, todo) => {
    var index = state.todos.findIndex((element) => element._id == todo._id);
    state.todos[index].desc = todo.desc;
  },

  editStatus: (state, todo) => {
    var index = state.todos.findIndex((element) => element._id == todo._id);
    state.todos[index].status = todo.status;
  },

  editDate: (state, todo) => {
    var index = state.todos.findIndex((element) => element._id == todo._id);
    state.todos[index].date = todo.date;
  },
};

const actions = {
  getAllTodos: ({ commit, rootState }) => {
    const userId = rootState.Auth.user.uid;
    axios
      .get(`${config.baseUrl}/api/todos/${userId}`)
      .then((data) => {
        console.log("Storing Todos");
        commit("assignTodos", data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  storeTodo: ({ commit }, todo) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.baseUrl}/api/todos`, todo)
        .then((data) => {
          commit("setTodo", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  changeTodo: ({ commit }, todo) => {
    return new Promise((resolve, reject) => {
      console.log(todo._id);
      axios
        .put(`${config.baseUrl}/api/todos/${todo._id}`, todo)
        .then((data) => {
          commit("editTodo", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  removeTodo: ({ commit }, todo) => {
    return new Promise((resolve, reject) => {
      console.log(todo._id);
      axios
        .delete(`${config.baseUrl}/api/todos/${todo._id}`)
        .then((data) => {
          commit("removeTodo", todo);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
