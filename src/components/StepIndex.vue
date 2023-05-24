<template>
  <section class="step-index">
    <button class="step-number" @click="$emit('step', 1)">1</button>
    <button class="step-number" @click="$emit('step', 2)">2</button>
    <button class="step-number" @click="$emit('step', 3)">3</button>
    <button class="step-number" @click="$emit('step', 4)">4</button>
  </section>
</template>

<script>
export default {
  name: "StepIndex",
  emits: ["step"],
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
.step-number:hover {
  color: #fff;
  background-color: #6f33c3;
  transition: color 300ms, background-color 300ms;
}
/* end of step count index styling */
</style>
