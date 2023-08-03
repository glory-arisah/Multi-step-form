<template>
  <section class="budget">
    <form class="bu-form" @submit="onSubmit">
      <h2 class="bu-heading">Specify your budget</h2>
      <VField v-slot="{ field }" name="budget">
        <div class="slider">
          <input
            v-bind="field"
            v-model="budget"
            type="range"
            min="1"
            max="100"
          />
          <p>${{ $store.state.profile.budget }}</p>
        </div>
        <ErrorMessage name="budget" class="text-danger-sm" />
        <div class="action-btns">
          <button @click="$store.dispatch('previous')" class="btn back">
            Back
          </button>
          <button type="submit" :disabled="!meta.valid" class="btn submit">
            Submit
          </button>
        </div>
      </VField>
    </form>
  </section>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Ref, Prop } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";
import * as VeeValidate from "vee-validate";
import * as yup from "yup";

export default {
  name: "Budget",

  setup(props: Prop<null>, { emit }: { emit: any }) {
    const store = useStore(key);
    const errorMsg: Ref<null | string> = ref(null);

    onMounted(() => {
      if (!store.state.hasErrors.budget) return;
      store.dispatch("hasErrors", { type: "budget", value: true });
    });

    const budgetSchema = yup.object({
      budget: yup.number().min(10, "* specify a budget greater than $10"),
    });

    const { handleSubmit, meta } = VeeValidate.useForm({
      validationSchema: budgetSchema,
      initialValues: {
        budget: store.state.profile.budget,
      },
    });

    const budget = computed({
      get: () => store.state.profile.budget,
      set: (value) => {
        store.dispatch("setProfileVals", { type: "budget", value });
        meta.value.valid
          ? store.dispatch("hasErrors", { type: "budget", value: false })
          : store.dispatch("hasErrors", { type: "budget", value: true });
      },
    });

    const onSubmit = handleSubmit(() => {
      emit("handleSubmit");
      store.dispatch("createUser");
      store.dispatch("resetStepIndex");
    });

    const isFormValid = computed(() => {
      return Object.values(store.state.hasErrors).every((value) => !value);
    });

    return {
      errorMsg,
      budget,
      onSubmit,
      isFormValid,
      meta,
    };
  },
  components: {
    VField: VeeValidate.Field,
    ErrorMessage: VeeValidate.ErrorMessage,
  },
};
</script>

<style scoped lang="scss" src="../assets/css/Budget.scss"></style>
