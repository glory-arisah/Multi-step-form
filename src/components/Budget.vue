<template>
  <section class="budget">
    <form class="bu-form">
      <h2 class="bu-heading">Specify your budget</h2>
      <div class="slider">
        <input
          type="range"
          min="1"
          max="100"
          :value="$store.state.profile.budget"
          @input="setProfileVal($event)"
        />
        <p>${{ $store.state.profile.budget }}</p>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";
export default {
  name: "Budget",

  props: ["value", "budget"],
  emits: ["update:budget"],
  setup() {
    const store = useStore(key);
    const rangeValue = ref(10);
    const setProfileVal = (event: Event) => {
      const { target } = event;
      const TargetType = target as HTMLInputElement;
      store.dispatch("setProfileVals", {
        type: "budget",
        value: TargetType.value,
      });
    };

    return {
      rangeValue,
      setProfileVal,
    };
  },
};
</script>

<style scoped lang="scss" src="../assets/css/Budget.scss"></style>
