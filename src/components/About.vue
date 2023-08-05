<template>
  <section class="about-company">
    <form @submit="onSubmit" method="post" class="ac-form">
      <h2 class="ac-heading">About your company</h2>
      <VField
        v-slot="{ field }"
        v-model="about"
        name="about"
        :validate-on-input="true"
      >
        <textarea
          v-bind="field"
          ref="firstTextArea"
          class="ac-form-textarea"
          placeholder="* Tell us a bit about your organization."
          rows="9"
        ></textarea>
      </VField>
      <ErrorMessage name="about" class="text-danger-sm" />
      <div class="action-btns">
        <button @click="$store.dispatch('previous')" class="btn back">
          Back
        </button>
        <button :disabled="!meta.valid" type="submit" class="btn next">
          Next
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { onMounted, ref, Ref, computed } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";
import * as VeeValidate from "vee-validate";
import * as yup from "yup";

export default {
  name: "About",
  props: ["value"],
  emits: ["update:value", "update:about"],
  setup() {
    const store = useStore(key);
    const firstTextArea: Ref<null | HTMLTextAreaElement> = ref(null);

    // VEEVALIDATE SCHEMA
    const aboutSchema = yup.object({
      about: yup
        .string()
        .trim()
        .required("* this field is required")
        .min(20, "* minimum of 20 characters"),
    });

    // VEE-VALIDATE USEFORM SETUP
    const { handleSubmit, meta } = VeeValidate.useForm({
      validationSchema: aboutSchema,
    });

    onMounted(() => {
      firstTextArea.value!.focus();
      if (!store.state.hasErrors.about) {
        store.dispatch("hasErrors", { type: "about", value: false });
        return;
      }
      store.dispatch("hasErrors", { type: "about", value: true });
    });

    // VUEX USER ABOUT FIELD STATE
    const about = computed({
      get: () => store.state.profile.about,
      set: (value) => {
        store.dispatch("setProfileVals", { type: "about", value });
        store.dispatch("hasErrors", {
          type: "about",
          value: !meta.value.valid,
        });
      },
    });

    // FORM SUBMISSION
    const onSubmit = handleSubmit(() => {
      store.dispatch("next");
    });

    return {
      firstTextArea,
      about,
      onSubmit,
      meta,
    };
  },
  components: {
    VField: VeeValidate.Field,
    ErrorMessage: VeeValidate.ErrorMessage,
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
