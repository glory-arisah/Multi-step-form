<template>
  <main class="main">
    <header class="header">
      <h1>Starting a new project? Let's work on it!</h1>
      <h4>
        Please fill this short form to get started, we will reach out to you
        shortly
      </h4>
    </header>
    <section class="form-container">
      <StepIndex />
      <component :is="step" />
    </section>
  </main>
</template>

<script>
import StepIndex from "./components/StepIndex.vue";
import PersonalDetails from "./components/PersonalDetails.vue";
import About from "./components/About.vue";
import Assist from "./components/Assist.vue";
import Budget from "./components/Budget.vue";
export default {
  name: "App",
  data() {
    return {
      steps: {
        1: PersonalDetails,
        2: About,
        3: Assist,
        4: Budget,
      },
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
    step() {
      return this.steps[this.stepIndex];
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
}
</style>
