<template>
  <section class="budget">
    <form class="bu-form">
      <h2 class="bu-heading">Specify your budget</h2>
      <div class="slider">
        <input
          type="range"
          min="1"
          max="100"
          :value="value.budget"
          @input="update('budget', $event.target.value)"
        />
        <p>${{ value.budget }}</p>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "Budget",
  data() {
    return {
      rangeValue: 10,
    };
  },
  props: ["value"],
  emits: ["update:value"],
  methods: {
    update(key, value) {
      this.$emit("update:value", { ...this.value, [key]: value });
    },
  },
};
</script>

<style scoped lang="scss" src="../assets/css/Budget.scss"></style>
