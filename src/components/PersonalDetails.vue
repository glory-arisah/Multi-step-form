<template>
  <section class="personal-details">
    <form @submit="onSubmit" class="pd-form">
      <h2 class="pd-heading">Please fill your details</h2>
      <!-- full name -->
      <VField
        v-slot="{ field }"
        v-model="fullName"
        name="fullName"
        :validate-on-input="true"
      >
        <input
          v-bind="field"
          ref="firstInput"
          class="pd-form-input"
          placeholder="* Full name"
        />
      </VField>
      <ErrorMessage name="fullName" class="text-danger-sm" />
      <!-- email -->
      <VField
        name="email"
        v-model="email"
        placeholder="* Email"
        :validate-on-input="true"
        class="pd-form-input"
      />
      <ErrorMessage name="email" class="text-danger-sm" />
      <!-- phone number -->
      <VField
        name="phone"
        v-model="phone"
        placeholder="* Phone number"
        :validate-on-input="true"
        class="pd-form-input"
      />
      <ErrorMessage name="phone" class="text-danger-sm" />
      <!-- place of birth -->
      <VField
        name="placeOfBirth"
        v-model="placeOfBirth"
        placeholder="* Place of birth"
        :validate-on-input="true"
        class="pd-form-input"
      />
      <ErrorMessage name="placeOfBirth" class="text-danger-sm" />
      <button :disabled="!meta.valid" type="submit" class="btn next">
        Next
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { PersonalDetailsProps } from "@/store/types";
import PersonalDetailsComp from "@/composables/PersonalDetailsComp";
import * as yup from "yup";
import * as VeeValidate from "vee-validate";

export default {
  name: "PersonalDetails",
  setup() {
    const store = useStore(key);
    const firstInput: Ref<null | HTMLInputElement> = ref(null);

    onMounted(() => {
      firstInput.value!.focus();
      if (!store.state.hasErrors.personalDetails) return;
      store.dispatch("hasErrors", { type: "personalDetails", value: true });
    });

    // VEE-VALIDATE SCHEMA
    const personalDetailsSchema: yup.ObjectSchema<PersonalDetailsProps> =
      yup.object({
        fullName: yup
          .string()
          .required("* full name is required")
          .matches(/^[A-Za-z\s?]+$/, "* numbers are not allowed")
          .min(8, "* full name is too short"),
        email: yup
          .string()
          .required("* email is required")
          .email("* email should be in correct format"),
        phone: yup
          .string()
          .required("* phone number is required")
          .matches(
            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}$/,
            "* phone number is required in correct format"
          ),
        placeOfBirth: yup
          .string()
          .required("* your place of birth is required"),
      });

    // VEE-VALIDATE USEFORM SETUP
    const { handleSubmit, meta } = VeeValidate.useForm<PersonalDetailsProps>({
      validationSchema: personalDetailsSchema,
    });

    // VUEX USER PERSONAL DETAILS FORM FIELDS STATE
    const { fullName, email, phone, placeOfBirth } = PersonalDetailsComp(
      meta.value
    );

    // FORM SUBMISSION
    function onSuccess() {
      store.dispatch("hasErrors", { type: "personalDetails", value: false });
      store.dispatch("next");
    }

    const onSubmit = handleSubmit(onSuccess);

    return {
      firstInput,
      onSubmit,
      fullName,
      email,
      phone,
      placeOfBirth,
      handleSubmit,
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
.personal-details {
  width: 80%;
}

.pd-heading {
  text-align: center;
  margin-bottom: 1rem;
}

.pd-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  width: 100%;
}
.pd-form-input {
  padding: 0.8rem 0.9rem;
  border-radius: 0.6rem;
  border: 1.2px solid #c9c9c9;
  font-size: 0.9rem;
  color: #777575;
  font-weight: 300;
}
.pd-form-input:focus {
  color: #515050;
  font-weight: 500;
  transition: all 400ms;
  -moz-transition: all 0.5s;
}
.pd-form-input:focus,
.pd-form-input:hover {
  outline: none;
  border: 1.2px solid #7033c5;
  transition: border 300ms;
}
</style>
