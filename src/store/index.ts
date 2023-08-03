import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { RootState, ProfilePayloadProps, ErrorsProps } from "./types";

// injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  state: () => {
    return {
      users: [],
      stepIndex: 1,
      hasErrors: {
        personalDetails: true,
        about: true,
        assist: true,
        budget: true,
      },
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
    hasErrors: (
      state,
      { type, value }: { type: keyof ErrorsProps; value: boolean }
    ) => (state.hasErrors[type] = value),
    next: (state) => state.stepIndex++,
    previous(state) {
      state.stepIndex--;
    },
    resetStepIndex: (state) => {
      state.stepIndex = 1;
      state.profile = {
        fullName: "",
        email: "",
        phone: "",
        placeOfBirth: "",
        assist: [],
        about: "",
        budget: 0,
      };
      state.hasErrors = {
        personalDetails: true,
        about: true,
        assist: true,
        budget: true,
      };
    },
    setProfileVals: (state, payload: ProfilePayloadProps) => {
      state.profile[payload.type] = payload.value;
    },
    createUser: (state) => {
      state.users = [...state.users, state.profile];
    },
  },
  actions: {
    hasErrors({ commit }, { type, value }) {
      commit("hasErrors", { type, value });
    },
    next({ commit }) {
      commit("next");
    },
    previous: ({ commit }) => commit("previous"),
    resetStepIndex: ({ commit }) => commit("resetStepIndex"),
    setProfileVals: ({ commit }, { type, value }) => {
      // `type` refers to the user profile field like fullName and email
      // `value` is the user input for a specific field
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
