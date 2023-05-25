<template>
  <section class="step-index">
    <button
      :class="{ 'step-number': true, highlight: stepId === 1 }"
      @click="
        $emit('step', 1);
        stepValue = 1;
      "
    >
      1
    </button>
    <button
      :class="{ 'step-number': true, highlight: stepId === 2 }"
      @click="$emit('step', 2)"
    >
      2
    </button>
    <button
      :class="{ 'step-number': true, highlight: stepId === 3 }"
      @click="$emit('step', 3)"
    >
      3
    </button>
    <button
      :class="{ 'step-number': true, highlight: stepId === 4 }"
      @click="$emit('step', 4)"
    >
      4
    </button>
  </section>
</template>

<script>
export default {
  name: "StepIndex",
  data() {
    return {
      stepValue: 1,
      myStepId: 0,
    };
  },
  emits: ["step"],
  props: ["stepId"],
  computed: {
    isHighlight() {
      console.log(this.stepId, this.stepValue);
      return this.stepId === this.stepValue;
    },
  },
  watch: {
    stepId(newVal) {
      this.myStepId = newVal;
    },
  },
};
</script>

<style scoped>
/* step count index styling */
.step-index {
  display: flex;
  justify-content: space-around;
}
.step-number {
  border: 1px solid #6f33c3;
  border-radius: 1rem;
  height: 1.5rem;
  width: 1.5rem;
  font-size: 0.7rem;
  background-color: #fff;
  transition: color 300ms, background-color 300ms;
}
.step-number:hover,
.highlight {
  color: #fff;
  background-color: #6f33c3;
  transition: color 300ms, background-color 300ms;
}

/* end of step count index styling */
</style>
