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
      <StepIndex @step="(value) => ($store.state.stepIndex = value)" />
      <section class="form-container">
        <keep-alive>
          <component :is="currentStep" />
        </keep-alive>
        <!-- next an submit buttons -->
        <div
          :class="{
            'action-btns': true,
            'left-align-back-btn': $store.state.stepIndex === 4,
          }"
        >
          <button
            @click="$store.dispatch('previous')"
            class="btn back"
            v-show="$store.state.stepIndex > 1"
          >
            Back
          </button>
          <button
            @click="$store.dispatch('next')"
            class="btn next"
            v-show="$store.state.stepIndex < Object.keys(steps).length"
          >
            Next
          </button>
        </div>
        <button
          @click="handleSubmit"
          class="btn submit"
          v-show="$store.state.stepIndex === Object.keys(steps).length"
        >
          Submit Form
        </button>
      </section>
    </div>
  </main>
</template>

<script>
import { useStore } from "vuex";
import { reactive, ref, computed } from "vue";
import StepIndex from "./components/StepIndex.vue";
import PersonalDetails from "./components/PersonalDetails.vue";
import About from "./components/About.vue";
import Assist from "./components/Assist.vue";
import Budget from "./components/Budget.vue";
export default {
  name: "App",
  data() {
    return {
      // steps: {
      //   1: markRaw(PersonalDetails),
      //   2: markRaw(About),
      //   3: markRaw(Assist),
      //   4: markRaw(Budget),
      // },
      // stepComp: markRaw(PersonalDetails),
      // stepIndex: 1,
      // clientDetails: {
      //   // personal details
      //   fullName: "",
      //   email: "",
      //   phone: "",
      //   placeOfBirth: "",
      //   about: "",
      //   assist: [],
      //   budget: 0,
      // },
    };
  },
  components: {
    StepIndex,
    PersonalDetails,
    About,
    Assist,
    Budget,
  },
  setup() {
    const store = useStore();
    // list of each form step
    const steps = reactive({
      1: "PersonalDetails",
      2: "About",
      3: "Assist",
      4: "Budget",
    });
    // current component
    const stepComp = ref(steps[1]);
    // current component's index
    // const stepIndex = ref(store.state.stepIndex)
    const currentStep = computed(() => steps[store.state.stepIndex]);
    // method property(s)
    const stepCalc = (value) => (stepComp.value = value);
    // personal details
    const clientDetails = reactive({
      fullName: "",
      email: "",
      phone: "",
      placeOfBirth: "",
      about: "",
      assist: [],
      budget: 0,
    });
    // submit form method
    const handleSubmit = () => {
      store.dispatch("createUser");
      store.dispatch("resetStepIndex");
    };
    //
    return {
      steps,
      stepComp,
      clientDetails,
      stepCalc,
      handleSubmit,
      currentStep,
      // stepIndex,
    };
  },
  computed: {
    // currStep() {
    //   return this.steps[this.stepIndex]
    // },
  },
  methods: {
    // stepCalc(value) {
    //   this.stepComp = value
    //   console.log(value)
    // },
  },
};
</script>

<style lang="scss" src="./assets/css/App.scss"></style>
