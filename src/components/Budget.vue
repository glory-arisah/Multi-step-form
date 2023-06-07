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

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "Budget",
  data() {
    return {
      // rangeValue: 10,
    };
  },
  props: ["value", "budget"],
  emits: ["update:budget"],
  methods: {
    // update(key, value) {
    //   this.$emit("update:value", { ...this.value, [key]: value });
    // },
  },
  setup() {
    const store = useStore();
    const rangeValue = ref(10);
    const setProfileVal = (e) => {
      store.dispatch("setProfileVals", {
        type: "budget",
        value: e.target.value,
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
