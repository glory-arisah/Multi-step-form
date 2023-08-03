import { computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default function PersonalDetailsComp(formMetaObj: { valid: boolean }) {
  const store = useStore(key);

  const fullName = computed({
    get: () => store.state.profile.fullName,
    set: (value: string) => {
      store.dispatch("hasErrors", {
        type: "personalDetails",
        value: !formMetaObj.valid,
      });
      store.dispatch("setProfileVals", { type: "fullName", value });
    },
  });

  const email = computed({
    get: () => store.state.profile.email,
    set: (value: string) => {
      store.dispatch("hasErrors", {
        type: "personalDetails",
        value: !formMetaObj.valid,
      });
      store.dispatch("setProfileVals", { type: "email", value });
    },
  });

  const phone = computed({
    get: () => store.state.profile.phone,
    set: (value: string) => {
      store.dispatch("hasErrors", {
        type: "personalDetails",
        value: !formMetaObj.valid,
      });
      store.dispatch("setProfileVals", { type: "phone", value });
    },
  });

  const placeOfBirth = computed({
    get: () => store.state.profile.placeOfBirth,
    set: (value: string) => {
      store.dispatch("hasErrors", {
        type: "personalDetails",
        value: !formMetaObj.valid,
      });
      store.dispatch("setProfileVals", { type: "placeOfBirth", value });
    },
  });

  return {
    fullName,
    email,
    phone,
    placeOfBirth,
  };
}
