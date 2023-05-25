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
        <div class="action-btns">
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
          <button
            class="btn submit"
            v-show="stepIndex === Object.keys(steps).length"
          >
            Submit Form
          </button>
        </div>
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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #7f3adf, #90a0f9);
  color: #ffd;
}

.header {
  text-align: center;
  padding-top: 3rem;
}
.header h4 {
  margin-top: 0.8rem;
}
.index-form-wrapper {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 2rem auto;
}
.form-container {
  margin-top: 1.3rem;
  background-color: #fff;
  border-radius: 0.8rem;
  /* margin: 2rem auto 0 auto; */
  /* max-width: 70%; */
  padding: 1rem;
  color: #000;
  height: 28rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
/* action buttons styling */
.action-btns {
  margin-top: 1rem;
}
.next {
  background-color: #3cd3ad;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1.001rem;
}
</style>
