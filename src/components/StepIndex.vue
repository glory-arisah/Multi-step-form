<template>
  <section class="step-index">
    <button
      :class="{
        'step-number': true,
        highlight: isHighlighted(1),
        'valid-component-step': !$store.state.hasErrors.personalDetails,
      }"
      @click="$emit('step', 1)"
    >
      <span class="tooltip" v-show="$store.state.hasErrors.personalDetails"
        >* fill required fields</span
      >
      1
    </button>
    <button
      :class="{
        'step-number': true,
        highlight: isHighlighted(2),
        'valid-component-step': !$store.state.hasErrors.about,
      }"
      @click="$emit('step', 2)"
    >
      <!-- :disabled="$store.state.hasErrors" -->
      <span class="tooltip" v-show="$store.state.hasErrors.about"
        >* fill the required field</span
      >
      2
    </button>
    <button
      :class="{
        'step-number': true,
        highlight: isHighlighted(3),
        'valid-component-step': !$store.state.hasErrors.assist,
      }"
      @click="$emit('step', 3)"
    >
      <!-- :disabled="$store.state.hasErrors" -->
      <span class="tooltip" v-show="$store.state.hasErrors.assist"
        >* select required options</span
      >
      3
    </button>
    <button
      :class="{
        'step-number': true,
        highlight: isHighlighted(4),
        'valid-component-step': !$store.state.hasErrors.budget,
      }"
      @click="$emit('step', 4)"
    >
      <!-- :disabled="$store.state.hasErrors" -->
      <span class="tooltip" v-show="$store.state.hasErrors.budget"
        >* specify a budget greater than $10</span
      >
      4
    </button>
  </section>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { key } from "../store/index";

export default {
  name: "StepIndex",
  emits: ["step"],
  methods: {
    // isHighlighted(curStepVal) {
    //   return this.$store.state.stepIndex === curStepVal
    // },
  },
  setup() {
    const store = useStore(key);
    const isHighlighted = (curStepVal: number) =>
      store.state.stepIndex === curStepVal;
    return {
      isHighlighted,
    };
  },
};
</script>

<style lang="scss" scoped>
/* step count index styling */
%hover-purple-clr {
  color: #fff !important;
  background-color: #6f33c3 !important;
  transition: color 300ms, background-color 300ms;
}
.step-index {
  display: flex;
  justify-content: space-around;

  .step-number {
    border: 1px solid #6f33c3;
    border-radius: 1rem;
    height: 1.5rem;
    width: 1.5rem;
    font-size: 0.7rem;
    background-color: #fff;
    transition: color 300ms, background-color 300ms;
    position: relative;

    &:hover {
      @extend %hover-purple-clr;
      .tooltip {
        visibility: visible;
      }
    }
    .tooltip {
      visibility: hidden;
      text-align: center;
      position: absolute;
      z-index: 1;
      // background-color: transparent;
      border: 0 !important;
      width: 120px;
      left: 50%;
      bottom: 100%;
      margin-left: -60px;
      color: #fff !important;
      font-size: 0.65rem;
    }
  }

  .highlight {
    @extend %hover-purple-clr;
  }
}

/* end of step count index styling */
</style>
