<template>
  <main class="main">
    <header class="header">
      <h1>Starting a new project? Let's work on it!</h1>
      <h4>
        Please fill this short form to get started, we will reach out to you
        shortly
      </h4>
    </header>
    <br />
    <div class="index-form-wrapper">
      <StepIndex @step="(value: number) => ($store.state.stepIndex = value)" />
      <section class="form-container">
        <!-- <keep-alive> -->
        <p :class="{ success: true }">{{ message }}</p>
        <Component :is="currentStep" @handleSubmit="showFormMsg" />
        <!-- </keep-alive> -->
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { key } from "./store/index";
import { Steps } from "./store/types";
import { reactive, ref, computed } from "vue";
import StepIndex from "./components/StepIndex.vue";
import PersonalDetails from "./components/PersonalDetails.vue";
import About from "./components/About.vue";
import Assist from "./components/Assist.vue";
import Budget from "./components/Budget.vue";
export default {
  name: "App",
  components: {
    StepIndex,
    PersonalDetails,
    About,
    Assist,
    Budget,
  },
  setup() {
    const store = useStore(key);
    const message = ref("");

    // list of each form step
    const steps: Steps = reactive({
      1: "PersonalDetails",
      2: "About",
      3: "Assist",
      4: "Budget",
    });

    // current component's index
    const currentStep = computed(
      (): string => steps[store.state.stepIndex as keyof Steps]
    );

    function showFormMsg() {
      message.value = "Your details have been submitted successfully.";
      setTimeout(() => {
        message.value = "";
      }, 2000);
    }

    return {
      steps,
      currentStep,
      showFormMsg,
      message,
    };
  },
};
</script>
