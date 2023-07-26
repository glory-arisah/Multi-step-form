<template>
  <section class="assist">
    <form class="as-form">
      <h2 class="as-heading">How can I help you?</h2>
      <section class="checkbox-wrapper">
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="$store.state.profile.assist"
            @input="
              setProfileVal(
                ($event.target as HTMLInputElement).checked,
                'UI Design'
              )
            "
          />
          <span>UI Design</span>
        </p>
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="$store.state.profile.assist"
            @input="
              setProfileVal(
                ($event.target as HTMLInputElement).checked,
                'Marketing Site'
              )
            "
          />
          <span>Marketing Site</span>
        </p>
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="$store.state.profile.assist"
            @input="
              setProfileVal(
                ($event.target as HTMLInputElement).checked,
                'UI Development'
              )
            "
          />
          <span>UI Development</span>
        </p>
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="$store.state.profile.assist"
            @input="
              setProfileVal(
                ($event.target as HTMLInputElement).checked,
                'Grab a beer'
              )
            "
          />
          <span>Grab a beer</span>
        </p>
      </section>
    </form>
  </section>
  <!-- v-show="$store.state.stepIndex < Object.keys(steps).length" -->
  <button @click="$store.dispatch('next')" class="btn next">Next</button>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { key } from "../store/index";

export default {
  name: "Assist",
  props: ["value", "assist"],
  emits: ["update:value", "update:assist"],
  setup() {
    const store = useStore(key);
    const setProfileVal = (check: boolean, value: string) => {
      if (check) {
        store.dispatch("setProfileVals", {
          type: "assist",
          value: [...store.state.profile.assist, value],
        });
      } else {
        const removeAssist = store.state.profile.assist.filter(
          (item) => item !== value
        );
        store.dispatch("setProfileVals", {
          type: "assist",
          value: [...removeAssist],
        });
      }
    };
    return {
      setProfileVal,
    };
  },
};
</script>

<style scoped>
.assist {
  width: 80%;
}
.as-heading {
  text-align: center;
  margin-bottom: 1rem;
}
.p-checkbox {
  padding-block: 0.6rem;
  width: 100%;
  font-size: 1.05rem;
  transform: translateX(30%);
}
.p-checkbox span {
  margin-left: 0.6rem;
}
</style>
