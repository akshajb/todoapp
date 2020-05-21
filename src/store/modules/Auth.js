import axios from "axios";
import config from "../../config";

const state = {
  user: {
    uid: "",
    name: "",
    email: "",
  },
};

const getters = {
  userInfo: (state) => state.user,
};

const mutations = {
  setUser: (state, userDetails) => {
    state.user.email = userDetails.email;
    state.user.uid = userDetails.sub;
    state.user.name = userDetails.name;
  },
};

const actions = {
  signUp: ({ commit }, userCreds) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.baseUrl}/auth/signup`, userCreds)
        .then((data) => {
          console.log(commit);
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error.response);
          reject(error.response);
        });
    });
  },
  signIn: ({ commit }, userCreds) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.baseUrl}/auth/signin`, userCreds)
        .then((data) => {
          const userDetails = data.data.idToken.payload;
          commit("setUser", userDetails);

          localStorage.setItem("uid", userDetails.sub);
          localStorage.setItem("name", userDetails.name);
          localStorage.setItem("email", userDetails.email);

          resolve(userDetails);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
  signOut: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.baseUrl}/auth/signout`)
        .then((data) => {
          commit("setUser", {
            email: null,
            sub: null,
            name: null,
          });
          commit("assignTodos", []);

          localStorage.removeItem("uid");
          localStorage.removeItem("name");
          localStorage.removeItem("email");

          resolve(data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  checkLocal: ({ commit }) => {
    const localUid = localStorage.getItem("uid");
    if (localUid) {
      const localName = localStorage.getItem("name");
      const localEmail = localStorage.getItem("email");
      commit("setUser", {
        email: localEmail,
        sub: localUid,
        name: localName,
      });
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
