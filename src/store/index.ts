import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

export interface UserProfileProps {
  fullName: string;
  email: string;
  phone: string;
  placeOfBirth: string;
  about: string;
  assist: string[];
  budget: number;
}

export interface StateProps {
  users: UserProfileProps[];
  stepIndex: number;
  hasErrors: boolean;
  profile: UserProfileProps;
}

export interface PayloadProps {
  type: keyof UserProfileProps;
  value: never;
}
// injection key
export const key: InjectionKey<Store<StateProps>> = Symbol();

export const store = createStore<StateProps>({
  state: () => {
    return {
      users: [],
      stepIndex: 1,
      hasErrors: false,
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
    hasErrors: (state, payload: boolean) => (state.hasErrors = payload),
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
    },
    setProfileVals: (state, payload: PayloadProps) => {
      state.profile[payload.type] = payload.value;
    },
    createUser: (state) => {
      state.users = [...state.users, state.profile];
    },
  },
  actions: {
    hasErrors({ commit }, bool) {
      commit("hasErrors", bool);
    },
    next({ state, commit }) {
      if (state.hasErrors) return;
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
