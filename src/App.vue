<template>
  <main class="main">
    <header class="header">
      <h1>Starting a new project? Let's work on it!</h1>
      <h4>
        Please fill this short form to get started, we will reach out to you
        shortly
      </h4>
    </header>
    <StepIndex @step="(value) => (stepIndex = value)" />
    <section class="form-container">
      <!-- <keep-alive> -->
      <component :is="currStep" />
      <!-- </keep-alive> -->
    </section>
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

.form-container {
  background-color: #fff;
  border-radius: 0.8rem;
  margin: 2rem auto 0 auto;
  max-width: 70%;
  padding: 1rem;
  color: #000;
  height: 28rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
