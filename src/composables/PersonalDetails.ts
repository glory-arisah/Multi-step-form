import { computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { LSString } from "@/store/types";

export default function PersonalDetailsComp() {
  const store = useStore(key);

  const fullName = computed({
    get: () => store.state.profile.fullName,
    set: (value: LSString) => {
      store.dispatch("setProfileVals", { type: "fullName", value });
    },
  });

  const email = computed({
    get: () => store.state.profile.email,
    set: (value: LSString) => {
      store.dispatch("setProfileVals", { type: "email", value });
    },
  });

  const phone = computed({
    get: () => store.state.profile.phone,
    set: (value: LSString) => {
      store.dispatch("setProfileVals", { type: "phone", value });
    },
  });

  const placeOfBirth = computed({
    get: () => store.state.profile.placeOfBirth,
    set: (value: LSString) => {
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
