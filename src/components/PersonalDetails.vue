<template>
  <section class="personal-details">
    <form class="pd-form">
      <h2 class="pd-heading">Please fill your details</h2>
      <input
        class="pd-form-input"
        :value="$store.state.profile.fullName"
        @input="setProfileVal('fullName', $event)"
        type="text"
        placeholder="Full name"
        ref="firstInput"
      />
      <input
        class="pd-form-input"
        :value="$store.state.profile.email"
        @input="setProfileVal('email', $event)"
        type="text"
        placeholder="Email"
      />
      <input
        class="pd-form-input"
        :value="$store.state.profile.phone"
        @input="setProfileVal('phone', $event)"
        type="text"
        placeholder="Phone number"
      />
      <input
        class="pd-form-input"
        :value="$store.state.profile.placeOfBirth"
        @input="setProfileVal('placeOfBirth', $event)"
        type="text"
        placeholder="Place of birth"
      />
    </form>
  </section>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "PersonalDetails",
  methods: {
    // update(key, value) {
    //   this.$emit("update:value", { ...this.value, [key]: value });
    // },
  },
  setup() {
    const store = useStore();
    const firstInput = ref(null);
    // const update = (key, value) => {
    //   emit("update:value", { ...props.value, [key]: value });
    //   console.log(key, value);
    // };

    // const updateByType = (type, e) => {
    //   emit(`update:${type}`, e.target.value);
    // };

    const setProfileVal = (type, e) => {
      const value = e.target.value;
      store.dispatch("setProfileVals", { type, value });
    };
    onMounted(() => {
      firstInput.value.focus();
    });
    return {
      // update,
      // updateByType,
      setProfileVal,
      firstInput,
    };
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
