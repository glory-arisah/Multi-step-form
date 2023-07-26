<template>
  <section class="about-company">
    <form class="ac-form">
      <h2 class="ac-heading">About your company</h2>
      <textarea
        class="ac-form-textarea"
        rows="9"
        placeholder="Tell us a bit about your organization."
        :value="$store.state.profile.about"
        @input="setProfileVal($event)"
        ref="firstInput"
      ></textarea>
    </form>
  </section>
  <!-- v-show="$store.state.stepIndex < Object.keys(steps).length" -->
  <button @click="$store.dispatch('next')" class="btn next">Next</button>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";
export default {
  name: "About",
  props: ["value", "about"],
  emits: ["update:value", "update:about"],
  setup() {
    const store = useStore(key);
    const firstInput = ref(null);

    const setProfileVal = (event: Event) => {
      const { target } = event;
      const TargetType = target as HTMLInputElement;
      const value = TargetType.value;
      store.dispatch("setProfileVals", { type: "about", value });
    };

    onMounted(() => {
      (firstInput.value! as HTMLInputElement).focus();
    });

    return {
      setProfileVal,
      firstInput,
    };
  },
};
</script>

<style scoped>
.about-company {
  width: 80%;
}

.ac-heading {
  text-align: center;
  margin-bottom: 1rem;
}

.ac-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.ac-form-textarea {
  border-radius: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 0.6rem;
  border: 1.2px solid #c9c9c9;
  font-size: 0.9rem;
  color: #777575;
  font-weight: 300;
  resize: none;
}
.ac-form-textarea:focus,
.ac-form-textarea:hover {
  outline: none;
  border: 1.2px solid #7033c5;
  transition: border 300ms;
}
</style>
