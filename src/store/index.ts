import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import {
  RootState,
  ProfilePayloadProps,
  ErrorsProps,
  UserProfileProps,
} from "./types";
import { useLocalStorage } from "@vueuse/core";

// injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  state: () => {
    return {
      users: [],
      stepIndex: 1,
      hasErrors: {
        personalDetails: useLocalStorage("personalDetailsErrors", true),
        about: useLocalStorage("aboutErrors", true),
        assist: useLocalStorage("assistErrors", true),
        budget: useLocalStorage("budgetErrors", true),
      },
      profile: {
        fullName: useLocalStorage("fullName", ""),
        email: useLocalStorage("email", ""),
        phone: useLocalStorage("phone", ""),
        placeOfBirth: useLocalStorage("placeOfBirth", ""),
        about: useLocalStorage("about", ""),
        assist: [],
        budget: useLocalStorage("budget", 5),
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
    resetProfile: (state) => {
      state.stepIndex = 1;
      Object.keys(state.profile).forEach((key) => {
        switch (key as keyof UserProfileProps) {
          case "budget":
            // @ts-ignore
            state.profile[key as keyof UserProfileProps] = 5;
            break;
          case "assist":
            // @ts-ignore
            state.profile[key as keyof UserProfileProps] = [];
            break;
          default:
            // @ts-ignore
            state.profile[key as keyof UserProfileProps] = "";
            break;
        }
      });
    },
    resetErrors: (state) => {
      Object.keys(state.hasErrors).forEach((errorKey) => {
        localStorage.setItem(`${errorKey}Errors`, JSON.stringify(true));
      });
      state.hasErrors = {
        personalDetails: useLocalStorage("personalDetailsErrors", true),
        about: useLocalStorage("aboutErrors", true),
        assist: useLocalStorage("assistErrors", true),
        budget: useLocalStorage("budgetErrors", true),
      };
    },
    resetLocalStorage: (state) => {
      Object.keys(state.profile).forEach((profileKey) => {
        switch (profileKey as keyof UserProfileProps) {
          case "budget":
            localStorage.setItem(profileKey, JSON.stringify(5));
            break;
          case "assist":
            localStorage.setItem(profileKey, JSON.stringify([]));
            break;
          default:
            localStorage.setItem(profileKey, "");
            break;
        }
      });
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
    setProfileVals: ({ commit }, { type, value }) => {
      // `type` refers to the user profile field like fullName and email
      // `value` is the user input for a specific field
      commit("setProfileVals", { type, value });
    },
    resetForm: ({ commit }) => {
      commit("resetLocalStorage");
      commit("resetProfile");
      commit("resetErrors");
    },
    createUser: ({ commit }) => {
      commit("createUser");
    },
  },
  getters: {
    currentStepId: (state) => state.stepIndex,
  },
});
