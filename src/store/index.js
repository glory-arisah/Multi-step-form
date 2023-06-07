import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      users: [],
      stepIndex: 1,
      profile: {
        fullName: "",
        email: "",
        phone: "",
        placeOfBirth: "",
        about: "",
        assist: [],
        budget: 0,
      },
    };
  },
  mutations: {
    next: (state) => state.stepIndex++,
    previous: (state) => state.stepIndex--,
    resetStepIndex: (state) => {
      state.stepIndex = 1;
      state.profile = {
        fullName: "",
        email: "",
        phone: "",
        placeOfBirth: "",
        assist: "",
        about: "",
        budget: 0,
      };
    },
    setProfileVals: (state, payload) => {
      state.profile[payload.type] = payload.value;
    },
    createUser: (state) => {
      state.users = [...state.users, state.profile];
    },
  },
  actions: {
    next: ({ commit }) => commit("next"),
    previous: ({ commit }) => commit("previous"),
    resetStepIndex: ({ commit }) => commit("resetStepIndex"),
    setProfileVals: ({ commit }, { type, value }) => {
      commit("setProfileVals", { type, value });
    },
    createUser: ({ commit }) => {
      commit("createUser");
    },
  },
  getters: {
    currentStepId: (state) => state.stepIndex,
  },
});
