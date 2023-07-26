<template>
  <section class="personal-details">
    <form class="pd-form">
      <h2 class="pd-heading">Please fill your details</h2>
      <input
        class="pd-form-input"
        :value="$store.state.profile.fullName"
        @input="
          handleLiveValidations('fullName', $event);
          setStoreErrors();
        "
        type="text"
        placeholder="Full name"
        ref="firstInput"
      />
      <!-- validation error messages -->
      <p v-show="showValidErrors.fullName.length" class="text-danger-sm">
        * fullname should be between 8 and 35 characters
      </p>
      <p v-show="showValidErrors.fullName.blank" class="text-danger-sm">
        * this field is required
      </p>
      <input
        class="pd-form-input"
        :value="$store.state.profile.email"
        @input="
          handleLiveValidations('email', $event);
          setStoreErrors();
        "
        type="text"
        placeholder="Email"
      />
      <!-- validation error messages -->
      <p v-show="showValidErrors.email.length" class="text-danger-sm">
        * email should be between 8 and 35 characters
      </p>
      <p v-show="showValidErrors.email.blank" class="text-danger-sm">
        * this field is required
      </p>
      <p v-show="showValidErrors.email.format" class="text-danger-sm">
        * please enter a valid email
      </p>
      <input
        class="pd-form-input"
        :value="$store.state.profile.phone"
        @input="
          handleLiveValidations('phone', $event);
          setStoreErrors();
        "
        type="text"
        placeholder="Phone number"
      />
      <!-- validation error messages -->
      <p v-show="showValidErrors.phone.blank" class="text-danger-sm">
        * this field is required
      </p>
      <p v-show="showValidErrors.phone.format" class="text-danger-sm">
        * please enter a valid phone number
      </p>
      <input
        class="pd-form-input"
        :value="$store.state.profile.placeOfBirth"
        @input="
          handleLiveValidations('placeOfBirth', $event);
          setStoreErrors();
        "
        type="text"
        placeholder="Place of birth"
      />
      <!-- validation error messages -->
      <p v-show="showValidErrors.placeOfBirth.blank" class="text-danger-sm">
        * this field is required
      </p>
    </form>
  </section>
  <button
    @click="handleSubmit"
    class="btn next"
    v-show="$store.state.stepIndex < Object.keys(steps).length"
  >
    Next
  </button>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import UserProfileValidation from "@/mixins/UserProfileValidation.vue";
export default {
  name: "PersonalDetails",
  props: ["steps"],
  mixins: [UserProfileValidation],
  setup() {
    const firstInput = ref(null);
    onMounted(() => {
      firstInput.value && (firstInput.value as HTMLInputElement).focus();
    });

    return {
      firstInput,
    };
  },
};
</script>

<style scoped>
/* Utilities */
.text-danger-sm {
  color: rgb(239 68 68);
  font-size: 0.75rem /* 12px */;
  line-height: 1rem /* 16px */;
}
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
