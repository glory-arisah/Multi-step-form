<template>
  <main class="main">
    <header class="header">
      <h1>Starting a new project? Let's work on it!</h1>
      <h4>
        Please fill this short form to get started, we will reach out to you
        shortly
      </h4>
    </header>
    <div class="index-form-wrapper">
      <StepIndex @step="(value) => (stepIndex = value)" :stepId="stepIndex" />
      <section class="form-container">
        <keep-alive>
          <component :is="currStep" v-model:value="clientDetails" />
        </keep-alive>
        <!-- next an submit buttons -->
        <div
          :class="{
            'action-btns': true,
            'left-align-back-btn': stepIndex === 4,
          }"
        >
          <button @click="stepIndex--" class="btn back" v-show="stepIndex > 1">
            Back
          </button>
          <button
            @click="stepIndex++"
            class="btn next"
            v-show="stepIndex < Object.keys(steps).length"
          >
            Next
          </button>
        </div>
        <button
          class="btn submit"
          v-show="stepIndex === Object.keys(steps).length"
        >
          Submit Form
        </button>
      </section>
    </div>
  </main>
</template>

<script>
import StepIndex from "./components/StepIndex.vue";
import PersonalDetails from "./components/PersonalDetails.vue";
import { markRaw } from "vue";
import About from "./components/About.vue";
import Assist from "./components/Assist.vue";
import Budget from "./components/Budget.vue";
export default {
  name: "App",
  data() {
    return {
      steps: {
        1: markRaw(PersonalDetails),
        2: markRaw(About),
        3: markRaw(Assist),
        4: markRaw(Budget),
      },
      stepComp: markRaw(PersonalDetails),
      stepIndex: 1,
      clientDetails: {
        // personal details
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
  components: {
    StepIndex,
    PersonalDetails,
  },
  computed: {
    currStep() {
      return this.steps[this.stepIndex];
    },
    currStepIndex() {
      return this.stepIndex;
    },
  },
  methods: {
    stepCalc(value) {
      this.stepComp = value;
      console.log(value);
    },
  },
};
</script>

<style lang="scss" src="./assets/css/App.scss"></style>
